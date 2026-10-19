/** Stammdaten des NADIR-Sortiments, genutzt von seed.ts und sync-catalog.ts. */
import type { Category } from "@prisma/client";

// Beispielprodukte der ersten Version, werden entfernt
export const oldSamples = [
  "ambre-de-nuit", "iris-blanche", "cedre-noir", "neroli-clair",
  "oud-dore", "rose-silencieuse", "vetiver-matin", "vanille-fumee",
];

export type Seed = {
  slug: string;
  name: string;
  category: Category;
  family: string;
  accent: string;
  short: string;
  description: string;
  top: string[];
  heart: string[];
  base: string[];
  priceEuro: number;
  images: { url: string; alt: string }[];
};

export const products: Seed[] = [
  {
    slug: "aurelis",
    name: "Aurelis",
    category: "UNISEX",
    family: "Frisch",
    accent: "#1F3FA6",
    short: "Frisch, raffiniert und leuchtend. Stille Selbstsicherheit, ausgedrückt in Blau.",
    description:
      "Aurelis ist der kühle, klare Ausdruck von NADIR. Zitrus und Bergamotte öffnen hell und lebendig, Lavendel und ein mineralischer Akkord geben dem Herzen Ruhe und Weite. In der Basis bleiben Zedernholz und weicher Moschus nah an der Haut. Als Extrait de Parfum hoch konzentriert, mit einer Präsenz, die mühelos wirkt und lange bleibt.",
    top: ["Bergamotte", "Zitrone", "Minze"],
    heart: ["Lavendel", "Mineralischer Akkord"],
    base: ["Zedernholz", "Moschus"],
    priceEuro: 149,
    images: [
      { url: "/images/products/aurelis.jpg", alt: "NADIR Aurelis Extrait de Parfum 50 ml, blauer Flakon mit Zitrone und Lavendel" },
      { url: "/images/products/aurelis-szene.jpg", alt: "Aurelis Flakon auf dunklem Stein mit Zitrusfrucht und Lavendel" },
    ],
  },
  {
    slug: "essencia",
    name: "Essencia",
    category: "UNISEX",
    family: "Ambra",
    accent: "#B5702A",
    short: "Warm, sinnlich und kultiviert. Ein Bernstein-Ausdruck von Präsenz.",
    description:
      "Essencia ist das warme Herz von NADIR. Safran und Orangenblüte leuchten zu Beginn, bevor Jasmin und Bernstein eine dichte, goldene Mitte bilden. Oud, Labdanum und Vanille geben der Basis Tiefe und Wärme. Ein intimer Extrait de Parfum für Abende und Momente, die nachklingen sollen.",
    top: ["Safran", "Orangenblüte"],
    heart: ["Jasmin", "Bernstein"],
    base: ["Oud", "Labdanum", "Vanille"],
    priceEuro: 149,
    images: [
      { url: "/images/products/essencia.jpg", alt: "NADIR Essencia Extrait de Parfum 50 ml, bernsteinfarbener Flakon mit Jasmin" },
      { url: "/images/products/essencia-szene.jpg", alt: "Essencia Flakon auf Marmor mit Jasminblüten, Holz und Bernstein" },
    ],
  },
  {
    slug: "red-velvet",
    name: "Red Velvet",
    category: "UNISEX",
    family: "Blumig",
    accent: "#B3121F",
    short: "Kraftvoll, verführerisch und intensiv. Eine Signatur, die bei Ihnen bleibt.",
    description:
      "Red Velvet ist der intensivste Ausdruck von NADIR. Dunkle Kirsche und rosa Pfeffer eröffnen kraftvoll, im Herzen verbinden sich samtige Rose und Safran. Vanille, Sandelholz und Moschus tragen den Duft lange auf Haut und Kleidung. Kompromisslose Präsenz für einen Eindruck, der bleibt.",
    top: ["Kirsche", "Rosa Pfeffer"],
    heart: ["Rose", "Safran"],
    base: ["Vanille", "Sandelholz", "Moschus"],
    priceEuro: 149,
    images: [
      { url: "/images/products/red-velvet.jpg", alt: "NADIR Red Velvet Extrait de Parfum 50 ml, roter Flakon mit Rosen" },
      { url: "/images/products/red-velvet-szene.jpg", alt: "Red Velvet Flakon zwischen roten Rosen und rotem Samt" },
    ],
  },
];

export function productData(p: Seed) {
  return {
    name: p.name,
    brandName: "NADIR",
    brandSlug: "nadir",
    category: p.category,
    concentration: "EXTRAIT" as const,
    fragranceFamily: p.family,
    accentColor: p.accent,
    shortDescription: p.short,
    description: p.description,
    topNotes: p.top,
    heartNotes: p.heart,
    baseNotes: p.base,
    featured: true,
    active: true,
  };
}
