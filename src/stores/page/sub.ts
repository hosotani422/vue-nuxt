import * as datefns from "date-fns";
import lodash from "lodash";
import i18next from "i18next";
import Api from "@/api/api";
import constant from "@/utils/const";
import Util from "@/utils/base/util";
import app from "@/stores/page/app";
import main from "@/stores/page/main";
import conf from "@/stores/page/conf";
import calendar from "@/stores/popup/calendar";
import clock from "@/stores/popup/clock";
import dialog from "@/stores/popup/dialog";
import notice from "@/stores/popup/notice";

const temp: {
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
    data: constant.init.sub,
    status: {},
  });

  const getter = reactive({
    classStatus: computed(() => (arg: { subId: string }): string => {
      const classStatus: string[] = [];
      state.status[arg.subId] === `edit` && classStatus.push(`edit`);
      state.status[arg.subId] === `hide` && classStatus.push(`hide`);
      return classStatus.join(` `);
    }),
    classLimit: computed(() => (): string => {
      const classLimit: string[] = [];
      const item = main.state.data[app.getter.listId()]!.data[app.getter.mainId()]!;
      const now = new Date();
      const date = `${item.date || `9999/99/99`} ${item.time || `00:00`}`;
      datefns.isBefore(date, datefns.addDays(now, 2)) && classLimit.push(`text-theme-care`);
      datefns.isBefore(date, datefns.addDays(now, 1)) && classLimit.push(`text-theme-warn`);
      return classLimit.join(` `);
    }),
    textMemo: computed(() => (): string => {
      const textMemo: string[] = [];
      for (const subId of state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort) {
        textMemo.push(state.data[app.getter.listId()]!.data[app.getter.mainId()]!.data[subId]!.title);
      }
      return textMemo.join(`\n`);
    }),
    textAlarm: computed(() => (): string => {
      const textAlarm: string[] = [];
      for (const alarmId of main.state.data[app.getter.listId()]!.data[app.getter.mainId()]!.alarm) {
        textAlarm.push(i18next.t(`dialog.alarm.data.${alarmId}.label`));
      }
      return textAlarm.join(`,`);
    }),
  });

  const action = {
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
      main.state.data[app.getter.listId()]!.data[app.getter.mainId()]!.task =
        !main.state.data[app.getter.listId()]!.data[app.getter.mainId()]!.task;
    },
    convertItem: (arg: { text: string }): void => {
      state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort = [];
      state.data[app.getter.listId()]!.data[app.getter.mainId()]!.data = {};
      const subId = new Date().valueOf();
      for (const [i, title] of arg.text.split(`\n`).entries()) {
        state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.push(`sub${subId + i}`);
        state.data[app.getter.listId()]!.data[app.getter.mainId()]!.data[`sub${subId + i}`] = { check: false, title };
      }
    },
    divideItem: async (arg: { subId: string; caret: number }): Promise<void> => {
      const subId = `sub${new Date().valueOf()}`;
      const title = state.data[app.getter.listId()]!.data[app.getter.mainId()]!.data[arg.subId]!.title;
      state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.splice(
        state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.indexOf(arg.subId) + 1,
        0,
        subId,
      );
      state.data[app.getter.listId()]!.data[app.getter.mainId()]!.data[arg.subId]!.title = title.slice(0, arg.caret);
      state.data[app.getter.listId()]!.data[app.getter.mainId()]!.data[subId] = {
        check: false,
        title: title.slice(arg.caret),
      };
      await nextTick();
      const elem = Util.getById<HTMLInputElement>(`SubTask${subId}`);
      elem.focus();
      elem.selectionStart = 0;
      elem.selectionEnd = 0;
    },
    connectItem: async (arg: { subId: string }): Promise<void> => {
      const subId =
        state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort[
          state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.indexOf(arg.subId) - 1
        ]!;
      const caret = state.data[app.getter.listId()]!.data[app.getter.mainId()]!.data[subId]!.title.length;
      state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.splice(
        state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.indexOf(arg.subId),
        1,
      );
      state.data[app.getter.listId()]!.data[app.getter.mainId()]!.data[subId]!.title +=
        state.data[app.getter.listId()]!.data[app.getter.mainId()]!.data[arg.subId]!.title;
      delete state.data[app.getter.listId()]!.data[app.getter.mainId()]!.data[arg.subId];
      delete state.status[arg.subId];
      await nextTick();
      const elem = Util.getById<HTMLInputElement>(`SubTask${subId}`);
      elem.focus();
      elem.selectionStart = caret;
      elem.selectionEnd = caret;
    },
    deleteItem: (arg: { subId: string }): void => {
      const backup = lodash.cloneDeep(state.data);
      state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.splice(
        state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.indexOf(arg.subId),
        1,
      );
      delete state.data[app.getter.listId()]!.data[app.getter.mainId()]!.data[arg.subId];
      delete state.status[arg.subId];
      notice.action.open({
        message: i18next.t(`notice.message`),
        button: i18next.t(`notice.button`),
        callback: () => {
          state.data = backup;
          notice.action.close();
        },
      });
    },
    openCalendar: (): void => {
      calendar.action.open({
        select: main.state.data[app.getter.listId()]!.data[app.getter.mainId()]!.date,
        cancel: i18next.t(`button.cancel`),
        clear: i18next.t(`button.clear`),
        callback: (date) => {
          main.state.data[app.getter.listId()]!.data[app.getter.mainId()]!.date = date;
          calendar.action.close();
        },
      });
    },
    openClock: (): void => {
      clock.action.open({
        time: datefns.format(
          `2000/1/1 ${main.state.data[app.getter.listId()]!.data[app.getter.mainId()]!.time || `00:00`}`,
          `HH:mm`,
        ),
        cancel: i18next.t(`button.cancel`),
        clear: i18next.t(`button.clear`),
        ok: i18next.t(`button.ok`),
        callback: (arg) => {
          main.state.data[app.getter.listId()]!.data[app.getter.mainId()]!.time = arg
            ? datefns.format(`2000/1/1 ${arg.hour}:${arg.minute}`, `HH:mm`)
            : ``;
          clock.action.close();
        },
      });
    },
    openAlarm: (): void => {
      dialog.action.open({
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
                check: main.state.data[app.getter.listId()]!.data[app.getter.mainId()]!.alarm.includes(id),
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
            main.state.data[app.getter.listId()]!.data[app.getter.mainId()]!.alarm = [];
            for (const id of dialog.state.check!.sort) {
              if (dialog.state.check!.data[id]!.check) {
                main.state.data[app.getter.listId()]!.data[app.getter.mainId()]!.alarm.push(id);
              }
            }
            dialog.action.close();
          },
          cancel: () => {
            dialog.action.close();
          },
        },
      });
    },
    dragInit: (arg: { subId: string; y: number }): void => {
      if (!temp.drag.status) {
        const item = Util.getById(`SubItem${arg.subId}`).getBoundingClientRect();
        temp.drag.status = `start`;
        temp.drag.id = arg.subId;
        temp.drag.y = arg.y;
        temp.drag.top = item.top;
        temp.drag.left = item.left - Util.getById(`SubHome`).getBoundingClientRect().left;
        temp.drag.height = item.height;
        temp.drag.width = item.width;
        state.status[arg.subId] = `edit`;
        conf.state.data.vibrate === `on` && navigator.vibrate(40);
      }
    },
    dragStart: (): void => {
      if (temp.drag.status === `start`) {
        temp.drag.status = `move`;
        temp.drag.clone = Util.getById(`SubItem${temp.drag.id}`).cloneNode(true) as HTMLElement;
        temp.drag.clone.removeAttribute(`data-id`);
        temp.drag.clone.style.position = `absolute`;
        temp.drag.clone.style.zIndex = `1`;
        temp.drag.clone.style.top = `${temp.drag.top}px`;
        temp.drag.clone.style.left = `${temp.drag.left}px`;
        temp.drag.clone.style.height = `${temp.drag.height}px`;
        temp.drag.clone.style.width = `${temp.drag.width}px`;
        Util.getById(`SubBody`).appendChild(temp.drag.clone);
        state.status[temp.drag.id!] = `hide`;
      }
    },
    dragMove: (arg: { y: number }): void => {
      if (temp.drag.status === `move`) {
        temp.drag.clone!.style.top = `${temp.drag.top! + arg.y - temp.drag.y!}px`;
        const index = state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.indexOf(temp.drag.id!);
        const clone = temp.drag.clone!.getBoundingClientRect();
        const wrap = Util.getById(`SubBody`).getBoundingClientRect();
        const prev = Util.getById(
          `SubItem${state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort[index - 1]}`,
        )?.getBoundingClientRect();
        const current = Util.getById(
          `SubItem${state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort[index]}`,
        ).getBoundingClientRect();
        const next = Util.getById(
          `SubItem${state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort[index + 1]}`,
        )?.getBoundingClientRect();
        if (prev && clone.top + clone.height / 2 < (next?.top || wrap.bottom) - (prev.height + current.height) / 2) {
          state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.splice(
            index - 1,
            0,
            ...state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.splice(index, 1),
          );
        }
        if (next && clone.top + clone.height / 2 > (prev?.bottom || wrap.top) + (current.height + next.height) / 2) {
          state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.splice(
            index + 1,
            0,
            ...state.data[app.getter.listId()]!.data[app.getter.mainId()]!.sort.splice(index, 1),
          );
        }
      }
    },
    dragEnd: (): void => {
      if (temp.drag.status === `move`) {
        temp.drag.status = `end`;
        temp.drag.clone!.classList.remove(`edit`);
        temp.drag
          .clone!.animate(
            { top: `${Util.getById(`SubItem${temp.drag.id}`).getBoundingClientRect().top}px` },
            { duration: app.action.getDuration(), easing: `ease-in-out` },
          )
          .addEventListener(`finish`, function listener() {
            temp.drag.clone!.removeEventListener(`finish`, listener);
            delete state.status[temp.drag.id!];
            temp.drag.clone!.remove();
            temp.drag = {};
          });
      } else {
        delete state.status[temp.drag.id!];
        temp.drag = {};
      }
    },
    swipeInit: (arg: { x: number; y: number }): void => {
      if (!temp.swipe.status) {
        temp.swipe.status = `start`;
        temp.swipe.elem = Util.getById<HTMLElement>(`SubRoot`);
        temp.swipe.x = arg.x;
        temp.swipe.y = arg.y;
        temp.swipe.right =
          temp.swipe.elem.getBoundingClientRect().left + temp.swipe.elem.getBoundingClientRect().width / 2;
      }
    },
    swipeStart: (arg: { x: number; y: number }): void => {
      if (temp.swipe.status === `start`) {
        if (Math.abs(arg.x - temp.swipe.x!) + Math.abs(arg.y - temp.swipe.y!) > 15) {
          if (Math.abs(arg.x - temp.swipe.x!) > Math.abs(arg.y - temp.swipe.y!)) {
            temp.swipe.status = `move`;
          } else {
            temp.swipe = {};
          }
        }
      }
    },
    swipeMove: (arg: { x: number }): void => {
      if (temp.swipe.status === `move`) {
        temp.swipe.elem!.style.transform = `translateX(${Math.max(temp.swipe.right! + arg.x - temp.swipe.x!, 0)}px)`;
      }
    },
    swipeEnd: (arg: { x: number }): void => {
      if (temp.swipe.status === `move`) {
        temp.swipe.status = `end`;
        if (temp.swipe.right! + arg.x - temp.swipe.x! > 100) {
          app.action.routerBack();
          temp.swipe = {};
        } else {
          temp.swipe
            .elem!.animate(
              { transform: `translateX(0px)` },
              { duration: app.action.getDuration(), easing: `ease-in-out` },
            )
            .addEventListener(`finish`, function listener() {
              temp.swipe.elem!.removeEventListener(`finish`, listener);
              temp.swipe.elem!.style.transform = `translateX(0px)`;
              temp.swipe = {};
            });
        }
      } else {
        temp.swipe = {};
      }
    },
  };

  return { state, getter, action };
});

const store = useStore(createPinia());

export default { temp, state: store.state, getter: store.getter, action: store.action };
