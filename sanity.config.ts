import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./sanity/env";
import { categoria } from "./sanity/schemaTypes/categoria";
import { loja } from "./sanity/schemaTypes/loja";
import { produto } from "./sanity/schemaTypes/produto";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: [produto, loja, categoria],
  },
});
