"use client";

import { useMemo, useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import StoreFilter from "@/components/StoreFilter";
import type { Produto } from "@/lib/sanity-client";

export default function CatalogoClient({ products, categories }: { products: Produto[]; categories: { slug: string; nome: string }[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [store, setStore] = useState("");
  const filtered = useMemo(() => products.filter((product) => {
    return product.nome.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && (!category || product.categoria?.slug === category) && (!store || product.unidadesDisponiveis?.includes(store as "Eldorado" | "BH Centro"));
  }), [products, search, category, store]);
  return <><div className="mt-8 grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-dourado/30 md:grid-cols-3"><SearchBar value={search} onChange={setSearch} /><CategoryFilter value={category} categories={categories} onChange={setCategory} /><StoreFilter value={store} onChange={setStore} /></div><p className="my-8 text-sm text-marrom-escuro/70">{filtered.length} produto(s) encontrado(s)</p><ProductGrid products={filtered} /></>;
}
