import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // O export estático não tem o otimizador do Next.
    // Rode `pnpm images` para gerar AVIF/WebP antes do build.
    unoptimized: true,
  },
};

export default nextConfig;
