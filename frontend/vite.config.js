import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import process from "process";

// Add this import:
// import { configDefaults } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const prNumber = env.VITE_PR_NUMBER; // defined by GitHub Actions
  const ghPagesFlag = env.VITE_GH_PAGES;

  return {
    plugins: [react()],
    base: ghPagesFlag ? `/drinkrecept/pr-${prNumber}/` : "/",
    // Add this vitest config:
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: [],
    },
  };
});
