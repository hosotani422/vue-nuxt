import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/popup/time";
import time from "@/store/popup/time";

const it = test.extend<{ wrapper: VueWrapper }>({
  wrapper: async ({}, use) => {
    await use(fixture.getWrapper());
  },
});

describe(`dom`, () => {
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`TimeHour`)).toHaveLength(1);
    expect(wrapper.findByTestIdAll(`TimeMinute`)).toHaveLength(1);
  });
  it(`footer`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`TimeCancel`)).toHaveLength(1);
    expect(wrapper.findByTestId(`TimeCancel`).text()).toBe(`cancel`);
    expect(wrapper.findByTestIdAll(`TimeClear`)).toHaveLength(1);
    expect(wrapper.findByTestId(`TimeClear`).text()).toBe(`clear`);
    expect(wrapper.findByTestIdAll(`TimeOk`)).toHaveLength(1);
    expect(wrapper.findByTestId(`TimeOk`).text()).toBe(`ok`);
  });
});

describe(`event`, () => {
  it(`contents`, ({ wrapper }) => {
    const inputTimeMock = vi.spyOn(time.handle, `inputTime`).mockReturnValue();
    wrapper.findByTestId(`TimeHour`).trigger(`touchstart`, { touches: [{ pageX: 1, pageY: 1 }] });
    expect(inputTimeMock).toBeCalledTimes(1);
    expect(inputTimeMock).toBeCalledWith({ type: `hour`, x: 1, y: 1 });
    wrapper.findByTestId(`TimeHour`).trigger(`touchmove`, { touches: [{ pageX: 2, pageY: 2 }] });
    expect(inputTimeMock).toBeCalledTimes(2);
    expect(inputTimeMock).toBeCalledWith({ type: `hour`, x: 2, y: 2 });
    wrapper.findByTestId(`TimeHour`).trigger(`mousedown`, { pageX: 3, pageY: 3 });
    expect(inputTimeMock).toBeCalledTimes(3);
    expect(inputTimeMock).toBeCalledWith({ type: `hour`, x: 3, y: 3 });
    wrapper.findByTestId(`TimeHour`).trigger(`mousemove`, { pageX: 4, pageY: 4 });
    expect(inputTimeMock).toBeCalledTimes(4);
    expect(inputTimeMock).toBeCalledWith({ type: `hour`, x: 4, y: 4 });
    wrapper.findByTestId(`TimeMinute`).trigger(`touchstart`, { touches: [{ pageX: 5, pageY: 5 }] });
    expect(inputTimeMock).toBeCalledTimes(5);
    expect(inputTimeMock).toBeCalledWith({ type: `minute`, x: 5, y: 5 });
    wrapper.findByTestId(`TimeMinute`).trigger(`touchmove`, { touches: [{ pageX: 6, pageY: 6 }] });
    expect(inputTimeMock).toBeCalledTimes(6);
    expect(inputTimeMock).toBeCalledWith({ type: `minute`, x: 6, y: 6 });
    wrapper.findByTestId(`TimeMinute`).trigger(`mousedown`, { pageX: 7, pageY: 7 });
    expect(inputTimeMock).toBeCalledTimes(7);
    expect(inputTimeMock).toBeCalledWith({ type: `minute`, x: 7, y: 7 });
    wrapper.findByTestId(`TimeMinute`).trigger(`mousemove`, { pageX: 8, pageY: 8 });
    expect(inputTimeMock).toBeCalledTimes(8);
    expect(inputTimeMock).toBeCalledWith({ type: `minute`, x: 8, y: 8 });
  });
  it(`footer`, ({ wrapper }) => {
    const closeMock = vi.spyOn(time.handle, `close`).mockReturnValue();
    const callbackMock = vi.spyOn(time.refer, `callback`).mockReturnValue();
    wrapper.findByTestId(`TimeCancel`).trigger(`click`);
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
    wrapper.findByTestId(`TimeClear`).trigger(`click`);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith();
    wrapper.findByTestId(`TimeOk`).trigger(`click`);
    expect(callbackMock).toBeCalledTimes(2);
    expect(callbackMock).toBeCalledWith({ hour: 0, minute: 0 });
  });
});
