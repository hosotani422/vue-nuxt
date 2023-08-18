export default defineNuxtPlugin(() => {
  if (process.client) {
    let timeoutId = 0;
    document.addEventListener(`touchstart`, (event: Event): void => {
      timeoutId = setTimeout(() => {
        event.target?.dispatchEvent(new CustomEvent(`touchlong`, { bubbles: true, detail: event }));
        clearTimeout(timeoutId);
      }, 500) as unknown as number;
    });
    document.addEventListener(`touchend`, (): void => {
      clearTimeout(timeoutId);
    });
    document.addEventListener(`touchmove`, (): void => {
      clearTimeout(timeoutId);
    });
  }
});
