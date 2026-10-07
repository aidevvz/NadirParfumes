import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/BuyBox";
import { Flakon } from "@/components/Flakon";
import { ScentPyramid } from "@/components/ScentPyramid";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { categories, concentrationLabel, shipping } from "@/lib/config";
import { getProduct, productInclude, productPath, fromPrice } from "@/lib/catalog";
import { breadcrumbLd, productLd } from "@/lib/seo";
import { db } from "@/lib/db";
import { euro } from "@/lib/money";

export const revalidate = 300;

type Params = Promise<{ marke: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { marke, slug } = await params;
  const p = await getProduct(marke, slug);
  if (!p) return {};
  const title = `${p.name} ${concentrationLabel[p.concentration]} ab ${euro(fromPrice(p))}`;
  const image = p.images[0]?.url ?? `/api/og/${p.slug}`;
  return {
    title,
    description: `${p.shortDescription} Duftnoten: ${[...p.topNotes, ...p.heartNotes, ...p.baseNotes].slice(0, 5).join(", ")}.`.slice(0, 160),
    alternates: { canonical: productPath(p) },
    openGraph: { title, description: p.shortDescription, images: [{ url: image, width: 1200, height: 1200 }] },
  };
}

export default async function ProductPage({ params, searchParams }: { params: Params; searchParams: Promise<{ groesse?: string }> }) {
  const { marke, slug } = await params;
  const { groesse } = await searchParams;
  const p = await getProduct(marke, slug);
  if (!p) notFound();

  const cat = categories[p.category];
  const related = await db.product.findMany({
    where: { active: true, id: { not: p.id }, OR: [{ fragranceFamily: p.fragranceFamily }, { category: p.category }] },
    include: productInclude,
    take: 4,
  });

  return (
    <div className="mx-auto max-w-7xl px-5 pt-8 md:px-10 md:pt-12">
      <nav aria-label="Brotkrumen" className="text-sm text-mist">
        <Link href="/" className="hover:text-gold-deep">Start</Link> /{" "}
        <Link href={`/kategorie/${cat.slug}`} className="hover:text-gold-deep">{cat.label}</Link> / {p.name}
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
        {/* Bilder */}
        <div className="grid gap-3">
          {p.images.length ? (
            p.images.map((img, i) => (
              <div key={img.id} className="relative aspect-[4/5] bg-veil">
                <Image src={img.url} alt={img.alt} fill priority={i === 0} sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
              </div>
            ))
          ) : (
            <div className="relative aspect-[4/5] bg-veil">
              <div className="absolute inset-6 border border-gold/30" aria-hidden />
              <Flakon color={p.accentColor} label={p.name.toUpperCase()} className="absolute inset-0 m-auto h-[76%] w-auto" title={`Flakon ${p.name}`} />
            </div>
          )}
        </div>

        {/* Kaufbereich */}
        <div className="md:sticky md:top-28 md:self-start">
          <p className="text-sm text-gold-deep">
            {p.brandName}, {concentrationLabel[p.concentration]}
          </p>
          <h1 className="mt-2 text-5xl md:text-6xl">{p.name}</h1>
          <p className="mt-5 text-lg text-mist">{p.shortDescription}</p>
          <div className="gold-rule my-8" />
          <BuyBox
            variants={p.variants}
            initialSize={groesse ? Number(groesse) : undefined}
            productName={p.name}
            href={productPath(p)}
            color={p.accentColor}
            image={p.images[0]?.url}
          />
          <ul className="mt-6 space-y-2 border-t border-line pt-6 text-sm text-mist">
            <li>Versand nach Österreich {euro(shipping.AT.priceCents)}, ab {euro(shipping.AT.freeFromCents!)} kostenlos</li>
            <li>Lieferung nach Deutschland und in die Schweiz auf dem Landweg</li>
            <li>
              14 Tage Rücktrittsrecht, <Link href="/widerruf" className="underline">Details</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Beschreibung und Duftnoten */}
      <div className="mt-24 grid gap-14 md:grid-cols-2 md:gap-20">
        <section>
          <h2 className="text-3xl md:text-4xl">Über {p.name}</h2>
          <p className="mt-5 leading-relaxed text-[#222]">{p.description}</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm">
            <div><dt className="text-mist">Marke</dt><dd>{p.brandName}</dd></div>
            <div><dt className="text-mist">Konzentration</dt><dd>{concentrationLabel[p.concentration]}</dd></div>
            <div><dt className="text-mist">Duftfamilie</dt><dd>{p.fragranceFamily}</dd></div>
            <div><dt className="text-mist">Für</dt><dd>{cat.label}</dd></div>
            <div><dt className="text-mist">Größen</dt><dd>{p.variants.map((v) => `${v.sizeMl} ml`).join(", ")}</dd></div>
            <div><dt className="text-mist">Artikelnummer</dt><dd>{p.variants[0]?.sku.replace(/-\d+$/, "")}</dd></div>
          </dl>
        </section>
        <section>
          <h2 className="text-3xl md:text-4xl">Duftnoten</h2>
          <div className="mt-6">
            <ScentPyramid top={p.topNotes} heart={p.heartNotes} base={p.baseNotes} />
          </div>
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="text-3xl md:text-4xl">Das könnte Ihnen auch gefallen</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {related.map((r) => (
              <ProductCard key={r.id} p={r} />
            ))}
          </div>
        </section>
      )}

      <JsonLd data={productLd(p)} />
      <JsonLd data={breadcrumbLd([["Start", "/"], [cat.label, `/kategorie/${cat.slug}`], [p.name, productPath(p)]])} />
    </div>
  );
}
