import type { MetadataRoute } from "next";
import { shop } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/warenkorb", "/kasse"] }],
    sitemap: `${shop.url}/sitemap.xml`,
    host: shop.url,
  };
}
