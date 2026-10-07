import type { Metadata } from "next";
import { CartView } from "./CartView";

export const metadata: Metadata = { title: "Warenkorb", robots: { index: false } };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 md:px-10 md:pt-20">
      <h1 className="text-5xl md:text-6xl">Warenkorb</h1>
      <CartView />
    </div>
  );
}
