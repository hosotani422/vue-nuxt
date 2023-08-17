import {describe, it, expect} from 'vitest';
import {mount, flushPromises} from '@vue/test-utils';
import InputRadio from '@/components/input/radio.vue';

describe(`InputRadio`, () => {
  it(`default`, async() => {
    const wrapper = mount({
      components: {InputRadio},
      template: `<InputRadio>InputRadio</InputRadio>`,
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.checked).toBe(false);
    expect(wrapper.find(`label`).element.textContent).toBe(`InputRadio`);
  });
  it(`value:false`, async() => {
    const value = ref(`off`);
    const wrapper = mount({
      components: {InputRadio},
      template: `<InputRadio value="on" v-model="value">InputRadio</InputRadio>`,
      setup: () => ({value}),
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.checked).toBe(false);
  });
  it(`value:true`, async() => {
    const value = ref(`on`);
    const wrapper = mount({
      components: {InputRadio},
      template: `<InputRadio value="on" v-model="value">InputRadio</InputRadio>`,
      setup: () => ({value}),
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.checked).toBe(true);
  });
  it(`onChange:true`, async() => {
    const value = ref(`off`);
    const wrapper = mount({
      components: {InputRadio},
      template: `<InputRadio value="on" v-model="value">InputRadio</InputRadio>`,
      setup: () => ({value}),
    });
    await flushPromises();
    await wrapper.find(`input`).setValue(true);
    expect(value.value).toBe(`on`);
  });
});
