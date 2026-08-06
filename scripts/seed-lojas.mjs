import { readFileSync } from "node:fs";

import { createClient } from "@sanity/client";

function loadEnvironment() {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const entry = line.trim();
    if (!entry || entry.startsWith("#")) continue;

    const separator = entry.indexOf("=");
    if (separator === -1) continue;

    const key = entry.slice(0, separator).trim();
    const value = entry.slice(separator + 1).trim().replace(/^(["'])(.*)\1$/, "$2");
    process.env[key] ??= value;
  }
}

loadEnvironment();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("Configure NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_WRITE_TOKEN em .env.local.");
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-02-19",
  useCdn: false,
});

const lojas = [
  {
    _id: "loja-eldorado",
    _type: "loja",
    unidade: "Eldorado",
    cidadeEstado: "Contagem - MG",
    endereco: "Av. João César de Oliveira, 2660, loja 209 - 2º andar - Eldorado, Contagem - MG, 32130-000",
    referencia: "Prédio ao lado da Pastelaria Fujyama",
    whatsapp: "31 99440-0481",
    horario: [
      "Segunda a sexta 08:30-18:00",
      "Sábado 08:00-13:00",
      "Domingos e feriados fechado",
    ],
    avisoDestaque: "Esta unidade realiza corte e gravação a laser presencialmente.",
    googleMapsUrl: "https://maps.app.goo.gl/pkcCKy1yrvEUrHtaA",
  },
  {
    _id: "loja-bh-centro",
    _type: "loja",
    unidade: "BH Centro",
    cidadeEstado: "Belo Horizonte - MG",
    endereco: "R. São Paulo, 656 - Lj C4 - Centro, Belo Horizonte - MG, 30170-130",
    whatsapp: "31 98223-9878",
    horario: [
      "Segunda a sexta 08:30-18:00",
      "Sábado 08:00-13:00",
      "Domingos e feriados fechado",
    ],
    avisoDestaque: "Atendimento presencial para consulta de produtos, disponibilidade, encomendas e retirada na loja.",
    googleMapsUrl: "https://maps.app.goo.gl/3dqWevErZicMkyRg7",
  },
];

await client.transaction(lojas.map((loja) => ({ createOrReplace: loja }))).commit();

console.log(`${lojas.length} lojas cadastradas no dataset ${dataset}.`);
