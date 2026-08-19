import type { StoreName } from "@/lib/sanity-client";

type StoreAvailabilityBadgeProps = {
  stores: StoreName[];
  storePhones: Partial<Record<StoreName, string>>;
  productName: string;
};

const whatsappUrl = (phone: string, productName: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Olá! Gostaria de saber sobre a disponibilidade do produto "${productName}".`,
  )}`;

export default function StoreAvailabilityBadge({ stores, storePhones, productName }: StoreAvailabilityBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Disponibilidade por loja">
      {stores.map((store) => {
        const phone = storePhones[store];
        const className = "rounded-full bg-creme px-3 py-1 text-xs font-semibold text-marrom-escuro ring-1 ring-dourado/50 transition-colors hover:bg-dourado/20 hover:ring-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermelho";

        return phone ? (
          <a key={store} href={whatsappUrl(phone, productName)} target="_blank" rel="noreferrer" title={`Falar com a unidade ${store} sobre ${productName}`} className={`${className} cursor-pointer`}>
            {store}
          </a>
        ) : (
          <span key={store} className={className}>{store}</span>
        );
      })}
    </div>
  );
}
