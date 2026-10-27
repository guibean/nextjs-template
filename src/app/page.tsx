import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  Gauge,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import type { FAQPage, Organization, WebSite, WithContext } from "schema-dts";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "@/components/sections/contact-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { absoluteUrl, siteConfig } from "@/lib/site";

const features = [
  {
    icon: Gauge,
    title: "Performance por padrão",
    description:
      "HTML estático, JavaScript mínimo e imagens preparadas para carregar rápido em qualquer conexão.",
  },
  {
    icon: Search,
    title: "SEO técnico completo",
    description:
      "Metadata, canonical, sitemap, robots, Open Graph e dados estruturados configurados desde o início.",
  },
  {
    icon: Bot,
    title: "Preparado para IA",
    description:
      "Conteúdo semântico, respostas diretas e llms.txt para facilitar a leitura por assistentes e buscadores.",
  },
];

const steps = [
  {
    number: "01",
    title: "Defina o objetivo",
    description: "Uma página objetiva, com uma mensagem clara e um único próximo passo.",
  },
  {
    number: "02",
    title: "Construa a base",
    description: "Componentes acessíveis, conteúdo real e as fundações de SEO no lugar certo.",
  },
  {
    number: "03",
    title: "Meça e refine",
    description: "Core Web Vitals, Lighthouse e dados de uso para melhorar o que importa.",
  },
];

const faqs = [
  {
    question: "O site é realmente estático?",
    answer:
      "Sim. As páginas são geradas no build e publicadas como HTML, CSS e JavaScript. Isso reduz custo, remove servidor da equação e melhora o tempo de resposta.",
  },
  {
    question: "Como funciona o formulário de contato sem backend?",
    answer:
      "O site usa uma Function do Cloudflare para receber o formulário, validar o Turnstile e enviar o e-mail pelo Resend. Nenhuma chave secreta fica exposta no navegador.",
  },
  {
    question: "O site pode aparecer em buscas com IA?",
    answer:
      "A base inclui HTML semântico, dados estruturados, sitemap, robots e llms.txt. Isso melhora a descoberta e a leitura, mas a citação por ferramentas de IA não é garantida.",
  },
  {
    question: "Dá para adicionar páginas, blog e novos componentes?",
    answer:
      "Sim. A estrutura usa o App Router e componentes shadcn com Base UI. Novos componentes e páginas podem ser adicionados sem mudar a fundação.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organizacao"),
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.description,
} satisfies WithContext<Organization>;

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#site"),
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: siteConfig.lang,
  description: siteConfig.description,
  publisher: { "@id": absoluteUrl("/#organizacao") },
} satisfies WithContext<WebSite>;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
} satisfies WithContext<FAQPage>;

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema, faqSchema]} />

      <section className="relative isolate overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--border),transparent_35%)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border),transparent_35%)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_0%,black,transparent)]"
        />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Base pronta para sites profissionais
            </span>
            <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Seu próximo site começa com uma base feita para performance.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
              Uma landing page estática, acessível e preparada para SEO e IA. Sem dependências
              desnecessárias, com o essencial para publicar e crescer.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#contato"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Falar sobre um projeto
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="#recursos"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Ver o que está incluído
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
              <div>
                <dt className="text-xs text-muted-foreground">Meta Lighthouse</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight">95+</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Backend no site</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight">Zero</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Páginas estáticas</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight">SSG</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--foreground),transparent_90%),transparent_65%)] blur-2xl"
            />
            <Card className="border border-border/80 bg-card/80 shadow-2xl backdrop-blur">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-base font-medium leading-snug">
                      Diagnóstico do site
                    </h2>
                    <p className="text-sm text-muted-foreground">Última verificação</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    Aprovado
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Performance
                    </p>
                    <p className="mt-2 text-5xl font-semibold tracking-[-0.05em]">98</p>
                  </div>
                  <div className="grid size-20 place-items-center rounded-full border-[7px] border-emerald-500/20 border-t-emerald-500 text-sm font-semibold">
                    A
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    ["SEO", "100"],
                    ["Acessibilidade", "100"],
                    ["Boas práticas", "100"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="w-32 shrink-0 text-xs text-muted-foreground">{label}</span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <span
                          className="block h-full rounded-full bg-foreground"
                          style={{ width: `${value}%` }}
                        />
                      </span>
                      <span className="w-7 text-right font-mono text-xs">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
                  Headers, imagens e conteúdo revisados no build.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="recursos" className="scroll-mt-20 border-b border-border py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              O que está incluído
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              O essencial para publicar com confiança.
            </h2>
            <p className="mt-4 text-pretty leading-7 text-muted-foreground">
              Cada peça existe por um motivo: carregar rápido, ser encontrada e continuar fácil de
              manter.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="transition-colors hover:bg-muted/30">
                <CardHeader>
                  <span className="mb-3 grid size-10 place-items-center rounded-lg border border-border bg-background">
                    <feature.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-base font-medium leading-snug">
                    {feature.title}
                  </h3>
                  <p className="pt-1 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
          <ul className="mt-8 grid gap-x-8 gap-y-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Sitemap e robots",
              "Open Graph dinâmico",
              "Imagens em AVIF e WebP",
              "Acessibilidade por padrão",
              "Dados estruturados",
              "llms.txt",
              "Cloudflare Turnstile",
              "Zero banco de dados",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-foreground" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="processo" className="scroll-mt-20 border-b border-border py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Processo
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Menos etapas. Mais clareza.
            </h2>
            <p className="mt-4 max-w-md text-pretty leading-7 text-muted-foreground">
              Uma base enxuta deixa o trabalho concentrado no que o visitante vê e no que o negócio
              precisa.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
              <Zap className="size-4" aria-hidden="true" />
              Do primeiro commit ao deploy em minutos
            </div>
          </div>
          <ol className="divide-y divide-border border-y border-border">
            {steps.map((step) => (
              <li key={step.number} className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-xs text-muted-foreground">{step.number}</span>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="perguntas" className="scroll-mt-20 border-b border-border py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Perguntas frequentes
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              O que você precisa saber.
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-lg font-light transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Contato
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Vamos construir algo que carregue rápido.
            </h2>
            <p className="mt-4 max-w-md text-pretty leading-7 text-muted-foreground">
              Conte o objetivo, o prazo e o que já existe. Respondemos com os próximos passos.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-8 inline-flex text-sm font-medium underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {siteConfig.email}
            </a>
          </div>
          <Card>
            <CardContent className="pt-4">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
