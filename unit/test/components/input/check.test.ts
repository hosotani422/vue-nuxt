import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputCheck from "@/components/input/check.vue";

describe(`view`, () => {
  it(`default`, () => {
    const wrapper = mount(InputCheck);
    expect(wrapper.find(`input`).element.checked).toBe(false);
    expect(wrapper.find(`label`).text()).toBe(``);
  });
  it(`slot`, () => {
    const wrapper = mount(InputCheck, { slots: { default: `slot` } });
    expect(wrapper.find(`input`).element.checked).toBe(false);
    expect(wrapper.find(`label`).text()).toBe(`slot`);
  });
  it(`value`, () => {
    const wrapper = mount(InputCheck, { props: { modelValue: true } });
    expect(wrapper.find(`input`).element.checked).toBe(true);
    expect(wrapper.find(`label`).text()).toBe(``);
    wrapper.find(`input`).setValue(false);
    expect(wrapper.emitted(`update:modelValue`)).toHaveLength(1);
    expect(wrapper.emitted(`update:modelValue`)![0]![0]).toEqual(false);
    expect(wrapper.find(`input`).element.checked).toBe(false);
  });
});
