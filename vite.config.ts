import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "chrome-extension://__MSG_@@extension_id__/",
  build: {
    rollupOptions: {
      input: {
        extension: "./index.html",
        "content-script": "./src/content-script/index.ts",
        "service-worker": "./src/service-worker/index.ts",
      },
      output: {
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
