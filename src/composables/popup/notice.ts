import constant from '@/utils/const';

export const variable: {
  callback: () => void;
  timeoutId: number;
} = {
  callback: () => {},
  timeoutId: 0,
};

export const state: {
  open: boolean;
  message: string;
  button: string;
} = reactive(constant.init.notice);

export const action = {
  open: (payload: {message: typeof state.message;
    button: typeof state.button; callback: typeof variable.callback;}): void => {
    state.open = true;
    state.message = payload.message;
    state.button = payload.button;
    variable.callback = payload.callback;
    clearTimeout(variable.timeoutId);
    variable.timeoutId = window.setTimeout(() => {
      action.close();
    }, 3000);
  },
  close: (): void => {
    state.open = false;
  },
};
