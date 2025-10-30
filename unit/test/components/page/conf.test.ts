import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import fixture from "../../../fixture/page/conf";
import app from "@/store/page/app";
import conf from "@/store/page/conf";

const it = test.extend<{ wrapper: ReturnType<typeof mount> }>({
  wrapper: async ({}, use) => {
    fixture.setRouter();
    await fixture.init();
    await fixture.loadData();
    await use(fixture.getWrapper());
  },
});

describe(`view`, () => {
  it(`header`, ({ wrapper }) => {
    expect(wrapper.findAll(`header svg[aria-label='arrow']`)).toHaveLength(1);
    expect(wrapper.findAll(`header h2`)).toHaveLength(1);
    expect(wrapper.find(`header h2`).text()).toBe(`設定`);
    expect(wrapper.findAll(`header p`)).toHaveLength(1);
    expect(wrapper.find(`header p`).text()).toBe(`Memotea 1.0.0`);
  });
  it(`range`, ({ wrapper }) => {
    expect(wrapper.findAll(`main li:nth-of-type(1) h3`)).toHaveLength(1);
    expect(wrapper.find(`main li:nth-of-type(1) h3`).text()).toBe(`文字サイズ`);
    expect(wrapper.findAll(`main li:nth-of-type(1) input`)).toHaveLength(1);
    expect(wrapper.find<HTMLInputElement>(`main li:nth-of-type(1) input`).element.value).toBe(`2`);
    expect(wrapper.findAll(`main li:nth-of-type(1) p`)).toHaveLength(1);
    expect(wrapper.find(`main li:nth-of-type(1) p`).text()).toBe(`中`);
    expect(wrapper.findAll(`main li:nth-of-type(2) h3`)).toHaveLength(1);
    expect(wrapper.find(`main li:nth-of-type(2) h3`).text()).toBe(`アニメ速度`);
    expect(wrapper.findAll(`main li:nth-of-type(2) input`)).toHaveLength(1);
    expect(wrapper.find<HTMLInputElement>(`main li:nth-of-type(2) input`).element.value).toBe(`2`);
    expect(wrapper.findAll(`main li:nth-of-type(2) p`)).toHaveLength(1);
    expect(wrapper.find(`main li:nth-of-type(2) p`).text()).toBe(`中`);
  });
  it(`radio`, ({ wrapper }) => {
    expect(wrapper.findAll(`main li:nth-of-type(3) h3`)).toHaveLength(1);
    expect(wrapper.find(`main li:nth-of-type(3) h3`).text()).toBe(`テーマ`);
    expect(wrapper.findAll(`main li:nth-of-type(3) input`)).toHaveLength(2);
    expect(wrapper.findAll<HTMLInputElement>(`main li:nth-of-type(3) input`)[0]!.element.checked).toBe(false);
    expect(wrapper.findAll<HTMLInputElement>(`main li:nth-of-type(3) input`)[1]!.element.checked).toBe(true);
    expect(wrapper.findAll(`main li:nth-of-type(3) label`)).toHaveLength(2);
    expect(wrapper.findAll(`main li:nth-of-type(3) label`)[0]!.text()).toBe(`明`);
    expect(wrapper.findAll(`main li:nth-of-type(3) label`)[1]!.text()).toBe(`暗`);
    expect(wrapper.findAll(`main li:nth-of-type(4) h3`)).toHaveLength(1);
    expect(wrapper.find(`main li:nth-of-type(4) h3`).text()).toBe(`言語`);
    expect(wrapper.findAll(`main li:nth-of-type(4) input`)).toHaveLength(2);
    expect(wrapper.findAll<HTMLInputElement>(`main li:nth-of-type(4) input`)[0]!.element.checked).toBe(false);
    expect(wrapper.findAll<HTMLInputElement>(`main li:nth-of-type(4) input`)[1]!.element.checked).toBe(true);
    expect(wrapper.findAll(`main li:nth-of-type(4) label`)).toHaveLength(2);
    expect(wrapper.findAll(`main li:nth-of-type(4) label`)[0]!.text()).toBe(`英語`);
    expect(wrapper.findAll(`main li:nth-of-type(4) label`)[1]!.text()).toBe(`日本語`);
    expect(wrapper.findAll(`main li:nth-of-type(5) h3`)).toHaveLength(1);
    expect(wrapper.find(`main li:nth-of-type(5) h3`).text()).toBe(`振動`);
    expect(wrapper.findAll(`main li:nth-of-type(5) input`)).toHaveLength(2);
    expect(wrapper.findAll<HTMLInputElement>(`main li:nth-of-type(5) input`)[0]!.element.checked).toBe(false);
    expect(wrapper.findAll<HTMLInputElement>(`main li:nth-of-type(5) input`)[1]!.element.checked).toBe(true);
    expect(wrapper.findAll(`main li:nth-of-type(5) label`)).toHaveLength(2);
    expect(wrapper.findAll(`main li:nth-of-type(5) label`)[0]!.text()).toBe(`無`);
    expect(wrapper.findAll(`main li:nth-of-type(5) label`)[1]!.text()).toBe(`有`);
  });
  it(`button`, ({ wrapper }) => {
    expect(wrapper.findAll(`main li:nth-of-type(6) h3`)).toHaveLength(1);
    expect(wrapper.find(`main li:nth-of-type(6) h3`).text()).toBe(`ファイル保存`);
    expect(wrapper.findAll(`main li:nth-of-type(6) button`)).toHaveLength(2);
    expect(wrapper.findAll(`main li:nth-of-type(6) button`)[0]!.text()).toBe(`ローカル`);
    expect(wrapper.findAll(`main li:nth-of-type(6) button`)[1]!.text()).toBe(`サーバー`);
    expect(wrapper.findAll(`main li:nth-of-type(7) h3`)).toHaveLength(1);
    expect(wrapper.find(`main li:nth-of-type(7) h3`).text()).toBe(`ファイル復元`);
    expect(wrapper.findAll(`main li:nth-of-type(7) button`)).toHaveLength(2);
    expect(wrapper.findAll(`main li:nth-of-type(7) button`)[0]!.text()).toBe(`ローカル`);
    expect(wrapper.findAll(`main li:nth-of-type(7) button`)[1]!.text()).toBe(`サーバー`);
    expect(wrapper.findAll(`main li:nth-of-type(8) h3`)).toHaveLength(1);
    expect(wrapper.find(`main li:nth-of-type(8) h3`).text()).toBe(`初期化`);
    expect(wrapper.findAll(`main li:nth-of-type(8) button`)).toHaveLength(2);
    expect(wrapper.findAll(`main li:nth-of-type(8) button`)[0]!.text()).toBe(`設定`);
    expect(wrapper.findAll(`main li:nth-of-type(8) button`)[1]!.text()).toBe(`メモ`);
  });
});

