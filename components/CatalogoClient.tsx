"use client";

import { useMemo, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import StoreFilter from "@/components/StoreFilter";
import type { Produto, StoreName } from "@/lib/sanity-client";

type SortOption = "recent" | "name-asc" | "name-desc" | "price-asc" | "price-desc";

const sortLabels: Record<SortOption, string> = {
  recent: "Mais recentes",
  "name-asc": "Nome: A–Z",
  "name-desc": "Nome: Z–A",
  "price-asc": "Menor preço",
  "price-desc": "Maior preço",
};

const comparePrices = (a: Produto, b: Produto, direction: 1 | -1) => {
  if (a.preco == null && b.preco == null) return 0;
  if (a.preco == null) return 1;
  if (b.preco == null) return -1;
  return (a.preco - b.preco) * direction;
};

function EmptyCatalogState({ onClear, storePhones }: { onClear: () => void; storePhones: Partial<Record<StoreName, string>> }) {
  const phone = Object.values(storePhones).find(Boolean);
  const whatsappHref = phone ? `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de ajuda para encontrar uma peça no catálogo.")}` : undefined;

  return <div className="rounded-2xl bg-white px-6 py-10 text-center shadow-sm ring-1 ring-dourado/30"><h2 className="font-titulo text-2xl font-bold text-marrom-escuro">Não encontramos essa peça.</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-marrom-escuro/70">Tente remover alguns filtros ou fale diretamente com uma de nossas lojas.</p><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={onClear} className="rounded-full border border-vermelho px-5 py-3 text-sm font-bold text-vermelho transition-colors hover:bg-vermelho hover:text-white">Limpar filtros</button>{whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-md"><MessageCircle size={17} aria-hidden="true" /> Perguntar no WhatsApp</a>}</div></div>;
}

export default function CatalogoClient({ products, categories, storePhones }: { products: Produto[]; categories: { slug: string; nome: string }[]; storePhones: Partial<Record<StoreName, string>> }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [store, setStore] = useState("");
  const [sort, setSort] = useState<SortOption>("recent");
  const filtered = useMemo(() => products.map((product, index) => ({ product, index })).filter(({ product }) => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return product.nome.toLocaleLowerCase().includes(normalizedSearch) && (!category || product.categoria?.slug === category) && (!store || product.unidadesDisponiveis?.includes(store as StoreName));
  }).sort((a, b) => {
    if (sort === "name-asc" || sort === "name-desc") return a.product.nome.localeCompare(b.product.nome, "pt-BR") * (sort === "name-asc" ? 1 : -1) || a.index - b.index;
    if (sort === "price-asc" || sort === "price-desc") return comparePrices(a.product, b.product, sort === "price-asc" ? 1 : -1) || a.index - b.index;
    return (b.product._createdAt ? Date.parse(b.product._createdAt) : 0) - (a.product._createdAt ? Date.parse(a.product._createdAt) : 0) || a.index - b.index;
  }).map(({ product }) => product), [products, search, category, store, sort]);
  const hasFilters = Boolean(search.trim() || category || store);
  const categoryName = categories.find((item) => item.slug === category)?.nome;
  const clearFilters = () => { setSearch(""); setCategory(""); setStore(""); setSort("recent"); };
  return <><div className="mt-8 grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-dourado/30 md:grid-cols-3"><SearchBar value={search} onChange={setSearch} /><CategoryFilter value={category} categories={categories} onChange={setCategory} /><StoreFilter value={store} onChange={setStore} /></div>{hasFilters && <div className="mt-5 flex flex-wrap items-center gap-2"><span className="mr-1 text-sm font-semibold text-marrom-escuro/70">Filtros ativos:</span>{categoryName && <button type="button" onClick={() => setCategory("")} className="inline-flex items-center gap-1 rounded-full bg-vermelho/10 px-3 py-1.5 text-sm font-semibold text-vermelho transition-colors hover:bg-vermelho hover:text-white">{categoryName}<X size={15} aria-hidden="true" /></button>}{store && <button type="button" onClick={() => setStore("")} className="inline-flex items-center gap-1 rounded-full bg-vermelho/10 px-3 py-1.5 text-sm font-semibold text-vermelho transition-colors hover:bg-vermelho hover:text-white">{store}<X size={15} aria-hidden="true" /></button>}{search.trim() && <button type="button" onClick={() => setSearch("")} className="inline-flex items-center gap-1 rounded-full bg-vermelho/10 px-3 py-1.5 text-sm font-semibold text-vermelho transition-colors hover:bg-vermelho hover:text-white">Busca: {search.trim()}<X size={15} aria-hidden="true" /></button>}<button type="button" onClick={clearFilters} className="ml-auto text-sm font-bold text-vermelho underline-offset-4 hover:underline">Limpar filtros</button></div>}<div className="my-8 flex flex-col gap-3 border-y border-dourado/30 py-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm font-semibold text-marrom-escuro/70">{filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}</p><label className="flex items-center gap-2 text-sm font-semibold text-marrom-escuro"><span>Ordenar por:</span><select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="rounded-xl border border-dourado/50 bg-white px-3 py-2 font-normal outline-none focus:border-vermelho">{Object.entries(sortLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div>{filtered.length ? <ProductGrid products={filtered} storePhones={storePhones} /> : <EmptyCatalogState onClear={clearFilters} storePhones={storePhones} />}</>;
}
