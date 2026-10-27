import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Página não encontrada",
  description: "A página que você procura não existe ou foi movida.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center px-5 py-20 sm:px-8">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
        Esta página não existe.
      </h1>
      <p className="mt-4 max-w-md text-pretty leading-7 text-muted-foreground">
        O endereço pode ter mudado ou ter sido digitado incorretamente.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-10 items-center rounded-lg bg-foreground px-4 text-sm font-medium text-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
