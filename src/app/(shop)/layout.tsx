import { CartProvider } from "@/components/Cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/seo";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <CookieConsent />
      <JsonLd data={organizationLd()} />
      <JsonLd data={websiteLd()} />
    </CartProvider>
  );
}
