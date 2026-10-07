"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <div className="grid min-h-screen place-items-center px-5">
      <form action={action} className="w-full max-w-sm bg-paper p-10">
        <p className="font-display text-3xl tracking-[0.18em]">NADIR</p>
        <h1 className="mt-6 font-sans text-xl font-normal">Verwaltung</h1>
        <label className="mt-6 block">
          <span className="mb-1.5 block text-sm text-mist">Passwort</span>
          <input type="password" name="password" required autoComplete="current-password" className="field" autoFocus />
        </label>
        {state?.error && <p role="alert" className="mt-3 text-sm text-[#a12a2a]">{state.error}</p>}
        <button className="btn btn-solid mt-6 w-full" disabled={pending}>
          {pending ? "Anmelden …" : "Anmelden"}
        </button>
      </form>
    </div>
  );
}
