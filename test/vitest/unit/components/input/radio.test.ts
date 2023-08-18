import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputRadio from "@/components/input/radio.vue";

describe(`dom`, () => {
  it(`default`, () => {
    const wrapper = mount(InputRadio);
    expect(wrapper.findByTestId<HTMLInputElement>(`InputRadio`).element.checked).toBe(false);
    expect(wrapper.findByTestId(`InputRadioLabel`).text()).toBe(``);
  });
  it(`slot`, () => {
    const wrapper = mount(InputRadio, { slots: { default: `InputRadio` } });
    expect(wrapper.findByTestId(`InputRadioLabel`).text()).toBe(`InputRadio`);
  });
  it(`value`, () => {
    const wrapper = mount(InputRadio, { props: { value: `on`, modelValue: `on` } });
    expect(wrapper.findByTestId<HTMLInputElement>(`InputRadio`).element.checked).toBe(true);
  });
});

describe(`event`, () => {
  it(`v-model`, async () => {
    const wrapper = mount(InputRadio, {
      props: {
        value: `on`,
        modelValue: `off`,
        "onUpdate:modelValue": (e: string) => {
          wrapper.setProps({ modelValue: e === `on` });
        },
      },
    });
    await wrapper.findByTestId(`InputRadio`).setValue(true);
    expect(wrapper.props(`modelValue`)).toBe(true);
  });
});
