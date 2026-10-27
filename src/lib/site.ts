import { env } from "@/env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  tagline: "Sistemas rápidos, seguros e prontos para crescer",
  description:
    "Template Next.js full stack com autenticação, PostgreSQL, SEO técnico e uma base pronta para agentes de IA.",
  url: env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, ""),
  locale: "pt_BR",
  lang: "pt-BR",
  email: env.NEXT_PUBLIC_CONTACT_EMAIL,
  author: env.NEXT_PUBLIC_SITE_AUTHOR,
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}
