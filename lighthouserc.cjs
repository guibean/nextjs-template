module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3100/"],
      numberOfRuns: 3,
      startServerCommand: "pnpm start:next -p 3100",
      startServerReadyPattern: "Ready in",
      settings: {
        preset: "desktop",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
