import type { Thing, WithContext } from "schema-dts";

type JsonLdProps = {
  data: WithContext<Thing> | WithContext<Thing>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD controlado, serializado e com "<" escapado.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
