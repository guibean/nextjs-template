# Checklist de aceite e armadilhas

## Antes de instalar

- [ ] O usuário pediu explicitamente vídeo com efeito scroll?
- [ ] O vídeo será o hero ou uma seção do meio?
- [ ] Existe uma mídia real, com direitos de uso, ou o usuário vai fornecer?
- [ ] O peso estimado cabe na estratégia de hospedagem?
- [ ] Não existe outro vídeo/ScrollTrigger pesado na mesma página?

Se qualquer resposta for "não", não instale GSAP.

## Implementação

- [ ] `gsap` e `@gsap/react` instalados somente agora
- [ ] Nenhum `framer-motion`, `lenis` ou `motion` adicionado sem pedido
- [ ] Componente em `src/components/sections/scroll-video.tsx`
- [ ] Vídeo em `public/media/` ou CDN com CORS
- [ ] Poster AVIF/WebP gerado pelo pipeline
- [ ] Um único `h1`
- [ ] Texto legível sobre o vídeo em desktop e mobile
- [ ] `muted`, `playsInline`, sem controles, sem autoplay
- [ ] `aria-hidden` no vídeo decorativo
- [ ] `preload` escolhido conscientemente
- [ ] `prefers-reduced-motion` mostra poster/conteúdo estático
- [ ] Mobile tem comprimento de scroll menor ou fallback
- [ ] ScrollTrigger atualiza corretamente após resize
- [ ] Nenhum `ScrollTrigger` duplicado em Strict Mode
- [ ] Nenhum pin manual quando `sticky` resolve
- [ ] Nenhum asset do repositório de referência foi copiado
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` passando
- [ ] Lighthouse mobile não regrediu de forma relevante

## Testes manuais

1. Abra no Chrome desktop e role devagar.
2. Role rápido e confira se o vídeo acompanha sem travar.
3. Teste Safari/iOS. O `playsInline` e `muted` são obrigatórios.
4. Ative "reduzir movimento" no sistema e recarregue.
5. Emule 4G lento e verifique se o poster aparece antes do vídeo.
6. Navegue por teclado; o vídeo não deve roubar foco.
7. Redimensione a janela; o ScrollTrigger deve recalcular.
8. Volte para a seção e confira se o tempo do vídeo continua coerente.

## Armadilhas comuns

- Tentar animar `currentTime` antes de `loadedmetadata`: duração é `NaN`.
- Usar `autoPlay` sem `muted`: o navegador bloqueia.
- Colocar `overflow: hidden` em um ancestral do `sticky`: o sticky quebra.
- Criar múltiplos ScrollTriggers no mesmo vídeo.
- Usar vídeo de 30 MB no hero e perder LCP.
- Copiar o projeto de referência sem licença.
- Usar Lenis junto com ScrollTrigger sem atualizar o ScrollTrigger no scroll do Lenis.
- Esquecer o fallback de movimento reduzido.
