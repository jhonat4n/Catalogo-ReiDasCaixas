import { createLucideIcon } from "lucide-react";

const Instagram = createLucideIcon("instagram", [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" }],
]);

const stores = [{ name: "Eldorado", city: "Contagem - MG", address: "Av. João César de Oliveira, 2660, loja 209 - 2º andar - Eldorado", phone: "31 99440-0481" }, { name: "BH Centro", city: "Belo Horizonte - MG", address: "R. São Paulo, 656 - Lj C4 - Centro", phone: "31 98223-9878" }];

export default function ContatoPage() {
  return <main className="mx-auto max-w-5xl px-6 py-14 lg:px-10 lg:py-20"><p className="text-sm font-bold uppercase tracking-[0.18em] text-vermelho">Fale com a gente</p><h1 className="mt-3 font-titulo text-4xl font-bold text-marrom-escuro sm:text-5xl">Contato</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-marrom-escuro/75">Escolha a unidade mais próxima e fale conosco pelo WhatsApp. Também acompanhe novidades no Instagram.</p><a href="https://instagram.com/rei_das_caixas" target="_blank" rel="noopener noreferrer" aria-label="Acessar Instagram da Rei das Caixas" className="group mt-6 inline-flex w-full items-center gap-3 rounded-2xl border border-vermelho bg-white px-5 py-3.5 text-left shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-vermelho hover:shadow-md sm:w-auto"><Instagram size={22} aria-hidden="true" className="shrink-0 text-vermelho transition-colors duration-200 group-hover:text-white" /><span className="font-bold text-marrom-escuro transition-colors duration-200 group-hover:text-white">Siga-nos no Instagram</span><span className="text-sm font-bold text-vermelho transition-colors duration-200 group-hover:text-white">@rei_das_caixas</span></a><div className="mt-12 grid gap-6 sm:grid-cols-2">{stores.map((store) => <article key={store.name} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-dourado/30"><p className="text-sm font-bold uppercase tracking-[0.15em] text-vermelho">Unidade {store.name}</p><h2 className="mt-2 font-titulo text-2xl font-bold text-marrom-escuro">{store.city}</h2><p className="mt-5 text-sm leading-6 text-marrom-escuro/75">{store.address}</p><a href={`https://wa.me/${store.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-white">Chamar no WhatsApp · {store.phone}</a></article>)}</div></main>;
}
