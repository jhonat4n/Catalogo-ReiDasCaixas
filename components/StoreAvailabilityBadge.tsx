import type { StoreName } from "@/lib/sanity-client";

type StoreAvailabilityBadgeProps = {
  stores: StoreName[];
  storePhones: Partial<Record<StoreName, string>>;
  productName: string;
  productSku?: string;
};

const whatsappUrl = (phone: string, productName: string, productSku?: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Olá! Gostaria de saber sobre a disponibilidade do produto "${productName}${productSku ? ` (Cód. ${productSku})` : ""}".`,
  )}`;

export default function StoreAvailabilityBadge({ stores, storePhones, productName, productSku }: StoreAvailabilityBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Disponibilidade por loja">
      {stores.map((store) => {
        const phone = storePhones[store];
        const className = "rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-whatsapp transition-all duration-200 hover:scale-105 hover:bg-whatsapp hover:ring-whatsapp hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermelho";

        return phone ? (
          <a key={store} href={whatsappUrl(phone, productName, productSku)} target="_blank" rel="noreferrer" title={`Falar com a unidade ${store} sobre ${productName}`} className={`${className} cursor-pointer`}>
            {store}
          </a>
        ) : (
          <span key={store} className={className}>{store}</span>
        );
      })}
    </div>
  );
}
