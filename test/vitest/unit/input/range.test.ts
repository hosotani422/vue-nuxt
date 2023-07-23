import {describe, it, expect} from 'vitest';
import {mount, flushPromises} from '@vue/test-utils';
import InputRange from '@/components/input/range.vue';

describe(`InputRange`, () => {
  it(`default`, async() => {
    const wrapper = mount({
      components: {InputRange},
      template: `<InputRange />`,
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.value).toBe(0);
    expect(wrapper.find(`input`).element.min).toBe(`0`);
    expect(wrapper.find(`input`).element.max).toBe(`100`);
    expect(wrapper.find(`input`).element.step).toBe(`1`);
  });
  it(`value:full`, async() => {
    const value = ref(5);
    const wrapper = mount({
      components: {InputRange},
      template: `<InputRange :min="1" :max="10" :step="3" v-model="value" />`,
      setup: () => ({value}),
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.value).toBe(5);
    expect(wrapper.find(`input`).element.min).toBe(`1`);
    expect(wrapper.find(`input`).element.max).toBe(`10`);
    expect(wrapper.find(`input`).element.step).toBe(`3`);
  });
  it(`onInput`, async() => {
    const value = ref(0);
    const wrapper = mount({
      components: {InputRange},
      template: `<InputRange :min="1" :max="10" :step="3" v-model="value" />`,
      setup: () => ({value}),
    });
    await flushPromises();
    await wrapper.find(`input`).setValue(10);
    expect(value.value).toBe(10);
  });
});
