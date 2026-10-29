/**
 * NADIR-Sortiment: Aurelis, Essencia, Red Velvet (Extrait de Parfum, 50 ml).
 * PLATZHALTER: Preise, Bestand, Kategorie und Duftnoten vor Livegang mit dem
 * Hersteller abgleichen und im Admin korrigieren.
 * Ausführen: npm run db:seed (mehrfach ausführbar, aktualisiert bestehende Einträge)
 */
import { PrismaClient } from "@prisma/client";
import { oldSamples, products, productData } from "./catalog-data";

const db = new PrismaClient();

async function main() {
  const removed = await db.product.deleteMany({ where: { slug: { in: oldSamples } } });
  if (removed.count) console.log(`${removed.count} alte Beispielprodukte entfernt.`);

  for (const p of products) {
    const data = productData(p);
    const prod = await db.product.upsert({ where: { slug: p.slug }, update: data, create: { slug: p.slug, ...data } });

    await db.productImage.deleteMany({ where: { productId: prod.id, url: { startsWith: "/images/products/" } } });
    await db.productImage.createMany({
      data: p.images.map((img, i) => ({ productId: prod.id, url: img.url, alt: img.alt, position: i })),
    });

    const sku = `NAD-${p.slug.toUpperCase()}-50`;
    await db.variant.upsert({
      where: { sku },
      update: {},
      create: { productId: prod.id, sizeMl: 50, priceCents: Math.round(p.priceEuro * 100), stock: 20, sku },
    });
  }
  console.log(`${products.length} NADIR-Düfte angelegt bzw. aktualisiert.`);
}

main().finally(() => db.$disconnect());
