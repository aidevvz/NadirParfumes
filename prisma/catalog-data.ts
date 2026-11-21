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
    family: "Holzig",
    accent: "#1F3FA6",
    short: "Ein eleganter, holzig-fruchtiger Duft mit frischen Akzenten und einer warmen, sinnlichen Tiefe. Ausdrucksstark, raffiniert und unvergesslich.",
    description:
      "Ein eleganter, holzig-fruchtiger Duft, der mit der geheimnisvollen Tiefe von Oud, der Frische von Zypresse und der zarten Eleganz von Veilchen eröffnet. Im Herzen entfaltet sich eine faszinierende Verbindung aus saftiger Himbeere und feinem Maiglöckchen. Edles Leder, warmer Amber, sinnlicher Moschus und cremige Vanille verleihen der Komposition einen unverwechselbaren Charakter.\n\nEin Duft voller Kontraste – frisch, raffiniert und geheimnisvoll. Geschaffen für Menschen, die nicht einfach nur auffallen, sondern in Erinnerung bleiben.",
    top: ["Oud", "Zypresse", "Veilchen"],
    heart: ["Himbeere", "Maiglöckchen", "Leder"],
    base: ["Amber", "Moschus", "Vanille"],
    priceEuro: 79.9,
    images: [
      { url: "/images/products/aurelis.jpg", alt: "NADIR Aurelis Extrait de Parfum 50 ml, blauer Flakon mit Zitrone und Lavendel" },
      { url: "/images/products/aurelis-szene.jpg", alt: "Aurelis Flakon auf dunklem Stein mit Zitrusfrucht und Lavendel" },
    ],
  },
  {
    slug: "essencia",
    name: "Essencia",
    category: "UNISEX",
    family: "Gourmand",
    accent: "#B5702A",
    short: "Eine verführerische Komposition aus cremiger Vanille, warmen Gewürzen und süßen Nuancen. Sinnlich, luxuriös und perfekt für besondere Momente.",
    description:
      "Ein außergewöhnlich warmer und verführerischer Duft, der die Sinne mit einer harmonischen Komposition aus spritziger Bergamotte, saftiger Mandarine und aromatischem Elemi empfängt. Im Herzen verschmelzen die florale Eleganz der Orangenblüte und die würzige Wärme von Zimt und Kardamom. Die Basis aus edler Bourbon-Vanille, kostbarem Guajakholz und verführerischer Praline hinterlässt einen cremigen, sinnlichen Eindruck.\n\nEine Komposition voller Wärme und Raffinesse – charismatisch, luxuriös und unvergesslich.",
    top: ["Bergamotte", "Mandarine", "Elemi"],
    heart: ["Orangenblüte", "Zimt", "Kardamom"],
    base: ["Bourbon-Vanille", "Guajakholz", "Praline"],
    priceEuro: 79.9,
    images: [
      { url: "/images/products/essencia.jpg", alt: "NADIR Essencia Extrait de Parfum 50 ml, bernsteinfarbener Flakon mit Jasmin" },
      { url: "/images/products/essencia-szene.jpg", alt: "Essencia Flakon auf Marmor mit Jasminblüten, Holz und Bernstein" },
    ],
  },
  {
    slug: "red-velvet",
    name: "Red Velvet",
    category: "UNISEX",
    family: "Holzig",
    accent: "#B3121F",
    short: "Ein kraftvoller, würzig-holziger Duft mit edlen Amber- und Oud-Akzenten. Geheimnisvoll, intensiv und geschaffen, um einen bleibenden Eindruck zu hinterlassen.",
    description:
      "Ein kraftvoller, orientalisch-holziger Duft, der mit der fruchtigen Frische von Apfel, aromatischem Lavendel und einer feinen Würze aus Zimt beginnt. Im Herzen entfaltet sich eine elegante Komposition aus edlem Zedernholz, zartem Maiglöckchen und kostbarer bulgarischer Rose. Die Basis aus tiefem Oud, warmem Amber, sinnlichem Moschus, cremigem Sandelholz und Vanille verleiht dem Duft eine außergewöhnliche Tiefe und eine faszinierende Präsenz.\n\nEin ausdrucksstarker Duft mit einer unverwechselbaren Aura – geschaffen für Menschen mit Charakter und Stil.",
    top: ["Apfel", "Zimt", "Lavendel", "Rosenholz"],
    heart: ["Zedernholz", "Maiglöckchen", "Bulgarische Rose"],
    base: ["Amber", "Oud", "Moschus", "Sandelholz", "Vanille"],
    priceEuro: 79.9,
    images: [
      { url: "/images/products/red-velvet.jpg", alt: "NADIR Red Velvet Extrait de Parfum 50 ml, roter Flakon mit Rosen" },
      { url: "/images/products/red-velvet-szene.jpg", alt: "Red Velvet Flakon zwischen roten Rosen und rotem Samt" },
    ],
  },
];

/** Frühere Beschreibungen: nur Produkte mit genau einem dieser Texte werden beim Deploy
 *  auf die aktuellen Texte aktualisiert (Änderungen aus dem Admin bleiben erhalten). */
export const legacyDescriptions: Record<string, string[]> = {"aurelis": ["Aurelis ist der kühle, klare Ausdruck von NADIR. Zitrus und Bergamotte öffnen hell und lebendig, Lavendel und ein mineralischer Akkord geben dem Herzen Ruhe und Weite. In der Basis bleiben Zedernholz und weicher Moschus nah an der Haut. Als Extrait de Parfum hoch konzentriert, mit einer Präsenz, die mühelos wirkt und lange bleibt.", "Ein eleganter, holzig-fruchtiger Duft mit frischen Akzenten und einer warmen, sinnlichen Tiefe. Ausdrucksstark, raffiniert und unvergesslich. Duftnoten: Oud, Zypresse, Veilchen, Himbeere, Maiglöckchen, Leder, Amber, Moschus, Vanille."], "essencia": ["Essencia ist das warme Herz von NADIR. Safran und Orangenblüte leuchten zu Beginn, bevor Jasmin und Bernstein eine dichte, goldene Mitte bilden. Oud, Labdanum und Vanille geben der Basis Tiefe und Wärme. Ein intimer Extrait de Parfum für Abende und Momente, die nachklingen sollen.", "Eine verführerische Komposition aus cremiger Vanille, warmen Gewürzen und süßen Nuancen. Sinnlich, luxuriös und perfekt für besondere Momente. Duftnoten: Bergamotte, Mandarine, Elemi, Orangenblüte, Zimt, Kardamom, Bourbon-Vanille, Guajakholz, Praline."], "red-velvet": ["Red Velvet ist der intensivste Ausdruck von NADIR. Dunkle Kirsche und rosa Pfeffer eröffnen kraftvoll, im Herzen verbinden sich samtige Rose und Safran. Vanille, Sandelholz und Moschus tragen den Duft lange auf Haut und Kleidung. Kompromisslose Präsenz für einen Eindruck, der bleibt.", "Ein kraftvoller, würzig-holziger Duft mit edlen Amber- und Oud-Akzenten. Geheimnisvoll, intensiv und geschaffen, um einen bleibenden Eindruck zu hinterlassen. Duftnoten: Apfel, Zimt, Lavendel, Rosenholz, Zedernholz, Maiglöckchen, Bulgarische Rose, Amber, Oud, Moschus, Sandelholz, Vanille."]};

/** Frühere Preise (Cent): werden beim Deploy auf den aktuellen Preis gesetzt,
 *  solange er im Admin nicht geändert wurde. */
export const legacyPriceCents = [14900, 7900]; // 149 € Platzhalter, 79 € vorheriger Preis

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
