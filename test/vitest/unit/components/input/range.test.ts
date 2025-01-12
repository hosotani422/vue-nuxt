import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputRange from "@/components/input/range.vue";

describe(`dom`, () => {
  it(`default`, () => {
    const wrapper = mount(InputRange);
    expect(wrapper.findByTestId(`InputRange`).attributes(`min`)).toBe(`0`);
    expect(wrapper.findByTestId(`InputRange`).attributes(`max`)).toBe(`100`);
    expect(wrapper.findByTestId(`InputRange`).attributes(`step`)).toBe(`1`);
    expect(wrapper.findByTestId<HTMLInputElement>(`InputRange`).element.value).toBe(`0`);
  });
  it(`prop`, () => {
    const wrapper = mount(InputRange, { props: { min: 1, max: 10, step: 3 } });
    expect(wrapper.findByTestId(`InputRange`).attributes(`min`)).toBe(`1`);
    expect(wrapper.findByTestId(`InputRange`).attributes(`max`)).toBe(`10`);
    expect(wrapper.findByTestId(`InputRange`).attributes(`step`)).toBe(`3`);
    expect(wrapper.findByTestId<HTMLInputElement>(`InputRange`).element.value).toBe(`1`);
  });
  it(`value`, () => {
    const wrapper = mount(InputRange, { props: { modelValue: 50 } });
    expect(wrapper.findByTestId(`InputRange`).attributes(`min`)).toBe(`0`);
    expect(wrapper.findByTestId(`InputRange`).attributes(`max`)).toBe(`100`);
    expect(wrapper.findByTestId(`InputRange`).attributes(`step`)).toBe(`1`);
    expect(wrapper.findByTestId<HTMLInputElement>(`InputRange`).element.value).toBe(`50`);
    wrapper.findByTestId(`InputRange`).setValue(100);
    expect(wrapper.findByTestId<HTMLInputElement>(`InputRange`).element.value).toBe(`100`);
  });
});

describe(`logic`, () => {
  it(`updateStyle`, () => {
    const wrapper = mount(InputRange, { props: { min: 0, max: 100, step: 1, modelValue: 33 } });
    expect(wrapper.vm.updateStyle()).toBe(`background: linear-gradient(to right, #18d 33%, #959595 33%)`);
  });
});
