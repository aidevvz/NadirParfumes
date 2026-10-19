/**
 * Redaktionelle Inhalte der drei NADIR-Expressions (Startseite, Produktseiten).
 * Preise, Bestand und Duftnoten kommen aus der Datenbank (Admin).
 * Alle Texte auf Deutsch.
 */
export type Expression = {
  slug: string;
  no: string;
  name: string;
  headline: string;
  keywords: string;
  teaser: string;
  text: string;
  notes: string[];
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
    headline: "Von Natur aus geheimnisvoll.",
    keywords: "Frisch · Elegant · Geheimnisvoll",
    teaser: "Ein eleganter, holzig-fruchtiger Duft mit frischen Akzenten und einer warmen, sinnlichen Tiefe. Ausdrucksstark, raffiniert und unvergesslich.",
    text: "Ein eleganter, holzig-fruchtiger Duft mit frischen Akzenten und einer warmen, sinnlichen Tiefe. Ausdrucksstark, raffiniert und unvergesslich.",
    notes: ["Oud", "Zypresse", "Veilchen", "Himbeere", "Maiglöckchen", "Leder", "Amber", "Moschus", "Vanille"],
    theme: "aurelis",
    scene: "/images/products/aurelis-szene.jpg",
    portrait: "/images/products/aurelis.jpg",
    imageSide: "right",
  },
  {
    slug: "essencia",
    no: "02",
    name: "Essencia",
    headline: "Die Wärme der Präsenz.",
    keywords: "Warm · Süß · Sinnlich",
    teaser: "Eine verführerische Komposition aus cremiger Vanille, warmen Gewürzen und süßen Nuancen. Sinnlich, luxuriös und perfekt für besondere Momente.",
    text: "Eine verführerische Komposition aus cremiger Vanille, warmen Gewürzen und süßen Nuancen. Sinnlich, luxuriös und perfekt für besondere Momente.",
    notes: ["Bergamotte", "Mandarine", "Elemi", "Orangenblüte", "Zimt", "Kardamom", "Bourbon-Vanille", "Guajakholz", "Praline"],
    theme: "essencia",
    scene: "/images/products/essencia-szene.jpg",
    portrait: "/images/products/essencia.jpg",
    imageSide: "left",
  },
  {
    slug: "red-velvet",
    no: "03",
    name: "Red Velvet",
    headline: "Unmöglich zu vergessen.",
    keywords: "Kraftvoll · Würzig · Luxuriös",
    teaser: "Ein kraftvoller, würzig-holziger Duft mit edlen Amber- und Oud-Akzenten. Geheimnisvoll, intensiv und geschaffen, um einen bleibenden Eindruck zu hinterlassen.",
    text: "Ein kraftvoller, würzig-holziger Duft mit edlen Amber- und Oud-Akzenten. Geheimnisvoll, intensiv und geschaffen, um einen bleibenden Eindruck zu hinterlassen.",
    notes: ["Apfel", "Zimt", "Lavendel", "Rosenholz", "Zedernholz", "Maiglöckchen", "Bulgarische Rose", "Amber", "Oud", "Moschus", "Sandelholz", "Vanille"],
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
