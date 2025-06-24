import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import fixture from "../../../fixture/popup/date";
import date from "@/store/popup/date";

const it = test.extend<{ wrapper: ReturnType<typeof mount> }>({
  wrapper: async ({}, use) => {
    await fixture.init();
    await use(fixture.getWrapper());
  },
});

describe(`view`, () => {
  it(`header`, ({ wrapper }) => {
    expect(wrapper.findAll(`header svg[aria-label='angle']`)).toHaveLength(2);
    expect(wrapper.findAll(`header p`)).toHaveLength(1);
    expect(wrapper.find(`header p`).text()).toBe(`2023/09`);
    expect(wrapper.findAll(`header li`)).toHaveLength(7);
    expect(wrapper.findAll(`header li`)[0]!.text()).toBe(`日`);
    expect(wrapper.findAll(`header li`)[1]!.text()).toBe(`月`);
    expect(wrapper.findAll(`header li`)[2]!.text()).toBe(`火`);
    expect(wrapper.findAll(`header li`)[3]!.text()).toBe(`水`);
    expect(wrapper.findAll(`header li`)[4]!.text()).toBe(`木`);
    expect(wrapper.findAll(`header li`)[5]!.text()).toBe(`金`);
    expect(wrapper.findAll(`header li`)[6]!.text()).toBe(`土`);
  });
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findAll(`main ul`)).toHaveLength(3);
    expect(wrapper.findAll(`main li`)).toHaveLength(99);
    expect(wrapper.findAll(`main li`)[33]!.text()).toBe(`27`);
    expect(wrapper.findAll(`main li`)[33]!.classes()).not.toContain(`select`);
    expect(wrapper.findAll(`main li`)[33]!.classes()).not.toContain(`today`);
    expect(wrapper.findAll(`main li`)[33]!.classes()).toContain(`hide`);
    expect(wrapper.findAll(`main li`)[59]!.text()).toBe(`22`);
    expect(wrapper.findAll(`main li`)[59]!.classes()).toContain(`select`);
    expect(wrapper.findAll(`main li`)[59]!.classes()).toContain(`today`);
    expect(wrapper.findAll(`main li`)[59]!.classes()).not.toContain(`hide`);
  });
  it(`footer`, ({ wrapper }) => {
    expect(wrapper.findAll(`footer button`)).toHaveLength(2);
    expect(wrapper.findAll(`footer button`)[0]!.text()).toBe(`cancel`);
    expect(wrapper.findAll(`footer button`)[1]!.text()).toBe(`clear`);
  });
});

describe(`event`, () => {
  it(`root`, ({ wrapper }) => {
    const swipeStartMock = vi.spyOn(date.handle, `swipeStart`).mockReturnValue();
    const swipeMoveMock = vi.spyOn(date.handle, `swipeMove`).mockReturnValue();
    const swipeEndMock = vi.spyOn(date.handle, `swipeEnd`).mockReturnValue();
    wrapper.find(`div[aria-label='date']`).trigger(`touchmove`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(swipeStartMock).toBeCalledTimes(1);
    expect(swipeStartMock).toBeCalledWith({ x: 1, y: 1 });
    expect(swipeMoveMock).toBeCalledTimes(1);
    expect(swipeMoveMock).toBeCalledWith({ x: 1 });
    wrapper.find(`div[aria-label='date']`).trigger(`mousemove`, { clientX: 2, clientY: 2 });
    expect(swipeStartMock).toBeCalledTimes(2);
    expect(swipeStartMock).toBeCalledWith({ x: 2, y: 2 });
    expect(swipeMoveMock).toBeCalledTimes(2);
    expect(swipeMoveMock).toBeCalledWith({ x: 2 });
    wrapper.find(`div[aria-label='date']`).trigger(`touchend`, { changedTouches: [{ clientX: 1 }] });
    expect(swipeEndMock).toBeCalledTimes(1);
    expect(swipeEndMock).toBeCalledWith({ x: 1 });
    wrapper.find(`div[aria-label='date']`).trigger(`mouseup`, { clientX: 2 });
    expect(swipeEndMock).toBeCalledTimes(2);
    expect(swipeEndMock).toBeCalledWith({ x: 2 });
  });
  it(`header`, ({ wrapper }) => {
    const pageMoveMock = vi.spyOn(date.handle, `pageMove`).mockReturnValue();
    wrapper.findAll(`header svg[aria-label='angle']`)[0]!.trigger(`click`);
    expect(pageMoveMock).toBeCalledTimes(1);
    expect(pageMoveMock).toBeCalledWith({ mode: `prev` });
    wrapper.findAll(`header svg[aria-label='angle']`)[1]!.trigger(`click`);
    expect(pageMoveMock).toBeCalledTimes(2);
    expect(pageMoveMock).toBeCalledWith({ mode: `next` });
  });
  it(`contents`, ({ wrapper }) => {
    const swipeInitMock = vi.spyOn(date.handle, `swipeInit`).mockReturnValue();
    const callbackMock = vi.spyOn(date.refer, `callback`).mockReturnValue();
    wrapper.find(`main div`).trigger(`touchstart`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(swipeInitMock).toBeCalledTimes(1);
    expect(swipeInitMock).toBeCalledWith({ x: 1, y: 1 });
    wrapper.find(`main div`).trigger(`mousedown`, { clientX: 2, clientY: 2 });
    expect(swipeInitMock).toBeCalledTimes(2);
    expect(swipeInitMock).toBeCalledWith({ x: 2, y: 2 });
    wrapper.findAll(`main li`)[59]!.trigger(`click`);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith(`2023/09/22`);
  });
  it(`footer`, ({ wrapper }) => {
    const closeMock = vi.spyOn(date.handle, `close`).mockReturnValue();
    const callbackMock = vi.spyOn(date.refer, `callback`).mockReturnValue();
    wrapper.findAll(`footer button`)[0]!.trigger(`click`);
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
    wrapper.findAll(`footer button`)[1]!.trigger(`click`);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith(``);
  });
});
