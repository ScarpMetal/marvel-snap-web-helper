import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: "./index.html",
        page: "./src/page/index.ts",
        background: "./src/background/index.ts",
      },
      output: {
        entryFileNames: "entry-[name].js",
      },
    },
  },
});
