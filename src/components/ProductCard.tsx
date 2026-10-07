import Image from "next/image";
import Link from "next/link";
import { Flakon } from "./Flakon";
import { concentrationLabel } from "@/lib/config";
import { fromPrice, inStock, productPath, type ProductFull } from "@/lib/catalog";
import { euro } from "@/lib/money";

export function ProductVisual({ p, priority = false, sizes }: { p: ProductFull; priority?: boolean; sizes?: string }) {
  const img = p.images[0];
  if (img)
    return (
      <Image
        src={img.url}
        alt={img.alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"}
        className="object-cover"
      />
    );
  return <Flakon color={p.accentColor} label={p.name.toUpperCase()} className="absolute inset-0 m-auto h-[78%] w-auto" />;
}

export function ProductCard({ p, priority = false }: { p: ProductFull; priority?: boolean }) {
  const available = inStock(p);
  return (
    <article className="group">
      <Link href={productPath(p)} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-veil">
          <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-silk)] group-hover:scale-[1.03]">
            <ProductVisual p={p} priority={priority} />
          </div>
          {!available && <span className="absolute left-3 top-3 bg-paper px-2.5 py-1 text-xs">Ausverkauft</span>}
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[1.35rem] leading-tight group-hover:text-gold-deep">{p.name}</h3>
          <p className="shrink-0 text-[0.95rem]">ab {euro(fromPrice(p))}</p>
        </div>
        <p className="mt-1 text-sm text-mist">
          {concentrationLabel[p.concentration]}, {p.fragranceFamily.toLowerCase()}
        </p>
      </Link>
    </article>
  );
}
