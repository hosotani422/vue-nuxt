import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import i18next from "i18next";
import app from "@/store/page/app";
import list from "@/store/page/list";
import main from "@/store/page/main";
import sub from "@/store/page/sub";
import conf from "@/store/page/conf";
import fixture from "../../../fixture/base";
import { ja } from "@/locale/ja";
import { en } from "@/locale/en";

beforeEach(async () => {
  await fixture.loadData();
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
  it(`initPage`, async () => {
    const langMock = vi.spyOn(i18next, `init`);
    const confMock = vi.spyOn(conf.handle, `init`).mockResolvedValue();
    const subMock = vi.spyOn(sub.handle, `init`).mockResolvedValue();
    const mainMock = vi.spyOn(main.handle, `init`).mockResolvedValue();
    const listMock = vi.spyOn(list.handle, `init`).mockResolvedValue();
    const clearMock = vi.spyOn(app.handle, `clearTrash`).mockReturnValue();
    await app.handle.init();
    expect(langMock).toBeCalledTimes(1);
    expect(langMock).toBeCalledWith({
      lng: `ja`,
      resources: {
        ja: { translation: ja },
        en: { translation: en },
      },
    });
    expect(confMock).toBeCalledTimes(1);
    expect(confMock).toBeCalledWith();
    expect(subMock).toBeCalledTimes(1);
    expect(subMock).toBeCalledWith();
    expect(mainMock).toBeCalledTimes(1);
    expect(mainMock).toBeCalledWith();
    expect(listMock).toBeCalledTimes(1);
    expect(listMock).toBeCalledWith();
    expect(clearMock).toBeCalledTimes(1);
    expect(clearMock).toBeCalledWith();
  });
  it(`getDuration`, () => {
    conf.state.data.speed = 1;
    expect(app.handle.getDuration()).toBe(500);
    conf.state.data.speed = 2;
    expect(app.handle.getDuration()).toBe(250);
    conf.state.data.speed = 3;
    expect(app.handle.getDuration()).toBe(100);
  });
  it(`routerList`, async () => {
    const routerMock = vi.spyOn(app.refer.router!, `push`).mockReturnThis();
    app.handle.routerList();
    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith(`/list1111111111111/list`);
  });
  it(`routerMain`, async () => {
    const routerMock = vi.spyOn(app.refer.router!, `push`).mockReturnThis();
    app.handle.routerMain({ listId: `list1111111111111` });
    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith(`/list1111111111111`);
  });
  it(`routerSub`, async () => {
    const routerMock = vi.spyOn(app.refer.router!, `push`).mockReturnThis();
    app.handle.routerSub({ mainId: `main1111111111111` });
    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith(`/list1111111111111/main1111111111111`);
  });
  it(`routerConf`, async () => {
    const routerMock = vi.spyOn(app.refer.router!, `push`).mockReturnThis();
    app.handle.routerConf();
    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith(`/list1111111111111/conf`);
  });
  it(`routerBack`, async () => {
    const routerMock = vi.spyOn(app.refer.router!, `back`).mockReturnThis();
    const storageMock = vi.spyOn(localStorage, `setItem`).mockReturnValue();
    app.handle.routerBack();
    expect(app.refer.backId).toBe(``);
    expect(storageMock).toBeCalledTimes(0);
    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith();
    app.handle.routerBack({ listId: `list0000000000000` });
    expect(app.refer.backId).toBe(`list0000000000000`);
    expect(storageMock).toBeCalledTimes(1);
    expect(storageMock).toBeCalledWith(`route`, `list0000000000000`);
    expect(routerMock).toBeCalledTimes(2);
    expect(routerMock).toBeCalledWith();
  });
  it(`clearTrash`, () => {
    app.handle.clearTrash();
    expect(main.state.data[`list9999999999999`]).toEqual({ sort: [], data: {} });
    expect(sub.state.data[`list9999999999999`]).toEqual({ data: {} });
  });
  it(`forceUpdate`, () => {
    vi.setSystemTime(new Date(9465660000000));
    app.handle.forceUpdate();
    expect(app.state.updateKey).toBe(`9465660000000`);
  });
});

describe(`render`, () => {
  it(`listId`, () => {
    expect(app.render.listId()).toBe(`list1111111111111`);
  });
  it(`mainId`, () => {
    expect(app.render.mainId()).toBe(`main1111111111111`);
  });
  it(`attrClass`, () => {
    expect(app.render.attrClass({ attrs: { hoge: `hoge`, class: `class` } })).toEqual({ class: `class` });
  });
  it(`attrAlmost`, () => {
    expect(app.render.attrAlmost({ attrs: { hoge: `hoge`, class: `class` } })).toEqual({ hoge: `hoge` });
  });
  it(`classTheme`, () => {
    expect(app.render.classTheme()).toEqual({ light: false, dark: true });
  });
  it(`classSize`, () => {
    conf.state.data.size = 1;
    expect(app.render.classSize()).toEqual({ "text-sm": true, "text-base": false, "text-lg": false });
    conf.state.data.size = 2;
    expect(app.render.classSize()).toEqual({ "text-sm": false, "text-base": true, "text-lg": false });
    conf.state.data.size = 3;
    expect(app.render.classSize()).toEqual({ "text-sm": false, "text-base": false, "text-lg": true });
  });
  it(`classSpeed`, () => {
    conf.state.data.speed = 1;
    expect(app.render.classSpeed()).toEqual({ slow: true, just: false, fast: false });
    conf.state.data.speed = 2;
    expect(app.render.classSpeed()).toEqual({ slow: false, just: true, fast: false });
    conf.state.data.speed = 3;
    expect(app.render.classSpeed()).toEqual({ slow: false, just: false, fast: true });
  });
});

describe(`refer`, () => {
  it(`isJson`, () => {
    expect(app.refer.isJson(`{}`)).toBe(true);
    expect(app.refer.isJson(``)).toBe(false);
    expect(app.refer.isJson(false)).toBe(false);
  });
});
