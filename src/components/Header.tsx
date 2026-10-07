"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./Cart";
import { shop } from "@/lib/config";

const nav = [
  { href: "/parfums", label: "Alle Düfte" },
  { href: "/kategorie/damen", label: "Damen" },
  { href: "/kategorie/herren", label: "Herren" },
  { href: "/kategorie/unisex", label: "Unisex" },
  { href: "/kategorie/nische", label: "Nische" },
  { href: "/ratgeber", label: "Ratgeber" },
];

export function Header() {
  const { count, ready } = useCart();
  const [menu, setMenu] = useState(false);
  const path = usePathname();
  useEffect(() => setMenu(false), [path]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-paper focus:px-3 focus:py-2">
        Zum Inhalt springen
      </a>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-10">
        <button
          className="-ml-2 p-2 lg:hidden"
          aria-expanded={menu}
          aria-controls="mobile-nav"
          aria-label={menu ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setMenu((m) => !m)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            {menu ? (
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.3" />
            ) : (
              <path d="M2 7h18M2 15h18" stroke="currentColor" strokeWidth="1.3" />
            )}
          </svg>
        </button>

        <Link href="/" className="font-display text-[1.65rem] tracking-[0.18em]" aria-label={`${shop.name} Startseite`}>
          NADIR
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex gap-8 text-[0.95rem]">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`py-2 transition-colors hover:text-gold-deep ${path.startsWith(n.href) ? "text-gold-deep" : ""}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/parfums" className="p-2 hover:text-gold-deep" aria-label="Suche">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="8.5" cy="8.5" r="6" />
              <path d="M13 13l5 5" />
            </svg>
          </Link>
          <Link href="/warenkorb" className="relative p-2 hover:text-gold-deep" aria-label={`Warenkorb, ${count} Artikel`}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M3.5 6.5h13l-1 11h-11z" />
              <path d="M7 6.5V5a3 3 0 016 0v1.5" />
            </svg>
            {ready && count > 0 && (
              <span className="absolute -right-0.5 top-0 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-medium text-paper">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {menu && (
        <nav id="mobile-nav" aria-label="Mobile Navigation" className="border-t border-line lg:hidden">
          <ul className="px-5 py-4">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block py-3 font-display text-2xl">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
