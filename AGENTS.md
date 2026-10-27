# AGENTS.md

Este repositório é o **perfil Full Stack**. O objetivo é um sistema com autenticação, banco de dados e deploy em VPS.

## Regra de perfil

Antes de instalar qualquer coisa, classifique o pedido:

- **Sistema full stack:** login, cadastro, painel, banco, dados por usuário, upload, cobrança ou API própria. Use esta branch.
- **Site estático:** landing page, site institucional, portfólio ou blog somente front-end. Use o perfil de site estático; não adicione Drizzle, auth ou banco aqui.
- **Dúvida:** pergunte antes de instalar.

## Stack

- Next.js 16 com App Router e `output: "standalone"`
- React 19
- TypeScript 5.9
- Tailwind CSS 4
- shadcn/ui com **Base UI**
- PostgreSQL + Drizzle ORM
- Better Auth
- Zod 4 + `@t3-oss/env-nextjs`
- Biome
- pnpm 12 e Node 24 LTS

## Comandos

```bash
pnpm dev
pnpm db:generate
pnpm db:migrate
pnpm db:studio
pnpm auth:generate
pnpm build
pnpm typecheck
pnpm lint
pnpm images
pnpm exec shadcn add <componente>
pnpm exec shadcn add @aceternity/<componente>
```

## Regras

1. Todo segredo fica no servidor. Nunca use `NEXT_PUBLIC_` para chave privada.
2. Toda entrada é validada no servidor. Validação no cliente é apenas UX.
3. Toda página protegida valida a sessão com `auth.api.getSession`.
4. Toda rota de API protegida valida a sessão individualmente.
5. Toda alteração de schema gera uma migration. Não edite migrations aplicadas.
6. Não use `output: "export"` neste perfil.
7. Não instale dependências de UI ou banco sem necessidade concreta.
8. Componentes shadcn entram sob demanda. Já existem button, card, input, label e textarea.
9. Preserve SEO nas páginas públicas: metadata, canonical, sitemap, robots, Open Graph, JSON-LD e `llms.txt`.
10. Áreas autenticadas devem ter `noindex`, `Cache-Control: private` e não entrar no sitemap.
11. Antes de concluir: `pnpm lint`, `pnpm typecheck` e `pnpm build`. Se houver banco, rode migrations e teste login/painel.
12. A branch de site estático nunca deve receber dependências de back-end.

## Segurança de produção

- Ativar verificação de e-mail no Better Auth.
- Adicionar rate limit em login, cadastro e contato.
- Configurar backup e retenção do PostgreSQL.
- Usar HTTPS, HSTS e proxy reverso.
- Revisar logs para não vazar dados sensíveis.
- Configurar rotação de segredo de sessão e das chaves Resend/Turnstile.

## Deploy

- GitHub para código e CI.
- VPS com Node.js 24, PostgreSQL e processo gerenciado.
- Build `pnpm build`, output `.next/standalone`.
- Dockerfile disponível na raiz.
- Migrations devem ser aplicadas antes de subir a nova versão.

## Skills e MCP

- `.opencode/skills/sistema-fullstack/SKILL.md`: fluxo deste perfil.
- `.opencode/skills/site-estatico/SKILL.md`: encaminha pedidos de site para o perfil estático.
- `.agents/skills/shadcn/SKILL.md`: skill oficial do shadcn, instalada localmente.
- `opencode.json`: MCP do shadcn. Use antes de escrever um componente novo.
- Instale o MCP e a skill em outros projetos com `pnpm exec shadcn mcp init --client opencode` e `pnpm dlx skills add shadcn/ui --agent opencode -y`.
