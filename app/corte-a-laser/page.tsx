import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corte e gravação a laser em Eldorado",
  description: "Corte e gravação a laser em MDF e acrílico, exclusivo da unidade Eldorado da Rei das Caixas.",
  openGraph: { title: "Corte e gravação a laser | Rei das Caixas", description: "Serviço exclusivo da unidade Eldorado, em Contagem - MG.", images: ["/images/Logo.png"] },
  other: { "instagram:site": "@rei_das_caixas" },
};

const whatsapp = "31 99440-0481";
const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre o corte a laser na unidade Eldorado.")}`;

export default function CorteALaserPage() {
  return <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20"><div className="max-w-3xl"><p className="inline-flex rounded-full bg-dourado/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-marrom-escuro">Exclusivo Eldorado</p><h1 className="mt-5 font-titulo text-4xl font-bold leading-tight text-marrom-escuro sm:text-6xl">Corte e gravação a laser</h1><p className="mt-6 text-lg leading-8 text-marrom-escuro/75">Um serviço exclusivo da unidade Eldorado, com atendimento presencial e orçamento feito na hora pelo operador da máquina.</p></div><div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-dourado/30 sm:p-9"><h2 className="font-titulo text-2xl font-bold text-marrom-escuro">Como funciona</h2><ul className="mt-6 grid gap-4 text-base leading-7 text-marrom-escuro/80"><li><strong className="text-marrom-escuro">Atendimento presencial:</strong> por ordem de chegada.</li><li><strong className="text-marrom-escuro">Materiais:</strong> MDF 3 mm, MDF 6 mm e acrílico 3 mm.</li><li><strong className="text-marrom-escuro">Área máxima:</strong> até 90 cm × 60 cm.</li><li><strong className="text-marrom-escuro">Orçamento:</strong> feito na hora pelo operador da máquina.</li></ul><a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-white hover:bg-whatsapp/90">Perguntar no WhatsApp</a></section><aside className="rounded-3xl bg-marrom-escuro p-7 text-creme sm:p-9"><p className="text-sm font-bold uppercase tracking-[0.15em] text-dourado">Unidade Eldorado</p><h2 className="mt-4 font-titulo text-2xl font-bold text-white">Venha falar com a gente</h2><address className="mt-6 not-italic text-sm leading-7 text-creme/80"><strong className="text-white">Endereço</strong><br />Av. João César de Oliveira, 2660, loja 209 — 2º andar<br />Eldorado, Contagem — MG, 32130-000<br /><br /><strong className="text-white">Referência</strong><br />Prédio ao lado da Pastelaria Fujyama<br /><br /><strong className="text-white">WhatsApp</strong><br />{whatsapp}</address><Link href="/catalogo" className="mt-7 inline-flex text-sm font-bold text-dourado hover:underline">Ver catálogo →</Link></aside></div></main>;
}
