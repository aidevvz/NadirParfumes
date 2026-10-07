import Link from "next/link";
import { db } from "@/lib/db";
import { euro } from "@/lib/money";
import { categories } from "@/lib/config";
import { updateStock } from "../../actions";
import { Card } from "../ui";

export default async function Products() {
  const products = await db.product.findMany({ include: { variants: { orderBy: { sizeMl: "asc" } } }, orderBy: { name: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl">Produkte</h1>
        <Link href="/admin/produkte/neu" className="btn btn-solid">Neues Produkt</Link>
      </div>
      <p className="text-mist">Bestand direkt hier ändern: Zahl eintragen und „Speichern“ drücken. Für alles andere auf den Namen klicken.</p>
      <div className="space-y-3">
        {products.map((p) => (
          <Card key={p.id} className="grid gap-4 md:grid-cols-[1.2fr_2fr] md:items-center">
            <div>
              <Link href={`/admin/produkte/${p.id}`} className="font-display text-2xl hover:text-gold-deep">{p.name}</Link>
              <p className="text-sm text-mist">
                {categories[p.category].label}, {p.fragranceFamily}
                {!p.active && <span className="ml-2 bg-line px-1.5 py-0.5 text-xs text-ink">nicht sichtbar</span>}
                {p.featured && <span className="ml-2 bg-gold-pale px-1.5 py-0.5 text-xs text-gold-deep">Startseite</span>}
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {p.variants.map((v) => (
                <form key={v.id} action={updateStock.bind(null, v.id)} className="flex items-center gap-2 border border-line p-2">
                  <span className="w-16 shrink-0 text-sm">{v.sizeMl} ml<br /><span className="text-mist">{euro(v.priceCents)}</span></span>
                  <label className="sr-only" htmlFor={`s-${v.id}`}>Bestand {p.name} {v.sizeMl} ml</label>
                  <input id={`s-${v.id}`} name="stock" type="number" min={0} defaultValue={v.stock} className={`field !min-h-9 w-16 !px-2 ${v.stock === 0 ? "!border-[#a12a2a]" : ""}`} />
                  <button className="text-sm underline hover:text-gold-deep">Speichern</button>
                </form>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
