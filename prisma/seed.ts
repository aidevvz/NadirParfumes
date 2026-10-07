/**
 * Beispielsortiment zum Testen. Alle Namen, Texte und Preise sind PLATZHALTER
 * und werden im Admin durch das echte Sortiment ersetzt.
 * Ausführen: npm run db:seed
 */
import { PrismaClient, type Category, type Concentration } from "@prisma/client";

const db = new PrismaClient();

type Seed = {
  slug: string;
  name: string;
  category: Category;
  concentration: Concentration;
  family: string;
  accent: string;
  short: string;
  description: string;
  top: string[];
  heart: string[];
  base: string[];
  prices: [number, number, number]; // 30 / 50 / 100 ml in Euro
  featured?: boolean;
};

const products: Seed[] = [
  {
    slug: "ambre-de-nuit",
    name: "Ambre de Nuit",
    category: "UNISEX",
    concentration: "EDP",
    family: "Ambra",
    accent: "#B5823C",
    short: "Warme Ambra mit Labdanum, Vanille und einem Hauch rosa Pfeffer.",
    description:
      "Ambre de Nuit ist ein warmer, harziger Duft für kühle Abende. Rosa Pfeffer und Bergamotte öffnen hell und leicht, bevor Labdanum und Benzoe das Herz tragen. In der Basis bleiben Vanille, Tonka und ein trockenes Zedernholz auf der Haut, oft bis zum nächsten Morgen. Ein Eau de Parfum für Menschen, die Wärme ohne Süße suchen.",
    top: ["Rosa Pfeffer", "Bergamotte"],
    heart: ["Labdanum", "Benzoe", "Iris"],
    base: ["Vanille", "Tonkabohne", "Zedernholz"],
    prices: [65, 95, 145],
    featured: true,
  },
  {
    slug: "iris-blanche",
    name: "Iris Blanche",
    category: "DAMEN",
    concentration: "EDP",
    family: "Blumig",
    accent: "#C9BFD8",
    short: "Pudrige Iris, weißer Moschus und frische Birne. Leise und nah an der Haut.",
    description:
      "Iris Blanche zeigt die pudrige Seite der Iris, ohne schwer zu werden. Eine saftige Birne und Aldehyde geben am Anfang Licht, im Herzen liegen Irisbutter und Veilchenblatt. Die Basis aus weißem Moschus und Kaschmirholz bleibt dicht an der Haut. Gut für das Büro und für alle, die einen Duft lieber selbst riechen als ihn vorauszuschicken.",
    top: ["Birne", "Aldehyde"],
    heart: ["Iris", "Veilchenblatt", "Heliotrop"],
    base: ["Weißer Moschus", "Kaschmirholz"],
    prices: [59, 89, 135],
    featured: true,
  },
  {
    slug: "cedre-noir",
    name: "Cèdre Noir",
    category: "HERREN",
    concentration: "EDP",
    family: "Holzig",
    accent: "#3B3A36",
    short: "Rauchige Zeder, Vetiver und schwarzer Pfeffer. Trocken, klar, ausdauernd.",
    description:
      "Cèdre Noir ist ein trockener Holzduft ohne Zuckerguss. Schwarzer Pfeffer und Grapefruit eröffnen kantig, danach übernehmen atlantische Zeder und haitianisches Vetiver. Ein Hauch Birkenteer gibt der Basis Rauch und Leder. Der Duft trägt sich tagsüber wie abends und hält auf Kleidung mehrere Tage.",
    top: ["Schwarzer Pfeffer", "Grapefruit"],
    heart: ["Zedernholz", "Vetiver"],
    base: ["Birkenteer", "Leder", "Ambroxan"],
    prices: [62, 92, 139],
    featured: true,
  },
  {
    slug: "neroli-clair",
    name: "Néroli Clair",
    category: "UNISEX",
    concentration: "EDT",
    family: "Frisch",
    accent: "#E3C46E",
    short: "Neroli, Petitgrain und Meersalz. Ein heller Sommerduft mit Leichtigkeit.",
    description:
      "Néroli Clair riecht nach einem Morgen am Mittelmeer. Bitterorange, Petitgrain und Neroliblüte wirken frisch und grün, Meersalz und ein mineralischer Akkord halten den Duft luftig. In der Basis sorgt ein sanfter Moschus dafür, dass die Frische nicht nach einer Stunde verfliegt. Als Eau de Toilette leichter dosiert, ideal für warme Tage.",
    top: ["Bitterorange", "Petitgrain"],
    heart: ["Neroli", "Orangenblüte", "Meersalz"],
    base: ["Moschus", "Treibholz"],
    prices: [49, 72, 110],
  },
  {
    slug: "oud-dore",
    name: "Oud Doré",
    category: "NISCHE",
    concentration: "EXTRAIT",
    family: "Ambra",
    accent: "#8C6A32",
    short: "Extrait mit Oud, Safran und Rose. Dicht, opulent, in kleiner Auflage.",
    description:
      "Oud Doré ist die konzentrierteste Komposition im Sortiment. Safran und Kardamom bringen Glanz, eine dunkle türkische Rose bildet das Herz. Oud, Patschuli und Ambra geben der Basis eine harzige, leicht animalische Tiefe. Als Extrait de Parfum mit hohem Ölanteil reichen ein bis zwei Sprühstöße für den ganzen Tag.",
    top: ["Safran", "Kardamom"],
    heart: ["Türkische Rose", "Geranie"],
    base: ["Oud", "Patschuli", "Ambra"],
    prices: [95, 145, 220],
    featured: true,
  },
  {
    slug: "rose-silencieuse",
    name: "Rose Silencieuse",
    category: "DAMEN",
    concentration: "EDP",
    family: "Chypre",
    accent: "#C98B8B",
    short: "Moderne Chypre mit Rose, Eichenmoos und Litschi. Elegant, nicht altmodisch.",
    description:
      "Rose Silencieuse übersetzt den klassischen Chypre-Aufbau in eine heutige Sprache. Litschi und Bergamotte öffnen spritzig, im Herzen steht eine frische Damaszener Rose. Eichenmoos-Akkord und Patschuli geben der Basis Struktur und Erdigkeit. Ein Duft, der Haltung zeigt und trotzdem nah bleibt.",
    top: ["Litschi", "Bergamotte"],
    heart: ["Damaszener Rose", "Pfingstrose"],
    base: ["Eichenmoos", "Patschuli", "Moschus"],
    prices: [62, 92, 139],
  },
  {
    slug: "vetiver-matin",
    name: "Vétiver Matin",
    category: "HERREN",
    concentration: "EDT",
    family: "Frisch",
    accent: "#7D8A6A",
    short: "Grünes Vetiver, Zitrone und Ingwer. Frisch für den Tag.",
    description:
      "Vétiver Matin ist der Alltagsduft im Sortiment. Zitrone und frischer Ingwer wirken wach, im Herzen sorgen grünes Vetiver und Muskatellersalbei für Klarheit. Die Basis aus hellem Holz und Moschus bleibt dezent. Ein Duft für Meetings, den Weg ins Büro und alle Tage, an denen nichts aufdringlich sein soll.",
    top: ["Zitrone", "Ingwer"],
    heart: ["Vetiver", "Muskatellersalbei"],
    base: ["Helles Holz", "Moschus"],
    prices: [49, 72, 110],
  },
  {
    slug: "vanille-fumee",
    name: "Vanille Fumée",
    category: "NISCHE",
    concentration: "EDP",
    family: "Gourmand",
    accent: "#6B4A2E",
    short: "Geräucherte Vanille, Tabakblatt und Kakao. Gourmand mit Rauch statt Zucker.",
    description:
      "Vanille Fumée zeigt Vanille von ihrer dunklen Seite. Tabakblatt und Rum geben am Anfang Wärme, im Herzen liegen Kakao und Tonkabohne. Die Basis ist geräuchert, mit Guajakholz und einem Hauch Leder. Ein Gourmand für Menschen, die süße Düfte normalerweise meiden.",
    top: ["Rum", "Tabakblatt"],
    heart: ["Kakao", "Tonkabohne"],
    base: ["Vanille", "Guajakholz", "Leder"],
    prices: [69, 99, 149],
  },
];

async function main() {
  for (const p of products) {
    const sizes = [30, 50, 100] as const;
    await db.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        brandName: "Nadir",
        brandSlug: "nadir",
        category: p.category,
        concentration: p.concentration,
        fragranceFamily: p.family,
        accentColor: p.accent,
        shortDescription: p.short,
        description: p.description,
        topNotes: p.top,
        heartNotes: p.heart,
        baseNotes: p.base,
        featured: p.featured ?? false,
        variants: {
          create: sizes.map((ml, i) => ({
            sizeMl: ml,
            priceCents: p.prices[i] * 100,
            stock: p.slug === "oud-dore" && ml === 100 ? 0 : 12,
            sku: `NAD-${p.slug.toUpperCase().slice(0, 10)}-${ml}`,
          })),
        },
      },
    });
  }
  console.log(`${products.length} Produkte angelegt.`);
}

main().finally(() => db.$disconnect());
