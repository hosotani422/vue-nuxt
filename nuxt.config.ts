import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  rootDir: `./`,
  buildDir: `.nuxt`,
  nitro: {
    output: {
      publicDir: `dist`,
    },
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
