import { defineField, defineType } from "sanity";

export const produto = defineType({
  name: "produto",
  title: "Produto",
  type: "document",
  fields: [
    defineField({
      name: "unidadesDisponiveis",
      title: "Unidades disponíveis",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["Eldorado", "BH Centro"],
        layout: "grid",
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "nome",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nome", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "reference",
      to: [{ type: "categoria" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "preco",
      title: "Preço",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "imagens",
      title: "Imagens",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "disponivel",
      title: "Disponível",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "destaque",
      title: "Destaque",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "nome", media: "imagens.0" },
  },
});
