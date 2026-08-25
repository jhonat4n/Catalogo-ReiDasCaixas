"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";

type GalleryImage = { url?: string; alt: string };

export default function ProductGallery({ productName, images }: { productName: string; images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const hasImages = images.some((image) => image.url);
  const currentIndex = activeIndex ?? 0;
  const close = () => setActiveIndex(null);
  const previous = useCallback(() => setActiveIndex((current) => current == null ? 0 : (current - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActiveIndex((current) => current == null ? 0 : (current + 1) % images.length), [images.length]);

  useEffect(() => {
    if (activeIndex == null) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); if (event.key === "ArrowLeft") previous(); if (event.key === "ArrowRight") next(); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [activeIndex, next, previous]);

  if (!hasImages) return <ImagePlaceholder text="Foto em breve" className="sm:col-span-2" />;
  return <>
    <section aria-label={`Galeria de ${productName}`} className="grid gap-4 sm:grid-cols-2">{images.map((image, index) => image.url && <button key={image.url} type="button" onClick={() => setActiveIndex(index)} className="text-left" aria-label={`Ampliar ${image.alt}`}><ImagePlaceholder image={image.url} alt={image.alt} sizes="(max-width: 640px) 100vw, 50vw" /></button>)}</section>
    {activeIndex != null && images[currentIndex]?.url && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-marrom-escuro/90 p-4" role="dialog" aria-modal="true" aria-label={`Imagem ampliada de ${productName}`} onClick={close}>
      <div className="relative flex h-full w-full max-w-6xl items-center justify-center" onClick={(event) => event.stopPropagation()} onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const start = touchStartX.current; const end = event.changedTouches[0]?.clientX; touchStartX.current = null; if (start == null || end == null || images.length < 2 || Math.abs(end - start) < 40) return; if (end < start) next(); else previous(); }}>
        <Image src={images[currentIndex].url!} alt={images[currentIndex].alt} fill sizes="100vw" className="object-contain" />
        <button type="button" onClick={close} aria-label="Fechar imagem ampliada" className="absolute right-0 top-0 rounded-full bg-white/90 p-3 text-marrom-escuro"><X size={22} /></button>
        {images.length > 1 && <><button type="button" onClick={previous} aria-label="Imagem anterior" className="absolute left-0 rounded-full bg-white/90 p-3 text-marrom-escuro"><ChevronLeft size={24} /></button><button type="button" onClick={next} aria-label="Próxima imagem" className="absolute right-0 top-1/2 rounded-full bg-white/90 p-3 text-marrom-escuro"><ChevronRight size={24} /></button><p className="absolute bottom-2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">{currentIndex + 1} / {images.length}</p></>}
      </div>
    </div>}
  </>;
}
