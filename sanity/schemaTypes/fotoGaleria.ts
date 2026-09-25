import { defineField, defineType } from "sanity";

export const fotoGaleria = defineType({
  name: "fotoGaleria",
  title: "Foto da galeria",
  type: "document",
  fields: [
    defineField({
      name: "imagem",
      title: "Foto",
      type: "image",
      description: "Obrigatório. Selecione uma imagem ou envie uma foto do seu dispositivo.",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titulo",
      title: "Título da foto",
      type: "string",
      description: "Obrigatório. Dê um nome fácil de reconhecer, como ‘Ambiente da loja’.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      rows: 3,
      description: "Opcional. Conte brevemente o que a foto mostra.",
    }),
    defineField({
      name: "ordem",
      title: "Posição na galeria",
      type: "number",
      description: "Opcional. Números menores aparecem primeiro na galeria.",
    }),
  ],
  preview: {
    select: { title: "titulo", media: "imagem", subtitle: "ordem" },
  },
});
