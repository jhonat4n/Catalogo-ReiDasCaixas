"use client";

import { Star, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Avaliacao } from "@/lib/sanity-client";

const anonymizeName = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return parts[0] || "Cliente";
  return `${parts[0]} ${parts.slice(1).map((part) => `${part[0].toUpperCase()}.`).join(" ")}`;
};

const summarize = (comment: string, limit = 150) => {
  if (comment.length <= limit) return comment;
  const shortened = comment.slice(0, limit - 1).replace(/\s+\S*$/, "").trim();
  return `${shortened || comment.slice(0, limit - 1).trim()}…`;
};

export default function ReviewPopup({ reviews }: { reviews: Avaliacao[] }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [index, setIndex] = useState(0);
  const closedRef = useRef(false);

  useEffect(() => {
    if (!reviews.length || pathname.startsWith("/studio")) return;
    let showTimer: ReturnType<typeof setTimeout> | undefined;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let nextTimer: ReturnType<typeof setTimeout> | undefined;
    const schedule = (delay: number) => {
      showTimer = setTimeout(() => {
        if (closedRef.current) return;
        setVisible(true);
        hideTimer = setTimeout(() => {
          setVisible(false);
          nextTimer = setTimeout(() => {
            setIndex((current) => (current + 1) % reviews.length);
            schedule(0);
          }, 25000);
        }, 7000);
      }, delay);
    };
    schedule(4500);
    return () => {
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
      if (nextTimer) clearTimeout(nextTimer);
    };
  }, [pathname, reviews.length]);

  if (!reviews.length || pathname.startsWith("/studio") || closed) return null;
  const review = reviews[index % reviews.length];
  return <div className="pointer-events-none fixed bottom-24 left-6 z-30 hidden w-[min(22rem,calc(100vw-3rem))] lg:block" aria-live="polite"><article className={`pointer-events-auto rounded-2xl border border-dourado/35 bg-white p-4 shadow-lg transition-all duration-300 motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`} aria-label="Avaliação de cliente"><div className="flex items-start justify-between gap-3"><div className="flex gap-0.5 text-dourado" aria-label={`${review.estrelas} de 5 estrelas`}>{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill={star <= review.estrelas ? "currentColor" : "none"} aria-hidden="true" />)}</div><button type="button" onClick={() => { closedRef.current = true; setClosed(true); setVisible(false); }} aria-label="Fechar avaliação" className="rounded-full p-1 text-marrom-escuro/60 hover:bg-creme hover:text-marrom-escuro"><X size={16} /></button></div><p className="mt-3 text-sm leading-6 text-marrom-escuro">“{summarize(review.comentario)}”</p><p className="mt-3 text-xs font-bold text-marrom-escuro/70">{anonymizeName(review.nome)}</p>{review.produto?.nome && <p className="mt-1 text-xs text-marrom-escuro/55">{review.produto.nome}</p>}</article></div>;
}
