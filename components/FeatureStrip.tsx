const features = ["Caixas em MDF", "Peças personalizadas", "Corte e gravação a laser", "Retirada na loja"];

export default function FeatureStrip() {
  return <section aria-label="Diferenciais" className="grid gap-3 border-y border-dourado/40 bg-white/60 px-6 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">{features.map((feature) => <div key={feature} className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-marrom-escuro"><span className="h-2 w-2 rounded-full bg-vermelho" aria-hidden="true" />{feature}</div>)}</section>;
}
