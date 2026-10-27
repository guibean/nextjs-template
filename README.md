# Template Full Stack

Template Next.js 16 para sistemas completos, com autenticação, PostgreSQL, SEO e uma base pronta para agentes de IA.

- Next.js 16 com App Router e `output: "standalone"`
- React 19 e TypeScript
- Tailwind CSS 4 e shadcn/ui com **Base UI**
- PostgreSQL + Drizzle ORM
- Better Auth com e-mail e senha
- Zod 4 e `@t3-oss/env-nextjs`
- Biome + Lighthouse CI
- Dockerfile para VPS

> Este é o perfil **full stack**. Para landing pages e sites institucionais sem backend, use o perfil de site estático.

## Requisitos

- Node.js 24 LTS
- pnpm 12 (`corepack enable`)
- PostgreSQL 16+

## Começar

```bash
pnpm install
cp .env.example .env
pnpm db:migrate
pnpm dev
```

Gere um segredo forte para `BETTER_AUTH_SECRET`:

```bash
openssl rand -base64 48
```

## Variáveis

| Variável                         | Uso                                                        |
| -------------------------------- | ---------------------------------------------------------- |
| `DATABASE_URL`                   | Conexão PostgreSQL.                                        |
| `BETTER_AUTH_SECRET`             | Segredo de assinatura de sessão, mínimo 32 caracteres.     |
| `BETTER_AUTH_URL`                | URL pública do app, por exemplo `https://app.exemplo.com`. |
| `NEXT_PUBLIC_APP_URL`            | Mesma URL pública, usada em canonical e links.             |
| `NEXT_PUBLIC_SITE_NAME`          | Nome exibido.                                              |
| `NEXT_PUBLIC_SITE_AUTHOR`        | Autor/publisher.                                           |
| `NEXT_PUBLIC_CONTACT_EMAIL`      | E-mail público.                                            |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Chave pública do Turnstile.                                |
| `TURNSTILE_SECRET_KEY`           | Secret do Turnstile.                                       |
| `TURNSTILE_HOSTNAME`             | Hostname permitido.                                        |
| `RESEND_API_KEY`                 | Chave do Resend.                                           |
| `CONTACT_FROM_EMAIL`             | Remetente verificado no Resend.                            |
| `CONTACT_TO_EMAIL`               | Caixa que recebe contatos.                                 |
| `CONTACT_ALLOWED_ORIGIN`         | Origem permitida no POST.                                  |

O build valida o ambiente. Em CI, `SKIP_ENV_VALIDATION=1` usa valores de build sem conectar ao banco.

## Banco e migrations

O schema de autenticação fica em `src/db/schema.ts` e foi gerado pelo Better Auth.

```bash
pnpm auth:generate   # regenera o schema após adicionar plugins
pnpm db:generate     # cria migration SQL
pnpm db:migrate      # aplica migrations
pnpm db:studio       # abre o Drizzle Studio
```

Nunca edite migrations já aplicadas. Crie uma nova.

## Autenticação

- `/criar-conta`: cadastro
- `/entrar`: login
- `/painel`: área autenticada, protegida no servidor por `auth.api.getSession`
- `/api/auth/[...all]`: handler do Better Auth

O template usa verificação de e-mail desativada para facilitar o primeiro uso. Em produção, configure envio de e-mail, ative `requireEmailVerification`, adicione rate limit e recuperação de senha.

## Formulário de contato

O endpoint `src/app/api/contact/route.ts`:

1. valida origem e tamanho
2. valida campos e consentimento
3. verifica Turnstile no servidor
4. envia pelo Resend com `reply_to` e `Idempotency-Key`

Sem as variáveis do Resend/Turnstile, o endpoint responde `503` e o formulário fica desativado no cliente.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm typecheck
pnpm lint
pnpm lint:fix
pnpm images
```

## Deploy na VPS

### Build standalone

```bash
pnpm install --frozen-lockfile
pnpm db:migrate
pnpm build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
NODE_ENV=production node .next/standalone/server.js
```

Use systemd, PM2 ou Docker para manter o processo ativo. Coloque Nginx, Caddy ou Cloudflare na frente com HTTPS.

### Docker

```bash
docker build -t meu-sistema .
docker run --env-file .env -p 3000:3000 meu-sistema
```

O Dockerfile usa o output standalone e roda como usuário sem privilégios. Aplique migrations antes de subir a nova versão.

## SEO e IA

- metadata, canonical, Open Graph e Twitter
- sitemap, robots e manifest
- JSON-LD
- `llms.txt`
- áreas autenticadas com `noindex` e bloqueadas no `robots.ts`

## Componentes

Componentes Base UI instalados: button, card, input, label e textarea. Adicione sob demanda:

```bash
pnpm exec shadcn add dialog
pnpm exec shadcn add @aceternity/spotlight
```

O registry `@aceternity` já está configurado em `components.json`.

## Agentes de IA

- `AGENTS.md`: regra de decisão, stack e restrições.
- `opencode.json`: MCP oficial do shadcn para buscar e instalar componentes.
- `.agents/skills/shadcn/`: skill oficial do shadcn.
- `.opencode/skills/sistema-fullstack/`: fluxo deste perfil.
- `.opencode/skills/site-estatico/`: encaminha sites para o perfil estático.

Para usar as skills em qualquer projeto, copie-as para o diretório global:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.config\opencode\skills" | Out-Null
Copy-Item -Recurse .opencode\skills\* "$env:USERPROFILE\.config\opencode\skills\"
```

Depois chame com `@sistema-fullstack` ou `@site-estatico`. Mantenha `AGENTS.md` no projeto para que a decisão de perfil viaje com o código.

## Estrutura

```text
src/
  app/
    (público) page, privacidade
    entrar/, criar-conta/, painel/
    api/auth/[...all]/route.ts
    api/contact/route.ts
  db/
    index.ts
    schema.ts
  lib/
    auth.ts, auth-client.ts
  env.ts
drizzle/
functions removidas: este perfil usa Route Handlers do Next
```

## Antes de produção

- Ativar verificação de e-mail no Better Auth.
- Configurar backup do PostgreSQL.
- Configurar rate limit no login e no contato.
- Revisar logs, observabilidade e alertas.
- Revisar a política de privacidade.
- Rodar `pnpm lint`, `pnpm typecheck`, `pnpm build` e Lighthouse.
- Fazer deploy apenas com HTTPS e secrets fora do Git.
