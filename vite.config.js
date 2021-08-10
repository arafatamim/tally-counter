import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./public/manifest.json";
import path from "path";
import * as volar from "@volar/experimental/compiler";

export default defineConfig({
  plugins: [
    vue(volar.getVuePluginOptionsForVite()),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "script",
      manifest,
    }),
  ],
  resolve: {
    alias: {
      "/@": path.resolve(__dirname, "./src"),
    },
  },
});
