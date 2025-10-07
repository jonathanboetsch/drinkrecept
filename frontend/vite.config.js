import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const isNetlify = !!env.NETLIFY;
	return {
		plugins: [react()],
		base: isNetlify ? "/" : "/drinkrecept/",
	};
});
