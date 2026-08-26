# Changelog

- (2026-08-26) Substituída a composição de imagens empilhadas do Hero por um carrossel
  automático com `MDF_boxes.jpeg` e `Caixas_de_MDF.jpeg`, incluindo autoplay de 5 segundos,
  indicadores, setas acessíveis, pausa ao passar o mouse e transição discreta.

- (2026-08-26) Substituído o placeholder do Hero da Home por uma composição responsiva
  com as imagens reais `MDF_boxes.jpeg` e `Caixas_de_MDF.jpeg`. O item `Avalie` foi
  reposicionado para depois de `Contato` nos menus desktop e mobile.

- (2026-08-26) Adicionado o sistema de avaliações integrado ao Sanity: schema `avaliacao`,
  formulário público em `/avaliar`, API server-side com honeypot e aprovação manual. O
  pop-up global exibe, no desktop, apenas avaliações aprovadas com 4 ou 5 estrelas,
  alternando avaliações com nome anonimizado, resumo do comentário e suporte a teclado,
  redução de movimento e fechamento manual. Notas de 1 a 3 permanecem armazenadas para
  análise interna e a variável privada `SANITY_API_WRITE_TOKEN` foi documentada.

- (2026-08-26) Alterado o título do catálogo para “Encontre sua peça ideal”. Adicionado o
  campo opcional e único **Código / SKU** ao schema de produtos, com definição manual no
  Sanity. O SKU é exibido no catálogo e na página do produto e incluído nas mensagens de
  WhatsApp de disponibilidade e de orçamento dos favoritos quando estiver disponível.

- (2026-08-25) Adicionado botão para compartilhar produtos por compartilhamento nativo
  ou cópia do link na página de detalhe.
- (2026-08-25) Restaurado o verde escuro `#16803F` nos botões e links de WhatsApp.
- (2026-08-25) Adicionado scroll reveal discreto aos cards, com respeito à preferência
  de redução de movimento, e manifest PWA básico usando a logo da marca.

- (2026-08-25) Adicionados lightbox acessível para a galeria de produtos e skeletons
  de carregamento para o catálogo e os destaques da página inicial.

- (2026-08-25) Adicionados favoritos persistentes no navegador, pedido de orçamento dos
  favoritos via WhatsApp e botão flutuante de contato para as duas unidades.

Todas as mudanças relevantes deste projeto são registradas aqui em ordem cronológica.

## [Não lançado]

### Alterações recentes

- (2026-08-25) Removida da FAQ a pergunta sobre reserva de produtos pelo WhatsApp e sua
  resposta, mantendo as 13 perguntas restantes e o funcionamento do acordeão, com a
  primeira pergunta aberta por padrão.
- (2026-08-19) Aumentado o tamanho dos links de disponibilidade por loja e aplicada a
  cor verde WhatsApp (`#25D366`) no fundo e no hover, facilitando o toque e mantendo a
  consistência visual com os demais botões de contato.
- (2026-08-19) Os selos de disponibilidade no catálogo e na página de produto agora
  funcionam como links independentes para cada unidade. Cada link usa o WhatsApp
  cadastrado no schema `loja` e abre uma mensagem pré-preenchida com o nome do produto.
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

- (2026-08-19) Adicionado o schema Sanity `fotoGaleria` com imagem, título, descrição e
  ordem. `/galeria` agora consulta fotos publicadas, ordena por ordem e usa
  `ImagePlaceholder` como fallback; fotos têm zoom/overlay no desktop e informação
  acessível no toque e em telas pequenas.
- (2026-08-19) Melhorado o feedback dos links de disponibilidade por loja com transição
  suave, escala no hover, sombra e estado pressionado para dispositivos touch.

## [0.1.0] - 2026-08-05

### Adicionado

- Estrutura inicial do catálogo institucional com Next.js 14, TypeScript, Tailwind CSS e ESLint.
- Integração do Sanity CMS, Studio incorporado em `/studio`, schemas de produtos, lojas e categorias e consultas para o catálogo.
- Script idempotente para cadastrar as unidades Eldorado e BH Centro no dataset.
- Identidade visual, tipografias, `ImagePlaceholder` reutilizável e dependência `lucide-react`.
