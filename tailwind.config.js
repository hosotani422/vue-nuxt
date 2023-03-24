/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app.vue",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/components/**/*.vue",
    "./src/stores/**/*.ts",
    "./src/utils/**/*.ts",
  ],
  darkMode: 'class',
  presets: [
    require(`./src/assets/style/tailwind`),
  ],
}
