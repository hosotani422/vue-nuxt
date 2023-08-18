import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputTextArea from "@/components/input/textarea.vue";

describe(`dom`, () => {
  it(`default`, () => {
    const wrapper = mount(InputTextArea);
    expect(wrapper.findByTestId<HTMLInputElement>(`InputTextarea`).element.value).toBe(``);
  });
  it(`value`, () => {
    const wrapper = mount(InputTextArea, { props: { modelValue: `setProps` } });
    expect(wrapper.findByTestId<HTMLInputElement>(`InputTextarea`).element.value).toBe(`setProps`);
  });
});

describe(`event`, () => {
  it(`v-model`, async () => {
    const wrapper = mount(InputTextArea, {
      props: {
        "onUpdate:modelValue": (e: string) => {
          wrapper.setProps({ modelValue: e });
        },
      },
    });
    await wrapper.findByTestId(`InputTextarea`).setValue(`setValue`);
    expect(wrapper.props(`modelValue`)).toBe(`setValue`);
  });
});
