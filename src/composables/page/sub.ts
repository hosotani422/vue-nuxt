import * as Vue from 'vue';
import * as Dom from '@/utils/base/dom';
import constant from '@/utils/const';
import * as Api from '@/api/api';
import * as app from '@/composables/page/app';
import * as main from '@/composables/page/main';
import * as conf from '@/composables/page/conf';
import * as calendar from '@/composables/popup/calendar';
import * as dialog from '@/composables/popup/dialog';
import * as clock from '@/composables/popup/clock';
import * as notice from '@/composables/popup/notice';

export const ref: {
  home?: Vue.Ref<Vue.ComponentPublicInstance<HTMLElement> | undefined>;
  wrap?: Vue.Ref<Vue.ComponentPublicInstance<HTMLElement> | undefined>;
  items?: Vue.Ref<{[K: string]: Vue.ComponentPublicInstance<HTMLElement>;}>;
  titles?: Vue.Ref<{[K: string]: Vue.ComponentPublicInstance<HTMLElement>;}>;
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
  swipe: {
    status?: `start` | `move` | `end`;
    target?: HTMLElement;
    x?: number;
    y?: number;
    right?: number;
    listener?: () => void;
  };
} = {
  drag: {},
  swipe: {},
};

export const state: {
  data: {
    [K: string]: {
      data: {
        [K: string]: {
          sort: string[];
          data: {
            [K: string]: {
              check: boolean;
              title: string;
            };
          };
        };
      };
    };
  };
  status: {[K: string]: string;};
} = reactive({
  data: constant.init.sub,
  status: {},
});

