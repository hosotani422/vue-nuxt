import * as Vue from 'vue';
import constant from '@/utils/const';
import * as Api from '@/api/api';
import * as app from '@/composables/page/app';
import * as list from '@/composables/page/list';
import * as sub from '@/composables/page/sub';
import * as conf from '@/composables/page/conf';
import * as dialog from '@/composables/popup/dialog';
import * as notice from '@/composables/popup/notice';

export const ref: {
  wrap?: Vue.Ref<Vue.ComponentPublicInstance<HTMLElement> | undefined>;
  items?: Vue.Ref<{[K: string]: Vue.ComponentPublicInstance<HTMLElement>;}>;
} = {};

export const variable: {
  drag: {
    status?: `start` | `move` | `end`;
    id?: string;
    y?: number;
    top?: number;
    left?: number;
    height?: number;
    width?: number;
    clone?: HTMLElement;
  };
} = {
  drag: {},
};

export const state: {
  data: {
    [K: string]: {
      sort: string[];
      data: {
        [K: string]: {
          check: boolean;
          title: string;
          task: boolean;
          date: string;
          time: string;
          alarm: string[];
        };
      };
    };
  };
  status: {[K: string]: string;};
} = reactive({
  data: constant.init.main,
  status: {},
});

export const getter = reactive({
  stateFull: computed(() => (listId?: string): typeof state[`data`][string] =>
    state.data[listId || app.getter.listId()]!),
  stateUnit: computed(() =>
    (listId?: string, mainId?: string): typeof state[`data`][string][`data`][string] =>
      state.data[listId || app.getter.listId()]!.data[mainId || app.getter.mainId()]!),
  classItem: computed(() =>
    (mainId: string): {[K in `select` | `check` | `edit` | `drag` | `hide`]: boolean;} => ({
      select: app.getter.mainId() === mainId,
      check: getter.stateUnit(``, mainId).check,
      edit: state.status[mainId] === `edit`,
      drag: state.status[mainId] === `drag`,
      hide: state.status[mainId] === `hide`,
    })),
  classLimit: computed(() => (mainId: string): {[K in `warn` | `error`]: boolean;} => {
    const unit = getter.stateUnit(``, mainId);
    const date = `${unit.date || `9999/99/99`} ${unit.time || `00:00`}`;
    return {
      warn: app.lib.dayjs(date).isBefore(app.lib.dayjs().add(2, `day`)),
      error: app.lib.dayjs(date).isBefore(app.lib.dayjs().add(1, `day`)),
    };
  }),
  textCount: computed(() => (mainId: string): string => {
    let count = 0;
    for (const subId of sub.getter.stateFull(``, mainId).sort) {
      !sub.getter.stateUnit(``, mainId, subId).check && ++count;
    }
    return `${count}/${sub.getter.stateFull(``, mainId).sort.length}`;
  }),
});

