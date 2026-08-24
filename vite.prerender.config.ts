import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, ".prerender"),
    emptyOutDir: true,
    ssr: resolve(__dirname, "static/prerender-entry.tsx"),
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: "prerender-entry.mjs",
      },
    },
  },
});
