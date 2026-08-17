"use client";
export default function CategoryFilter({ value, categories, onChange }: { value: string; categories: { slug: string; nome: string }[]; onChange: (value: string) => void }) {
  return <label className="flex flex-col gap-2 text-sm font-semibold text-marrom-escuro"><span>Categoria</span><select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-dourado/50 bg-white px-4 py-3 font-normal outline-none focus:border-vermelho"><option value="">Todas as categorias</option>{categories.map((category) => <option key={category.slug} value={category.slug}>{category.nome}</option>)}</select></label>;
}
