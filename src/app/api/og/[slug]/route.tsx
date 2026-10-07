import { ImageResponse } from "next/og";
import { db } from "@/lib/db";
import { flakonSvg } from "@/lib/flakon-svg";
import { shop } from "@/lib/config";

/** 1200×1200-PNG für Produkte ohne Foto (Schema.org, Open Graph, Google Merchant). */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await db.product.findUnique({ where: { slug }, select: { name: true, accentColor: true } });
  if (!p) return new Response("Not found", { status: 404 });
  const svg = flakonSvg(p.accentColor, p.name.toUpperCase());
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f3", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={560} height={840} alt="" />
        <div style={{ position: "absolute", bottom: 48, fontSize: 28, letterSpacing: 6, color: "#7a5c2e" }}>{shop.name.toUpperCase()}</div>
      </div>
    ),
    { width: 1200, height: 1200, headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" } },
  );
}
