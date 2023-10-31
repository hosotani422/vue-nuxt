import { vi, beforeEach, afterEach, describe, it, expect, SpyInstance } from "vitest";
import * as Vue from "vue";
import fs from "fs";
import * as Api from "@/api/api";
import constant from "@/utils/const";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import conf from "@/stores/page/conf";
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
    expect(list.getter.stateFull().sort).toEqual([`list100`, `list000`, `list900`]);
  });
  it(`stateUnit`, () => {
    expect(list.getter.stateUnit()).toEqual({ title: `list1` });
    expect(list.getter.stateUnit(`list000`)).toEqual({ title: `Inbox` });
  });
  it(`classItem`, () => {
    expect(list.getter.classItem(`list100`)).toEqual({ select: true, edit: false, hide: false });
    expect(list.getter.classItem(`list000`)).toEqual({ select: false, edit: false, hide: false });
  });
  it(`iconType`, () => {
    expect(list.getter.iconType(`list100`)).toBe(`ItemIconList`);
    expect(list.getter.iconType(`list000`)).toBe(`ItemIconInbox`);
    expect(list.getter.iconType(`list900`)).toBe(`ItemIconTrash`);
  });
  it(`classLimit`, () => {
    vi.setSystemTime(new Date(1999, 11, 30, 0, 0, 0));
    expect(list.getter.classLimit(`list100`)).toEqual({
      "text-theme-care": false,
      "text-theme-warn": false,
    });
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0));
    expect(list.getter.classLimit(`list100`)).toEqual({
      "text-theme-care": true,
      "text-theme-warn": false,
    });
    vi.setSystemTime(new Date(2000, 1, 1, 0, 0, 0));
    expect(list.getter.classLimit(`list100`)).toEqual({
      "text-theme-care": true,
      "text-theme-warn": true,
    });
  });
  it(`textCount`, () => {
    expect(list.getter.textCount(`list100`)).toBe(`1/2`);
    expect(list.getter.textCount(`list900`)).toBe(`0/0`);
  });
});

