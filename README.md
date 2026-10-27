# Template de Site Estático

Template Next.js 16 para landing pages e sites institucionais, com foco em performance, SEO técnico, acessibilidade e leitura por agentes de IA.

- **Somente front-end**, exportado como HTML/CSS/JS
- **Next.js 16** com App Router e `output: "export"`
- **Tailwind CSS 4** e **shadcn/ui com Base UI**
- **Biome** para lint e formatação
- **Cloudflare Pages** para hospedagem
- **Turnstile + Resend** para formulário de contato
- Skills locais para OpenCode em `.opencode/skills/`

> Este repositório não inclui banco de dados, autenticação ou back-end persistente. Para sistemas completos, use [guibean/nextjs-fullstack-template](https://github.com/guibean/nextjs-fullstack-template).

## Repositórios

- **Site:** [guibean/nextjs-template](https://github.com/guibean/nextjs-template)
- **Sistema:** [guibean/nextjs-fullstack-template](https://github.com/guibean/nextjs-fullstack-template)

```bash
gh repo create meu-site --template guibean/nextjs-template --private --clone
gh repo create meu-sistema --template guibean/nextjs-fullstack-template --private --clone
```

## Requisitos

- Node.js 24 LTS
- pnpm 12 (`corepack enable`)

## Começar

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abra <http://localhost:3000>.

## Configuração

Preencha `.env.local`:

| Variável                         | Uso                                                                        |
| -------------------------------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Domínio final com HTTPS, sem barra no fim. Define canonical, sitemap e OG. |
| `NEXT_PUBLIC_SITE_NAME`          | Nome exibido no site e nos metadados.                                      |
| `NEXT_PUBLIC_SITE_AUTHOR`        | Autor/publisher.                                                           |
| `NEXT_PUBLIC_CONTACT_EMAIL`      | E-mail exibido no site e na política de privacidade.                       |
| `NEXT_PUBLIC_CONTACT_ENDPOINT`   | Padrão `/api/contact`; mantenha salvo se usar outra URL.                   |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Chave pública do widget Turnstile. Sem ela, o formulário fica desativado.  |
| `TURNSTILE_SECRET_KEY`           | Secret do Cloudflare Pages Function. Nunca use `NEXT_PUBLIC_`.             |
| `TURNSTILE_HOSTNAME`             | Hostname permitido no Turnstile, por exemplo `seudominio.com`.             |
| `RESEND_API_KEY`                 | Chave de envio do Resend.                                                  |
| `CONTACT_FROM_EMAIL`             | Remetente em domínio verificado no Resend.                                 |
| `CONTACT_TO_EMAIL`               | Caixa que recebe os contatos.                                              |
| `CONTACT_ALLOWED_ORIGIN`         | Origem permitida no POST, por exemplo `https://seudominio.com`.            |

Troque também o conteúdo de exemplo em `src/app/page.tsx` e os dados de `src/lib/site.ts`.

## Scripts

```bash
pnpm dev        # desenvolvimento
pnpm images     # gera AVIF e WebP em public/images
pnpm build      # gera o export estático em out/
pnpm start      # serve o build localmente
pnpm typecheck  # TypeScript
pnpm lint       # Biome
pnpm lint:fix   # Biome com correções
pnpm format     # formatação
```

`pnpm build` roda `pnpm images` antes do Next.

## Imagens

1. Coloque os originais em `assets/images/`.
2. Rode `pnpm images`.
3. Use os arquivos gerados em `public/images/` com `next/image`:

```tsx
import Image from "next/image";

<Image
  src="/images/hero-1600.avif"
  alt="Descrição objetiva"
  width={1600}
  height={900}
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="eager"
  fetchPriority="high"
/>;
```

Como o export estático não tem o otimizador do Next, `images.unoptimized` fica ativo. Use `preload`/`fetchPriority` apenas na imagem do LCP. Não habilite `dangerouslyAllowSVG`.

## Formulário de contato

O fluxo é:

```text
 navegador → /api/contact (Pages Function)
             → valida campos e origem
             → valida Turnstile no servidor
             → envia pelo Resend
```

1. Crie um domínio verificado no Resend e configure SPF, DKIM e DMARC.
2. Crie um widget Turnstile para o domínio.
3. No Cloudflare Pages, adicione as variáveis e secrets listadas acima.
4. Faça o deploy. Functions em `functions/api/contact.ts` são detectadas automaticamente.

O site não guarda mensagens em banco. O e-mail é o registro. O `Idempotency-Key` evita envio duplicado em retentativas.

Para testar localmente com Functions, use `wrangler pages dev out` após o build e configure `.dev.vars`.

## Deploy no Cloudflare Pages

| Configuração           | Valor                        |
| ---------------------- | ---------------------------- |
| Framework preset       | Next.js (Static HTML Export) |
| Build command          | `pnpm build`                 |
| Build output directory | `out`                        |
| Node version           | 24                           |

O arquivo `public/_headers` adiciona headers de segurança e cache. HSTS exige HTTPS e deve ser ativado apenas no domínio final.

## SEO e IA

- `src/lib/metadata.ts`: metadata, canonical, Open Graph e Twitter
- `src/app/sitemap.ts`: sitemap
- `src/app/robots.ts`: regras para buscadores e bots de IA
- `src/app/opengraph-image.tsx`: imagem OG gerada no build
- `src/app/llms.txt/route.ts`: resumo para agentes
- `src/components/json-ld.tsx`: JSON-LD tipado com `schema-dts`
- `src/app/manifest.ts`: manifest e ícone

Toda página nova precisa de `createMetadata`, entrada no sitemap e um único `h1`.

## shadcn/ui, Base UI e Aceternity

O projeto usa **Base UI** desde a inicialização. Componentes já instalados:

`button`, `card`, `input`, `label`, `textarea`.

Adicione apenas quando necessário:

```bash
pnpm exec shadcn add dialog
pnpm exec shadcn add @aceternity/spotlight
```

O registry `@aceternity` já está em `components.json`. Componentes Aceternity usam `motion` e devem ser revisados quanto a licença, peso e acessibilidade.

## Para agentes

- `AGENTS.md`: regra de decisão entre site e sistema, comandos e restrições.
- `opencode.json`: MCP oficial do shadcn para buscar e instalar componentes.
- `.agents/skills/shadcn/`: skill oficial do shadcn.
- `.opencode/skills/site-estatico/`: fluxo para criar e evoluir sites.
- `.opencode/skills/sistema-fullstack/`: encaminha pedidos com back-end para [guibean/nextjs-fullstack-template](https://github.com/guibean/nextjs-fullstack-template).
- `components.json`: contexto de componentes e registry.

Para usar as skills em qualquer projeto, copie-as para o diretório global:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.config\opencode\skills" | Out-Null
Copy-Item -Recurse .opencode\skills\* "$env:USERPROFILE\.config\opencode\skills\"
```

Depois chame com `@site-estatico` ou `@sistema-fullstack`. Mantenha o `AGENTS.md` no projeto para que a decisão de perfil viaje com o código.

## Qualidade

- CI em `.github/workflows/ci.yml`: lint, typecheck, build e Lighthouse
- Meta Lighthouse: 95+ em performance, acessibilidade, boas práticas e SEO
- Dependabot semanal, incluindo majors
