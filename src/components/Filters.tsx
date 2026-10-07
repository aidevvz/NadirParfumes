import Link from "next/link";
import { categories, fragranceFamilies, type CategoryKey } from "@/lib/config";

type Props = {
  action: string;
  values: { q?: string; kategorie?: string; duft?: string; groesse?: string; preis?: string; sort?: string };
  hideCategory?: boolean;
};

/** Filter als normales GET-Formular: funktioniert ohne JavaScript und ist crawlbar. */
export function Filters({ action, values, hideCategory }: Props) {
  return (
    <form action={action} method="get" className="grid gap-4 border-y border-line py-6 sm:grid-cols-2 lg:grid-cols-6 lg:items-end">
      <label className="lg:col-span-2">
        <span className="mb-1.5 block text-sm text-mist">Suche</span>
        <input type="search" name="q" defaultValue={values.q} placeholder="Duft, Note oder Familie" className="field" />
      </label>
      {!hideCategory && (
        <Select name="kategorie" label="Für" value={values.kategorie}>
          <option value="">Alle</option>
          {(Object.keys(categories) as CategoryKey[]).map((k) => (
            <option key={k} value={categories[k].slug}>
              {categories[k].label}
            </option>
          ))}
        </Select>
      )}
      <Select name="duft" label="Duftfamilie" value={values.duft}>
        <option value="">Alle</option>
        {fragranceFamilies.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </Select>
      <Select name="groesse" label="Größe" value={values.groesse}>
        <option value="">Alle</option>
        <option value="30">30 ml</option>
        <option value="50">50 ml</option>
        <option value="100">100 ml</option>
      </Select>
      <Select name="preis" label="Preis bis" value={values.preis}>
        <option value="">Beliebig</option>
        <option value="60">60 €</option>
        <option value="90">90 €</option>
        <option value="120">120 €</option>
        <option value="160">160 €</option>
      </Select>
      <Select name="sort" label="Sortierung" value={values.sort}>
        <option value="neu">Neueste</option>
        <option value="preis-auf">Preis aufsteigend</option>
        <option value="preis-ab">Preis absteigend</option>
      </Select>
      <div className="flex gap-3 sm:col-span-2 lg:col-span-6">
        <button className="btn btn-solid">Filter anwenden</button>
        <Link href={action} className="btn btn-ghost">
          Zurücksetzen
        </Link>
      </div>
    </form>
  );
}

function Select({ name, label, value, children }: { name: string; label: string; value?: string; children: React.ReactNode }) {
  return (
    <label>
      <span className="mb-1.5 block text-sm text-mist">{label}</span>
      <select name={name} defaultValue={value ?? ""} className="field">
        {children}
      </select>
    </label>
  );
}
