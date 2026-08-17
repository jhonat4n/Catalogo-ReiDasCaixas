"use client";
export default function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="flex flex-col gap-2 text-sm font-semibold text-marrom-escuro"><span>Buscar produto</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Digite o nome do produto" className="rounded-xl border border-dourado/50 bg-white px-4 py-3 font-normal outline-none placeholder:text-marrom-escuro/50 focus:border-vermelho" /></label>;
}
