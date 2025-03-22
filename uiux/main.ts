import { StorybookConfig } from "@storybook/vue3-vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { mergeConfig } from "vite";
import path from "path";

const config: StorybookConfig = {
  stories: [`./stories/**/*.stories.ts`],
  framework: `@storybook/vue3-vite`,
  addons: [`@storybook/addon-essentials`],
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import(`@tailwindcss/vite`);
    return {
      ...mergeConfig(config, {
        plugins: [
          vue(),
          tailwindcss(),
          AutoImport({
            imports: [`vue`, `pinia`, `vue-router`],
            dts: false,
          }),
          Components({
            dirs: [`./app/components`],
            directoryAsNamespace: true,
            dts: false,
          }),
        ],
        resolve: {
          alias: {
            "@": path.resolve(__dirname, `../app`),
            "~": path.resolve(__dirname, `../app`),
          },
        },
      }),
      define: {
        ...config.define,
        "process.client": true,
      },
    };
  },
};

export default config;
