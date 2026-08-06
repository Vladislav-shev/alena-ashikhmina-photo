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
        kino: resolve(__dirname, "static/kino/index.html"),
        glianets: resolve(__dirname, "static/glianets/index.html"),
        kapsula: resolve(__dirname, "static/kapsula/index.html"),
        flash: resolve(__dirname, "static/flash/index.html"),
        archive2046: resolve(__dirname, "static/2046/index.html"),
        museum: resolve(__dirname, "static/museum/index.html"),
      },
    },
  },
});
