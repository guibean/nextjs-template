import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const skipValidation = process.env.SKIP_ENV_VALIDATION === "1";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    RESEND_API_KEY: z.string().min(1).optional(),
    CONTACT_FROM_EMAIL: z.email().optional(),
    CONTACT_TO_EMAIL: z.email().optional(),
    CONTACT_ALLOWED_ORIGIN: z.url().optional(),
    TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
    TURNSTILE_HOSTNAME: z.string().min(1).optional(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_SITE_NAME: z.string().min(1).default("Nexo"),
    NEXT_PUBLIC_SITE_AUTHOR: z.string().min(1).default("Nexo"),
    NEXT_PUBLIC_CONTACT_EMAIL: z.email(),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  },
  runtimeEnv: {
    DATABASE_URL:
      process.env.DATABASE_URL ??
      (skipValidation ? "postgres://postgres:postgres@localhost:5432/app" : undefined),
    BETTER_AUTH_SECRET:
      process.env.BETTER_AUTH_SECRET ??
      (skipValidation ? "build-only-secret-with-at-least-32-characters" : undefined),
    BETTER_AUTH_URL:
      process.env.BETTER_AUTH_URL ?? (skipValidation ? "http://localhost:3000" : undefined),
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_ALLOWED_ORIGIN: process.env.CONTACT_ALLOWED_ORIGIN,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    TURNSTILE_HOSTNAME: process.env.TURNSTILE_HOSTNAME,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL ?? (skipValidation ? "http://localhost:3000" : undefined),
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SITE_AUTHOR: process.env.NEXT_PUBLIC_SITE_AUTHOR,
    NEXT_PUBLIC_CONTACT_EMAIL:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? (skipValidation ? "contato@example.com" : undefined),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
  emptyStringAsUndefined: true,
  skipValidation,
});
