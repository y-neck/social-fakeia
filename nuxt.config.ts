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
  ssr: false,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "de" /* Set lang attribute on <html> tag */,
      },
      meta: [
        {
          name: "description",
          content:
            "Diese Website ist als multimediales Projekt im Rahmen meiner Bachelorarbeit zum Thema (Audio-) visuelle Desinformation auf Social-Media-Plattformen in der Schweiz im Studiengang Multimedia Production an der Fachhochschule Graubünden entstanden. Sie soll dir helfen, visuelle und audiovisuelle Desinformation besser erkennen und einordnen zu können.",
        },
        {
          name: "og:description",
          content:
            "Diese Website ist als multimediales Projekt im Rahmen meiner Bachelorarbeit zum Thema (Audio-) visuelle Desinformation auf Social-Media-Plattformen in der Schweiz im Studiengang Multimedia Production an der Fachhochschule Graubünden entstanden. Sie soll dir helfen, visuelle und audiovisuelle Desinformation besser erkennen und einordnen zu können.",
        },
        {
          name: "og:image",
          content: "/img/favicon_text.webp",
        },
        {
          name: "og:image:alt",
          content: "Social Fakeia",
        },
        { name: "creator", content: "Yannick Spriessler" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
      script: [
        // Matomo Tracking Code
        {
          hid: "matomo", // Unique identifier for the script
          innerHTML: `
            var _paq = window._paq = window._paq || [];

              // accurately measure the time spent in the visit
              _paq.push(['enableHeartBeatTimer']);

            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
              _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
              _paq.push(["setDoNotTrack", true]);
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="//analytix.neckxproductions.ch/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '2']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
              console.log('matomo loaded');
              `,
          type: "text/javascript",
        },
      ],
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
  modules: [
    "shadcn-nuxt",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/sitemap",
    "@nuxtjs/partytown",
  ],
  /* Shadcn-vue: shadcn-vue.com/docs/components/ */
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
  /* Nuxt UI: https://ui.nuxt.com/ */
  ui: {
    colorMode: false,
  },
  /* Nuxt Sitemap: https://nuxtseo.com/docs/sitemap/getting-started/introduction */
  site: {
    url: "",
    name: "Social Fakeia",
  },
});
