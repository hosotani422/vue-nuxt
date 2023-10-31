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
  const backup = fs.readFileSync(`./test/memotea.bak`, `utf-8`).split(`\n`);
  app.state.backId = backup[0]!;
  list.state.data = JSON.parse(backup[1]!);
  main.state.data = JSON.parse(backup[2]!);
  sub.state.data = JSON.parse(backup[3]!);
  conf.state.data = JSON.parse(backup[4]!);
  constant.base.id.inbox = `list000`;
  constant.base.id.trash = `list900`;
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
    expect(main.getter.stateFull().sort).toEqual([`main110`, `main120`]);
    expect(main.getter.stateFull(`list900`).sort).toEqual([]);
  });
  it(`stateUnit`, () => {
    expect(main.getter.stateUnit()).toEqual({
      check: false,
      title: `main1`,
      date: `2000/01/01`,
      time: `00:00`,
      alarm: [`2`, `6`],
      task: true,
    });
    expect(main.getter.stateUnit(`list100`)).toEqual({
      check: false,
      title: `main1`,
      date: `2000/01/01`,
      time: `00:00`,
      alarm: [`2`, `6`],
      task: true,
    });
    expect(main.getter.stateUnit(undefined, `main110`)).toEqual({
      check: false,
      title: `main1`,
      date: `2000/01/01`,
      time: `00:00`,
      alarm: [`2`, `6`],
      task: true,
    });
    expect(main.getter.stateUnit(`list100`, `main120`)).toEqual({
      check: true,
      title: `main2`,
      date: ``,
      time: ``,
      alarm: [],
      task: true,
    });
  });
  it(`classItem`, () => {
    expect(main.getter.classItem(`main110`)).toEqual({
      select: true,
      check: false,
      edit: false,
      drag: false,
      hide: false,
    });
    expect(main.getter.classItem(`main120`)).toEqual({
      select: false,
      check: true,
      edit: false,
      drag: false,
      hide: false,
    });
  });
  it(`classLimit`, () => {
    vi.setSystemTime(new Date(1999, 11, 30, 0, 0, 0));
    expect(main.getter.classLimit(`main110`)).toEqual({
      "text-theme-care": false,
      "text-theme-warn": false,
    });
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0));
    expect(main.getter.classLimit(`main110`)).toEqual({
      "text-theme-care": true,
      "text-theme-warn": false,
    });
    vi.setSystemTime(new Date(2000, 1, 1, 0, 0, 0));
    expect(main.getter.classLimit(`main110`)).toEqual({
      "text-theme-care": true,
      "text-theme-warn": true,
    });
  });
  it(`textCount`, () => {
    expect(main.getter.textCount(`main110`)).toBe(`1/2`);
    expect(main.getter.textCount(`main120`)).toBe(`1/1`);
  });
});

