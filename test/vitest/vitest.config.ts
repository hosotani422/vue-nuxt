import {defineConfig} from 'vitest/config';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig(() => ({
  test: {
    globals: true,
    include: [`test/vitest/unit/**/*.ts`],
    environment: `happy-dom`,
    coverage: {
      provider: `c8`,
      reportsDirectory: `./test/vitest/coverage`,
    },
  },
  resolve: {
    alias: {
      "@": `src`,
    },
  },
  plugins: [
    AutoImport({
      imports: [`vue`, `pinia`],
      dts: `test/vitest/auto-imports.d.ts`,
    }),
  ],
}));
