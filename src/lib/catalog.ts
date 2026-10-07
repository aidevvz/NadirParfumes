import { Prisma, type Category } from "@prisma/client";
import { db } from "./db";

export const productInclude = {
  variants: { orderBy: { sizeMl: "asc" } },
  images: { orderBy: { position: "asc" } },
} satisfies Prisma.ProductInclude;

export type ProductFull = Prisma.ProductGetPayload<{ include: typeof productInclude }>;

export const productPath = (p: { brandSlug: string; slug: string }) => `/parfum/${p.brandSlug}/${p.slug}`;

export const fromPrice = (p: ProductFull) => Math.min(...p.variants.map((v) => v.priceCents));
export const inStock = (p: ProductFull) => p.variants.some((v) => v.stock > 0);

export type Filters = {
  q?: string;
  category?: Category;
  family?: string;
  size?: number;
  maxPrice?: number; // Euro
  sort?: "neu" | "preis-auf" | "preis-ab";
};

export async function findProducts(f: Filters) {
  const variantWhere: Prisma.VariantWhereInput = {};
  if (f.size) variantWhere.sizeMl = f.size;
  if (f.maxPrice) variantWhere.priceCents = { lte: f.maxPrice * 100 };

  const where: Prisma.ProductWhereInput = {
    active: true,
    ...(f.category && { category: f.category }),
    ...(f.family && { fragranceFamily: f.family }),
    ...(Object.keys(variantWhere).length && { variants: { some: variantWhere } }),
    ...(f.q && {
      OR: [
        { name: { contains: f.q, mode: "insensitive" } },
        { brandName: { contains: f.q, mode: "insensitive" } },
        { fragranceFamily: { contains: f.q, mode: "insensitive" } },
        { topNotes: { has: f.q } },
        { heartNotes: { has: f.q } },
        { baseNotes: { has: f.q } },
        { shortDescription: { contains: f.q, mode: "insensitive" } },
      ],
    }),
  };

  const products = await db.product.findMany({ where, include: productInclude, orderBy: { createdAt: "desc" } });
  if (f.sort === "preis-auf") products.sort((a, b) => fromPrice(a) - fromPrice(b));
  if (f.sort === "preis-ab") products.sort((a, b) => fromPrice(b) - fromPrice(a));
  return products;
}

export async function getProduct(brandSlug: string, slug: string) {
  return db.product.findFirst({ where: { brandSlug, slug, active: true }, include: productInclude });
}
