import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { company, shop } from "@/lib/config";

export const metadata: Metadata = { title: "Impressum", alternates: { canonical: "/impressum" } };

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <p>Informationen gemäß § 5 E-Commerce-Gesetz, § 14 Unternehmensgesetzbuch und § 25 Mediengesetz.</p>
      <h2>Unternehmen</h2>
      <p>
        {company.name}<br />
        {company.legalForm}<br />
        {company.street}<br />
        {company.zip} {company.city}, {company.country}
      </p>
      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${shop.email}`}>{shop.email}</a>
      </p>
      <h2>Registerangaben</h2>
      <p>
        Firmenbuchnummer: {company.fn}<br />
        Firmenbuchgericht: {company.court}<br />
        Sitz: {company.city}
      </p>
      <h2>Gewerbe und Aufsicht</h2>
      <p>
        Unternehmensgegenstand: Handel mit Parfums und Kosmetik<br />
        Gewerbebehörde: Magistrat der Landeshauptstadt Klagenfurt am Wörthersee<br />
        Kammerzugehörigkeit: Wirtschaftskammer Kärnten<br />
        Anwendbare Rechtsvorschriften: Gewerbeordnung, abrufbar unter <a href="https://www.ris.bka.gv.at">www.ris.bka.gv.at</a>
      </p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>
      <h2>Bildnachweis</h2>
      <p>Stimmungsbilder: <a href="https://unsplash.com">Unsplash</a>, verwendet unter der Unsplash-Lizenz. Produktabbildungen: {shop.name}.</p>
      <h2>Offenlegung nach § 25 MedienG</h2>
      <p>Medieninhaber: {company.name}, {company.street}, {company.zip} {company.city}. Grundlegende Richtung: Information über und Verkauf von Parfums der Marke {shop.brand}.</p>
    </LegalPage>
  );
}
