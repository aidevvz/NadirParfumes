/** Redaktionelle Inhalte: FAQ und Ratgeber. Texte vor Livegang prüfen. */

export const faqs = [
  {
    q: "Wie lange hält ein Eau de Parfum auf der Haut?",
    a: "Ein Eau de Parfum hat meist 15 bis 20 Prozent Duftöl und hält auf der Haut etwa sechs bis acht Stunden, auf Kleidung deutlich länger. Ein Extrait de Parfum mit über 20 Prozent hält noch länger, ein Eau de Toilette kürzer. Trockene Haut hält Duft schlechter; eine unparfümierte Creme vorab hilft.",
  },
  {
    q: "Wie lange ist ein Parfum nach dem Öffnen haltbar?",
    a: "Richtig gelagert hält ein Parfum nach dem Öffnen in der Regel drei bis fünf Jahre. Wichtig sind ein kühler, dunkler Ort und ein geschlossener Flakon. Badezimmer mit wechselnder Wärme und Luftfeuchtigkeit sowie direkte Sonne verkürzen die Haltbarkeit.",
  },
  {
    q: "Sind die Düfte original und versiegelt?",
    a: "Ja. Wir verkaufen ausschließlich Düfte unserer eigenen Marke Nadir direkt an Sie, ohne Zwischenhändler. Jeder Flakon wird originalverpackt und in Folie versiegelt versendet.",
  },
  {
    q: "Wohin liefern Sie und wie lange dauert der Versand?",
    a: "Wir liefern nach Österreich (2–3 Werktage), Deutschland (3–5 Werktage) und in die Schweiz (5–8 Werktage). Weil Parfum Alkohol enthält, gilt es im Versand als Gefahrgut in begrenzter Menge und wird ausschließlich auf dem Landweg transportiert. Expressversand per Luftfracht ist deshalb nicht möglich.",
  },
  {
    q: "Kann ich ein Parfum zurückgeben?",
    a: "Als Verbraucher haben Sie ein 14-tägiges Rücktrittsrecht ab Erhalt der Ware. Bitte beachten Sie, dass versiegelte Hygieneartikel nach dem Öffnen der Versiegelung vom Rücktritt ausgeschlossen sein können. Alle Details finden Sie in der Widerrufsbelehrung.",
  },
  {
    q: "Welche Zahlungsarten gibt es?",
    a: "Sie zahlen sicher über Stripe mit Kreditkarte, EPS-Überweisung, PayPal, Klarna (Rechnung oder Ratenkauf), Apple Pay oder Google Pay. Ihre Zahlungsdaten werden nie auf unseren Servern gespeichert.",
  },
  {
    q: "Was bedeuten Kopf-, Herz- und Basisnote?",
    a: "Ein Parfum entfaltet sich in drei Phasen. Die Kopfnote riecht man in den ersten 15 Minuten, meist leichte Zitrus- oder Gewürznoten. Die Herznote prägt die nächsten Stunden. Die Basisnote aus Hölzern, Harzen und Moschus bleibt am längsten auf der Haut.",
  },
];

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  body: { h?: string; p: string }[];
};

