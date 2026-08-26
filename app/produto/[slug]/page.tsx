import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import ProductGallery from "@/components/ProductGallery";
import ShareButton from "@/components/ShareButton";
import StoreAvailabilityBadge from "@/components/StoreAvailabilityBadge";
import { getLojas, getProdutoBySlug } from "@/lib/sanity-client";
import { urlForImage } from "@/lib/sanity-image";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProdutoBySlug(params.slug);
  if (!product) return { title: "Produto não encontrado" };
  const description = product.descricao || `Conheça ${product.nome} no catálogo da Rei das Caixas Artesanato.`;
  return { title: product.nome, description, openGraph: { type: "website", title: product.nome, description, images: ["/images/Logo.png"] }, other: { "instagram:site": "@rei_das_caixas" } };
}

export default async function ProdutoPage({ params }: { params: { slug: string } }) {
  const [product, stores] = await Promise.all([getProdutoBySlug(params.slug), getLojas()]);
  if (!product) notFound();
  const images = product.imagens ?? [];
  const availableStores = product.unidadesDisponiveis ?? [];
  const storePhones = Object.fromEntries(stores.map((store) => [store.unidade, store.whatsapp]));

  const galleryImages = images.map((image, index) => ({ url: urlForImage(image).url(), alt: `${product.nome} — imagem ${index + 1}` }));
  return <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
    <Link href="/catalogo" className="text-sm font-semibold text-vermelho hover:underline">← Voltar ao catálogo</Link>
    <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <ProductGallery productName={product.nome} images={galleryImages} />
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-vermelho">{product.categoria?.nome ?? "Artesanato"}</p>
        <h1 className="mt-3 font-titulo text-4xl font-bold leading-tight text-marrom-escuro sm:text-5xl">{product.nome}</h1>
        {product.sku && <p className="mt-2 text-sm font-medium text-marrom-escuro/55">Cód. {product.sku}</p>}
        {product.descricao && <p className="mt-6 whitespace-pre-line text-lg leading-8 text-marrom-escuro/75">{product.descricao}</p>}
        {product.preco != null && <p className="mt-7 font-titulo text-3xl font-bold text-marrom-escuro">R$ {product.preco.toFixed(2).replace(".", ",")}</p>}
        <div className="mt-6 flex flex-wrap gap-3"><FavoriteButton product={product} /><ShareButton title={product.nome} /></div>
        <div className="mt-8"><p className="text-sm font-bold text-marrom-escuro">Disponível nas lojas</p><div className="mt-3"><StoreAvailabilityBadge stores={availableStores} storePhones={storePhones} productName={product.nome} productSku={product.sku} /></div></div>
      </section>
    </div>
  </main>;
}
