import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/page/app";

const it = test.extend<{ wrapper: VueWrapper }>({
  wrapper: async ({ task }, use) => {
    fixture.setRouter();
    await fixture.loadData();
    await use(await fixture.getWrapper());
  },
});

describe(`dom`, () => {
  it(`header`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`AppRoot`).length).toBe(1);
    expect(wrapper.findByTestId(`AppRoot`).classes()).toContain(`light`);
    expect(wrapper.findByTestId(`AppRoot`).classes()).toContain(`speed2`);
    expect(wrapper.findByTestId(`AppRoot`).classes()).toContain(`text-base`);
    expect(wrapper.findByTestIdAll(`AppTitle`).length).toBe(1);
    expect(wrapper.findByTestId(`AppTitle`).text()).toBe(`Memotea`);
    expect(wrapper.findByTestId(`AppViewport`).attributes(`name`)).toBe(`viewport`);
    expect(wrapper.findByTestId(`AppViewport`).attributes(`content`)).toBe(`width=device-width, initial-scale=1`);
    expect(wrapper.findByTestId(`AppDescription`).attributes(`name`)).toBe(`description`);
    expect(wrapper.findByTestId(`AppDescription`).attributes(`content`)).toBe(`メモ帳、TODOアプリ`);
    expect(wrapper.findByTestId(`AppIcon`).attributes(`rel`)).toBe(`icon`);
    expect(wrapper.findByTestId(`AppIcon`).attributes(`href`)).toBe(`/favicon.png`);
    expect(wrapper.findByTestId(`AppNoScript`).text()).toBe(`JavaScript is required`);
    expect(wrapper.findByTestIdAll(`AppFoot`).length).toBe(0);
  });
});
