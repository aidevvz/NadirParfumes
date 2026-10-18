"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./Cart";
import { shop } from "@/lib/config";

const nav = [
  { href: "/#collection", label: "Collection" },
  { href: "/#house", label: "The House" },
  { href: "/#story", label: "Our Story" },
  { href: "/kontakt", label: "Contact" },
];

export function Header() {
  const { count, ready } = useCart();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const overlay = path === "/"; // Auf der Startseite liegt die Navigation über dem Hero-Bild

  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const solid = !overlay || scrolled || menu;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          solid ? "border-b border-line/70 bg-paper/90 backdrop-blur" : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-paper focus:px-3 focus:py-2">
          Zum Inhalt springen
        </a>
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-12">
          <div className="flex items-center gap-3">
            <button
              className="-ml-2 p-2 lg:hidden"
              aria-expanded={menu}
              aria-controls="mobile-nav"
              aria-label={menu ? "Menü schließen" : "Menü öffnen"}
              onClick={() => setMenu((m) => !m)}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
                {menu ? (
                  <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.4" />
                ) : (
                  <path d="M2 7h18M2 15h18" stroke="currentColor" strokeWidth="1.4" />
                )}
              </svg>
            </button>
            <Link href="/" className="text-[1.45rem] font-semibold tracking-[0.28em]" aria-label={`${shop.name} Startseite`}>
              NADIR
            </Link>
          </div>

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex gap-10">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="label py-2 text-ink transition-colors hover:text-gold-deep">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <Link href="/parfums" className="label hidden text-ink hover:text-gold-deep sm:inline">
              Shop
            </Link>
            <Link href="/warenkorb" className="relative p-1 hover:text-gold-deep" aria-label={`Warenkorb, ${count} Artikel`}>
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3.5" y="6.5" width="15" height="12.5" rx="1.5" />
                <path d="M7.5 6.5V5.5a3.5 3.5 0 017 0v1M8 10.5a3 3 0 006 0" />
              </svg>
              {ready && count > 0 && (
                <span className="absolute -right-1.5 -top-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-semibold text-black">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {menu && (
          <nav id="mobile-nav" aria-label="Mobile Navigation" className="border-t border-line bg-paper lg:hidden">
            <ul className="px-5 py-6">
              {[...nav, { href: "/parfums", label: "Shop" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="block py-3 font-display text-3xl">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
      {!overlay && <div className="h-20" aria-hidden />}
    </>
  );
}
