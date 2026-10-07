"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/Cart";
import { Flakon } from "@/components/Flakon";
import { track } from "@/components/analytics";
import { shipping, shippingFor, type ShippingCountry } from "@/lib/config";
import { euro, includedVat } from "@/lib/money";

export function CartView() {
  const { lines, setQty, remove, subtotalCents, ready } = useCart();
  const [country, setCountry] = useState<ShippingCountry>("AT");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!ready) return <p className="mt-10 text-mist">Warenkorb wird geladen …</p>;

  if (!lines.length)
    return (
      <div className="mt-10 bg-veil px-6 py-20 text-center">
        <p className="font-display text-3xl">Ihr Warenkorb ist leer.</p>
        <p className="mt-3 text-mist">Wählen Sie einen Duft und eine Größe, dann erscheint er hier.</p>
        <Link href="/parfums" className="btn btn-solid mt-8">
          Düfte entdecken
        </Link>
      </div>
    );

  const ship = shippingFor(country, subtotalCents);
  const total = subtotalCents + ship.cents;

  async function checkout() {
    setBusy(true);
    setError(null);
    track("begin_checkout", { currency: "EUR", value: total / 100 });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, items: lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity })) }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Die Kasse konnte nicht geöffnet werden.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Die Kasse konnte nicht geöffnet werden.");
      setBusy(false);
    }
  }

  return (
    <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
      <ul className="border-t border-ink">
        {lines.map((l) => (
          <li key={l.variantId} className="flex gap-5 border-b border-line py-6">
            <Link href={l.href} className="relative h-32 w-26 shrink-0 bg-veil">
              {l.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <Flakon color={l.color} className="absolute inset-0 m-auto h-[80%] w-auto" />
              )}
            </Link>
            <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row">
              <div>
                <Link href={l.href} className="font-display text-2xl hover:text-gold-deep">
                  {l.productName}
                </Link>
                <p className="text-sm text-mist">{l.sizeMl} ml, {euro(l.priceCents)} pro Stück</p>
                <button onClick={() => remove(l.variantId)} className="mt-3 text-sm underline hover:text-gold-deep">
                  Entfernen
                </button>
              </div>
              <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                <div className="flex items-center border border-line">
                  <button className="h-10 w-10" aria-label={`${l.productName} Menge verringern`} onClick={() => setQty(l.variantId, l.quantity - 1)}>
                    −
                  </button>
                  <span className="w-8 text-center" aria-live="polite">{l.quantity}</span>
                  <button
                    className="h-10 w-10 disabled:opacity-30"
                    aria-label={`${l.productName} Menge erhöhen`}
                    disabled={l.quantity >= l.maxStock}
                    onClick={() => setQty(l.variantId, l.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <p className="text-lg">{euro(l.priceCents * l.quantity)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="self-start bg-veil p-7">
        <h2 className="text-2xl">Zusammenfassung</h2>
        <label className="mt-6 block">
          <span className="mb-1.5 block text-sm text-mist">Lieferland</span>
          <select className="field" value={country} onChange={(e) => setCountry(e.target.value as ShippingCountry)}>
            {(Object.keys(shipping) as ShippingCountry[]).map((c) => (
              <option key={c} value={c}>{shipping[c].label}</option>
            ))}
          </select>
        </label>
        <dl className="mt-6 space-y-3 text-[0.95rem]">
          <div className="flex justify-between"><dt>Zwischensumme</dt><dd>{euro(subtotalCents)}</dd></div>
          <div className="flex justify-between">
            <dt>Versand nach {ship.label}</dt>
            <dd>{ship.free ? "kostenlos" : euro(ship.cents)}</dd>
          </div>
          {!ship.free && ship.freeFromCents !== null && (
            <p className="text-sm text-gold-deep">Noch {euro(ship.freeFromCents - subtotalCents)} bis zum kostenlosen Versand.</p>
          )}
          <div className="flex justify-between border-t border-ink pt-3 text-lg">
            <dt>Gesamt</dt><dd>{euro(total)}</dd>
          </div>
          <p className="text-sm text-mist">inkl. {euro(includedVat(total))} USt (20 %). Lieferzeit {ship.days[0]}–{ship.days[1]} Werktage, Versanddienst: {ship.carrier}.</p>
          {country === "CH" && (
            <p className="text-sm text-mist">Bei Lieferung in die Schweiz können Einfuhrabgaben und Gebühren anfallen, die der Empfänger trägt.</p>
          )}
        </dl>
        <button className="btn btn-solid mt-7 w-full" onClick={checkout} disabled={busy}>
          {busy ? "Kasse wird geöffnet …" : "Weiter zur Kasse"}
        </button>
        {error && <p role="alert" className="mt-3 text-sm text-[#a12a2a]">{error}</p>}
        <p className="mt-4 text-xs leading-relaxed text-mist">
          Sie zahlen auf der sicheren Seite von Stripe mit Karte, EPS, PayPal, Klarna, Apple Pay oder Google Pay.
          Gutscheincodes geben Sie dort ein. Es gelten unsere <Link href="/agb" className="underline">AGB</Link> und die{" "}
          <Link href="/widerruf" className="underline">Widerrufsbelehrung</Link>.
        </p>
      </aside>
    </div>
  );
}
