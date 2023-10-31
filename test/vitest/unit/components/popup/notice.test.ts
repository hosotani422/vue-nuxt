import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/popup/notice";
import notice from "@/stores/popup/notice";

const it = test.extend<{ wrapper: VueWrapper }>({
  wrapper: async ({ task }, use) => {
    fixture.setAction();
    fixture.setRouter();
    await fixture.loadData();
    await use(fixture.getWrapper());
  },
});

describe(`dom`, () => {
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`NoticeMessage`).length).toBe(1);
    expect(wrapper.findByTestId(`NoticeMessage`).text()).toBe(`message`);
    expect(wrapper.findByTestIdAll(`NoticeBack`).length).toBe(1);
    expect(wrapper.findByTestId(`NoticeBack`).text()).toBe(`button`);
  });
});

describe(`event`, () => {
  it(`contents`, ({ wrapper }) => {
    wrapper.findByTestId(`NoticeBack`).trigger(`click`);
    expect(notice.state.callback).toBeCalledTimes(1);
  });
});
