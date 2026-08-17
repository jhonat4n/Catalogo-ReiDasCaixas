import CatalogoClient from "@/components/CatalogoClient";
import { getCategorias, getProdutos } from "@/lib/sanity-client";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function CatalogoPage() {
  const [products, categories] = await Promise.all([getProdutos(), getCategorias()]);
  return <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10"><p className="text-sm font-bold uppercase tracking-[0.2em] text-vermelho">Catálogo</p><h1 className="mt-3 font-titulo text-4xl font-bold text-marrom-escuro sm:text-5xl">Encontre a embalagem ideal</h1><CatalogoClient products={products} categories={categories} /></main>;
}
