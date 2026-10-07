export function LegalPage({ title, children, updated = "Oktober 2026" }: { title: string; children: React.ReactNode; updated?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-14 md:pt-20">
      <h1 className="text-5xl md:text-6xl">{title}</h1>
      <p className="mt-4 text-sm text-mist">Stand: {updated}</p>
      <div role="note" className="mt-8 border-l-2 border-gold bg-veil px-5 py-4 text-sm">
        Entwurf mit Platzhaltern in [eckigen Klammern]. Vor dem Livegang von einer Rechtsanwältin oder einem Rechtsanwalt prüfen lassen.
      </div>
      <div className="prose-shop mt-10">{children}</div>
    </div>
  );
}
