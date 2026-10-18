import type { Metadata, Viewport } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/jost";
import "./globals.css";
import { shop } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(shop.url),
  title: { default: `${shop.name} | Extrait de Parfum aus Wien`, template: `%s | ${shop.name}` },
  description:
    "NADIR Extrait de Parfum: Aurelis, Essencia und Red Velvet. Drei Düfte, eine Signatur. Versand nach Österreich, Deutschland und in die Schweiz.",
  openGraph: { type: "website", locale: "de_AT", siteName: shop.name, images: [{ url: "/images/products/kollektion-trio.jpg", width: 1536, height: 1024 }] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#0a0a0a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-AT">
      <body className="antialiased">{children}</body>
    </html>
  );
}
