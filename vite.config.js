import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./public/manifest.json";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest,
    }),
  ],
  resolve: {
    alias: {
      "/@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: "8080",
  },
});
