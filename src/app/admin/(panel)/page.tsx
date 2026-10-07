import Link from "next/link";
import { db } from "@/lib/db";
import { euro } from "@/lib/money";
import { Card, StatusBadge, dateFmt } from "./ui";

export default async function Dashboard() {
  const since30 = new Date(Date.now() - 30 * 864e5);
  const [toShip, revenue, abandoned, lowStock, recent] = await Promise.all([
    db.order.count({ where: { status: "PAID" } }),
    db.order.aggregate({ _sum: { totalCents: true }, _count: true, where: { status: { in: ["PAID", "SHIPPED"] }, paidAt: { gte: since30 } } }),
    db.order.count({ where: { status: "CANCELLED", note: { contains: "Warenkorbabbruch" }, createdAt: { gte: since30 } } }),
    db.variant.findMany({ where: { stock: { lte: 3 } }, include: { product: true }, orderBy: { stock: "asc" }, take: 10 }),
    db.order.findMany({ where: { status: { not: "PENDING" } }, orderBy: { createdAt: "desc" }, take: 8 }),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl">Übersicht</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-mist">Zu versenden</p>
          <p className="mt-2 font-display text-5xl">{toShip}</p>
          <Link href="/admin/bestellungen?status=PAID" className="mt-3 inline-block text-sm underline">Bestellungen öffnen</Link>
        </Card>
        <Card>
          <p className="text-sm text-mist">Umsatz der letzten 30 Tage</p>
          <p className="mt-2 font-display text-5xl">{euro(revenue._sum.totalCents ?? 0)}</p>
          <p className="mt-3 text-sm text-mist">{revenue._count} bezahlte Bestellungen</p>
        </Card>
        <Card>
          <p className="text-sm text-mist">Kasse verlassen ohne Kauf (30 Tage)</p>
          <p className="mt-2 font-display text-5xl">{abandoned}</p>
          <p className="mt-3 text-sm text-mist">Warenkorbabbrüche im Stripe-Checkout</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-sans text-lg">Niedriger Bestand</h2>
          {lowStock.length ? (
            <ul className="mt-4 divide-y divide-line">
              {lowStock.map((v) => (
                <li key={v.id} className="flex justify-between py-2">
                  <Link href={`/admin/produkte/${v.productId}`} className="hover:underline">{v.product.name} {v.sizeMl} ml</Link>
                  <span className={v.stock === 0 ? "text-[#a12a2a]" : "text-gold-deep"}>{v.stock === 0 ? "ausverkauft" : `${v.stock} Stück`}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-mist">Alle Größen haben mehr als 3 Stück auf Lager.</p>
          )}
        </Card>
        <Card>
          <h2 className="font-sans text-lg">Letzte Bestellungen</h2>
          <ul className="mt-4 divide-y divide-line">
            {recent.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 py-2">
                <Link href={`/admin/bestellungen/${o.id}`} className="hover:underline">Nr. {o.number}</Link>
                <span className="text-mist">{dateFmt.format(o.createdAt)}</span>
                <StatusBadge s={o.status} />
              </li>
            ))}
            {!recent.length && <li className="py-2 text-mist">Noch keine Bestellungen.</li>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
