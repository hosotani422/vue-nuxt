import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import fixture from "../../../fixture/page/app";

const it = test.extend<{ wrapper: ReturnType<typeof mount> }>({
  wrapper: async ({}, use) => {
    fixture.setRouter();
    await fixture.init();
    await fixture.loadData();
    await use(await fixture.getWrapper());
  },
});

describe(`view`, () => {
  it(`root`, async ({ wrapper }) => {
    expect(wrapper.findAll(`html`)).toHaveLength(1);
    expect(wrapper.find(`html`).classes()).toContain(`dark`);
    expect(wrapper.find(`html`).classes()).toContain(`just`);
    expect(wrapper.find(`html`).classes()).toContain(`text-base`);
  });
  it(`header`, ({ wrapper }) => {
    expect(wrapper.findAll(`head title`)).toHaveLength(1);
    expect(wrapper.find(`head title`).text()).toBe(`Memosuku`);
    expect(wrapper.findAll(`[charset='utf-8']`)).toHaveLength(1);
    expect(wrapper.findAll(`[name='viewport']`)).toHaveLength(1);
    expect(wrapper.find(`[name='viewport']`).attributes(`content`)).toBe(`width=device-width, initial-scale=1`);
    expect(wrapper.findAll(`[name='description']`)).toHaveLength(1);
    expect(wrapper.find(`[name='description']`).attributes(`content`)).toBe(`メモ帳、TODOアプリ`);
    expect(wrapper.findAll(`[rel='icon']`)).toHaveLength(1);
    expect(wrapper.find(`[rel='icon']`).attributes(`href`)).toBe(`/favicon.png`);
    expect(wrapper.findAll(`head noscript`)).toHaveLength(1);
    expect(wrapper.find(`head noscript`).text()).toBe(`JavaScript is required`);
  });
});
