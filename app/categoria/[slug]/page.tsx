import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getCategoriaBySlug, getLojas, getProdutos } from "@/lib/sanity-client";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoriaBySlug(params.slug);
  const title = category ? `${category.nome} | Catálogo` : "Categoria";
  return { title, description: category ? `Confira produtos de ${category.nome} na Rei das Caixas Artesanato.` : "Categorias da Rei das Caixas Artesanato.", openGraph: { title, images: ["/images/Logo.png"] }, other: { "instagram:site": "@rei_das_caixas" } };
}

export default async function CategoriaPage({ params }: { params: { slug: string } }) {
  const [category, products, stores] = await Promise.all([getCategoriaBySlug(params.slug), getProdutos({ categoria: params.slug }), getLojas()]);
  if (!category) notFound();
  const storePhones = Object.fromEntries(stores.map((store) => [store.unidade, store.whatsapp]));
  return <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10"><p className="text-sm font-bold uppercase tracking-[0.18em] text-vermelho">Categoria</p><h1 className="mt-3 font-titulo text-4xl font-bold text-marrom-escuro sm:text-5xl">{category.nome}</h1><p className="mt-5 text-lg text-marrom-escuro/75">Produtos de {category.nome} da Rei das Caixas Artesanato.</p><div className="mt-10"><ProductGrid products={products} storePhones={storePhones} /></div></main>;
}
