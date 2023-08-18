import { StorybookConfig } from "@storybook/vue3-vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { mergeConfig } from "vite";
import path from "path";

const config: StorybookConfig = {
  framework: `@storybook/vue3-vite`,
  addons: [
    `@storybook/addon-essentials`,
    {
      name: `@storybook/addon-postcss`,
      options: {
        postcssLoaderOptions: {
          implementation: import(`postcss`),
        },
      },
    },
  ],
  stories: [`./stories/**/*.stories.ts`],
  viteFinal: (config) => ({
    ...mergeConfig(config, {
      plugins: [
        AutoImport({
          imports: [`vue`, `pinia`, `vue-router`],
          dts: false,
        }),
        Components({
          dirs: [`../src/components`],
          directoryAsNamespace: true,
          dts: false,
        }),
      ],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, `../../src`),
          "~": path.resolve(__dirname, `../../src`),
        },
      },
    }),
    define: {
      ...config.define,
      global: `window`,
      process: { client: true },
    },
  }),
};

export default config;
