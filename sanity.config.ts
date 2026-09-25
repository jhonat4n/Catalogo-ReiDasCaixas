import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { avaliacao } from "./sanity/schemaTypes/avaliacao";
import { dataset, projectId } from "./sanity/env";
import { categoria } from "./sanity/schemaTypes/categoria";
import { fotoGaleria } from "./sanity/schemaTypes/fotoGaleria";
import { loja } from "./sanity/schemaTypes/loja";
import { produto } from "./sanity/schemaTypes/produto";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem()
              .title("Produtos")
              .schemaType("produto")
              .child(S.documentTypeList("produto").title("Produtos")),
            S.listItem()
              .title("Galeria")
              .schemaType("fotoGaleria")
              .child(S.documentTypeList("fotoGaleria").title("Fotos da galeria")),
            ...S.documentTypeListItems().filter(
              (item) => !["produto", "fotoGaleria"].includes(item.getId() ?? ""),
            ),
          ]),
    }),
  ],
  schema: {
    types: [produto, loja, categoria, fotoGaleria, avaliacao],
  },
});
