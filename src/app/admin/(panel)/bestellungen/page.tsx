import Link from "next/link";
import type { OrderStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { euro } from "@/lib/money";
import { StatusBadge, statusLabel, dateFmt } from "../ui";

const filters: (OrderStatus | "ALLE")[] = ["PAID", "SHIPPED", "ALLE", "CANCELLED", "REFUNDED"];

export default async function Orders({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status = "PAID" } = await searchParams;
  const where = status === "ALLE" ? { status: { not: "PENDING" as const } } : { status: status as OrderStatus };
  const orders = await db.order.findMany({ where, orderBy: { createdAt: "desc" }, take: 200, include: { items: true } });

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Bestellungen</h1>
      <nav className="flex flex-wrap gap-2" aria-label="Status-Filter">
        {filters.map((f) => (
          <Link
            key={f}
            href={`/admin/bestellungen?status=${f}`}
            className={`border px-3 py-1.5 text-sm ${status === f ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-gold"}`}
          >
            {f === "ALLE" ? "Alle" : statusLabel[f]}
          </Link>
        ))}
      </nav>
      <div className="overflow-x-auto bg-paper">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-line text-left text-mist">
            <tr><th className="p-3 font-normal">Nr.</th><th className="p-3 font-normal">Datum</th><th className="p-3 font-normal">Kunde</th><th className="p-3 font-normal">Artikel</th><th className="p-3 font-normal">Land</th><th className="p-3 text-right font-normal">Summe</th><th className="p-3 font-normal">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-veil">
                <td className="p-3"><Link href={`/admin/bestellungen/${o.id}`} className="underline">{o.number}</Link></td>
                <td className="p-3 whitespace-nowrap">{dateFmt.format(o.createdAt)}</td>
                <td className="p-3">{o.customerName ?? "–"}<br /><span className="text-mist">{o.email}</span></td>
                <td className="p-3">{o.items.map((i) => `${i.quantity}× ${i.productName} ${i.sizeMl} ml`).join(", ")}</td>
                <td className="p-3">{o.country}</td>
                <td className="p-3 text-right">{euro(o.totalCents)}</td>
                <td className="p-3"><StatusBadge s={o.status} /></td>
              </tr>
            ))}
            {!orders.length && <tr><td colSpan={7} className="p-6 text-center text-mist">Keine Bestellungen mit diesem Status.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
