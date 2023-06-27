import * as Vue from 'vue';
import * as Pinia from 'pinia';
import constant from '@/utils/const';
import * as Api from '@/api/api';
import app from '@/stores/page/app';
import main from '@/stores/page/main';
import sub from '@/stores/page/sub';
import conf from '@/stores/page/conf';
import dialog from '@/stores/popup/dialog';
import notice from '@/stores/popup/notice';

const refer: {
  wrap?: Vue.Ref<Vue.ComponentPublicInstance<any> | undefined>;
  items?: Vue.Ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>;
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
    left?: number;
    listener?: () => void;
  };
} = {
  drag: {},
  swipe: {},
};

const useStore = defineStore(`list`, () => {
  const state: {
    data: {
      sort: string[];
      data: {
        [K: string]: {
          title: string;
        };
      };
    };
    status: {[K: string]: string;};
  } = reactive({
    data: constant.init.list,
    status: {},
  });

  const getter = {
    stateFull: computed(() => (): typeof state[`data`] => state.data),
    stateUnit: computed(() => (listId?: string): typeof state[`data`][`data`][string] =>
      state.data.data[listId || app.getter.listId()]!),
    classItem: computed(() => (listId: string): {[K in `select` | `edit` | `hide`]: boolean;} => ({
      select: app.getter.listId() === listId,
      edit: state.status[listId] === `edit`,
      hide: state.status[listId] === `hide`,
    })),
    iconType: computed(() => (listId: string): `ItemIconInbox` | `ItemIconTrash` | `ItemIconList` => {
      if (listId === constant.base.id.inbox) {
        return `ItemIconInbox`;
      } else if (listId === constant.base.id.trash) {
        return `ItemIconTrash`;
      }
      return `ItemIconList`;
    }),
    classLimit: computed(() => (listId: string): {[K in `text-theme-care` | `text-theme-warn`]: boolean;} => {
      const limit = {'text-theme-care': false, 'text-theme-warn': false};
      for (const mainId of main.getter.stateFull(listId).sort) {
        const unit = main.getter.stateUnit(listId, mainId);
        const date = `${unit.date || `9999/99/99`} ${unit.time || `00:00`}`;
        app.lib.dayjs(date).isBefore(app.lib.dayjs().add(2, `day`)) && (limit[`text-theme-care`] = true);
        app.lib.dayjs(date).isBefore(app.lib.dayjs().add(1, `day`)) && (limit[`text-theme-warn`] = true);
      }
      return limit;
    }),
    textCount: computed(() => (listId: string): string => {
      let count = 0;
      for (const mainId of main.getter.stateFull(listId).sort) {
        !main.getter.stateUnit(listId, mainId).check && ++count;
      }
      return `${count}/${main.getter.stateFull(listId).sort.length}`;
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
      state.data = await Api.readList();
    },
    saveItem: (): void => {
      Api.writeList(state.data);
    },
    insertItem: (): void => {
      dialog.action.open({
        mode: `text`,
        title: app.getter.lang().dialog.title.insert,
        message: ``,
        text: {
          value: ``,
          placeholder: app.getter.lang().placeholder.list,
        },
        ok: app.getter.lang().button.ok,
        cancel: app.getter.lang().button.cancel,
        callback: {
          ok: () => {
            const listId = `list${app.lib.dayjs().valueOf()}`;
            getter.stateFull.value().sort.unshift(listId);
            getter.stateFull.value().data[listId] = {
              title: dialog.state.text.value,
            };
            main.state.data[listId] = {sort: [], data: {}};
            sub.state.data[listId] = {data: {}};
            dialog.action.close();
          },
          cancel: () => {
            dialog.action.close();
          },
        },
      });
    },
    copyItem: (payload: {event: Event; listId: string;}): void => {
      const listId = `list${app.lib.dayjs().valueOf()}`;
      getter.stateFull.value().sort.splice(getter.stateFull.value().sort.indexOf(payload.listId) + 1, 0, listId);
      getter.stateFull.value().data[listId] = app.lib.lodash.cloneDeep(getter.stateUnit.value(payload.listId));
      delete state.status[payload.listId];
      main.state.data[listId] = app.lib.lodash.cloneDeep(main.getter.stateFull(payload.listId));
      sub.state.data[listId] = app.lib.lodash.cloneDeep(sub.state.data[payload.listId]!);
      // 画面遷移キャンセル
      payload.event.stopPropagation();
    },
    deleteItem: (payload: {event: Event; listId: string;}): void => {
      dialog.action.open({
        mode: `confirm`,
        title: app.getter.lang().dialog.title.delete,
        message: ``,
        ok: app.getter.lang().button.ok,
        cancel: app.getter.lang().button.cancel,
        callback: {
          ok: () => {
            const backup = {
              list: app.lib.lodash.cloneDeep(state.data),
              main: app.lib.lodash.cloneDeep(main.state.data),
              sub: app.lib.lodash.cloneDeep(sub.state.data),
            };
            for (const mainId of main.getter.stateFull(payload.listId).sort) {
              main.getter.stateFull(constant.base.id.trash).sort.push(mainId);
              main.getter.stateFull(constant.base.id.trash).data[mainId] = main.getter.stateUnit(payload.listId, mainId);
              sub.state.data[constant.base.id.trash]!.data[mainId] = sub.getter.stateFull(payload.listId, mainId);
            }
            getter.stateFull.value().sort.splice(getter.stateFull.value().sort.indexOf(payload.listId), 1);
            delete getter.stateFull.value().data[payload.listId];
            delete state.status[payload.listId];
            delete main.state.data[payload.listId];
            delete sub.state.data[payload.listId];
            dialog.action.close();
            constant.sound.play(`warn`);
            notice.action.open({
              message: app.getter.lang().notice.message,
              button: app.getter.lang().notice.button,
              callback: () => {
                state.data = backup.list;
                main.state.data = backup.main;
                sub.state.data = backup.sub;
                notice.action.close();
              },
            });
          },
          cancel: () => {
            delete state.status[payload.listId];
            dialog.action.close();
          },
        },
      });
      // 画面遷移キャンセル
      payload.event.stopPropagation();
    },
    switchEdit: (payload?: {listId: string;}): void => {
      for (const listId of getter.stateFull.value().sort) {
        state.status[listId] = listId === payload?.listId ? `edit` : ``;
      }
    },
    dragInit: (payload: {event: TouchEvent; listId: string;}): void => {
      const item = refer.items!.value[payload.listId]!.getBoundingClientRect();
      prop.drag.status = `start`;
      prop.drag.id = payload.listId;
      prop.drag.y = (payload.event.detail as unknown as TouchEvent).changedTouches[0]!.clientY;
      prop.drag.top = item.top;
      prop.drag.left = item.left;
      prop.drag.height = item.height;
      prop.drag.width = item.width;
      conf.state.data.vibrate === `on` && navigator.vibrate(40);
    },
    dragStart: (payload: {event: TouchEvent;}): void => {
      if (prop.drag.status === `start`) {
        prop.drag.status = `move`;
        prop.drag.clone = refer.items!.value[prop.drag.id!]!.cloneNode(true) as HTMLElement;
        prop.drag.clone.style.position = `absolute`;
        prop.drag.clone.style.zIndex = `1`;
        prop.drag.clone.style.top = `${prop.drag.top}px`;
        prop.drag.clone.style.left = `${prop.drag.left}px`;
        prop.drag.clone.style.height = `${prop.drag.height}px`;
        prop.drag.clone.style.width = `${prop.drag.width}px`;
        refer.wrap!.value!.appendChild(prop.drag.clone);
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
        const prev = refer.items!.value[getter.stateFull.value().sort[index - 1]!]?.getBoundingClientRect();
        const current = refer.items!.value[getter.stateFull.value().sort[index]!]?.getBoundingClientRect();
        const next = refer.items!.value[getter.stateFull.value().sort[index + 1]!]?.getBoundingClientRect();
        if (prev && clone.top + (clone.height / 2) <
          (next ? next.top : current.top + current.height) - ((prev.height + current.height) / 2)) {
          getter.stateFull.value().sort.splice(index - 1, 0, ...getter.stateFull.value().sort.splice(index, 1));
        } else if (next && clone.top + (clone.height / 2) >
          (prev ? prev.top + prev.height : current.top) + ((current.height + next.height) / 2)) {
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
            `${refer.items!.value[prop.drag.id!]!.getBoundingClientRect().top}px`],
        }, constant.base.duration[conf.state.data.speed]).addEventListener(`finish`, () => {
          state.status[prop.drag.id!] = ``;
          prop.drag.clone!.remove();
          prop.drag = {};
        });
      } else if (prop.drag.id && !prop.drag.clone) {
        prop.drag = {};
      }
    },
    swipeInit: (payload: {event: TouchEvent;}): void => {
      prop.swipe.status = prop.swipe.status === `end` ? `move` : `start`;
      prop.swipe.target = payload.event.currentTarget as HTMLElement;
      prop.swipe.x = payload.event.changedTouches[0]!.clientX;
      prop.swipe.y = payload.event.changedTouches[0]!.clientY;
      prop.swipe.left = prop.swipe.target.getBoundingClientRect().left;
      // スワイプ終了前に再開時
      if (prop.swipe.status === `move`) {
        prop.swipe.target.removeEventListener(`transitionend`, prop.swipe.listener!);
        prop.swipe.target.classList.remove(`v-enter-active`);
        prop.swipe.target.style.transform = `translateX(${prop.swipe.left}px)`;
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
        const x = prop.swipe.left! + payload.event.changedTouches[0]!.clientX - prop.swipe.x!;
        prop.swipe.target!.style.transform = `translateX(${x < 0 ? x : 0}px)`;
      }
    },
    swipeEnd: (payload: {event: TouchEvent;}): void => {
      if (prop.swipe.status === `move`) {
        prop.swipe.status = `end`;
        if (prop.swipe.left! + payload.event.changedTouches[0]!.clientX - prop.swipe.x! < -100) {
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

export default {refer, prop, state: store.state, getter: store.getter, action: store.action};
