"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type HeroImage = { src: string; alt: string };

const images: HeroImage[] = [
  { src: "/images/MDF_boxes.jpeg", alt: "Caixas e peças de MDF para artesanato" },
  { src: "/images/Caixas_de_MDF.jpeg", alt: "Variedade de caixas de MDF para personalização" },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>();

  const changeImage = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndex || fading) return;
    setFading(true);
    transitionTimer.current = setTimeout(() => {
      setActiveIndex(nextIndex);
      setFading(false);
    }, 420);
  }, [activeIndex, fading]);

  const showNext = useCallback(() => changeImage((activeIndex + 1) % images.length), [activeIndex, changeImage]);
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(showNext, 5000);
    return () => clearTimeout(timer);
  }, [activeIndex, paused, showNext]);

  useEffect(() => () => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
  }, []);

  const activeImage = images[activeIndex];
  return <div className="relative aspect-[4/3] overflow-hidden rounded-3xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <Image src={activeImage.src} alt={activeImage.alt} fill priority={activeIndex === 0} sizes="(max-width: 1024px) 100vw, 40vw" className={`object-cover ease-in-out transition-opacity duration-500 motion-reduce:duration-0 motion-reduce:transition-none ${fading ? "opacity-0" : "opacity-100"}`} />
    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-marrom-escuro/45 px-3 py-2" aria-label="Selecionar imagem">
      {images.map((image, index) => <button key={image.src} type="button" onClick={() => changeImage(index)} aria-label={`Exibir ${image.alt}`} aria-current={activeIndex === index ? "true" : undefined} className={`h-2.5 w-2.5 rounded-full border border-white/80 transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${activeIndex === index ? "bg-white" : "bg-white/35 hover:bg-white/70"}`} />)}
    </div>
  </div>;
}
