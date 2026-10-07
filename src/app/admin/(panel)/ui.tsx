import type { OrderStatus } from "@prisma/client";

export const statusLabel: Record<OrderStatus, string> = {
  PENDING: "Kasse offen",
  PAID: "Bezahlt, zu versenden",
  SHIPPED: "Versendet",
  CANCELLED: "Storniert / abgebrochen",
  REFUNDED: "Erstattet",
};

const statusClass: Record<OrderStatus, string> = {
  PENDING: "bg-line text-mist",
  PAID: "bg-gold text-paper",
  SHIPPED: "bg-ink text-paper",
  CANCELLED: "bg-paper text-mist border border-line",
  REFUNDED: "bg-paper text-mist border border-line",
};

export function StatusBadge({ s }: { s: OrderStatus }) {
  return <span className={`inline-block whitespace-nowrap px-2 py-0.5 text-xs ${statusClass[s]}`}>{statusLabel[s]}</span>;
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`bg-paper p-6 ${className}`}>{children}</section>;
}

export const dateFmt = new Intl.DateTimeFormat("de-AT", { dateStyle: "medium", timeStyle: "short" });
