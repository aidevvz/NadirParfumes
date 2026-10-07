"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { put, del } from "@vercel/blob";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, createSession, requireAdmin, safeEqual } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/ratelimit";
import { slugify } from "@/lib/slug";
import { stripe } from "@/lib/stripe";
import { sendMail, shippingMail, cancellationMail } from "@/lib/email";

/* ---------- Login ---------- */

export async function login(_: unknown, form: FormData) {
  const ip = clientIp(await headers());
  if (!rateLimit(`login:${ip}`, 5, 15 * 60_000)) return { error: "Zu viele Versuche. Bitte 15 Minuten warten." };
  const pw = String(form.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.length < 10) return { error: "ADMIN_PASSWORD ist nicht gesetzt (mind. 10 Zeichen)." };
  if (!safeEqual(pw, expected)) return { error: "Das Passwort ist falsch." };
  (await cookies()).set(ADMIN_COOKIE, await createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

/* ---------- Produkte ---------- */

const VariantIn = z.object({
  id: z.string().optional(),
  sizeMl: z.coerce.number().int().min(1).max(1000),
  price: z.coerce.number().min(0.5),
  compareAt: z.union([z.coerce.number().min(0), z.literal("")]).optional(),
  stock: z.coerce.number().int().min(0),
  sku: z.string().trim().min(1).max(60),
});

const ProductIn = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().trim().max(80).optional(),
  brandName: z.string().trim().min(1).max(60),
  category: z.enum(["DAMEN", "HERREN", "UNISEX", "NISCHE"]),
  concentration: z.enum(["EXTRAIT", "EDP", "EDT", "EDC"]),
  fragranceFamily: z.string().trim().min(2).max(40),
  shortDescription: z.string().trim().min(10).max(200),
  description: z.string().trim().min(40).max(4000),
  topNotes: z.string(),
  heartNotes: z.string(),
  baseNotes: z.string(),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  active: z.boolean(),
  featured: z.boolean(),
});

const notes = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean).slice(0, 12);

export type SaveState = { error?: string; ok?: boolean } | undefined;

export async function saveProduct(id: string | null, _: SaveState, form: FormData): Promise<SaveState> {
  await requireAdmin();
  const parsed = ProductIn.safeParse({
    ...Object.fromEntries(form),
    active: form.get("active") === "on",
    featured: form.get("featured") === "on",
  });
  if (!parsed.success) {
    const f = parsed.error.issues[0];
    return { error: `Bitte prüfen: ${fieldLabel(String(f.path[0]))}. ${f.message}` };
  }
  let variants: z.infer<typeof VariantIn>[];
  try {
    variants = z.array(VariantIn).min(1).parse(JSON.parse(String(form.get("variants") ?? "[]")));
  } catch {
    return { error: "Bitte mindestens eine Größe mit Preis, Bestand und Artikelnummer angeben." };
  }
  if (new Set(variants.map((v) => v.sizeMl)).size !== variants.length) return { error: "Jede Größe darf nur einmal vorkommen." };

  const d = parsed.data;
  const slug = slugify(d.slug || d.name);
  const data = {
    name: d.name,
    slug,
    brandName: d.brandName,
    brandSlug: slugify(d.brandName),
    category: d.category,
    concentration: d.concentration,
    fragranceFamily: d.fragranceFamily,
    shortDescription: d.shortDescription,
    description: d.description,
    topNotes: notes(d.topNotes),
    heartNotes: notes(d.heartNotes),
    baseNotes: notes(d.baseNotes),
    accentColor: d.accentColor,
    active: d.active,
    featured: d.featured,
  };

  try {
    const productId = await db.$transaction(async (tx) => {
      const p = id ? await tx.product.update({ where: { id }, data }) : await tx.product.create({ data });
      const keep = variants.filter((v) => v.id).map((v) => v.id!);
      await tx.variant.deleteMany({ where: { productId: p.id, id: { notIn: keep } } });
      for (const v of variants) {
        const vd = {
          sizeMl: v.sizeMl,
          priceCents: Math.round(v.price * 100),
          compareAtCents: v.compareAt === "" || v.compareAt === undefined ? null : Math.round(Number(v.compareAt) * 100),
          stock: v.stock,
          sku: v.sku,
        };
        if (v.id) await tx.variant.update({ where: { id: v.id }, data: vd });
        else await tx.variant.create({ data: { ...vd, productId: p.id } });
      }
      return p.id;
    });
    revalidateShop();
    if (!id) redirect(`/admin/produkte/${productId}?neu=1`);
    return { ok: true };
  } catch (e) {
    if (isRedirect(e)) throw e;
    const msg = String(e);
    if (msg.includes("Unique constraint")) return { error: "Name/URL oder eine Artikelnummer ist bereits vergeben." };
    console.error(e);
    return { error: "Speichern fehlgeschlagen." };
  }
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const imgs = await db.productImage.findMany({ where: { productId: id } });
  await db.product.delete({ where: { id } });
  for (const i of imgs) await safeDeleteBlob(i.url);
  revalidateShop();
  redirect("/admin/produkte");
}

