import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import process from "process";

// Add this import:
// import { configDefaults } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isNetlify = !!env.NETLIFY;
  return {
    plugins: [react()],
    base: isNetlify ? "/" : "/drinkrecept/",
    // Add this vitest config:
    test: {
      environment: "jsdom",
      // Optionally, you can add globals: true if you want to use global test functions without importing them
      // globals: true,
      // ...configDefaults.test,
    },
  };
});
