import Link from "next/link";
import { ProductForm } from "../ProductForm";

export default function NewProduct() {
  return (
    <div className="space-y-6">
      <Link href="/admin/produkte" className="text-sm underline">Alle Produkte</Link>
      <h1 className="text-4xl">Neues Produkt</h1>
      <p className="text-mist">Nach dem ersten Speichern können Sie Fotos hochladen.</p>
      <ProductForm />
    </div>
  );
}
