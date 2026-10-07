import { shop } from "./config";

const fmt = new Intl.NumberFormat(shop.locale, { style: "currency", currency: "EUR" });
export const euro = (cents: number) => fmt.format(cents / 100);

/** Pro-100-ml-Grundpreis (Preisauszeichnung) */
export const basePrice = (cents: number, ml: number) => `${euro(Math.round((cents / ml) * 100))} / 100 ml`;

/** Enthaltene USt aus einem Bruttobetrag */
export const includedVat = (grossCents: number) => Math.round(grossCents - grossCents / (1 + shop.vatRate));
