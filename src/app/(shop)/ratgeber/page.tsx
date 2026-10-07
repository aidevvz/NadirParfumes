import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ratgeber: Parfum verstehen, wählen und richtig tragen",
  description: "Konzentrationen, Duftfamilien und Anwendung erklärt. Der Parfum-Ratgeber von Nadir.",
  alternates: { canonical: "/ratgeber" },
};

const dfmt = new Intl.DateTimeFormat("de-AT", { dateStyle: "long" });

export default function Ratgeber() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-14 md:pt-20">
      <h1 className="text-5xl md:text-6xl">Ratgeber</h1>
      <p className="mt-4 max-w-xl text-mist">Was hinter den Begriffen auf dem Flakon steckt, und wie Sie einen Duft finden, der zu Ihnen passt.</p>
      <div className="mt-12 border-t border-ink">
        {articles.map((a) => (
          <article key={a.slug} className="grid gap-6 border-b border-line py-8 sm:grid-cols-[220px_1fr] sm:items-center">
            <Link href={`/ratgeber/${a.slug}`} className="relative block aspect-[3/2] overflow-hidden bg-veil" tabIndex={-1} aria-hidden>
              <Image src={images[a.image].src} alt="" fill sizes="220px" className="object-cover" />
            </Link>
            <div>
            <p className="text-sm text-mist"><time dateTime={a.date}>{dfmt.format(new Date(a.date))}</time></p>
            <h2 className="mt-2 text-3xl"><Link href={`/ratgeber/${a.slug}`} className="hover:text-gold-deep">{a.title}</Link></h2>
            <p className="mt-3 text-mist">{a.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
