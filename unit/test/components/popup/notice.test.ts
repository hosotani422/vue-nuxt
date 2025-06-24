import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import fixture from "../../../fixture/popup/notice";
import notice from "@/store/popup/notice";

const it = test.extend<{ wrapper: ReturnType<typeof mount> }>({
  wrapper: async ({}, use) => {
    await use(fixture.getWrapper());
  },
});

describe(`view`, () => {
  it(`all`, ({ wrapper }) => {
    expect(wrapper.findAll(`main`)).toHaveLength(1);
    expect(wrapper.find(`main`).text()).toBe(`message`);
    expect(wrapper.findAll(`button`)).toHaveLength(1);
    expect(wrapper.find(`button`).text()).toBe(`button`);
  });
});

describe(`event`, () => {
  it(`all`, ({ wrapper }) => {
    const callbackMock = vi.spyOn(notice.refer, `callback`).mockReturnValue();
    wrapper.find(`button`).trigger(`click`);
    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith();
  });
});
