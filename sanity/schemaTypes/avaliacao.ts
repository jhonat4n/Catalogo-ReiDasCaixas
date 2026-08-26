import { defineField, defineType } from "sanity";

export const avaliacao = defineType({
  name: "avaliacao",
  title: "Avaliação",
  type: "document",
  fields: [
    defineField({ name: "nome", title: "Nome do cliente", type: "string", validation: (rule) => rule.required().max(100) }),
    defineField({
      name: "estrelas",
      title: "Avaliação",
      type: "number",
      validation: (rule) => rule.required().min(1).max(5).integer(),
    }),
    defineField({ name: "comentario", title: "Comentário", type: "text", rows: 5, validation: (rule) => rule.required().max(500) }),
    defineField({ name: "produto", title: "Produto", type: "reference", to: [{ type: "produto" }] }),
    defineField({ name: "loja", title: "Unidade", type: "reference", to: [{ type: "loja" }] }),
    defineField({ name: "data", title: "Data da avaliação", type: "datetime" }),
    defineField({ name: "aprovada", title: "Aprovada para exibição", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "nome", estrelas: "estrelas", aprovada: "aprovada", produto: "produto.nome", loja: "loja.unidade", data: "data" },
    prepare({ title, estrelas, aprovada, produto, loja, data }) {
      const rating = typeof estrelas === "number" ? `${estrelas} estrela${estrelas === 1 ? "" : "s"}` : "Sem nota";
      const status = aprovada ? "Aprovada" : "Aguardando aprovação";
      const details = [status, produto, loja, data ? new Date(data).toLocaleDateString("pt-BR") : undefined].filter(Boolean).join(" · ");
      return { title: `${title || "Sem nome"} — ${rating}`, subtitle: details };
    },
  },
});
