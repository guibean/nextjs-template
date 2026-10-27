import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Criar conta",
  description: "Crie sua conta.",
  path: "/criar-conta",
  noIndex: true,
});

export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-5 py-16 sm:px-8">
      <Card className="w-full">
        <CardHeader className="border-b">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">Criar conta</h1>
          <p className="text-sm text-muted-foreground">
            Crie sua conta para acessar o painel do sistema.
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <AuthForm mode="sign-up" />
        </CardContent>
      </Card>
    </div>
  );
}
