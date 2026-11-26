/**
 * Zentrale Shop-Einstellungen. Name, Kontaktdaten und Versandkosten
 * werden nur hier geändert.
 */
export const shop = {
  name: "NADIR Parfum",
  brand: "NADIR",
  claim: "Exklusivität im Flakon.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: "office@nadirperfume.com",
  city: "Klagenfurt am Wörthersee",
  country: "AT",
  vatRate: 0.2,
  currency: "eur",
  locale: "de-AT",
  instagram: "https://www.instagram.com/nadirperfume",
  tiktok: "https://www.tiktok.com/@nadir.perfume",
} as const;

/** Rechtliche Angaben des Unternehmens hinter dem Shop (Impressum, AGB, Datenschutz, Widerruf). */
export const company = {
  name: "ET Cars Rent GmbH",
  legalForm: "Gesellschaft mit beschränkter Haftung (GmbH)",
  street: "Ortnergasse 15",
  zip: "9020",
  city: "Klagenfurt am Wörthersee",
  country: "Österreich",
  fn: "FN 682302k",
  uid: "ATU83431939",
  court: "Landesgericht Klagenfurt",
} as const;

/** Firmenname und Anschrift in einer Zeile */
export const companyLine = `${company.name}, ${company.street}, ${company.zip} ${company.city}, ${company.country}`;

export type ShippingCountry = "AT" | "DE" | "CH";

/**
 * Versandkosten pro Land (Cent). Parfum ist Gefahrgut in begrenzter Menge (LQ):
 * nur Boden-/Straßenversand, keine Express-Luftfracht.
 */
export const shipping: Record<
  ShippingCountry,
  { label: string; priceCents: number; freeFromCents: number | null; days: [number, number]; carrier: string }
> = {
  AT: { label: "Österreich", priceCents: 490, freeFromCents: 10000, days: [2, 3], carrier: "Österreichische Post" },
  DE: { label: "Deutschland", priceCents: 990, freeFromCents: 10000, days: [3, 5], carrier: "DHL (Straße)" },
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

/** Pflichtangaben für alle NADIR-Düfte (Produktseite). */
export const productInfo = {
  ingredients:
    "Alcohol Denat. (40 % vol), Parfum, Aqua, Ethylhexylmethoxycinnamat, Butylmethoxydibenzoylmethan, Ethylhexylsalicylat, CI 15985, CI 60730, CI 17200.",
  safety:
    "Leicht entzündlich. Von offenen Flammen, Funken und anderen Zündquellen fernhalten. Nicht in Richtung der Augen sprühen. Nur zur äußerlichen Anwendung. Außerhalb der Reichweite von Kindern aufbewahren.",
};

export const concentrationLabel = {
  EXTRAIT: "Extrait de Parfum",
  EDP: "Eau de Parfum",
  EDT: "Eau de Toilette",
  EDC: "Eau de Cologne",
} as const;

export const fragranceFamilies = ["Blumig", "Holzig", "Ambra", "Frisch", "Gourmand", "Chypre"] as const;
