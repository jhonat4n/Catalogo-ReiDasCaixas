import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity-client";
import { getSanityWriteClient } from "@/lib/sanity-server";

type ReviewBody = {
  nome?: unknown;
  estrelas?: unknown;
  comentario?: unknown;
  produtoId?: unknown;
  lojaId?: unknown;
  website?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;
const isReferenceId = (value: string) => /^[A-Za-z0-9._-]{1,200}$/.test(value);
const hasMarkup = (value: string) => /[<>]/.test(value);

export async function POST(request: Request) {
  let body: ReviewBody;
  try {
    const parsed: unknown = await request.json();
    if (!isRecord(parsed)) return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    body = parsed;
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ error: "Não foi possível enviar sua avaliação." }, { status: 400 });
  }

  const nome = typeof body.nome === "string" ? body.nome.trim() : "";
  const comentario = typeof body.comentario === "string" ? body.comentario.trim() : "";
  const estrelas = typeof body.estrelas === "number" ? body.estrelas : undefined;
  const produtoId = typeof body.produtoId === "string" ? body.produtoId.trim() : "";
  const lojaId = typeof body.lojaId === "string" ? body.lojaId.trim() : "";

  if (!nome || nome.length > 100 || hasMarkup(nome)) return NextResponse.json({ error: "Informe um nome válido." }, { status: 400 });
  if (estrelas === undefined || !Number.isInteger(estrelas) || estrelas < 1 || estrelas > 5) return NextResponse.json({ error: "Escolha uma nota entre 1 e 5 estrelas." }, { status: 400 });
  if (!comentario || comentario.length > 500 || hasMarkup(comentario)) return NextResponse.json({ error: "Escreva um comentário de até 500 caracteres." }, { status: 400 });
  if ((produtoId && !isReferenceId(produtoId)) || (lojaId && !isReferenceId(lojaId))) return NextResponse.json({ error: "Referência inválida." }, { status: 400 });

  try {
    const [validProduct, validStore] = await Promise.all([
      produtoId ? sanityClient.fetch<boolean>(`count(*[_type == 'produto' && _id == $id]) > 0`, { id: produtoId }) : true,
      lojaId ? sanityClient.fetch<boolean>(`count(*[_type == 'loja' && _id == $id]) > 0`, { id: lojaId }) : true,
    ]);
    if (!validProduct || !validStore) return NextResponse.json({ error: "Referência inválida." }, { status: 400 });

    const document: {
      _type: "avaliacao";
      nome: string;
      estrelas: number;
      comentario: string;
      data: string;
      aprovada: false;
      produto?: { _type: "reference"; _ref: string };
      loja?: { _type: "reference"; _ref: string };
    } = {
      _type: "avaliacao",
      nome,
      estrelas,
      comentario,
      data: new Date().toISOString(),
      aprovada: false,
      ...(produtoId ? { produto: { _type: "reference", _ref: produtoId } } : {}),
      ...(lojaId ? { loja: { _type: "reference", _ref: lojaId } } : {}),
    };
    await getSanityWriteClient().create(document);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Não foi possível enviar sua avaliação agora. Tente novamente em alguns instantes." }, { status: 500 });
  }
}
