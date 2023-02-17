import * as path from 'pathe';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  rootDir: `src`,
  buildDir: `../.nuxt`,
  css: [`@/assets/style/base/index.scss`],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/assets/style/const/index.scss';`,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, `src`),
      },
    },
  },
  typescript: {
    shim: false,
  },
});
