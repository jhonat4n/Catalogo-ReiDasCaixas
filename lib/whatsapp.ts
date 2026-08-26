import type { StoreName } from "@/lib/sanity-client";

export const storeDetails: Record<StoreName, { phone: string; address: string }> = {
  Eldorado: { phone: "31 99440-0481", address: "Av. João César de Oliveira, 2660 — Contagem/MG" },
  "BH Centro": { phone: "31 98223-9878", address: "R. São Paulo, 656 — Belo Horizonte/MG" },
};
export function whatsappUrl(phone: string, message?: string) { const base = `https://wa.me/${phone.replace(/\D/g, "")}`; return message ? `${base}?text=${encodeURIComponent(message)}` : base; }
export type WhatsAppProduct = { name: string; sku?: string };
export function favoriteMessage(products: WhatsAppProduct[]) { return `Olá! Gostaria de pedir um orçamento para estes produtos:\n${products.map((product) => `- ${product.name}${product.sku ? ` (Cód. ${product.sku})` : ""}`).join("\n")}`; }
