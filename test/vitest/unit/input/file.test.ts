import {describe, it, expect} from 'vitest';
import {mount, flushPromises} from '@vue/test-utils';
import InputFile from '@/components/input/file.vue';

describe(`InputFile`, () => {
  it(`default`, async() => {
    const wrapper = mount({
      components: {InputFile},
      template: `<InputFile />`,
    });
    await flushPromises();
    expect(wrapper.find(`button`).element.textContent).toBe(`ファイル選択`);
  });
  it(`slot`, async() => {
    const wrapper = mount({
      components: {InputFile},
      template: `<InputFile>InputFile</InputFile>`,
    });
    await flushPromises();
    expect(wrapper.find(`button`).element.textContent).toBe(`InputFile`);
  });
});
