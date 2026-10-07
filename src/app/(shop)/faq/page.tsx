import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/lib/content";
import { faqLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Häufige Fragen zu Parfum, Versand und Rückgabe",
  description: "Antworten zu Haltbarkeit, Echtheit, Versand als Gefahrgut, Zahlungsarten und Rücktrittsrecht.",
  alternates: { canonical: "/faq" },
};

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-14 md:pt-20">
      <h1 className="text-5xl md:text-6xl">Häufige Fragen</h1>
      <div className="mt-12 border-t border-ink">
        {faqs.map((f) => (
          <section key={f.q} className="border-b border-line py-7">
            <h2 className="text-2xl">{f.q}</h2>
            <p className="mt-3 text-mist">{f.a}</p>
          </section>
        ))}
      </div>
      <JsonLd data={faqLd(faqs)} />
    </div>
  );
}
