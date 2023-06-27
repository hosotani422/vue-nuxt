import {vi} from 'vitest';
import * as Vue from 'vue';
import fs from 'fs';
import app from '@/stores/page/app';
import list from '@/stores/page/list';
import main from '@/stores/page/main';
import sub from '@/stores/page/sub';
import conf from '@/stores/page/conf';
import calendar from '@/stores/popup/calendar';
import clock from '@/stores/popup/clock';
import dialog from '@/stores/popup/dialog';
import notice from '@/stores/popup/notice';

export default class Fixture {
  private static initData(): void {
    process.client = true;
    dialog.state.check = {
      all: true,
      sort: [`dialog`],
      data: {dialog: {check: false, title: ``}},
    };
    calendar.state.current = `1999/12`;
  }
  private static loadData(): void {
    const backup = fs.readFileSync(`./test/memotea.bak`, `utf-8`).split(`\n`);
    app.state.backId = backup[0]!;
    list.state.data = JSON.parse(backup[1]!);
    main.state.data = JSON.parse(backup[2]!);
    sub.state.data = JSON.parse(backup[3]!);
    conf.state.data = JSON.parse(backup[4]!);
  }
  private static getRefer(): object {
    const ctx = {
      lineWidth: 0,
      font: ``,
      textAlign: ``,
      textBaseline: ``,
      fillStyle: ``,
      strokeStyle: ``,
      canvas: {setAttribute: () => {}},
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      rotate: () => {},
      translate: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      fillText: () => {},
    };
    return {
      style: {height: 0},
      scrollHeight: 0,
      classList: {add: () => {}, remove: () => {}},
      parentElement: {getBoundingClientRect: () => ({left: 0})},
      $el: {style: {height: 0}, scrollHeight: 0, selectionStart: 0, selectionEnd: 0, focus: () => {}},
      getContext: () => (ctx),
      appendChild: () => {},
      getBoundingClientRect: () => ({top: 0, left: 0, height: 9, width: 0}),
      addEventListener: (_type: string, listener: Function) => {
        listener();
      },
      removeEventListener: () => {},
      cloneNode: () => ({
        style: {position: ``, zIndex: ``, top: ``, left: ``, height: ``, width: ``},
        classList: {remove: () => {}},
        remove: () => {},
        animate: () => ({addEventListener: (_type: string, listener: Function): void => {
          listener();
        }}),
        getBoundingClientRect: () => ({top: 0, height: 0}),
      }),
    };
  }
  private static initRefer(): void {
    list.refer.items = {value: {[this.getListId(0)]: this.getRefer()}} as Vue.Ref<Vue.ComponentPublicInstance<any> | undefined>;
    list.refer.wrap = {value: this.getRefer()} as Vue.Ref<Vue.ComponentPublicInstance<any> | undefined>;
    main.refer.items = {value: {[this.getMainId(0)]: this.getRefer()}} as Vue.Ref<Vue.ComponentPublicInstance<any> | undefined>;
    main.refer.wrap = {value: this.getRefer()} as Vue.Ref<Vue.ComponentPublicInstance<any> | undefined>;
    sub.refer.home = {value: this.getRefer()} as Vue.Ref<Vue.ComponentPublicInstance<any>>;
    sub.refer.wrap = {value: this.getRefer()} as Vue.Ref<Vue.ComponentPublicInstance<any>>;
    sub.refer.titles = {value: {[this.getSubId(0)]: this.getRefer()}} as Vue.Ref<{[K: string]: Vue.ComponentPublicInstance<HTMLElement>;}>;
    sub.refer.items = {value: {[this.getSubId(0)]: this.getRefer()}} as Vue.Ref<{[K: string]: Vue.ComponentPublicInstance<any>;}>;
    calendar.refer.area = {value: this.getRefer()} as Vue.Ref<Vue.ComponentPublicInstance<any>>;
    calendar.refer.body = {value: this.getRefer()} as Vue.Ref<Vue.ComponentPublicInstance<any>>;
    clock.refer.hour = {value: this.getRefer()} as Vue.Ref<Vue.ComponentPublicInstance<any>>;
    clock.refer.minute = {value: this.getRefer()} as Vue.Ref<Vue.ComponentPublicInstance<any>>;
  }
  private static initMock(): void {
    vi.stubGlobal(`useRoute`, () => ({params: {listId: this.getListId(0), mainId: this.getMainId(0)}}));
    vi.stubGlobal(`useRouter`, () => ({back: () => {}}));
  }
  private static resetMock(): void {
    vi.resetAllMocks();
  }
  public static init(): void {
    this.initData();
    this.loadData();
    this.initRefer();
    this.initMock();
  }
  public static reset(): void {
    this.resetMock();
  }
  public static getListId(index: number): string {
    return list.state.data.sort[index]!;
  }
  public static getMainId(index: number): string {
    return main.state.data[this.getListId(0)]!.sort[index]!;
  }
  public static getSubId(index: number): string {
    return sub.state.data[this.getListId(0)]!.data[this.getMainId(0)]!.sort[index]!;
  }
  public static getEvent<T extends Event>(): T {
    return {
      target: {value: `sub0\nsub1\nsub2`, checked: true, selectionStart: 3},
      changedTouches: [{clientX: 0, clientY: 0}],
      currentTarget: {
        style: {transform: ``},
        classList: {add: () => {}, remove: () => {}},
        getBoundingClientRect: () => ({left: 0}),
        addEventListener: (_type: string, listener: Function) => {
          listener();
        },
        removeEventListener: () => {},
      },
      detail: {changedTouches: [{clientY: 0}]},
      stopPropagation: () => {},
      preventDefault: () => {},
    } as unknown as T;
  }
  public static dialogConfirm(): void {
    dialog.state.callback.ok();
  }
  public static dialogText(title: string): void {
    dialog.state.text.value = title;
    dialog.state.callback.ok();
  }
  public static dialogCheck(selectList: string[]): void {
    for (const id of dialog.state.check.sort) {
      dialog.state.check.data[id]!.check = selectList.includes(id);
    }
    dialog.state.callback.ok();
  }
  public static dialogRadio(select: string): void {
    dialog.state.radio.select = select;
    dialog.state.callback.ok();
  }
  public static execNotice(): void {
    notice.state.callback();
  }
  public static execCalendar(date: string): void {
    calendar.state.callback(date);
  }
  public static execClock(hour?: number, minute?: number): void {
    clock.state.callback(hour, minute);
  }
}
