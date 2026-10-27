import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.resolve("assets/images");
const outputDir = path.resolve("public/images");
const widths = [480, 800, 1200, 1600];
const inputPattern = /\.(jpe?g|png|webp|avif)$/i;

try {
  await stat(sourceDir);
} catch {
  console.log("[images] assets/images não existe; nada para otimizar.");
  process.exit(0);
}

await mkdir(outputDir, { recursive: true });
const files = (await readdir(sourceDir)).filter((file) => inputPattern.test(file));

for (const file of files) {
  const input = path.join(sourceDir, file);
  const name = path.parse(file).name;
  const metadata = await sharp(input).metadata();
  const sourceWidth = metadata.width ?? 1600;

  for (const width of widths.filter((value) => value <= sourceWidth)) {
    const base = sharp(input).resize({ width, withoutEnlargement: true });

    await Promise.all([
      base
        .clone()
        .avif({ quality: 60, effort: 6 })
        .toFile(path.join(outputDir, `${name}-${width}.avif`)),
      base
        .clone()
        .webp({ quality: 72, effort: 5 })
        .toFile(path.join(outputDir, `${name}-${width}.webp`)),
    ]);
  }

  console.log(`[images] ${file} → ${widths.filter((value) => value <= sourceWidth).join(", ")}px`);
}

console.log(`[images] ${files.length} imagem(ns) processada(s) em public/images.`);
