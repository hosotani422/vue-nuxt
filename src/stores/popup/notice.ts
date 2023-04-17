import * as Pinia from 'pinia';
import constant from '@/utils/const';

const useStore = defineStore(`notice`, () => {
  const state: {
    open: boolean;
    message: string;
    button: string;
    callback: () => void;
    timeoutId: number;
  } = reactive(constant.init.notice);

  const action = {
    open: (payload: {message: typeof state.message;
      button: typeof state.button; callback: typeof state.callback;}): void => {
      state.open = true;
      state.message = payload.message;
      state.button = payload.button;
      state.callback = payload.callback;
      clearTimeout(state.timeoutId);
      state.timeoutId = setTimeout(() => {
        action.close();
      }, 3000) as unknown as number;
    },
    close: (): void => {
      state.open = false;
    },
  };

  return {state, action};
});

const store = useStore(Pinia.createPinia());

export default {state: store.state, action: store.action};
