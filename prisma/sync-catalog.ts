/**
 * Läuft automatisch bei jedem Build (siehe package.json "build").
 * - Entfernt die alten Beispieldüfte der ersten Version.
 * - Legt Aurelis, Essencia und Red Velvet an, falls sie noch fehlen.
 * Bestehende Produkte werden NICHT überschrieben, damit Änderungen aus dem Admin
 * (Preise, Bestand, Texte) erhalten bleiben. Ohne DATABASE_URL wird nichts getan.
 */
import { PrismaClient } from "@prisma/client";
import { oldSamples, products, productData } from "./catalog-data";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("[sync-catalog] Keine DATABASE_URL, übersprungen.");
    return;
  }
  const db = new PrismaClient();
  try {
    const removed = await db.product.deleteMany({ where: { slug: { in: oldSamples } } });
    if (removed.count) console.log(`[sync-catalog] ${removed.count} alte Beispieldüfte entfernt.`);

    for (const p of products) {
      const exists = await db.product.findUnique({ where: { slug: p.slug } });
      if (exists) continue;
      await db.product.create({
        data: {
          slug: p.slug,
          ...productData(p),
          images: { create: p.images.map((img, i) => ({ url: img.url, alt: img.alt, position: i })) },
          variants: { create: [{ sizeMl: 50, priceCents: p.priceEuro * 100, stock: 20, sku: `NAD-${p.slug.toUpperCase()}-50` }] },
        },
      });
      console.log(`[sync-catalog] ${p.name} angelegt.`);
    }
  } finally {
    await db.$disconnect();
  }
}

main().catch((e) => {
  // Build nicht wegen der Datenbank scheitern lassen
  console.error("[sync-catalog] Fehler, Build läuft weiter:", e instanceof Error ? e.message : e);
});
