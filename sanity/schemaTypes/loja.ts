import { defineField, defineType } from "sanity";

export const loja = defineType({
  name: "loja",
  title: "Loja",
  type: "document",
  fields: [
    defineField({
      name: "unidade",
      title: "Unidade",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cidadeEstado",
      title: "Cidade/Estado",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endereco",
      title: "Endereço",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "referencia",
      title: "Referência",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "horario",
      title: "Horário",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "avisoDestaque",
      title: "Aviso em destaque",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "servicosExclusivos",
      title: "Serviços exclusivos",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "googleMapsUrl",
      title: "URL do Google Maps",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: { title: "unidade", subtitle: "cidadeEstado" },
  },
});
