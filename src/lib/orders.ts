import type Stripe from "stripe";
import { db } from "./db";
import { stripe } from "./stripe";
import { sendMail, orderConfirmationMail } from "./email";
import { euro } from "./money";

/** Bestellung als bezahlt markieren, Bestand abbuchen, Mails senden. Idempotent. */
export async function markOrderPaid(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId ?? session.client_reference_id;
  if (!orderId) return;

  let invoiceUrl: string | null = null;
  if (session.invoice) {
    try {
      const inv = typeof session.invoice === "string" ? await stripe().invoices.retrieve(session.invoice) : session.invoice;
      invoiceUrl = inv.hosted_invoice_url ?? inv.invoice_pdf ?? null;
    } catch (e) {
      console.error("[order] Rechnung nicht abrufbar", e);
    }
  }

  const shippingDetails = session.collected_information?.shipping_details ?? null;
  const updated = await db.$transaction(async (tx) => {
    // nur PENDING -> PAID, schützt vor doppelten Webhooks
    const res = await tx.order.updateMany({
      where: { id: orderId, status: "PENDING" },
      data: {
        status: "PAID",
        paidAt: new Date(),
        email: session.customer_details?.email ?? null,
        customerName: shippingDetails?.name ?? session.customer_details?.name ?? null,
        shippingAddress: shippingDetails?.address ? (shippingDetails.address as object) : undefined,
        stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
        totalCents: session.amount_total ?? undefined,
        shippingCents: session.total_details?.amount_shipping ?? undefined,
        discountCents: session.total_details?.amount_discount ?? 0,
        taxCents: session.total_details?.amount_tax ?? 0,
        invoiceUrl,
      },
    });
    if (res.count === 0) return null;
    const order = await tx.order.findUniqueOrThrow({ where: { id: orderId }, include: { items: true } });
    for (const item of order.items) {
      if (!item.variantId) continue;
      await tx.variant.update({ where: { id: item.variantId }, data: { stock: { decrement: item.quantity } } });
    }
    // Überverkauf (zwei gleichzeitige Käufe) sichtbar machen statt negativ zu lassen
    const negative = await tx.variant.findMany({ where: { stock: { lt: 0 } } });
    if (negative.length) {
      await tx.variant.updateMany({ where: { stock: { lt: 0 } }, data: { stock: 0 } });
      await tx.order.update({ where: { id: orderId }, data: { note: "Achtung: Bestand war beim Bezahlen nicht mehr ausreichend. Bitte prüfen." } });
    }
    return order;
  });

  if (!updated) return;
  if (updated.email) {
    await sendMail({
      to: updated.email,
      subject: `Bestellbestätigung Nr. ${updated.number}`,
      html: orderConfirmationMail(updated),
    });
  }
  if (process.env.SHOP_INBOX) {
    await sendMail({
      to: process.env.SHOP_INBOX,
      subject: `Neue Bestellung Nr. ${updated.number} über ${euro(updated.totalCents)}`,
      html: `<p>Neue bezahlte Bestellung. Details im Admin: /admin/bestellungen/${updated.id}</p>`,
    });
  }
}

export async function cancelPendingOrder(session: Stripe.Checkout.Session, note: string) {
  const orderId = session.metadata?.orderId ?? session.client_reference_id;
  if (!orderId) return;
  await db.order.updateMany({
    where: { id: orderId, status: "PENDING" },
    data: { status: "CANCELLED", note, email: session.customer_details?.email ?? undefined },
  });
}
