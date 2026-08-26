import Link from "next/link";
import FeatureStrip from "@/components/FeatureStrip";
import HeroCarousel from "@/components/HeroCarousel";
import ProductGrid from "@/components/ProductGrid";
import { getLojas, getProdutos } from "@/lib/sanity-client";

export const revalidate = 60;
export const dynamic = "force-dynamic";

const whatsapp = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

export default async function Home() {
  const [allProducts, stores] = await Promise.all([getProdutos(), getLojas()]);
  const products = allProducts.filter((product) => product.destaque);
  const storePhones = Object.fromEntries(stores.map((store) => [store.unidade, store.whatsapp]));
  return <main id="inicio"><section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24"><div><p className="mb-5 inline-flex rounded-full bg-dourado/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-marrom-escuro dark:text-[#3b2a1e]">LOJA DE ARTESANATO EM MG</p><h1 className="font-titulo text-4xl font-bold leading-tight text-marrom-escuro sm:text-6xl">Artesanato em MDF, caixas e peças personalizadas</h1><p className="mt-6 max-w-xl text-lg leading-8 text-marrom-escuro/75">Conheça nosso catálogo e encontre peças especiais para presentear, decorar e valorizar sua marca.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/catalogo" className="rounded-full bg-marrom-escuro px-5 py-3 text-sm font-bold text-white hover:bg-marrom-escuro/90">Ver catálogo</Link><a href={whatsapp("31 99440-0481")} target="_blank" rel="noreferrer" className="rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-white">Unidade Eldorado</a><a href={whatsapp("31 98223-9878")} target="_blank" rel="noreferrer" className="rounded-full border-2 border-whatsapp px-5 py-3 text-sm font-bold text-whatsapp">Unidade BH Centro</a><Link href="/corte-a-laser" className="rounded-full border-2 border-marrom-escuro px-5 py-3 text-sm font-bold text-marrom-escuro">Conhecer corte a laser</Link></div></div><HeroCarousel /></section><FeatureStrip /><section aria-labelledby="destaques" className="mx-auto max-w-7xl px-6 py-14 lg:px-10"><h2 id="destaques" className="mb-6 font-titulo text-2xl font-bold text-marrom-escuro">Produtos em destaque</h2><ProductGrid products={products} storePhones={storePhones} /></section></main>;
}
