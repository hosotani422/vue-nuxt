import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import i18next from "i18next";
import Api from "@/api/api";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import conf from "@/stores/page/conf";
import dialog from "@/stores/popup/dialog";
import fixture from "../../../fixture/base";

beforeEach(async () => {
  await fixture.init();
  vi.mock(`vue-router`, () => ({
    useRoute: () => ({
      params: { listId: `list1111111111111`, mainId: `main1111111111111` },
    }),
    useRouter: () => ({ push: () => {}, replace: () => {}, back: () => {} }),
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe(`handle`, () => {
  it(`init`, async () => {
    const readMock = vi.spyOn(Api, `readConf`).mockResolvedValue({
      size: 2,
      speed: 2,
      theme: `light`,
      lang: `ja`,
      vibrate: `on`,
      save: `local`,
    });
    const writeMock = vi.spyOn(Api, `writeConf`).mockReturnValue();
    const langMock = vi.spyOn(conf.handle, `setLang`).mockResolvedValue();
    await conf.handle.init();
    expect(readMock).toBeCalledTimes(1);
    expect(readMock).toBeCalledWith();
    expect(langMock).toBeCalledTimes(1);
    expect(langMock).toBeCalledWith({ lang: `ja` });
    expect(conf.state.data).toEqual({
      size: 2,
      speed: 2,
      theme: `light`,
      lang: `ja`,
      vibrate: `on`,
      save: `local`,
    });
    conf.state.data.lang = `en`;
    expect(writeMock).toBeCalledTimes(1);
    expect(writeMock).toBeCalledWith({
      size: 2,
      speed: 2,
      theme: `light`,
      lang: `en`,
      vibrate: `on`,
      save: `local`,
    });
    expect(langMock).toBeCalledTimes(3);
    expect(langMock).toBeCalledWith({ lang: `en` });
  });
  it(`setLang`, async () => {
    const langMock = vi.spyOn(i18next, `changeLanguage`).mockReturnThis();
    const updateMock = vi.spyOn(app.handle, `forceUpdate`).mockReturnValue();
    await conf.handle.setLang({ lang: `en` });
    expect(langMock).toBeCalledTimes(1);
    expect(langMock).toBeCalledWith(`en`);
    expect(updateMock).toBeCalledTimes(1);
    expect(updateMock).toBeCalledWith();
  });
  it(`downloadBackup`, () => {
    const attributeMock = vi.fn();
    const elem = { setAttribute: attributeMock } as unknown as HTMLElement;
    conf.handle.downloadBackup({ elem });
    expect(attributeMock).toBeCalledTimes(2);
    expect(attributeMock).toBeCalledWith(`download`, `memosuku.bak`);
    expect(attributeMock).toBeCalledWith(
      `href`,
      `data:text/plain,${encodeURIComponent(
        `${app.render.listId()}\n` +
          `${JSON.stringify(list.state.data)}\n` +
          `${JSON.stringify(main.state.data)}\n` +
          `${JSON.stringify(sub.state.data)}\n` +
          `${JSON.stringify(conf.state.data)}`,
      )}`,
    );
  });
  it(`uploadBackup`, async () => {
    const readMock = vi.spyOn(FileReader.prototype, `readAsText`);
    const listenerMock = vi.spyOn(FileReader.prototype, `addEventListener`);
    const routerMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    const openMock = vi.spyOn(dialog.handle, `open`);
    const closeMock = vi.spyOn(dialog.handle, `close`).mockReturnValue();
    conf.handle.uploadBackup({
      files: [
        new File(
          [
            `list0000000000000\n` +
              `{"sort":["list0000000000000"],"data":{"list0000000000000":{"title":"Inbox"}}}\n` +
              `{"list0000000000000":{"sort":[],"data":{}}}\n` +
              `{"list0000000000000":{"data":{}}}\n` +
              `{"size":2,"speed":2,"theme":"dark","lang":"ja","vibrate":"on","save":"local"}`,
          ],
          `memosuku.bak`,
          { type: `text/plain` },
        ),
      ] as unknown as FileList,
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(readMock).toBeCalledTimes(1);
    expect(listenerMock).toBeCalledTimes(1);
    expect(listenerMock.mock.calls[0]![0]).toBe(`load`);
    expect(conf.state.data).toEqual({
      size: 2,
      speed: 2,
      theme: `dark`,
      lang: `ja`,
      vibrate: `on`,
      save: `local`,
    });
    expect(list.state.data).toEqual({
      sort: ["list0000000000000"],
      data: { list0000000000000: { title: "Inbox" } },
    });
    expect(main.state.data).toEqual({ list0000000000000: { sort: [], data: {} } });
    expect(sub.state.data).toEqual({ list0000000000000: { data: {} } });
    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith({ listId: `list0000000000000` });
    conf.handle.uploadBackup({ files: [new File([``], ``)] as unknown as FileList });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(openMock).toBeCalledTimes(1);
    expect(openMock.mock.calls[0]![0]!.mode).toBe(`alert`);
    expect(openMock.mock.calls[0]![0]!.title).toBe(`ファイルの形式が違います`);
    expect(openMock.mock.calls[0]![0]!.message).toBe(``);
    expect(openMock.mock.calls[0]![0]!.cancel).toBe(`決定`);
    dialog.refer.callback.cancel!();
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
  });
  it(`resetConf`, () => {
    const openMock = vi.spyOn(dialog.handle, `open`);
    const closeMock = vi.spyOn(dialog.handle, `close`).mockReturnValue();
    conf.handle.resetConf();
    expect(openMock).toBeCalledTimes(1);
    expect(openMock.mock.calls[0]![0]!.mode).toBe(`confirm`);
    expect(openMock.mock.calls[0]![0]!.title).toBe(`本当にリセットしますか`);
    expect(openMock.mock.calls[0]![0]!.message).toBe(``);
    expect(openMock.mock.calls[0]![0]!.ok).toBe(`決定`);
    expect(openMock.mock.calls[0]![0]!.cancel).toBe(`キャンセル`);
    dialog.refer.callback.ok!();
    expect(conf.state.data).toEqual({
      size: 2,
      speed: 2,
      theme: `light`,
      lang: `ja`,
      vibrate: `on`,
      save: `local`,
    });
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
    dialog.refer.callback.cancel!();
    expect(closeMock).toBeCalledTimes(2);
    expect(closeMock).toBeCalledWith();
  });
  it(`resetList`, async () => {
    const openMock = vi.spyOn(dialog.handle, `open`);
    const closeMock = vi.spyOn(dialog.handle, `close`).mockReturnValue();
    const routerMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    conf.handle.resetList();
    expect(openMock).toBeCalledTimes(1);
    expect(openMock.mock.calls[0]![0]!.mode).toBe(`confirm`);
    expect(openMock.mock.calls[0]![0]!.title).toBe(`本当にリセットしますか`);
    expect(openMock.mock.calls[0]![0]!.message).toBe(``);
    expect(openMock.mock.calls[0]![0]!.ok).toBe(`決定`);
    expect(openMock.mock.calls[0]![0]!.cancel).toBe(`キャンセル`);
    dialog.refer.callback.ok!();
    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith({ listId: `list0000000000000` });
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
    expect(list.state.data).toEqual({
      sort: [`list0000000000000`, `list9999999999999`],
      data: {
        list0000000000000: { title: `Inbox` },
        list9999999999999: { title: `Trash` },
      },
    });
    expect(main.state.data).toEqual({
      list0000000000000: {
        sort: [`main0000000000000`],
        data: { main0000000000000: { check: false, title: `サンプル`, date: ``, time: ``, alarm: [], task: true } },
      },
      list9999999999999: { sort: [], data: {} },
    });
    expect(sub.state.data).toEqual({
      list0000000000000: {
        data: {
          main0000000000000: { sort: [`sub0000000000000`], data: { sub0000000000000: { check: false, title: `` } } },
        },
      },
      list9999999999999: { data: {} },
    });
    dialog.refer.callback.cancel!();
    expect(closeMock).toBeCalledTimes(2);
    expect(closeMock).toBeCalledWith();
  });
  it(`swipeInit`, () => {
    const getByIdMock = vi
      .spyOn(app.refer, `getById`)
      .mockReturnValue({ getBoundingClientRect: () => ({ top: 0, height: 0 }) } as HTMLElement);
    conf.handle.swipeInit({ x: 0, y: 0 });
    expect(getByIdMock).toBeCalledTimes(1);
    expect(getByIdMock).toBeCalledWith(`ConfRoot`);
    expect(conf.refer.swipe.status).toBe(`start`);
    expect(conf.refer.swipe.x).toBe(0);
    expect(conf.refer.swipe.y).toBe(0);
    expect(conf.refer.swipe.top).toBe(0);
  });
  it(`swipeStart`, () => {
    conf.handle.swipeStart({ x: 20, y: 0 });
    expect(conf.refer.swipe).toEqual({});
    conf.refer.swipe = { status: `start`, x: 0, y: 0, top: 0 };
    conf.handle.swipeStart({ x: 0, y: 20 });
    expect(conf.refer.swipe.status).toBe(`move`);
  });
  it(`swipeMove`, () => {
    conf.refer.swipe.elem = { style: {} } as HTMLElement;
    conf.handle.swipeMove({ y: 100 });
    expect(conf.refer.swipe.elem!.style.transform).toBe(`translateY(100px)`);
    conf.handle.swipeMove({ y: -100 });
    expect(conf.refer.swipe.elem!.style.transform).toBe(`translateY(0px)`);
  });
  it(`swipeEnd`, () => {
    const addListenerMock = vi.fn((_: string, listener: () => void) => listener());
    const removeListenerMock = vi.fn((_: string) => _);
    const animateMock = vi.fn(() => ({ addEventListener: addListenerMock }));
    (conf.refer.swipe.elem as unknown as { [K in string]: object }).animate = animateMock;
    (conf.refer.swipe.elem as unknown as { [K in string]: object }).removeEventListener = removeListenerMock;
    conf.handle.swipeEnd({ y: 100 });
    expect(animateMock).toBeCalledTimes(1);
    expect(animateMock).toBeCalledWith({ transform: `translateY(0px)` }, { duration: 250, easing: `ease-in-out` });
    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(removeListenerMock).toBeCalledTimes(1);
    expect(removeListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(conf.refer.swipe).toEqual({});
  });
  it(`swipeEnd - extra`, () => {
    conf.refer.swipe = { status: `move`, y: 0, top: 0 };
    const routerMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    conf.handle.swipeEnd({ y: 200 });
    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith();
    expect(conf.refer.swipe).toEqual({});
    conf.refer.swipe = { status: `start` };
    conf.handle.swipeEnd({ y: 0 });
    expect(conf.refer.swipe).toEqual({});
  });
});
