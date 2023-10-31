import { vi, beforeEach, afterEach, describe, it, expect, SpyInstance } from "vitest";
import * as Vue from "vue";
import fs from "fs";
import * as Dom from "@/utils/base/dom";
import * as Api from "@/api/api";
import constant from "@/utils/const";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import conf from "@/stores/page/conf";
import calendar from "@/stores/popup/calendar";
import clock from "@/stores/popup/clock";
import dialog from "@/stores/popup/dialog";
import notice from "@/stores/popup/notice";

beforeEach(async () => {
  constant.base.id.inbox = `list000`;
  constant.base.id.trash = `list900`;
  const backup = fs.readFileSync(`./test/memotea.bak`, `utf-8`).split(`\n`);
  app.state.backId = backup[0]!;
  list.state.data = JSON.parse(backup[1]!);
  main.state.data = JSON.parse(backup[2]!);
  sub.state.data = JSON.parse(backup[3]!);
  conf.state.data = JSON.parse(backup[4]!);
  vi.mock(`vue-router`, () => ({
    useRoute: () => ({
      params: { listId: `list100`, mainId: `main110` },
    }),
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe(`getter`, () => {
  it(`stateFull`, () => {
    expect(sub.getter.stateFull().sort).toEqual([`sub111`, `sub112`]);
    expect(sub.getter.stateFull(`list100`).sort).toEqual([`sub111`, `sub112`]);
    expect(sub.getter.stateFull(undefined, `main110`).sort).toEqual([`sub111`, `sub112`]);
    expect(sub.getter.stateFull(`list100`, `main120`).sort).toEqual([`sub121`]);
  });
  it(`stateUnit`, () => {
    expect(sub.getter.stateUnit(undefined, undefined, `sub111`)).toEqual({
      check: false,
      title: `sub1`,
    });
    expect(sub.getter.stateUnit(undefined, `main110`, `sub111`)).toEqual({
      check: false,
      title: `sub1`,
    });
    expect(sub.getter.stateUnit(`list100`, undefined, `sub111`)).toEqual({
      check: false,
      title: `sub1`,
    });
    expect(sub.getter.stateUnit(`list100`, `main120`, `sub121`)).toEqual({
      check: false,
      title: ``,
    });
  });
  it(`classItem`, () => {
    expect(sub.getter.classItem(`sub111`)).toEqual({
      check: false,
      edit: false,
      drag: false,
      hide: false,
    });
    expect(sub.getter.classItem(`sub112`)).toEqual({
      check: true,
      edit: false,
      drag: false,
      hide: false,
    });
  });
  it(`textMemo`, () => {
    expect(sub.getter.textMemo()).toEqual(`sub1\nsub2`);
  });
  it(`classLimit`, () => {
    vi.setSystemTime(new Date(1999, 11, 30, 0, 0, 0));
    expect(sub.getter.classLimit()).toEqual({ "text-theme-care": false, "text-theme-warn": false });
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0));
    expect(sub.getter.classLimit()).toEqual({ "text-theme-care": true, "text-theme-warn": false });
    vi.setSystemTime(new Date(2000, 1, 1, 0, 0, 0));
    expect(sub.getter.classLimit()).toEqual({ "text-theme-care": true, "text-theme-warn": true });
  });
  it(`textAlarm`, () => {
    expect(sub.getter.textAlarm()).toEqual(`5分前,1時間前`);
  });
});

describe(`action`, () => {
  it(`initPage`, async () => {
    vi.spyOn(sub.action, `loadItem`).mockResolvedValue();
    await sub.action.initPage();
    expect(sub.action.loadItem).toBeCalledTimes(1);
  });
  it(`actPage`, async () => {
    vi.spyOn(sub.action, `saveItem`).mockReturnValue();
    sub.action.actPage();
    sub.state.data[`list100`]!.data[`main110`]!.data[`sub111`]!.check = true;
    expect(await sub.action.saveItem).toBeCalledTimes(1);
  });
  it(`loadItem`, async () => {
    const readSubData = { list900: { data: {} } };
    vi.spyOn(Api, `readSub`).mockResolvedValue(readSubData);
    await sub.action.loadItem();
    expect(Api.readSub).toBeCalledTimes(1);
    expect(sub.state.data).toEqual(readSubData);
  });
  it(`saveItem`, () => {
    const writeSubData = { list900: { data: {} } };
    vi.spyOn(Api, `writeSub`).mockReturnValue();
    sub.state.data = writeSubData;
    sub.action.saveItem();
    expect(Api.writeSub).toBeCalledTimes(1);
    expect(Api.writeSub).toBeCalledWith(writeSubData);
  });
  it(`inputItem`, () => {
    sub.refer.titles = { value: { sub111: { $el: `inputItem` } } } as unknown as Vue.Ref<{
      [K: string]: Vue.ComponentPublicInstance<HTMLElement>;
    }>;
    vi.spyOn(Dom, `resize`).mockReturnValue(0);
    sub.action.inputItem({ subId: `sub111` });
    expect(Dom.resize).toBeCalledTimes(1);
    expect(Dom.resize).toBeCalledWith(`inputItem`);
  });
  it(`enterItem`, async () => {
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0));
    sub.refer.titles = {
      value: {
        sub111: { $el: { value: `` } },
        sub946566000000: { $el: { focus: vi.fn() } },
      },
    } as unknown as Vue.Ref<{ [K: string]: Vue.ComponentPublicInstance<HTMLElement> }>;
    sub.refer.items = {
      value: {
        sub111: {
          style: {},
          addEventListener: vi.fn((_mode: string, listener: () => void) => {
            listener();
          }),
          removeEventListener: vi.fn(),
        },
      },
    } as unknown as Vue.Ref<{
      [K: string]: Vue.ComponentPublicInstance<HTMLElement>;
    }>;
    vi.spyOn(Dom, `resize`).mockReturnValue(0);
    await sub.action.enterItem({ subId: `sub111`, selectionStart: 3 });
    expect(sub.state.data[`list100`]!.data[`main110`]!.sort).toEqual([`sub111`, `sub946566000000`, `sub112`]);
    expect(sub.state.data[`list100`]!.data[`main110`]!.data[`sub111`]!.title).toEqual(`sub`);
    expect(sub.state.data[`list100`]!.data[`main110`]!.data[`sub946566000000`]!.title).toEqual(`1`);
    expect(sub.refer.titles!.value[`sub111`]!.$el.value).toBe(`sub`);
    expect(sub.refer.titles.value.sub946566000000!.$el.focus).toBeCalledTimes(1);
    expect(Dom.resize).toBeCalledTimes(1);
    expect(Dom.resize).toBeCalledWith({ value: `sub` });
    expect(sub.refer.items.value.sub111!.addEventListener).toBeCalledTimes(1);
    expect(sub.refer.items.value.sub111!.removeEventListener).toBeCalledTimes(1);
    expect(sub.refer.items!.value[`sub111`]!.style.height).toBe(``);
  });
  it(`backItem`, async () => {
    sub.refer.titles = {
      value: { sub111: { $el: { focus: vi.fn() } } },
    } as unknown as Vue.Ref<{ [K: string]: Vue.ComponentPublicInstance<HTMLElement> }>;
    vi.spyOn(Dom, `resize`).mockReturnValue(0);
    await sub.action.backItem({ subId: `sub112` });
    expect(sub.state.data[`list100`]!.data[`main110`]!.sort).toEqual([`sub111`]);
    expect(sub.state.data[`list100`]!.data[`main110`]!.data[`sub111`]!.title).toEqual(`sub1sub2`);
    expect(sub.state.data[`list100`]!.data[`main110`]!.data[`sub112`]).toBeUndefined();
    expect(sub.refer.titles!.value[`sub111`]!.$el.value).toBe(`sub1sub2`);
    expect(Dom.resize).toBeCalledTimes(1);
    expect(sub.refer.titles.value.sub111!.$el.focus).toBeCalledTimes(1);
    expect(sub.refer.titles!.value[`sub111`]!.$el.selectionStart).toBe(4);
    expect(sub.refer.titles!.value[`sub111`]!.$el.selectionEnd).toBe(4);
  });
  it(`deleteItem`, async () => {
    sub.refer.items = {
      value: {
        sub112: {
          style: {},
          addEventListener: vi.fn((_mode: string, listener: () => void) => {
            listener();
          }),
          removeEventListener: vi.fn(),
        },
      },
    } as unknown as Vue.Ref<{
      [K: string]: Vue.ComponentPublicInstance<HTMLElement>;
    }>;
    vi.spyOn(Dom, `resize`).mockReturnValue(0);
    vi.spyOn(constant.sound, `play`).mockReturnValue();
    vi.spyOn(notice.action, `open`);
    vi.spyOn(notice.action, `close`).mockReturnValue();
    sub.action.deleteItem({ subId: `sub112` });
    expect(Dom.resize).toBeCalledTimes(1);
    expect(Dom.resize).toHaveBeenCalledWith(sub.refer.items.value.sub112);
    expect(sub.state.data[`list100`]!.data[`main110`]!.sort).toEqual([`sub111`]);
    expect(sub.state.data[`list100`]!.data[`main110`]!.data[`sub112`]).toBeUndefined();
    expect(sub.state.status[`sub112`]).toBeUndefined();
    expect(constant.sound.play).toBeCalledTimes(1);
    expect(constant.sound.play).toHaveBeenCalledWith(`warn`);
    expect(notice.action.open).toBeCalledTimes(1);
    expect((notice.action.open as unknown as SpyInstance).mock.calls[0]![0]!.message).toBe(
      app.getter.lang().notice.message,
    );
    expect((notice.action.open as unknown as SpyInstance).mock.calls[0]![0]!.button).toBe(
      app.getter.lang().notice.button,
    );
    await notice.state.callback();
    expect(notice.action.close).toBeCalledTimes(1);
    expect(sub.state.data[`list100`]!.data[`main110`]!.sort).toEqual([`sub111`, `sub112`]);
    expect(Dom.resize).toBeCalledTimes(2);
    expect(Dom.resize).toHaveBeenCalledWith(sub.refer.items.value.sub112, 0);
    expect(sub.refer.items.value.sub112!.addEventListener).toBeCalledTimes(1);
    expect(sub.refer.items.value.sub112!.removeEventListener).toBeCalledTimes(1);
    expect(sub.refer.items!.value[`sub112`]!.style.height).toBe(``);
  });
  it(`checkItem`, () => {
    vi.spyOn(constant.sound, `play`).mockReturnValue();
    sub.action.checkItem({ subId: `sub111`, checked: true });
    expect(sub.state.data[`list100`]!.data[`main110`]!.sort).toEqual(["sub112", "sub111"]);
    expect(sub.state.data[`list100`]!.data[`main110`]!.data[`sub111`]!.check).toBe(true);
    expect(constant.sound.play).toBeCalledTimes(1);
    expect(constant.sound.play).toHaveBeenCalledWith(`ok`);
    sub.action.checkItem({ subId: `sub111`, checked: false });
    expect(sub.state.data[`list100`]!.data[`main110`]!.sort).toEqual(["sub111", "sub112"]);
    expect(sub.state.data[`list100`]!.data[`main110`]!.data[`sub111`]!.check).toBe(false);
    expect(constant.sound.play).toBeCalledTimes(2);
    expect(constant.sound.play).toHaveBeenCalledWith(`cancel`);
  });
  it(`switchItem`, () => {
    sub.action.switchItem();
    expect(main.state.data[`list100`]!.data[`main110`]!.task).toBe(false);
    sub.action.switchItem();
    expect(main.state.data[`list100`]!.data[`main110`]!.task).toBe(true);
  });
  it(`switchEdit`, () => {
    sub.action.switchEdit({ subId: `sub111` });
    expect(sub.state.status).toEqual({ sub111: `edit`, sub112: `` });
    sub.action.switchEdit({ subId: `sub112` });
    expect(sub.state.status).toEqual({ sub111: ``, sub112: `edit` });
    sub.action.switchEdit();
    expect(sub.state.status).toEqual({ sub111: ``, sub112: `` });
  });
  it(`inputMemo`, () => {
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0));
    sub.action.inputMemo({ value: `memo1\nmemo2` });
    expect(sub.state.data[`list100`]!.data[`main110`]!.sort).toEqual([`sub9465660000000`, `sub9465660000001`]);
    expect(sub.state.data[`list100`]!.data[`main110`]!.data[`sub9465660000000`]).toEqual({
      check: false,
      title: `memo1`,
    });
    expect(sub.state.data[`list100`]!.data[`main110`]!.data[`sub9465660000001`]).toEqual({
      check: false,
      title: `memo2`,
    });
  });
  it(`openCalendar`, () => {
    vi.spyOn(calendar.action, `open`);
    vi.spyOn(calendar.action, `close`).mockReturnValue();
    sub.action.openCalendar({ date: `1999/12/31` });
    expect(calendar.action.open).toBeCalledTimes(1);
    expect((calendar.action.open as unknown as SpyInstance).mock.calls[0]![0]!.select).toBe(`1999/12/31`);
    expect((calendar.action.open as unknown as SpyInstance).mock.calls[0]![0]!.current).toBe(`1999/12`);
    expect((calendar.action.open as unknown as SpyInstance).mock.calls[0]![0]!.cancel).toBe(
      app.getter.lang().button.cancel,
    );
    expect((calendar.action.open as unknown as SpyInstance).mock.calls[0]![0]!.clear).toBe(
      app.getter.lang().button.clear,
    );
    calendar.state.callback(`2000/01/01`);
    expect(calendar.action.close).toBeCalledTimes(1);
    expect(main.state.data[`list100`]!.data[`main110`]!.date).toBe(`2000/01/01`);
  });
  it(`openClock`, () => {
    clock.refer.hour = { value: 0 } as unknown as Vue.Ref<Vue.ComponentPublicInstance<HTMLCanvasElement> | undefined>;
    clock.refer.minute = { value: 0 } as unknown as Vue.Ref<Vue.ComponentPublicInstance<HTMLCanvasElement> | undefined>;
    vi.spyOn(clock.action, `open`);
    vi.spyOn(clock.action, `close`).mockReturnValue();
    vi.spyOn(clock.action, `drawHour`).mockReturnValue();
    vi.spyOn(clock.action, `drawMinute`).mockReturnValue();
    sub.action.openClock({ time: `12:45` });
    expect(clock.action.open).toBeCalledTimes(1);
    expect((clock.action.open as unknown as SpyInstance).mock.calls[0]![0]!.hour).toBe(12);
    expect((clock.action.open as unknown as SpyInstance).mock.calls[0]![0]!.minute).toBe(45);
    expect((clock.action.open as unknown as SpyInstance).mock.calls[0]![0]!.cancel).toBe(
      app.getter.lang().button.cancel,
    );
    expect((clock.action.open as unknown as SpyInstance).mock.calls[0]![0]!.clear).toBe(app.getter.lang().button.clear);
    expect((clock.action.open as unknown as SpyInstance).mock.calls[0]![0]!.ok).toBe(app.getter.lang().button.ok);
    clock.state.callback(23, 59);
    expect(clock.action.close).toBeCalledTimes(1);
    expect(main.state.data[`list100`]!.data[`main110`]!.time).toBe(`23:59`);
  });
  it(`openAlarm`, () => {
    vi.spyOn(dialog.action, `open`);
    vi.spyOn(dialog.action, `close`).mockReturnValue();
    sub.action.openAlarm();
    expect(dialog.action.open).toBeCalledTimes(1);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.mode).toBe(`check`);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.title).toBe(
      app.getter.lang().dialog.alarm.title,
    );
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.message).toBe(``);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.check!.all).toBe(true);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.check!.sort).toBe(
      app.getter.lang().dialog.alarm.sort,
    );
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.check!.data).toEqual({
      "1": { check: false, title: `時刻通り` },
      "2": { check: true, title: `5分前` },
      "3": { check: false, title: `10分前` },
      "4": { check: false, title: `15分前` },
      "5": { check: false, title: `30分前` },
      "6": { check: true, title: `1時間前` },
      "7": { check: false, title: `2時間前` },
      "8": { check: false, title: `3時間前` },
      "9": { check: false, title: `6時間前` },
      "10": { check: false, title: `12時間前` },
      "11": { check: false, title: `1日前` },
      "12": { check: false, title: `2日前` },
    });
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.ok).toBe(app.getter.lang().button.ok);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.cancel).toBe(
      app.getter.lang().button.cancel,
    );
    dialog.state.check.data[`6`]!.check = false;
    dialog.state.callback.ok!();
    expect(dialog.action.close).toBeCalledTimes(1);
    expect(main.state.data[`list100`]!.data[`main110`]!.alarm).toEqual([`2`]);
    dialog.state.callback.cancel!();
    expect(dialog.action.close).toBeCalledTimes(2);
  });
  it(`dragInit`, () => {
    sub.refer.home = {
      value: { getBoundingClientRect: () => ({ left: 60 }) },
    } as unknown as Vue.Ref<Vue.ComponentPublicInstance<HTMLElement> | undefined>;
    sub.refer.items = {
      value: {
        sub111: { getBoundingClientRect: () => ({ top: 40, left: 60, height: 40, width: 120 }) },
      },
    } as unknown as Vue.Ref<{ [K: string]: Vue.ComponentPublicInstance<HTMLElement> }>;
    vi.stubGlobal(`navigator`, { vibrate: vi.fn() });
    sub.action.dragInit({ subId: `sub111`, clientY: 0 });
    expect(sub.prop.drag).toEqual({
      status: `start`,
      id: `sub111`,
      y: 0,
      top: 40,
      left: 0,
      height: 40,
      width: 120,
    });
    expect(sub.state.status[`sub111`]).toBe(`edit`);
    expect(navigator.vibrate).toBeCalledTimes(1);
    expect(navigator.vibrate).toBeCalledWith(40);
  });
  it(`dragStart`, () => {
    sub.refer.items!.value!.sub111!.cloneNode = () => ({ style: {} }) as unknown as Node;
    sub.refer.wrap = { value: { appendChild: vi.fn() } } as unknown as Vue.Ref<
      Vue.ComponentPublicInstance<HTMLElement> | undefined
    >;
    sub.action.dragStart();
    expect(sub.prop.drag.status).toBe(`move`);
    expect(sub.refer.wrap.value!.appendChild).toBeCalledTimes(1);
    expect(sub.refer.wrap.value!.appendChild).toBeCalledWith({
      style: {
        position: `absolute`,
        zIndex: `1`,
        top: `40px`,
        left: `0px`,
        height: `40px`,
        width: `120px`,
      },
    });
    expect(sub.state.status[`sub111`]).toBe(`hide`);
  });
  it(`dragMove`, () => {
    sub.prop.drag.clone!.getBoundingClientRect = () => ({ top: 80, height: 40 }) as DOMRect;
    sub.refer.wrap!.value!.getBoundingClientRect = () => ({ top: 0, height: 40 }) as DOMRect;
    sub.refer.items!.value!.sub111!.getBoundingClientRect = () =>
      ({ top: 40, left: 60, height: 40, width: 120 }) as DOMRect;
    sub.refer.items!.value!.sub112 = {
      getBoundingClientRect: () => ({ top: 80, left: 60, height: 40, width: 120 }),
    } as Vue.ComponentPublicInstance<HTMLElement>;
    sub.action.dragMove({ clientY: 0 });
    expect(sub.state.data[`list100`]!.data[`main110`]!.sort).toEqual([`sub112`, `sub111`]);
  });
  it(`dragEnd`, () => {
    const removeClassMock = (() => {
      const mock = vi.fn();
      (sub.prop.drag.clone!.classList as object) = { remove: mock };
      return mock;
    })();
    const animateMock = (() => {
      const mock = vi.fn(
        () =>
          ({
            addEventListener: (_mode: string, listener: () => void) => {
              listener();
            },
          }) as Animation,
      );
      sub.prop.drag.clone!.animate = mock;
      return mock;
    })();
    const removeCloneMock = (() => {
      const mock = vi.fn();
      sub.prop.drag.clone!.remove = mock;
      return mock;
    })();
    sub.action.dragEnd();
    expect(removeClassMock).toBeCalledTimes(1);
    expect(removeClassMock).toBeCalledWith(`edit`);
    expect(animateMock).toBeCalledTimes(1);
    expect(animateMock).toBeCalledWith({ top: [`80px`, `40px`] }, 150);
    expect(sub.state.status[`sub111`]).toBe(``);
    expect(removeCloneMock).toBeCalledTimes(1);
    expect(sub.prop.drag).toEqual({});
  });
  it(`swipeInit`, () => {
    const target = {
      style: {},
      getBoundingClientRect: () => ({ left: 60, width: 120 }),
    } as unknown as HTMLElement;
    sub.action.swipeInit({ target, clientX: 0, clientY: 0 });
    expect(sub.prop.swipe.status).toBe(`start`);
    expect(sub.prop.swipe.target).toEqual(target);
    expect(sub.prop.swipe.x).toBe(0);
    expect(sub.prop.swipe.y).toBe(0);
    expect(sub.prop.swipe.right).toBe(120);
  });
  it(`swipeStart`, () => {
    sub.action.swipeStart({ clientX: 20, clientY: 0 });
    expect(sub.prop.swipe.status).toBe(`move`);
  });
  it(`swipeMove`, () => {
    sub.action.swipeMove({ clientX: 20 });
    expect(sub.prop.swipe.target!.style.transform).toBe(`translateX(140px)`);
  });
  it(`swipeEnd`, () => {
    const addClassMock = vi.fn();
    const removeClassMock = vi.fn();
    const addListenerMock = vi.fn((_mode: string, listener: () => void) => {
      listener();
    });
    const removeListenerMock = vi.fn();
    (sub.prop.swipe.target as unknown as { [K in string]: object }).classList = {
      add: addClassMock,
      remove: removeClassMock,
    };
    (sub.prop.swipe.target as unknown as { [K in string]: object }).addEventListener = addListenerMock;
    (sub.prop.swipe.target as unknown as { [K in string]: object }).removeEventListener = removeListenerMock;
    sub.action.swipeEnd({ clientX: -100 });
    expect(addClassMock).toBeCalledTimes(1);
    expect(addClassMock).toBeCalledWith(`v-enter-active`);
    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`transitionend`);
    expect(removeListenerMock).toBeCalledTimes(1);
    expect(removeListenerMock.mock.calls[0]![0]).toBe(`transitionend`);
    expect(removeClassMock).toBeCalledTimes(1);
    expect(removeClassMock).toBeCalledWith(`v-enter-active`);
    expect(sub.prop.swipe).toEqual({});
  });
});
