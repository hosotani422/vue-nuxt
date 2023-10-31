import tailwind from "./src/assets/style/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app.vue",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/components/**/*.vue",
    "./src/stores/**/*.ts",
    "./src/utils/**/*.ts",
  ],
  darkMode: "class",
  presets: [tailwind],
};
