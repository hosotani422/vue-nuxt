import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/popup/calendar";
import calendar from "@/stores/popup/calendar";

const it = test.extend<{ wrapper: VueWrapper }>({
  wrapper: async ({}, use) => {
    await fixture.init();
    await use(fixture.getWrapper());
  },
});

describe(`dom`, () => {
  it(`header`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`CalendarPrev`)).toHaveLength(1);
    expect(wrapper.findByTestIdAll(`CalendarCurrent`)).toHaveLength(1);
    expect(wrapper.findByTestId(`CalendarCurrent`).text()).toBe(`2023/09`);
    expect(wrapper.findByTestIdAll(`CalendarNext`)).toHaveLength(1);
    expect(wrapper.findByTestIdAll(`CalendarWeek`)).toHaveLength(7);
    expect(wrapper.findByTestIdAll(`CalendarWeek`)[0]!.text()).toBe(`日`);
    expect(wrapper.findByTestIdAll(`CalendarWeek`)[1]!.text()).toBe(`月`);
    expect(wrapper.findByTestIdAll(`CalendarWeek`)[2]!.text()).toBe(`火`);
    expect(wrapper.findByTestIdAll(`CalendarWeek`)[3]!.text()).toBe(`水`);
    expect(wrapper.findByTestIdAll(`CalendarWeek`)[4]!.text()).toBe(`木`);
    expect(wrapper.findByTestIdAll(`CalendarWeek`)[5]!.text()).toBe(`金`);
    expect(wrapper.findByTestIdAll(`CalendarWeek`)[6]!.text()).toBe(`土`);
  });
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`CalendarMonth`)).toHaveLength(3);
    expect(wrapper.findByTestIdAll(`CalendarDay`)).toHaveLength(99);
    expect(wrapper.findByTestIdAll(`CalendarDay`)[33]!.text()).toBe(`27`);
    expect(wrapper.findByTestIdAll(`CalendarDay`)[33]!.classes()).not.toContain(`select`);
    expect(wrapper.findByTestIdAll(`CalendarDay`)[33]!.classes()).not.toContain(`today`);
    expect(wrapper.findByTestIdAll(`CalendarDay`)[33]!.classes()).toContain(`hide`);
    expect(wrapper.findByTestIdAll(`CalendarDay`)[59]!.text()).toBe(`22`);
    expect(wrapper.findByTestIdAll(`CalendarDay`)[59]!.classes()).toContain(`select`);
    expect(wrapper.findByTestIdAll(`CalendarDay`)[59]!.classes()).toContain(`today`);
    expect(wrapper.findByTestIdAll(`CalendarDay`)[59]!.classes()).not.toContain(`hide`);
  });
  it(`footer`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`CalendarCancel`)).toHaveLength(1);
    expect(wrapper.findByTestId(`CalendarCancel`).text()).toBe(`cancel`);
    expect(wrapper.findByTestIdAll(`CalendarClear`)).toHaveLength(1);
    expect(wrapper.findByTestId(`CalendarClear`).text()).toBe(`clear`);
  });
});

describe(`event`, () => {
  it(`root`, ({ wrapper }) => {
    wrapper.findByTestId(`CalendarRoot`).trigger(`touchmove`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    wrapper.findByTestId(`CalendarRoot`).trigger(`mousemove`, { clientX: 2, clientY: 2 });
    expect(wrapper.emitted(`swipeStart`)).toHaveLength(2);
    expect(wrapper.emitted(`swipeStart`)).toEqual([[{ x: 1, y: 1 }], [{ x: 2, y: 2 }]]);
    expect(wrapper.emitted(`swipeMove`)).toHaveLength(2);
    expect(wrapper.emitted(`swipeMove`)).toEqual([[{ x: 1 }], [{ x: 2 }]]);
    wrapper.findByTestId(`CalendarRoot`).trigger(`touchend`, { changedTouches: [{ clientX: 1 }] });
    wrapper.findByTestId(`CalendarRoot`).trigger(`mouseup`, { clientX: 2 });
    expect(wrapper.emitted(`swipeEnd`)).toHaveLength(2);
    expect(wrapper.emitted(`swipeEnd`)).toEqual([[{ x: 1 }], [{ x: 2 }]]);
  });
  it(`header`, ({ wrapper }) => {
    wrapper.findByTestId(`CalendarPrev`).trigger(`click`);
    wrapper.findByTestId(`CalendarNext`).trigger(`click`);
    expect(wrapper.emitted(`pageMove`)).toHaveLength(2);
    expect(wrapper.emitted(`pageMove`)).toEqual([[{ mode: `prev` }], [{ mode: `next` }]]);
  });
  it(`contents`, ({ wrapper }) => {
    const callbackMock = vi.spyOn(calendar.refer, `callback`).mockReturnValue();
    wrapper.findByTestId(`CalendarArea`).trigger(`touchstart`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    wrapper.findByTestId(`CalendarArea`).trigger(`mousedown`, { clientX: 2, clientY: 2 });
    expect(wrapper.emitted(`swipeInit`)).toHaveLength(2);
    expect(wrapper.emitted(`swipeInit`)).toEqual([[{ x: 1, y: 1 }], [{ x: 2, y: 2 }]]);
    wrapper.findByTestIdAll(`CalendarDay`)[59]!.trigger(`click`);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith(`2023/09/22`);
  });
  it(`footer`, ({ wrapper }) => {
    const callbackMock = vi.spyOn(calendar.refer, `callback`).mockReturnValue();
    wrapper.findByTestId(`CalendarCancel`).trigger(`click`);
    expect(wrapper.emitted(`close`)).toHaveLength(1);
    expect(wrapper.emitted(`close`)).toEqual([[]]);
    wrapper.findByTestId(`CalendarClear`).trigger(`click`);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith(``);
  });
});
