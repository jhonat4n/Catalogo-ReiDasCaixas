import Link from "next/link";
import { notFound } from "next/navigation";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { getProdutoBySlug } from "@/lib/sanity-client";
import { urlForImage } from "@/lib/sanity-image";

export const dynamic = "force-dynamic";

const stores = {
  Eldorado: "31 99440-0481",
  "BH Centro": "31 98223-9878",
} as const;

const whatsappUrl = (phone: string, productName: string) => `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá! Tenho interesse no produto "${productName}".`)}`;

export default async function ProdutoPage({ params }: { params: { slug: string } }) {
  const product = await getProdutoBySlug(params.slug);
  if (!product) notFound();
  const images = product.imagens ?? [];
  const availableStores = product.unidadesDisponiveis ?? [];

  return <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10"><Link href="/catalogo" className="text-sm font-semibold text-vermelho hover:underline">← Voltar ao catálogo</Link><div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"><section aria-label={`Galeria de ${product.nome}`} className="grid gap-4 sm:grid-cols-2">{images.length ? images.map((image, index) => <ImagePlaceholder key={index} image={urlForImage(image).url()} alt={`${product.nome} — imagem ${index + 1}`} sizes="(max-width: 640px) 100vw, 50vw" />) : <ImagePlaceholder text="Foto em breve" className="sm:col-span-2" />}</section><section><p className="text-sm font-bold uppercase tracking-[0.15em] text-vermelho">{product.categoria?.nome ?? "Artesanato"}</p><h1 className="mt-3 font-titulo text-4xl font-bold leading-tight text-marrom-escuro sm:text-5xl">{product.nome}</h1>{product.descricao && <p className="mt-6 whitespace-pre-line text-lg leading-8 text-marrom-escuro/75">{product.descricao}</p>}{product.preco != null && <p className="mt-7 font-titulo text-3xl font-bold text-marrom-escuro">R$ {product.preco.toFixed(2).replace(".", ",")}</p>}<div className="mt-8"><p className="text-sm font-bold text-marrom-escuro">Disponível nas lojas</p><div className="mt-3 flex flex-wrap gap-2">{availableStores.map((store) => <span key={store} className="rounded-full bg-creme px-4 py-2 text-sm font-semibold text-marrom-escuro ring-1 ring-dourado/50">{store}</span>)}</div></div><div className="mt-8 grid gap-3 sm:grid-cols-2">{availableStores.map((store) => <a key={store} href={whatsappUrl(stores[store], product.nome)} target="_blank" rel="noreferrer" className="rounded-full bg-whatsapp px-5 py-3 text-center text-sm font-bold text-white hover:bg-whatsapp/90">Perguntar no WhatsApp — {store}</a>)}</div></section></div></main>;
}
