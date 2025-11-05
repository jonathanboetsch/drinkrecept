import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import process from "process";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const prNumber = env.VITE_PR_NUMBER; // defined by GitHub Actions
  const ghPagesFlag = env.VITE_GH_PAGES;

  return {
    plugins: [react()],
    base: ghPagesFlag ? `/drinkrecept/pr-${prNumber}/` : "/",
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["src/tests/setup.js"],
      exclude: ["tests", "node_modules", "dist", "e2e"], // Ignore top-level tests folder
    },
    server: {
      headers: {
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        // allows only external image sources
        "Content-Security-Policy":
          "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://grupp3-jynxa.reky.se; frame-ancestors 'none'; base-uri 'self'; object-src 'none';",
        "Referrer-Policy": "no-referrer", // prevents leaking of where the user came from
      },
    },
  };
});
