const categories = ["Caixas para presente", "Embalagens para alimentos", "Sacolas", "Personalizadas"];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-16 sm:px-10">
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

      <section aria-labelledby="categorias" className="pb-8">
        <h2 id="categorias" className="font-titulo mb-5 text-lg font-bold text-marrom-escuro">Categorias em destaque</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article key={category} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-dourado/40">
              <h3 className="font-titulo font-bold text-marrom-escuro">{category}</h3>
              <p className="mt-2 text-sm text-marrom-escuro/70">Em breve no catálogo.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
