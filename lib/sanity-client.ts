import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-02-19",
  useCdn: true,
});

export type ProdutoFilters = {
  unidade?: "Eldorado" | "BH Centro";
  categoria?: string;
};

const produtoProjection = `{
  _id,
  nome,
  "slug": slug.current,
  descricao,
  preco,
  imagens,
  disponivel,
  destaque,
  unidadesDisponiveis,
  "categoria": categoria->{ _id, nome, "slug": slug.current }
}`;

export async function getProdutos(filters: ProdutoFilters = {}) {
  const conditions = ["_type == 'produto'"];
  const params: Record<string, string> = {};

  if (filters.unidade) {
    conditions.push("$unidade in unidadesDisponiveis");
    params.unidade = filters.unidade;
  }

  if (filters.categoria) {
    conditions.push("categoria->slug.current == $categoria");
    params.categoria = filters.categoria;
  }

  return sanityClient.fetch(
    `*[${conditions.join(" && ")}] | order(nome asc) ${produtoProjection}`,
    params,
  );
}

export async function getProdutoBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == 'produto' && slug.current == $slug][0] ${produtoProjection}`,
    { slug },
  );
}

export async function getCategorias() {
  return sanityClient.fetch(
    `*[_type == 'categoria'] | order(nome asc) { _id, nome, "slug": slug.current }`,
  );
}

export async function getLojas() {
  return sanityClient.fetch(
    `*[_type == 'loja'] | order(unidade asc) {
      _id,
      unidade,
      cidadeEstado,
      endereco,
      referencia,
      whatsapp,
      horario,
      avisoDestaque,
      servicosExclusivos,
      googleMapsUrl
    }`,
  );
}
