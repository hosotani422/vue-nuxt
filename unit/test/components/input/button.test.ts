import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputButton from "@/components/input/button.vue";

describe(`view`, () => {
  it(`default`, () => {
    const wrapper = mount(InputButton);
    expect(wrapper.find(`button`).attributes(`type`)).toBe(`button`);
    expect(wrapper.find(`button`).text()).toBe(``);
  });
  it(`reset`, () => {
    const wrapper = mount(InputButton, { props: { type: `reset` } });
    expect(wrapper.find(`button`).attributes(`type`)).toBe(`reset`);
    expect(wrapper.find(`button`).text()).toBe(``);
  });
  it(`submit`, () => {
    const wrapper = mount(InputButton, { props: { type: `submit` } });
    expect(wrapper.find(`button`).attributes(`type`)).toBe(`submit`);
    expect(wrapper.find(`button`).text()).toBe(``);
  });
  it(`slot`, () => {
    const wrapper = mount(InputButton, { slots: { default: `button` } });
    expect(wrapper.find(`button`).attributes(`type`)).toBe(`button`);
    expect(wrapper.find(`button`).text()).toBe(`button`);
  });
});
