"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { StoreName } from "@/lib/sanity-client";

export type FavoriteProduct = { id: string; name: string; slug: string; stores: StoreName[] };
type FavoritesContextValue = { favorites: FavoriteProduct[]; hydrated: boolean; isFavorite: (id: string) => boolean; toggleFavorite: (product: FavoriteProduct) => void; removeFavorite: (id: string) => void; clearFavorites: () => void };
const storageKey = "rei-das-caixas:favorites";
const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as FavoriteProduct[];
        if (Array.isArray(parsed)) setFavorites(parsed);
      }
    } catch { window.localStorage.removeItem(storageKey); }
    finally { setHydrated(true); }
  }, []);
  useEffect(() => { if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(favorites)); }, [favorites, hydrated]);
  const value = useMemo<FavoritesContextValue>(() => ({
    favorites,
    hydrated,
    isFavorite: (id) => favorites.some((favorite) => favorite.id === id),
    toggleFavorite: (product) => setFavorites((current) => current.some((favorite) => favorite.id === product.id) ? current.filter((favorite) => favorite.id !== product.id) : [...current, product]),
    removeFavorite: (id) => setFavorites((current) => current.filter((favorite) => favorite.id !== id)),
    clearFavorites: () => setFavorites([]),
  }), [favorites, hydrated]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}

