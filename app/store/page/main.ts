import * as datefns from "date-fns";
import lodash from "lodash";
import i18next from "i18next";
import app from "@/store/page/app";
import list from "@/store/page/list";
import sub from "@/store/page/sub";
import conf from "@/store/page/conf";
import dialog from "@/store/popup/dialog";
import notice from "@/store/popup/notice";

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
} = {
  init: {
    list0000000000000: {
      sort: [`main0000000000000`],
      data: { main0000000000000: { check: false, title: `サンプル`, date: ``, time: ``, alarm: [], task: true } },
    },
    list9999999999999: { sort: [], data: {} },
  },
  drag: {},
};

const useStore = defineStore(`main`, () => {
  const state: {
    data: {
      [K: string]: {
        sort: string[];
        data: {
          [K: string]: {
            check: boolean;
            title: string;
            date: string;
            time: string;
            alarm: string[];
            task: boolean;
          };
        };
      };
    };
    status: { [K: string]: string };
  } = reactive({
    data: refer.init,
    status: {},
  });

  const render = reactive({
    classStatus: computed(() => (arg: { mainId: string }): { [K in `select` | `edit` | `hide`]: boolean } => {
      return {
        select: app.render.mainId() === arg.mainId,
        edit: state.status[arg.mainId] === `edit`,
        hide: state.status[arg.mainId] === `hide`,
      };
    }),
    classLimit: computed(() => (arg: { mainId: string }): { [K in `text-theme-care` | `text-theme-warn`]: boolean } => {
      const classLimit = { "text-theme-care": false, "text-theme-warn": false };
      const item = state.data[app.render.listId()]!.data[arg.mainId]!;
      const now = new Date();
      const date = `${item.date || `9999/99/99`} ${item.time || `00:00`}`;
      datefns.isBefore(date, datefns.addDays(now, 2)) && (classLimit[`text-theme-care`] = true);
      datefns.isBefore(date, datefns.addDays(now, 1)) && (classLimit[`text-theme-warn`] = true);
      return classLimit;
    }),
    textCount: computed(() => (arg: { mainId: string }): string => {
      const itemList = Object.values(sub.state.data[app.render.listId()]!.data[arg.mainId]!.data);
      return `${itemList.filter((item) => !item.check).length}/${itemList.length}`;
    }),
  });

  const handle = {
    init: async (): Promise<void> => {
      state.data = process.client ? (await JSON.parse(localStorage.getItem(`main`)!)) || refer.init : refer.init;
      watch(
        () => state.data,
        (data) => {
          process.client && localStorage.setItem(`main`, JSON.stringify(data));
        },
        { deep: true },
      );
    },
    editItem: (arg?: { mainId: string }): void => {
      for (const mainId of state.data[app.render.listId()]!.sort) {
        if (mainId === arg?.mainId) {
          state.status[mainId] = `edit`;
        } else {
          delete state.status[mainId];
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
          placeholder: i18next.t(`placeholder.main`),
          error: ``,
        },
        ok: i18next.t(`button.ok`),
        cancel: i18next.t(`button.cancel`),
        callback: {
          ok: () => {
            const id = new Date().valueOf();
            state.data[app.render.listId()]!.sort.unshift(`main${id}`);
            state.data[app.render.listId()]!.data[`main${id}`] = {
              check: false,
              title: dialog.state.text!.value,
              date: ``,
              time: ``,
              alarm: [],
              task: true,
            };
            sub.state.data[app.render.listId()]!.data[`main${id}`] = {
              sort: [`sub${id}`],
              data: { [`sub${id}`]: { check: false, title: `` } },
            };
            dialog.handle.close();
          },
          cancel: () => {
            dialog.handle.close();
          },
        },
      });
    },
    copyItem: (arg: { mainId: string }): void => {
      const mainId = `main${new Date().valueOf()}`;
      state.data[app.render.listId()]!.sort.splice(
        state.data[app.render.listId()]!.sort.indexOf(arg.mainId) + 1,
        0,
        mainId,
      );
      state.data[app.render.listId()]!.data[mainId] = lodash.cloneDeep(
        state.data[app.render.listId()]!.data[arg.mainId]!,
      );
      sub.state.data[app.render.listId()]!.data[mainId] = lodash.cloneDeep(
        sub.state.data[app.render.listId()]!.data[arg.mainId]!,
      );
      delete state.status[arg.mainId];
    },
    moveItem: (arg: { mainId: string }): void => {
      dialog.handle.open({
        mode: `radio`,
        title: i18next.t(`dialog.title.move`),
        message: ``,
        radio: {
          none: false,
          select: ``,
          sort: list.state.data.sort.filter((listId) => listId !== app.render.listId()),
          data: list.state.data.data,
        },
        ok: i18next.t(`button.ok`),
        cancel: i18next.t(`button.cancel`),
        callback: {
          ok: () => {
            const listId = dialog.state.radio!.select;
            if (listId !== app.render.listId()) {
              state.data[listId]!.sort.unshift(arg.mainId);
              state.data[listId]!.data[arg.mainId] = state.data[app.render.listId()]!.data[arg.mainId]!;
              sub.state.data[listId]!.data[arg.mainId] = sub.state.data[app.render.listId()]!.data[arg.mainId]!;
              state.data[app.render.listId()]!.sort.splice(
                state.data[app.render.listId()]!.sort.indexOf(arg.mainId),
                1,
              );
              delete state.data[app.render.listId()]!.data[arg.mainId];
              delete sub.state.data[app.render.listId()]!.data[arg.mainId];
            }
            delete state.status[arg.mainId];
            dialog.handle.close();
          },
          cancel: () => {
            delete state.status[arg.mainId];
            dialog.handle.close();
          },
        },
      });
    },
    deleteItem: (arg: { mainId: string }): void => {
      const backup = { main: lodash.cloneDeep(state.data), sub: lodash.cloneDeep(sub.state.data) };
      const listId = app.refer.constant.id.trash;
      if (listId !== app.render.listId()) {
        state.data[listId]!.sort.unshift(arg.mainId);
        state.data[listId]!.data[arg.mainId] = state.data[app.render.listId()]!.data[arg.mainId]!;
        sub.state.data[listId]!.data[arg.mainId] = sub.state.data[app.render.listId()]!.data[arg.mainId]!;
      }
      state.data[app.render.listId()]!.sort.splice(state.data[app.render.listId()]!.sort.indexOf(arg.mainId), 1);
      delete state.data[app.render.listId()]!.data[arg.mainId];
      delete sub.state.data[app.render.listId()]!.data[arg.mainId];
      delete state.status[arg.mainId];
      notice.handle.open({
        message: i18next.t(`notice.message`),
        button: i18next.t(`notice.button`),
        callback: () => {
          state.data = backup.main;
          sub.state.data = backup.sub;
          notice.handle.close();
        },
      });
    },
    dragInit: (arg: { mainId: string; y: number }): void => {
      if (!refer.drag.status) {
        const item = app.refer.getById(`MainItem${arg.mainId}`).getBoundingClientRect();
        refer.drag.status = `start`;
        refer.drag.id = arg.mainId;
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
        refer.drag.clone = app.refer.getById(`MainItem${refer.drag.id}`).cloneNode(true) as HTMLElement;
        refer.drag.clone.removeAttribute(`data-id`);
        refer.drag.clone.style.position = `absolute`;
        refer.drag.clone.style.zIndex = `1`;
        refer.drag.clone.style.top = `${refer.drag.top}px`;
        refer.drag.clone.style.left = `${refer.drag.left}px`;
        refer.drag.clone.style.height = `${refer.drag.height}px`;
        refer.drag.clone.style.width = `${refer.drag.width}px`;
        app.refer.getById(`MainBody`).appendChild(refer.drag.clone);
        state.status[refer.drag.id!] = `hide`;
      }
    },
    dragMove: (arg: { y: number }): void => {
      if (refer.drag.status === `move`) {
        refer.drag.clone!.style.top = `${refer.drag.top! + arg.y - refer.drag.y!}px`;
        const index = state.data[app.render.listId()]!.sort.indexOf(refer.drag.id!);
        const clone = refer.drag.clone!.getBoundingClientRect();
        const prev = app.refer
          .getById(`MainItem${state.data[app.render.listId()]!.sort[index - 1]}`)
          ?.getBoundingClientRect();
        const current = app.refer
          .getById(`MainItem${state.data[app.render.listId()]!.sort[index]}`)
          .getBoundingClientRect();
        const next = app.refer
          .getById(`MainItem${state.data[app.render.listId()]!.sort[index + 1]}`)
          ?.getBoundingClientRect();
        if (prev && clone.top + clone.height / 2 < (next?.top || current.bottom) - (prev.height + current.height) / 2) {
          state.data[app.render.listId()]!.sort.splice(
            index - 1,
            0,
            ...state.data[app.render.listId()]!.sort.splice(index, 1),
          );
        }
        if (next && clone.top + clone.height / 2 > (prev?.bottom || current.top) + (current.height + next.height) / 2) {
          state.data[app.render.listId()]!.sort.splice(
            index + 1,
            0,
            ...state.data[app.render.listId()]!.sort.splice(index, 1),
          );
        }
      }
    },
    dragEnd: (): void => {
      if (refer.drag.status === `move`) {
        refer.drag.status = `end`;
        refer.drag.clone!.classList.remove(`edit`);
        refer.drag
          .clone!.animate(
            { top: `${app.refer.getById(`MainItem${refer.drag.id}`).getBoundingClientRect().top}px` },
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
  };

  return { state, render, handle };
});

const store = useStore(createPinia());

export default { refer, state: store.state, render: store.render, handle: store.handle };
