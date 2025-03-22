import { config, DOMWrapper } from "@vue/test-utils";
import { VueWrapper } from "@vue/test-utils/dist/vueWrapper";

config.plugins.VueWrapper.install((wrapper: VueWrapper) => {
  return {
    findByTestId: <T extends Element>(testId: string): DOMWrapper<T> => {
      return wrapper.find<T>(`[data-testid='${testId}']`);
    },
    findByTestIdAll: <T extends Element>(testId: string): DOMWrapper<T>[] => {
      return wrapper.findAll<T>(`[data-testid='${testId}']`);
    },
  };
});