export const articles: Article[] = [
  {
    slug: "eau-de-parfum-oder-eau-de-toilette",
    title: "Eau de Parfum oder Eau de Toilette: Was ist der Unterschied?",
    description: "Konzentration, Haltbarkeit und Anwendung erklärt: Extrait, Eau de Parfum, Eau de Toilette und Eau de Cologne im Vergleich.",
    date: "2026-10-01",
    body: [
      { p: "Die Bezeichnung auf dem Flakon sagt vor allem eines: wie viel Duftöl im Alkohol gelöst ist. Je höher der Anteil, desto intensiver und länger riecht der Duft. Die Grenzen sind nicht gesetzlich festgelegt, folgen aber einer gängigen Praxis." },
      { h: "Die vier Konzentrationen", p: "Extrait de Parfum enthält meist 20 bis 30 Prozent Duftöl, Eau de Parfum 15 bis 20 Prozent, Eau de Toilette 5 bis 15 Prozent und Eau de Cologne 2 bis 5 Prozent. Ein Extrait hält entsprechend oft länger als acht Stunden, ein Eau de Cologne selten länger als zwei." },
      { h: "Welche Konzentration passt zu wem?", p: "Für den Alltag im Büro reicht häufig ein Eau de Toilette oder ein leichtes Eau de Parfum. Wer einen Duft für den ganzen Tag ohne Nachsprühen sucht, greift zum Eau de Parfum. Ein Extrait eignet sich für Abende und für Menschen, die mit wenigen Sprühstößen auskommen möchten." },
      { h: "Gleicher Name, anderer Duft", p: "Gibt es einen Duft in mehreren Konzentrationen, riecht er nicht einfach stärker oder schwächer. Parfümeure passen die Formel an, sodass ein Eau de Toilette oft frischer und ein Extrait wärmer wirkt." },
    ],
  },
  {
    slug: "parfum-richtig-auftragen",
    title: "Parfum richtig auftragen: Wo, wie viel und warum nicht verreiben",
    description: "Pulspunkte, Abstand, Dosierung: So hält Ihr Parfum länger und entfaltet alle Duftnoten.",
    date: "2026-09-20",
    body: [
      { p: "Ein guter Duft kann schnell verfliegen, wenn er falsch aufgetragen wird. Mit ein paar Handgriffen hält er deutlich länger." },
      { h: "Auf warme Hautstellen", p: "Handgelenke, Halsansatz, hinter den Ohren und die Armbeugen sind warm und gut durchblutet. Dort verdunstet der Duft gleichmäßig. Sprühen Sie aus etwa 15 Zentimetern Abstand." },
      { h: "Nicht verreiben", p: "Wer die Handgelenke aneinander reibt, erwärmt den Duft zu schnell. Die leichten Kopfnoten verfliegen dann früher, und der Duft wirkt flacher. Einfach antrocknen lassen." },
      { h: "Weniger ist mehr", p: "Bei einem Eau de Parfum reichen zwei bis drei Sprühstöße, bei einem Extrait oft einer. Wer den eigenen Duft nach einer Stunde nicht mehr riecht, hat sich meist daran gewöhnt. Andere riechen ihn trotzdem." },
      { h: "Auf feuchte Haut", p: "Direkt nach dem Duschen nimmt die Haut Duft besonders gut auf. Eine unparfümierte Bodylotion vorab verlängert die Haltbarkeit zusätzlich." },
    ],
  },
  {
    slug: "duftfamilien-erklaert",
    title: "Duftfamilien erklärt: Von blumig bis holzig",
    description: "Blumig, holzig, Ambra, frisch, Gourmand und Chypre: Was die Duftfamilien bedeuten und wie Sie Ihre finden.",
    date: "2026-09-05",
    body: [
      { p: "Duftfamilien helfen, Parfums grob einzuordnen. Wer weiß, welche Familie ihm gefällt, findet schneller neue Düfte, die passen." },
      { h: "Blumig", p: "Rose, Iris, Jasmin, Veilchen. Die größte Familie, von pudrig-zart bis üppig. Blumig heißt nicht automatisch feminin." },
      { h: "Holzig", p: "Zeder, Vetiver, Sandelholz, Guajak. Trocken, warm und meist sehr haltbar." },
      { h: "Ambra", p: "Früher orientalisch genannt: Harze, Vanille, Gewürze und Labdanum. Warm, dicht und gut für den Abend." },
      { h: "Frisch", p: "Zitrusfrüchte, grüne Noten, Meeresakkorde. Leicht und hell, ideal für Sommer und Alltag, aber oft weniger lang haltend." },
      { h: "Gourmand", p: "Vanille, Kakao, Karamell, Tonka. Essbar wirkende Noten, von süß bis rauchig." },
      { h: "Chypre", p: "Ein klassischer Aufbau aus Bergamotte, Rose oder Jasmin und Eichenmoos mit Patschuli. Elegant, erdig, mit Struktur." },
    ],
  },
];
