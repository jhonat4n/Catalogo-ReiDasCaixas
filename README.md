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
`produto`, `categoria`, `loja`, `fotoGaleria` e `avaliacao`.

### Avaliações

A página `/avaliar` permite que clientes enviem nome, nota de 1 a 5 estrelas, comentário,
produto e unidade opcionais. O envio passa pela API server-side e cria a avaliação no
Sanity sempre com `aprovada: false`. O token privado `SANITY_API_WRITE_TOKEN` nunca é
enviado ao navegador e deve ser configurado como variável de ambiente na Vercel.

Para moderar uma avaliação, abra **Avaliação** no Studio, revise o comentário e altere
**Aprovada para exibição** para publicar ou manter o registro não aprovado. O pop-up do
site exibe somente avaliações aprovadas com 4 ou 5 estrelas, apenas em telas desktop;
notas de 1 a 3 continuam disponíveis no Studio para análise interna.

Para cadastrar um produto:

1. Abra **Produto** no menu lateral e clique em criar.
2. Preencha o **Código / SKU** manualmente, se desejar (por exemplo, `APL-0042`). O código
   identifica a peça no catálogo e nos atendimentos via WhatsApp e deve ser único.
3. Preencha nome, slug, categoria, descrição e, se aplicável, preço.
4. Em **Unidades disponíveis**, marque **Eldorado**, **BH Centro** ou ambas. Essa seleção
   controla os selos dos cards e os botões de WhatsApp da página do produto.
5. Em **Imagens**, faça upload das fotos reais quando estiverem prontas. Adicione o texto
   alternativo de cada foto e publique o documento. Enquanto não houver imagem publicada,
   o site mostra `ImagePlaceholder` com “Foto em breve”.
6. Marque **Destaque** para exibir o produto na seção de destaques da página inicial.

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

O site oferece tema claro e escuro pelo botão no final do Footer. Na primeira visita, a
preferência do sistema é respeitada; uma escolha manual é salva no navegador e permanece
ativa entre rotas e novas sessões. A implementação usa a classe `dark` do Tailwind e um
bootstrap inline no layout para evitar flash de tema incorreto durante o SSR.

Os cards entram na tela com uma animação discreta de scroll reveal, desativada quando o
navegador indica preferência por menos movimento. O site também oferece manifest PWA
básico para instalação na tela inicial, sem service worker offline.

As galerias de produtos podem ser ampliadas em um lightbox com navegação por teclado,
e as páginas de catálogo usam skeletons enquanto os produtos são carregados.

Produtos podem ser salvos como favoritos no navegador. A barra de favoritos permite
remover itens e enviar uma lista de pedido de orçamento para a unidade escolhida no
WhatsApp. Um botão flutuante de WhatsApp também fica disponível em todas as páginas.
Na página de detalhe, o botão “Compartilhar” usa o compartilhamento nativo do celular
ou copia o link do produto para a área de transferência.

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
  `#16803F`, com área de toque ampliada e destaque consistente no hover.

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
