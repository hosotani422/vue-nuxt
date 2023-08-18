import * as Dom from "@/utils/base/dom";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive(`focus`, (el) => {
    el.focus();
  });
  nuxtApp.vueApp.directive(`height`, (el) => {
    Dom.resize(el);
  });
});
