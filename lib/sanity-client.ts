import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export type ProdutoFilters = {
  unidade?: "Eldorado" | "BH Centro";
  categoria?: string;
};

export type StoreName = "Eldorado" | "BH Centro";

export type Produto = {
  _id: string;
  nome: string;
  slug: string;
  descricao?: string;
  preco?: number;
  imagens?: unknown[];
  disponivel?: boolean;
  destaque?: boolean;
  unidadesDisponiveis?: StoreName[];
  categoria?: { _id: string; nome: string; slug: string };
};

export type Loja = {
  _id: string;
  unidade: string;
  cidadeEstado: string;
  endereco: string;
  referencia?: string;
  whatsapp: string;
  horario: string[];
  avisoDestaque: string;
  servicosExclusivos?: string[];
  googleMapsUrl: string;
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

  return sanityClient.fetch<Produto[]>(
    `*[${conditions.join(" && ")}] | order(nome asc) ${produtoProjection}`,
    params,
  );
}

export async function getProdutoBySlug(slug: string) {
  return sanityClient.fetch<Produto | null>(
    `*[_type == 'produto' && slug.current == $slug][0] ${produtoProjection}`,
    { slug },
  );
}

export async function getCategorias() {
  return sanityClient.fetch<{ _id: string; nome: string; slug: string }[]>(
    `*[_type == 'categoria'] | order(nome asc) { _id, nome, "slug": slug.current }`,
  );
}

export async function getCategoriaBySlug(slug: string) {
  return sanityClient.fetch<{ _id: string; nome: string; slug: string } | null>(
    `*[_type == 'categoria' && slug.current == $slug][0] { _id, nome, "slug": slug.current }`,
    { slug },
  );
}

export async function getLojas() {
  return sanityClient.fetch<Loja[]>(
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
