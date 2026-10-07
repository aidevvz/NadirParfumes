import type { Metadata } from "next";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { euro } from "@/lib/money";
import { PurchaseTracker } from "./PurchaseTracker";

export const metadata: Metadata = { title: "Danke für Ihre Bestellung", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let order = null;
  if (session_id && /^cs_[A-Za-z0-9_]+$/.test(session_id)) {
    try {
      const s = await stripe().checkout.sessions.retrieve(session_id);
      const id = s.metadata?.orderId;
      if (id) order = await db.order.findUnique({ where: { id }, include: { items: true } });
      if (order && !order.email) order.email = s.customer_details?.email ?? null;
    } catch {}
  }

  return (
    <div className="mx-auto max-w-2xl px-5 pt-20 text-center md:pt-28">
      <div className="gold-rule mx-auto w-16" />
      <h1 className="mt-10 text-5xl md:text-6xl">Danke für Ihre Bestellung</h1>
      {order ? (
        <>
          <p className="mt-6 text-lg text-mist">
            Bestellnummer {order.number}. Die Bestätigung mit Rechnung geht an {order.email ?? "Ihre E-Mail-Adresse"}.
          </p>
          <ul className="mx-auto mt-10 max-w-md border-t border-ink text-left">
            {order.items.map((i) => (
              <li key={i.id} className="flex justify-between border-b border-line py-3">
                <span>{i.quantity} × {i.productName} {i.sizeMl} ml</span>
                <span>{euro(i.unitCents * i.quantity)}</span>
              </li>
            ))}
            <li className="flex justify-between py-3 text-lg">
              <span>Gesamt</span>
              <span>{euro(order.totalCents)}</span>
            </li>
          </ul>
          <PurchaseTracker
            orderNumber={order.number}
            value={order.totalCents / 100}
            shipping={order.shippingCents / 100}
            items={order.items.map((i) => ({ item_id: i.variantId ?? i.id, item_name: i.productName, item_variant: `${i.sizeMl} ml`, price: i.unitCents / 100, quantity: i.quantity }))}
          />
        </>
      ) : (
        <p className="mt-6 text-lg text-mist">Ihre Zahlung wird verarbeitet. Die Bestätigung kommt in wenigen Minuten per E-Mail.</p>
      )}
      <Link href="/parfums" className="btn btn-ghost mt-12">Weiter einkaufen</Link>
    </div>
  );
}
