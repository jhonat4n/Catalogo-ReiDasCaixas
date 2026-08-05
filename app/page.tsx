const categories = ["Caixas para presente", "Embalagens para alimentos", "Sacolas", "Personalizadas"];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-16 sm:px-10">
      <header className="flex items-center justify-between border-b border-amber-200 pb-6">
        <span className="text-xl font-black tracking-tight text-amber-800">REI DAS CAIXAS</span>
        <span className="text-sm font-medium text-stone-600">Catálogo</span>
      </header>

      <section className="flex flex-1 flex-col justify-center py-20">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Embalagens que valorizam sua marca</p>
        <h1 className="max-w-3xl text-5xl font-black tracking-tight text-stone-900 sm:text-7xl">
          Encontre a caixa ideal para o seu produto.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
          Consulte nossas opções de embalagens e fale com um vendedor para receber atendimento personalizado.
        </p>
      </section>

      <section aria-labelledby="categorias" className="pb-8">
        <h2 id="categorias" className="mb-5 text-lg font-bold text-stone-800">Categorias em destaque</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article key={category} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-amber-100">
              <h3 className="font-semibold text-stone-800">{category}</h3>
              <p className="mt-2 text-sm text-stone-500">Em breve no catálogo.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
