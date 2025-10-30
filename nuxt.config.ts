import path from "path";
import tailwindcss from "@tailwindcss/vite";

console.log(`hoge`, process.env.npm_lifecycle_event);

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
  modules: [`@pinia/nuxt`],
  imports: {
    presets: [
      {
        from: `pinia`,
        imports: [`createPinia`],
      },
    ],
  },
});
