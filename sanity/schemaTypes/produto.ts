import { defineField, defineType } from "sanity";

export const produto = defineType({
  name: "produto",
  title: "Produto",
  type: "document",
  fields: [
    defineField({
      name: "sku",
      title: "Código / SKU",
      type: "string",
      description: "Código usado para identificar a peça no catálogo e nos atendimentos via WhatsApp.",
      validation: (rule) => rule.custom(async (value, context) => {
        if (typeof value !== "string" || !value.trim()) return true;
        const client = context.getClient({ apiVersion: "2024-01-01" });
        const duplicate = await client.fetch<boolean>(
          `count(*[_type == "produto" && sku == $sku && _id != $id && _id != $draftId]) > 0`,
          { sku: value.trim(), id: context.document?._id, draftId: `drafts.${context.document?._id}` },
        );
        return duplicate ? "Este Código / SKU já está sendo usado por outro produto." : true;
      }),
    }),
    defineField({
      name: "unidadesDisponiveis",
      title: "Unidades disponíveis",
      type: "array",
      description: "Obrigatório. Marque pelo menos uma unidade onde este produto está disponível.",
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
      description: "Obrigatório. Este nome será exibido no catálogo.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Endereço do produto (slug)",
      type: "slug",
      description: "Obrigatório. Use Gerar para criar o endereço a partir do nome do produto.",
      options: { source: "nome", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "reference",
      description: "Obrigatório. Escolha uma categoria já cadastrada.",
      to: [{ type: "categoria" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      rows: 5,
      description: "Obrigatório. Explique os detalhes e características do produto.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "preco",
      title: "Preço",
      type: "number",
      description: "Opcional. Informe o preço em reais, sem digitar o símbolo R$.",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "imagens",
      title: "Fotos do produto",
      type: "array",
      description: "Opcional. Adicione uma ou mais fotos: use o botão deste campo para selecionar ou enviar imagens. Arraste cada foto para mudar a ordem.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Descrição da imagem (acessibilidade)",
              type: "string",
              description: "Descreva o que aparece na foto para pessoas que usam leitor de tela.",
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
    select: { title: "nome", media: "imagens.0", sku: "sku", categoria: "categoria.nome" },
    prepare({ title, media, sku, categoria }) {
      const details = [sku ? `Código: ${sku}` : undefined, categoria]
        .filter(Boolean)
        .join(" · ");
      return {
        title: title || "Produto sem nome",
        media,
        subtitle: details || "Sem código ou categoria informados",
      };
    },
  },
});
