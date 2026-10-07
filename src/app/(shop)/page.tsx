import Link from "next/link";
import { Flakon } from "@/components/Flakon";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { db } from "@/lib/db";
import { productInclude } from "@/lib/catalog";
import { categories, shipping, type CategoryKey } from "@/lib/config";
import { faqs, articles } from "@/lib/content";
import { faqLd } from "@/lib/seo";
import { euro } from "@/lib/money";

export const revalidate = 300;

export const metadata = { alternates: { canonical: "/" } };

const families: { name: string; notes: string }[] = [
  { name: "Blumig", notes: "Iris, Rose, Neroli" },
  { name: "Holzig", notes: "Zeder, Vetiver, Guajak" },
  { name: "Ambra", notes: "Labdanum, Vanille, Safran" },
  { name: "Frisch", notes: "Bitterorange, Ingwer, Meersalz" },
  { name: "Gourmand", notes: "Kakao, Tonka, Tabak" },
  { name: "Chypre", notes: "Bergamotte, Rose, Eichenmoos" },
];

export default async function Home() {
  const featured = await db.product.findMany({
    where: { active: true, featured: true },
    include: productInclude,
    take: 4,
    orderBy: { createdAt: "asc" },
  });
  const homeFaqs = faqs.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-10 md:pb-28 md:pt-20">
        <div className="order-2 md:order-1">
          <h1 className="text-[clamp(3rem,7.2vw,6.25rem)] leading-[0.98]">
            Eau de Parfum,
            <br />
            das bleibt.
          </h1>
          <div className="gold-rule mt-10 w-24" />
          <p className="mt-8 max-w-md text-lg text-mist">
            Acht Kompositionen aus Wien, mit klar benannten Duftnoten und hoher Konzentration. Abgefüllt in 30, 50 und
            100 ml.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/parfums" className="btn btn-solid">
              Düfte entdecken
            </Link>
            <Link href="#duftfamilien" className="btn btn-ghost">
              Nach Duftfamilie wählen
            </Link>
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] bg-veil md:max-w-[520px]">
            <div className="absolute inset-6 border border-gold/40" aria-hidden />
            <Flakon color="#C9A25E" label="AMBRE DE NUIT" hero className="absolute inset-0 m-auto h-[74%] w-auto" title="Flakon Ambre de Nuit" />
          </div>
        </div>
      </section>

      {/* Vertrauen */}
      <section aria-label="Service" className="border-y border-line">
        <ul className="mx-auto grid max-w-7xl divide-line px-5 text-[0.95rem] sm:grid-cols-3 sm:divide-x md:px-10">
          <li className="py-5 sm:px-6 sm:first:pl-0">
            Versand in Österreich in {shipping.AT.days[0]}–{shipping.AT.days[1]} Werktagen, ab {euro(shipping.AT.freeFromCents!)} kostenlos
          </li>
          <li className="border-t border-line py-5 sm:border-t-0 sm:px-6">14 Tage Rücktrittsrecht ab Erhalt</li>
          <li className="border-t border-line py-5 sm:border-t-0 sm:px-6">Sicher bezahlen mit EPS, Klarna, PayPal oder Karte</li>
        </ul>
      </section>

      {/* Ausgewählte Düfte */}
      <section className="mx-auto max-w-7xl px-5 pt-24 md:px-10 md:pt-32">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl">Ausgewählte Düfte</h2>
          <Link href="/parfums" className="shrink-0 pb-1 text-[0.95rem] underline hover:text-gold-deep">
            Alle Düfte ansehen
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {featured.map((p, i) => (
            <ProductCard key={p.id} p={p} priority={i < 2} />
          ))}
        </div>
      </section>

      {/* Duftfamilien: Typografie als Navigation */}
      <section id="duftfamilien" className="mx-auto mt-28 max-w-7xl scroll-mt-24 px-5 md:mt-40 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-4xl md:text-5xl">Wählen Sie nach Duftfamilie</h2>
            <p className="mt-5 max-w-sm text-mist">
              Sie wissen, was Ihnen gefällt, aber nicht wie es heißt? Beginnen Sie bei der Familie. Die typischen Noten
              stehen daneben.
            </p>
          </div>
          <ul className="border-t border-ink">
            {families.map((f) => (
              <li key={f.name} className="border-b border-line">
                <Link
                  href={`/parfums?duft=${encodeURIComponent(f.name)}`}
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-none transition-colors group-hover:text-gold">
                    {f.name}
                  </span>
                  <span className="text-right text-sm text-mist group-hover:text-gold-deep">{f.notes}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Duftpyramide erklärt: echte zeitliche Abfolge */}
      <section className="mt-28 bg-veil md:mt-40">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <h2 className="max-w-xl text-4xl md:text-5xl">So entfaltet sich ein Duft</h2>
          <p className="mt-5 max-w-xl text-mist">
            Auf jeder Produktseite finden Sie Kopf-, Herz- und Basisnote. Sie beschreiben, wie sich ein Parfum über den
            Tag verändert.
          </p>
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              ["Kopfnote", "Die ersten 15 Minuten", "Leichte, flüchtige Stoffe wie Zitrus, Pfeffer und Aldehyde. Der erste Eindruck auf dem Teststreifen."],
              ["Herznote", "Bis etwa drei Stunden", "Blüten, Gewürze und grüne Noten. Sie geben dem Duft seinen Charakter."],
              ["Basisnote", "Ab drei Stunden bis zum Abend", "Hölzer, Harze, Vanille und Moschus. Sie bleiben am längsten auf Haut und Kleidung."],
            ].map(([title, time, text], i) => (
              <li key={title} className="border-t border-gold pt-6">
                <p className="font-display text-5xl text-gold">{i + 1}</p>
                <h3 className="mt-4 text-2xl">{title}</h3>
                <p className="mt-1 text-sm text-gold-deep">{time}</p>
                <p className="mt-3 text-mist">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Kategorien */}
      <section className="mx-auto mt-28 max-w-7xl px-5 md:mt-40 md:px-10">
        <h2 className="text-4xl md:text-5xl">Für wen</h2>
        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(categories) as CategoryKey[]).map((k) => (
            <Link key={k} href={`/kategorie/${categories[k].slug}`} className="group bg-paper p-8 transition-colors hover:bg-veil">
              <h3 className="text-3xl group-hover:text-gold-deep">{categories[k].label}</h3>
              <p className="mt-3 text-sm text-mist">{categories[k].intro}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Herkunft */}
      <section className="mx-auto mt-28 grid max-w-7xl gap-10 px-5 md:mt-40 md:grid-cols-2 md:gap-20 md:px-10">
        <h2 className="text-4xl md:text-5xl">Direkt von der Marke, ohne Umweg</h2>
        <div className="space-y-5 text-mist">
          <p>
            Wir verkaufen ausschließlich Düfte unserer eigenen Marke Nadir. Jeder Flakon kommt direkt von uns,
            originalverpackt und in Folie versiegelt. Graumarkt und Fälschungen haben so keinen Weg in Ihre Bestellung.
          </p>
          <p>
            Auf jeder Produktseite stehen Konzentration, Duftfamilie und alle Noten. So wissen Sie vor dem Kauf, was Sie
            bekommen, und können Düfte miteinander vergleichen.
          </p>
          <Link href="/faq" className="inline-block text-ink underline hover:text-gold-deep">
            Fragen zu Echtheit, Versand und Rückgabe
          </Link>
        </div>
      </section>

      {/* FAQ-Auszug */}
      <section className="mx-auto mt-28 max-w-3xl px-5 md:mt-40">
        <h2 className="text-4xl md:text-5xl">Häufige Fragen</h2>
        <div className="mt-10 border-t border-ink">
          {homeFaqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-2xl text-gold transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="pb-6 text-mist">{f.a}</p>
            </details>
          ))}
        </div>
        <JsonLd data={faqLd(homeFaqs)} />
      </section>

      {/* Ratgeber */}
      <section className="mx-auto mt-28 max-w-7xl px-5 md:mt-40 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl">Aus dem Ratgeber</h2>
          <Link href="/ratgeber" className="shrink-0 pb-1 text-[0.95rem] underline hover:text-gold-deep">
            Alle Artikel
          </Link>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {articles.map((a) => (
            <article key={a.slug} className="border-t border-line pt-6">
              <h3 className="text-2xl leading-snug">
                <Link href={`/ratgeber/${a.slug}`} className="hover:text-gold-deep">
                  {a.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm text-mist">{a.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
