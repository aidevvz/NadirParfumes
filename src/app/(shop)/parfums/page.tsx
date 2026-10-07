import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { Filters } from "@/components/Filters";
import { categoryFromSlug } from "@/lib/config";
import { findProducts } from "@/lib/catalog";

type SP = Promise<Record<string, string | undefined>>;

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const sp = await searchParams;
  const filtered = Object.values(sp).some(Boolean);
  return {
    title: "Alle Düfte: Eau de Parfum und Extrait online kaufen",
    description: "Alle Nadir-Düfte im Überblick. Nach Duftfamilie, Größe und Preis filtern. Versand nach AT, DE und CH.",
    alternates: { canonical: "/parfums" },
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

export default async function AllProducts({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const products = await findProducts({
    q: sp.q?.trim().slice(0, 80) || undefined,
    category: sp.kategorie ? categoryFromSlug(sp.kategorie) ?? undefined : undefined,
    family: sp.duft || undefined,
    size: sp.groesse ? Number(sp.groesse) || undefined : undefined,
    maxPrice: sp.preis ? Number(sp.preis) || undefined : undefined,
    sort: (sp.sort as "neu" | "preis-auf" | "preis-ab") || "neu",
  });

  return (
    <div className="mx-auto max-w-7xl px-5 pt-14 md:px-10 md:pt-20">
      <h1 className="text-5xl md:text-6xl">Alle Düfte</h1>
      <p className="mt-4 max-w-xl text-mist">
        Das ganze Sortiment, filterbar nach Duftfamilie, Größe und Preis. Jeder Duft ist in 30, 50 und 100 ml erhältlich.
      </p>
      <div className="mt-10">
        <Filters action="/parfums" values={sp} />
      </div>
      <p className="mt-6 text-sm text-mist" aria-live="polite">
        {products.length === 1 ? "1 Duft" : `${products.length} Düfte`}
      </p>
      {products.length ? (
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} priority={i < 4} />
          ))}
        </div>
      ) : (
        <div className="mt-8 bg-veil px-6 py-16 text-center">
          <p className="font-display text-2xl">Kein Duft passt zu diesen Filtern.</p>
          <p className="mt-2 text-mist">Entfernen Sie einen Filter oder suchen Sie nach einer einzelnen Note, etwa „Vanille“.</p>
        </div>
      )}
    </div>
  );
}
