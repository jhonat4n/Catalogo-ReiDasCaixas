"use client";

import { Star } from "lucide-react";
import { useState } from "react";

type StarRatingProps = { value: number; onChange: (value: number) => void; error?: boolean };

export default function StarRating({ value, onChange, error = false }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-marrom-escuro">Sua nota <span aria-hidden="true">*</span></legend>
      <div className="mt-2 flex gap-1" onMouseLeave={() => setHovered(0)}>
        {[1, 2, 3, 4, 5].map((star) => {
          const highlighted = (hovered || value) >= star;
          return (
            <label key={star} className="cursor-pointer rounded-md p-1 focus-within:outline focus-within:outline-2 focus-within:outline-vermelho">
              <input className="sr-only" type="radio" name="estrelas" value={star} checked={value === star} onChange={() => onChange(star)} onMouseEnter={() => setHovered(star)} aria-label={`${star} ${star === 1 ? "estrela" : "estrelas"}`} />
              <Star size={28} aria-hidden="true" fill={highlighted ? "currentColor" : "none"} className={highlighted ? "text-dourado" : "text-marrom-escuro/30"} />
            </label>
          );
        })}
      </div>
      <p className={`mt-1 text-xs ${error ? "text-vermelho" : "text-marrom-escuro/60"}`} aria-live="polite">{value ? `${value} ${value === 1 ? "estrela selecionada" : "estrelas selecionadas"}` : "Selecione de 1 a 5 estrelas"}</p>
    </fieldset>
  );
}
