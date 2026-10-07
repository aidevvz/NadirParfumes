import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="font-display text-[8rem] leading-none text-gold">404</p>
        <h1 className="mt-4 text-4xl">Diese Seite gibt es nicht.</h1>
        <p className="mt-3 text-mist">Vielleicht wurde der Duft umbenannt oder aus dem Sortiment genommen.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/parfums" className="btn btn-solid">Alle Düfte</Link>
          <Link href="/" className="btn btn-ghost">Startseite</Link>
        </div>
      </div>
    </div>
  );
}
