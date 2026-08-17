# Catálogo Rei das Caixas

Catálogo institucional para consulta de embalagens e produtos da Rei das Caixas.

O projeto não inclui carrinho, checkout ou pagamentos.

## Desenvolvimento

Instale as dependências:

```bash
npm install
```

Inicie o servidor local:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Comandos

```bash
npm run lint
npm run build
```

## Sanity CMS

O Sanity Studio está disponível em [http://localhost:3000/studio](http://localhost:3000/studio).

Crie um projeto no [Sanity](https://www.sanity.io/) e copie o arquivo de ambiente:

```bash
Copy-Item .env.example .env.local
```

Preencha `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` em `.env.local`. O dataset padrão é `production`.

Para cadastrar as lojas iniciais, inclua também `SANITY_API_WRITE_TOKEN` (token com acesso de escrita) e execute:

```bash
npm run seed:lojas
```

## Documentação

Registros e documentos do projeto ficam em [docs/](docs/).

## Componentes

## Catálogo

A página `/catalogo` consulta produtos e categorias do Sanity e oferece busca por nome,
filtro por categoria e filtro por loja (Eldorado ou BH Centro). A página inicial exibe
produtos marcados como destaque no CMS; itens sem foto usam `ImagePlaceholder`.

O cabeçalho usa navegação com espaçamento responsivo, e a home apresenta o hero da
loja, atalhos para as duas unidades no WhatsApp e a faixa de diferenciais.

O Studio em `/studio` registra os tipos `produto`, `loja` e `categoria` no menu lateral.

Cada produto possui uma página própria em `/produto/[slug]`, com galeria, detalhes,
disponibilidade por unidade e contato direto pelo WhatsApp. O catálogo não possui
compra, carrinho ou checkout.

`components/Header.tsx` e `components/Footer.tsx` formam a navegação institucional responsiva, com contatos das unidades Eldorado e BH Centro.

`components/ImagePlaceholder.tsx` exibe o placeholder "Foto em breve" enquanto
uma imagem não está cadastrada e renderiza a imagem real com `next/image` quando
a prop `image` é fornecida. O texto pode ser personalizado pela prop `text`.
