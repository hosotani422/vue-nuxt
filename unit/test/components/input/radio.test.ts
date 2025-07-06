import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputRadio from "@/components/input/radio.vue";

describe(`view`, () => {
  it(`default`, () => {
    const wrapper = mount(InputRadio);
    expect(wrapper.find(`input`).element.checked).toBe(false);
    expect(wrapper.find(`label`).text()).toBe(``);
  });
  it(`slot`, () => {
    const wrapper = mount(InputRadio, { slots: { default: `slot` } });
    expect(wrapper.find(`input`).element.checked).toBe(false);
    expect(wrapper.find(`label`).text()).toBe(`slot`);
  });
  it(`value`, async () => {
    const wrapper = mount(InputRadio, { props: { value: `on`, modelValue: `off` } });
    expect(wrapper.find(`input`).element.checked).toBe(false);
    expect(wrapper.find(`label`).text()).toBe(``);
    wrapper.find(`input`).setValue(true);
    expect(wrapper.emitted(`update:modelValue`)).toHaveLength(1);
    expect(wrapper.emitted(`update:modelValue`)![0]![0]).toEqual(`on`);
    expect(wrapper.find(`input`).element.checked).toBe(true);
  });
});