export const action = {
  initPage: async(): Promise<void> => {
    await action.loadItem();
  },
  actPage: (): void => {
    watch(
      () => app.lib.lodash.cloneDeep(state.data),
      () => {
        action.saveItem();
        conf.action.reactAlarm();
      },
      {deep: true},
    );
  },
  loadItem: async(): Promise<void> => {
    state.data = await Api.readMain();
  },
  saveItem: (): void => {
    Api.writeMain(state.data);
  },
  insertItem: (): void => {
    dialog.action.open({
      mode: `text`,
      title: app.getter.lang().dialog.title.insert,
      message: ``,
      text: {
        value: ``,
        placeholder: app.getter.lang().placeholder.main,
      },
      ok: app.getter.lang().button.ok,
      cancel: app.getter.lang().button.cancel,
      callback: {
        ok: () => {
          const mainId = `main${app.lib.dayjs().valueOf()}`;
          const subId = `sub${app.lib.dayjs().valueOf()}`;
          getter.stateFull().sort.unshift(mainId);
          getter.stateFull().data[mainId] = {
            check: false,
            title: dialog.state.text.value,
            date: ``,
            time: ``,
            alarm: [],
            task: true,
          };
          sub.state.data[app.getter.listId()]!.data[mainId] =
            {sort: [subId], data: {[subId]: {check: false, title: ``}}};
          dialog.action.close();
        },
        cancel: () => {
          dialog.action.close();
        },
      },
    });
  },
  copyItem: (payload: {event: Event; mainId: string;}): void => {
    const mainId = `main${app.lib.dayjs().valueOf()}`;
    getter.stateFull().sort.splice(getter.stateFull().sort.indexOf(payload.mainId) + 1, 0, mainId);
    getter.stateFull().data[mainId] = app.lib.lodash.cloneDeep(getter.stateUnit(``, payload.mainId));
    sub.state.data[app.getter.listId()]!.data[mainId] =
      app.lib.lodash.cloneDeep(sub.getter.stateFull(``, payload.mainId));
    delete state.status[payload.mainId];
    // 画面遷移キャンセル
    payload.event.stopPropagation();
  },
  moveItem: (payload: {event: Event; mainId: string;}): void => {
    dialog.action.open({
      mode: `radio`,
      title: app.getter.lang().dialog.title.move,
      message: ``,
      radio: {
        none: false,
        select: app.getter.listId(),
        sort: list.state.data.sort,
        data: list.state.data.data,
      },
      ok: app.getter.lang().button.ok,
      cancel: app.getter.lang().button.cancel,
      callback: {
        ok: () => {
          if (dialog.state.radio.select !== app.getter.listId()) {
            getter.stateFull(dialog.state.radio.select).sort.unshift(payload.mainId);
            getter.stateFull(dialog.state.radio.select).data[payload.mainId] =
              getter.stateUnit(``, payload.mainId);
            sub.state.data[dialog.state.radio.select]!.data[payload.mainId] =
              sub.getter.stateFull(``, payload.mainId);
            getter.stateFull().sort.splice(getter.stateFull().sort.indexOf(payload.mainId), 1);
            delete getter.stateFull().data[payload.mainId];
            delete sub.state.data[app.getter.listId()]!.data[payload.mainId];
          }
          delete state.status[payload.mainId];
          dialog.action.close();
        },
        cancel: () => {
          dialog.action.close();
          delete state.status[payload.mainId];
        },
      },
    });
    // 画面遷移キャンセル
    payload.event.stopPropagation();
  },
  deleteItem: (payload: {event: Event; mainId: string;}): void => {
    const backup = {
      main: app.lib.lodash.cloneDeep(state.data),
      sub: app.lib.lodash.cloneDeep(sub.state.data),
    };
    if (app.getter.listId() !== constant.base.id.trash) {
      getter.stateFull(constant.base.id.trash).sort.push(payload.mainId);
      getter.stateFull(constant.base.id.trash).data[payload.mainId] = getter.stateUnit(``, payload.mainId);
      sub.state.data[constant.base.id.trash]!.data[payload.mainId] = sub.getter.stateFull(``, payload.mainId);
    }
    getter.stateFull().sort.splice(getter.stateFull().sort.indexOf(payload.mainId), 1);
    delete getter.stateFull().data[payload.mainId];
    delete state.status[payload.mainId];
    delete sub.state.data[app.getter.listId()]!.data[payload.mainId];
    constant.sound.play(`warn`);
    notice.action.open({
      message: app.getter.lang().notice.message,
      button: app.getter.lang().notice.button,
      callback: () => {
        state.data = backup.main;
        sub.state.data = backup.sub;
        notice.action.close();
      },
    });
    // 画面遷移キャンセル
    payload.event.stopPropagation();
  },
  checkItem: (payload: {event: Event; mainId: string;}): void => {
    const target = payload.event.target as HTMLInputElement;
    getter.stateFull().sort.splice(getter.stateFull().sort.indexOf(payload.mainId), 1);
    getter.stateFull().sort[target.checked ? `push` : `unshift`](payload.mainId);
    getter.stateUnit(``, payload.mainId).check = target.checked;
    constant.sound.play(target.checked ? `ok` : `cancel`);
  },
  switchEdit: (payload?: {mainId: string;}): void => {
    for (const mainId of getter.stateFull().sort) {
      state.status[mainId] = mainId === payload?.mainId ? `edit` : ``;
    }
  },
  dragInit: (payload: {event: TouchEvent; mainId: string;}): void => {
    const item = ref.items!.value[payload.mainId]!.$el.getBoundingClientRect();
    variable.drag.status = `start`;
    variable.drag.id = payload.mainId;
    variable.drag.y = (payload.event.detail as unknown as TouchEvent).changedTouches[0]!.clientY;
    variable.drag.top = item.top;
    variable.drag.left = item.left;
    variable.drag.height = item.height;
    variable.drag.width = item.width;
    conf.state.data.vibrate && navigator.vibrate(40);
  },
  dragStart: (payload: {event: TouchEvent;}): void => {
    if (variable.drag.status === `start`) {
      variable.drag.status = `move`;
      variable.drag.clone = ref.items!.value[variable.drag.id!]!.$el.cloneNode(true) as HTMLElement;
      variable.drag.clone.style.position = `absolute`;
      variable.drag.clone.style.zIndex = `1`;
      variable.drag.clone.style.top = `${variable.drag.top}px`;
      variable.drag.clone.style.left = `${variable.drag.left}px`;
      variable.drag.clone.style.height = `${variable.drag.height}px`;
      variable.drag.clone.style.width = `${variable.drag.width}px`;
      ref.wrap!.value!.$el.appendChild(variable.drag.clone);
      state.status[variable.drag.id!] = `hide`;
      // スクロール解除
      payload.event.preventDefault();
    }
  },
  dragMove: (payload: {event: TouchEvent;}): void => {
    if (variable.drag.status === `move`) {
      variable.drag.clone!.style.top =
        `${variable.drag.top! + payload.event.changedTouches[0]!.clientY - variable.drag.y!}px`;
      const index = getter.stateFull().sort.indexOf(variable.drag.id!);
      const clone = variable.drag.clone!.getBoundingClientRect();
      const prev = ref.items!.value[getter.stateFull().sort[index - 1]!]?.$el.getBoundingClientRect();
      const current = ref.items!.value[getter.stateFull().sort[index]!]?.$el.getBoundingClientRect();
      const next = ref.items!.value[getter.stateFull().sort[index + 1]!]?.$el.getBoundingClientRect();
      if (prev && clone.top + (clone.height / 2) <
        (next ? next.top : current.top + current.height) - ((prev.height + current.height) / 2)) {
        getter.stateFull().sort.splice(index - 1, 0, ...getter.stateFull().sort.splice(index, 1));
      } else if (next && clone.top + (clone.height / 2) >
        (prev ? prev.top + prev.height : current.top) + ((current.height + next.height) / 2)) {
        getter.stateFull().sort.splice(index + 1, 0, ...getter.stateFull().sort.splice(index, 1));
      }
      // スクロール解除
      payload.event.preventDefault();
    }
  },
  dragEnd: (): void => {
    if (variable.drag.status === `move`) {
      variable.drag.status = `end`;
      variable.drag.clone!.classList.remove(`edit`);
      variable.drag.clone!.animate({
        top: [`${variable.drag.clone!.getBoundingClientRect().top}px`,
          `${ref.items!.value[variable.drag.id!]!.$el.getBoundingClientRect().top}px`],
      }, constant.base.duration[conf.state.data.speed]).addEventListener(`finish`, () => {
        delete state.status[variable.drag.id!];
        variable.drag.clone!.remove();
        variable.drag = {};
      });
    } else if (variable.drag.id && !variable.drag.clone) {
      variable.drag = {};
    }
  },
};
