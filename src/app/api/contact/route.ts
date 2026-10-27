import { env } from "@/env";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  consent?: unknown;
  company?: unknown;
  turnstileToken?: unknown;
};

export const runtime = "nodejs";

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

const isText = (value: unknown, min: number, max: number) =>
  typeof value === "string" && value.trim().length >= min && value.trim().length <= max;

const isEmail = (value: unknown) =>
  typeof value === "string" && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("Origin");
  const expectedOrigin = env.CONTACT_ALLOWED_ORIGIN ?? requestOrigin;

  if (origin && origin !== expectedOrigin) {
    return json({ ok: false, error: "Origem não permitida." }, 403);
  }

  if (!request.headers.get("Content-Type")?.includes("application/json")) {
    return json({ ok: false, error: "Formato inválido." }, 415);
  }

  const contentLength = Number(request.headers.get("Content-Length") ?? "0");
  if (contentLength > 20_000) {
    return json({ ok: false, error: "Conteúdo muito grande." }, 413);
  }

  if (
    !env.TURNSTILE_SECRET_KEY ||
    !env.RESEND_API_KEY ||
    !env.CONTACT_FROM_EMAIL ||
    !env.CONTACT_TO_EMAIL
  ) {
    return json({ ok: false, error: "Formulário não configurado." }, 503);
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: "JSON inválido." }, 400);
  }

  if (typeof payload.company === "string" && payload.company.length > 0) {
    return json({ ok: true });
  }

  if (!isText(payload.name, 2, 100)) {
    return json({ ok: false, error: "Nome inválido." }, 400);
  }
  if (!isEmail(payload.email)) {
    return json({ ok: false, error: "E-mail inválido." }, 400);
  }
  if (!isText(payload.message, 10, 5_000)) {
    return json({ ok: false, error: "Mensagem inválida." }, 400);
  }
  if (payload.consent !== true) {
    return json({ ok: false, error: "Consentimento obrigatório." }, 400);
  }
  if (!isText(payload.turnstileToken, 10, 2_048)) {
    return json({ ok: false, error: "Verificação ausente." }, 400);
  }

  const turnstileBody = new FormData();
  turnstileBody.set("secret", env.TURNSTILE_SECRET_KEY);
  turnstileBody.set("response", String(payload.turnstileToken));

  const turnstileResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: turnstileBody,
      signal: AbortSignal.timeout(10_000),
    },
  );

  const turnstile = (await turnstileResponse.json()) as {
    success: boolean;
    action?: string;
    hostname?: string;
  };

  if (
    !turnstileResponse.ok ||
    !turnstile.success ||
    turnstile.action !== "contact" ||
    (env.TURNSTILE_HOSTNAME && turnstile.hostname !== env.TURNSTILE_HOSTNAME)
  ) {
    return json({ ok: false, error: "Verificação inválida." }, 403);
  }

  const idempotencyKey = request.headers.get("Idempotency-Key");
  const safeIdempotencyKey =
    idempotencyKey && /^[a-zA-Z0-9_-]{8,100}$/.test(idempotencyKey)
      ? idempotencyKey
      : crypto.randomUUID();

  const name = String(payload.name).trim();
  const email = String(payload.email).trim();
  const message = String(payload.message).trim();

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": safeIdempotencyKey,
      "User-Agent": "sistema-fullstack-contact/1.0",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: "Novo contato pelo site",
      text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!resendResponse.ok) {
    console.error("Resend error", resendResponse.status, await resendResponse.text());
    return json({ ok: false, error: "Não foi possível enviar agora." }, 502);
  }

  return json({ ok: true });
}
