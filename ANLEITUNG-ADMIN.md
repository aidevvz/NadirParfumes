# Shop-Verwaltung: Kurzanleitung

Adresse: `https://<deine-domain>/admin`. Das Passwort bekommst du separat.

## Täglich: Bestellungen versenden

1. **Übersicht** zeigt oben, wie viele Bestellungen auf den Versand warten.
2. Auf **Bestellungen öffnen** klicken. Die Liste zeigt alle bezahlten, noch nicht versendeten Bestellungen.
3. Bestellung anklicken. Dort stehen Lieferadresse, Artikel und der Link zur Rechnung.
4. Paket packen und die **LQ-Raute** (Gefahrgut in begrenzter Menge) aufkleben. Parfum nur auf dem Landweg verschicken.
5. Sendungsnummer eintragen, auf **Versendet** klicken. Der Kunde bekommt automatisch eine E-Mail.

## Bestand ändern

**Produkte** öffnen. Neben jeder Größe steht ein Zahlenfeld. Neue Stückzahl eintragen und **Speichern** drücken. Bei 0 zeigt der Shop „ausverkauft“, die Größe kann nicht mehr gekauft werden.

Nach jedem bezahlten Kauf wird der Bestand automatisch reduziert.

## Neues Produkt anlegen

1. **Produkte** → **Neues Produkt**.
2. Name, Kategorie, Konzentration und Duftfamilie wählen.
3. **Kurzbeschreibung**: ein Satz.
4. **Beschreibung**: 3–6 eigene Sätze. Wie riecht der Duft, wann trägt man ihn, wie lange hält er? Nie Texte von anderen Seiten kopieren, das schadet bei Google.
5. Duftnoten mit Komma trennen, z. B. `Bergamotte, Rosa Pfeffer`.
6. Größen: Preis in Euro inkl. USt (z. B. `89` oder `89,90`), Bestand und eine eindeutige Artikelnummer.
7. **Speichern**. Danach öffnet sich die Seite für die Fotos.

## Fotos hochladen

- Hochformat (4:5), mindestens 1200 px breit, heller Hintergrund
- JPG, PNG oder WebP, höchstens 4 MB
- Bei **Bildbeschreibung** kurz beschreiben, was zu sehen ist, z. B. „Flakon Ambre de Nuit 50 ml von vorne“. Das hilft Google und blinden Menschen.
- Das erste Foto ist das Hauptbild.

Solange es kein Foto gibt, zeigt der Shop einen gezeichneten Flakon in der eingestellten Flakon-Farbe.

## Produkt ausblenden

Im Produkt das Häkchen bei **Im Shop sichtbar** entfernen und speichern. Besser als Löschen, weil die Seite später wieder aktiviert werden kann.

**Auf der Startseite zeigen**: Die ersten vier markierten Produkte erscheinen auf der Startseite unter „Ausgewählte Düfte“.

## Storno und Rücksendung

- **Vor dem Versand** (Kunde storniert): Bestellung öffnen → **Erstatten**. Der Betrag geht zurück, die Ware wird wieder in den Bestand gebucht, der Kunde bekommt eine E-Mail.
- **Nach Rücksendung**: erst prüfen, ob die Ware angekommen ist. Dann **Erstatten**. Das Häkchen „Ware zurück in den Bestand buchen“ nur setzen, wenn der Flakon ungeöffnet und wieder verkaufbar ist.
- **Teilerstattung** (nur ein Artikel von mehreren): direkt im Stripe-Dashboard unter Zahlungen.

## Gutscheincodes

Im **Stripe-Dashboard** → Produktkatalog → Gutscheine. Gutschein anlegen (z. B. 10 %), dann einen Promotion-Code dazu (z. B. `WILLKOMMEN10`). Kunden geben den Code auf der Zahlungsseite ein.

## Wenn etwas nicht stimmt

- Eine Bestellung hat den Hinweis „Bestand war beim Bezahlen nicht mehr ausreichend“: Zwei Kunden haben gleichzeitig das letzte Stück gekauft. Den betroffenen Kunden anschreiben und Lieferzeit oder Storno anbieten.
- „Kasse verlassen ohne Kauf“ in der Übersicht zählt Kunden, die bis zur Zahlungsseite gekommen sind, aber nicht bezahlt haben.
