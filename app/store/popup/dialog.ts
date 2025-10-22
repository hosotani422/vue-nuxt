import app from "@/store/page/app";

const refer: {
  init: typeof store.state;
  callback: {
    ok?: () => void;
    cancel?: () => void;
  };
} = {
  init: {
    open: false,
    init: true,
    mode: `alert`,
    title: ``,
    message: ``,
    text: {
      value: ``,
      placeholder: ``,
      error: ``,
    },
    check: {
      all: false,
      sort: [],
      data: {},
    },
    radio: {
      none: false,
      select: ``,
      sort: [],
      data: {},
    },
    ok: ``,
    cancel: ``,
  },
  callback: {
    ok: () => ``,
    cancel: () => ``,
  },
};

const useStore = defineStore(`dialog`, () => {
  const state: {
    open: boolean;
    init: boolean;
    mode: `alert` | `confirm` | `text` | `check` | `radio`;
    title: string;
    message: string;
    text: {
      value: string;
      placeholder: string;
      error: string;
    };
    check: {
      all: boolean;
      sort: string[];
      data: {
        [K: string]: {
          check: boolean;
          title: string;
        };
      };
    };
    radio: {
      none: boolean;
      select: string;
      sort: string[];
      data: {
        [K: string]: {
          title: string;
        };
      };
    };
    ok?: string;
    cancel?: string;
  } = reactive(refer.init);

  const render = reactive({
    stateCheckAll: computed(() => (): boolean => {
      return Object.values(state.check!.data).reduce((last, current) => last && current.check, true);
    }),
    errorValidation: computed(() => (): string => {
      if (state.mode === `text`) {
        return app.refer.validation.empty().safeParse(state.text!.value).error?.issues[0]?.message || ``;
      } else if (state.mode === `radio`) {
        return app.refer.validation.empty().safeParse(state.radio!.select).error?.issues[0]?.message || ``;
      }
      return ``;
    }),
  });

  const handle = {
    open: (arg: {
      mode: typeof state.mode;
      title: typeof state.title;
      message: typeof state.message;
      text?: typeof state.text;
      check?: typeof state.check;
      radio?: typeof state.radio;
      ok?: typeof state.ok;
      cancel?: typeof state.cancel;
      callback?: typeof refer.callback;
    }): void => {
      state.init = true;
      state.open = true;
      state.mode = arg.mode;
      state.title = arg.title;
      state.message = arg.message;
      arg.text && (state.text = arg.text);
      arg.check && (state.check = arg.check);
      arg.radio && (state.radio = arg.radio);
      state.ok = arg.ok;
      state.cancel = arg.cancel;
      refer.callback = arg.callback!;
    },
    close: (): void => {
      state.open = false;
    },
    clickCheckAll: (arg: { check: boolean }): void => {
      Object.values(state.check!.data).forEach((data) => (data.check = arg.check));
    },
  };

  return { state, render, handle };
});

const store = useStore(createPinia());

export default { refer, state: store.state, render: store.render, handle: store.handle };
