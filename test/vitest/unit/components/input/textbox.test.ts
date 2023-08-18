import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputTextbox from "@/components/input/textbox.vue";

describe(`dom`, () => {
  it(`default`, () => {
    const wrapper = mount(InputTextbox);
    expect(wrapper.findByTestId(`InputTextbox`).attributes(`type`)).toBe(`text`);
    expect(wrapper.findByTestId<HTMLInputElement>(`InputTextbox`).element.value).toBe(``);
  });
  it(`type:text`, () => {
    const wrapper = mount(InputTextbox, { props: { type: `text` } });
    expect(wrapper.findByTestId(`InputTextbox`).attributes(`type`)).toBe(`text`);
  });
  it(`type:password`, () => {
    const wrapper = mount(InputTextbox, { props: { type: `password` } });
    expect(wrapper.findByTestId(`InputTextbox`).attributes(`type`)).toBe(`password`);
  });
  it(`value`, () => {
    const wrapper = mount(InputTextbox, { props: { modelValue: `setProps` } });
    expect(wrapper.findByTestId<HTMLInputElement>(`InputTextbox`).element.value).toBe(`setProps`);
  });
});

describe(`event`, () => {
  it(`v-model`, async () => {
    const wrapper = mount(InputTextbox, {
      props: {
        "onUpdate:modelValue": (e: string) => {
          wrapper.setProps({ modelValue: e });
        },
      },
    });
    await wrapper.findByTestId(`InputTextbox`).setValue(`setValue`);
    expect(wrapper.props(`modelValue`)).toBe(`setValue`);
  });
});
