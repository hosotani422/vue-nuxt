import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/popup/clock";
import clock from "@/stores/popup/clock";

const it = test.extend<{ wrapper: VueWrapper }>({
  wrapper: async ({}, use) => {
    fixture.setAction();
    fixture.setRouter();
    await fixture.loadData();
    await use(fixture.getWrapper());
  },
});

describe(`dom`, () => {
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`ClockHour`).length).toBe(1);
    expect(wrapper.findByTestIdAll(`ClockMinute`).length).toBe(1);
  });
  it(`footer`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`ClockCancel`).length).toBe(1);
    expect(wrapper.findByTestId(`ClockCancel`).text()).toBe(`cancel`);
    expect(wrapper.findByTestIdAll(`ClockClear`).length).toBe(1);
    expect(wrapper.findByTestId(`ClockClear`).text()).toBe(`clear`);
    expect(wrapper.findByTestIdAll(`ClockOk`).length).toBe(1);
    expect(wrapper.findByTestId(`ClockOk`).text()).toBe(`ok`);
  });
});

describe(`event`, () => {
  it(`contents`, ({ wrapper }) => {
    wrapper.findByTestId(`ClockHour`).trigger(`touchstart`);
    expect(wrapper.emitted(`inputHour`)).toHaveLength(1);
    wrapper.findByTestId(`ClockHour`).trigger(`touchmove`);
    expect(wrapper.emitted(`inputHour`)).toHaveLength(2);
    wrapper.findByTestId(`ClockMinute`).trigger(`touchstart`);
    expect(wrapper.emitted(`inputMinute`)).toHaveLength(1);
    wrapper.findByTestId(`ClockMinute`).trigger(`touchmove`);
    expect(wrapper.emitted(`inputMinute`)).toHaveLength(2);
  });
  it(`footer`, ({ wrapper }) => {
    wrapper.findByTestId(`ClockCancel`).trigger(`click`);
    expect(wrapper.emitted(`close`)).toHaveLength(1);
    wrapper.findByTestId(`ClockClear`).trigger(`click`);
    expect(clock.state.callback).toBeCalledTimes(1);
    expect(clock.state.callback).toBeCalledWith();
    wrapper.findByTestId(`ClockOk`).trigger(`click`);
    expect(clock.state.callback).toBeCalledTimes(2);
    expect(clock.state.callback).toBeCalledWith(0, 0);
  });
});
