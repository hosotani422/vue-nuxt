import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputTextArea from "@/components/input/textarea.vue";

describe(`view`, () => {
  it(`default`, () => {
    const wrapper = mount(InputTextArea);
    expect(wrapper.find(`textarea`).classes()).toContain(`field-sizing-fixed`);
    expect(wrapper.find(`textarea`).element.value).toBe(``);
  });
  it(`resize`, () => {
    const wrapper = mount(InputTextArea, { props: { resize: true } });
    expect(wrapper.find(`textarea`).classes()).toContain(`field-sizing-content`);
    expect(wrapper.find(`textarea`).element.value).toBe(``);
  });
  it(`value`, () => {
    const wrapper = mount(InputTextArea, { props: { modelValue: `value1` } });
    expect(wrapper.find(`textarea`).classes()).toContain(`field-sizing-fixed`);
    expect(wrapper.find(`textarea`).element.value).toBe(`value1`);
    wrapper.find(`textarea`).setValue(`value2`);
    expect(wrapper.emitted(`update:modelValue`)).toHaveLength(1);
    expect(wrapper.emitted(`update:modelValue`)![0]![0]).toEqual(`value2`);
    expect(wrapper.find(`textarea`).element.value).toBe(`value2`);
  });
});
