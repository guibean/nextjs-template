---
name: Sistema Full Stack Next.js
description: Cria e evolui sistemas com login, banco de dados, painel ou API própria no template guibean/nextjs-template, branch perfil/sistema-fullstack. Usa Next.js 16 standalone, PostgreSQL, Drizzle, Better Auth, Zod, Base UI e deploy em VPS.
---

# Sistema Full Stack Next.js

## Quando usar

Use para login, cadastro, painel, dados por usuário, upload, cobrança ou API própria. Para landing pages e sites institucionais, use a skill `site-estatico`.

## Criar um projeto

```bash
git clone --branch perfil/sistema-fullstack https://github.com/guibean/nextjs-template.git <slug>
cd <slug>
pnpm install
cp .env.example .env
```

Gere `BETTER_AUTH_SECRET` com `openssl rand -base64 48`, configure `DATABASE_URL` e rode:

```bash
pnpm db:migrate
pnpm dev
```

## Ordem de implementação

1. Modele dados, relações, permissões e ameaças.
2. Altere `src/db/schema.ts` e rode `pnpm db:generate`.
3. Aplique migrations com `pnpm db:migrate`.
4. Configure env em `src/env.ts`; não use fallback fora de `SKIP_ENV_VALIDATION`.
5. Implemente autenticação e autorização no servidor.
6. Valide toda entrada com Zod no servidor.
7. Adicione rate limit, logs, backup e observabilidade.
8. Só então construa a UI do painel.

## Regras de segurança

- Nunca exponha `DATABASE_URL`, `BETTER_AUTH_SECRET`, `RESEND_API_KEY` ou `TURNSTILE_SECRET_KEY`.
- Use `auth.api.getSession({ headers: await headers() })` em Server Components protegidos.
- Proteja também Route Handlers e Server Actions.
- Não confie em validação do cliente.
- Não use `output: "export"` quando houver auth, banco ou mutações.
- Em produção, ative verificação de e-mail, rate limit e recuperação de senha.

## Deploy na VPS

- Build com `pnpm build` e output `.next/standalone`.
- Dockerfile multi-stage incluso.
- Aplique migrations antes de trocar a versão.
- Use HTTPS, proxy reverso e processo gerenciado.
- Faça backup do PostgreSQL antes de migrations destrutivas.

## Checklist

- [ ] env validado
- [ ] migrations aplicadas
- [ ] login, logout e sessão testados
- [ ] rota protegida redireciona sem sessão
- [ ] API protegida rejeita sem sessão
- [ ] formulário com validação dupla
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build`
- [ ] Lighthouse ≥ 95 nas páginas públicas
- [ ] backups e rate limit definidos
