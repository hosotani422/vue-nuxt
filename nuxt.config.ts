import path from "path";
import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // 静的ファイル生成時はSSR無効
  ssr: process.env.npm_lifecycle_event !== `generate`,
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
    baseURL: process.env.npm_lifecycle_event === `generate` ? `/vue-nuxt/` : ``,
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
  modules: [`@pinia/nuxt`, `@vite-pwa/nuxt`],
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
      scope: `/vue-nuxt/`,
      start_url: `/vue-nuxt/`,
      display: `standalone`,
      theme_color: `#ffffff`,
      background_color: `#ffffff`,
      icons: [
        {
          src: `favicon.png`,
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
    workbox: {
      globPatterns: [`**/*.{js,css,html,png,svg,ico}`],
      navigateFallback: `/`,
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: `module`,
    },
  },
});
