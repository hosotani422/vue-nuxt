const refer: {
  init: typeof store.state;
  timeoutId: number;
  callback: () => void;
} = {
  init: {
    open: false,
    message: ``,
    button: ``,
  },
  timeoutId: 0,
  callback: () => ``,
};

const useStore = defineStore(`notice`, () => {
  const state: {
    open: boolean;
    message: string;
    button: string;
  } = reactive(refer.init);

  const handle = {
    open: (arg: {
      message: typeof state.message;
      button: typeof state.button;
      callback: typeof refer.callback;
    }): void => {
      state.open = true;
      state.message = arg.message;
      state.button = arg.button;
      refer.callback = arg.callback;
      clearTimeout(refer.timeoutId);
      refer.timeoutId = setTimeout(() => {
        handle.close();
      }, 3000) as unknown as number;
    },
    close: (): void => {
      state.open = false;
    },
  };

  return { state, handle };
});

const store = useStore(createPinia());

export default { refer, state: store.state, handle: store.handle };
