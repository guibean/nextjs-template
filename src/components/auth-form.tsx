"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim();

    const result = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password });

    if (result.error) {
      setError(result.error.message ?? "Não foi possível concluir. Tente novamente.");
      setLoading(false);
      return;
    }

    router.push("/painel");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isSignUp ? (
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} />
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required maxLength={254} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          required
          minLength={10}
          maxLength={128}
        />
        {isSignUp ? (
          <p className="text-xs text-muted-foreground">Use pelo menos 10 caracteres.</p>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={loading} className="h-10 w-full">
        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        {loading ? "Aguarde..." : isSignUp ? "Criar conta" : "Entrar"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isSignUp ? "Já tem uma conta?" : "Ainda não tem conta?"}{" "}
        <Link
          href={isSignUp ? "/entrar" : "/criar-conta"}
          className="font-medium text-foreground underline underline-offset-4"
        >
          {isSignUp ? "Entrar" : "Criar conta"}
        </Link>
      </p>
    </form>
  );
}
