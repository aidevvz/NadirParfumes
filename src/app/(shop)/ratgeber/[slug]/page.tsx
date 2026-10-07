import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { articles } from "@/lib/content";
import { shop } from "@/lib/config";
import { breadcrumbLd } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: a.title, description: a.description, alternates: { canonical: `/ratgeber/${a.slug}` }, openGraph: { type: "article", title: a.title, description: a.description } };
}

export default async function Article({ params }: { params: Params }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return (
    <article className="mx-auto max-w-2xl px-5 pt-14 md:pt-20">
      <nav aria-label="Brotkrumen" className="text-sm text-mist"><Link href="/ratgeber" className="hover:text-gold-deep">Ratgeber</Link></nav>
      <h1 className="mt-6 text-4xl md:text-5xl">{a.title}</h1>
      <p className="mt-4 text-sm text-mist"><time dateTime={a.date}>{new Intl.DateTimeFormat("de-AT", { dateStyle: "long" }).format(new Date(a.date))}</time></p>
      <div className="gold-rule mt-8 w-16" />
      <div className="prose-shop mt-8 text-[1.075rem] leading-[1.75]">
        {a.body.map((b, i) => (
          <section key={i}>
            {b.h && <h2>{b.h}</h2>}
            <p>{b.p}</p>
          </section>
        ))}
      </div>
      <div className="mt-14 bg-veil p-8">
        <p className="font-display text-2xl">Den passenden Duft finden</p>
        <p className="mt-2 text-mist">Alle Düfte lassen sich nach Familie, Größe und Preis filtern.</p>
        <Link href="/parfums" className="btn btn-solid mt-5">Düfte ansehen</Link>
      </div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.description, datePublished: a.date, author: { "@type": "Organization", name: shop.name }, publisher: { "@type": "Organization", name: shop.name }, mainEntityOfPage: `${shop.url}/ratgeber/${a.slug}` }} />
      <JsonLd data={breadcrumbLd([["Start", "/"], ["Ratgeber", "/ratgeber"], [a.title, `/ratgeber/${a.slug}`]])} />
    </article>
  );
}
