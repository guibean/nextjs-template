import { spawn } from "node:child_process";
import { access, cp } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const standalone = path.join(root, ".next", "standalone");
const server = path.join(standalone, "server.js");

try {
  process.loadEnvFile(path.join(root, ".env"));
} catch {
  // Em produção as variáveis vêm do processo/container.
}

try {
  await access(server);
} catch {
  console.error("Build standalone não encontrado. Rode `pnpm build` primeiro.");
  process.exit(1);
}

await cp(path.join(root, "public"), path.join(standalone, "public"), {
  recursive: true,
  force: true,
});
await cp(path.join(root, ".next", "static"), path.join(standalone, ".next", "static"), {
  recursive: true,
  force: true,
});

const child = spawn(process.execPath, [server], {
  cwd: standalone,
  env: { ...process.env, PORT: process.env.PORT ?? "3000" },
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code) => process.exit(code ?? 0));
