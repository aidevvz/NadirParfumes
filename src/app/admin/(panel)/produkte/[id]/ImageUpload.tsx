"use client";

import { useActionState } from "react";
import { uploadImage, type SaveState } from "../../../actions";

export function ImageUpload({ productId }: { productId: string }) {
  const [state, action, pending] = useActionState<SaveState, FormData>(uploadImage.bind(null, productId), undefined);
  return (
    <form action={action} className="mt-6 grid gap-3 border-t border-line pt-6 md:grid-cols-[1fr_1fr_auto] md:items-end">
      <label>
        <span className="mb-1.5 block text-sm text-mist">Bilddatei (JPG, PNG, WebP; max. 4 MB)</span>
        <input type="file" name="file" accept="image/jpeg,image/png,image/webp,image/avif" required className="block w-full text-sm" />
      </label>
      <label>
        <span className="mb-1.5 block text-sm text-mist">Bildbeschreibung für Blinde und Google</span>
        <input name="alt" placeholder="z. B. Flakon Ambre de Nuit 50 ml von vorne" className="field" />
      </label>
      <button className="btn btn-solid" disabled={pending}>{pending ? "Lädt hoch …" : "Hochladen"}</button>
      {state?.error && <p role="alert" className="text-sm text-[#a12a2a] md:col-span-3">{state.error}</p>}
    </form>
  );
}
