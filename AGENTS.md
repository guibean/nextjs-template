# AGENTS.md

Este repositório é o **perfil Site Estático**. O objetivo é landing page, site institucional, portfólio ou blog, somente front-end, publicado como arquivos estáticos.

## Regra de perfil

Antes de instalar qualquer coisa, classifique o pedido:

- **Site estático:** landing page, site institucional, portfólio, blog, página de campanha. Use este repositório. Não adicione banco, ORM, autenticação, Server Actions persistentes ou dependências de back-end.
- **Sistema full stack:** login, cadastro, painel, banco, dados por usuário, upload, cobrança ou API própria. Pare e use o perfil full stack. Não transforme este template em full stack.
- **Dúvida:** pergunte antes de instalar. Um formulário de contato via Cloudflare Function e Resend não torna o projeto full stack.

## Stack

- Next.js 16 com App Router e `output: "export"`
- React 19
- TypeScript 5.9
- Tailwind CSS 4
- shadcn/ui com **Base UI**
- Aceternity UI como registry opcional de blocos animados
- Biome para lint e formatação
- pnpm 12 e Node 24 LTS

## Comandos

```bash
pnpm dev
pnpm images
pnpm build
pnpm typecheck
pnpm lint
pnpm lint:fix
pnpm exec shadcn add <componente>
pnpm exec shadcn add @aceternity/<componente>
```

## Regras de implementação

1. Não instale componentes shadcn preventivamente. Use `components.json` e o CLI. Componentes já presentes: button, card, input, label e textarea.
2. Prefira componentes nativos e HTML semântico. Use `motion` apenas quando um bloco Aceternity exigir.
3. Preserve `src/lib/site.ts`, `src/lib/metadata.ts`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `manifest.ts` e `llms.txt`. Toda página deve ter título, descrição, canonical e um único `h1`.
4. Toda imagem raster entra em `assets/images/` e é processada por `pnpm images`. Use `next/image` com `sizes`; `priority` está depreciado no Next 16, use `preload` apenas no LCP.
5. Não habilite `dangerouslyAllowSVG` nem o otimizador padrão de imagens no export estático.
6. Conteúdo deve ser renderizado no HTML sempre que possível. Evite depender de JavaScript para texto principal.
7. Não adicione analytics com cookies sem atualizar a política de privacidade e prever consentimento.
8. Segredos ficam apenas em variáveis do Cloudflare. Nunca use `NEXT_PUBLIC_` para chaves privadas.
9. O formulário usa Turnstile, validação dupla e Resend. Não troque por `mailto:` silencioso ou API key no cliente.
10. Antes de concluir: `pnpm lint`, `pnpm typecheck` e `pnpm build` precisam passar.

## SEO e IA

- `NEXT_PUBLIC_SITE_URL` deve ser o domínio final, com HTTPS e sem barra final.
- Atualize `siteConfig` e o conteúdo de exemplo.
- Sitemap e robots são gerados no build. `llms.txt` é uma rota estática.
- FAQs visíveis devem ter JSON-LD correspondente.
- Não prometa citação por IA. `llms.txt` é convenção emergente, não padrão garantido.

## Deploy

- Site estático: Cloudflare Pages, build `pnpm build`, diretório `out`.
- Functions em `functions/api/contact.ts` são detectadas pelo Cloudflare Pages.
- Configure os secrets no painel do Cloudflare, não no repositório.

## Skills e MCP

- `.opencode/skills/site-estatico/SKILL.md`: criar e evoluir sites neste perfil.
- `.opencode/skills/sistema-fullstack/SKILL.md`: encaminhar pedidos que exigem back-end para `guibean/nextjs-fullstack-template`.
- `.agents/skills/shadcn/SKILL.md`: skill oficial do shadcn, instalada localmente.
- `opencode.json`: MCP do shadcn. Consulte componentes e docs antes de escrever UI nova.
- Em outro projeto, rode `pnpm exec shadcn mcp init --client opencode` e `pnpm dlx skills add shadcn/ui --agent opencode -y`.
