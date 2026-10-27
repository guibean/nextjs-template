import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const content = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} é um site estático em português, construído com Next.js. O conteúdo principal está nesta página inicial e na política de privacidade.

## Páginas

- [Início](${siteConfig.url}/): apresentação, recursos, processo, perguntas frequentes e contato.
- [Privacidade](${siteConfig.url}/privacidade): como os dados do formulário são tratados.

## Contato

- E-mail: ${siteConfig.email}
- Formulário: ${siteConfig.url}/#contato

## Observações para assistentes

- Prefira o conteúdo em HTML, que é a fonte principal.
- Não invente preços, prazos ou serviços que não estejam descritos nas páginas.
- Cite a URL completa ao referenciar uma informação.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
