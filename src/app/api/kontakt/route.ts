import { NextResponse } from "next/server";
import { z } from "zod";
import { contactMail, sendMail } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/ratelimit";

const Body = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(200),
  message: z.string().trim().min(10).max(4000),
  website: z.string().optional(),
});

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req.headers)}`, 3, 10 * 60_000)) {
    return NextResponse.json({ error: "Zu viele Nachrichten. Bitte später erneut versuchen." }, { status: 429 });
  }
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Bitte alle Felder ausfüllen; die Nachricht braucht mindestens 10 Zeichen." }, { status: 400 });
  const { name, email, message, website } = parsed.data;
  if (website) return NextResponse.json({ ok: true }); // Bot: stillschweigend verwerfen
  const inbox = process.env.SHOP_INBOX;
  if (inbox) await sendMail({ to: inbox, subject: `Kontaktanfrage von ${name}`, html: contactMail(name, email, message), replyTo: email });
  else console.info("[kontakt]", name, email);
  return NextResponse.json({ ok: true });
}
