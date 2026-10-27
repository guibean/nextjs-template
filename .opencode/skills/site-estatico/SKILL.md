---
name: Site Estático Next.js
description: Cria e evolui landing pages, sites institucionais, portfólios e blogs com o template guibean/nextjs-template. Use quando o pedido não exigir login, banco de dados ou back-end próprio. Inclui SEO, sitemap, llms.txt, imagens otimizadas e componentes shadcn com Base UI.
---

# Site Estático Next.js

## Quando usar

Use para landing page, site institucional, página de campanha, portfólio ou blog. O resultado é somente front-end, exportado como HTML/CSS/JS e publicado no Cloudflare Pages.

**Não use** quando houver login, cadastro, banco de dados, painel administrativo, cobrança, upload ou API própria. Nesses casos use a skill `sistema-fullstack`.

## Criar um projeto

1. Confirme nome, domínio final, objetivo da página e se existe formulário de contato.
2. Crie a partir do template. Se o repositório estiver marcado como template no GitHub:

```bash
gh repo create <slug> --template guibean/nextjs-template --private --clone
```

Se não estiver:

```bash
git clone https://github.com/guibean/nextjs-template.git <slug>
cd <slug>
git remote remove origin
git remote add origin https://github.com/guibean/<slug>.git
```

3. Crie `.env.local` a partir de `.env.example` e preencha `NEXT_PUBLIC_SITE_URL`, nome, autor e e-mail.
4. Rode `pnpm install`, `pnpm lint`, `pnpm typecheck` e `pnpm build`.
5. Só então altere o conteúdo.

## Regras

- Não adicione dependências de back-end.
- Instale componentes shadcn sob demanda:

```bash
pnpm exec shadcn add dialog
pnpm exec shadcn add @aceternity/spotlight
```

- Para blocos Aceternity, verifique a licença e instale `motion` apenas se o componente exigir.
- Mantenha um único `h1` por página e a hierarquia de headings.
- Toda página nova precisa de `createMetadata`, entrada no sitemap e link navegável.
- Use `next/image` com `sizes` e imagens processadas por `pnpm images`.
- Não use `output: "server"`, Server Actions ou API Routes do Next neste perfil.
- Formulário: preserve Turnstile + `functions/api/contact.ts` + Resend.

## Checklist antes de entregar

Leia `references/seo-checklist.md` e confirme:

- metadata, canonical, Open Graph e robots
- sitemap inclui todas as páginas públicas
- `llms.txt` atualizado
- imagens em `assets/images/` e `public/images/` geradas
- um `h1`, contraste, foco visível e navegação por teclado
- links externos com `rel` apropriado
- `pnpm lint`, `pnpm typecheck`, `pnpm build` passando
- Lighthouse ≥ 95 nas quatro categorias
- privacidade atualizada se houver formulário/analytics

## Deploy Cloudflare Pages

- Build command: `pnpm build`
- Output directory: `out`
- Node: 24
- Variáveis públicas no build e secrets nas Functions
- Configure o domínio em `NEXT_PUBLIC_SITE_URL`, `TURNSTILE_HOSTNAME` e `CONTACT_ALLOWED_ORIGIN`
