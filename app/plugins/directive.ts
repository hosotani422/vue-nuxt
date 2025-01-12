export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive(`focus`, (el) => {
    el.focus();
  });
});
