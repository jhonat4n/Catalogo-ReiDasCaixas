import ImagePlaceholder from "@/components/ImagePlaceholder";
import StoreAvailabilityBadge from "@/components/StoreAvailabilityBadge";
import { urlForImage } from "@/lib/sanity-image";
import type { Produto, StoreName } from "@/lib/sanity-client";

type ProductCardProps = { product: Produto; storePhones: Partial<Record<StoreName, string>> };

export default function ProductCard({ product, storePhones }: ProductCardProps) {
  const image = product.imagens?.[0]
    ? urlForImage(product.imagens[0]).url()
    : undefined;
  const stores = product.unidadesDisponiveis ?? [];

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-dourado/30">
      <ImagePlaceholder image={image} alt={product.nome} sizes="(max-width: 768px) 100vw, 33vw" className="rounded-none" />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-vermelho">{product.categoria?.nome ?? "Sem categoria"}</p>
        <h2 className="mt-2 font-titulo text-xl font-bold text-marrom-escuro">{product.nome}</h2>
        {product.preco != null && <p className="mt-3 text-lg font-bold text-marrom-escuro">R$ {product.preco.toFixed(2).replace(".", ",")}</p>}
        <div className="mt-auto pt-4"><StoreAvailabilityBadge stores={stores} storePhones={storePhones} productName={product.nome} /></div>
      </div>
    </article>
  );
}
