---
name: Sistema Full Stack Next.js
description: Use quando o pedido exigir login, cadastro, banco de dados, painel, cobrança, upload ou API própria. Encaminha para guibean/nextjs-fullstack-template e impede que dependências de back-end sejam instaladas no template de site estático.
---

# Sistema Full Stack Next.js

## Regra

Se o pedido envolver autenticação, banco de dados, dados por usuário, painel administrativo, cobrança, upload ou API própria, **não use o template de site estático**. Use o repositório full stack:

```bash
gh repo create <slug> --template guibean/nextjs-fullstack-template --private --clone
```

## Base

- Next.js 16 com App Router e `output: "standalone"`
- React 19 e TypeScript
- Tailwind CSS 4
- shadcn/ui com Base UI
- Drizzle ORM + PostgreSQL
- Better Auth
- Zod 4
- `@t3-oss/env-nextjs` para validar variáveis de ambiente
- Biome
- Deploy: GitHub + VPS com Node 24 e processo gerenciado

## Ordem de implementação

1. Modelar dados e ameaças antes de instalar ORM ou auth.
2. Configurar `src/env.ts`; o build deve falhar com variável ausente.
3. Criar schema Drizzle e migrations versionadas.
4. Configurar Better Auth e proteger rotas no servidor.
5. Validar toda entrada com Zod no servidor.
6. Adicionar observabilidade, backup e rate limit.
7. Só então construir UI de painel.

## Proibições

- Não expor segredo em `NEXT_PUBLIC_*`.
- Não confiar em validação do cliente.
- Não usar `output: "export"` quando houver autenticação ou banco.
- Não compartilhar o mesmo template do perfil estático se isso levar dependências de back-end para landing pages.
