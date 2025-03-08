import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/popup/date";
import date from "@/store/popup/date";

const it = test.extend<{ wrapper: VueWrapper }>({
  wrapper: async ({}, use) => {
    await fixture.init();
    await use(fixture.getWrapper());
  },
});

describe(`dom`, () => {
  it(`header`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`DatePrev`)).toHaveLength(1);
    expect(wrapper.findByTestIdAll(`DateCurrent`)).toHaveLength(1);
    expect(wrapper.findByTestId(`DateCurrent`).text()).toBe(`2023/09`);
    expect(wrapper.findByTestIdAll(`DateNext`)).toHaveLength(1);
    expect(wrapper.findByTestIdAll(`DateWeek`)).toHaveLength(7);
    expect(wrapper.findByTestIdAll(`DateWeek`)[0]!.text()).toBe(`日`);
    expect(wrapper.findByTestIdAll(`DateWeek`)[1]!.text()).toBe(`月`);
    expect(wrapper.findByTestIdAll(`DateWeek`)[2]!.text()).toBe(`火`);
    expect(wrapper.findByTestIdAll(`DateWeek`)[3]!.text()).toBe(`水`);
    expect(wrapper.findByTestIdAll(`DateWeek`)[4]!.text()).toBe(`木`);
    expect(wrapper.findByTestIdAll(`DateWeek`)[5]!.text()).toBe(`金`);
    expect(wrapper.findByTestIdAll(`DateWeek`)[6]!.text()).toBe(`土`);
  });
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`DateMonth`)).toHaveLength(3);
    expect(wrapper.findByTestIdAll(`DateDay`)).toHaveLength(99);
    expect(wrapper.findByTestIdAll(`DateDay`)[33]!.text()).toBe(`27`);
    expect(wrapper.findByTestIdAll(`DateDay`)[33]!.classes()).not.toContain(`select`);
    expect(wrapper.findByTestIdAll(`DateDay`)[33]!.classes()).not.toContain(`today`);
    expect(wrapper.findByTestIdAll(`DateDay`)[33]!.classes()).toContain(`hide`);
    expect(wrapper.findByTestIdAll(`DateDay`)[59]!.text()).toBe(`22`);
    expect(wrapper.findByTestIdAll(`DateDay`)[59]!.classes()).toContain(`select`);
    expect(wrapper.findByTestIdAll(`DateDay`)[59]!.classes()).toContain(`today`);
    expect(wrapper.findByTestIdAll(`DateDay`)[59]!.classes()).not.toContain(`hide`);
  });
  it(`footer`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`DateCancel`)).toHaveLength(1);
    expect(wrapper.findByTestId(`DateCancel`).text()).toBe(`cancel`);
    expect(wrapper.findByTestIdAll(`DateClear`)).toHaveLength(1);
    expect(wrapper.findByTestId(`DateClear`).text()).toBe(`clear`);
  });
});

describe(`event`, () => {
  it(`root`, ({ wrapper }) => {
    const swipeStartMock = vi.spyOn(date.handle, `swipeStart`).mockReturnValue();
    const swipeMoveMock = vi.spyOn(date.handle, `swipeMove`).mockReturnValue();
    const swipeEndMock = vi.spyOn(date.handle, `swipeEnd`).mockReturnValue();
    wrapper.findByTestId(`DateRoot`).trigger(`touchmove`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(swipeStartMock).toBeCalledTimes(1);
    expect(swipeStartMock).toBeCalledWith({ x: 1, y: 1 });
    expect(swipeMoveMock).toBeCalledTimes(1);
    expect(swipeMoveMock).toBeCalledWith({ x: 1 });
    wrapper.findByTestId(`DateRoot`).trigger(`mousemove`, { clientX: 2, clientY: 2 });
    expect(swipeStartMock).toBeCalledTimes(2);
    expect(swipeStartMock).toBeCalledWith({ x: 2, y: 2 });
    expect(swipeMoveMock).toBeCalledTimes(2);
    expect(swipeMoveMock).toBeCalledWith({ x: 2 });
    wrapper.findByTestId(`DateRoot`).trigger(`touchend`, { changedTouches: [{ clientX: 1 }] });
    expect(swipeEndMock).toBeCalledTimes(1);
    expect(swipeEndMock).toBeCalledWith({ x: 1 });
    wrapper.findByTestId(`DateRoot`).trigger(`mouseup`, { clientX: 2 });
    expect(swipeEndMock).toBeCalledTimes(2);
    expect(swipeEndMock).toBeCalledWith({ x: 2 });
  });
  it(`header`, ({ wrapper }) => {
    const pageMoveMock = vi.spyOn(date.handle, `pageMove`).mockReturnValue();
    wrapper.findByTestId(`DatePrev`).trigger(`click`);
    expect(pageMoveMock).toBeCalledTimes(1);
    expect(pageMoveMock).toBeCalledWith({ mode: `prev` });
    wrapper.findByTestId(`DateNext`).trigger(`click`);
    expect(pageMoveMock).toBeCalledTimes(2);
    expect(pageMoveMock).toBeCalledWith({ mode: `next` });
  });
  it(`contents`, ({ wrapper }) => {
    const swipeInitMock = vi.spyOn(date.handle, `swipeInit`).mockReturnValue();
    const callbackMock = vi.spyOn(date.refer, `callback`).mockReturnValue();
    wrapper.findByTestId(`DateArea`).trigger(`touchstart`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(swipeInitMock).toBeCalledTimes(1);
    expect(swipeInitMock).toBeCalledWith({ x: 1, y: 1 });
    wrapper.findByTestId(`DateArea`).trigger(`mousedown`, { clientX: 2, clientY: 2 });
    expect(swipeInitMock).toBeCalledTimes(2);
    expect(swipeInitMock).toBeCalledWith({ x: 2, y: 2 });
    wrapper.findByTestIdAll(`DateDay`)[59]!.trigger(`click`);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith(`2023/09/22`);
  });
  it(`footer`, ({ wrapper }) => {
    const closeMock = vi.spyOn(date.handle, `close`).mockReturnValue();
    const callbackMock = vi.spyOn(date.refer, `callback`).mockReturnValue();
    wrapper.findByTestId(`DateCancel`).trigger(`click`);
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
    wrapper.findByTestId(`DateClear`).trigger(`click`);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith(``);
  });
});
