import type { Metadata } from "next";
import { shipping, type ShippingCountry } from "@/lib/config";
import { euro } from "@/lib/money";

export const metadata: Metadata = {
  title: "Versand und Zahlung",
  description: "Versandkosten und Lieferzeiten nach Österreich, Deutschland und in die Schweiz. Zahlung mit EPS, Klarna, PayPal, Karte, Apple Pay und Google Pay.",
  alternates: { canonical: "/versand-zahlung" },
};

export default function VersandZahlung() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-14 md:pt-20">
      <h1 className="text-5xl md:text-6xl">Versand und Zahlung</h1>
      <div className="prose-shop mt-10">
        <h2>Versandkosten und Lieferzeiten</h2>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left">
          <thead className="border-b border-ink text-sm text-mist">
            <tr><th className="py-3 font-normal">Land</th><th className="py-3 font-normal">Versand</th><th className="py-3 font-normal">Kostenlos ab</th><th className="py-3 font-normal">Lieferzeit</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {(Object.keys(shipping) as ShippingCountry[]).map((c) => {
              const s = shipping[c];
              return (
                <tr key={c}>
                  <td className="py-3">{s.label}</td>
                  <td className="py-3">{euro(s.priceCents)}</td>
                  <td className="py-3">{s.freeFromCents ? euro(s.freeFromCents) : "–"}</td>
                  <td className="py-3">{s.days[0]}–{s.days[1]} Werktage</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="prose-shop">
        <p className="mt-6">Alle Preise inklusive 20 % österreichischer Umsatzsteuer. Wir versenden innerhalb von 1–2 Werktagen nach Zahlungseingang.</p>
        <h2>Warum kein Expressversand?</h2>
        <p>Parfum enthält Alkohol und gilt im Versand als Gefahrgut in begrenzter Menge (Limited Quantity). Solche Pakete dürfen nur auf dem Landweg transportiert werden. Luftfracht und damit Expressversand über Nacht sind ausgeschlossen.</p>
        <h2>Schweiz</h2>
        <p>Sendungen in die Schweiz werden verzollt. Dabei können Schweizer Mehrwertsteuer und Gebühren des Zustellers anfallen, die der Empfänger trägt.</p>
        <h2>Zahlungsarten</h2>
        <ul>
          <li>Kreditkarte (Visa, Mastercard, American Express)</li>
          <li>EPS-Überweisung (österreichische Banken)</li>
          <li>PayPal</li>
          <li>Klarna: Rechnung oder Ratenkauf</li>
          <li>Apple Pay und Google Pay</li>
        </ul>
        <p>Die Zahlung läuft vollständig über Stripe. Karten- und Kontodaten werden nicht auf unseren Servern gespeichert. Gutscheincodes geben Sie auf der Zahlungsseite ein.</p>
      </div>
    </div>
  );
}
