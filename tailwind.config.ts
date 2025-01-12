import type { Config } from "tailwindcss";
import tailwind from "./app/styles/tailwind";

export default {
  content: {
    relative: true,
    files: [
      `./app/app.vue`,
      `./app/layouts/**/*.vue`,
      `./app/pages/**/*.vue`,
      `./app/components/**/*.vue`,
      `./app/stores/**/*.ts`,
    ],
  },
  darkMode: `class`,
  presets: [tailwind],
} satisfies Config;
