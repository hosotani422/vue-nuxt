export default defineNuxtPlugin(() => {
  if (process.client) {
    let timeoutId = 0;
    document.addEventListener(`touchstart`, (_event: Event): void => {
      timeoutId = setTimeout(() => {
        _event.target?.dispatchEvent(new CustomEvent(`touchlong`, {bubbles: true, detail: _event}));
        clearTimeout(timeoutId);
      }, 500) as unknown as number;
    });
    document.addEventListener(`touchend`, (_event: Event): void => {
      clearTimeout(timeoutId);
    });
    document.addEventListener(`touchmove`, (_event: Event): void => {
      clearTimeout(timeoutId);
    });
  }
});
