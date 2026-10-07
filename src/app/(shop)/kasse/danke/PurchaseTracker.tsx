"use client";

import { useEffect } from "react";
import { useCart } from "@/components/Cart";
import { track } from "@/components/analytics";

export function PurchaseTracker(props: { orderNumber: number; value: number; shipping: number; items: Record<string, unknown>[] }) {
  const { clear, ready } = useCart();
  useEffect(() => {
    if (!ready) return;
    clear();
    const key = `tracked-${props.orderNumber}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {}
    track("purchase", { transaction_id: String(props.orderNumber), currency: "EUR", value: props.value, shipping: props.shipping, items: props.items });
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
