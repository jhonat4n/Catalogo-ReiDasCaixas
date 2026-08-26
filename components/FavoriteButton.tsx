"use client";

import { Heart } from "lucide-react";
import type { Produto } from "@/lib/sanity-client";
import { useFavorites } from "@/components/FavoritesProvider";

export default function FavoriteButton({ product, compact = false }: { product: Produto; compact?: boolean }) {
  const { hydrated, isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(product._id);
  const favorite = { id: product._id, name: product.nome, sku: product.sku, slug: product.slug, stores: product.unidadesDisponiveis ?? [] };
  return <button type="button" aria-label={active ? `Remover ${product.nome} dos favoritos` : `Adicionar ${product.nome} aos favoritos`} aria-pressed={active} disabled={!hydrated} onClick={() => toggleFavorite(favorite)} className={`inline-flex items-center justify-center rounded-full border transition-colors ${compact ? "h-10 w-10" : "gap-2 px-4 py-2.5"} ${active ? "border-vermelho bg-vermelho text-white" : "border-dourado/50 bg-white text-vermelho hover:bg-vermelho/10"}`}><Heart size={compact ? 19 : 18} fill={active ? "currentColor" : "none"} aria-hidden="true" />{!compact && <span>{active ? "Favoritado" : "Favoritar"}</span>}</button>;
}
