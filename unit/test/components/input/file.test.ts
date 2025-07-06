import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputFile from "@/components/input/file.vue";

describe(`view`, () => {
  it(`default`, () => {
    const wrapper = mount(InputFile);
    expect(wrapper.find(`button`).text()).toBe(``);
  });
  it(`slot`, () => {
    const wrapper = mount(InputFile, { slots: { default: `file` } });
    expect(wrapper.find(`button`).text()).toBe(`file`);
  });
});
