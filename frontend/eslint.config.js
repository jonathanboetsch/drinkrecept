// eslint.config.js

import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import vitest from "eslint-plugin-vitest";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
	globalIgnores(["dist", "node_modules"]),

	{
		files: ["**/*.{js,jsx}"],

		languageOptions: {
			parser: babelParser,
			parserOptions: {
				requireConfigFile: false,
				babelOptions: { presets: ["@babel/preset-react"] },
			},
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				...globals.browser,
				...vitest.environments.env.globals,
			},
		},

		plugins: {
			react,
			"react-hooks": reactHooks,
			reactRefresh,
			vitest,
		},

		rules: {
			// --- Base recommendations ---
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...vitest.configs.recommended.rules,

			// --- Disable anything Biome already handles ---
			curly: "off",
			eqeqeq: "off",
			quotes: "off",
			semi: "off",
			indent: "off",
			"no-mixed-spaces-and-tabs": "off",
			"comma-dangle": "off",
			"arrow-parens": "off",
			"no-trailing-spaces": "off",

			// --- React/Vitest specific rules that Biome doesn't cover ---
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"vitest/expect-expect": "warn",
			"vitest/no-disabled-tests": "warn",
			"no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
		},

		settings: {
			react: { version: "detect" },
		},
	},
]);
