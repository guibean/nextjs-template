---
name: Vídeo com Efeito Scroll
description: Use somente quando o usuário pedir explicitamente um vídeo controlado pelo scroll, no hero ou no meio da página. Instala GSAP apenas nesse caso e entrega uma seção com vídeo scrub, poster, fallback de movimento reduzido e fallback mobile. Não use para pedidos genéricos de "site bonito", parallax ou animação.
metadata:
  opencode/autoinvoke: false
---

# Vídeo com Efeito Scroll

## Regra de ativação

Só execute esta skill quando o pedido mencionar explicitamente algo como:

- "vídeo com efeito scroll"
- "vídeo que avança quando rola"
- "scroll video", "video scrubbing", "scrub de vídeo"
- "hero com vídeo controlado pelo scroll"
- "seção no meio da página com vídeo e scroll"

Não execute quando o pedido for apenas "site bonito", "animação", "parallax", "hero moderno" ou "scroll suave". Nesses casos, use CSS/scroll reveal leve ou componente já existente.

**Não instale** `gsap`, `@gsap/react`, `lenis` ou `motion` preventivamente. A instalação só acontece depois do pedido explícito.

## Referência

Referência visual: <https://github.com/Thakuma07/JeskoJets-ScrollAnimation>.

Ela **não possui arquivo de licença** e usa imagens em camadas, não vídeo. Use apenas como inspiração de composição (janela, profundidade, texto sobre cena). Não copie código, imagens, fontes ou assets. A implementação abaixo é original e usa vídeo.

## Dependências

Instale apenas:

```bash
pnpm add gsap @gsap/react
```

Não adicione `lenis`, `framer-motion` ou `motion` para este efeito. Só instale Lenis se o usuário pedir **também** scroll suave global, e nesse caso trate como uma decisão separada.

## Implementação

1. Coloque o vídeo e o poster em `public/media/`, ou use uma URL de streaming com CORS.
2. Gere o poster em AVIF/WebP e mantenha o vídeo em MP4 H.264, 720p, 24 fps, sem áudio.
3. Copie `references/scroll-video.tsx.txt` para `src/components/sections/scroll-video.tsx`.
4. Use o componente no hero ou no meio da página.
5. Rode lint, typecheck e build.
6. Teste desktop, mobile, teclado e `prefers-reduced-motion`.

## Uso

Hero:

```tsx
<ScrollVideo
  src="/media/hero.mp4"
  poster="/media/hero-poster.avif"
  eyebrow="Experiência"
  title="Entre em outra dimensão"
  description="Uma cena que responde ao seu scroll."
  headingLevel={1}
  priorityPoster
  preload="auto"
  frame
  scrollLength="280vh"
/>
```

Meio da página:

```tsx
<ScrollVideo
  src="/media/journey.mp4"
  poster="/media/journey-poster.avif"
  title="Cada detalhe revelado no tempo certo"
  headingLevel={2}
  scrollLength="220vh"
/>
```

Remova o `h1` antigo se o componente for o novo hero. Mantenha apenas um `h1` por página.

## Regras técnicas obrigatórias

- O vídeo é **decorativo**: `muted`, `playsInline`, sem controles, sem autoplay, `aria-hidden`.
- Use `preload="auto"` somente depois de decidir que o efeito é o LCP de uma cena controlada; caso contrário, use `metadata`.
- Poster é o fallback visual e deve ser otimizado. No hero, use `priorityPoster` com moderação.
- Não use áudio.
- Respeite `prefers-reduced-motion`: sem pin, sem scrub; mostra poster + conteúdo estático.
- Em mobile, reduza o comprimento de scroll ou use fallback estático. Não deixe uma seção de 300vh sem necessidade.
- A animação não pode bloquear a renderização inicial. GSAP entra em componente cliente.
- Não use `will-change` permanente em elementos grandes; limite ao container do vídeo.
- Não usar `ScrollTrigger` para pin quando `position: sticky` resolver. A implementação usa sticky.
- O vídeo não deve ser incluído no bundle JS. Fica em `public` ou storage/CDN.
- Teste o arquivo em conexão lenta. Se passar de ~10 MB, reduza duração/resolução ou use Cloudflare Stream/Mux.
- No site estático, adicione cache em `public/_headers` para `/media/*`.

## Arquivos de referência

- `references/scroll-video.tsx.txt`: componente pronto para copiar.
- `references/video-encoding.md`: ffmpeg, poster e limites de peso.
- `references/acceptance.md`: checklist de aceite e armadilhas.

## Critérios de aceite

- [ ] Só foi instalado depois de pedido explícito
- [ ] Nenhuma dependência de animação foi adicionada sem necessidade
- [ ] Um único `h1` na página
- [ ] Poster presente e otimizado
- [ ] Fallback para movimento reduzido
- [ ] Comportamento aceitável em mobile
- [ ] Sem autoplay com som
- [ ] Sem cópia de código/assets sem licença
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` passando
- [ ] Lighthouse não regrediu de forma relevante
