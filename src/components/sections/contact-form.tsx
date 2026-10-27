"use client";

import { Loader2, Send } from "lucide-react";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          action: string;
          theme: "auto";
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/api/contact";

export function ContactForm() {
  const [scriptReady, setScriptReady] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const widgetContainer = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const idempotency = useRef<{ signature: string; key: string } | null>(null);

  useEffect(() => {
    if (!turnstileSiteKey || !scriptReady || !widgetContainer.current || !window.turnstile) {
      return;
    }

    widgetId.current = window.turnstile.render(widgetContainer.current, {
      sitekey: turnstileSiteKey,
      action: "contact",
      theme: "auto",
      callback: setToken,
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });

    return () => {
      if (widgetId.current) {
        window.turnstile?.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [scriptReady]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!turnstileSiteKey) {
      setStatus("error");
      setFeedback("O formulário ainda não foi configurado. Envie um e-mail diretamente.");
      return;
    }

    if (!token) {
      setStatus("error");
      setFeedback("Confirme que você não é um robô antes de enviar.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      consent: data.get("consent") === "on",
      company: String(data.get("company") ?? ""),
      turnstileToken: token,
    };

    const signature = JSON.stringify({
      name: payload.name,
      email: payload.email,
      message: payload.message,
      consent: payload.consent,
    });

    if (idempotency.current?.signature !== signature) {
      idempotency.current = { signature, key: crypto.randomUUID() };
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotency.current.key,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15_000),
      });

      if (!response.ok) {
        throw new Error(`Falha ao enviar (${response.status})`);
      }

      formRef.current?.reset();
      idempotency.current = null;
      setToken("");
      if (widgetId.current) {
        window.turnstile?.reset(widgetId.current);
      }
      setStatus("success");
      setFeedback("Mensagem enviada. Responderemos no e-mail informado.");
    } catch {
      setStatus("error");
      setFeedback("Não foi possível enviar agora. Tente novamente ou envie um e-mail diretamente.");
      if (widgetId.current) {
        window.turnstile?.reset(widgetId.current);
      }
      setToken("");
    }
  }

  const submitting = status === "submitting";
  const configured = Boolean(turnstileSiteKey);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-describedby="form-status"
    >
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
          onReady={() => setScriptReady(true)}
        />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Seu nome"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="voce@empresa.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5_000}
          rows={5}
          placeholder="Conte brevemente o que você precisa."
        />
      </div>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <Label htmlFor="company">Empresa</Label>
        <Input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 rounded border-input accent-primary"
        />
        <span>
          Concordo com o uso dos meus dados para responder a este contato, conforme a{" "}
          <a
            href="/privacidade"
            className="font-medium text-foreground underline underline-offset-4"
          >
            política de privacidade
          </a>
          .
        </span>
      </label>

      {turnstileSiteKey ? <div ref={widgetContainer} /> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={submitting || !configured} className="h-10 px-4">
          {submitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {submitting ? "Enviando..." : "Enviar mensagem"}
        </Button>
        {!configured ? (
          <p className="text-xs text-muted-foreground">
            Configure as variáveis do Turnstile para ativar o envio.
          </p>
        ) : null}
      </div>

      <p
        id="form-status"
        role="status"
        aria-live="polite"
        className={
          status === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"
        }
      >
        {feedback}
      </p>
    </form>
  );
}
