import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { shop } from "@/lib/config";

export const metadata: Metadata = { title: "Kontakt", description: `Fragen zu Düften oder Bestellungen? Schreiben Sie ${shop.name}.`, alternates: { canonical: "/kontakt" } };

export default function Kontakt() {
  return (
    <div className="mx-auto grid max-w-5xl gap-14 px-5 pt-14 md:grid-cols-[1fr_1.4fr] md:pt-20">
      <div>
        <h1 className="text-5xl md:text-6xl">Kontakt</h1>
        <p className="mt-6 text-mist">Fragen zu einem Duft, zu Ihrer Bestellung oder einer Rücksendung? Wir antworten werktags innerhalb von 24 Stunden.</p>
        <dl className="mt-8 space-y-3">
          <div><dt className="text-sm text-mist">E-Mail</dt><dd><a href={`mailto:${shop.email}`} className="underline">{shop.email}</a></dd></div>
          <div><dt className="text-sm text-mist">Telefon</dt><dd>{shop.phone}</dd></div>
        </dl>
      </div>
      <ContactForm />
    </div>
  );
}
