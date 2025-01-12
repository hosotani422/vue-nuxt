import * as datefns from "date-fns";
import lodash from "lodash";
import i18next from "i18next";
import Api from "@/api/api";
import app from "@/stores/page/app";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import conf from "@/stores/page/conf";
import dialog from "@/stores/popup/dialog";
import notice from "@/stores/popup/notice";

const refer: {
  init: typeof store.state.data;
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
    elem?: HTMLElement;
    x?: number;
    y?: number;
    left?: number;
  };
} = {
  init: {
    sort: [`list0000000000000`, `list9999999999999`],
    data: {
      list0000000000000: { title: `Inbox` },
      list9999999999999: { title: `Trash` },
    },
  },
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
    status: { [K: string]: string };
  } = reactive({
    data: refer.init,
    status: {},
  });

  const render = reactive({
    classStatus: computed(() => (arg: { listId: string }): string => {
      const classStatus: string[] = [];
      app.render.listId() === arg.listId && classStatus.push(`select`);
      state.status[arg.listId] === `edit` && classStatus.push(`edit`);
      state.status[arg.listId] === `hide` && classStatus.push(`hide`);
      return classStatus.join(` `);
    }),
    classLimit: computed(() => (arg: { listId: string }): string => {
      const classLimit: string[] = [];
      for (const mainId of main.state.data[arg.listId]!.sort) {
        const item = main.state.data[arg.listId]!.data[mainId]!;
        const now = new Date();
        const date = `${item.date || `9999/99/99`} ${item.time || `00:00`}`;
        datefns.isBefore(date, datefns.addDays(now, 2)) &&
          !classLimit.includes(`text-theme-care`) &&
          classLimit.push(`text-theme-care`);
        datefns.isBefore(date, datefns.addDays(now, 1)) &&
          !classLimit.includes(`text-theme-warn`) &&
          classLimit.push(`text-theme-warn`);
      }
      return classLimit.join(` `);
    }),
    typeIcon: computed(() => (arg: { listId: string }): `IconInbox` | `IconTrash` | `IconList` => {
      if (arg.listId === app.refer.constant.id.inbox) {
        return `IconInbox`;
      } else if (arg.listId === app.refer.constant.id.trash) {
        return `IconTrash`;
      }
      return `IconList`;
    }),
    textCount: computed(() => (arg: { listId: string }): string => {
      const itemList = Object.values(main.state.data[arg.listId]!.data);
      return `${itemList.filter((item) => !item.check).length}/${itemList.length}`;
    }),
  });

  const handle = {
    init: async (): Promise<void> => {
      state.data = await Api.readList();
      watch(
        () => state.data,
        (data) => {
          Api.writeList(data);
        },
        { deep: true },
      );
    },
    editItem: (arg?: { listId: string }): void => {
      for (const listId of state.data.sort) {
        if (listId === arg?.listId) {
          state.status[listId] = `edit`;
        } else {
          delete state.status[listId];
        }
      }
    },
    entryItem: (): void => {
      dialog.handle.open({
        mode: `text`,
        title: i18next.t(`dialog.title.entry`),
        message: ``,
        text: {
          value: ``,
          placeholder: i18next.t(`placeholder.list`),
          error: ``,
        },
        ok: i18next.t(`button.ok`),
        cancel: i18next.t(`button.cancel`),
        callback: {
          ok: () => {
            const listId = `list${new Date().valueOf()}`;
            state.data.sort.unshift(listId);
            state.data.data[listId] = { title: dialog.state.text!.value };
            main.state.data[listId] = { sort: [], data: {} };
            sub.state.data[listId] = { data: {} };
            dialog.handle.close();
          },
          cancel: () => {
            dialog.handle.close();
          },
        },
      });
    },
    copyItem: (arg: { listId: string }): void => {
      const listId = `list${new Date().valueOf()}`;
      state.data.sort.splice(state.data.sort.indexOf(arg.listId) + 1, 0, listId);
      state.data.data[listId] = lodash.cloneDeep(state.data.data[arg.listId]!);
      main.state.data[listId] = lodash.cloneDeep(main.state.data[arg.listId]!);
      sub.state.data[listId] = lodash.cloneDeep(sub.state.data[arg.listId]!);
      delete state.status[arg.listId];
    },
    deleteItem: (arg: { listId: string }): void => {
      dialog.handle.open({
        mode: `confirm`,
        title: i18next.t(`dialog.title.delete`),
        message: ``,
        ok: i18next.t(`button.ok`),
        cancel: i18next.t(`button.cancel`),
        callback: {
          ok: () => {
            const backup = {
              list: lodash.cloneDeep(state.data),
              main: lodash.cloneDeep(main.state.data),
              sub: lodash.cloneDeep(sub.state.data),
            };
            const listId = app.refer.constant.id.trash;
            for (const mainId of main.state.data[arg.listId]!.sort) {
              main.state.data[listId]!.sort.push(mainId);
              main.state.data[listId]!.data[mainId] = main.state.data[arg.listId]!.data[mainId]!;
              sub.state.data[listId]!.data[mainId] = sub.state.data[arg.listId]!.data[mainId]!;
            }
            state.data.sort.splice(state.data.sort.indexOf(arg.listId), 1);
            delete state.data.data[arg.listId];
            delete main.state.data[arg.listId];
            delete sub.state.data[arg.listId];
            delete state.status[arg.listId];
            dialog.handle.close();
            notice.handle.open({
              message: i18next.t(`notice.message`),
              button: i18next.t(`notice.button`),
              callback: () => {
                state.data = backup.list;
                main.state.data = backup.main;
                sub.state.data = backup.sub;
                notice.handle.close();
              },
            });
          },
          cancel: () => {
            delete state.status[arg.listId];
            dialog.handle.close();
          },
        },
      });
    },
    dragInit: (arg: { listId: string; y: number }): void => {
      if (!refer.drag.status) {
        const item = app.refer.getById(`ListItem${arg.listId}`).getBoundingClientRect();
        refer.drag.status = `start`;
        refer.drag.id = arg.listId;
        refer.drag.y = arg.y;
        refer.drag.top = item.top;
        refer.drag.left = item.left;
        refer.drag.height = item.height;
        refer.drag.width = item.width;
        conf.state.data.vibrate === `on` && navigator.vibrate(40);
      }
    },
    dragStart: (): void => {
      if (refer.drag.status === `start`) {
        refer.drag.status = `move`;
        refer.drag.clone = app.refer.getById(`ListItem${refer.drag.id}`).cloneNode(true) as HTMLElement;
        refer.drag.clone.removeAttribute(`data-id`);
        refer.drag.clone.style.position = `absolute`;
        refer.drag.clone.style.zIndex = `1`;
        refer.drag.clone.style.top = `${refer.drag.top}px`;
        refer.drag.clone.style.left = `${refer.drag.left}px`;
        refer.drag.clone.style.height = `${refer.drag.height}px`;
        refer.drag.clone.style.width = `${refer.drag.width}px`;
        app.refer.getById(`ListBody`).appendChild(refer.drag.clone);
        state.status[refer.drag.id!] = `hide`;
      }
    },
    dragMove: (arg: { y: number }): void => {
      if (refer.drag.status === `move`) {
        refer.drag.clone!.style.top = `${refer.drag.top! + arg.y - refer.drag.y!}px`;
        const index = state.data.sort.indexOf(refer.drag.id!);
        const clone = refer.drag.clone!.getBoundingClientRect();
        const prev = app.refer.getById(`ListItem${state.data.sort[index - 1]}`)?.getBoundingClientRect();
        const current = app.refer.getById(`ListItem${state.data.sort[index]}`).getBoundingClientRect();
        const next = app.refer.getById(`ListItem${state.data.sort[index + 1]}`)?.getBoundingClientRect();
        if (prev && clone.top + clone.height / 2 < (next?.top || current.bottom) - (prev.height + current.height) / 2) {
          state.data.sort.splice(index - 1, 0, ...state.data.sort.splice(index, 1));
        }
        if (next && clone.top + clone.height / 2 > (prev?.bottom || current.top) + (current.height + next.height) / 2) {
          state.data.sort.splice(index + 1, 0, ...state.data.sort.splice(index, 1));
        }
      }
    },
    dragEnd: (): void => {
      if (refer.drag.status === `move`) {
        refer.drag.status = `end`;
        refer.drag.clone!.classList.remove(`edit`);
        refer.drag
          .clone!.animate(
            { top: `${app.refer.getById(`ListItem${refer.drag.id}`).getBoundingClientRect().top}px` },
            { duration: app.handle.getDuration(), easing: `ease-in-out` },
          )
          .addEventListener(`finish`, function listener() {
            refer.drag.clone!.removeEventListener(`finish`, listener);
            delete state.status[refer.drag.id!];
            refer.drag.clone!.remove();
            refer.drag = {};
          });
      } else {
        refer.drag = {};
      }
    },
    swipeInit: (arg: { x: number; y: number }): void => {
      if (!refer.swipe.status) {
        refer.swipe.status = `start`;
        refer.swipe.elem = app.refer.getById<HTMLElement>(`ListRoot`);
        refer.swipe.x = arg.x;
        refer.swipe.y = arg.y;
        refer.swipe.left = refer.swipe.elem.getBoundingClientRect().left;
      }
    },
    swipeStart: (arg: { x: number; y: number }): void => {
      if (refer.swipe.status === `start`) {
        if (Math.abs(arg.x - refer.swipe.x!) + Math.abs(arg.y - refer.swipe.y!) > 15) {
          if (Math.abs(arg.x - refer.swipe.x!) > Math.abs(arg.y - refer.swipe.y!)) {
            refer.swipe.status = `move`;
          } else {
            refer.swipe = {};
          }
        }
      }
    },
    swipeMove: (arg: { x: number }): void => {
      if (refer.swipe.status === `move`) {
        refer.swipe.elem!.style.transform = `translateX(${Math.min(refer.swipe.left! + arg.x - refer.swipe.x!, 0)}px)`;
      }
    },
    swipeEnd: (arg: { x: number }): void => {
      if (refer.swipe.status === `move`) {
        refer.swipe.status = `end`;
        if (refer.swipe.left! + arg.x - refer.swipe.x! < -100) {
          app.handle.routerBack();
          refer.swipe = {};
        } else {
          refer.swipe
            .elem!.animate(
              { transform: `translateX(0px)` },
              { duration: app.handle.getDuration(), easing: `ease-in-out` },
            )
            .addEventListener(`finish`, function listener() {
              refer.swipe.elem!.removeEventListener(`finish`, listener);
              refer.swipe.elem!.style.transform = `translateX(0px)`;
              refer.swipe = {};
            });
        }
      } else {
        refer.swipe = {};
      }
    },
  };

  return { state, render, handle };
});

const store = useStore(createPinia());

export default { refer, state: store.state, render: store.render, handle: store.handle };
