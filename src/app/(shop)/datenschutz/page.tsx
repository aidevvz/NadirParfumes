import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { shop } from "@/lib/config";

export const metadata: Metadata = { title: "Datenschutzerklärung", alternates: { canonical: "/datenschutz" } };

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>Verantwortlicher</h2>
      <p>[Firmenname], [Adresse], {shop.city}, E-Mail: {shop.email}</p>

      <h2>Welche Daten wir verarbeiten und warum</h2>
      <h3>Bestellungen</h3>
      <p>
        Für die Abwicklung Ihrer Bestellung verarbeiten wir Name, Lieferadresse, E-Mail-Adresse, Telefonnummer und die
        bestellten Artikel. Rechtsgrundlage ist die Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO). Rechnungsrelevante Daten
        bewahren wir sieben Jahre auf (§ 132 BAO, Art. 6 Abs. 1 lit. c DSGVO).
      </p>
      <h3>Zahlung über Stripe</h3>
      <p>
        Zahlungen wickelt Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Dublin, Irland ab. Ihre Zahlungsdaten
        (z. B. Kartennummer) geben Sie direkt bei Stripe ein; sie erreichen unsere Server nie. Stripe kann Daten in die USA
        übermitteln; Grundlage ist der EU-US Data Privacy Framework bzw. Standardvertragsklauseln.
      </p>
      <h3>Versand</h3>
      <p>Für die Zustellung geben wir Name und Lieferadresse an den Versanddienst weiter ([Österreichische Post AG, DHL]).</p>
      <h3>E-Mails</h3>
      <p>Bestell- und Versandbestätigungen versenden wir über [Resend, Inc., USA], auf Grundlage von Standardvertragsklauseln.</p>
      <h3>Kontaktformular</h3>
      <p>Ihre Nachricht und Kontaktdaten verwenden wir nur zur Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO) und löschen sie nach Abschluss, sofern keine Aufbewahrungspflicht besteht.</p>
      <h3>Hosting</h3>
      <p>Der Shop wird bei [Vercel Inc., USA] gehostet, die Datenbank bei [Neon Inc., Rechenzentrum Frankfurt]. Beim Aufruf werden technisch notwendige Daten wie IP-Adresse und Zeitpunkt in Server-Logs verarbeitet (Art. 6 Abs. 1 lit. f DSGVO).</p>

      <h2>Cookies, lokale Speicherung und Analyse</h2>
      <p>
        Technisch notwendig speichern wir Ihren Warenkorb und Ihre Cookie-Entscheidung im lokalen Speicher Ihres Browsers.
        Google Analytics 4 (Google Ireland Ltd.) laden wir nur, wenn Sie im Cookie-Banner zustimmen (Art. 6 Abs. 1 lit. a
        DSGVO, § 165 Abs. 3 TKG 2021). IP-Adressen werden gekürzt. Ihre Zustimmung können Sie jederzeit über
        „Cookie-Einstellungen“ im Fußbereich widerrufen.
      </p>

      <h2>Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Schreiben
        Sie dazu an {shop.email}. Sie können sich außerdem bei der Österreichischen Datenschutzbehörde, Barichgasse 40–42,
        1030 Wien, beschweren.
      </p>
    </LegalPage>
  );
}
