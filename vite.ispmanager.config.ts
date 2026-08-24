import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  root: resolve(__dirname, "static"),
  publicDir: resolve(__dirname, "public"),
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "ispmanager-dist"),
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "static/index.html"),
        legal: resolve(__dirname, "static/legal/index.html"),
        privacy: resolve(__dirname, "static/privacy/index.html"),
      },
    },
  },
});
