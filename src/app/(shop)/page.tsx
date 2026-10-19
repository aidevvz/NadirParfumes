import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { db } from "@/lib/db";
import { productPath } from "@/lib/catalog";
import { shop, shipping } from "@/lib/config";
import { expressions, themeBg } from "@/lib/collection";
import { euro } from "@/lib/money";

// Zur Laufzeit rendern: Build braucht so keine Datenbank, Preise und Bestand sind immer aktuell.
export const dynamic = "force-dynamic";

export const metadata = { alternates: { canonical: "/" } };

function Arrow() {
  return (
    <svg className="arrow" width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M0 5h14M10 1l4 4-4 4" />
    </svg>
  );
}

export default async function Home() {
  const products = await db.product.findMany({
    where: { active: true, slug: { in: expressions.map((e) => e.slug) } },
    include: { variants: { orderBy: { sizeMl: "asc" } } },
  });
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const info = (slug: string) => {
    const p = bySlug.get(slug);
    const v = p?.variants[0];
    return {
      href: p ? productPath(p) : "/parfums",
      price: v ? euro(v.priceCents) : null,
      soldOut: p ? !p.variants.some((x) => x.stock > 0) : false,
    };
  };

  return (
    <>
      {/* Hero: Bild oben, Claim darunter auf Schwarz (wie Vorlage) */}
      <section className="relative isolate overflow-hidden">
        <div className="relative h-[62svh] min-h-[420px] overflow-hidden md:h-[78svh]">
          <Image
            src="/images/products/kollektion-trio.jpg"
            alt="Die drei NADIR Extraits Aurelis, Essencia und Red Velvet auf dunklem Marmor"
            fill
            priority
            sizes="100vw"
            className="hero-image object-cover object-[50%_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-30% to-paper" aria-hidden />
        </div>
        <div className="relative -mt-20 px-5 pb-10 text-center md:-mt-28 md:px-12">
          <h1 className="claim hero-rise text-[clamp(2.6rem,7.6vw,7.25rem)] md:whitespace-nowrap">Exclusivity, bottled.</h1>
          <p className="hero-rise-2 mt-6 text-lg text-ink/90 md:text-xl">Three expressions. One signature.</p>
          <div className="hero-rise-3 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="#collection" className="btn btn-solid">
              Discover the collection <Arrow />
            </Link>
            <Link href="#house" className="btn btn-ghost">
              Explore NADIR
            </Link>
          </div>
        </div>
      </section>

      {/* 01 Collection */}
      <section id="collection" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 pt-24 md:px-12 md:pt-36">
        <div className="text-center">
          <p className="label text-gold-deep">01 / Three expressions</p>
          <h2 className="claim mt-6 text-[clamp(2.6rem,6.5vw,5.5rem)]">The Collection</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-mist">
            Drei Düfte. Drei Persönlichkeiten. Eine unverwechselbare Signatur.
          </p>
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-3 md:gap-10">
          {expressions.map((e, i) => {
            const p = info(e.slug);
            return (
              <article key={e.slug} className="group flex flex-col">
                <Link href={p.href} className="relative block aspect-[3/2] overflow-hidden bg-veil">
                  <Image
                    src={e.scene}
                    alt={`NADIR ${e.name} Extrait de Parfum 50 ml`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    priority={i === 0}
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-silk)] group-hover:scale-[1.04]"
                  />
                </Link>
                <h3 className="claim mt-8 text-[2.6rem]">
                  <Link href={p.href} className="hover:text-gold-deep">{e.name}</Link>
                </h3>
                <p className="label mt-4 text-gold-deep">Extrait de Parfum</p>
                <p className="label mt-3">50 ml / 1.7 fl.oz{p.price && <span className="ml-3 text-mist">{p.price}</span>}</p>
                <p className="label mt-5 text-ink/80">{e.keywords}</p>
                <p className="mt-4 max-w-sm text-[1.05rem] text-ink/85">{e.teaser}</p>
                <div className="mt-8">
                  <Link href={p.href} className="btn btn-solid">
                    {p.soldOut ? "Ausverkauft" : "Discover"} <Arrow />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <ul className="mt-24 grid border-y border-line text-center text-sm text-mist sm:grid-cols-3 sm:divide-x sm:divide-line">
          <li className="py-5">Versand in Österreich in {shipping.AT.days[0]}–{shipping.AT.days[1]} Werktagen, ab {euro(shipping.AT.freeFromCents!)} kostenlos</li>
          <li className="border-t border-line py-5 sm:border-t-0">14 Tage Rücktrittsrecht ab Erhalt</li>
          <li className="border-t border-line py-5 sm:border-t-0">Sicher bezahlen mit EPS, Klarna, PayPal oder Karte</li>
        </ul>
      </section>

      {/* 02 The House */}
      <section id="house" className="mx-auto max-w-4xl scroll-mt-20 px-5 pt-32 text-center md:pt-48">
        <Image src="/images/brand/nadir-logo-gold.png" alt="NADIR Parfum Logo" width={651} height={566} className="mx-auto h-auto w-36 md:w-44" />
        <p className="label mt-14 text-gold-deep">02 / The House of NADIR</p>
        <h2 className="claim mt-6 text-[clamp(2.4rem,6vw,5rem)]">The Art of Presence</h2>
        <p className="mx-auto mt-10 max-w-3xl font-display text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-snug">
          NADIR wurde für Menschen geschaffen, die nicht auffallen müssen, um in Erinnerung zu bleiben.
        </p>
        <p className="mx-auto mt-10 max-w-xl text-lg text-ink/85">
          Jeder Duft ist ein Ausdruck von Präsenz: raffiniert, unverwechselbar und unvergesslich.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-mist">
          Als Extrait de Parfum komponiert, hinterlässt NADIR einen Eindruck, der bleibt, lange nachdem der Moment vergangen ist.
        </p>
      </section>

      {/* 03 Our Story */}
      <section id="story" className="mt-32 scroll-mt-20 bg-gradient-to-b from-paper via-[#0d1020] to-aurelis md:mt-48">
        <div className="mx-auto max-w-4xl px-5 py-28 text-center md:py-40">
          <p className="label text-gold-deep">03 / Our Story</p>
          <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)]">Three expressions. One signature.</h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-ink/85">
            NADIR beginnt mit einer einfachen Idee: Präsenz ist persönlich. Frisch und geheimnisvoll. Warm und süß.
            Würzig und luxuriös. Drei eigenständige Persönlichkeiten, vereint durch eine unverwechselbare Signatur.
          </p>
        </div>
      </section>

      {/* Die drei Expressions mit eigener Farbwelt */}
      {expressions.map((e) => {
        const p = info(e.slug);
        return (
          <section key={e.slug} className={`${themeBg[e.theme]}`} aria-labelledby={`exp-${e.slug}`}>
            <div className="mx-auto grid max-w-[1440px] items-center md:min-h-[88vh] md:grid-cols-2">
              <div className={`relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[88vh] ${e.imageSide === "left" ? "md:order-1" : "md:order-2"}`}>
                <Image src={e.portrait} alt={`${e.name} Flakon in Szene`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className={`px-5 py-20 md:px-16 md:py-24 lg:px-24 ${e.imageSide === "left" ? "md:order-2" : "md:order-1"}`}>
                <p className="label text-gold-deep">
                  Expression {e.no} / {e.name}
                </p>
                <h2 id={`exp-${e.slug}`} className="mt-6 text-[clamp(2.6rem,5.5vw,4.75rem)]">
                  {e.headline}
                </h2>
                <p className="label mt-6 text-ink">{e.keywords}</p>
                <p className="mt-6 max-w-lg text-lg text-ink/85">{e.text}</p>
                <div className="mt-8 max-w-lg border-t border-gold/40 pt-6">
                  <p className="label text-gold-deep">Duftnoten</p>
                  <p className="mt-3 font-display text-xl leading-relaxed">{e.notes.join(", ")}</p>
                </div>
                <p className="label mt-8">
                  Extrait de Parfum / 50 ml{p.price && <span className="ml-3 text-gold-deep">{p.price}</span>}
                </p>
                <div className="mt-10">
                  <Link href={p.href} className="btn btn-solid">
                    Discover {e.name} <Arrow />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* 04 The Ritual */}
      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden md:h-[92vh]">
        <Image
          src="/images/products/ritual-box.jpg"
          alt="Essencia in der geöffneten schwarzen NADIR-Box mit goldenem Logo"
          fill
          sizes="100vw"
          className="-z-10 object-cover object-[65%_50%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/45 to-transparent" aria-hidden />
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12">
          <p className="label text-gold-deep">04 / The Experience</p>
          <h2 className="claim mt-6 text-[clamp(3rem,7vw,6rem)]">The Ritual</h2>
          <p className="mt-6 max-w-sm text-lg text-ink/90">Bevor sich der Duft offenbart, beginnt das Erlebnis.</p>
        </div>
      </section>

      {/* Signature */}
      <section className="mx-auto max-w-5xl px-5 pt-32 text-center md:pt-44">
        <p className="label text-gold-deep">The NADIR Signature</p>
        <p className="claim mt-8 text-[clamp(2.8rem,7.5vw,6.5rem)]">Extrait de Parfum</p>
        <p className="mt-8 font-display text-[clamp(1.8rem,4vw,3rem)] font-medium text-gold-deep">50 ml / 1.7 fl.oz</p>
        <p className="mx-auto mt-8 max-w-lg text-mist">
          Die höchste Konzentration der Parfumerie. Wenige Sprühstöße genügen für einen ganzen Tag.
        </p>
      </section>

      {/* Leave an impression */}
      <section className="mx-auto max-w-6xl px-5 pt-32 text-center md:pt-44">
        <p className="label text-gold-deep">NADIR Parfum</p>
        <h2 className="claim mt-8 text-[clamp(2.8rem,8vw,7.5rem)]">Leave an impression.</h2>
        <p className="mt-6 text-lg">Entdecken Sie NADIR Parfum.</p>
        <div className="mt-10">
          <Link href="/parfums" className="btn btn-solid">
            Shop the collection <Arrow />
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-[1440px] px-5 pt-32 md:px-12 md:pt-44">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="label text-gold-deep">Contact / The House of NADIR</p>
            <p className="mt-5 max-w-md text-lg">Für persönliche Anfragen, Kooperationen und Presse.</p>
            <a href={`mailto:${shop.email}`} className="mt-3 inline-block text-gold-deep underline">
              {shop.email}
            </a>
          </div>
          <Link href="/kontakt" className="btn btn-solid self-start md:self-auto">
            Kontakt aufnehmen <Arrow />
          </Link>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "NADIR Collection",
          itemListElement: expressions.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${shop.url}${info(e.slug).href}`,
            name: `${e.name} Extrait de Parfum`,
          })),
        }}
      />
    </>
  );
}
