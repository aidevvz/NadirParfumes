import { Resend } from "resend";
import { shop } from "./config";
import { euro } from "./money";

type Mail = { to: string; subject: string; html: string; replyTo?: string };

export async function sendMail({ to, subject, html, replyTo }: Mail) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? `${shop.name} <onboarding@resend.dev>`;
  if (!key) {
    console.info(`[mail:dev] an ${to} | ${subject}`);
    return;
  }
  const resend = new Resend(key);
  const { error } = await resend.emails.send({ from, to, subject, html, replyTo });
  if (error) console.error("[mail] Versand fehlgeschlagen", error);
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function layout(title: string, body: string) {
  return `<!doctype html><html lang="de"><body style="margin:0;background:#ffffff;font-family:Helvetica,Arial,sans-serif;color:#000">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <p style="font-family:Georgia,serif;font-size:22px;letter-spacing:.04em;margin:0 0 32px">${esc(shop.name)}</p>
    <div style="height:1px;background:#B08D57;margin-bottom:32px"></div>
    <h1 style="font-family:Georgia,serif;font-weight:400;font-size:26px;margin:0 0 16px">${esc(title)}</h1>
    ${body}
    <div style="height:1px;background:#e6e6e6;margin:40px 0 16px"></div>
    <p style="font-size:12px;color:#6b6b6b;line-height:1.6">${esc(shop.name)} · ${esc(shop.city)} · ${esc(shop.email)}<br/>
    Sie haben ein 14-tägiges Rücktrittsrecht. Details: <a style="color:#7A5C2E" href="${shop.url}/widerruf">${shop.url}/widerruf</a></p>
  </div></body></html>`;
}

type OrderForMail = {
  number: number;
  customerName: string | null;
  totalCents: number;
  shippingCents: number;
  discountCents: number;
  invoiceUrl: string | null;
  items: { productName: string; sizeMl: number; unitCents: number; quantity: number }[];
};

function itemsTable(o: OrderForMail) {
  const rows = o.items
    .map(
      (i) =>
        `<tr><td style="padding:8px 0">${i.quantity} × ${esc(i.productName)} ${i.sizeMl} ml</td><td style="padding:8px 0;text-align:right">${euro(i.unitCents * i.quantity)}</td></tr>`,
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows}
  <tr><td style="padding:8px 0;color:#6b6b6b">Versand</td><td style="text-align:right;color:#6b6b6b">${o.shippingCents ? euro(o.shippingCents) : "kostenlos"}</td></tr>
  ${o.discountCents ? `<tr><td style="padding:8px 0;color:#6b6b6b">Rabatt</td><td style="text-align:right;color:#6b6b6b">−${euro(o.discountCents)}</td></tr>` : ""}
  <tr><td style="padding:12px 0;border-top:1px solid #000"><strong>Gesamt inkl. USt</strong></td><td style="padding:12px 0;border-top:1px solid #000;text-align:right"><strong>${euro(o.totalCents)}</strong></td></tr></table>`;
}

export function orderConfirmationMail(o: OrderForMail) {
  const hello = o.customerName ? `Guten Tag ${esc(o.customerName)},` : "Guten Tag,";
  return layout(
    `Danke für Ihre Bestellung Nr. ${o.number}`,
    `<p style="line-height:1.7">${hello}<br/>wir haben Ihre Zahlung erhalten und bereiten den Versand vor. Sobald das Paket unterwegs ist, bekommen Sie eine weitere E-Mail mit der Sendungsnummer.</p>
    ${itemsTable(o)}
    ${o.invoiceUrl ? `<p style="margin-top:24px"><a style="color:#7A5C2E" href="${o.invoiceUrl}">Rechnung ansehen und herunterladen</a></p>` : ""}`,
  );
}

export function shippingMail(o: OrderForMail & { carrier: string | null; trackingNumber: string | null }) {
  return layout(
    `Ihre Bestellung Nr. ${o.number} ist unterwegs`,
    `<p style="line-height:1.7">Ihr Paket wurde heute übergeben${o.carrier ? ` an ${esc(o.carrier)}` : ""}.</p>
    ${o.trackingNumber ? `<p style="line-height:1.7">Sendungsnummer: <strong>${esc(o.trackingNumber)}</strong></p>` : ""}
    ${itemsTable(o)}`,
  );
}

export function cancellationMail(o: OrderForMail) {
  return layout(
    `Bestellung Nr. ${o.number} storniert`,
    `<p style="line-height:1.7">Ihre Bestellung wurde storniert. Der bezahlte Betrag von ${euro(o.totalCents)} wird auf die ursprüngliche Zahlungsart zurückerstattet. Je nach Anbieter dauert das einige Werktage.</p>`,
  );
}

export function contactMail(name: string, email: string, message: string) {
  return layout(
    "Neue Nachricht über das Kontaktformular",
    `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap;line-height:1.7">${esc(message)}</p>`,
  );
}
