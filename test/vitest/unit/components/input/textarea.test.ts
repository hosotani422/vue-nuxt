import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputTextArea from "@/components/input/textarea.vue";

describe(`dom`, () => {
  it(`default`, () => {
    const wrapper = mount(InputTextArea);
    const element = wrapper.findByTestId<HTMLInputElement>(`InputTextarea`);
    expect(element.classes()).toContain(`field-sizing-fixed`);
    expect(element.element.value).toBe(``);
  });
  it(`sizing:fixed`, () => {
    const wrapper = mount(InputTextArea, { props: { resize: false } });
    const element = wrapper.findByTestId<HTMLInputElement>(`InputTextarea`);
    expect(element.classes()).toContain(`field-sizing-fixed`);
    expect(element.element.value).toBe(``);
  });
  it(`sizing:content`, () => {
    const wrapper = mount(InputTextArea, { props: { resize: true } });
    const element = wrapper.findByTestId<HTMLInputElement>(`InputTextarea`);
    expect(element.classes()).toContain(`field-sizing-content`);
    expect(element.element.value).toBe(``);
  });
  it(`value`, () => {
    const wrapper = mount(InputTextArea, { props: { modelValue: `value1` } });
    const element = wrapper.findByTestId<HTMLInputElement>(`InputTextarea`);
    expect(element.classes()).toContain(`field-sizing-fixed`);
    expect(element.element.value).toBe(`value1`);
    element.setValue(`value2`);
    expect(element.element.value).toBe(`value2`);
  });
});
