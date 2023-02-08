import constant from '@/utils/const';

export const variable: {
  callback: {
    ok?: () => void;
    cancel?: () => void;
  };
} = {
  callback: {
    ok: () => {},
    cancel: () => {},
  },
};

export const state: {
  open: boolean;
  mode: `alert` | `confirm` | `text` | `check` | `radio`;
  title: string;
  message: string;
  text: {
    value: string;
    placeholder: string;
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
  ok: string;
  cancel: string;
} = reactive(constant.init.dialog);

export const getter = reactive({
  stateCheckAll: computed(() => (): boolean => {
    for (const id of state.check.sort) {
      if (!state.check.data[id]!.check) {
        return false;
      }
    }
    return true;
  }),
});

export const action = {
  open: (payload: {
    mode: typeof state.mode; title: typeof state.title; message: typeof state.message;
    text?: typeof state.text; check?: typeof state.check; radio?: typeof state.radio;
    ok?: typeof state.ok; cancel?: typeof state.cancel; callback?: typeof variable.callback;}): void => {
    state.open = true;
    state.mode = payload.mode;
    state.title = payload.title;
    state.message = payload.message;
    payload.text && (state.text = payload.text);
    payload.check && (state.check = payload.check);
    payload.radio && (state.radio = payload.radio);
    payload.ok && (state.ok = payload.ok);
    payload.cancel && (state.cancel = payload.cancel);
    payload.callback?.ok && (variable.callback.ok = payload.callback.ok);
    payload.callback?.cancel && (variable.callback.cancel = payload.callback.cancel);
  },
  close: (): void => {
    state.open = false;
  },
  clickCheckAll: (payload: {event: Event;}): void => {
    for (const id of state.check.sort) {
      state.check.data[id]!.check = (payload.event.target as HTMLInputElement).checked;
    }
  },
};
