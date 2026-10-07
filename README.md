# Nadir Parfums: Onlineshop

Eigenbau-Shop für eine eigene Parfummarke. Versand nach Österreich, Deutschland und in die Schweiz.

**Stack:** Next.js 15 (App Router, serverseitiges Rendering), Tailwind CSS 4, Prisma mit Postgres, Stripe Checkout, Resend für E-Mails, Vercel Blob für Produktfotos. Hosting auf Vercel.

## Warum dieser Stack

| Entscheidung | Begründung |
|---|---|
| Next.js statt Astro | Shop mit Warenkorb, Checkout und Admin braucht viel Interaktivität. Produktseiten werden trotzdem serverseitig gerendert und gecacht (ISR), damit sie für Google und KI-Crawler vollständig lesbar sind. |
| Stripe als Kern statt Medusa | Bei einem Sortiment von wenigen Dutzend Düften wäre ein eigenes Commerce-Backend Overkill. Stripe Checkout übernimmt Zahlung, Gutscheine, Rechnungen und optional die Steuer. |
| Eigenes Admin statt CMS | Ein schlankes Backend unter `/admin`, zugeschnitten auf genau das, was im Alltag anfällt: Produkte, Bestand, Bestellungen, Versand, Storno. Kein zweites System, kein zweites Login. |
| Vercel + Neon Postgres | HTTPS, CDN, http→https-Weiterleitung und Deploy per Git-Push sind inklusive. Neon hat ein Rechenzentrum in Frankfurt (DSGVO). |

## Was drin ist

- **Landing Page** und Katalog mit Kategorien (Damen, Herren, Unisex, Nische), Suche und Filtern (Duftfamilie, Größe, Preis)
- **Produktseiten** mit Varianten (30/50/100 ml, je eigener Preis und Bestand), Duftpyramide, Grundpreis pro 100 ml und Lagerstatus
- **Warenkorb** mit Lieferland-Auswahl; Versandkosten stehen vor dem Kauf fest
- **Stripe Checkout** (Gastbestellung): Karte, EPS, PayPal, Klarna, Apple Pay, Google Pay. Preise werden immer serverseitig aus der Datenbank gerechnet.
- **Webhook**: markiert Bestellungen als bezahlt, bucht den Bestand ab (idempotent), versendet Bestellbestätigung und Shop-Benachrichtigung und erfasst Warenkorbabbrüche
- **Rechnungen**: Stripe erzeugt pro Bestellung eine Rechnung (`invoice_creation`), der Link steht in Bestätigungsmail und Admin
- **Admin** `/admin`: Übersicht (zu versenden, Umsatz, Abbrüche, niedriger Bestand), Produkte anlegen und bearbeiten, Fotos hochladen, Bestand schnell ändern, Versand mit Sendungsnummer melden (Kunde bekommt Mail), Storno/Erstattung über Stripe
- **Recht**: Impressum, Datenschutz, AGB, Widerrufsbelehrung mit Muster-Formular, Versand und Zahlung. Alle als **Entwurf mit Platzhaltern**, siehe unten.
- **Cookie-Consent**: Google Analytics 4 lädt erst nach Zustimmung. Events: `add_to_cart`, `begin_checkout`, `purchase`, `generate_lead`
- **SEO**: Title/Description pro Seite, Canonicals, sprechende URLs (`/parfum/nadir/ambre-de-nuit`), `sitemap.xml`, `robots.txt`, Schema.org (Product mit Offers, BreadcrumbList, Organization, WebSite, FAQPage, Article)
- **KI-Optimierung**: semantisches HTML, eigenständige Produkttexte, FAQ mit Schema, `/llms.txt` wird live aus dem Sortiment erzeugt
- **Sicherheit**: keine Zahlungsdaten auf dem Server, Prisma (kein SQL-Injection-Risiko), React-Escaping, Server Actions mit Origin-Prüfung, SameSite-strict-Admin-Cookie, Rate Limiting und Honeypot, Security-Header, Secrets nur in Umgebungsvariablen

## Lokal starten

```bash
npm install
cp .env.example .env        # Werte eintragen
npx prisma db push          # Tabellen anlegen
npm run db:seed             # 8 Beispieldüfte (Platzhalter)
npm run dev                 # http://localhost:3000, Admin unter /admin
```

Stripe-Webhooks lokal testen: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

## Livegang auf Vercel

