import { vi, beforeEach, afterEach, describe, it, expect, SpyInstance } from "vitest";
import fs from "fs";
import * as Api from "@/api/api";
import * as Cordova from "@/utils/cordova/cordova";
import constant from "@/utils/const";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import conf from "@/stores/page/conf";
import dialog from "@/stores/popup/dialog";

beforeEach(async () => {
  process.client = true;
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

describe(`action`, () => {
  it(`initPage`, async () => {
    vi.spyOn(conf.action, `loadItem`).mockResolvedValue();
    await conf.action.initPage();
    expect(conf.action.loadItem).toBeCalledTimes(1);
  });
  it(`actPage`, async () => {
    vi.spyOn(conf.action, `saveItem`).mockReturnValue();
    conf.action.actPage();
    conf.state.data.speed = 3;
    expect(await conf.action.saveItem).toBeCalledTimes(1);
  });
  it(`loadItem`, async () => {
    const readConfData: typeof conf.state.data = {
      size: 3,
      speed: 2,
      volume: 1,
      vibrate: `on`,
      theme: `light`,
      lang: `jp`,
      save: `local`,
    };
    vi.spyOn(Api, `readConf`).mockResolvedValue(readConfData);
    await conf.action.loadItem();
    expect(Api.readConf).toBeCalledTimes(1);
    expect(conf.state.data).toEqual(readConfData);
  });
  it(`saveItem`, () => {
    const writeConfData: typeof conf.state.data = {
      size: 3,
      speed: 2,
      volume: 1,
      vibrate: `on`,
      theme: `light`,
      lang: `jp`,
      save: `local`,
    };
    vi.spyOn(Api, `writeConf`).mockReturnValue();
    conf.state.data = writeConfData;
    conf.action.saveItem();
    expect(Api.writeConf).toBeCalledTimes(1);
    expect(Api.writeConf).toBeCalledWith(writeConfData);
  });
  it(`reactSound`, () => {
    vi.spyOn(constant.sound, `volume`).mockReturnValue();
    conf.action.reactSound();
    expect(constant.sound.volume).toBeCalledTimes(1);
    expect(constant.sound.volume).toBeCalledWith(conf.state.data.volume / 3);
  });
  it(`reactAlarm`, () => {
    vi.spyOn(Cordova.Notice, `removeAll`).mockReturnValue();
    vi.spyOn(Cordova.Notice, `insert`).mockReturnValue();
    conf.action.reactAlarm();
    expect(Cordova.Notice.removeAll).toBeCalledTimes(1);
    expect(Cordova.Notice.insert).toBeCalledTimes(2);
    expect(Cordova.Notice.insert).toBeCalledWith({
      title: app.getter.lang().dialog.title.alarm,
      message: `list1 ⇒ main1`,
      date: new Date(`1999/12/31 23:55`),
    });
    expect(Cordova.Notice.insert).toBeCalledWith({
      title: app.getter.lang().dialog.title.alarm,
      message: `list1 ⇒ main1`,
      date: new Date(`1999/12/31 23:00`),
    });
  });
  it(`downloadBackup`, () => {
    const eventData = { currentTarget: { setAttribute: vi.fn() } } as unknown as Event;
    conf.action.downloadBackup({ event: eventData });
    expect((eventData.currentTarget as HTMLElement).setAttribute).toBeCalledTimes(2);
    expect((eventData.currentTarget as HTMLElement).setAttribute).toBeCalledWith(`download`, constant.base.backup);
    expect((eventData.currentTarget as HTMLElement).setAttribute).toBeCalledWith(
      `href`,
      `data:text/plain,${encodeURIComponent(
        `${app.getter.listId()}\n` +
          `${JSON.stringify(list.state.data)}\n${JSON.stringify(main.state.data)}\n` +
          `${JSON.stringify(sub.state.data)}\n${JSON.stringify(conf.state.data)}`,
      )}`,
    );
  });
  it(`uploadBackup`, () => {
    const eventData = { target: { files: [`uploadFile`] } } as unknown as Event;
    vi.spyOn(FileReader.prototype, `readAsText`).mockReturnValue();
    conf.action.uploadBackup({ event: eventData });
    expect(FileReader.prototype.readAsText).toBeCalledTimes(1);
    expect(FileReader.prototype.readAsText).toBeCalledWith(`uploadFile`);
  });
  it(`resetConf`, () => {
    vi.spyOn(dialog.action, `open`);
    vi.spyOn(dialog.action, `close`).mockReturnValue();
    conf.action.resetConf();
    expect(dialog.action.open).toBeCalledTimes(1);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.mode).toBe(`confirm`);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.title).toBe(
      app.getter.lang().dialog.title.reset,
    );
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.message).toBe(``);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.ok).toBe(app.getter.lang().button.ok);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.cancel).toBe(
      app.getter.lang().button.cancel,
    );
    dialog.state.callback.ok!();
    expect(conf.state.data).toEqual(constant.init.conf);
    expect(dialog.action.close).toBeCalledTimes(1);
    dialog.state.callback.cancel!();
    expect(dialog.action.close).toBeCalledTimes(2);
  });
  it(`resetList`, () => {
    vi.spyOn(dialog.action, `open`);
    vi.spyOn(dialog.action, `close`).mockReturnValue();
    vi.spyOn(app.action, `routerBack`).mockReturnValue();
    conf.action.resetList();
    expect(dialog.action.open).toBeCalledTimes(1);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.mode).toBe(`confirm`);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.title).toBe(
      app.getter.lang().dialog.title.reset,
    );
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.message).toBe(``);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.ok).toBe(app.getter.lang().button.ok);
    expect((dialog.action.open as unknown as SpyInstance).mock.calls[0]![0]!.cancel).toBe(
      app.getter.lang().button.cancel,
    );
    dialog.state.callback.ok!();
    expect(list.state.data).toEqual(constant.init.list);
    expect(main.state.data).toEqual(constant.init.main);
    expect(sub.state.data).toEqual(constant.init.sub);
    expect(app.action.routerBack).toBeCalledTimes(1);
    expect(app.action.routerBack).toBeCalledWith({ listId: constant.init.listId });
    expect(dialog.action.close).toBeCalledTimes(1);
    dialog.state.callback.cancel!();
    expect(dialog.action.close).toBeCalledTimes(2);
  });
  it(`swipeInit`, () => {
    const target = {
      style: {},
      getBoundingClientRect: () => ({ top: 40, height: 40 }),
    } as unknown as HTMLElement;
    conf.action.swipeInit({ target, clientX: 0, clientY: 0 });
    expect(conf.prop.swipe.status).toBe(`start`);
    expect(conf.prop.swipe.target).toEqual(target);
    expect(conf.prop.swipe.x).toBe(0);
    expect(conf.prop.swipe.y).toBe(0);
    expect(conf.prop.swipe.top).toBe(60);
  });
  it(`swipeStart`, () => {
    conf.action.swipeStart({ clientX: 0, clientY: 20 });
    expect(conf.prop.swipe.status).toBe(`move`);
  });
  it(`swipeMove`, () => {
    conf.action.swipeMove({ clientY: 20 });
    expect(conf.prop.swipe.target!.style.transform).toBe(`translateY(80px)`);
  });
  it(`swipeEnd`, () => {
    const addClassMock = vi.fn();
    const removeClassMock = vi.fn();
    const addListenerMock = vi.fn((_mode: string, listener: () => void) => {
      listener();
    });
    const removeListenerMock = vi.fn();
    (conf.prop.swipe.target as unknown as { [K in string]: object }).classList = {
      add: addClassMock,
      remove: removeClassMock,
    };
    (conf.prop.swipe.target as unknown as { [K in string]: object }).addEventListener = addListenerMock;
    (conf.prop.swipe.target as unknown as { [K in string]: object }).removeEventListener = removeListenerMock;
    conf.action.swipeEnd({ clientY: 20 });
    expect(addClassMock).toBeCalledTimes(1);
    expect(addClassMock).toBeCalledWith(`v-enter-active`);
    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`transitionend`);
    expect(removeListenerMock).toBeCalledTimes(1);
    expect(removeListenerMock.mock.calls[0]![0]).toBe(`transitionend`);
    expect(removeClassMock).toBeCalledTimes(1);
    expect(removeClassMock).toBeCalledWith(`v-enter-active`);
    expect(conf.prop.swipe).toEqual({});
  });
});
