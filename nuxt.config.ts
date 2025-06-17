import tailwindcss from "@tailwindcss/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "de" /* Set lang attribute on <html> tag */,
      },
    },
  },
  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  vite: {
    plugins: [tailwindcss(), vueJsx()],
  },
  plugins: [
    "~/plugins/preamble.client.ts",
    "~/plugins/youtube-player.client.ts",
  ],
  modules: ["shadcn-nuxt", "@nuxt/image", "@nuxt/ui"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  ui: {
    colorMode: false,
  },
});
