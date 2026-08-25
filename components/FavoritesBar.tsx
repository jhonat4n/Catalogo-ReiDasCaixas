"use client";

import { Heart, X } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "@/components/FavoritesProvider";
import { favoriteMessage, storeDetails, whatsappUrl } from "@/lib/whatsapp";
import type { StoreName } from "@/lib/sanity-client";

export default function FavoritesBar() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [open, setOpen] = useState(false);
  const [storeChoiceOpen, setStoreChoiceOpen] = useState(false);
  if (!favorites.length) return null;
  const availableStores = (Object.keys(storeDetails) as StoreName[]).filter((store) => favorites.some((favorite) => favorite.stores.includes(store)));
  const sendToWhatsApp = (store: StoreName) => { window.open(whatsappUrl(storeDetails[store].phone, favoriteMessage(favorites.map((favorite) => favorite.name))), "_blank", "noopener,noreferrer"); setStoreChoiceOpen(false); };
  return <div className="fixed bottom-6 left-6 z-50 max-w-[calc(100vw-7rem)] sm:max-w-sm">{open && <div className="mb-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-dourado/40" role="dialog" aria-label="Produtos favoritos"><div className="flex items-center justify-between gap-4"><h2 className="font-titulo font-bold text-marrom-escuro">Meus favoritos</h2><button type="button" onClick={() => setOpen(false)} aria-label="Fechar favoritos" className="rounded-full p-1 text-marrom-escuro hover:bg-creme"><X size={18} /></button></div><ul className="mt-3 max-h-48 space-y-2 overflow-auto text-sm">{favorites.map((favorite) => <li key={favorite.id} className="flex items-center justify-between gap-3"><span className="truncate text-marrom-escuro">{favorite.name}</span><button type="button" onClick={() => removeFavorite(favorite.id)} aria-label={`Remover ${favorite.name}`} className="shrink-0 text-vermelho"><X size={16} /></button></li>)}</ul>{storeChoiceOpen ? <div className="mt-4 border-t border-dourado/30 pt-3"><p className="text-sm font-bold text-marrom-escuro">Escolha a loja para o orçamento</p><div className="mt-2 grid gap-2">{availableStores.map((store) => <button key={store} type="button" onClick={() => sendToWhatsApp(store)} className="rounded-full bg-whatsapp px-3 py-2 text-sm font-bold text-white">{store}</button>)}</div><button type="button" onClick={() => setStoreChoiceOpen(false)} className="mt-2 text-xs text-marrom-escuro/70 underline">Voltar</button></div> : <><button type="button" onClick={() => availableStores.length === 1 ? sendToWhatsApp(availableStores[0]) : setStoreChoiceOpen(true)} disabled={!availableStores.length} className="mt-4 w-full rounded-full bg-whatsapp px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Pedir orçamento dos favoritos</button><button type="button" onClick={clearFavorites} className="mt-2 w-full text-xs text-marrom-escuro/70 underline">Limpar favoritos</button></>}</div>}<button type="button" onClick={() => setOpen((current) => !current)} className="flex items-center gap-2 rounded-full bg-vermelho px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-vermelho/90" aria-expanded={open}><Heart size={18} fill="currentColor" aria-hidden="true" /><span>{favorites.length} {favorites.length === 1 ? "favorito" : "favoritos"}</span></button></div>;
}
