import GalleryPhoto from "@/components/GalleryPhoto";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { getFotosGaleria } from "@/lib/sanity-client";
import { urlForImage } from "@/lib/sanity-image";

export const dynamic = "force-dynamic";

export default async function GaleriaPage() {
  const photos = await getFotosGaleria();
  return <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20"><header className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-vermelho">Galeria</p><h1 className="mt-3 font-titulo text-4xl font-bold text-marrom-escuro sm:text-5xl">Nossa loja e produção</h1><p className="mt-5 text-lg leading-8 text-marrom-escuro/75">Em breve, fotos do nosso ambiente, produtos e processos criativos.</p></header>{photos.length ? <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{photos.map((photo) => { const image = urlForImage(photo.imagem).url(); return image ? <GalleryPhoto key={photo._id} image={image} title={photo.titulo} description={photo.descricao} /> : null; })}</div> : <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <figure key={index}><ImagePlaceholder text="Foto em breve" className="aspect-square" /><figcaption className="mt-3 text-sm font-semibold text-marrom-escuro">Fotos da nossa loja e produção</figcaption></figure>)}</div>}</main>;
}
