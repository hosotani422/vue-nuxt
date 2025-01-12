import * as datefns from "date-fns";
import lodash from "lodash";
import i18next from "i18next";
import Api from "@/api/api";
import app from "@/stores/page/app";
import main from "@/stores/page/main";
import conf from "@/stores/page/conf";
import calendar from "@/stores/popup/calendar";
import clock from "@/stores/popup/clock";
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
    right?: number;
  };
} = {
  init: {
    list0000000000000: {
      data: {
        main0000000000000: { sort: [`sub0000000000000`], data: { sub0000000000000: { check: false, title: `` } } },
      },
    },
    list9999999999999: { data: {} },
  },
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
    status: { [K: string]: string };
  } = reactive({
    data: refer.init,
    status: {},
  });

  const render = reactive({
    classStatus: computed(() => (arg: { subId: string }): string => {
      const classStatus: string[] = [];
      state.status[arg.subId] === `edit` && classStatus.push(`edit`);
      state.status[arg.subId] === `hide` && classStatus.push(`hide`);
      return classStatus.join(` `);
    }),
    classLimit: computed(() => (): string => {
      const classLimit: string[] = [];
      const item = main.state.data[app.render.listId()]!.data[app.render.mainId()]!;
      const now = new Date();
      const date = `${item.date || `9999/99/99`} ${item.time || `00:00`}`;
      datefns.isBefore(date, datefns.addDays(now, 2)) && classLimit.push(`text-theme-care`);
      datefns.isBefore(date, datefns.addDays(now, 1)) && classLimit.push(`text-theme-warn`);
      return classLimit.join(` `);
    }),
    textMemo: computed(() => (): string => {
      const textMemo: string[] = [];
      for (const subId of state.data[app.render.listId()]!.data[app.render.mainId()]!.sort) {
        textMemo.push(state.data[app.render.listId()]!.data[app.render.mainId()]!.data[subId]!.title);
      }
      return textMemo.join(`\n`);
    }),
    textAlarm: computed(() => (): string => {
      const textAlarm: string[] = [];
      for (const alarmId of main.state.data[app.render.listId()]!.data[app.render.mainId()]!.alarm) {
        textAlarm.push(i18next.t(`dialog.alarm.data.${alarmId}.label`));
      }
      return textAlarm.join(`,`);
    }),
  });

  const handle = {
    init: async (): Promise<void> => {
      state.data = await Api.readSub();
      watch(
        () => state.data,
        (data) => {
          Api.writeSub(data);
        },
        { deep: true },
      );
    },
    toggleMode: (): void => {
      main.state.data[app.render.listId()]!.data[app.render.mainId()]!.task =
        !main.state.data[app.render.listId()]!.data[app.render.mainId()]!.task;
    },
    convertItem: (arg: { text: string }): void => {
      state.data[app.render.listId()]!.data[app.render.mainId()]!.sort = [];
      state.data[app.render.listId()]!.data[app.render.mainId()]!.data = {};
      const subId = new Date().valueOf();
      for (const [i, title] of arg.text.split(`\n`).entries()) {
        state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.push(`sub${subId + i}`);
        state.data[app.render.listId()]!.data[app.render.mainId()]!.data[`sub${subId + i}`] = { check: false, title };
      }
    },
    divideItem: async (arg: { subId: string; caret: number }): Promise<void> => {
      const subId = `sub${new Date().valueOf()}`;
      const title = state.data[app.render.listId()]!.data[app.render.mainId()]!.data[arg.subId]!.title;
      state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.splice(
        state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.indexOf(arg.subId) + 1,
        0,
        subId,
      );
      state.data[app.render.listId()]!.data[app.render.mainId()]!.data[arg.subId]!.title = title.slice(0, arg.caret);
      state.data[app.render.listId()]!.data[app.render.mainId()]!.data[subId] = {
        check: false,
        title: title.slice(arg.caret),
      };
      await nextTick();
      const elem = app.refer.getById<HTMLInputElement>(`SubTask${subId}`);
      elem.focus();
      elem.selectionStart = 0;
      elem.selectionEnd = 0;
    },
    connectItem: async (arg: { subId: string }): Promise<void> => {
      const subId =
        state.data[app.render.listId()]!.data[app.render.mainId()]!.sort[
          state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.indexOf(arg.subId) - 1
        ]!;
      const caret = state.data[app.render.listId()]!.data[app.render.mainId()]!.data[subId]!.title.length;
      state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.splice(
        state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.indexOf(arg.subId),
        1,
      );
      state.data[app.render.listId()]!.data[app.render.mainId()]!.data[subId]!.title +=
        state.data[app.render.listId()]!.data[app.render.mainId()]!.data[arg.subId]!.title;
      delete state.data[app.render.listId()]!.data[app.render.mainId()]!.data[arg.subId];
      delete state.status[arg.subId];
      await nextTick();
      const elem = app.refer.getById<HTMLInputElement>(`SubTask${subId}`);
      elem.focus();
      elem.selectionStart = caret;
      elem.selectionEnd = caret;
    },
    deleteItem: (arg: { subId: string }): void => {
      const backup = lodash.cloneDeep(state.data);
      state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.splice(
        state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.indexOf(arg.subId),
        1,
      );
      delete state.data[app.render.listId()]!.data[app.render.mainId()]!.data[arg.subId];
      delete state.status[arg.subId];
      notice.handle.open({
        message: i18next.t(`notice.message`),
        button: i18next.t(`notice.button`),
        callback: () => {
          state.data = backup;
          notice.handle.close();
        },
      });
    },
    openCalendar: (): void => {
      calendar.handle.open({
        select: main.state.data[app.render.listId()]!.data[app.render.mainId()]!.date,
        cancel: i18next.t(`button.cancel`),
        clear: i18next.t(`button.clear`),
        callback: (date) => {
          main.state.data[app.render.listId()]!.data[app.render.mainId()]!.date = date;
          calendar.handle.close();
        },
      });
    },
    openClock: (): void => {
      clock.handle.open({
        time: datefns.format(
          `2000/1/1 ${main.state.data[app.render.listId()]!.data[app.render.mainId()]!.time || `00:00`}`,
          `HH:mm`,
        ),
        cancel: i18next.t(`button.cancel`),
        clear: i18next.t(`button.clear`),
        ok: i18next.t(`button.ok`),
        callback: (arg) => {
          main.state.data[app.render.listId()]!.data[app.render.mainId()]!.time = arg
            ? datefns.format(`2000/1/1 ${arg.hour}:${arg.minute}`, `HH:mm`)
            : ``;
          clock.handle.close();
        },
      });
    },
    openAlarm: (): void => {
      dialog.handle.open({
        mode: `check`,
        title: i18next.t(`dialog.title.alarm`),
        message: ``,
        check: {
          all: true,
          sort: i18next.t(`dialog.alarm.sort`, { returnObjects: true }),
          data: (() => {
            const data: (typeof dialog)[`state`][`check`][`data`] = {};
            for (const id of i18next.t(`dialog.alarm.sort`, { returnObjects: true })) {
              data[id] = {
                check: main.state.data[app.render.listId()]!.data[app.render.mainId()]!.alarm.includes(id),
                title: i18next.t(`dialog.alarm.data.${id}.label`),
              };
            }
            return data;
          })(),
        },
        ok: i18next.t(`button.ok`),
        cancel: i18next.t(`button.cancel`),
        callback: {
          ok: () => {
            main.state.data[app.render.listId()]!.data[app.render.mainId()]!.alarm = [];
            for (const id of dialog.state.check!.sort) {
              if (dialog.state.check!.data[id]!.check) {
                main.state.data[app.render.listId()]!.data[app.render.mainId()]!.alarm.push(id);
              }
            }
            dialog.handle.close();
          },
          cancel: () => {
            dialog.handle.close();
          },
        },
      });
    },
    dragInit: (arg: { subId: string; y: number }): void => {
      if (!refer.drag.status) {
        const item = app.refer.getById(`SubItem${arg.subId}`).getBoundingClientRect();
        refer.drag.status = `start`;
        refer.drag.id = arg.subId;
        refer.drag.y = arg.y;
        refer.drag.top = item.top;
        refer.drag.left = item.left - app.refer.getById(`SubHome`).getBoundingClientRect().left;
        refer.drag.height = item.height;
        refer.drag.width = item.width;
        state.status[arg.subId] = `edit`;
        conf.state.data.vibrate === `on` && navigator.vibrate(40);
      }
    },
    dragStart: (): void => {
      if (refer.drag.status === `start`) {
        refer.drag.status = `move`;
        refer.drag.clone = app.refer.getById(`SubItem${refer.drag.id}`).cloneNode(true) as HTMLElement;
        refer.drag.clone.removeAttribute(`data-id`);
        refer.drag.clone.style.position = `absolute`;
        refer.drag.clone.style.zIndex = `1`;
        refer.drag.clone.style.top = `${refer.drag.top}px`;
        refer.drag.clone.style.left = `${refer.drag.left}px`;
        refer.drag.clone.style.height = `${refer.drag.height}px`;
        refer.drag.clone.style.width = `${refer.drag.width}px`;
        app.refer.getById(`SubBody`).appendChild(refer.drag.clone);
        state.status[refer.drag.id!] = `hide`;
      }
    },
    dragMove: (arg: { y: number }): void => {
      if (refer.drag.status === `move`) {
        refer.drag.clone!.style.top = `${refer.drag.top! + arg.y - refer.drag.y!}px`;
        const index = state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.indexOf(refer.drag.id!);
        const clone = refer.drag.clone!.getBoundingClientRect();
        const wrap = app.refer.getById(`SubBody`).getBoundingClientRect();
        const prev = app.refer
          .getById(`SubItem${state.data[app.render.listId()]!.data[app.render.mainId()]!.sort[index - 1]}`)
          ?.getBoundingClientRect();
        const current = app.refer
          .getById(`SubItem${state.data[app.render.listId()]!.data[app.render.mainId()]!.sort[index]}`)
          .getBoundingClientRect();
        const next = app.refer
          .getById(`SubItem${state.data[app.render.listId()]!.data[app.render.mainId()]!.sort[index + 1]}`)
          ?.getBoundingClientRect();
        if (prev && clone.top + clone.height / 2 < (next?.top || wrap.bottom) - (prev.height + current.height) / 2) {
          state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.splice(
            index - 1,
            0,
            ...state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.splice(index, 1),
          );
        }
        if (next && clone.top + clone.height / 2 > (prev?.bottom || wrap.top) + (current.height + next.height) / 2) {
          state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.splice(
            index + 1,
            0,
            ...state.data[app.render.listId()]!.data[app.render.mainId()]!.sort.splice(index, 1),
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
            { top: `${app.refer.getById(`SubItem${refer.drag.id}`).getBoundingClientRect().top}px` },
            { duration: app.handle.getDuration(), easing: `ease-in-out` },
          )
          .addEventListener(`finish`, function listener() {
            refer.drag.clone!.removeEventListener(`finish`, listener);
            delete state.status[refer.drag.id!];
            refer.drag.clone!.remove();
            refer.drag = {};
          });
      } else {
        delete state.status[refer.drag.id!];
        refer.drag = {};
      }
    },
    swipeInit: (arg: { x: number; y: number }): void => {
      if (!refer.swipe.status) {
        refer.swipe.status = `start`;
        refer.swipe.elem = app.refer.getById<HTMLElement>(`SubRoot`);
        refer.swipe.x = arg.x;
        refer.swipe.y = arg.y;
        refer.swipe.right =
          refer.swipe.elem.getBoundingClientRect().left + refer.swipe.elem.getBoundingClientRect().width / 2;
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
        refer.swipe.elem!.style.transform = `translateX(${Math.max(refer.swipe.right! + arg.x - refer.swipe.x!, 0)}px)`;
      }
    },
    swipeEnd: (arg: { x: number }): void => {
      if (refer.swipe.status === `move`) {
        refer.swipe.status = `end`;
        if (refer.swipe.right! + arg.x - refer.swipe.x! > 100) {
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
