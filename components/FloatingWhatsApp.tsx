"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { storeDetails, whatsappUrl } from "@/lib/whatsapp";
import type { StoreName } from "@/lib/sanity-client";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const stores = Object.keys(storeDetails) as StoreName[];
  return <div className="fixed bottom-6 right-6 z-50">{open && <div className="absolute bottom-16 right-0 mb-3 w-64 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-dourado/40" role="dialog" aria-label="Contato por WhatsApp"><div className="flex items-center justify-between px-2"><p className="font-titulo font-bold text-marrom-escuro">Fale com uma loja</p><button type="button" onClick={() => setOpen(false)} aria-label="Fechar WhatsApp" className="rounded-full p-1 text-marrom-escuro hover:bg-creme"><X size={17} /></button></div><div className="mt-2 grid gap-2">{stores.map((store) => <a key={store} href={whatsappUrl(storeDetails[store].phone)} target="_blank" rel="noreferrer" className="rounded-xl border border-dourado/40 p-3 text-sm hover:bg-creme"><span className="font-bold text-marrom-escuro">{store}</span><span className="mt-1 block text-xs text-marrom-escuro/70">{storeDetails[store].phone}</span></a>)}</div></div>}<button type="button" onClick={() => setOpen((current) => !current)} aria-label={open ? "Fechar opções de WhatsApp" : "Falar pelo WhatsApp"} aria-expanded={open} className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg ring-4 ring-creme hover:scale-105"><MessageCircle size={26} aria-hidden="true" /></button></div>;
}

