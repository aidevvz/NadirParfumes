import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Filters } from "@/components/Filters";
import { JsonLd } from "@/components/JsonLd";
import { categories, categoryFromSlug } from "@/lib/config";
import { findProducts } from "@/lib/catalog";
import { breadcrumbLd } from "@/lib/seo";

type Params = Promise<{ slug: string }>;
type SP = Promise<Record<string, string | undefined>>;

const seoText: Record<string, { title: string; text: string[] }> = {
  damen: {
    title: "Damenparfum online kaufen",
    text: [
      "Unsere Damendüfte reichen von pudriger Iris bis zur modernen Chypre mit Rose und Eichenmoos. Alle sind als Eau de Parfum konzentriert und halten auf der Haut mehrere Stunden.",
      "Unsicher, welche Richtung passt? Blumige Düfte wirken hell und nah, Chypre-Düfte haben mehr Struktur und Tiefe.",
    ],
  },
  herren: {
    title: "Herrenparfum online kaufen",
    text: [
      "Unsere Herrendüfte setzen auf Hölzer, Vetiver und Gewürze. Von frisch für den Alltag bis rauchig für den Abend.",
      "Holzige Düfte halten besonders lang, frische Düfte eignen sich für Büro und Sommer.",
    ],
  },
  unisex: {
    title: "Unisex-Parfum online kaufen",
    text: [
      "Düfte ohne Zuordnung: Ambra, Neroli und Hölzer, die auf jeder Haut funktionieren.",
      "Unisex heißt nicht neutral. Diese Kompositionen haben Charakter, nur ohne Etikett.",
    ],
  },
  nische: {
    title: "Nischenparfum online kaufen",
    text: [
      "Unsere Nischendüfte arbeiten mit ungewöhnlichen Rohstoffen wie Oud, Safran oder geräucherter Vanille, teils als Extrait de Parfum mit besonders hoher Konzentration.",
      "Sie werden in kleinen Mengen produziert. Ist eine Größe ausverkauft, füllen wir mit der nächsten Charge nach.",
    ],
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const key = categoryFromSlug(slug);
  if (!key) return {};
  return {
    title: seoText[slug].title,
    description: `${categories[key].intro} ${seoText[slug].text[0]}`.slice(0, 158),
    alternates: { canonical: `/kategorie/${slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: { params: Params; searchParams: SP }) {
  const { slug } = await params;
  const sp = await searchParams;
  const key = categoryFromSlug(slug);
  if (!key) notFound();
  const cat = categories[key];

  const products = await findProducts({
    category: key,
    q: sp.q?.trim().slice(0, 80) || undefined,
    family: sp.duft || undefined,
    size: sp.groesse ? Number(sp.groesse) || undefined : undefined,
    maxPrice: sp.preis ? Number(sp.preis) || undefined : undefined,
    sort: (sp.sort as "neu" | "preis-auf" | "preis-ab") || "neu",
  });

  return (
    <div className="mx-auto max-w-7xl px-5 pt-14 md:px-10 md:pt-20">
      <nav aria-label="Brotkrumen" className="text-sm text-mist">
        <Link href="/" className="hover:text-gold-deep">Start</Link> / <Link href="/parfums" className="hover:text-gold-deep">Düfte</Link> / {cat.label}
      </nav>
      <h1 className="mt-6 text-5xl md:text-6xl">{cat.label}</h1>
      <p className="mt-4 max-w-xl text-mist">{cat.intro}</p>
      <div className="mt-10">
        <Filters action={`/kategorie/${slug}`} values={sp} hideCategory />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
        {products.map((p, i) => (
          <ProductCard key={p.id} p={p} priority={i < 4} />
        ))}
      </div>
      {!products.length && <p className="mt-8 bg-veil px-6 py-16 text-center">Kein Duft passt zu diesen Filtern.</p>}

      <section className="mt-24 max-w-2xl">
        <h2 className="text-3xl">{seoText[slug].title}</h2>
        {seoText[slug].text.map((t) => (
          <p key={t} className="mt-4 text-mist">{t}</p>
        ))}
      </section>
      <JsonLd data={breadcrumbLd([["Start", "/"], ["Düfte", "/parfums"], [cat.label, `/kategorie/${slug}`]])} />
    </div>
  );
}
