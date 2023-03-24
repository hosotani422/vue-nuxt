import * as Vue from 'vue';
import * as Pinia from 'pinia';
import constant from '@/utils/const';
import app from '@/stores/page/app';

const ref: {
  body?: Vue.Ref<Vue.ComponentPublicInstance<any> | undefined>;
  area?: Vue.Ref<Vue.ComponentPublicInstance<any> | undefined>;
} = {};

const prop: {
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

const useStore = defineStore(`calendar`, () => {
  const state: {
    open: boolean;
    select: string;
    current: string;
    cancel: string;
    clear: string;
  } = reactive(constant.init.calendar);

  const getter = {
    textWeek: computed(() => (): string[] => app.getter.lang().calendar.week),
    textDay: computed(() => (): {id: string; day: {month: string; day: string; text: string;}[];}[] => {
      const month: ReturnType<typeof getter.textDay.value> = [];
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
  };

  const action = {
    open: (payload: {select: typeof state.select; current: typeof state.current;
      cancel: typeof state.cancel; clear: typeof state.clear; callback: typeof prop.callback;}): void => {
      state.open = true;
      state.select = payload.select;
      state.current = payload.current;
      state.cancel = payload.cancel;
      state.clear = payload.clear;
      prop.callback = payload.callback;
    },
    close: (): void => {
      state.open = false;
    },
    pageMove: (payload: {prev: boolean;}): void => {
      ref.area!.value!.classList.add(payload.prev ? `prev` : `next`);
      ref.area!.value!.addEventListener(`transitionend`, function listener() {
        ref.area!.value!.removeEventListener(`transitionend`, listener);
        ref.area!.value!.classList.remove(payload.prev ? `prev` : `next`);
        state.current = app.lib.dayjs(state.current).add(payload.prev ? -1 : 1, `month`).format(`YYYY/MM`);
      });
    },
    swipeInit: (payload: {event: TouchEvent;}): void => {
      prop.swipe.status = `start`;
      prop.swipe.target = payload.event.currentTarget as HTMLElement;
      prop.swipe.x = payload.event.changedTouches[0]!.clientX;
      prop.swipe.y = payload.event.changedTouches[0]!.clientY;
      prop.swipe.left = prop.swipe.target.getBoundingClientRect().left -
        ref.body!.value!.parentElement.getBoundingClientRect().left;
    },
    swipeStart: (payload: {event: TouchEvent;}): void => {
      if (prop.swipe.status === `start`) {
        const touch = payload.event.changedTouches[0]!;
        if (Math.abs(touch.clientX - prop.swipe.x!) + Math.abs(touch.clientY - prop.swipe.y!) > 10) {
          Math.abs(touch.clientX - prop.swipe.x!) > Math.abs(touch.clientY - prop.swipe.y!) ?
            (prop.swipe.status = `move`) : (prop.swipe = {});
        }
      }
    },
    swipeMove: (payload: {event: TouchEvent;}): void => {
      if (prop.swipe.status === `move`) {
        prop.swipe.target!.style.transform =
          `translateX(${prop.swipe.left! + payload.event.changedTouches[0]!.clientX - prop.swipe.x!}px)`;
      }
    },
    swipeEnd: (payload: {event: TouchEvent;}): void => {
      if (prop.swipe.status === `move`) {
        prop.swipe.status = `end`;
        prop.swipe.target!.style.transform = ``;
        if (payload.event.changedTouches[0]!.clientX - prop.swipe.x! >= 75) {
          action.pageMove({prev: true});
          prop.swipe = {};
        } else if (payload.event.changedTouches[0]!.clientX - prop.swipe.x! <= -75) {
          action.pageMove({prev: false});
          prop.swipe = {};
        } else {
          prop.swipe.target!.classList.add(`back`);
          prop.swipe.target!.addEventListener(`transitionend`, function listener() {
            prop.swipe.target!.removeEventListener(`transitionend`, listener);
            prop.swipe.target!.classList.remove(`back`);
            prop.swipe = {};
          });
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
