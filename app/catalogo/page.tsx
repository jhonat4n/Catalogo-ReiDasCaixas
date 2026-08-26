import CatalogoClient from "@/components/CatalogoClient";
import { getCategorias, getLojas, getProdutos } from "@/lib/sanity-client";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function CatalogoPage() {
  const [products, categories, stores] = await Promise.all([getProdutos(), getCategorias(), getLojas()]);
  const storePhones = Object.fromEntries(stores.map((store) => [store.unidade, store.whatsapp]));
  return <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10"><p className="text-sm font-bold uppercase tracking-[0.2em] text-vermelho">Catálogo</p><h1 className="mt-3 font-titulo text-4xl font-bold text-marrom-escuro sm:text-5xl">Encontre sua peça ideal</h1><CatalogoClient products={products} categories={categories} storePhones={storePhones} /></main>;
}
