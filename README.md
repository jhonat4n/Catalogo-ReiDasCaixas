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

## Documentação

Registros e documentos do projeto ficam em [docs/](docs/).
