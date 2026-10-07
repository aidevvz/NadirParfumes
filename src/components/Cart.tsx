"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { track } from "./analytics";

export type CartLine = {
  variantId: string;
  productName: string;
  sizeMl: number;
  priceCents: number;
  href: string;
  color: string;
  image?: string;
  quantity: number;
  maxStock: number;
};

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotalCents: number;
  add: (line: Omit<CartLine, "quantity">, qty?: number) => void;
  setQty: (variantId: string, qty: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
  ready: boolean;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "nadir-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const add = useCallback((line: Omit<CartLine, "quantity">, qty = 1) => {
    setLines((prev) => {
      const hit = prev.find((l) => l.variantId === line.variantId);
      if (hit) {
        return prev.map((l) =>
          l.variantId === line.variantId ? { ...l, ...line, quantity: Math.min(l.quantity + qty, line.maxStock) } : l,
        );
      }
      return [...prev, { ...line, quantity: Math.min(qty, line.maxStock) }];
    });
    track("add_to_cart", {
      currency: "EUR",
      value: (line.priceCents * qty) / 100,
      items: [{ item_id: line.variantId, item_name: line.productName, item_variant: `${line.sizeMl} ml`, price: line.priceCents / 100, quantity: qty }],
    });
  }, []);

  const setQty = useCallback((variantId: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.variantId === variantId ? { ...l, quantity: Math.max(0, Math.min(qty, l.maxStock)) } : l))
        .filter((l) => l.quantity > 0),
    );
  }, []);

  const remove = useCallback((variantId: string) => setLines((p) => p.filter((l) => l.variantId !== variantId)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.quantity, 0),
      subtotalCents: lines.reduce((s, l) => s + l.quantity * l.priceCents, 0),
      add,
      setQty,
      remove,
      clear,
      ready,
    }),
    [lines, add, setQty, remove, clear, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart außerhalb von CartProvider");
  return c;
}
