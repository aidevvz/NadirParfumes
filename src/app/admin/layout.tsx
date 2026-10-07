import type { Metadata } from "next";

export const metadata: Metadata = { title: "Verwaltung", robots: { index: false, follow: false } };

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-veil text-[0.95rem]">{children}</div>;
}
