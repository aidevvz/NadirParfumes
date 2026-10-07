import { db } from "@/lib/db";
import { shop, categories, concentrationLabel, shipping } from "@/lib/config";
import { articles, faqs } from "@/lib/content";
import { productPath } from "@/lib/catalog";
import { euro } from "@/lib/money";

export const revalidate = 3600;

/** llms.txt (llmstxt.org): kompakte Übersicht für KI-Assistenten und Antwortmaschinen. */
export async function GET() {
  const products = await db.product.findMany({
    where: { active: true },
    include: { variants: { orderBy: { sizeMl: "asc" } } },
    orderBy: { name: "asc" },
  });
  const u = (p: string) => `${shop.url}${p}`;
  const lines = [
    `# ${shop.name}`,
    "",
    `> ${shop.name} ist der Onlineshop der Parfummarke ${shop.brand} aus ${shop.city}. Verkauft werden ausschließlich eigene Düfte (Eau de Parfum, Eau de Toilette, Extrait) in 30, 50 und 100 ml. Versand nach Österreich, Deutschland und in die Schweiz; Preise in Euro inkl. 20 % USt.`,
    "",
    "## Düfte",
    ...products.map((p) => {
      const prices = p.variants.map((v) => `${v.sizeMl} ml ${euro(v.priceCents)}`).join(", ");
      return `- [${p.name}](${u(productPath(p))}): ${concentrationLabel[p.concentration]}, ${p.fragranceFamily}, ${categories[p.category].label}. Noten: ${[...p.topNotes, ...p.heartNotes, ...p.baseNotes].join(", ")}. ${prices}.`;
    }),
    "",
    "## Kategorien",
    ...Object.values(categories).map((c) => `- [${c.label}](${u(`/kategorie/${c.slug}`)}): ${c.intro}`),
    "",
    "## Service",
    `- [Versand und Zahlung](${u("/versand-zahlung")}): ${Object.values(shipping).map((s) => `${s.label} ${euro(s.priceCents)}, ${s.days[0]}–${s.days[1]} Werktage`).join("; ")}. Nur Landweg (Gefahrgut).`,
    `- [Rücktrittsrecht](${u("/widerruf")}): 14 Tage ab Erhalt.`,
    `- [Häufige Fragen](${u("/faq")}): ${faqs.map((f) => f.q).join(" ")}`,
    `- [Kontakt](${u("/kontakt")}): ${shop.email}`,
    "",
    "## Ratgeber",
    ...articles.map((a) => `- [${a.title}](${u(`/ratgeber/${a.slug}`)}): ${a.description}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