1. Repo bei [vercel.com](https://vercel.com) importieren.
2. **Storage**: unter Storage eine Postgres-Datenbank (Neon, Region Frankfurt) und einen Blob-Store anlegen. `DATABASE_URL` und `BLOB_READ_WRITE_TOKEN` werden automatisch gesetzt.
3. Alle weiteren Variablen aus `.env.example` unter Settings → Environment Variables eintragen.
4. Einmalig Tabellen anlegen: lokal mit der Produktions-`DATABASE_URL` `npx prisma db push` ausführen.
5. **Stripe**:
   - Dashboard → Einstellungen → Zahlungsmethoden: Karte, EPS, PayPal, Klarna, Apple Pay, Google Pay aktivieren
   - Entwickler → Webhooks: Endpoint `https://<domain>/api/stripe/webhook` mit den Events `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`. Das Signing-Secret kommt in `STRIPE_WEBHOOK_SECRET`.
   - Einstellungen → Rechnungen: Firmendaten, UID-Nummer und Rechnungsnummernkreis hinterlegen (Pflichtangaben nach § 11 UStG)
   - Einstellungen → Kunden-E-Mails: „Erfolgreiche Zahlungen“ aktivieren, damit Stripe die Rechnung mitschickt
   - Gutscheine: Produktkatalog → Gutscheine → Gutschein und Promotion-Code anlegen. Kunden geben ihn im Checkout ein.
6. **Resend**: Domain verifizieren (DNS-Einträge), API-Key in `RESEND_API_KEY`, Absender in `EMAIL_FROM`.
7. Domain verbinden; HTTPS und die 301-Weiterleitung von http laufen bei Vercel automatisch.
8. Google Search Console: Domain bestätigen, `https://<domain>/sitemap.xml` einreichen. Produktseiten im [Rich Results Test](https://search.google.com/test/rich-results) prüfen.

## Offene Punkte und Hinweise

- **Shopname**: steht zentral in `src/lib/config.ts` (`shop.name`, `shop.brand`). Logo-Schriftzug „NADIR“ steht außerdem in `Header.tsx`, `Footer.tsx`, `Flakon.tsx`.
- **Rechtstexte prüfen lassen**: Alle Texte sind Entwürfe mit `[Platzhaltern]`. Besonders kritisch: Ausschluss des Rücktrittsrechts bei geöffneten Flakons (§ 18 Abs. 1 Z 5 FAGG, für Parfum umstritten), Haftungsklausel in den AGB und die Liste der Auftragsverarbeiter in der Datenschutzerklärung.
- **Bestellbutton**: Der finale Button heißt in Stripe „Bezahlen“; darüber steht der Hinweis auf die zahlungspflichtige Bestellung. Von der Anwältin bestätigen lassen.
- **Umsatzsteuer**: Preise sind brutto mit 20 % österreichischer USt. Solange die EU-Fernverkäufe unter 10.000 € pro Jahr liegen, gilt das auch für Deutschland. Darüber hinaus OSS-Registrierung und `STRIPE_AUTOMATIC_TAX=true` (Stripe Tax). Die **Schweiz** ist ein Drittland: Ausfuhrlieferung ohne österreichische USt, Zollinhaltserklärung nötig. Bitte mit der Steuerberatung klären, bevor CH aktiv beworben wird.
- **Gefahrgut**: Parfum ist UN 1266, Versand nur als „Limited Quantity“ (LQ-Raute auf dem Paket) und nur auf dem Landweg. Bei Post und DHL vorab einen Geschäftskundenvertrag mit Gefahrgut-Freigabe abschließen und klären, ob LQ in die Schweiz angenommen wird.
- **Werbeaussagen**: Texte wie „entworfen in Wien“, „in Folie versiegelt“ und die Duftbeschreibungen sind Platzhalter und müssen der Realität entsprechen.
- **Bewertungen**: Das AggregateRating-Schema ist bewusst noch nicht drin. Erst ergänzen, wenn echte Kundenbewertungen vorliegen.
- **Kundenkonto mit Bestellhistorie**: noch nicht gebaut (optional laut Anforderung). Nächste Ausbaustufe, z. B. per Magic-Link-Login.
- **Rate Limiting** ist In-Memory pro Server-Instanz. Für stärkeren Schutz Upstash Redis ergänzen.
- **Inhaltsstoffe (INCI)**: Kosmetikverordnung, auf der Verpackung Pflicht. Online empfehlenswert; das Feld kann bei Bedarf im Produktmodell ergänzt werden.

Anleitung für die Shop-Verwaltung: [ANLEITUNG-ADMIN.md](ANLEITUNG-ADMIN.md)
