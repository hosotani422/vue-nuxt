import { StorybookConfig } from "@storybook/vue3-vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { mergeConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const config: StorybookConfig = {
  stories: [`./stories/**/*.stories.ts`],
  framework: `@storybook/vue3-vite`,
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import(`@tailwindcss/vite`);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
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
