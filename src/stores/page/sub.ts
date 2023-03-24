import * as Vue from 'vue';
import * as Pinia from 'pinia';
import * as Dom from '@/utils/base/dom';
import constant from '@/utils/const';
import * as Api from '@/api/api';
import app from '@/stores/page/app';
import main from '@/stores/page/main';
import conf from '@/stores/page/conf';
import calendar from '@/stores/popup/calendar';
import clock from '@/stores/popup/clock';
import dialog from '@/stores/popup/dialog';
import notice from '@/stores/popup/notice';

const ref: {
  home?: Vue.Ref<Vue.ComponentPublicInstance<any> | undefined>;
  wrap?: Vue.Ref<Vue.ComponentPublicInstance<any> | undefined>;
  items?: Vue.Ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>;
  titles?: Vue.Ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>;
} = {};

const prop: {
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

const useStore = defineStore(`sub`, () => {
  const state: {
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

  const getter = {
    stateFull: computed(() =>
      (listId?: string, mainId?: string): typeof state[`data`][string][`data`][string] =>
        state.data[listId || app.getter.listId()]!.data[mainId || app.getter.mainId()]!),
    stateUnit: computed(() =>
      (listId?: string, mainId?: string, subId?: string): typeof state[`data`][string][`data`][string][`data`][string] =>
        state.data[listId || app.getter.listId()]!.data[mainId || app.getter.mainId()]!.data[subId || ``]!),
    classItem: computed(() => (subId: string): {[K in `check` | `edit` | `drag` | `hide`]: boolean;} => ({
      check: getter.stateUnit.value(``, ``, subId).check,
      edit: state.status[subId] === `edit`,
      drag: state.status[subId] === `drag`,
      hide: state.status[subId] === `hide`,
    })),
    textMemo: computed(() => (): string => {
      const memo: string[] = [];
      for (const subId of getter.stateFull.value().sort) {
        memo.push(getter.stateUnit.value(``, ``, subId).title);
      }
      return memo.join(`\n`);
    }),
    classLimit: computed(() => (): {[K in `text-theme-care` | `text-theme-warn`]: boolean;} => {
      const unit = main.getter.stateUnit();
      const date = `${unit.date || `9999/99/99`} ${unit.time || `00:00`}`;
      return {
        'text-theme-care': app.lib.dayjs(date).isBefore(app.lib.dayjs().add(2, `day`)),
        'text-theme-warn': app.lib.dayjs(date).isBefore(app.lib.dayjs().add(1, `day`)),
      };
    }),
    textAlarm: computed(() => (): string => {
      const alarm: string[] = [];
      for (const alarmId of main.getter.stateUnit().alarm) {
        alarm.push(app.getter.lang().dialog.alarm.data[alarmId]!.label);
      }
      return alarm.join(`,`);
    }),
  };

  const action = {
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
      state.data = await Api.readSub();
    },
    saveItem: (): void => {
      Api.writeSub(state.data);
    },
    inputItem: (payload: {event: Event; subId: string;}): void => {
      getter.stateUnit.value(``, ``, payload.subId).title = (payload.event.target as HTMLInputElement).value;
      Dom.resize(ref.titles!.value[payload.subId].$el);
    },
    enterItem: async(payload: {event: KeyboardEvent; subId: string;}) => {
      const subId = `sub${app.lib.dayjs().valueOf()}`;
      const target = payload.event.target as HTMLInputElement;
      getter.stateFull.value().sort.splice(getter.stateFull.value().sort.indexOf(payload.subId) + 1, 0, subId);
      getter.stateUnit.value(``, ``, payload.subId).title = target.value.slice(0, target.selectionStart!);
      getter.stateFull.value().data[subId] = {check: false, title: target.value.slice(target.selectionStart!)};
      await nextTick();
      ref.titles!.value[subId].$el.focus();
      Dom.resize(ref.items!.value[payload.subId]);
      ref.items!.value[payload.subId]!.addEventListener(`transitionend`, function listener() {
        ref.items!.value[payload.subId]!.removeEventListener(`transitionend`, listener);
        ref.items!.value[payload.subId]!.style.height = ``;
      });
    },
    backItem: async(payload: {event: KeyboardEvent; subId: string;}) => {
      if ((payload.event.target as HTMLInputElement).selectionStart === 0) {
        const subId = getter.stateFull.value().sort[getter.stateFull.value().sort.indexOf(payload.subId) - 1]!;
        const caret = getter.stateUnit.value(``, ``, subId).title.length;
        getter.stateFull.value().sort.splice(getter.stateFull.value().sort.indexOf(payload.subId), 1);
        getter.stateUnit.value(``, ``, subId).title += getter.stateUnit.value(``, ``, payload.subId).title;
        delete getter.stateFull.value().data[payload.subId];
        await nextTick();
        Dom.resize(ref.titles!.value[subId].$el);
        ref.titles!.value[subId].$el.focus();
        ref.titles!.value[subId].$el.selectionStart = caret;
        ref.titles!.value[subId].$el.selectionEnd = caret;
        // 文字削除キャンセル
        payload.event.preventDefault();
      }
    },
    deleteItem: async(payload: {subId: string;}) => {
      const height = Dom.resize(ref.items!.value[payload.subId]);
      const backup = app.lib.lodash.cloneDeep(state.data);
      getter.stateFull.value().sort.splice(getter.stateFull.value().sort.indexOf(payload.subId), 1);
      delete getter.stateFull.value().data[payload.subId];
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
          Dom.resize(ref.items!.value[payload.subId], height);
          ref.items!.value[payload.subId]!.addEventListener(`transitionend`, function listener() {
            ref.items!.value[payload.subId]!.removeEventListener(`transitionend`, listener);
            ref.items!.value[payload.subId]!.style.height = ``;
          });
        },
      });
    },
    checkItem: (payload: {event: Event; subId: string;}): void => {
      const target = payload.event.target as HTMLInputElement;
      getter.stateFull.value().sort.splice(getter.stateFull.value().sort.indexOf(payload.subId), 1);
      getter.stateFull.value().sort[target.checked ? `push` : `unshift`](payload.subId);
      getter.stateUnit.value(``, ``, payload.subId).check = target.checked;
      constant.sound.play(target.checked ? `ok` : `cancel`);
    },
    switchItem: (): void => {
      main.getter.stateUnit().task = !main.getter.stateUnit().task;
    },
    switchEdit: (payload?: {subId: string;}): void => {
      for (const subId of getter.stateFull.value().sort) {
        state.status[subId] = subId === payload?.subId ? `edit` : ``;
      }
    },
    inputMemo: (payload: {event: Event;}): void => {
      getter.stateFull.value().sort = [];
      getter.stateFull.value().data = {};
      for (const [i, title] of (payload.event.target as HTMLInputElement).value.split(`\n`).entries()) {
        const subId = `sub${app.lib.dayjs().valueOf()}${i}`;
        getter.stateFull.value().sort.push(subId);
        getter.stateFull.value().data[subId] = {check: false, title};
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
      const item = ref.items!.value[payload.subId]!.getBoundingClientRect();
      prop.drag.status = `start`;
      prop.drag.id = payload.subId;
      prop.drag.y = payload.event.changedTouches[0]!.clientY;
      prop.drag.top = item.top;
      prop.drag.left = item.left - ref.home!.value!.getBoundingClientRect().left;
      prop.drag.height = item.height;
      prop.drag.width = item.width;
      state.status[payload.subId] = `edit`;
      conf.state.data.vibrate === `on` && navigator.vibrate(40);
    },
    dragStart: (payload: {event: TouchEvent;}): void => {
      if (prop.drag.status === `start`) {
        prop.drag.status = `move`;
        prop.drag.clone = ref.items!.value[prop.drag.id!]!.cloneNode(true) as HTMLElement;
        prop.drag.clone.style.position = `absolute`;
        prop.drag.clone.style.zIndex = `1`;
        prop.drag.clone.style.top = `${prop.drag.top}px`;
        prop.drag.clone.style.left = `${prop.drag.left}px`;
        prop.drag.clone.style.height = `${prop.drag.height}px`;
        prop.drag.clone.style.width = `${prop.drag.width}px`;
        ref.wrap!.value!.appendChild(prop.drag.clone);
        state.status[prop.drag.id!] = `hide`;
        // スクロール解除
        payload.event.preventDefault();
      }
    },
    dragMove: (payload: {event: TouchEvent;}): void => {
      if (prop.drag.status === `move`) {
        prop.drag.clone!.style.top =
          `${prop.drag.top! + payload.event.changedTouches[0]!.clientY - prop.drag.y!}px`;
        const index = getter.stateFull.value().sort.indexOf(prop.drag.id!);
        const clone = prop.drag.clone!.getBoundingClientRect();
        const wrap = ref.wrap!.value!.getBoundingClientRect();
        const prev = ref.items!.value[getter.stateFull.value().sort[index - 1]!]?.getBoundingClientRect();
        const current = ref.items!.value[getter.stateFull.value().sort[index]!]?.getBoundingClientRect();
        const next = ref.items!.value[getter.stateFull.value().sort[index + 1]!]?.getBoundingClientRect();
        if (prev && clone.top + (clone.height / 2) <
          (next ? next.top : wrap.top + wrap.height) - ((prev.height + current.height) / 2)) {
          getter.stateFull.value().sort.splice(index - 1, 0, ...getter.stateFull.value().sort.splice(index, 1));
        } else if (next && clone.top + (clone.height / 2) >
          (prev ? prev.top + prev.height : wrap.top) + ((current.height + next.height) / 2)) {
          getter.stateFull.value().sort.splice(index + 1, 0, ...getter.stateFull.value().sort.splice(index, 1));
        }
        // スクロール解除
        payload.event.preventDefault();
      }
    },
    dragEnd: (): void => {
      if (prop.drag.status === `move`) {
        prop.drag.status = `end`;
        prop.drag.clone!.classList.remove(`edit`);
        prop.drag.clone!.animate({
          top: [`${prop.drag.clone!.getBoundingClientRect().top}px`,
            `${ref.items!.value[prop.drag.id!]!.getBoundingClientRect().top}px`],
        }, constant.base.duration[conf.state.data.speed]).addEventListener(`finish`, () => {
          delete state.status[prop.drag.id!];
          prop.drag.clone!.remove();
          prop.drag = {};
        });
      } else if (prop.drag.id && !prop.drag.clone) {
        delete state.status[prop.drag.id];
        prop.drag = {};
      }
    },
    swipeInit: (payload: {event: TouchEvent;}): void => {
      prop.swipe.status = prop.swipe.status === `end` ? `move` : `start`;
      prop.swipe.target = payload.event.currentTarget as HTMLElement;
      prop.swipe.x = payload.event.changedTouches[0]!.clientX;
      prop.swipe.y = payload.event.changedTouches[0]!.clientY;
      const item = prop.swipe.target.getBoundingClientRect();
      prop.swipe.right = item.left + (item.width / 2);
      // スワイプ終了前に再開時
      if (prop.swipe.status === `move`) {
        prop.swipe.target.removeEventListener(`transitionend`, prop.swipe.listener!);
        prop.swipe.target.classList.remove(`v-enter-active`);
        prop.swipe.target.style.transform = `translateX(${prop.swipe.right}px)`;
      }
    },
    swipeStart: (payload: {event: TouchEvent;}): void => {
      if (prop.swipe.status === `start`) {
        const changed = payload.event.changedTouches[0]!;
        if (Math.abs(changed.clientX - prop.swipe.x!) + Math.abs(changed.clientY - prop.swipe.y!) > 15) {
          Math.abs(changed.clientX - prop.swipe.x!) > Math.abs(changed.clientY - prop.swipe.y!) ?
            (prop.swipe.status = `move`) : (prop.swipe = {});
        }
      }
    },
    swipeMove: (payload: {event: TouchEvent;}): void => {
      if (prop.swipe.status === `move`) {
        const x = prop.swipe.right! + payload.event.changedTouches[0]!.clientX - prop.swipe.x!;
        prop.swipe.target!.style.transform = `translateX(${x > 0 ? x : 0}px)`;
      }
    },
    swipeEnd: (payload: {event: TouchEvent;}): void => {
      if (prop.swipe.status === `move`) {
        prop.swipe.status = `end`;
        if (prop.swipe.right! + payload.event.changedTouches[0]!.clientX - prop.swipe.x! > 100) {
          app.action.routerBack();
          prop.swipe = {};
        } else {
          prop.swipe.target!.style.transform = ``;
          prop.swipe.target!.classList.add(`v-enter-active`);
          prop.swipe.target!.addEventListener(`transitionend`, (prop.swipe.listener = () => {
            prop.swipe.target!.removeEventListener(`transitionend`, prop.swipe.listener!);
            prop.swipe.target!.classList.remove(`v-enter-active`);
            prop.swipe = {};
          }));
        }
      } else {
        prop.swipe = {};
      }
    },
  };

  return {state, getter, action};
});

const store = useStore(Pinia.createPinia());

export default {ref, prop, state: store.state, getter: store.getter, action: store.action};
