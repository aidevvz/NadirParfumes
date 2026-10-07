import type { Metadata, Viewport } from "next";
import "@fontsource/bodoni-moda/400.css";
import "@fontsource/bodoni-moda/400-italic.css";
import "@fontsource-variable/jost";
import "./globals.css";
import { shop } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(shop.url),
  title: { default: `${shop.name} | Eau de Parfum online kaufen`, template: `%s | ${shop.name}` },
  description:
    "Eau de Parfum und Extrait von Nadir: Damen-, Herren-, Unisex- und Nischendüfte mit klaren Duftnoten. Versand nach Österreich, Deutschland und in die Schweiz.",
  openGraph: { type: "website", locale: "de_AT", siteName: shop.name },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-AT">
      <body className="antialiased">{children}</body>
    </html>
  );
}
