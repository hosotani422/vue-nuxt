import path from "path";
import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  rootDir: `app`,
  buildDir: `../.nuxt`,
  nitro: {
    output: {
      dir: `../.output`,
      publicDir: `../dist`,
    },
  },
  app: {
    // GitHubPages反映時はリポジトリ名の追加が必要
    baseURL: process.env.npm_lifecycle_event === `generate` ? `/vue-nuxt/` : `/`,
    cdnURL: process.env.npm_lifecycle_event === `generate` ? `/vue-nuxt/` : `/`,
  },
  css: [`@/style/index.css`],
  components: {
    global: true,
    dirs: [`@/components`],
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, `app`),
      },
    },
    plugins: [tailwindcss()],
  },
  typescript: {
    shim: false,
  },
  modules: [
    `@pinia/nuxt`,
    `@vite-pwa/nuxt`,
    (_, nuxt) => {
      nuxt.hook("pwa:beforeBuildServiceWorker", (options) => {
        console.log("pwa:beforeBuildServiceWorker: ", options.base);
      });
    },
  ],
  imports: {
    presets: [
      {
        from: `pinia`,
        imports: [`createPinia`],
      },
    ],
  },
  devtools: {
    enabled: true,
  },
  pwa: {
    registerType: `autoUpdate`,
    manifest: {
      name: `Memotea`,
      short_name: `Memotea`,
      description: `メモ帳、TODOアプリ`,
      lang: `ja`,
      scope: process.env.npm_lifecycle_event === `generate` ? `/vue-nuxt/` : `/`,
      start_url: process.env.npm_lifecycle_event === `generate` ? `/vue-nuxt/` : `/`,
      display: `standalone`,
      theme_color: `#ffffff`,
      background_color: `#ffffff`,
      strategies: `injectManifest`,
      srcDir: `service-worker`,
      filename: `sw.ts`,
      icons: [
        {
          src: `pwa32.png`,
          sizes: `32x32`,
          type: `image/png`,
        },
        {
          src: `pwa64.png`,
          sizes: `64x64`,
          type: `image/png`,
        },
        {
          src: `pwa512.png`,
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
    workbox: {
      globPatterns: [`**/*.{js,css,html,png,svg,ico}`],
    },
    injectManifest: {
      globPatterns: [`**/*.{js,css,html,png,svg,ico}`],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    experimental: {
      includeAllowlist: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: `/`,
      navigateFallbackAllowlist: [/^\/$/],
      type: `module`,
    },
  },
});
