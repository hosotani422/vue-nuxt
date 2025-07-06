import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputRange from "@/components/input/range.vue";

describe(`view`, () => {
  it(`default`, () => {
    const wrapper = mount(InputRange);
    expect(wrapper.find(`input`).attributes(`min`)).toBe(`0`);
    expect(wrapper.find(`input`).attributes(`max`)).toBe(`100`);
    expect(wrapper.find(`input`).attributes(`step`)).toBe(`1`);
    expect(wrapper.find(`input`).element.value).toBe(`0`);
  });
  it(`prop`, () => {
    const wrapper = mount(InputRange, { props: { min: 1, max: 10, step: 3 } });
    expect(wrapper.find(`input`).attributes(`min`)).toBe(`1`);
    expect(wrapper.find(`input`).attributes(`max`)).toBe(`10`);
    expect(wrapper.find(`input`).attributes(`step`)).toBe(`3`);
    expect(wrapper.find(`input`).element.value).toBe(`1`);
  });
  it(`value`, () => {
    const wrapper = mount(InputRange, { props: { modelValue: 50 } });
    expect(wrapper.find(`input`).attributes(`min`)).toBe(`0`);
    expect(wrapper.find(`input`).attributes(`max`)).toBe(`100`);
    expect(wrapper.find(`input`).attributes(`step`)).toBe(`1`);
    expect(wrapper.find(`input`).element.value).toBe(`50`);
    wrapper.find(`input`).setValue(100);
    expect(wrapper.emitted(`update:modelValue`)).toHaveLength(1);
    expect(wrapper.emitted(`update:modelValue`)![0]![0]).toEqual(100);
    expect(wrapper.find(`input`).element.value).toBe(`100`);
  });
});

describe(`logic`, () => {
  it(`styleLine`, () => {
    const wrapper = mount(InputRange, { props: { min: 0, max: 100, step: 1, modelValue: 33 } });
    expect(wrapper.vm.render.styleLine()).toEqual({
      background: `linear-gradient(to right, var(--color-theme-fine) 33%, var(--color-theme-half) 33%)`,
    });
  });
});
