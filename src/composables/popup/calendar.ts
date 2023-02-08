import * as Vue from 'vue';
import constant from '@/utils/const';
import * as app from '@/composables/page/app';

export const ref: {
  body?: Vue.Ref<Vue.ComponentPublicInstance<HTMLElement> | undefined>;
  area?: Vue.Ref<Vue.ComponentPublicInstance<HTMLElement> | undefined>;
} = {};

export const variable: {
  callback: (date: string) => void;
  swipe: {
    status?: `start` | `move` | `end`;
    target?: HTMLElement;
    x?: number;
    y?: number;
    left?: number;
    listener?: () => void;
  };
} = {
  callback: () => {},
  swipe: {},
};

export const state: {
  open: boolean;
  select: string;
  current: string;
  cancel: string;
  clear: string;
} = reactive(constant.init.calendar);

export const getter = reactive({
  textWeek: computed(() => (): string[] => app.getter.lang().calendar.week),
  textDay: computed(() => (): {id: string; day: {month: string; day: string; text: string;}[];}[] => {
    const month: ReturnType<typeof getter.textDay> = [];
    for (let curMonth = app.lib.dayjs(state.current).subtract(1, `month`),
      limMonth = app.lib.dayjs(state.current).add(2, `month`);
      curMonth.isBefore(limMonth); curMonth = curMonth.add(1, `month`)) {
      const day: typeof month[number][`day`] = [];
      for (let curDay = curMonth.date(1).subtract(curMonth.date(1).day(), `day`),
        limDay = curMonth.add(1, `month`).date(1);
        curDay.isBefore(limDay); curDay = curDay.add(1, `day`)) {
        day.push({
          month: curMonth.format(`YYYY/MM`),
          day: curDay.format(`YYYY/MM/DD`),
          text: curDay.format(`D`),
        });
      }
      month.push({id: curMonth.format(`YYYY/MM`), day});
    }
    return month;
  }),
  classDay: computed(() => (month: string, day: string): {[K in `select` | `today` | `hide`]: boolean;} => ({
    select: day === state.select,
    today: day === app.lib.dayjs().format(`YYYY/MM/DD`),
    hide: month !== app.lib.dayjs(day).format(`YYYY/MM`),
  })),
});

export const action = {
  open: (payload: {select: typeof state.select; current: typeof state.current;
    cancel: typeof state.cancel; clear: typeof state.clear; callback: typeof variable.callback;}): void => {
    state.open = true;
    state.select = payload.select;
    state.current = payload.current;
    state.cancel = payload.cancel;
    state.clear = payload.clear;
    variable.callback = payload.callback;
  },
  close: (): void => {
    state.open = false;
  },
  pageMove: (payload: {prev: boolean;}): void => {
    ref.area!.value!.$el.classList.add(payload.prev ? `prev` : `next`);
    ref.area!.value!.$el.addEventListener(`transitionend`, function listener() {
      ref.area!.value!.$el.removeEventListener(`transitionend`, listener);
      ref.area!.value!.$el.classList.remove(payload.prev ? `prev` : `next`);
      state.current = app.lib.dayjs(state.current).add(payload.prev ? -1 : 1, `month`).format(`YYYY/MM`);
    });
  },
  swipeInit: (payload: {event: TouchEvent;}): void => {
    variable.swipe.status = `start`;
    variable.swipe.target = payload.event.currentTarget as HTMLElement;
    variable.swipe.x = payload.event.changedTouches[0]!.clientX;
    variable.swipe.y = payload.event.changedTouches[0]!.clientY;
    variable.swipe.left = variable.swipe.target.getBoundingClientRect().left -
      ref.body!.value!.$el.parentElement.getBoundingClientRect().left;
  },
  swipeStart: (payload: {event: TouchEvent;}): void => {
    if (variable.swipe.status === `start`) {
      const touch = payload.event.changedTouches[0]!;
      if (Math.abs(touch.clientX - variable.swipe.x!) + Math.abs(touch.clientY - variable.swipe.y!) > 10) {
        Math.abs(touch.clientX - variable.swipe.x!) > Math.abs(touch.clientY - variable.swipe.y!) ?
          (variable.swipe.status = `move`) : (variable.swipe = {});
      }
    }
  },
  swipeMove: (payload: {event: TouchEvent;}): void => {
    if (variable.swipe.status === `move`) {
      variable.swipe.target!.style.transform =
        `translateX(${variable.swipe.left! + payload.event.changedTouches[0]!.clientX - variable.swipe.x!}px)`;
    }
  },
  swipeEnd: (payload: {event: TouchEvent;}): void => {
    if (variable.swipe.status === `move`) {
      variable.swipe.status = `end`;
      variable.swipe.target!.style.transform = ``;
      if (payload.event.changedTouches[0]!.clientX - variable.swipe.x! >= 75) {
        action.pageMove({prev: true});
        variable.swipe = {};
      } else if (payload.event.changedTouches[0]!.clientX - variable.swipe.x! <= -75) {
        action.pageMove({prev: false});
        variable.swipe = {};
      } else {
        variable.swipe.target!.classList.add(`back`);
        variable.swipe.target!.addEventListener(`transitionend`, function listener() {
          variable.swipe.target!.removeEventListener(`transitionend`, listener);
          variable.swipe.target!.classList.remove(`back`);
          variable.swipe = {};
        });
      }
    } else {
      variable.swipe = {};
    }
  },
};
