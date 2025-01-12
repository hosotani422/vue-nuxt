import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/popup/clock";
import clock from "@/stores/popup/clock";

const it = test.extend<{ wrapper: VueWrapper }>({
  wrapper: async ({}, use) => {
    await use(fixture.getWrapper());
  },
});

describe(`dom`, () => {
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`ClockHour`)).toHaveLength(1);
    expect(wrapper.findByTestIdAll(`ClockMinute`)).toHaveLength(1);
  });
  it(`footer`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`ClockCancel`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ClockCancel`).text()).toBe(`cancel`);
    expect(wrapper.findByTestIdAll(`ClockClear`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ClockClear`).text()).toBe(`clear`);
    expect(wrapper.findByTestIdAll(`ClockOk`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ClockOk`).text()).toBe(`ok`);
  });
});

describe(`event`, () => {
  it(`contents`, ({ wrapper }) => {
    wrapper.findByTestId(`ClockHour`).trigger(`touchstart`, { touches: [{ pageX: 1, pageY: 1 }] });
    wrapper.findByTestId(`ClockHour`).trigger(`touchmove`, { touches: [{ pageX: 2, pageY: 2 }] });
    wrapper.findByTestId(`ClockHour`).trigger(`mousedown`, { pageX: 3, pageY: 3 });
    wrapper.findByTestId(`ClockHour`).trigger(`mousemove`, { pageX: 4, pageY: 4 });
    wrapper.findByTestId(`ClockMinute`).trigger(`touchstart`, { touches: [{ pageX: 5, pageY: 5 }] });
    wrapper.findByTestId(`ClockMinute`).trigger(`touchmove`, { touches: [{ pageX: 6, pageY: 6 }] });
    wrapper.findByTestId(`ClockMinute`).trigger(`mousedown`, { pageX: 7, pageY: 7 });
    wrapper.findByTestId(`ClockMinute`).trigger(`mousemove`, { pageX: 8, pageY: 8 });
    expect(wrapper.emitted(`inputTime`)).toHaveLength(8);
    expect(wrapper.emitted(`inputTime`)).toEqual([
      [{ type: `hour`, x: 1, y: 1 }],
      [{ type: `hour`, x: 2, y: 2 }],
      [{ type: `hour`, x: 3, y: 3 }],
      [{ type: `hour`, x: 4, y: 4 }],
      [{ type: `minute`, x: 5, y: 5 }],
      [{ type: `minute`, x: 6, y: 6 }],
      [{ type: `minute`, x: 7, y: 7 }],
      [{ type: `minute`, x: 8, y: 8 }],
    ]);
  });
  it(`footer`, ({ wrapper }) => {
    const callbackMock = vi.spyOn(clock.refer, `callback`).mockReturnValue();
    wrapper.findByTestId(`ClockCancel`).trigger(`click`);
    expect(wrapper.emitted(`close`)).toHaveLength(1);
    expect(wrapper.emitted(`close`)).toEqual([[]]);
    wrapper.findByTestId(`ClockClear`).trigger(`click`);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith();
    wrapper.findByTestId(`ClockOk`).trigger(`click`);
    expect(callbackMock).toBeCalledTimes(2);
    expect(callbackMock).toBeCalledWith({ hour: 0, minute: 0 });
  });
});
