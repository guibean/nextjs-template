# Checklist de SEO e IA

## Por página

- `title` único, objetivo e com no máximo ~60 caracteres
- `description` específica, com ~120–160 caracteres
- canonical absoluto
- Open Graph e Twitter Card
- um único `h1`
- headings em ordem
- conteúdo principal no HTML
- links internos descritivos
- `alt` em imagens informativas; `alt=""` em decorativas

## Site

- `NEXT_PUBLIC_SITE_URL` igual ao domínio final
- `app/sitemap.ts` com todas as páginas públicas
- `app/robots.ts` com sitemap
- `app/manifest.ts` e ícones
- `llms.txt` com descrição, páginas e contato
- JSON-LD apenas para conteúdo visível
- 404 com `noindex`
- HTTPS e headers em `public/_headers`

## Performance

- imagens geradas em AVIF e WebP por `pnpm images`
- `sizes` correto para cada breakpoint
- `preload` apenas na imagem candidata a LCP
- fontes com `next/font` e `display: swap`
- script de terceiro com `next/script` e estratégia tardia
- nenhum componente cliente sem necessidade
- sem animação que bloqueie a primeira renderização
- respeitar `prefers-reduced-motion`

## IA

- respostas curtas e diretas nas seções e FAQs
- dados factuais, sem promessas vagas
- JSON-LD FAQPage corresponde ao texto visível
- `robots.ts` permite explicitamente os bots desejados
- `llms.txt` não substitui SEO nem garante citação
