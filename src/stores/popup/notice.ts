import * as Pinia from 'pinia';
import constant from '@/utils/const';

const prop: {
  callback: () => void;
  timeoutId: number;
} = {
  callback: () => {},
  timeoutId: 0,
};

const useStore = defineStore(`notice`, () => {
  const state: {
    open: boolean;
    message: string;
    button: string;
  } = reactive(constant.init.notice);

  const action = {
    open: (payload: {message: typeof state.message;
      button: typeof state.button; callback: typeof prop.callback;}): void => {
      state.open = true;
      state.message = payload.message;
      state.button = payload.button;
      prop.callback = payload.callback;
      clearTimeout(prop.timeoutId);
      prop.timeoutId = setTimeout(() => {
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

export default {prop, state: store.state, action: store.action};
