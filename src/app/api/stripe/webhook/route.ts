import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { cancelPendingOrder, markOrderPaid } from "@/lib/orders";

/**
 * Stripe-Webhook. Im Stripe-Dashboard als Endpoint eintragen:
 *   https://<domain>/api/stripe/webhook
 * Events: checkout.session.completed, checkout.session.async_payment_succeeded,
 *         checkout.session.async_payment_failed, checkout.session.expired
 */
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return new NextResponse("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(await req.text(), sig, secret);
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  switch (event.type) {
    case "checkout.session.completed":
      // Karte, Apple/Google Pay, PayPal, Klarna: sofort "paid". Asynchrone Methoden folgen per async-Event.
      if (session.payment_status === "paid") await markOrderPaid(session);
      break;
    case "checkout.session.async_payment_succeeded":
      await markOrderPaid(session);
      break;
    case "checkout.session.async_payment_failed":
      await cancelPendingOrder(session, "Zahlung fehlgeschlagen");
      break;
    case "checkout.session.expired":
      await cancelPendingOrder(session, "Kasse verlassen (Warenkorbabbruch)");
      break;
  }
  return NextResponse.json({ received: true });
}
