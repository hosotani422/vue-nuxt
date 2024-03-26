import path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

export default defineConfig(() => ({
  test: {
    globals: true,
    include: [`test/vitest/unit/**/*.test.ts`],
    environment: `happy-dom`,
    alias: {
      "@": path.join(__dirname, `../../src`),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [`vue`, `pinia`, `vue-router`],
      dts: false,
    }),
    Components({
      dirs: [`./src/components`],
      directoryAsNamespace: true,
      dts: false,
    }),
    {
      name: `findByTestId`,
      config: () => ({
        test: {
          setupFiles: [`test/vitest/plugin/findByTestId.ts`],
        },
      }),
    },
  ],
}));