export const getter = reactive({
  stateFull: computed(() =>
    (listId?: string, mainId?: string): typeof state[`data`][string][`data`][string] =>
      state.data[listId || app.getter.listId()]!.data[mainId || app.getter.mainId()]!),
  stateUnit: computed(() =>
    (listId?: string, mainId?: string, subId?: string): typeof state[`data`][string][`data`][string][`data`][string] =>
      state.data[listId || app.getter.listId()]!.data[mainId || app.getter.mainId()]!.data[subId || ``]!),
  classItem: computed(() => (subId: string): {[K in `check` | `edit` | `drag` | `hide`]: boolean;} => ({
    check: getter.stateUnit(``, ``, subId).check,
    edit: state.status[subId] === `edit`,
    drag: state.status[subId] === `drag`,
    hide: state.status[subId] === `hide`,
  })),
  textMemo: computed(() => (): string => {
    const memo: string[] = [];
    for (const subId of getter.stateFull().sort) {
      memo.push(getter.stateUnit(``, ``, subId).title);
    }
    return memo.join(`\n`);
  }),
  classLimit: computed(() => (): {[K in `warn` | `error`]: boolean;} => {
    const unit = main.getter.stateUnit();
    const date = `${unit.date || `9999/99/99`} ${unit.time || `00:00`}`;
    return {
      warn: app.lib.dayjs(date).isBefore(app.lib.dayjs().add(2, `day`)),
      error: app.lib.dayjs(date).isBefore(app.lib.dayjs().add(1, `day`)),
    };
  }),
  textAlarm: computed(() => (): string => {
    const alarm: string[] = [];
    for (const alarmId of main.getter.stateUnit().alarm) {
      alarm.push(app.getter.lang().dialog.alarm.data[alarmId]!.label);
    }
    return alarm.join(`,`);
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
      },
      {deep: true},
    );
  },
  loadItem: async(): Promise<void> => {
    state.data = await Api.readSub() ?? constant.init.sub;
  },
  saveItem: (): void => {
    Api.writeSub(state.data);
  },
  inputItem: (payload: {event: Event; subId: string;}): void => {
    getter.stateUnit(``, ``, payload.subId).title = (payload.event.target as HTMLInputElement).value;
    Dom.resize(ref.titles!.value[payload.subId]!.$el);
  },
  enterItem: async(payload: {event: KeyboardEvent; subId: string;}) => {
    const subId = `sub${app.lib.dayjs().valueOf()}`;
    const target = payload.event.target as HTMLInputElement;
    getter.stateFull().sort.splice(getter.stateFull().sort.indexOf(payload.subId) + 1, 0, subId);
    getter.stateUnit(``, ``, payload.subId).title = target.value.slice(0, target.selectionStart!);
    getter.stateFull().data[subId] = {check: false, title: target.value.slice(target.selectionStart!)};
    await nextTick();
    ref.titles!.value[subId]!.$el.focus();
    Dom.resize(ref.items!.value[payload.subId]!.$el);
    ref.items!.value[payload.subId]!.$el.addEventListener(`transitionend`, function listener() {
      ref.items!.value[payload.subId]!.$el.removeEventListener(`transitionend`, listener);
      ref.items!.value[payload.subId]!.$el.style.height = ``;
    });
  },
  backItem: async(payload: {event: KeyboardEvent; subId: string;}) => {
    if ((payload.event.target as HTMLInputElement).selectionStart === 0) {
      const subId = getter.stateFull().sort[getter.stateFull().sort.indexOf(payload.subId) - 1]!;
      const caret = getter.stateUnit(``, ``, subId).title.length;
      getter.stateFull().sort.splice(getter.stateFull().sort.indexOf(payload.subId), 1);
      getter.stateUnit(``, ``, subId).title += getter.stateUnit(``, ``, payload.subId).title;
      delete getter.stateFull().data[payload.subId];
      await nextTick();
      Dom.resize(ref.titles!.value[subId]!.$el);
      ref.titles!.value[subId]!.$el.focus();
      ref.titles!.value[subId]!.$el.selectionStart = caret;
      ref.titles!.value[subId]!.$el.selectionEnd = caret;
      // 文字削除キャンセル
      payload.event.preventDefault();
    }
  },
  deleteItem: async(payload: {subId: string;}) => {
    const height = Dom.resize(ref.items!.value[payload.subId]!.$el);
    const backup = app.lib.lodash.cloneDeep(state.data);
    getter.stateFull().sort.splice(getter.stateFull().sort.indexOf(payload.subId), 1);
    delete getter.stateFull().data[payload.subId];
    delete state.status[payload.subId];
    constant.sound.play(`warn`);
    await nextTick();
    notice.action.open({
      message: app.getter.lang().notice.message,
      button: app.getter.lang().notice.button,
      callback: async() => {
        notice.action.close();
        state.data = backup;
        await nextTick();
        Dom.resize(ref.items!.value[payload.subId]!.$el, height);
        ref.items!.value[payload.subId]!.$el.addEventListener(`transitionend`, function listener() {
          ref.items!.value[payload.subId]!.$el.removeEventListener(`transitionend`, listener);
          ref.items!.value[payload.subId]!.$el.style.height = ``;
        });
      },
    });
  },
  checkItem: (payload: {event: Event; subId: string;}): void => {
    const target = payload.event.target as HTMLInputElement;
    getter.stateFull().sort.splice(getter.stateFull().sort.indexOf(payload.subId), 1);
    getter.stateFull().sort[target.checked ? `push` : `unshift`](payload.subId);
    getter.stateUnit(``, ``, payload.subId).check = target.checked;
    constant.sound.play(target.checked ? `ok` : `cancel`);
  },
  switchItem: (): void => {
    main.getter.stateUnit().task = !main.getter.stateUnit().task;
  },
  switchEdit: (payload?: {subId: string;}): void => {
    for (const subId of getter.stateFull().sort) {
      state.status[subId] = subId === payload?.subId ? `edit` : ``;
    }
  },
  inputMemo: (payload: {event: Event;}): void => {
    getter.stateFull().sort = [];
    getter.stateFull().data = {};
    for (const [i, title] of (payload.event.target as HTMLInputElement).value.split(`\n`).entries()) {
      const subId = `sub${app.lib.dayjs().valueOf()}${i}`;
      getter.stateFull().sort.push(subId);
      getter.stateFull().data[subId] = {check: false, title};
    }
  },
  openCalendar: (payload: {date: string;}): void => {
    calendar.action.open({
      select: payload.date,
      current: app.lib.dayjs(payload.date || new Date()).format(`YYYY/MM`),
      cancel: app.getter.lang().button.cancel,
      clear: app.getter.lang().button.clear,
      callback: (date) => {
        calendar.action.close();
        main.getter.stateUnit().date = date;
      },
    });
  },
  openClock: (payload: {time: string;}): void => {
    clock.action.open({
      hour: payload.time ? app.lib.dayjs(`2000/1/1 ${payload.time}`).hour() : 0,
      minute: payload.time ? app.lib.dayjs(`2000/1/1 ${payload.time}`).minute() : 0,
      cancel: app.getter.lang().button.cancel,
      clear: app.getter.lang().button.clear,
      ok: app.getter.lang().button.ok,
      callback: (hour, minute) => {
        clock.action.close();
        main.getter.stateUnit().time = hour != null && minute != null ?
          app.lib.dayjs(`2000/1/1 ${hour}:${minute}`).format(`HH:mm`) : ``;
      },
    });
  },
  openAlarm: (): void => {
    dialog.action.open({
      mode: `check`,
      title: app.getter.lang().dialog.alarm.title,
      message: ``,
      check: {
        all: true,
        sort: app.getter.lang().dialog.alarm.sort,
        data: (() => {
          const data: typeof dialog[`state`][`check`][`data`] = {};
          for (const id of app.getter.lang().dialog.alarm.sort) {
            data[id] = {
              check: main.getter.stateUnit().alarm.includes(id),
              title: app.getter.lang().dialog.alarm.data[id]!.label,
            };
          }
          return data;
        })(),
      },
      ok: app.getter.lang().button.ok,
      cancel: app.getter.lang().button.cancel,
      callback: {
        ok: () => {
          dialog.action.close();
          main.getter.stateUnit().alarm = (() => {
            const alarm: typeof main[`state`][`data`][string][`data`][string][`alarm`] = [];
            for (const id of dialog.state.check.sort) {
              dialog.state.check.data[id]!.check && alarm.push(id);
            }
            return alarm;
          })();
        },
        cancel: () => {
          dialog.action.close();
        },
      },
    });
  },
  dragInit: (payload: {event: TouchEvent; subId: string;}): void => {
    const item = ref.items!.value[payload.subId]!.$el.getBoundingClientRect();
    variable.drag.status = `start`;
    variable.drag.id = payload.subId;
    variable.drag.y = payload.event.changedTouches[0]!.clientY;
    variable.drag.top = item.top;
    variable.drag.left = item.left - ref.home!.value!.$el.getBoundingClientRect().left;
    variable.drag.height = item.height;
    variable.drag.width = item.width;
    state.status[payload.subId] = `edit`;
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
      const wrap = ref.wrap!.value!.$el.getBoundingClientRect();
      const prev = ref.items!.value[getter.stateFull().sort[index - 1]!]?.$el.getBoundingClientRect();
      const current = ref.items!.value[getter.stateFull().sort[index]!]?.$el.getBoundingClientRect();
      const next = ref.items!.value[getter.stateFull().sort[index + 1]!]?.$el.getBoundingClientRect();
      if (prev && clone.top + (clone.height / 2) <
        (next ? next.top : wrap.top + wrap.height) - ((prev.height + current.height) / 2)) {
        getter.stateFull().sort.splice(index - 1, 0, ...getter.stateFull().sort.splice(index, 1));
      } else if (next && clone.top + (clone.height / 2) >
        (prev ? prev.top + prev.height : wrap.top) + ((current.height + next.height) / 2)) {
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
      delete state.status[variable.drag.id];
      variable.drag = {};
    }
  },
  swipeInit: (payload: {event: TouchEvent;}): void => {
    variable.swipe.status = variable.swipe.status === `end` ? `move` : `start`;
    variable.swipe.target = payload.event.currentTarget as HTMLElement;
    variable.swipe.x = payload.event.changedTouches[0]!.clientX;
    variable.swipe.y = payload.event.changedTouches[0]!.clientY;
    const item = variable.swipe.target.getBoundingClientRect();
    variable.swipe.right = item.left + (item.width / 2);
    // スワイプ終了前に再開時
    if (variable.swipe.status === `move`) {
      variable.swipe.target.removeEventListener(`transitionend`, variable.swipe.listener!);
      variable.swipe.target.classList.remove(`v-enter-active`);
      variable.swipe.target.style.transform = `translateX(${variable.swipe.right}px)`;
    }
  },
  swipeStart: (payload: {event: TouchEvent;}): void => {
    if (variable.swipe.status === `start`) {
      const changed = payload.event.changedTouches[0]!;
      if (Math.abs(changed.clientX - variable.swipe.x!) + Math.abs(changed.clientY - variable.swipe.y!) > 15) {
        Math.abs(changed.clientX - variable.swipe.x!) > Math.abs(changed.clientY - variable.swipe.y!) ?
          (variable.swipe.status = `move`) : (variable.swipe = {});
      }
    }
  },
  swipeMove: (payload: {event: TouchEvent;}): void => {
    if (variable.swipe.status === `move`) {
      const x = variable.swipe.right! + payload.event.changedTouches[0]!.clientX - variable.swipe.x!;
      variable.swipe.target!.style.transform = `translateX(${x > 0 ? x : 0}px)`;
    }
  },
  swipeEnd: (payload: {event: TouchEvent;}): void => {
    if (variable.swipe.status === `move`) {
      variable.swipe.status = `end`;
      if (variable.swipe.right! + payload.event.changedTouches[0]!.clientX - variable.swipe.x! > 100) {
        app.action.routerBack();
        variable.swipe = {};
      } else {
        variable.swipe.target!.style.transform = ``;
        variable.swipe.target!.classList.add(`v-enter-active`);
        variable.swipe.target!.addEventListener(`transitionend`, (variable.swipe.listener = () => {
          variable.swipe.target!.removeEventListener(`transitionend`, variable.swipe.listener!);
          variable.swipe.target!.classList.remove(`v-enter-active`);
          variable.swipe = {};
        }));
      }
    } else {
      variable.swipe = {};
    }
  },
};
