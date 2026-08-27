import ImagePlaceholder from "@/components/ImagePlaceholder";
import StoreAvailabilityBadge from "@/components/StoreAvailabilityBadge";
import FavoriteButton from "@/components/FavoriteButton";
import { urlForImage } from "@/lib/sanity-image";
import Link from "next/link";
import type { Produto, StoreName } from "@/lib/sanity-client";

type ProductCardProps = { product: Produto; storePhones: Partial<Record<StoreName, string>> };

export default function ProductCard({ product, storePhones }: ProductCardProps) {
  const image = product.imagens?.[0]
    ? urlForImage(product.imagens[0]).url()
    : undefined;
  const stores = product.unidadesDisponiveis ?? [];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-dourado/30 transition-shadow duration-200 hover:shadow-lg">
      <div className="relative group-hover:[&_img]:scale-[1.03]"><ImagePlaceholder image={image} alt={product.nome} sizes="(max-width: 768px) 100vw, 33vw" className="rounded-none" /><div className="absolute right-3 top-3"><FavoriteButton product={product} compact /></div></div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-vermelho">{product.categoria?.nome ?? "Sem categoria"}</p>
        <h2 className="mt-2 font-titulo text-xl font-bold text-marrom-escuro">{product.nome}</h2>
        {product.sku && <p className="mt-1 text-xs font-medium text-marrom-escuro/55">Cód. {product.sku}</p>}
        {product.preco != null && <p className="mt-3 text-lg font-bold text-marrom-escuro">R$ {product.preco.toFixed(2).replace(".", ",")}</p>}
        <Link href={`/produto/${product.slug}`} className="mt-4 inline-flex w-fit items-center text-sm font-bold text-vermelho underline-offset-4 transition-colors hover:text-marrom-escuro hover:underline">Ver detalhes <span className="ml-1" aria-hidden="true">→</span></Link>
        <div className="mt-auto pt-4"><StoreAvailabilityBadge stores={stores} storePhones={storePhones} productName={product.nome} productSku={product.sku} /></div>
      </div>
    </article>
  );
}
