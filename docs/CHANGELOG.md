# Changelog

Todas as mudanças relevantes deste projeto são registradas aqui em ordem cronológica.

## [Não lançado]

### Alterações recentes

- (2026-08-19) Corrigido o hydration mismatch em `/galeria`, `/unidades`, `/faq` e
  `/contato`: removidos os layouts de rota que duplicavam `<html>` e `<body>`, deixando
  o layout raiz como a única árvore HTML. A causa era HTML inválido reparado pelo
  navegador antes da hidratação, o que afetava principalmente o Header. Também foi
  verificado que essas páginas não usam APIs de navegador ou valores aleatórios durante
  a renderização e que FAQ, Galeria e StoreCard usam chaves e nesting válidos.
- Revisão de acessibilidade: foco visível, alts descritivos, contraste reforçado e imagens com `next/image`.
- Metadata global e por rota, Open Graph, Twitter Card, Instagram social tags e favicon da marca.
- Páginas institucionais `/sobre`, `/galeria`, `/faq` e `/contato`; navegação atualizada para as novas rotas.
- Página `/unidades` e `StoreCard` com dados reais do Sanity, WhatsApp, horários, avisos e mapas individuais.
- Página `/corte-a-laser` com serviço exclusivo da unidade Eldorado.
- Página dinâmica `/produto/[slug]` com galeria, detalhes, disponibilidade por loja e WhatsApp.
- Catálogo em `/catalogo` com busca, filtros por categoria/unidade e cards de produtos.
- Home conectada ao Sanity para exibir produtos com `destaque: true`, hero institucional e `FeatureStrip`.
- Studio com os tipos `produto`, `loja` e `categoria` registrados explicitamente.
- Header responsivo com navegação espaçada, menu mobile, WhatsApp por unidade e Footer institucional.
- `.env.example`, documentação de desenvolvimento, Sanity Studio e deploy na Vercel.

## [0.1.0] - 2026-08-05

### Adicionado

- Estrutura inicial do catálogo institucional com Next.js 14, TypeScript, Tailwind CSS e ESLint.
- Integração do Sanity CMS, Studio incorporado em `/studio`, schemas de produtos, lojas e categorias e consultas para o catálogo.
- Script idempotente para cadastrar as unidades Eldorado e BH Centro no dataset.
- Identidade visual, tipografias, `ImagePlaceholder` reutilizável e dependência `lucide-react`.
