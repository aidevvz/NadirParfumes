import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { Filters } from "@/components/Filters";
import { categoryFromSlug } from "@/lib/config";
import { findProducts } from "@/lib/catalog";
import { db } from "@/lib/db";

type SP = Promise<Record<string, string | undefined>>;

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const sp = await searchParams;
  const filtered = Object.values(sp).some(Boolean);
  return {
    title: "The Collection: NADIR Extrait de Parfum kaufen",
    description: "Aurelis, Essencia und Red Velvet: die drei NADIR Extraits de Parfum, je 50 ml. Versand nach Österreich, Deutschland und in die Schweiz.",
    alternates: { canonical: "/parfums" },
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

export default async function AllProducts({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const total = await db.product.count({ where: { active: true } });
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
      <p className="label text-gold-deep">Shop</p>
      <h1 className="claim mt-5 text-[clamp(2.8rem,7vw,5.5rem)]">The Collection</h1>
      <p className="mt-5 max-w-xl text-lg text-mist">
        Drei Extraits de Parfum, je 50 ml. Frisch und leuchtend, warm und sinnlich, kraftvoll und intensiv.
      </p>
      {(total > 6 || Object.values(sp).some(Boolean)) && (
        <div className="mt-10">
          <Filters action="/parfums" values={sp} />
        </div>
      )}
      <p className="mt-6 text-sm text-mist" aria-live="polite">
        {products.length === 1 ? "1 Duft" : `${products.length} Düfte`}
      </p>
      {products.length ? (
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
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
