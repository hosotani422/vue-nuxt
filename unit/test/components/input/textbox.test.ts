import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputTextbox from "@/components/input/textbox.vue";

describe(`view`, () => {
  it(`default`, () => {
    const wrapper = mount(InputTextbox);
    expect(wrapper.find(`input`).attributes(`type`)).toBe(`text`);
    expect(wrapper.find(`input`).element.value).toBe(``);
  });
  it(`text`, () => {
    const wrapper = mount(InputTextbox, { props: { type: `text` } });
    expect(wrapper.find(`input`).attributes(`type`)).toBe(`text`);
    expect(wrapper.find(`input`).element.value).toBe(``);
  });
  it(`password`, () => {
    const wrapper = mount(InputTextbox, { props: { type: `password` } });
    expect(wrapper.find(`input`).attributes(`type`)).toBe(`password`);
    expect(wrapper.find(`input`).element.value).toBe(``);
  });
  it(`value`, () => {
    const wrapper = mount(InputTextbox, { props: { modelValue: `value1` } });
    expect(wrapper.find(`input`).attributes(`type`)).toBe(`text`);
    expect(wrapper.find(`input`).element.value).toBe(`value1`);
    wrapper.find(`input`).setValue(`value2`);
    expect(wrapper.emitted(`update:modelValue`)).toHaveLength(1);
    expect(wrapper.emitted(`update:modelValue`)![0]![0]).toEqual(`value2`);
    expect(wrapper.find(`input`).element.value).toBe(`value2`);
  });
});
