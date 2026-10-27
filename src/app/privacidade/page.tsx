import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Política de privacidade",
  description: "Como os dados enviados pelo formulário de contato são tratados.",
  path: "/privacidade",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Privacidade
      </p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
        Política de privacidade
      </h1>
      <p className="mt-5 text-sm leading-6 text-muted-foreground">
        Última atualização: outubro de 2026. Este texto é um modelo e deve ser revisado antes da
        publicação.
      </p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground">Quais dados coletamos</h2>
          <p className="mt-2">
            Ao enviar o formulário de contato, recebemos nome, e-mail, mensagem e a confirmação de
            consentimento. Também podem ser processados dados técnicos de segurança, como o token do
            Cloudflare Turnstile, para bloquear envios automatizados.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">Por que usamos os dados</h2>
          <p className="mt-2">
            Usamos essas informações apenas para responder à sua mensagem e entender o contexto do
            contato. Não vendemos dados pessoais e não os usamos para publicidade.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">Compartilhamento</h2>
          <p className="mt-2">
            O envio pode passar por provedores de infraestrutura e e-mail, como Cloudflare e Resend,
            estritamente para entregar a mensagem. Cada provedor trata os dados conforme seus
            próprios termos e políticas.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">Retenção e direitos</h2>
          <p className="mt-2">
            Mantemos as mensagens pelo tempo necessário para atender ao contato. Você pode solicitar
            acesso, correção ou exclusão dos seus dados pelo e-mail{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground">Cookies e analytics</h2>
          <p className="mt-2">
            Esta base não instala cookies de analytics por padrão. Se ferramentas forem adicionadas,
            esta política deve ser atualizada antes da publicação.
          </p>
        </section>
      </div>

      <Link
        href="/"
        className="mt-12 inline-flex text-sm font-medium underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        Voltar para o início
      </Link>
    </article>
  );
}
