import { CalendarDays, Mail, ShieldCheck, UserRound } from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Painel",
  description: "Área autenticada do sistema.",
  path: "/painel",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/entrar");
  }

  const user = session.user;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Painel
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Olá, {user.name}.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Esta é uma área protegida por sessão no servidor.
          </p>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <UserRound className="size-5 text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-3 font-medium">Conta</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{user.name}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Mail className="size-5 text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-3 font-medium">E-mail</h2>
          </CardHeader>
          <CardContent>
            <p className="break-all text-sm text-muted-foreground">{user.email}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CalendarDays className="size-5 text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-3 font-medium">Criada em</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(user.createdAt)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <p>
          A sessão é validada com <code className="font-mono text-xs">auth.api.getSession</code> no
          Server Component. Rotas de API e Server Actions também precisam validar a sessão.
        </p>
      </div>
    </div>
  );
}
