"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

type Choice = "all" | "necessary";
const KEY = "nadir-consent-v1";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * DSGVO: Google Analytics wird erst nach aktiver Zustimmung geladen.
 * Vorher werden keine Tracking-Skripte und -Cookies gesetzt.
 */
export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {}
    if (stored === "all" || stored === "necessary") setChoice(stored);
    else setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("open-consent", reopen);
    return () => window.removeEventListener("open-consent", reopen);
  }, []);

  function decide(c: Choice) {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    if (c === "necessary" && choice === "all") {
      // Widerruf: GA-Cookies entfernen und neu laden, damit das Skript nicht mehr aktiv ist
      document.cookie.split(";").forEach((ck) => {
        const name = ck.split("=")[0].trim();
        if (name.startsWith("_ga")) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}`;
      });
      location.reload();
    }
    setChoice(c);
    setOpen(false);
  }

  return (
    <>
      {choice === "all" && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {open && (
        <div
          role="dialog"
          aria-labelledby="consent-title"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 backdrop-blur"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p id="consent-title" className="font-display text-xl">
                Cookies und Statistik
              </p>
              <p className="mt-1 text-sm text-mist">
                Notwendige Speicherungen halten Ihren Warenkorb. Mit Ihrer Zustimmung messen wir zusätzlich anonymisiert
                über Google Analytics, wie der Shop genutzt wird. Sie können die Wahl jederzeit im Fußbereich ändern.{" "}
                <Link href="/datenschutz" className="underline">
                  Datenschutzerklärung
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button className="btn btn-ghost" onClick={() => decide("necessary")}>
                Nur notwendige
              </button>
              <button className="btn btn-solid" onClick={() => decide("all")}>
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ConsentLink() {
  return (
    <button type="button" className="hover:text-gold-deep" onClick={() => window.dispatchEvent(new Event("open-consent"))}>
      Cookie-Einstellungen
    </button>
  );
}
