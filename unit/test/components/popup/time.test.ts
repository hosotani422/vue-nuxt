import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import fixture from "../../../fixture/popup/time";
import time from "@/store/popup/time";

const it = test.extend<{ wrapper: ReturnType<typeof mount> }>({
  wrapper: async ({}, use) => {
    await use(fixture.getWrapper());
  },
});

describe(`view`, () => {
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findAll(`main canvas`)).toHaveLength(2);
  });
  it(`footer`, ({ wrapper }) => {
    expect(wrapper.findAll(`footer button`)).toHaveLength(3);
    expect(wrapper.findAll(`footer button`)[0]!.text()).toBe(`cancel`);
    expect(wrapper.findAll(`footer button`)[1]!.text()).toBe(`clear`);
    expect(wrapper.findAll(`footer button`)[2]!.text()).toBe(`ok`);
  });
});

describe(`event`, () => {
  it(`contents`, ({ wrapper }) => {
    const inputTimeMock = vi.spyOn(time.handle, `inputTime`).mockReturnValue();
    wrapper.findAll(`main canvas`)[0]!.trigger(`touchstart`, { touches: [{ pageX: 1, pageY: 1 }] });
    expect(inputTimeMock).toBeCalledTimes(1);
    expect(inputTimeMock).toBeCalledWith({ type: `hour`, x: 1, y: 1 });
    wrapper.findAll(`main canvas`)[0]!.trigger(`touchmove`, { touches: [{ pageX: 2, pageY: 2 }] });
    expect(inputTimeMock).toBeCalledTimes(2);
    expect(inputTimeMock).toBeCalledWith({ type: `hour`, x: 2, y: 2 });
    wrapper.findAll(`main canvas`)[0]!.trigger(`mousedown`, { pageX: 3, pageY: 3 });
    expect(inputTimeMock).toBeCalledTimes(3);
    expect(inputTimeMock).toBeCalledWith({ type: `hour`, x: 3, y: 3 });
    wrapper.findAll(`main canvas`)[0]!.trigger(`mousemove`, { pageX: 4, pageY: 4 });
    expect(inputTimeMock).toBeCalledTimes(4);
    expect(inputTimeMock).toBeCalledWith({ type: `hour`, x: 4, y: 4 });
    wrapper.findAll(`main canvas`)[1]!.trigger(`touchstart`, { touches: [{ pageX: 5, pageY: 5 }] });
    expect(inputTimeMock).toBeCalledTimes(5);
    expect(inputTimeMock).toBeCalledWith({ type: `minute`, x: 5, y: 5 });
    wrapper.findAll(`main canvas`)[1]!.trigger(`touchmove`, { touches: [{ pageX: 6, pageY: 6 }] });
    expect(inputTimeMock).toBeCalledTimes(6);
    expect(inputTimeMock).toBeCalledWith({ type: `minute`, x: 6, y: 6 });
    wrapper.findAll(`main canvas`)[1]!.trigger(`mousedown`, { pageX: 7, pageY: 7 });
    expect(inputTimeMock).toBeCalledTimes(7);
    expect(inputTimeMock).toBeCalledWith({ type: `minute`, x: 7, y: 7 });
    wrapper.findAll(`main canvas`)[1]!.trigger(`mousemove`, { pageX: 8, pageY: 8 });
    expect(inputTimeMock).toBeCalledTimes(8);
    expect(inputTimeMock).toBeCalledWith({ type: `minute`, x: 8, y: 8 });
  });
  it(`footer`, ({ wrapper }) => {
    const closeMock = vi.spyOn(time.handle, `close`).mockReturnValue();
    const callbackMock = vi.spyOn(time.refer, `callback`).mockReturnValue();
    wrapper.findAll(`footer button`)[0]!.trigger(`click`);
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
    wrapper.findAll(`footer button`)[1]!.trigger(`click`);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith();
    wrapper.findAll(`footer button`)[2]!.trigger(`click`);
    expect(callbackMock).toBeCalledTimes(2);
    expect(callbackMock).toBeCalledWith({ hour: 0, minute: 0 });
  });
});
