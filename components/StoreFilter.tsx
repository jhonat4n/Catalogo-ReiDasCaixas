"use client";
export default function StoreFilter({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="flex flex-col gap-2 text-sm font-semibold text-marrom-escuro"><span>Loja</span><select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-dourado/50 bg-white px-4 py-3 font-normal outline-none focus:border-vermelho"><option value="">Todas as lojas</option><option value="Eldorado">Eldorado</option><option value="BH Centro">BH Centro</option></select></label>;
}
