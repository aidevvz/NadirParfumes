/**
 * Stimmungsbilder (keine Produktfotos). Quelle: Unsplash, Unsplash-Lizenz
 * (kommerzielle Nutzung erlaubt, Namensnennung nicht erforderlich).
 * Alle Motive ohne Markenlogos ausgewählt. Nachweise: BILDNACHWEIS.md
 */
export const images = {
  hero: { src: "/images/hero-flakon-satin.jpg", alt: "Goldener Parfumflakon auf cremefarbenem Satin im warmen Licht", w: 1440, h: 1800 },
  amber: { src: "/images/flakon-bernstein.jpg", alt: "Bernsteinfarbener Flakon mit Wassertropfen auf hellem Grund", w: 1440, h: 1800 },
  shadow: { src: "/images/schatten-travertin.jpg", alt: "Schatten eines Flakons auf Travertin-Stein", w: 1440, h: 1800 },
  damen: { src: "/images/kategorie-damen.jpg", alt: "Rote Rosenblätter auf weißem Grund", w: 1800, h: 1200 },
  herren: { src: "/images/kategorie-herren.jpg", alt: "Klarer Glasflakon mit schwarzer Kappe auf Marmor", w: 1440, h: 1800 },
  unisex: { src: "/images/kategorie-unisex.jpg", alt: "Mattierter Flakon im Gegenlicht", w: 1800, h: 1200 },
  nische: { src: "/images/kategorie-nische.jpg", alt: "Rauch eines Räucherstäbchens vor schwarzem Hintergrund", w: 1440, h: 1800 },
  apply: { src: "/images/ratgeber-auftragen.jpg", alt: "Hände tragen einen Tropfen Duftöl auf das Handgelenk auf", w: 1800, h: 1200 },
  vanilla: { src: "/images/ratgeber-vanille.jpg", alt: "Zwei Vanilleschoten auf hellem Grund", w: 1440, h: 1800 },
  roses: { src: "/images/rosen-weiss.jpg", alt: "Helle Rosen in Nahaufnahme", w: 1800, h: 1200 },
} as const;

export type ImageKey = keyof typeof images;

export const categoryImage = {
  DAMEN: images.damen,
  HERREN: images.herren,
  UNISEX: images.unisex,
  NISCHE: images.nische,
} as const;
