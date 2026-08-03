import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Ignora arquivos que não devem ser analisados
  { ignores: ["node_modules/**", "package.json", "package-lock.json"] },

  // Configuração para JSON
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },

  // Configuração para CommonJS + estilo do tutorial
  {
    files: ["**/*.js"], // só aplica às suas fontes JS
    languageOptions: {
      sourceType: "commonjs",
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      "linebreak-style": ["error", "unix"],
      semi: ["error", "always"],
    },
  },
]);
