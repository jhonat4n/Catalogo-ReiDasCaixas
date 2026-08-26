import ReviewForm from "@/components/ReviewForm";
import { getLojas, getProdutos } from "@/lib/sanity-client";

export const dynamic = "force-dynamic";

export default async function AvaliarPage() {
  const [products, stores] = await Promise.all([getProdutos(), getLojas()]);
  return <main className="mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20"><p className="text-sm font-bold uppercase tracking-[0.18em] text-vermelho">Sua opinião</p><h1 className="mt-3 font-titulo text-4xl font-bold text-marrom-escuro sm:text-5xl">Conte como foi sua experiência</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-marrom-escuro/75">Sua opinião nos ajuda a melhorar e também ajuda outros clientes a conhecerem melhor a Rei das Caixas.</p><div className="mt-10"><ReviewForm products={products.map(({ _id, nome }) => ({ _id, nome }))} stores={stores.map(({ _id, unidade }) => ({ _id, unidade }))} /></div></main>;
}
