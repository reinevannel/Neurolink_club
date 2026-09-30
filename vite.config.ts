import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@tanstack/react-router": fileURLToPath(new URL("./src/shims/router.tsx", import.meta.url)),
      "@tanstack/react-query": fileURLToPath(new URL("./src/shims/query.tsx", import.meta.url)),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 8080,
  },
  preview: {
    host: "127.0.0.1",
    port: 8080,
  },
});
