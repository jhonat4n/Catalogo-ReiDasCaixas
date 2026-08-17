# Changelog

Todas as mudanças relevantes deste projeto serão registradas neste arquivo.

## [Não lançado]

### Adicionado

- Catálogo conectado ao Sanity em `/catalogo`, com cards de produtos, busca, filtro por categoria e filtro por loja.
- Página inicial passa a exibir produtos marcados como destaque e usa `ImagePlaceholder` para itens sem foto.

- (2026-08-05) Header responsivo com navegação, menu mobile e seleção de WhatsApp por unidade, além de Footer com lojas, Instagram e links rápidos.


- Integração do Sanity CMS, Studio incorporado em `/studio`, schemas de produtos, lojas e categorias e consultas para o catálogo.
- Script idempotente para cadastrar as unidades Eldorado e BH Centro no Sanity.
- Paleta visual e tipografias base do catálogo; diretório público reservado para o logo.
- (2026-08-05) Componente reutilizável `ImagePlaceholder` com suporte a texto customizável, ícone de imagem e renderização de imagens reais via `next/image`.
- (2026-08-05) Dependência `lucide-react` para o ícone do placeholder.

## [0.1.0] - 2026-08-05

### Adicionado

- Estrutura inicial do catálogo institucional com Next.js 14, TypeScript, Tailwind CSS e ESLint.
- Configurações de desenvolvimento, documentação e regras de manutenção do repositório.
