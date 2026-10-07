import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { euro } from "@/lib/money";
import { shipping, type ShippingCountry } from "@/lib/config";
import { cancelAndRefund, markShipped, saveNote } from "../../../actions";
import { Card, StatusBadge, dateFmt } from "../../ui";
import { ConfirmButton } from "../../produkte/[id]/ConfirmButton";

type Addr = { line1?: string; line2?: string; postal_code?: string; city?: string; country?: string };

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = await db.order.findUnique({ where: { id }, include: { items: true } });
  if (!o) notFound();
  const a = (o.shippingAddress ?? {}) as Addr;
  const defaultCarrier = shipping[o.country as ShippingCountry]?.carrier ?? "";

  return (
    <div className="space-y-6">
      <Link href="/admin/bestellungen" className="text-sm underline">Alle Bestellungen</Link>
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-4xl">Bestellung {o.number}</h1>
        <StatusBadge s={o.status} />
      </div>
      {o.note && <p className="bg-gold-pale px-4 py-3 text-gold-deep">{o.note}</p>}

      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <Card>
          <h2 className="font-sans text-lg">Artikel</h2>
          <ul className="mt-4 divide-y divide-line">
            {o.items.map((i) => (
              <li key={i.id} className="flex justify-between py-2">
                <span>{i.quantity} × {i.productName} {i.sizeMl} ml</span>
                <span>{euro(i.unitCents * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 border-t border-ink pt-3 text-sm">
            <div className="flex justify-between"><dt>Versand</dt><dd>{euro(o.shippingCents)}</dd></div>
            {o.discountCents > 0 && <div className="flex justify-between"><dt>Rabatt</dt><dd>−{euro(o.discountCents)}</dd></div>}
            <div className="flex justify-between text-base"><dt>Gesamt</dt><dd>{euro(o.totalCents)}</dd></div>
          </dl>
          {o.invoiceUrl && <a href={o.invoiceUrl} target="_blank" className="mt-4 inline-block text-sm underline">Rechnung öffnen</a>}
        </Card>

        <Card>
          <h2 className="font-sans text-lg">Kunde und Lieferadresse</h2>
          <address className="mt-4 not-italic leading-relaxed">
            {o.customerName}<br />
            {a.line1}{a.line2 ? <><br />{a.line2}</> : null}<br />
            {a.postal_code} {a.city}<br />
            {a.country}
          </address>
          <p className="mt-3 text-sm"><a href={`mailto:${o.email}`} className="underline">{o.email}</a></p>
          <dl className="mt-4 space-y-1 text-sm text-mist">
            <div>Bestellt: {dateFmt.format(o.createdAt)}</div>
            {o.paidAt && <div>Bezahlt: {dateFmt.format(o.paidAt)}</div>}
            {o.shippedAt && <div>Versendet: {dateFmt.format(o.shippedAt)}{o.carrier ? ` mit ${o.carrier}` : ""}{o.trackingNumber ? `, Nr. ${o.trackingNumber}` : ""}</div>}
          </dl>
        </Card>
      </div>

      {o.status === "PAID" && (
        <Card>
          <h2 className="font-sans text-lg">Als versendet markieren</h2>
          <p className="mt-1 text-sm text-mist">Der Kunde bekommt automatisch eine E-Mail mit der Sendungsnummer. Paket mit LQ-Kennzeichnung (Gefahrgut in begrenzter Menge) versehen.</p>
          <form action={markShipped.bind(null, o.id)} className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label><span className="mb-1.5 block text-sm text-mist">Versanddienst</span><input name="carrier" defaultValue={defaultCarrier} className="field" /></label>
            <label><span className="mb-1.5 block text-sm text-mist">Sendungsnummer</span><input name="trackingNumber" className="field" /></label>
            <button className="btn btn-solid">Versendet</button>
          </form>
        </Card>
      )}

      {(o.status === "PAID" || o.status === "SHIPPED") && (
        <Card>
          <h2 className="font-sans text-lg">{o.status === "PAID" ? "Stornieren und erstatten" : "Erstatten (nach Rücksendung)"}</h2>
          <p className="mt-1 text-sm text-mist">Erstattet den vollen Betrag über Stripe auf die ursprüngliche Zahlungsart und informiert den Kunden per E-Mail. Teilerstattungen direkt im Stripe-Dashboard.</p>
          <form action={cancelAndRefund.bind(null, o.id)} className="mt-4 flex flex-wrap items-center gap-5">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="restock" defaultChecked={o.status === "PAID"} className="h-4 w-4 accent-black" /> Ware zurück in den Bestand buchen</label>
            <ConfirmButton message={`Bestellung ${o.number} wirklich erstatten (${euro(o.totalCents)})?`}>Erstatten</ConfirmButton>
          </form>
        </Card>
      )}

      <Card>
        <h2 className="font-sans text-lg">Interne Notiz</h2>
        <form action={saveNote.bind(null, o.id)} className="mt-3 space-y-3">
          <textarea name="note" defaultValue={o.note ?? ""} rows={3} className="field" />
          <button className="btn btn-ghost">Notiz speichern</button>
        </form>
      </Card>
    </div>
  );
}
