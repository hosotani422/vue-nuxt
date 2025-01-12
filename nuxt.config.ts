import path from "path";
import postcss from "./postcss.config.js";

export default defineNuxtConfig({
  ssr: true,
  rootDir: `app`,
  buildDir: `../.nuxt`,
  css: [`@/styles/tailwind.css`],
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
  postcss,
});
