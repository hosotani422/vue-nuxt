import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/page/conf";

const it = test.extend<{ wrapper: VueWrapper }>({
  wrapper: async ({}, use) => {
    fixture.setRouter();
    await fixture.loadData();
    await use(fixture.getWrapper());
  },
});

describe(`dom`, () => {
  it(`header`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`ConfDown`).length).toBe(1);
    expect(wrapper.findByTestIdAll(`ConfTitle`).length).toBe(1);
    expect(wrapper.findByTestId(`ConfTitle`).text()).toBe(`設定`);
    expect(wrapper.findByTestIdAll(`ConfName`).length).toBe(1);
    expect(wrapper.findByTestId(`ConfName`).text()).toBe(`Memotea 3.0.5`);
  });
  it(`range`, ({ wrapper }) => {
    expect(wrapper.findByTestId(`ConfSizeTitle`).text()).toBe(`文字サイズ`);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfSizeValue`).element.value).toBe(2);
    expect(wrapper.findByTestId(`ConfSizeName`).text()).toBe(`中`);
    expect(wrapper.findByTestId(`ConfSpeedTitle`).text()).toBe(`アニメ速度`);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfSizeValue`).element.value).toBe(2);
    expect(wrapper.findByTestId(`ConfSizeName`).text()).toBe(`中`);
    expect(wrapper.findByTestId(`ConfVolumeTitle`).text()).toBe(`音量`);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfVolumeValue`).element.value).toBe(1);
    expect(wrapper.findByTestId(`ConfVolumeName`).text()).toBe(`小`);
  });
  it(`radio`, ({ wrapper }) => {
    expect(wrapper.findByTestId(`ConfVibrateTitle`).text()).toBe(`振動`);
    expect(wrapper.findByTestId(`ConfVibrateOff`).element.parentElement?.textContent).toBe(`無`);
    expect(wrapper.findByTestId(`ConfVibrateOn`).element.parentElement?.textContent).toBe(`有`);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfVibrateOff`).element.checked).toBe(false);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfVibrateOn`).element.checked).toBe(true);
    expect(wrapper.findByTestId(`ConfThemeTitle`).text()).toBe(`テーマ`);
    expect(wrapper.findByTestId(`ConfThemeLight`).element.parentElement?.textContent).toBe(`明`);
    expect(wrapper.findByTestId(`ConfThemeDark`).element.parentElement?.textContent).toBe(`暗`);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfThemeLight`).element.checked).toBe(true);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfThemeDark`).element.checked).toBe(false);
    expect(wrapper.findByTestId(`ConfLangTitle`).text()).toBe(`言語`);
    expect(wrapper.findByTestId(`ConfLangEn`).element.parentElement?.textContent).toBe(`英語`);
    expect(wrapper.findByTestId(`ConfLangJp`).element.parentElement?.textContent).toBe(`日本語`);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfLangEn`).element.checked).toBe(false);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfLangJp`).element.checked).toBe(true);
    expect(wrapper.findByTestId(`ConfSaveTitle`).text()).toBe(`自動保存`);
    expect(wrapper.findByTestId(`ConfSaveLocal`).element.parentElement?.textContent).toBe(`LOCAL`);
    expect(wrapper.findByTestId(`ConfSaveRest`).element.parentElement?.textContent).toBe(`REST`);
    expect(wrapper.findByTestId(`ConfSaveGql`).element.parentElement?.textContent).toBe(`GQL`);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfSaveLocal`).element.checked).toBe(true);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfSaveRest`).element.checked).toBe(false);
    expect(wrapper.findByTestId<HTMLInputElement>(`ConfSaveGql`).element.checked).toBe(false);
  });
  it(`button`, ({ wrapper }) => {
    expect(wrapper.findByTestId(`ConfBackupTitle`).text()).toBe(`保存ファイル`);
    expect(wrapper.findByTestId(`ConfBackupDownload`).text()).toBe(`保存`);
    expect(wrapper.findByTestId(`ConfBackupUpload`).element.parentElement?.textContent).toBe(`復元`);
    expect(wrapper.findByTestId(`ConfResetTitle`).text()).toBe(`初期化`);
    expect(wrapper.findByTestId(`ConfResetConf`).text()).toBe(`設定`);
    expect(wrapper.findByTestId(`ConfResetList`).text()).toBe(`メモ`);
  });
});

describe(`event`, () => {
  it(`header`, ({ wrapper }) => {
    wrapper.findByTestId(`ConfRoot`).trigger(`touchstart`);
    expect(wrapper.emitted(`swipeInit`)).toHaveLength(1);
    expect((wrapper.emitted(`swipeInit`)![0]![0]! as { [K in string]: number }).clientX).toBe(0);
    expect((wrapper.emitted(`swipeInit`)![0]![0]! as { [K in string]: number }).clientY).toBe(0);
    wrapper.findByTestId(`ConfRoot`).trigger(`touchmove`);
    expect(wrapper.emitted(`swipeStart`)).toHaveLength(1);
    expect(wrapper.emitted(`swipeStart`)![0]).toEqual([{ clientX: 0, clientY: 0 }]);
    expect(wrapper.emitted(`swipeMove`)).toHaveLength(1);
    expect(wrapper.emitted(`swipeMove`)![0]).toEqual([{ clientY: 0 }]);
    wrapper.findByTestId(`ConfRoot`).trigger(`touchend`);
    expect(wrapper.emitted(`swipeEnd`)).toHaveLength(1);
    expect(wrapper.emitted(`swipeEnd`)![0]).toEqual([{ clientY: 0 }]);
    wrapper.findByTestId(`ConfDown`).trigger(`click`);
    expect(wrapper.emitted(`routerBack`)).toHaveLength(1);
  });
  it(`button`, ({ wrapper }) => {
    wrapper.findByTestId(`ConfBackupDownload`).trigger(`click`);
    expect(wrapper.emitted(`downloadBackup`)).toHaveLength(1);
    wrapper.findByTestId(`ConfBackupUpload`).trigger(`change`);
    expect(wrapper.emitted(`uploadBackup`)).toHaveLength(1);
    wrapper.findByTestId(`ConfResetConf`).trigger(`click`);
    expect(wrapper.emitted(`resetConf`)).toHaveLength(1);
    wrapper.findByTestId(`ConfResetList`).trigger(`click`);
    expect(wrapper.emitted(`resetList`)).toHaveLength(1);
  });
});
