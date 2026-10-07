import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { productPath } from "@/lib/catalog";
import { deleteImage, deleteProduct } from "../../../actions";
import { ProductForm } from "../ProductForm";
import { ImageUpload } from "./ImageUpload";
import { ConfirmButton } from "./ConfirmButton";

export default async function EditProduct({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ neu?: string }> }) {
  const { id } = await params;
  const { neu } = await searchParams;
  const p = await db.product.findUnique({ where: { id }, include: { variants: { orderBy: { sizeMl: "asc" } }, images: { orderBy: { position: "asc" } } } });
  if (!p) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/produkte" className="text-sm underline">Alle Produkte</Link>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-4xl">{p.name}</h1>
        <Link href={productPath(p)} target="_blank" className="text-sm underline">Im Shop ansehen</Link>
      </div>
      {neu && <p className="bg-gold-pale px-4 py-3 text-gold-deep">Produkt angelegt. Jetzt Fotos hochladen.</p>}

      <section className="bg-paper p-6">
        <h2 className="font-sans text-lg">Fotos</h2>
        <p className="mt-1 text-sm text-mist">Hochformat 4:5, mind. 1200 px breit, heller Hintergrund. Das erste Foto ist das Hauptbild.</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {p.images.map((img) => (
            <div key={img.id} className="w-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt} className="aspect-[4/5] w-full object-cover" />
              <form action={deleteImage.bind(null, img.id)}><button className="mt-1 text-xs underline">Löschen</button></form>
            </div>
          ))}
          {!p.images.length && <p className="text-mist">Noch keine Fotos. Bis dahin zeigt der Shop einen gezeichneten Flakon.</p>}
        </div>
        <ImageUpload productId={p.id} />
      </section>

      <ProductForm product={p} />

      <section className="border border-[#a12a2a]/30 bg-paper p-6">
        <h2 className="font-sans text-lg">Produkt löschen</h2>
        <p className="mt-1 text-sm text-mist">Besser: Häkchen bei „Im Shop sichtbar“ entfernen. Löschen entfernt das Produkt endgültig; bestehende Bestellungen bleiben erhalten.</p>
        <form action={deleteProduct.bind(null, p.id)} className="mt-4">
          <ConfirmButton message={`„${p.name}“ endgültig löschen?`}>Endgültig löschen</ConfirmButton>
        </form>
      </section>
    </div>
  );
}
