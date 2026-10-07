import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { shop } from "@/lib/config";

export const metadata: Metadata = { title: "Allgemeine Geschäftsbedingungen", alternates: { canonical: "/agb" } };

export default function AGB() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <h2>1. Geltungsbereich</h2>
      <p>Diese AGB gelten für alle Bestellungen über {shop.url.replace(/^https?:\/\//, "")} bei [Firmenname] („wir“). Gegenüber Verbrauchern gelten zwingende gesetzliche Bestimmungen vorrangig.</p>
      <h2>2. Vertragsschluss</h2>
      <p>Die Darstellung der Produkte ist kein bindendes Angebot. Mit Klick auf „Bezahlen“ auf der Zahlungsseite geben Sie ein verbindliches, zahlungspflichtiges Angebot ab. Der Vertrag kommt mit unserer Bestellbestätigung per E-Mail zustande. Vertragssprache ist Deutsch.</p>
      <h2>3. Preise und Versandkosten</h2>
      <p>Alle Preise sind Endpreise in Euro inklusive der gesetzlichen Umsatzsteuer. Versandkosten werden im Warenkorb vor der Bestellung ausgewiesen; Details unter <Link href="/versand-zahlung">Versand und Zahlung</Link>. Bei Lieferung in die Schweiz können Einfuhrabgaben anfallen, die der Empfänger trägt.</p>
      <h2>4. Zahlung</h2>
      <p>Die Zahlung erfolgt über Stripe per Kreditkarte, EPS, PayPal, Klarna, Apple Pay oder Google Pay. Bei Klarna gelten zusätzlich die Bedingungen von Klarna.</p>
      <h2>5. Lieferung</h2>
      <p>Wir liefern nach Österreich, Deutschland und in die Schweiz. Parfum enthält Alkohol und wird als Gefahrgut in begrenzter Menge ausschließlich auf dem Landweg versendet. Die angegebenen Lieferzeiten gelten ab Zahlungseingang.</p>
      <h2>6. Eigentumsvorbehalt</h2>
      <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
      <h2>7. Rücktrittsrecht</h2>
      <p>Verbrauchern steht ein 14-tägiges Rücktrittsrecht zu. Einzelheiten in der <Link href="/widerruf">Widerrufsbelehrung</Link>.</p>
      <h2>8. Gewährleistung</h2>
      <p>Es gilt die gesetzliche Gewährleistung nach dem Verbrauchergewährleistungsgesetz (VGG) bzw. ABGB.</p>
      <h2>9. Haftung</h2>
      <p>Wir haften nicht für leichte Fahrlässigkeit, ausgenommen bei Personenschäden. [Formulierung prüfen lassen.] Bitte beachten Sie bei Allergien die Inhaltsstoffangaben auf der Verpackung.</p>
      <h2>10. Recht und Gerichtsstand</h2>
      <p>Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts. Für Verbraucher bleibt der Schutz zwingender Bestimmungen ihres Wohnsitzstaates unberührt.</p>
    </LegalPage>
  );
}
