/**
 * Redaktionelle Inhalte der drei NADIR-Expressions (Startseite, Produktseiten).
 * Preise, Bestand und Duftnoten kommen aus der Datenbank (Admin).
 * Claims bewusst auf Englisch wie in der Markenvorlage, Fließtext auf Deutsch.
 */
export type Expression = {
  slug: string;
  no: string;
  name: string;
  headline: string;
  keywords: string;
  teaser: string;
  text: string;
  theme: "aurelis" | "essencia" | "velvet";
  scene: string;
  portrait: string;
  imageSide: "left" | "right";
};

export const expressions: Expression[] = [
  {
    slug: "aurelis",
    no: "01",
    name: "Aurelis",
    headline: "Luminous by nature.",
    keywords: "Fresh. Elegant. Luminous.",
    teaser: "Frisch, raffiniert und leuchtend. Stille Selbstsicherheit, ausgedrückt in Blau.",
    text: "Ein kühler Ausdruck stiller Selbstsicherheit. Raffinierte Frische mit einer Präsenz, die mühelos wirkt.",
    theme: "aurelis",
    scene: "/images/products/aurelis-szene.jpg",
    portrait: "/images/products/aurelis.jpg",
    imageSide: "right",
  },
  {
    slug: "essencia",
    no: "02",
    name: "Essencia",
    headline: "The warmth of presence.",
    keywords: "Sensual. Sophisticated. Rich.",
    teaser: "Warm, sinnlich und kultiviert. Ein Bernstein-Ausdruck von Präsenz.",
    text: "Ein intimer Bernstein-Ausdruck. Wärme mit Tiefe, komponiert für Momente, die nachklingen sollen.",
    theme: "essencia",
    scene: "/images/products/essencia-szene.jpg",
    portrait: "/images/products/essencia.jpg",
    imageSide: "left",
  },
  {
    slug: "red-velvet",
    no: "03",
    name: "Red Velvet",
    headline: "Impossible to forget.",
    keywords: "Bold. Seductive. Powerful.",
    teaser: "Kraftvoll, verführerisch und intensiv. Eine Signatur, die bei Ihnen bleibt.",
    text: "Ein tiefroter Ausdruck von Intensität. Kompromisslose Präsenz für einen Eindruck, der bleibt.",
    theme: "velvet",
    scene: "/images/products/red-velvet-szene.jpg",
    portrait: "/images/products/red-velvet.jpg",
    imageSide: "right",
  },
];

export const expressionBySlug = (slug: string) => expressions.find((e) => e.slug === slug);

export const themeBg = {
  aurelis: "bg-aurelis",
  essencia: "bg-essencia",
  velvet: "bg-velvet",
} as const;
