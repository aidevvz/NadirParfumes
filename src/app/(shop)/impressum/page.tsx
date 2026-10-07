import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { shop } from "@/lib/config";

export const metadata: Metadata = { title: "Impressum", alternates: { canonical: "/impressum" } };

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <p>Informationen gemäß § 5 E-Commerce-Gesetz, § 14 Unternehmensgesetzbuch und § 25 Mediengesetz.</p>
      <h2>Unternehmen</h2>
      <p>
        [Firmenname laut Firmenbuch]<br />
        [Rechtsform, z. B. GmbH oder Einzelunternehmen]<br />
        [Straße Hausnummer]<br />
        [PLZ] {shop.city}, Österreich
      </p>
      <h2>Kontakt</h2>
      <p>
        E-Mail: {shop.email}<br />
        Telefon: {shop.phone}
      </p>
      <h2>Registerangaben</h2>
      <p>
        Firmenbuchnummer: [FN 000000a]<br />
        Firmenbuchgericht: [Handelsgericht Wien]<br />
        UID-Nummer: [ATU00000000]<br />
        Geschäftsführung: [Name]
      </p>
      <h2>Gewerbe und Aufsicht</h2>
      <p>
        Unternehmensgegenstand: Handel mit Parfums und Kosmetik<br />
        Gewerbeberechtigung: [Handelsgewerbe], verliehen in Österreich<br />
        Zuständige Behörde: [Magistratisches Bezirksamt des … Bezirks]<br />
        Kammerzugehörigkeit: Wirtschaftskammer Wien, Sparte Handel<br />
        Anwendbare Rechtsvorschriften: Gewerbeordnung, abrufbar unter <a href="https://www.ris.bka.gv.at">www.ris.bka.gv.at</a>
      </p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen. [Alternativ: Beitritt zur Internet Ombudsstelle, www.ombudsstelle.at.]
      </p>
      <h2>Bildnachweis</h2>
      <p>Stimmungsbilder: <a href="https://unsplash.com">Unsplash</a>, verwendet unter der Unsplash-Lizenz. Produktabbildungen: {shop.name}.</p>
      <h2>Offenlegung nach § 25 MedienG</h2>
      <p>Medieninhaber: [Firmenname]. Grundlegende Richtung: Information über und Verkauf von Parfums der Marke {shop.brand}.</p>
    </LegalPage>
  );
}
