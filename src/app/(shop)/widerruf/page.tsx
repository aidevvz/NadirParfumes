import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { shop } from "@/lib/config";

export const metadata: Metadata = { title: "Widerrufsbelehrung und Rücktrittsrecht", alternates: { canonical: "/widerruf" } };

export default function Widerruf() {
  return (
    <LegalPage title="Widerrufsbelehrung">
      <h2>Rücktrittsrecht</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen von diesem Vertrag zurückzutreten. Die
        Rücktrittsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der
        Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
      </p>
      <p>
        Um Ihr Rücktrittsrecht auszuüben, müssen Sie uns ([Firmenname], [Adresse], {shop.city}, E-Mail: {shop.email}) mittels
        einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, von diesem
        Vertrag zurückzutreten, informieren. Sie können dafür das unten stehende Muster-Widerrufsformular verwenden, das
        jedoch nicht vorgeschrieben ist. Zur Wahrung der Rücktrittsfrist reicht es aus, dass Sie die Mitteilung vor Ablauf
        der Frist absenden.
      </p>
      <h2>Folgen des Rücktritts</h2>
      <p>
        Wenn Sie von diesem Vertrag zurücktreten, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
        einschließlich der Lieferkosten (mit Ausnahme zusätzlicher Kosten, die sich daraus ergeben, dass Sie eine andere Art
        der Lieferung als die von uns angebotene günstigste Standardlieferung gewählt haben), unverzüglich und spätestens
        binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Rücktritt bei uns eingegangen ist.
        Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt
        haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart. Wir können die Rückzahlung verweigern, bis
        wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren
        zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.
      </p>
      <p>
        Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über
        den Rücktritt unterrichten, an uns zurückzusenden. Sie tragen die unmittelbaren Kosten der Rücksendung. Bitte beachten
        Sie: Parfum ist Gefahrgut; Rücksendungen nur auf dem Landweg und mit LQ-Kennzeichnung. Sie müssen für einen etwaigen
        Wertverlust nur aufkommen, wenn dieser auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise
        nicht notwendigen Umgang zurückzuführen ist.
      </p>
      <h2>Ausschluss des Rücktrittsrechts</h2>
      <p>
        [Rechtlich prüfen:] Das Rücktrittsrecht besteht nicht bei versiegelten Waren, die aus Gründen des Gesundheitsschutzes
        oder aus Hygienegründen nicht zur Rückgabe geeignet sind, sofern deren Versiegelung nach der Lieferung entfernt wurde
        (§ 18 Abs. 1 Z 5 FAGG). Ob und wann das für Parfum gilt, ist nicht eindeutig geklärt.
      </p>

      <h2>Muster-Widerrufsformular</h2>
      <p>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
      <div className="border border-line bg-veil p-6 text-[0.95rem]">
        <p>An [Firmenname], [Adresse], {shop.city}, E-Mail: {shop.email}</p>
        <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):</p>
        <p>Bestellt am (*) / erhalten am (*):</p>
        <p>Name des/der Verbraucher(s):</p>
        <p>Anschrift des/der Verbraucher(s):</p>
        <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):</p>
        <p>Datum:</p>
        <p className="text-sm text-mist">(*) Unzutreffendes streichen.</p>
      </div>
    </LegalPage>
  );
}
