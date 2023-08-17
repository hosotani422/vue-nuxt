import {describe, it, expect} from 'vitest';
import {mount, flushPromises} from '@vue/test-utils';
import InputTextbox from '@/components/input/textbox.vue';

describe(`InputTextbox`, () => {
  it(`default`, async() => {
    const wrapper = mount({
      components: {InputTextbox},
      template: `<InputTextbox />`,
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.getAttribute(`type`)).toBe(`text`);
    expect(wrapper.find(`input`).element.value).toBe(``);
  });
  it(`type:text`, async() => {
    const wrapper = mount({
      components: {InputTextbox},
      template: `<InputTextbox type="text" />`,
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.getAttribute(`type`)).toBe(`text`);
  });
  it(`type:password`, async() => {
    const wrapper = mount({
      components: {InputTextbox},
      template: `<InputTextbox type="password" />`,
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.getAttribute(`type`)).toBe(`password`);
  });
  it(`value:empty`, async() => {
    const value = ref(``);
    const wrapper = mount({
      components: {InputTextbox},
      template: `<InputTextbox v-model="value" />`,
      setup: () => ({value}),
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.value).toBe(``);
  });
  it(`value:full`, async() => {
    const value = ref(`value`);
    const wrapper = mount({
      components: {InputTextbox},
      template: `<InputTextbox v-model="value" />`,
      setup: () => ({value}),
    });
    await flushPromises();
    expect(wrapper.find(`input`).element.value).toBe(`value`);
  });
  it(`onInput`, async() => {
    const value = ref(``);
    const wrapper = mount({
      components: {InputTextbox},
      template: `<InputTextbox v-model="value" />`,
      setup: () => ({value}),
    });
    await flushPromises();
    await wrapper.find(`input`).setValue(`value`);
    expect(value.value).toBe(`value`);
  });
});
