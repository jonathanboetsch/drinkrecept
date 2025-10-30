import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Add this import:
// import { configDefaults } from "vitest/config";

export default defineConfig(() => {
  return {
    plugins: [react()],
    // Add this vitest config:
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["src/tests/setup.js"],
      exclude: ["tests", "node_modules", "dist"], // Ignore top-level tests folder
    },
    build: {
      outDir: "dist",
    },
  };
});
