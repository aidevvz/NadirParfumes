import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { productPath } from "@/lib/catalog";

const Body = z.object({ variantIds: z.array(z.string().min(1).max(40)).max(50) });

/** Aktuelle Daten zu Warenkorb-Artikeln: Name, Preis, Bild, Bestand. Unbekannte IDs fehlen in der Antwort. */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ items: [] }, { status: 400 });
  const variants = await db.variant.findMany({
    where: { id: { in: parsed.data.variantIds }, product: { active: true } },
    include: { product: { include: { images: { orderBy: { position: "asc" }, take: 1 } } } },
  });
  return NextResponse.json({
    items: variants.map((v) => ({
      variantId: v.id,
      productName: v.product.name,
      sizeMl: v.sizeMl,
      priceCents: v.priceCents,
      href: productPath(v.product),
      color: v.product.accentColor,
      image: v.product.images[0]?.url,
      maxStock: v.stock,
    })),
  });
}
