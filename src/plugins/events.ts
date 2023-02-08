export default defineNuxtPlugin(() => {
  let timeoutId = 0;
  document.addEventListener(`touchstart`, (_event: Event): void => {
    timeoutId = window.setTimeout(() => {
      _event.target?.dispatchEvent(new CustomEvent(`touchlong`, {bubbles: true, detail: _event}));
      clearTimeout(timeoutId);
    }, 500);
  });
  document.addEventListener(`touchend`, (_event: Event): void => {
    clearTimeout(timeoutId);
  });
  document.addEventListener(`touchmove`, (_event: Event): void => {
    clearTimeout(timeoutId);
  });
});
