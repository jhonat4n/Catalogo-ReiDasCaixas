import ImagePlaceholder from "@/components/ImagePlaceholder";
import { urlForImage } from "@/lib/sanity-image";
import type { Produto } from "@/lib/sanity-client";

type ProductCardProps = { product: Produto };

export default function ProductCard({ product }: ProductCardProps) {
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
        <div className="mt-auto flex flex-wrap gap-2 pt-4" aria-label="Disponibilidade por loja">
          {stores.map((store) => <span key={store} className="rounded-full bg-creme px-3 py-1 text-xs font-semibold text-marrom-escuro">{store}</span>)}
        </div>
      </div>
    </article>
  );
}
