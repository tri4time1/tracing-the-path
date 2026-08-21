import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "/tracing-the-path/",
  plugins: [react()],
  build: {
    outDir: "dist-github",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        episode: resolve(import.meta.dirname, "episode.html"),
        article: resolve(import.meta.dirname, "article.html"),
      },
    },
  },
});
