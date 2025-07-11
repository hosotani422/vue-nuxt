import * as datefns from "date-fns";
import i18next from "i18next";
import app from "@/store/page/app";

const refer: {
  init: typeof store.state;
  swipe: {
    status?: `start` | `move` | `end`;
    elem?: HTMLElement;
    x?: number;
    y?: number;
    left?: number;
  };
  callback: (date: string) => void;
} = {
  init: {
    open: false,
    select: ``,
    current: ``,
    cancel: ``,
    clear: ``,
  },
  swipe: {},
  callback: () => ``,
};

const useStore = defineStore(`date`, () => {
  const state: {
    open: boolean;
    select: string;
    current: string;
    cancel: string;
    clear: string;
  } = reactive(refer.init);

  const render = reactive({
    classStatus: computed(
      () =>
        (arg: { month: string; day: string }): { [K in `select` | `today` | `hide`]: boolean } => {
          return {
            select: arg.day === state.select,
            today: arg.day === datefns.format(new Date(), `yyyy/MM/dd`),
            hide: arg.month !== datefns.format(arg.day, `yyyy/MM`),
          };
        },
    ),
    getWeek: computed(() => (): string[] => {
      const week: ReturnType<typeof render.getWeek> = [];
      for (const id of i18next.t(`date.sort`, { returnObjects: true })) {
        week.push(i18next.t(`date.data.${id}`));
      }
      return week;
    }),
    getDay: computed(() => (): { id: string; day: { id: string; text: string }[] }[] => {
      const month: ReturnType<typeof render.getDay> = [];
      for (
        let curMonth = datefns.subMonths(state.current, 1), limMonth = datefns.addMonths(state.current, 2);
        datefns.isBefore(curMonth, limMonth);
        curMonth = datefns.addMonths(curMonth, 1)
      ) {
        const day: (typeof month)[number][`day`] = [];
        for (
          let curDay = datefns.subDays(datefns.setDate(curMonth, 1), datefns.getDay(datefns.setDate(curMonth, 1))),
            limDay = datefns.setDate(datefns.addMonths(curMonth, 1), 1);
          datefns.isBefore(curDay, limDay);
          curDay = datefns.addDays(curDay, 1)
        ) {
          day.push({ id: datefns.format(curDay, `yyyy/MM/dd`), text: datefns.format(curDay, `d`) });
        }
        month.push({ id: datefns.format(curMonth, `yyyy/MM`), day });
      }
      return month;
    }),
  });

  const handle = {
    open: (arg: {
      select: typeof state.select;
      cancel: typeof state.cancel;
      clear: typeof state.clear;
      callback: typeof refer.callback;
    }): void => {
      state.open = true;
      state.select = arg.select;
      state.current = datefns.format(arg.select || new Date(), `yyyy/MM`);
      state.cancel = arg.cancel;
      state.clear = arg.clear;
      refer.callback = arg.callback;
    },
    close: (): void => {
      state.open = false;
    },
    pageMove: (arg: { mode: `prev` | `next` }): void => {
      document
        .querySelector(`div[aria-label='date'] main div`)!
        .animate(
          { transform: `translateX(${arg.mode === `prev` ? `0px` : `-66.666%`})` },
          { duration: app.handle.getDuration(), easing: `ease-in-out` },
        )
        .addEventListener(`finish`, function listener() {
          document.querySelector(`div[aria-label='date'] main div`)!.removeEventListener(`finish`, listener);
          document.querySelector<HTMLElement>(`div[aria-label='date'] main div`)!.style.transform =
            `translateX(-33.333%)`;
          state.current = datefns.format(datefns.addMonths(state.current, arg.mode === `prev` ? -1 : 1), `yyyy/MM`);
        });
    },
    swipeInit: (arg: { x: number; y: number }): void => {
      if (!refer.swipe.status) {
        refer.swipe.status = `start`;
        refer.swipe.elem = document.querySelector<HTMLElement>(`div[aria-label='date'] main div`)!;
        refer.swipe.x = arg.x;
        refer.swipe.y = arg.y;
        refer.swipe.left =
          refer.swipe.elem.getBoundingClientRect().left -
          document.querySelector(`div[aria-label='date']`)!.children[0]!.getBoundingClientRect().left;
      }
    },
    swipeStart: (arg: { x: number; y: number }): void => {
      if (refer.swipe.status === `start`) {
        if (Math.abs(arg.x - refer.swipe.x!) + Math.abs(arg.y - refer.swipe.y!) > 10) {
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
        refer.swipe.elem!.style.transform = `translateX(${refer.swipe.left! + arg.x - refer.swipe.x!}px)`;
      }
    },
    swipeEnd: (arg: { x: number }): void => {
      if (refer.swipe.status === `move`) {
        refer.swipe.status = `end`;
        if (Math.abs(arg.x - refer.swipe.x!) >= 75) {
          handle.pageMove({ mode: arg.x - refer.swipe.x! > 0 ? `prev` : `next` });
          refer.swipe = {};
        } else {
          refer.swipe
            .elem!.animate(
              { transform: `translateX(-33.333%)` },
              { duration: app.handle.getDuration(), easing: `ease-in-out` },
            )
            .addEventListener(`finish`, function listener() {
              refer.swipe.elem!.removeEventListener(`finish`, listener);
              refer.swipe.elem!.style.transform = `translateX(-33.333%)`;
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