export async function uploadImage(productId: string, _: SaveState, form: FormData): Promise<SaveState> {
  await requireAdmin();
  const file = form.get("file");
  const alt = String(form.get("alt") ?? "").trim();
  if (!(file instanceof File) || file.size === 0) return { error: "Bitte eine Bilddatei auswählen." };
  if (!/^image\/(jpeg|png|webp|avif)$/.test(file.type)) return { error: "Erlaubt sind JPG, PNG, WebP oder AVIF." };
  if (file.size > 4 * 1024 * 1024) return { error: "Das Bild ist größer als 4 MB. Bitte vorher verkleinern." };
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { error: "Bild-Speicher ist nicht eingerichtet (BLOB_READ_WRITE_TOKEN fehlt)." };
  const p = await db.product.findUniqueOrThrow({ where: { id: productId }, include: { images: true } });
  const blob = await put(`produkte/${p.slug}-${Date.now()}.${file.type.split("/")[1]}`, file, { access: "public" });
  await db.productImage.create({
    data: { productId, url: blob.url, alt: alt || `${p.name} Flakon`, position: p.images.length },
  });
  revalidateShop();
  return { ok: true };
}

export async function deleteImage(imageId: string) {
  await requireAdmin();
  const img = await db.productImage.delete({ where: { id: imageId } });
  await safeDeleteBlob(img.url);
  revalidateShop();
}

export async function updateStock(variantId: string, form: FormData) {
  await requireAdmin();
  const stock = Math.max(0, Math.floor(Number(form.get("stock"))));
  if (Number.isFinite(stock)) await db.variant.update({ where: { id: variantId }, data: { stock } });
  revalidateShop();
  revalidatePath("/admin/produkte");
}

/* ---------- Bestellungen ---------- */

export async function markShipped(orderId: string, form: FormData) {
  await requireAdmin();
  const carrier = String(form.get("carrier") ?? "").trim().slice(0, 60) || null;
  const trackingNumber = String(form.get("trackingNumber") ?? "").trim().slice(0, 80) || null;
  const res = await db.order.updateMany({
    where: { id: orderId, status: "PAID" },
    data: { status: "SHIPPED", shippedAt: new Date(), carrier, trackingNumber },
  });
  if (res.count) {
    const o = await db.order.findUniqueOrThrow({ where: { id: orderId }, include: { items: true } });
    if (o.email) await sendMail({ to: o.email, subject: `Ihre Bestellung Nr. ${o.number} ist unterwegs`, html: shippingMail(o) });
  }
  revalidatePath(`/admin/bestellungen/${orderId}`);
  revalidatePath("/admin/bestellungen");
}

/** Storno vor Versand bzw. Erstattung nach Rücksendung: Stripe-Refund + Bestand zurückbuchen. */
export async function cancelAndRefund(orderId: string, form: FormData) {
  await requireAdmin();
  const restock = form.get("restock") === "on";
  const o = await db.order.findUniqueOrThrow({ where: { id: orderId }, include: { items: true } });
  if (o.status !== "PAID" && o.status !== "SHIPPED") return;
  if (o.stripePaymentIntentId) {
    await stripe().refunds.create({ payment_intent: o.stripePaymentIntentId });
  }
  await db.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: orderId },
      data: { status: o.status === "PAID" ? "CANCELLED" : "REFUNDED", note: o.status === "PAID" ? "Storniert und erstattet" : "Erstattet" },
    });
    if (restock) {
      for (const i of o.items) {
        if (i.variantId) await tx.variant.update({ where: { id: i.variantId }, data: { stock: { increment: i.quantity } } });
      }
    }
  });
  if (o.email) await sendMail({ to: o.email, subject: `Bestellung Nr. ${o.number} storniert`, html: cancellationMail(o) });
  revalidateShop();
  revalidatePath(`/admin/bestellungen/${orderId}`);
}

export async function saveNote(orderId: string, form: FormData) {
  await requireAdmin();
  await db.order.update({ where: { id: orderId }, data: { note: String(form.get("note") ?? "").slice(0, 2000) || null } });
  revalidatePath(`/admin/bestellungen/${orderId}`);
}

/* ---------- Hilfen ---------- */

function revalidateShop() {
  revalidatePath("/", "layout");
}

async function safeDeleteBlob(url: string) {
  if (!process.env.BLOB_READ_WRITE_TOKEN || !url.includes("blob.vercel-storage.com")) return;
  try {
    await del(url);
  } catch {}
}

function isRedirect(e: unknown) {
  return typeof e === "object" && e !== null && "digest" in e && String((e as { digest: unknown }).digest).startsWith("NEXT_REDIRECT");
}

function fieldLabel(k: string) {
  return (
    {
      name: "Name",
      brandName: "Marke",
      fragranceFamily: "Duftfamilie",
      shortDescription: "Kurzbeschreibung (10–200 Zeichen)",
      description: "Beschreibung (mind. 40 Zeichen)",
      accentColor: "Flakon-Farbe",
    } as Record<string, string>
  )[k] ?? k;
}
