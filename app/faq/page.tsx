"use client";

import { useState } from "react";

const faqs = [
  ["Posso comprar pelo site?", "No momento, o site funciona apenas como catálogo. Para consultar valores, disponibilidade ou fazer um pedido, entre em contato com uma das unidades pelo WhatsApp."],
  ["Os produtos têm preço no site?", "Alguns produtos podem exibir um valor de referência, mas o preço final pode variar conforme personalização, material e disponibilidade. O valor definitivo é sempre confirmado pelo WhatsApp."],
  ["Vocês fazem entrega?", "Consulte a disponibilidade de entrega diretamente com a unidade mais próxima pelo WhatsApp, pois as condições podem variar conforme a região e o produto."],
  ["Vocês reservam produtos pelo WhatsApp?", "Sim, você pode falar com a unidade desejada pelo WhatsApp para verificar a disponibilidade e combinar a reserva do produto."],
  ["Vocês fazem encomendas?", "Sim, fazemos encomendas de peças personalizadas, conforme material, prazo e viabilidade técnica. Fale com uma das unidades pelo WhatsApp para verificar seu pedido."],
  ["Qual é o prazo para encomendas?", "O prazo varia conforme o tipo de peça, a personalização solicitada e a demanda do momento. Consulte o prazo do seu pedido diretamente pelo WhatsApp."],
  ["Vocês fazem corte a laser?", "Sim, o corte e a gravação a laser são realizados presencialmente na unidade Eldorado, em MDF 3mm, MDF 6mm e acrílico 3mm, até 90cm x 60cm."],
  ["Quais materiais podem ser cortados?", "Trabalhamos com corte em MDF 3mm, MDF 6mm e acrílico 3mm, no tamanho máximo de 90cm x 60cm."],
  ["Vocês fazem gravação a laser?", "Sim, além do corte, também realizamos gravação a laser nesses mesmos materiais, na unidade Eldorado."],
  ["Preciso levar o arquivo pronto?", "Se você já tiver um arquivo digital do desenho ou logotipo, isso agiliza o atendimento. Caso não tenha, converse com o operador da máquina na unidade Eldorado para verificar as possibilidades."],
  ["O corte é feito na hora?", "Sim, o atendimento é presencial e por ordem de chegada, e o corte costuma ser feito na hora, conforme a demanda do momento."],
  ["Como é calculado o valor do corte a laser?", "O valor é calculado na hora pelo operador da máquina, considerando o material, o tamanho e a complexidade do corte ou gravação."],
  ["A loja abre domingos ou feriados?", "Não. As duas unidades funcionam de segunda a sábado, e ficam fechadas aos domingos e feriados."],
  ["Quais formas de pagamento são aceitas?", "As formas de pagamento podem variar entre as unidades. Consulte as opções disponíveis pelo WhatsApp ou no momento do atendimento presencial."],
] as const;

export default function FaqPage() {
  const [open, setOpen] = useState(0);
  return <main className="mx-auto max-w-4xl px-6 py-14 lg:px-10 lg:py-20"><p className="text-sm font-bold uppercase tracking-[0.18em] text-vermelho">Ajuda</p><h1 className="mt-3 font-titulo text-4xl font-bold text-marrom-escuro sm:text-5xl">Perguntas frequentes</h1><div className="mt-10 divide-y divide-dourado/30 rounded-3xl bg-white px-6 shadow-sm ring-1 ring-dourado/30">{faqs.map(([question, answer], index) => { const expanded = open === index; return <div key={question}><button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left font-bold text-marrom-escuro"><span>{question}</span><span className="text-2xl font-normal text-vermelho" aria-hidden="true">{expanded ? "−" : "+"}</span></button>{expanded && <p className="-mt-1 pb-5 pr-10 text-sm leading-7 text-marrom-escuro/75">{answer}</p>}</div>; })}</div></main>;
}