describe(`action`, () => {
  it(`initPage`, async () => {
    vi.spyOn(list.action, `loadItem`).mockResolvedValue();
    await list.action.initPage();
    expect(list.action.loadItem).toBeCalledTimes(1);
  });
  it(`actPage`, async () => {
    vi.spyOn(list.action, `saveItem`).mockReturnValue();
    list.action.actPage();
    list.state.data.data[`list100`]!.title = `list0`;
    expect(await list.action.saveItem).toBeCalledTimes(1);
  });
  it(`loadItem`, async () => {
    const readListData = { sort: [], data: {} };
    vi.spyOn(Api, `readList`).mockResolvedValue(readListData);
    await list.action.loadItem();
    expect(Api.readList).toBeCalledTimes(1);
    expect(list.state.data).toEqual(readListData);
  });
  it(`saveItem`, () => {
    const writeListData = { sort: [], data: {} };
    vi.spyOn(Api, `writeList`).mockReturnValue();
    list.state.data = writeListData;
    list.action.saveItem();
    expect(Api.writeList).toBeCalledTimes(1);
    expect(Api.writeList).toBeCalledWith(writeListData);
  });
  it(`insertItem`, () => {
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0));
    vi.spyOn(dialog.action, `open`);
    vi.spyOn(dialog.action, `close`).mockReturnValue();
    list.action.insertItem();
    expect(dialog.action.open).toBeCalledTimes(1);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.mode).toBe(`text`);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.title).toBe(
      app.getter.lang().dialog.title.insert,
    );
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.message).toBe(``);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.text!.value).toBe(``);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.text!.placeholder).toBe(
      app.getter.lang().placeholder.list,
    );
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.ok).toBe(app.getter.lang().button.ok);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.cancel).toBe(
      app.getter.lang().button.cancel,
    );
    dialog.state.callback.ok!();
    expect(list.state.data.sort).toEqual([`list946566000000`, `list100`, `list000`, `list900`]);
    expect(list.state.data.data[`list946566000000`]!.title).toBe(``);
    expect(main.state.data[`list946566000000`]).toEqual({ sort: [], data: {} });
    expect(sub.state.data[`list946566000000`]).toEqual({ data: {} });
    expect(dialog.action.close).toBeCalledTimes(1);
    dialog.state.callback.cancel!();
    expect(dialog.action.close).toBeCalledTimes(2);
  });
  it(`copyItem`, () => {
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0));
    list.action.copyItem({ listId: `list100` });
    expect(list.state.data.sort).toEqual([`list100`, `list946566000000`, `list000`, `list900`]);
    expect(list.state.data.data[`list946566000000`]).toEqual(list.state.data.data[`list100`]);
    expect(main.state.data[`list946566000000`]).toEqual(main.state.data[`list100`]);
    expect(sub.state.data[`list946566000000`]).toEqual(sub.state.data[`list100`]);
    expect(list.state.status[`list100`]).toBeUndefined();
  });
  it(`deleteItem`, () => {
    vi.spyOn(constant.base.id, `trash`, `get`).mockReturnValue(`list900`);
    vi.spyOn(dialog.action, `open`);
    vi.spyOn(dialog.action, `close`).mockReturnValue();
    vi.spyOn(constant.sound, `play`).mockReturnValue();
    vi.spyOn(notice.action, `open`);
    vi.spyOn(notice.action, `close`).mockReturnValue();
    list.action.deleteItem({ listId: `list100` });
    expect(dialog.action.open).toBeCalledTimes(1);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.mode).toBe(`confirm`);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.title).toBe(
      app.getter.lang().dialog.title.delete,
    );
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.message).toBe(``);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.ok).toBe(app.getter.lang().button.ok);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.cancel).toBe(
      app.getter.lang().button.cancel,
    );
    dialog.state.callback.ok!();
    expect(list.state.data.sort).toEqual([`list000`, `list900`]);
    expect(list.state.data.data[`list100`]).toBeUndefined();
    expect(main.state.data[`list100`]).toBeUndefined();
    expect(sub.state.data[`list100`]).toBeUndefined();
    expect(list.state.status[`list100`]).toBeUndefined();
    expect(main.state.data[`list900`]).toEqual({
      sort: [`main110`, `main120`],
      data: {
        main110: {
          check: false,
          title: `main1`,
          date: `2000/01/01`,
          time: `00:00`,
          alarm: [`2`, `6`],
          task: true,
        },
        main120: {
          check: true,
          title: `main2`,
          date: ``,
          time: ``,
          alarm: [],
          task: true,
        },
      },
    });
    expect(sub.state.data[`list900`]!.data).toEqual({
      main110: {
        sort: [`sub111`, `sub112`],
        data: {
          sub111: { check: false, title: `sub1` },
          sub112: { check: true, title: `sub2` },
        },
      },
      main120: {
        sort: [`sub121`],
        data: {
          sub121: { check: false, title: `` },
        },
      },
    });
    expect(dialog.action.close).toBeCalledTimes(1);
    expect(constant.sound.play).toBeCalledTimes(1);
    expect(constant.sound.play).toHaveBeenCalledWith(`warn`);
    expect(notice.action.open).toBeCalledTimes(1);
    expect((notice.action.open as unknown as SpyInstance).mock.calls[0]![0]!.message).toBe(
      app.getter.lang().notice.message,
    );
    expect((notice.action.open as unknown as SpyInstance).mock.calls[0]![0]!.button).toBe(
      app.getter.lang().notice.button,
    );
    notice.state.callback();
    expect(list.state.data.sort).toEqual([`list100`, `list000`, `list900`]);
    expect(list.state.data.data[`list100`]).toEqual({ title: `list1` });
    expect(main.state.data[`list100`]).toEqual({
      sort: [`main110`, `main120`],
      data: {
        main110: {
          check: false,
          title: `main1`,
          date: `2000/01/01`,
          time: `00:00`,
          alarm: [`2`, `6`],
          task: true,
        },
        main120: {
          check: true,
          title: `main2`,
          date: ``,
          time: ``,
          alarm: [],
          task: true,
        },
      },
    });
    expect(sub.state.data[`list100`]!.data).toEqual({
      main110: {
        sort: [`sub111`, `sub112`],
        data: {
          sub111: { check: false, title: `sub1` },
          sub112: { check: true, title: `sub2` },
        },
      },
      main120: {
        sort: [`sub121`],
        data: {
          sub121: { check: false, title: `` },
        },
      },
    });
    expect(main.state.data[`list900`]).toEqual({ sort: [], data: {} });
    expect(sub.state.data[`list900`]).toEqual({ data: {} });
    expect(notice.action.close).toBeCalledTimes(1);
    dialog.state.callback.cancel!();
    expect(list.state.status[`list100`]).toBeUndefined();
    expect(dialog.action.close).toBeCalledTimes(2);
  });
  it(`switchEdit`, () => {
    list.action.switchEdit({ listId: `list100` });
    expect(list.state.status).toEqual({ list100: `edit`, list000: ``, list900: `` });
    list.action.switchEdit({ listId: `list900` });
    expect(list.state.status).toEqual({ list100: ``, list000: ``, list900: `edit` });
    list.action.switchEdit();
    expect(list.state.status).toEqual({ list100: ``, list000: ``, list900: `` });
  });
  it(`dragInit`, () => {
    list.refer.items = {
      value: {
        list100: { getBoundingClientRect: () => ({ top: 40, left: 60, height: 40, width: 120 }) },
      },
    } as unknown as Vue.Ref<{ [K: string]: Vue.ComponentPublicInstance<HTMLElement> }>;
    vi.stubGlobal(`navigator`, { vibrate: vi.fn() });
    list.action.dragInit({ listId: `list100`, clientY: 0 });
    expect(list.prop.drag).toEqual({
      status: `start`,
      id: `list100`,
      y: 0,
      top: 40,
      left: 60,
      height: 40,
      width: 120,
    });
    expect(navigator.vibrate).toBeCalledTimes(1);
    expect(navigator.vibrate).toBeCalledWith(40);
  });
  it(`dragStart`, () => {
    list.refer.items!.value[`list100`]!.cloneNode = () => ({ style: {} }) as unknown as Node;
    list.refer.wrap = { value: { appendChild: vi.fn() } } as unknown as Vue.Ref<
      Vue.ComponentPublicInstance<HTMLElement> | undefined
    >;
    list.action.dragStart();
    expect(list.prop.drag.status).toBe(`move`);
    expect(list.refer.wrap.value!.appendChild).toBeCalledTimes(1);
    expect(list.refer.wrap.value!.appendChild).toBeCalledWith({
      style: {
        position: `absolute`,
        zIndex: `1`,
        top: `40px`,
        left: `60px`,
        height: `40px`,
        width: `120px`,
      },
    });
    expect(list.state.status[`list100`]).toBe(`hide`);
  });
  it(`dragMove`, () => {
    list.prop.drag.clone!.getBoundingClientRect = () => ({ top: 80, height: 40 }) as DOMRect;
    list.refer.items!.value[`list100`]!.getBoundingClientRect = () =>
      ({ top: 40, left: 60, height: 40, width: 120 }) as DOMRect;
    list.refer.items!.value[`list000`] = {
      getBoundingClientRect: () => ({ top: 80, left: 60, height: 40, width: 120 }),
    } as Vue.ComponentPublicInstance<HTMLElement>;
    list.action.dragMove({ clientY: 0 });
    expect(list.state.data.sort).toEqual([`list000`, `list100`, `list900`]);
  });
  it(`dragEnd`, () => {
    const removeClassMock = (() => {
      const mock = vi.fn();
      (list.prop.drag.clone!.classList as object) = { remove: mock };
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
      list.prop.drag.clone!.animate = mock;
      return mock;
    })();
    const removeCloneMock = (() => {
      const mock = vi.fn();
      list.prop.drag.clone!.remove = mock;
      return mock;
    })();
    list.action.dragEnd();
    expect(removeClassMock).toBeCalledTimes(1);
    expect(removeClassMock).toBeCalledWith(`edit`);
    expect(animateMock).toBeCalledTimes(1);
    expect(animateMock).toBeCalledWith({ top: [`80px`, `40px`] }, 150);
    expect(list.state.status[`list100`]).toBe(``);
    expect(removeCloneMock).toBeCalledTimes(1);
    expect(list.prop.drag).toEqual({});
  });
  it(`swipeInit`, () => {
    const target = {
      style: {},
      getBoundingClientRect: () => ({ left: 60, width: 120 }),
    } as unknown as HTMLElement;
    list.action.swipeInit({ target, clientX: 0, clientY: 0 });
    expect(list.prop.swipe.status).toBe(`start`);
    expect(list.prop.swipe.target).toEqual(target);
    expect(list.prop.swipe.x).toBe(0);
    expect(list.prop.swipe.y).toBe(0);
    expect(list.prop.swipe.left).toBe(60);
  });
  it(`swipeStart`, () => {
    list.action.swipeStart({ clientX: 20, clientY: 0 });
    expect(list.prop.swipe.status).toBe(`move`);
  });
  it(`swipeMove`, () => {
    list.action.swipeMove({ clientX: -100 });
    expect(list.prop.swipe.target!.style.transform).toBe(`translateX(-40px)`);
  });
  it(`swipeEnd`, () => {
    const addClassMock = vi.fn();
    const removeClassMock = vi.fn();
    const addListenerMock = vi.fn((_mode: string, listener: () => void) => {
      listener();
    });
    const removeListenerMock = vi.fn();
    (list.prop.swipe.target as unknown as { [K in string]: object }).classList = {
      add: addClassMock,
      remove: removeClassMock,
    };
    (list.prop.swipe.target as unknown as { [K in string]: object }).addEventListener = addListenerMock;
    (list.prop.swipe.target as unknown as { [K in string]: object }).removeEventListener = removeListenerMock;
    list.action.swipeEnd({ clientX: 0 });
    expect(addClassMock).toBeCalledTimes(1);
    expect(addClassMock).toBeCalledWith(`v-enter-active`);
    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`transitionend`);
    expect(removeListenerMock).toBeCalledTimes(1);
    expect(removeListenerMock.mock.calls[0]![0]).toBe(`transitionend`);
    expect(removeClassMock).toBeCalledTimes(1);
    expect(removeClassMock).toBeCalledWith(`v-enter-active`);
    expect(list.prop.swipe).toEqual({});
  });
});
