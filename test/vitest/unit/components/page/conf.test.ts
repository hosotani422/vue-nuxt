import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/page/conf";
import app from "@/store/page/app";
import conf from "@/store/page/conf";

const it = test.extend<{ wrapper: VueWrapper }>({
  wrapper: async ({}, use) => {
    fixture.setRouter();
    await fixture.init();
    await fixture.loadData();
    await use(fixture.getWrapper());
  },
});

describe(`dom`, () => {
  it(`header`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`ConfDown`)).toHaveLength(1);
    expect(wrapper.findByTestIdAll(`ConfTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfTitle`).text()).toBe(`設定`);
    expect(wrapper.findByTestIdAll(`ConfName`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfName`).text()).toBe(`Memosuku 1.0.0`);
  });
  it(`range`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`ConfSizeTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfSizeTitle`).text()).toBe(`文字サイズ`);
    expect(wrapper.findByTestIdAll(`ConfSizeValue`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfSizeValue`).element.value).toBe(`2`);
    expect(wrapper.findByTestIdAll(`ConfSizeName`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfSizeName`).text()).toBe(`中`);
    expect(wrapper.findByTestIdAll(`ConfSpeedTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfSpeedTitle`).text()).toBe(`アニメ速度`);
    expect(wrapper.findByTestIdAll(`ConfSpeedValue`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfSpeedValue`).element.value).toBe(`2`);
    expect(wrapper.findByTestIdAll(`ConfSpeedName`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfSpeedName`).text()).toBe(`中`);
  });
  it(`radio`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`ConfThemeTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfThemeTitle`).text()).toBe(`テーマ`);
    expect(wrapper.findByTestIdAll(`ConfThemeLight`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfThemeLight`).element.checked).toBe(false);
    expect(wrapper.findByTestId(`ConfThemeLight`).element.parentElement?.textContent).toBe(`明`);
    expect(wrapper.findByTestIdAll(`ConfThemeDark`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfThemeDark`).element.checked).toBe(true);
    expect(wrapper.findByTestId(`ConfThemeDark`).element.parentElement?.textContent).toBe(`暗`);
    expect(wrapper.findByTestIdAll(`ConfLangTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfLangTitle`).text()).toBe(`言語`);
    expect(wrapper.findByTestIdAll(`ConfLangEn`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfLangEn`).element.checked).toBe(false);
    expect(wrapper.findByTestId(`ConfLangEn`).element.parentElement?.textContent).toBe(`英語`);
    expect(wrapper.findByTestIdAll(`ConfLangJa`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfLangJa`).element.checked).toBe(true);
    expect(wrapper.findByTestId(`ConfLangJa`).element.parentElement?.textContent).toBe(`日本語`);
    expect(wrapper.findByTestIdAll(`ConfVibrateTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfVibrateTitle`).text()).toBe(`振動`);
    expect(wrapper.findByTestIdAll(`ConfVibrateOff`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfVibrateOff`).element.checked).toBe(false);
    expect(wrapper.findByTestId(`ConfVibrateOff`).element.parentElement?.textContent).toBe(`無`);
    expect(wrapper.findByTestIdAll(`ConfVibrateOn`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfVibrateOn`).element.checked).toBe(true);
    expect(wrapper.findByTestId(`ConfVibrateOn`).element.parentElement?.textContent).toBe(`有`);
  });
  it(`button`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`ConfSaveTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfSaveTitle`).text()).toBe(`ファイル保存`);
    expect(wrapper.findByTestIdAll(`ConfSaveLocal`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfSaveLocal`).text()).toBe(`ローカル`);
    expect(wrapper.findByTestIdAll(`ConfSaveServer`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfSaveServer`).text()).toBe(`サーバー`);
    expect(wrapper.findByTestIdAll(`ConfLoadTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfLoadTitle`).text()).toBe(`ファイル復元`);
    expect(wrapper.findByTestIdAll(`ConfLoadLocal`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfLoadLocal`).element.parentElement?.textContent).toBe(`ローカル`);
    expect(wrapper.findByTestIdAll(`ConfLoadServer`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfLoadServer`).text()).toBe(`サーバー`);
    expect(wrapper.findByTestIdAll(`ConfResetTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfResetTitle`).text()).toBe(`初期化`);
    expect(wrapper.findByTestIdAll(`ConfResetConf`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfResetConf`).text()).toBe(`設定`);
    expect(wrapper.findByTestIdAll(`ConfResetList`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ConfResetList`).text()).toBe(`メモ`);
  });
});

describe(`event`, () => {
  it(`root`, ({ wrapper }) => {
    const swipeInitMock = vi.spyOn(conf.handle, `swipeInit`).mockReturnValue();
    const swipeStartMock = vi.spyOn(conf.handle, `swipeStart`).mockReturnValue();
    const swipeMoveMock = vi.spyOn(conf.handle, `swipeMove`).mockReturnValue();
    const swipeEndMock = vi.spyOn(conf.handle, `swipeEnd`).mockReturnValue();
    wrapper.findByTestId(`ConfRoot`).trigger(`touchmove`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(swipeStartMock).toBeCalledTimes(1);
    expect(swipeStartMock).toBeCalledWith({ x: 1, y: 1 });
    expect(swipeMoveMock).toBeCalledTimes(1);
    expect(swipeMoveMock).toBeCalledWith({ y: 1 });
    wrapper.findByTestId(`ConfRoot`).trigger(`mousemove`, { clientX: 2, clientY: 2 });
    expect(swipeStartMock).toBeCalledTimes(2);
    expect(swipeStartMock).toBeCalledWith({ x: 2, y: 2 });
    expect(swipeMoveMock).toBeCalledTimes(2);
    expect(swipeMoveMock).toBeCalledWith({ y: 2 });
    wrapper.findByTestId(`ConfRoot`).trigger(`touchend`, { changedTouches: [{ clientY: 1 }] });
    expect(swipeEndMock).toBeCalledTimes(1);
    expect(swipeEndMock).toBeCalledWith({ y: 1 });
    wrapper.findByTestId(`ConfRoot`).trigger(`mouseup`, { clientY: 2 });
    expect(swipeEndMock).toBeCalledTimes(2);
    expect(swipeEndMock).toBeCalledWith({ y: 2 });
    wrapper.findByTestId(`ConfBack`).trigger(`touchstart`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(swipeInitMock).toBeCalledTimes(1);
    expect(swipeInitMock).toBeCalledWith({ x: 1, y: 1 });
    wrapper.findByTestId(`ConfBack`).trigger(`mousedown`, { clientX: 2, clientY: 2 });
    expect(swipeInitMock).toBeCalledTimes(2);
    expect(swipeInitMock).toBeCalledWith({ x: 2, y: 2 });
  });
  it(`header`, ({ wrapper }) => {
    const routerBackMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    wrapper.findByTestId(`ConfDown`).trigger(`click`);
    expect(routerBackMock).toBeCalledTimes(1);
    expect(routerBackMock).toBeCalledWith();
  });
  it(`button`, ({ wrapper }) => {
    const downloadBackupMock = vi.spyOn(conf.handle, `downloadBackup`).mockReturnValue();
    const uploadBackupMock = vi.spyOn(conf.handle, `uploadBackup`).mockReturnValue();
    const resetConfMock = vi.spyOn(conf.handle, `resetConf`).mockReturnValue();
    const resetListMock = vi.spyOn(conf.handle, `resetList`).mockReturnValue();
    wrapper.findByTestId(`ConfSaveLocal`).trigger(`click`);
    expect(downloadBackupMock).toBeCalledTimes(1);
    wrapper.findByTestId(`ConfLoadLocal`).trigger(`change`);
    expect(uploadBackupMock).toBeCalledTimes(1);
    wrapper.findByTestId(`ConfResetConf`).trigger(`click`);
    expect(resetConfMock).toBeCalledTimes(1);
    expect(resetConfMock).toBeCalledWith();
    wrapper.findByTestId(`ConfResetList`).trigger(`click`);
    expect(resetListMock).toBeCalledTimes(1);
    expect(resetListMock).toBeCalledWith();
  });
});