describe(`action`, () => {
  it(`initPage`, async () => {
    vi.spyOn(main.action, `loadItem`).mockResolvedValue();
    await main.action.initPage();
    expect(main.action.loadItem).toBeCalledTimes(1);
  });
  it(`actPage`, async () => {
    vi.spyOn(main.action, `saveItem`).mockReturnValue();
    vi.spyOn(conf.action, `reactAlarm`).mockReturnValue();
    main.action.actPage();
    main.state.data[`list100`]!.data[`main110`]!.task = false;
    expect(await main.action.saveItem).toBeCalledTimes(1);
    expect(await conf.action.reactAlarm).toBeCalledTimes(1);
  });
  it(`loadItem`, async () => {
    const readMainData = { list700: { sort: [], data: {} } };
    vi.spyOn(Api, `readMain`).mockResolvedValue(readMainData);
    await main.action.loadItem();
    expect(Api.readMain).toBeCalledTimes(1);
    expect(main.state.data).toEqual(readMainData);
  });
  it(`saveItem`, () => {
    const writeMainData = { list700: { sort: [], data: {} } };
    vi.spyOn(Api, `writeMain`).mockReturnValue();
    main.state.data = writeMainData;
    main.action.saveItem();
    expect(Api.writeMain).toBeCalledTimes(1);
    expect(Api.writeMain).toBeCalledWith(writeMainData);
  });
  it(`insertItem`, () => {
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0));
    vi.spyOn(dialog.action, `open`);
    vi.spyOn(dialog.action, `close`).mockReturnValue();
    main.action.insertItem();
    expect(dialog.action.open).toBeCalledTimes(1);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.mode).toBe(`text`);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.title).toBe(
      app.getter.lang().dialog.title.insert,
    );
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.message).toBe(``);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.text!.value).toBe(``);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.text!.placeholder).toBe(
      app.getter.lang().placeholder.main,
    );
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.ok).toBe(app.getter.lang().button.ok);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.cancel).toBe(
      app.getter.lang().button.cancel,
    );
    dialog.state.callback.ok!();
    expect(main.state.data[`list100`]!.sort).toEqual([`main946566000000`, `main110`, `main120`]);
    expect(main.state.data[`list100`]!.data[`main946566000000`]).toEqual({
      check: false,
      title: ``,
      date: ``,
      time: ``,
      alarm: [],
      task: true,
    });
    expect(sub.state.data[`list100`]!.data[`main946566000000`]).toEqual({
      sort: [`sub946566000000`],
      data: { sub946566000000: { check: false, title: `` } },
    });
    expect(dialog.action.close).toBeCalledTimes(1);
    dialog.state.callback.cancel!();
    expect(dialog.action.close).toBeCalledTimes(2);
  });
  it(`copyItem`, () => {
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0));
    main.action.copyItem({ mainId: `main120` });
    expect(main.state.data[`list100`]!.sort).toEqual([`main110`, `main120`, `main946566000000`]);
    expect(main.state.data[`list100`]!.data[`main946566000000`]).toEqual({
      check: true,
      title: `main2`,
      date: ``,
      time: ``,
      alarm: [],
      task: true,
    });
    expect(sub.state.data[`list100`]!.data[`main946566000000`]).toEqual({
      sort: [`sub121`],
      data: { sub121: { check: false, title: `` } },
    });
    expect(main.state.status[`main946566000000`]).toBeUndefined();
  });
  it(`moveItem`, () => {
    vi.spyOn(dialog.action, `open`);
    vi.spyOn(dialog.action, `close`).mockReturnValue();
    main.action.moveItem({ mainId: `main120` });
    expect(dialog.action.open).toBeCalledTimes(1);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.mode).toBe(`radio`);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.title).toBe(
      app.getter.lang().dialog.title.move,
    );
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.message).toBe(``);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.radio!.none).toBe(false);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.radio!.select).toBe(app.getter.listId());
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.radio!.sort).toBe(list.state.data.sort);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.radio!.data).toBe(list.state.data.data);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.ok).toBe(app.getter.lang().button.ok);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.cancel).toBe(
      app.getter.lang().button.cancel,
    );
    dialog.state.radio.select = `list000`;
    dialog.state.callback.ok!();
    expect(main.state.data[`list100`]!.sort).toEqual([`main110`]);
    expect(main.state.data[`list100`]!.data[`main120`]).toBeUndefined();
    expect(sub.state.data[`list100`]!.data[`main120`]).toBeUndefined();
    expect(main.state.data[`list000`]!.sort).toEqual([`main120`]);
    expect(main.state.data[`list000`]!.data[`main120`]).toEqual({
      check: true,
      title: `main2`,
      date: ``,
      time: ``,
      alarm: [],
      task: true,
    });
    expect(sub.state.data[`list000`]!.data[`main120`]).toEqual({
      sort: [`sub121`],
      data: { sub121: { check: false, title: `` } },
    });
    expect(main.state.status[`main120`]).toBeUndefined();
    expect(dialog.action.close).toBeCalledTimes(1);
    dialog.state.callback.cancel!();
    expect(main.state.status[`main0000000000011`]).toBeUndefined();
    expect(main.state.status[`main120`]).toBeUndefined();
    expect(dialog.action.close).toBeCalledTimes(2);
  });
  it(`deleteItem`, () => {
    vi.spyOn(constant.base.id, `trash`, `get`).mockReturnValue(`list900`);
    vi.spyOn(constant.sound, `play`).mockReturnValue();
    vi.spyOn(notice.action, `open`);
    vi.spyOn(notice.action, `close`).mockReturnValue();
    main.action.deleteItem({ mainId: `main120` });
    expect(main.state.data[`list100`]!.sort).toEqual([`main110`]);
    expect(main.state.data[`list100`]!.data[`main120`]).toBeUndefined();
    expect(sub.state.data[`list100`]!.data[`main120`]).toBeUndefined();
    expect(main.state.status[`main120`]).toBeUndefined();
    expect(main.state.data[`list900`]!.sort).toEqual([`main120`]);
    expect(main.state.data[`list900`]!.data[`main120`]).toEqual({
      check: true,
      title: `main2`,
      date: ``,
      time: ``,
      alarm: [],
      task: true,
    });
    expect(sub.state.data[`list900`]!.data[`main120`]!.sort).toEqual([`sub121`]);
    expect(sub.state.data[`list900`]!.data[`main120`]!.data[`sub121`]).toEqual({
      check: false,
      title: ``,
    });
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
    expect(main.state.data[`list100`]!.sort).toEqual([`main110`, `main120`]);
    expect(main.state.data[`list100`]!.data[`main120`]).toEqual({
      check: true,
      title: `main2`,
      date: ``,
      time: ``,
      alarm: [],
      task: true,
    });
    expect(sub.state.data[`list100`]!.data[`main120`]!.sort).toEqual([`sub121`]);
    expect(sub.state.data[`list100`]!.data[`main120`]!.data[`sub121`]).toEqual({
      check: false,
      title: ``,
    });
    expect(main.state.data[`list900`]).toEqual({ sort: [], data: {} });
    expect(sub.state.data[`list900`]).toEqual({ data: {} });
    expect(notice.action.close).toBeCalledTimes(1);
  });
  it(`checkItem`, () => {
    vi.spyOn(constant.sound, `play`).mockReturnValue();
    main.action.checkItem({ mainId: `main110`, checked: true });
    expect(main.state.data[`list100`]!.sort).toEqual(["main120", "main110"]);
    expect(main.state.data[`list100`]!.data[`main110`]?.check).toBe(true);
    expect(constant.sound.play).toBeCalledTimes(1);
    expect(constant.sound.play).toHaveBeenCalledWith(`ok`);
    main.action.checkItem({ mainId: `main110`, checked: false });
    expect(main.state.data[`list100`]!.sort).toEqual(["main110", "main120"]);
    expect(main.state.data[`list100`]!.data[`main110`]?.check).toBe(false);
    expect(constant.sound.play).toBeCalledTimes(2);
    expect(constant.sound.play).toHaveBeenCalledWith(`cancel`);
  });
  it(`switchEdit`, () => {
    main.action.switchEdit({ mainId: `main110` });
    expect(main.state.status).toEqual({ main110: `edit`, main120: `` });
    main.action.switchEdit({ mainId: `main120` });
    expect(main.state.status).toEqual({ main110: ``, main120: `edit` });
    main.action.switchEdit();
    expect(main.state.status).toEqual({ main110: ``, main120: `` });
  });
  it(`dragInit`, () => {
    main.refer.items = {
      value: {
        main110: { getBoundingClientRect: () => ({ top: 40, left: 60, height: 40, width: 120 }) },
      },
    } as unknown as Vue.Ref<{ [K: string]: Vue.ComponentPublicInstance<HTMLElement> }>;
    vi.stubGlobal(`navigator`, { vibrate: vi.fn() });
    main.action.dragInit({ mainId: `main110`, clientY: 0 });
    expect(main.prop.drag).toEqual({
      status: `start`,
      id: `main110`,
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
    main.refer.items!.value!.main110!.cloneNode = () => ({ style: {} }) as unknown as Node;
    main.refer.wrap = { value: { appendChild: vi.fn() } } as unknown as Vue.Ref<
      Vue.ComponentPublicInstance<HTMLElement> | undefined
    >;
    main.action.dragStart();
    expect(main.prop.drag.status).toBe(`move`);
    expect(main.refer.wrap.value!.appendChild).toBeCalledTimes(1);
    expect(main.refer.wrap.value!.appendChild).toBeCalledWith({
      style: {
        position: `absolute`,
        zIndex: `1`,
        top: `40px`,
        left: `60px`,
        height: `40px`,
        width: `120px`,
      },
    });
    expect(main.state.status[`main110`]).toBe(`hide`);
  });
  it(`dragMove`, () => {
    main.prop.drag.clone!.getBoundingClientRect = () => ({ top: 80, height: 40 }) as DOMRect;
    main.refer.items!.value!.main110!.getBoundingClientRect = () =>
      ({ top: 40, left: 60, height: 40, width: 120 }) as DOMRect;
    main.refer.items!.value!.main120 = {
      getBoundingClientRect: () => ({ top: 80, left: 60, height: 40, width: 120 }),
    } as Vue.ComponentPublicInstance<HTMLElement>;
    main.action.dragMove({ clientY: 0 });
    expect(main.state.data[`list100`]!.sort).toEqual([`main120`, `main110`]);
  });
  it(`dragEnd`, () => {
    const removeClassMock = (() => {
      const mock = vi.fn();
      (main.prop.drag.clone!.classList as object) = { remove: mock };
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
      main.prop.drag.clone!.animate = mock;
      return mock;
    })();
    const removeCloneMock = (() => {
      const mock = vi.fn();
      main.prop.drag.clone!.remove = mock;
      return mock;
    })();
    main.action.dragEnd();
    expect(removeClassMock).toBeCalledTimes(1);
    expect(removeClassMock).toBeCalledWith(`edit`);
    expect(animateMock).toBeCalledTimes(1);
    expect(animateMock).toBeCalledWith({ top: [`80px`, `40px`] }, 150);
    expect(main.state.status[`main110`]).toBe(``);
    expect(removeCloneMock).toBeCalledTimes(1);
    expect(main.prop.drag).toEqual({});
  });
});
