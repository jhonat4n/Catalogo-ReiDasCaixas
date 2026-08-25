"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => setCanShare(Boolean(navigator.share)), []);

  const copyLink = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement("textarea");
        input.value = url;
        input.setAttribute("readonly", "true");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: `Confira este produto: ${title}`, url: window.location.href });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    await copyLink();
  };

  return <button type="button" onClick={share} aria-label={copied ? "Link do produto copiado" : `Compartilhar ${title}`} className="inline-flex items-center gap-2 rounded-full border border-dourado/50 bg-white px-4 py-2.5 text-marrom-escuro transition-colors hover:bg-creme">
    {copied ? <Check size={18} aria-hidden="true" /> : canShare ? <Share2 size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
    <span>{copied ? "Link copiado" : "Compartilhar"}</span>
  </button>;
}
