import { shop, concentrationLabel, categories } from "./config";
import { productPath, type ProductFull } from "./catalog";

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: shop.name,
  url: shop.url,
  logo: `${shop.url}/icon.svg`,
  email: shop.email,
  address: { "@type": "PostalAddress", addressLocality: shop.city, addressCountry: shop.country },
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: shop.name,
  url: shop.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${shop.url}/parfums?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbLd = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${shop.url}${path}`,
  })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

/**
 * Product + Offer je Größe. AggregateRating/Review erst ergänzen, wenn echte
 * Bewertungen vorliegen (Google straft erfundene Bewertungen ab).
 */
export function productLd(p: ProductFull) {
  const url = `${shop.url}${productPath(p)}`;
  const images = p.images.length ? p.images.map((i) => i.url) : [`${shop.url}/api/og/${p.slug}`];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.name} ${concentrationLabel[p.concentration]}`,
    description: p.description,
    image: images,
    sku: p.variants[0]?.sku,
    brand: { "@type": "Brand", name: p.brandName },
    category: `Parfum > ${categories[p.category].label}`,
    url,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Konzentration", value: concentrationLabel[p.concentration] },
      { "@type": "PropertyValue", name: "Duftfamilie", value: p.fragranceFamily },
      { "@type": "PropertyValue", name: "Kopfnote", value: p.topNotes.join(", ") },
      { "@type": "PropertyValue", name: "Herznote", value: p.heartNotes.join(", ") },
      { "@type": "PropertyValue", name: "Basisnote", value: p.baseNotes.join(", ") },
    ],
    offers: p.variants.map((v) => ({
      "@type": "Offer",
      sku: v.sku,
      name: `${p.name} ${v.sizeMl} ml`,
      price: (v.priceCents / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: v.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `${url}?groesse=${v.sizeMl}`,
      seller: { "@type": "Organization", name: shop.name },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "AT" },
        shippingRate: { "@type": "MonetaryAmount", value: "4.90", currency: "EUR" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 3, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: ["AT", "DE", "CH"],
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
      },
    })),
  };
}
