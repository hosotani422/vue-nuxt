import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  rootDir: `./`,
  app: {
    baseURL: process.env.npm_lifecycle_event === `dev` ? `` : `/vue-nuxt/`,
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
