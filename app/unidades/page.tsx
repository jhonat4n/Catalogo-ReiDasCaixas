import StoreCard from "@/components/StoreCard";
import { getLojas } from "@/lib/sanity-client";

export const dynamic = "force-dynamic";

export default async function UnidadesPage() {
  const stores = await getLojas();
  return <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20"><header className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-vermelho">Onde estamos</p><h1 className="mt-3 font-titulo text-4xl font-bold text-marrom-escuro sm:text-5xl">Nossas unidades</h1><p className="mt-5 text-lg leading-8 text-marrom-escuro/75">Duas lojas para atender você com produtos prontos, encomendas e retirada presencial.</p></header><section aria-label="Lojas" className="mt-12 grid gap-8 lg:grid-cols-2">{stores.map((store) => <StoreCard key={store._id} store={store} />)}</section></main>;
}
