# Rei das Caixas Artesanato

Catálogo institucional da Rei das Caixas Artesanato, especializada em produtos de MDF,
caixas, peças decorativas, lembrancinhas e itens personalizados. O site é informativo:
não possui carrinho, checkout ou pagamentos.

## Rodar localmente

Requisitos: Node.js 20 ou superior.

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Preencha `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` no `.env.local`.
O dataset normalmente é `production`. Acesse <http://localhost:3000>.

Comandos de verificação e produção:

```bash
npm run lint
npm run build
npm start
```

## Sanity CMS e painel administrativo

O painel está incorporado em <http://localhost:3000/studio>. Os tipos disponíveis são
`produto`, `categoria` e `loja`.

Para cadastrar um produto:

1. Abra **Produto** no menu lateral e clique em criar.
2. Preencha nome, slug, categoria, descrição e, se aplicável, preço.
3. Em **Unidades disponíveis**, marque **Eldorado**, **BH Centro** ou ambas. Essa seleção
   controla os selos dos cards e os botões de WhatsApp da página do produto.
4. Em **Imagens**, faça upload das fotos reais quando estiverem prontas. Adicione o texto
   alternativo de cada foto e publique o documento. Enquanto não houver imagem publicada,
   o site mostra `ImagePlaceholder` com “Foto em breve”.
5. Marque **Destaque** para exibir o produto na seção de destaques da página inicial.

Para cadastrar fotos na galeria pelo Studio, abra **Foto da galeria**, crie um documento,
envie a imagem, informe o título (por exemplo, “Ambiente da loja”), adicione uma descrição
breve se desejar e publique. Use o campo **Ordem** para controlar a posição; números menores
aparecem primeiro. Sem fotos publicadas, `/galeria` mostra `ImagePlaceholder`; com fotos,
título e descrição ficam acessíveis por mouse, toque e em telas pequenas.

As lojas iniciais podem ser cadastradas de forma idempotente com um token de escrita:

```bash
$env:SANITY_API_WRITE_TOKEN="seu-token"
npm run seed:lojas
```

## Funcionalidades

As galerias de produtos podem ser ampliadas em um lightbox com navegação por teclado,
e as páginas de catálogo usam skeletons enquanto os produtos são carregados.

Produtos podem ser salvos como favoritos no navegador. A barra de favoritos permite
remover itens e enviar uma lista de pedido de orçamento para a unidade escolhida no
WhatsApp. Um botão flutuante de WhatsApp também fica disponível em todas as páginas.

As páginas `/galeria`, `/unidades`, `/faq` e `/contato` usam exclusivamente o layout
raiz da aplicação. Não crie layouts de rota que renderizem novos elementos `<html>` ou
`<body>`: no App Router isso produz HTML aninhado inválido e pode causar hydration
mismatch, inclusive fazendo o Header desaparecer após o carregamento do JavaScript.

O acordeão da FAQ e o grid da Galeria usam chaves determinísticas baseadas nos dados
fixos, e `StoreCard` mantém links independentes e HTML válido para os contatos.
A FAQ apresenta 13 perguntas, com a primeira resposta aberta por padrão e as demais
controladas pelo acordeão.

- Home com hero institucional, diferenciais e produtos marcados como destaque no Sanity.
- Catálogo em `/catalogo` com busca por nome, filtro por categoria e filtro por unidade.
- Categorias em `/categoria/[slug]` e detalhes em `/produto/[slug]`, com galeria, preço,
  disponibilidade e perguntas via WhatsApp.
- Páginas institucionais: `/sobre`, `/galeria`, `/faq`, `/contato` e `/unidades`.
- Serviço de corte e gravação a laser em `/corte-a-laser`, exclusivo da unidade Eldorado.
- `/unidades` com dados do Sanity, horários, avisos, rotas e mapas individuais.
- Sanity Studio em `/studio` para manutenção do catálogo.
- Layout responsivo, acessível, com foco visível, `next/image` e placeholders para fotos.
- WhatsApp das unidades Eldorado e BH Centro e Instagram `@rei_das_caixas`.
- Os selos de disponibilidade dos produtos são links individuais para o WhatsApp da
  unidade correspondente, com o nome do produto na mensagem pré-preenchida. Os números
  são carregados do campo `whatsapp` do schema `loja`. Os links usam o verde WhatsApp
  `#25D366`, com área de toque ampliada e destaque consistente no hover.

## Galeria

A rota `/galeria` consulta o schema `fotoGaleria` no Sanity, com upload, título, descrição
opcional e ordenação. As imagens têm zoom e overlay no desktop, enquanto o mobile mantém
as informações visíveis abaixo da imagem e permite alternar o overlay por toque.

## Deploy na Vercel

1. Faça push do repositório para o GitHub e importe o projeto em <https://vercel.com/new>.
2. Mantenha o preset **Next.js** e os comandos padrão (`npm run build`).
3. Em **Settings → Environment Variables**, adicione:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Se o seed for executado em um ambiente de CI, adicione também
   `SANITY_API_WRITE_TOKEN` como variável secreta. Nunca exponha esse token no navegador.
5. Faça o deploy. O Studio ficará disponível em `/studio` no domínio da Vercel.

O `next.config.mjs` já permite imagens remotas do CDN oficial do Sanity (`cdn.sanity.io`),
necessário para as fotos publicadas no CMS.

## Estrutura e documentação

- `app/`: páginas e rotas do site.
- `components/`: componentes reutilizáveis de navegação, catálogo, lojas e imagens.
- `sanity/`: variáveis e schemas do CMS.
- `lib/`: cliente Sanity, consultas e utilitários de imagem.
- `docs/CHANGELOG.md`: histórico cronológico das entregas.
