/** Flakon als SVG-String (für OG-Bilder und Schema-Bilder ohne Produktfoto). */
export function flakonSvg(color: string, label: string) {
  const safe = label.replace(/[<>&"]/g, "");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 360" width="480" height="720">
<defs><linearGradient id="c" x1="0" x2="1"><stop offset="0" stop-color="#8a6a36"/><stop offset=".45" stop-color="#d9bd84"/><stop offset="1" stop-color="#8a6a36"/></linearGradient></defs>
<rect x="86" y="20" width="68" height="70" rx="3" fill="url(#c)"/><rect x="98" y="90" width="44" height="28" fill="#c9a96e"/>
<rect x="40" y="118" width="160" height="222" rx="14" fill="#fbfaf8"/>
<path d="M40 150h160v176a14 14 0 0 1-14 14H54a14 14 0 0 1-14-14z" fill="${color}" fill-opacity=".75"/>
<rect x="40" y="118" width="160" height="222" rx="14" fill="none" stroke="#b08d57" stroke-width="1.5"/>
<rect x="70" y="210" width="100" height="58" fill="#fff" fill-opacity=".92"/><rect x="74" y="214" width="92" height="50" fill="none" stroke="#b08d57" stroke-width=".75"/>
<text x="120" y="236" text-anchor="middle" font-family="Georgia,serif" font-size="14" letter-spacing="2">NADIR</text>
<text x="120" y="254" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#7a5c2e" letter-spacing="1">${safe}</text></svg>`;
}
