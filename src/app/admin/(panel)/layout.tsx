import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

export default async function Panel({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div>
      <header className="border-b border-line bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-display text-xl tracking-[0.18em]">NADIR</Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/admin" className="hover:text-gold">Übersicht</Link>
              <Link href="/admin/bestellungen" className="hover:text-gold">Bestellungen</Link>
              <Link href="/admin/produkte" className="hover:text-gold">Produkte</Link>
            </nav>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/" target="_blank" className="hover:text-gold">Shop ansehen</Link>
            <form action={logout}><button className="hover:text-gold">Abmelden</button></form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10">{children}</div>
    </div>
  );
}
