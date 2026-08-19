import { defineField, defineType } from "sanity";

export const fotoGaleria = defineType({
  name: "fotoGaleria",
  title: "Foto da galeria",
  type: "document",
  fields: [
    defineField({
      name: "imagem",
      title: "Imagem",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ordem",
      title: "Ordem",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "titulo", media: "imagem", subtitle: "ordem" },
  },
});
