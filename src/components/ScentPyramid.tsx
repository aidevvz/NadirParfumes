/** Duftpyramide: drei Ebenen, von flüchtig (oben, schmal) bis haftend (unten, breit). */
export function ScentPyramid({ top, heart, base }: { top: string[]; heart: string[]; base: string[] }) {
  const rows = [
    { label: "Kopfnote", time: "erste 15 Minuten", notes: top, w: "w-[56%]" },
    { label: "Herznote", time: "bis etwa 3 Stunden", notes: heart, w: "w-[78%]" },
    { label: "Basisnote", time: "ab 3 Stunden", notes: base, w: "w-full" },
  ];
  return (
    <dl className="flex flex-col items-center gap-2">
      {rows.map((r) => (
        <div key={r.label} className={`${r.w} border-t border-gold bg-veil px-4 py-4 text-center`}>
          <dt className="text-sm text-gold-deep">
            {r.label} <span className="text-mist">({r.time})</span>
          </dt>
          <dd className="mt-1 font-display text-xl leading-snug">{r.notes.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
