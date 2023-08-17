import {describe, it, expect} from 'vitest';
import {mount, flushPromises} from '@vue/test-utils';
import InputTextArea from '@/components/input/textarea.vue';

describe(`InputTextArea`, () => {
  it(`default`, async() => {
    const wrapper = mount({
      components: {InputTextArea},
      template: `<InputTextArea />`,
    });
    await flushPromises();
    expect(wrapper.find(`textarea`).element.value).toBe(``);
  });
  it(`value:full`, async() => {
    const value = ref(`value`);
    const wrapper = mount({
      components: {InputTextArea},
      template: `<InputTextArea v-model="value" />`,
      setup: () => ({value}),
    });
    await flushPromises();
    expect(wrapper.find(`textarea`).element.value).toBe(`value`);
  });
  it(`onInput`, async() => {
    const value = ref(``);
    const wrapper = mount({
      components: {InputTextArea},
      template: `<InputTextArea v-model="value" />`,
      setup: () => ({value}),
    });
    await flushPromises();
    await wrapper.find(`textarea`).setValue(`value`);
    expect(value.value).toBe(`value`);
  });
});
