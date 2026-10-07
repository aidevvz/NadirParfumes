import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { shop, categories } from "@/lib/config";
import { articles } from "@/lib/content";
import { productPath } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await db.product.findMany({ where: { active: true }, select: { slug: true, brandSlug: true, updatedAt: true } });
  const u = (p: string) => `${shop.url}${p}`;
  return [
    { url: u("/"), changeFrequency: "weekly", priority: 1 },
    { url: u("/parfums"), changeFrequency: "weekly", priority: 0.9 },
    ...Object.values(categories).map((c) => ({ url: u(`/kategorie/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: u(productPath(p)), lastModified: p.updatedAt, changeFrequency: "weekly" as const, priority: 0.9 })),
    { url: u("/ratgeber"), changeFrequency: "monthly", priority: 0.6 },
    ...articles.map((a) => ({ url: u(`/ratgeber/${a.slug}`), lastModified: new Date(a.date), priority: 0.6 })),
    ...["/faq", "/versand-zahlung", "/kontakt", "/widerruf", "/agb", "/impressum", "/datenschutz"].map((p) => ({ url: u(p), priority: 0.3 })),
  ];
}
