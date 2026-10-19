import Link from "next/link";
import { shop, shipping } from "@/lib/config";
import { euro } from "@/lib/money";
import { ConsentLink } from "./CookieConsent";

// PLATZHALTER: echte Profil-Links eintragen
const social = [
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.tiktok.com/", label: "TikTok" },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-gold/40 bg-paper">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-12">
        <div>
          <p className="text-2xl font-semibold tracking-[0.22em]">NADIR PARFUM</p>
          <p className="label mt-4 text-gold-deep">{shop.claim}</p>
        </div>
        <FooterCol
          links={[
            ["/#collection", "Kollektion"],
            ["/#house", "Das Haus"],
            ["/#story", "Unsere Geschichte"],
            ["/kontakt", "Kontakt"],
            ["/parfums", "Shop"],
          ]}
          labelClass="label text-ink"
        />
        <div>
          <p className="label text-gold-deep">NADIR folgen</p>
          <ul className="mt-5 space-y-3">
            {social.map((s) => (
              <li key={s.label}>
                <a className="hover:text-gold-deep" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label text-gold-deep">Rechtliches</p>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            <li><Link className="hover:text-gold-deep" href="/datenschutz">Datenschutz</Link></li>
            <li><Link className="hover:text-gold-deep" href="/agb">AGB</Link></li>
            <li><Link className="hover:text-gold-deep" href="/versand-zahlung">Versand und Rückgabe</Link></li>
            <li><Link className="hover:text-gold-deep" href="/widerruf">Widerrufsbelehrung</Link></li>
            <li><Link className="hover:text-gold-deep" href="/impressum">Impressum</Link></li>
            <li><ConsentLink /></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="flex flex-col gap-3 border-t border-gold/30 py-7 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <p className="label text-mist">© {new Date().getFullYear()} NADIR Parfum</p>
          <p>
            Alle Preise inkl. 20 % USt, zzgl. Versand (Österreich {euro(shipping.AT.priceCents)}, ab {euro(shipping.AT.freeFromCents!)} kostenlos).
          </p>
          <p className="label text-mist">Extrait de Parfum</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ links, labelClass }: { links: [string, string][]; labelClass: string }) {
  return (
    <ul className="space-y-4">
      {links.map(([href, label]) => (
        <li key={href}>
          <Link className={`${labelClass} hover:text-gold-deep`} href={href}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
