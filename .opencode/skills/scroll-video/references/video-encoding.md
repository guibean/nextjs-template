# Preparação do vídeo e poster

## Especificação

- Container: MP4 H.264 (`yuv420p`) com `faststart`.
- Resolução: 1280×720 (720p), sem áudio.
- Frame rate: 24 fps.
- Duração: 6–10 s.
- Tamanho alvo: até 10 MB; ideal até 6 MB.
- Sem áudio. O vídeo é decorativo.

## ffmpeg

```bash
mkdir -p public/media assets/images

ffmpeg -i input.mp4 \
  -vf "scale=-2:720:flags=lanczos,fps=24" \
  -an \
  -c:v libx264 \
  -profile:v high \
  -pix_fmt yuv420p \
  -crf 23 \
  -preset slow \
  -g 6 -keyint_min 6 -sc_threshold 0 \
  -movflags +faststart \
  public/media/scene.mp4
```

Para scrubbing mais preciso, use keyframe em cada frame:

```bash
ffmpeg -i input.mp4 \
  -vf "scale=-2:720:flags=lanczos,fps=24" \
  -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 23 -preset slow \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -movflags +faststart \
  public/media/scene.mp4
```

`-g 1` aumenta muito o arquivo. Use só se o scrub estiver travando e o vídeo continuar dentro do limite de peso.

## Poster

Extraia um frame representativo:

```bash
ffmpeg -ss 0.2 -i input.mp4 -frames:v 1 assets/images/scene-poster.png
pnpm images
```

Use o arquivo gerado, por exemplo:

```text
/images/scene-poster-1600.avif
```

O poster deve representar o primeiro frame visível, não um frame aleatório.

## Cache

No site estático, adicione ao `public/_headers`:

```text
/media/*
  Cache-Control: public, max-age=31536000, immutable
```

## Se o arquivo ficar grande

1. Reduza a duração para 5–6 s.
2. Teste `-crf 26`.
3. Use 960×540 em vez de 1280×720.
4. Remova `-g 1`.
5. Se ainda ficar acima de ~10 MB, use Cloudflare Stream, Mux, Bunny ou R2 + CDN.

## CORS e vídeo remoto

Se usar CDN/storage, o host precisa permitir `GET` e expor `Content-Range` quando aplicável. Teste `currentTime` no Safari e no Chrome antes de publicar.
