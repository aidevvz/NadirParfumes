/**
 * Gezeichneter Platzhalter-Flakon, solange ein Produkt keine Fotos hat.
 * Die Flüssigkeit nimmt die Akzentfarbe des Produkts an.
 */
type Props = {
  color: string;
  label?: string;
  className?: string;
  hero?: boolean;
  title?: string;
};

export function Flakon({ color, label, className, hero = false, title }: Props) {
  const id = `f${hashCode(color + (label ?? "") + (hero ? "h" : ""))}`;
  return (
    <svg
      viewBox="0 0 240 360"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <clipPath id={`${id}-body`}>
          <rect x="40" y="118" width="160" height="222" rx="14" />
        </clipPath>
        <linearGradient id={`${id}-glass`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.85" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`${id}-liq`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.55" />
          <stop offset="1" stopColor={color} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" x2="1">
          <stop offset="0" stopColor="#8a6a36" />
          <stop offset="0.45" stopColor="#d9bd84" />
          <stop offset="1" stopColor="#8a6a36" />
        </linearGradient>
      </defs>

      {/* Kappe */}
      <rect x="86" y="20" width="68" height="70" rx="3" fill={`url(#${id}-cap)`} />
      <rect x="98" y="90" width="44" height="28" fill="#c9a96e" />
      <rect x="98" y="90" width="44" height="4" fill="#000" opacity="0.15" />

      {/* Glaskörper mit Flüssigkeit */}
      <g clipPath={`url(#${id}-body)`}>
        <rect x="40" y="118" width="160" height="222" fill="#fbfaf8" />
        <g className={hero ? "hero-liquid" : undefined}>
          <rect x="40" y="150" width="160" height="190" fill={`url(#${id}-liq)`} />
          <rect x="40" y="150" width="160" height="2" fill="#fff" opacity="0.6" />
        </g>
        <rect x="40" y="118" width="160" height="222" fill={`url(#${id}-glass)`} />
      </g>
      <rect x="40" y="118" width="160" height="222" rx="14" fill="none" stroke="#b08d57" strokeWidth="1.5" />
      <rect x="52" y="130" width="136" height="198" rx="8" fill="none" stroke="#fff" strokeOpacity="0.5" />

      {/* Etikett */}
      <rect x="70" y="210" width="100" height="58" fill="#fff" fillOpacity="0.92" />
      <rect x="74" y="214" width="92" height="50" fill="none" stroke="#b08d57" strokeWidth="0.75" />
      <text x="120" y="236" textAnchor="middle" fontFamily="Bodoni Moda, Georgia, serif" fontSize="14" fill="#000" letterSpacing="2">
        NADIR
      </text>
      {label && (
        <text x="120" y="254" textAnchor="middle" fontFamily="Jost Variable, sans-serif" fontSize="8" fill="#7a5c2e" letterSpacing="1">
          {label}
        </text>
      )}
      {hero && <rect className="hero-glint" x="160" y="128" width="6" height="200" rx="3" fill="#fff" />}
    </svg>
  );
}

function hashCode(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}
