import ProductGrid from "@/components/ProductGrid";
import { getProdutos } from "@/lib/sanity-client";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function Home() {
  const products = (await getProdutos()).filter((product) => product.destaque);
  return (
    <main id="inicio" className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-16 sm:px-10">
      <header className="flex items-center justify-between border-b border-dourado pb-6">
        <span className="font-titulo text-xl font-bold tracking-tight text-vermelho">REI DAS CAIXAS</span>
        <span className="text-sm font-medium text-marrom-escuro">Catálogo</span>
      </header>

      <section className="flex flex-1 flex-col justify-center py-20">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-vermelho">Embalagens que valorizam sua marca</p>
        <h1 className="font-titulo max-w-3xl text-5xl font-bold tracking-tight text-marrom-escuro sm:text-7xl">
          Encontre a caixa ideal para o seu produto.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-marrom-escuro/80">
          Consulte nossas opções de embalagens e fale com um vendedor para receber atendimento personalizado.
        </p>
      </section>

      <section aria-labelledby="destaques" className="pb-8">
        <h2 id="destaques" className="font-titulo mb-5 text-lg font-bold text-marrom-escuro">Produtos em destaque</h2>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
