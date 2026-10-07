import { NextResponse } from "next/server";
import { z } from "zod";
import type Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { concentrationLabel, shop, shippingFor, type ShippingCountry } from "@/lib/config";
import { clientIp, rateLimit } from "@/lib/ratelimit";

const Body = z.object({
  country: z.enum(["AT", "DE", "CH"]),
  items: z
    .array(z.object({ variantId: z.string().min(1).max(40), quantity: z.number().int().min(1).max(10) }))
    .min(1)
    .max(20),
});

/**
 * Erstellt eine Bestellung (PENDING) und eine Stripe-Checkout-Session.
 * Preise und Bestand kommen immer aus der Datenbank, nie vom Browser.
 */
export async function POST(req: Request) {
  if (!rateLimit(`checkout:${clientIp(req.headers)}`, 10, 60_000)) {
    return NextResponse.json({ error: "Zu viele Versuche. Bitte in einer Minute erneut probieren." }, { status: 429 });
  }
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Ungültiger Warenkorb." }, { status: 400 });
  const { country, items } = parsed.data;

  // gleiche Varianten zusammenfassen
  const qty = new Map<string, number>();
  for (const i of items) qty.set(i.variantId, (qty.get(i.variantId) ?? 0) + i.quantity);

  const variants = await db.variant.findMany({
    where: { id: { in: [...qty.keys()] }, product: { active: true } },
    include: { product: true },
  });
  if (variants.length !== qty.size) {
    return NextResponse.json({ error: "Ein Artikel ist nicht mehr verfügbar. Bitte den Warenkorb prüfen." }, { status: 409 });
  }
  for (const v of variants) {
    if (v.stock < qty.get(v.id)!) {
      return NextResponse.json(
        { error: `${v.product.name} ${v.sizeMl} ml: nur noch ${v.stock} auf Lager. Bitte die Menge anpassen.` },
        { status: 409 },
      );
    }
  }

  const subtotal = variants.reduce((s, v) => s + v.priceCents * qty.get(v.id)!, 0);
  const ship = shippingFor(country as ShippingCountry, subtotal);
  const automaticTax = process.env.STRIPE_AUTOMATIC_TAX === "true";

  const order = await db.order.create({
    data: {
      country,
      subtotalCents: subtotal,
      shippingCents: ship.cents,
      totalCents: subtotal + ship.cents,
      items: {
        create: variants.map((v) => ({
          variantId: v.id,
          productName: v.product.name,
          sizeMl: v.sizeMl,
          unitCents: v.priceCents,
          quantity: qty.get(v.id)!,
        })),
      },
    },
  });

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = variants.map((v) => ({
    quantity: qty.get(v.id)!,
    price_data: {
      currency: shop.currency,
      unit_amount: v.priceCents,
      ...(automaticTax && { tax_behavior: "inclusive" as const }),
      product_data: {
        name: `${v.product.name}, ${concentrationLabel[v.product.concentration]} ${v.sizeMl} ml`,
        metadata: { sku: v.sku, variantId: v.id },
      },
    },
  }));

  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      locale: "de",
      line_items: lineItems,
      client_reference_id: order.id,
      metadata: { orderId: order.id },
      payment_intent_data: { metadata: { orderId: order.id } },
      shipping_address_collection: { allowed_countries: [country] },
      phone_number_collection: { enabled: true },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: `${ship.carrier}${ship.free ? ", kostenlos" : ""}`,
            fixed_amount: { amount: ship.cents, currency: shop.currency },
            ...(automaticTax && { tax_behavior: "inclusive" as const }),
            delivery_estimate: {
              minimum: { unit: "business_day", value: ship.days[0] },
              maximum: { unit: "business_day", value: ship.days[1] },
            },
          },
        },
      ],
      allow_promotion_codes: true,
      automatic_tax: { enabled: automaticTax },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Bestellung Nr. ${order.number}`,
          footer: `${shop.name}, ${shop.city}. Vielen Dank für Ihren Einkauf.`,
          metadata: { orderId: order.id },
        },
      },
      submit_type: "pay",
      custom_text: {
        submit: {
          message: `Mit Klick auf „Bezahlen“ geben Sie eine zahlungspflichtige Bestellung ab. Es gelten unsere AGB (${shop.url}/agb) und die Widerrufsbelehrung (${shop.url}/widerruf).`,
        },
      },
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
      success_url: `${shop.url}/kasse/danke?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${shop.url}/warenkorb`,
    });

    await db.order.update({ where: { id: order.id }, data: { stripeSessionId: session.id } });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[checkout]", e);
    await db.order.update({ where: { id: order.id }, data: { status: "CANCELLED", note: "Stripe-Session fehlgeschlagen" } });
    return NextResponse.json({ error: "Die Zahlungsseite ist gerade nicht erreichbar. Bitte später erneut versuchen." }, { status: 502 });
  }
}
