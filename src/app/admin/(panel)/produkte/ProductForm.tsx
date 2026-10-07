"use client";

import { useActionState, useState } from "react";
import type { Product, Variant } from "@prisma/client";
import { saveProduct, type SaveState } from "../../actions";
import { categories, concentrationLabel, fragranceFamilies, type CategoryKey } from "@/lib/config";

type VRow = { id?: string; sizeMl: string; price: string; compareAt: string; stock: string; sku: string };

export function ProductForm({ product }: { product?: Product & { variants: Variant[] } }) {
  const action = saveProduct.bind(null, product?.id ?? null);
  const [state, formAction, pending] = useActionState<SaveState, FormData>(action, undefined);
  const [rows, setRows] = useState<VRow[]>(
    product?.variants.map((v) => ({
      id: v.id,
      sizeMl: String(v.sizeMl),
      price: (v.priceCents / 100).toFixed(2),
      compareAt: v.compareAtCents ? (v.compareAtCents / 100).toFixed(2) : "",
      stock: String(v.stock),
      sku: v.sku,
    })) ?? [
      { sizeMl: "30", price: "", compareAt: "", stock: "0", sku: "" },
      { sizeMl: "50", price: "", compareAt: "", stock: "0", sku: "" },
      { sizeMl: "100", price: "", compareAt: "", stock: "0", sku: "" },
    ],
  );
  const set = (i: number, k: keyof VRow, v: string) => setRows((r) => r.map((row, j) => (j === i ? { ...row, [k]: v } : row)));

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="variants" value={JSON.stringify(rows.map((r) => ({ ...r, price: r.price.replace(",", "."), compareAt: r.compareAt.replace(",", ".") })))} />

      <section className="grid gap-4 bg-paper p-6 md:grid-cols-2">
        <h2 className="font-sans text-lg md:col-span-2">Grunddaten</h2>
        <Field label="Name des Dufts" name="name" defaultValue={product?.name} required />
        <Field label="Marke" name="brandName" defaultValue={product?.brandName ?? "Nadir"} required />
        <label>
          <span className="mb-1.5 block text-sm text-mist">Für</span>
          <select name="category" defaultValue={product?.category ?? "UNISEX"} className="field">
            {(Object.keys(categories) as CategoryKey[]).map((k) => <option key={k} value={k}>{categories[k].label}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-sm text-mist">Konzentration</span>
          <select name="concentration" defaultValue={product?.concentration ?? "EDP"} className="field">
            {Object.entries(concentrationLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-sm text-mist">Duftfamilie</span>
          <select name="fragranceFamily" defaultValue={product?.fragranceFamily ?? "Holzig"} className="field">
            {fragranceFamilies.map((f) => <option key={f}>{f}</option>)}
          </select>
        </label>
        <Field label="URL-Name (leer lassen = automatisch aus dem Namen)" name="slug" defaultValue={product?.slug} />
        <label className="md:col-span-2">
          <span className="mb-1.5 block text-sm text-mist">Kurzbeschreibung (1 Satz, erscheint unter dem Namen)</span>
          <input name="shortDescription" defaultValue={product?.shortDescription} required maxLength={200} className="field" />
        </label>
        <label className="md:col-span-2">
          <span className="mb-1.5 block text-sm text-mist">Beschreibung (eigener Text, 3–6 Sätze; wichtig für Google)</span>
          <textarea name="description" defaultValue={product?.description} required rows={6} className="field" />
        </label>
      </section>

      <section className="grid gap-4 bg-paper p-6 md:grid-cols-3">
        <h2 className="font-sans text-lg md:col-span-3">Duftnoten <span className="text-sm text-mist">(mit Komma trennen)</span></h2>
        <Field label="Kopfnote" name="topNotes" defaultValue={product?.topNotes.join(", ")} />
        <Field label="Herznote" name="heartNotes" defaultValue={product?.heartNotes.join(", ")} />
        <Field label="Basisnote" name="baseNotes" defaultValue={product?.baseNotes.join(", ")} />
      </section>

      <section className="bg-paper p-6">
        <h2 className="font-sans text-lg">Größen, Preise und Bestand</h2>
        <p className="mt-1 text-sm text-mist">Preise brutto in Euro inkl. USt. Streichpreis nur bei echten Preissenkungen angeben.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-mist">
              <tr><th className="pb-2 font-normal">ml</th><th className="pb-2 font-normal">Preis €</th><th className="pb-2 font-normal">Streichpreis €</th><th className="pb-2 font-normal">Bestand</th><th className="pb-2 font-normal">Artikelnummer</th><th /></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id ?? i}>
                  <td className="pr-2 py-1"><input aria-label="Größe in ml" className="field w-20" inputMode="numeric" value={r.sizeMl} onChange={(e) => set(i, "sizeMl", e.target.value)} /></td>
                  <td className="pr-2 py-1"><input aria-label="Preis" className="field w-24" inputMode="decimal" value={r.price} onChange={(e) => set(i, "price", e.target.value)} /></td>
                  <td className="pr-2 py-1"><input aria-label="Streichpreis" className="field w-24" inputMode="decimal" value={r.compareAt} onChange={(e) => set(i, "compareAt", e.target.value)} /></td>
                  <td className="pr-2 py-1"><input aria-label="Bestand" className="field w-20" inputMode="numeric" value={r.stock} onChange={(e) => set(i, "stock", e.target.value)} /></td>
                  <td className="pr-2 py-1"><input aria-label="Artikelnummer" className="field" value={r.sku} onChange={(e) => set(i, "sku", e.target.value)} /></td>
                  <td className="py-1"><button type="button" className="text-sm underline" onClick={() => setRows((x) => x.filter((_, j) => j !== i))}>Entfernen</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="btn btn-ghost mt-4" onClick={() => setRows((r) => [...r, { sizeMl: "", price: "", compareAt: "", stock: "0", sku: "" }])}>
          Größe hinzufügen
        </button>
      </section>

      <section className="grid gap-4 bg-paper p-6 md:grid-cols-3 md:items-end">
        <label>
          <span className="mb-1.5 block text-sm text-mist">Flakon-Farbe (solange kein Foto da ist)</span>
          <input type="color" name="accentColor" defaultValue={product?.accentColor ?? "#B08D57"} className="h-11 w-24 border border-line" />
        </label>
        <label className="flex items-center gap-3"><input type="checkbox" name="active" defaultChecked={product?.active ?? true} className="h-5 w-5 accent-black" /> Im Shop sichtbar</label>
        <label className="flex items-center gap-3"><input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} className="h-5 w-5 accent-black" /> Auf der Startseite zeigen</label>
      </section>

      <div className="flex items-center gap-4">
        <button className="btn btn-solid" disabled={pending}>{pending ? "Speichern …" : "Speichern"}</button>
        <p role="status" className={state?.error ? "text-[#a12a2a]" : "text-gold-deep"}>{state?.error ?? (state?.ok ? "Gespeichert." : "")}</p>
      </div>
    </form>
  );
}

function Field({ label, name, defaultValue, required }: { label: string; name: string; defaultValue?: string; required?: boolean }) {
  return (
    <label>
      <span className="mb-1.5 block text-sm text-mist">{label}</span>
      <input name={name} defaultValue={defaultValue} required={required} className="field" />
    </label>
  );
}
