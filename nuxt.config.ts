import * as path from 'pathe';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  rootDir: `src`,
  buildDir: `../.nuxt`,
  css: [`@/assets/style/tailwind.css`],
  components: {
    global: true,
    dirs: [`@/components`],
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, `src`),
      },
    },
  },
  typescript: {
    shim: false,
  },
  modules: [`@pinia/nuxt`],
  pinia: {
    autoImports: [
      `defineStore`,
      [`defineStore`, `definePiniaStore`],
    ],
  },
  postcss: require(`./postcss.config.js`),
});
