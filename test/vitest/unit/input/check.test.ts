import {describe, it, expect} from 'vitest';
import {mount, flushPromises} from '@vue/test-utils';
import InputCheck from '@/components/input/check.vue';

describe(`InputCheck`, () => {
  it(`default`, async() => {
    const wrapper = mount({
      components: {InputCheck},
      template: `<InputCheck>InputCheck</InputCheck>`,
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.checked).toBe(false);
    expect(wrapper.find(`label`).element.textContent).toBe(`InputCheck`);
  });
  it(`value:false`, async() => {
    const value = ref(false);
    const wrapper = mount({
      components: {InputCheck},
      template: `<InputCheck v-model="value">InputCheck</InputCheck>`,
      setup: () => ({value}),
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.checked).toBe(false);
  });
  it(`value:true`, async() => {
    const value = ref(true);
    const wrapper = mount({
      components: {InputCheck},
      template: `<InputCheck v-model="value">InputCheck</InputCheck>`,
      setup: () => ({value}),
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.checked).toBe(true);
  });
  it(`onChange:true`, async() => {
    const value = ref(false);
    const wrapper = mount({
      components: {InputCheck},
      template: `<InputCheck v-model="value">InputCheck</InputCheck>`,
      setup: () => ({value}),
    });
    await flushPromises();
    await wrapper.find(`input`).setValue(true);
    expect(value.value).toBe(true);
  });
  it(`onChange:false`, async() => {
    const value = ref(true);
    const wrapper = mount({
      components: {InputCheck},
      template: `<InputCheck v-model="value">InputCheck</InputCheck>`,
      setup: () => ({value}),
    });
    await flushPromises();
    await wrapper.find(`input`).setValue(false);
    expect(value.value).toBe(false);
  });
});
