"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryPhotoProps = { image: string; title: string; description?: string };

export default function GalleryPhoto({ image, title, description }: GalleryPhotoProps) {
  const [active, setActive] = useState(false);
  return <figure><button type="button" aria-label={`${title}${description ? `: ${description}` : ""}`} aria-expanded={active} onClick={() => setActive((isActive) => !isActive)} className="group/image relative block aspect-square w-full overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermelho"><Image src={image} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-200 group-hover/image:scale-105" /><span className={`absolute inset-0 flex flex-col justify-end bg-marrom-escuro/75 p-5 text-white transition-opacity duration-200 sm:opacity-0 sm:group-hover/image:opacity-100 sm:group-focus-visible/image:opacity-100 ${active ? "opacity-100 sm:opacity-100" : "opacity-0 sm:opacity-0"}`}><span className="font-titulo text-lg font-bold">{title}</span>{description && <span className="mt-1 text-sm leading-6 text-white/85">{description}</span>}</span></button><figcaption className="mt-3 sm:hidden"><span className="font-semibold text-marrom-escuro">{title}</span>{description && <span className="mt-1 block text-sm leading-6 text-marrom-escuro/75">{description}</span>}</figcaption></figure>;
}
