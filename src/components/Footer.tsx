import Link from "next/link";
import { shop, shipping } from "@/lib/config";
import { ConsentLink } from "./CookieConsent";
import { euro } from "@/lib/money";

export function Footer() {
  return (
    <footer className="mt-32 bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-1">
          <p className="font-display text-2xl tracking-[0.18em]">NADIR</p>
          <p className="mt-4 max-w-xs text-sm text-paper/70">{shop.claim}. Versand nach Österreich, Deutschland und in die Schweiz.</p>
        </div>
        <FooterCol
          title="Shop"
          links={[
            ["/parfums", "Alle Düfte"],
            ["/kategorie/damen", "Damen"],
            ["/kategorie/herren", "Herren"],
            ["/kategorie/unisex", "Unisex"],
            ["/kategorie/nische", "Nische"],
          ]}
        />
        <FooterCol
          title="Service"
          links={[
            ["/versand-zahlung", "Versand und Zahlung"],
            ["/widerruf", "Rücktritt und Rückgabe"],
            ["/faq", "Häufige Fragen"],
            ["/ratgeber", "Ratgeber"],
            ["/kontakt", "Kontakt"],
          ]}
        />
        <div>
          <p className="text-sm text-gold">Rechtliches</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li><Link className="hover:text-gold" href="/impressum">Impressum</Link></li>
            <li><Link className="hover:text-gold" href="/agb">AGB</Link></li>
            <li><Link className="hover:text-gold" href="/datenschutz">Datenschutz</Link></li>
            <li><Link className="hover:text-gold" href="/widerruf">Widerrufsbelehrung</Link></li>
            <li><ConsentLink /></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-paper/60 md:flex-row md:justify-between md:px-10">
          <p>Alle Preise in Euro inkl. 20 % USt, zzgl. Versand (Österreich {euro(shipping.AT.priceCents)}, ab {euro(shipping.AT.freeFromCents!)} kostenlos).</p>
          <p>© {new Date().getFullYear()} {shop.name}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-sm text-gold">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-paper/80">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link className="hover:text-gold" href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