describe(`event`, () => {
  it(`root`, ({ wrapper }) => {
    const swipeInitMock = vi.spyOn(conf.handle, `swipeInit`).mockReturnValue();
    const swipeStartMock = vi.spyOn(conf.handle, `swipeStart`).mockReturnValue();
    const swipeMoveMock = vi.spyOn(conf.handle, `swipeMove`).mockReturnValue();
    const swipeEndMock = vi.spyOn(conf.handle, `swipeEnd`).mockReturnValue();
    wrapper.find(`div[aria-label='conf']`).trigger(`touchmove`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(swipeStartMock).toBeCalledTimes(1);
    expect(swipeStartMock).toBeCalledWith({ x: 1, y: 1 });
    expect(swipeMoveMock).toBeCalledTimes(1);
    expect(swipeMoveMock).toBeCalledWith({ y: 1 });
    wrapper.find(`div[aria-label='conf']`).trigger(`mousemove`, { clientX: 2, clientY: 2 });
    expect(swipeStartMock).toBeCalledTimes(2);
    expect(swipeStartMock).toBeCalledWith({ x: 2, y: 2 });
    expect(swipeMoveMock).toBeCalledTimes(2);
    expect(swipeMoveMock).toBeCalledWith({ y: 2 });
    wrapper.find(`div[aria-label='conf']`).trigger(`touchend`, { changedTouches: [{ clientY: 1 }] });
    expect(swipeEndMock).toBeCalledTimes(1);
    expect(swipeEndMock).toBeCalledWith({ y: 1 });
    wrapper.find(`div[aria-label='conf']`).trigger(`mouseup`, { clientY: 2 });
    expect(swipeEndMock).toBeCalledTimes(2);
    expect(swipeEndMock).toBeCalledWith({ y: 2 });
    wrapper.find(`aside`).trigger(`touchstart`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(swipeInitMock).toBeCalledTimes(1);
    expect(swipeInitMock).toBeCalledWith({ x: 1, y: 1 });
    wrapper.find(`aside`).trigger(`mousedown`, { clientX: 2, clientY: 2 });
    expect(swipeInitMock).toBeCalledTimes(2);
    expect(swipeInitMock).toBeCalledWith({ x: 2, y: 2 });
  });
  it(`header`, ({ wrapper }) => {
    const routerBackMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    wrapper.find(`header svg[aria-label='arrow']`).trigger(`click`);
    expect(routerBackMock).toBeCalledTimes(1);
    expect(routerBackMock).toBeCalledWith();
  });
  it(`button`, ({ wrapper }) => {
    const saveLocalMock = vi.spyOn(conf.handle, `saveLocal`).mockReturnValue();
    const loadLocalMock = vi.spyOn(conf.handle, `loadLocal`).mockReturnValue();
    const resetConfMock = vi.spyOn(conf.handle, `resetConf`).mockReturnValue();
    const resetListMock = vi.spyOn(conf.handle, `resetList`).mockReturnValue();
    wrapper.findAll(`main li:nth-of-type(6) button`)[0]!.trigger(`click`);
    expect(saveLocalMock).toBeCalledTimes(1);
    wrapper.findAll(`main li:nth-of-type(7) input`)[0]!.trigger(`change`);
    expect(loadLocalMock).toBeCalledTimes(1);
    wrapper.findAll(`main li:nth-of-type(8) button`)[0]!.trigger(`click`);
    expect(resetConfMock).toBeCalledTimes(1);
    expect(resetConfMock).toBeCalledWith();
    wrapper.findAll(`main li:nth-of-type(8) button`)[1]!.trigger(`click`);
    expect(resetListMock).toBeCalledTimes(1);
    expect(resetListMock).toBeCalledWith();
  });
});
