"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./Cart";
import { euro, basePrice } from "@/lib/money";

type V = { id: string; sizeMl: number; priceCents: number; compareAtCents: number | null; stock: number };

export function BuyBox({
  variants,
  initialSize,
  productName,
  href,
  color,
  image,
}: {
  variants: V[];
  initialSize?: number;
  productName: string;
  href: string;
  color: string;
  image?: string;
}) {
  const { add } = useCart();
  const firstAvailable = variants.find((v) => v.sizeMl === initialSize) ?? variants.find((v) => v.stock > 0) ?? variants[0];
  const [sel, setSel] = useState(firstAvailable.id);
  const [added, setAdded] = useState(false);
  const v = variants.find((x) => x.id === sel)!;
  const soldOut = v.stock <= 0;

  return (
    <div>
      <fieldset>
        <legend className="mb-3 text-sm text-mist">Größe</legend>
        <div className="grid grid-cols-3 gap-2">
          {variants.map((x) => {
            const active = x.id === sel;
            return (
              <label
                key={x.id}
                className={`relative cursor-pointer border px-3 py-3 text-center transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold-deep ${
                  active ? "border-ink bg-ink text-paper" : "border-line hover:border-gold"
                } ${x.stock <= 0 ? "opacity-50" : ""}`}
              >
                <input
                  type="radio"
                  name="size"
                  value={x.id}
                  checked={active}
                  onChange={() => {
                    setSel(x.id);
                    setAdded(false);
                  }}
                  className="sr-only"
                />
                <span className="block text-[1.05rem]">{x.sizeMl} ml</span>
                <span className={`block text-sm ${active ? "text-paper/75" : "text-mist"}`}>
                  {x.stock > 0 ? euro(x.priceCents) : "ausverkauft"}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex items-baseline gap-3">
        <p className="font-display text-4xl">{euro(v.priceCents)}</p>
        {v.compareAtCents && v.compareAtCents > v.priceCents && (
          <p className="text-mist line-through">{euro(v.compareAtCents)}</p>
        )}
      </div>
      <p className="mt-1 text-sm text-mist">
        Grundpreis {basePrice(v.priceCents, v.sizeMl)}. Inkl. 20 % USt, zzgl.{" "}
        <Link href="/versand-zahlung" className="underline">
          Versand
        </Link>
      </p>
      <p className={`mt-4 text-sm ${soldOut ? "text-mist" : "text-gold-deep"}`}>
        {soldOut ? "Diese Größe ist derzeit ausverkauft." : v.stock <= 3 ? `Nur noch ${v.stock} auf Lager` : "Auf Lager, Versand in 1–2 Werktagen"}
      </p>

      <button
        className="btn btn-solid mt-6 w-full"
        disabled={soldOut}
        onClick={() => {
          add({ variantId: v.id, productName, sizeMl: v.sizeMl, priceCents: v.priceCents, href, color, image, maxStock: v.stock });
          setAdded(true);
        }}
      >
        {soldOut ? "Ausverkauft" : "In den Warenkorb"}
      </button>
      <p role="status" className="mt-3 min-h-6 text-sm">
        {added && (
          <>
            {productName} {v.sizeMl} ml liegt im Warenkorb.{" "}
            <Link href="/warenkorb" className="underline hover:text-gold-deep">
              Zum Warenkorb
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
