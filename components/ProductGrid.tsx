import ProductCard from "@/components/ProductCard";
import type { Produto, StoreName } from "@/lib/sanity-client";

export default function ProductGrid({ products, storePhones }: { products: Produto[]; storePhones: Partial<Record<StoreName, string>> }) {
  if (!products.length) return <p className="rounded-2xl bg-white p-8 text-center text-marrom-escuro/70 ring-1 ring-dourado/30">Nenhum produto encontrado.</p>;
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product._id} product={product} storePhones={storePhones} />)}</div>;
}
