import {describe, it, expect} from 'vitest';
import {mount, flushPromises} from '@vue/test-utils';
import InputButton from '@/components/input/button.vue';

describe(`InputButton`, () => {
  it(`default`, async() => {
    const wrapper = mount({
      components: {InputButton},
      template: `<InputButton />`,
    });
    await flushPromises();
    expect(wrapper.find(`button`).element.getAttribute(`type`)).toBe(`button`);
    expect(wrapper.find(`button`).element.textContent).toBe(`ボタン`);
  });
  it(`type:button`, async() => {
    const wrapper = mount({
      components: {InputButton},
      template: `<InputButton type="button" />`,
    });
    await flushPromises();
    expect(wrapper.find(`button`).element.getAttribute(`type`)).toBe(`button`);
  });
  it(`type:reset`, async() => {
    const wrapper = mount({
      components: {InputButton},
      template: `<InputButton type="reset" />`,
    });
    await flushPromises();
    expect(wrapper.find(`button`).element.getAttribute(`type`)).toBe(`reset`);
  });
  it(`type:submit`, async() => {
    const wrapper = mount({
      components: {InputButton},
      template: `<InputButton type="submit" />`,
    });
    await flushPromises();
    expect(wrapper.find(`button`).element.getAttribute(`type`)).toBe(`submit`);
  });
  it(`slot`, async() => {
    const wrapper = mount({
      components: {InputButton},
      template: `<InputButton>InputButton</InputButton>`,
    });
    await flushPromises();
    expect(wrapper.find(`button`).element.textContent).toBe(`InputButton`);
  });
});
