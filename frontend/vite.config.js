import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import process from "process";

// Add this import:
// import { configDefaults } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isNetlify = !!env.NETLIFY;
  const prNumber = process.env.PR_NUMBER; // defined by GitHub Actions
  return {
    plugins: [react()],
    base: isNetlify ? "/" : "/drinkrecept/pr-${prNumber}/",
    // Add this vitest config:
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: [],
    },
  };
});
