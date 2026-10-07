"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@/components/analytics";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/kontakt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const body = await res.json().catch(() => ({}));
    if (res.ok) {
      setState("sent");
      track("generate_lead", { method: "kontaktformular" });
    } else {
      setState("error");
      setMsg(body.error ?? "Senden fehlgeschlagen. Bitte schreiben Sie uns direkt per E-Mail.");
    }
  }

  if (state === "sent")
    return (
      <div className="self-start bg-veil p-8">
        <p className="font-display text-3xl">Nachricht gesendet.</p>
        <p className="mt-3 text-mist">Wir melden uns werktags innerhalb von 24 Stunden.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block"><span className="mb-1.5 block text-sm text-mist">Name</span><input name="name" required maxLength={100} autoComplete="name" className="field" /></label>
      <label className="block"><span className="mb-1.5 block text-sm text-mist">E-Mail</span><input name="email" type="email" required maxLength={200} autoComplete="email" className="field" /></label>
      <label className="block"><span className="mb-1.5 block text-sm text-mist">Nachricht</span><textarea name="message" required minLength={10} maxLength={4000} rows={6} className="field" /></label>
      {/* Honeypot gegen Spam-Bots, für Menschen unsichtbar */}
      <div aria-hidden className="absolute -left-[9999px]"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="text-sm text-mist">Wir verwenden Ihre Angaben nur zur Beantwortung. Mehr in der <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link>.</p>
      <button className="btn btn-solid" disabled={state === "sending"}>{state === "sending" ? "Wird gesendet …" : "Nachricht senden"}</button>
      {state === "error" && <p role="alert" className="text-sm text-[#a12a2a]">{msg}</p>}
    </form>
  );
}
