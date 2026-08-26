"use client";

import { useState } from "react";
import StarRating from "@/components/StarRating";

type Option = { _id: string; nome?: string; unidade?: string };
type ReviewFormProps = { products: Option[]; stores: Option[] };
type FormState = { nome: string; estrelas: number; comentario: string; produtoId: string; lojaId: string; website: string };

const initialState: FormState = { nome: "", estrelas: 0, comentario: "", produtoId: "", lojaId: "", website: "" };

export default function ReviewForm({ products, stores }: ReviewFormProps) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const update = (field: keyof FormState, value: string | number) => setForm((current) => ({ ...current, [field]: value }));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setSubmitting(true);
    try {
      const response = await fetch("/api/avaliacoes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result: unknown = await response.json();
      if (!response.ok) {
        const message = typeof result === "object" && result !== null && "error" in result && typeof result.error === "string" ? result.error : "Não foi possível enviar sua avaliação agora. Tente novamente em alguns instantes.";
        setStatus({ type: "error", message });
        return;
      }
      setForm(initialState);
      setStatus({ type: "success", message: "Obrigado pela sua avaliação! Ela foi enviada e poderá aparecer no site após nossa análise." });
    } catch {
      setStatus({ type: "error", message: "Não foi possível enviar sua avaliação agora. Tente novamente em alguns instantes." });
    } finally {
      setSubmitting(false);
    }
  }

  return <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-dourado/30 sm:p-8">
    <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update("website", event.target.value)} /></label></div>
    <div className="grid gap-6">
      <label className="text-sm font-semibold text-marrom-escuro">Nome <span aria-hidden="true">*</span><input required maxLength={100} value={form.nome} onChange={(event) => update("nome", event.target.value)} className="mt-2 w-full rounded-xl border border-dourado/50 bg-white px-4 py-3 font-normal outline-none focus:border-vermelho" /></label>
      <StarRating value={form.estrelas} onChange={(value) => update("estrelas", value)} error={status?.type === "error" && form.estrelas === 0} />
      <label className="text-sm font-semibold text-marrom-escuro">Comentário <span aria-hidden="true">*</span><textarea required maxLength={500} value={form.comentario} onChange={(event) => update("comentario", event.target.value)} rows={5} className="mt-2 w-full resize-y rounded-xl border border-dourado/50 bg-white px-4 py-3 font-normal outline-none focus:border-vermelho" /><span className="mt-1 block text-right text-xs font-normal text-marrom-escuro/55">{form.comentario.length}/500</span></label>
      <div className="grid gap-6 sm:grid-cols-2"><label className="text-sm font-semibold text-marrom-escuro">Produto <span className="font-normal text-marrom-escuro/60">(opcional)</span><select value={form.produtoId} onChange={(event) => update("produtoId", event.target.value)} className="mt-2 w-full rounded-xl border border-dourado/50 bg-white px-4 py-3 font-normal outline-none focus:border-vermelho"><option value="">Selecione um produto</option>{products.map((product) => <option key={product._id} value={product._id}>{product.nome}</option>)}</select></label><label className="text-sm font-semibold text-marrom-escuro">Unidade <span className="font-normal text-marrom-escuro/60">(opcional)</span><select value={form.lojaId} onChange={(event) => update("lojaId", event.target.value)} className="mt-2 w-full rounded-xl border border-dourado/50 bg-white px-4 py-3 font-normal outline-none focus:border-vermelho"><option value="">Selecione uma unidade</option>{stores.map((store) => <option key={store._id} value={store._id}>{store.unidade}</option>)}</select></label></div>
      {status && <p role={status.type === "error" ? "alert" : "status"} className={status.type === "error" ? "text-sm font-semibold text-vermelho" : "text-sm font-semibold text-whatsapp"}>{status.message}</p>}
      <button type="submit" disabled={submitting} className="rounded-full bg-marrom-escuro px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60">{submitting ? "Enviando..." : "Enviar avaliação"}</button>
    </div>
  </form>;
}
