const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Nexo",
  tagline: "Sites rápidos, acessíveis e prontos para IA",
  description:
    "Template Next.js para sites estáticos com SEO técnico, performance e uma base pronta para agentes de IA.",
  url: rawUrl.replace(/\/+$/, ""),
  locale: "pt_BR",
  lang: "pt-BR",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contato@example.com",
  author: process.env.NEXT_PUBLIC_SITE_AUTHOR ?? "Nexo",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}
