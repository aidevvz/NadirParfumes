/**
 * Zentrale Shop-Einstellungen. Name, Kontaktdaten und Versandkosten
 * werden nur hier geändert.
 */
export const shop = {
  name: "Nadir Parfums",
  brand: "Nadir",
  claim: "Eau de Parfum, entworfen in Wien",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: "office@nadir-parfums.at", // PLATZHALTER
  phone: "+43 1 000 00 00", // PLATZHALTER
  city: "Wien",
  country: "AT",
  vatRate: 0.2,
  currency: "eur",
  locale: "de-AT",
} as const;

export type ShippingCountry = "AT" | "DE" | "CH";

/**
 * Versandkosten pro Land (Cent). Parfum ist Gefahrgut in begrenzter Menge (LQ):
 * nur Boden-/Straßenversand, keine Express-Luftfracht.
 */
export const shipping: Record<
  ShippingCountry,
  { label: string; priceCents: number; freeFromCents: number | null; days: [number, number]; carrier: string }
> = {
  AT: { label: "Österreich", priceCents: 490, freeFromCents: 8000, days: [2, 3], carrier: "Österreichische Post" },
  DE: { label: "Deutschland", priceCents: 990, freeFromCents: 12000, days: [3, 5], carrier: "DHL (Straße)" },
  CH: { label: "Schweiz", priceCents: 1990, freeFromCents: null, days: [5, 8], carrier: "Österreichische Post (Straße)" },
};

export function shippingFor(country: ShippingCountry, subtotalCents: number) {
  const s = shipping[country];
  const free = s.freeFromCents !== null && subtotalCents >= s.freeFromCents;
  return { ...s, cents: free ? 0 : s.priceCents, free };
}

export const categories = {
  DAMEN: { slug: "damen", label: "Damen", intro: "Blumige, pudrige und strahlende Kompositionen mit Tiefe." },
  HERREN: { slug: "herren", label: "Herren", intro: "Hölzer, Gewürze und Leder. Klar gebaut, lange tragend." },
  UNISEX: { slug: "unisex", label: "Unisex", intro: "Düfte ohne Zuordnung. Getragen wird, was gefällt." },
  NISCHE: { slug: "nische", label: "Nische", intro: "Extrait-Konzentrationen und ungewöhnliche Rohstoffe in kleiner Auflage." },
} as const;

export type CategoryKey = keyof typeof categories;

export function categoryFromSlug(slug: string): CategoryKey | null {
  const hit = (Object.keys(categories) as CategoryKey[]).find((k) => categories[k].slug === slug);
  return hit ?? null;
}

export const concentrationLabel = {
  EXTRAIT: "Extrait de Parfum",
  EDP: "Eau de Parfum",
  EDT: "Eau de Toilette",
  EDC: "Eau de Cologne",
} as const;

export const fragranceFamilies = ["Blumig", "Holzig", "Ambra", "Frisch", "Gourmand", "Chypre"] as const;
