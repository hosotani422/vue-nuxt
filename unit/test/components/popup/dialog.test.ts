import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import fixture from "../../../fixture/popup/dialog";
import dialog from "@/store/popup/dialog";

const it = test.extend<{ wrapper: ReturnType<typeof mount> }>({
  wrapper: async ({}, use) => {
    await fixture.init();
    await use(fixture.getWrapper());
  },
});

describe(`view`, () => {
  it(`alert`, async ({ wrapper }) => {
    await (dialog.state.mode = `alert`);
    expect(wrapper.findAll(`header`)).toHaveLength(1);
    expect(wrapper.find(`header`).text()).toBe(`title`);
    expect(wrapper.findAll(`main div`)).toHaveLength(1);
    expect(wrapper.find(`main div`).text()).toBe(`message`);
    expect(wrapper.findAll(`main input[type='text']`)).toHaveLength(0);
    expect(wrapper.findAll(`main input[type='checkbox']`)).toHaveLength(0);
    expect(wrapper.findAll(`main input[type='radio']`)).toHaveLength(0);
    expect(wrapper.findAll(`footer button`)).toHaveLength(1);
    expect(wrapper.findAll(`footer button`)[0]!.text()).toBe(`cancel`);
  });
  it(`confirm`, async ({ wrapper }) => {
    await (dialog.state.mode = `confirm`);
    expect(wrapper.findAll(`header`)).toHaveLength(1);
    expect(wrapper.find(`header`).text()).toBe(`title`);
    expect(wrapper.findAll(`main div`)).toHaveLength(1);
    expect(wrapper.find(`main div`).text()).toBe(`message`);
    expect(wrapper.findAll(`main input[type='text']`)).toHaveLength(0);
    expect(wrapper.findAll(`main input[type='checkbox']`)).toHaveLength(0);
    expect(wrapper.findAll(`main input[type='radio']`)).toHaveLength(0);
    expect(wrapper.findAll(`footer button`)).toHaveLength(2);
    expect(wrapper.findAll(`footer button`)[0]!.text()).toBe(`cancel`);
    expect(wrapper.findAll(`footer button`)[1]!.text()).toBe(`ok`);
  });
  it(`text`, async ({ wrapper }) => {
    await (dialog.state.mode = `text`);
    expect(wrapper.findAll(`header`)).toHaveLength(1);
    expect(wrapper.find(`header`).text()).toBe(`title`);
    expect(wrapper.findAll(`main div`)).toHaveLength(1);
    expect(wrapper.find(`main div`).text()).toBe(`message`);
    expect(wrapper.findAll(`main input[type='text']`)).toHaveLength(1);
    expect(wrapper.find<HTMLInputElement>(`main input[type='text']`).element.value).toBe(`text`);
    expect(wrapper.find(`main input[type='text']`).attributes(`placeholder`)).toBe(`placeholder`);
    expect(wrapper.findAll(`main input[type='checkbox']`)).toHaveLength(0);
    expect(wrapper.findAll(`main input[type='radio']`)).toHaveLength(0);
    expect(wrapper.findAll(`footer button`)).toHaveLength(2);
    expect(wrapper.findAll(`footer button`)[0]!.text()).toBe(`cancel`);
    expect(wrapper.findAll(`footer button`)[1]!.text()).toBe(`ok`);
  });
  it(`check`, async ({ wrapper }) => {
    await (dialog.state.mode = `check`);
    expect(wrapper.findAll(`header`)).toHaveLength(1);
    expect(wrapper.find(`header`).text()).toBe(`title`);
    expect(wrapper.findAll(`main div`)).toHaveLength(1);
    expect(wrapper.find(`main div`).text()).toBe(`message`);
    expect(wrapper.findAll(`main input[type='text']`)).toHaveLength(0);
    expect(wrapper.findAll(`main label`)).toHaveLength(3);
    expect(wrapper.findAll(`main input[type='checkbox']`)).toHaveLength(3);
    expect(wrapper.findAll<HTMLInputElement>(`main input[type='checkbox']`)[0]!.element.checked).toBe(false);
    expect(wrapper.findAll<HTMLInputElement>(`main input[type='checkbox']`)[1]!.element.checked).toBe(true);
    expect(wrapper.findAll<HTMLInputElement>(`main input[type='checkbox']`)[2]!.element.checked).toBe(false);
    expect(wrapper.findAll(`main label`)[0]!.text()).toBe(`全選択`);
    expect(wrapper.findAll(`main label`)[1]!.text()).toBe(`check1`);
    expect(wrapper.findAll(`main label`)[2]!.text()).toBe(`check2`);
    expect(wrapper.findAll(`main input[type='radio']`)).toHaveLength(0);
    expect(wrapper.findAll(`footer button`)).toHaveLength(2);
    expect(wrapper.findAll(`footer button`)[0]!.text()).toBe(`cancel`);
    expect(wrapper.findAll(`footer button`)[1]!.text()).toBe(`ok`);
  });
  it(`radio`, async ({ wrapper }) => {
    await (dialog.state.mode = `radio`);
    expect(wrapper.findAll(`header`)).toHaveLength(1);
    expect(wrapper.find(`header`).text()).toBe(`title`);
    expect(wrapper.findAll(`main div`)).toHaveLength(1);
    expect(wrapper.find(`main div`).text()).toBe(`message`);
    expect(wrapper.findAll(`main input[type='text']`)).toHaveLength(0);
    expect(wrapper.findAll(`main input[type='checkbox']`)).toHaveLength(0);
    expect(wrapper.findAll(`main label`)).toHaveLength(3);
    expect(wrapper.findAll(`main input[type='radio']`)).toHaveLength(3);
    expect(wrapper.findAll<HTMLInputElement>(`main input[type='radio']`)[0]!.element.checked).toBe(false);
    expect(wrapper.findAll<HTMLInputElement>(`main input[type='radio']`)[1]!.element.checked).toBe(true);
    expect(wrapper.findAll<HTMLInputElement>(`main input[type='radio']`)[2]!.element.checked).toBe(false);
    expect(wrapper.findAll(`main label`)[0]!.text()).toBe(`未選択`);
    expect(wrapper.findAll(`main label`)[1]!.text()).toBe(`radio1`);
    expect(wrapper.findAll(`main label`)[2]!.text()).toBe(`radio2`);
    expect(wrapper.findAll(`footer button`)).toHaveLength(2);
    expect(wrapper.findAll(`footer button`)[0]!.text()).toBe(`cancel`);
    expect(wrapper.findAll(`footer button`)[1]!.text()).toBe(`ok`);
  });
  it(`error`, async ({ wrapper }) => {
    await (dialog.state.mode = `text`);
    await (dialog.state.init = false);
    await (dialog.state.text.value = ``);
    expect(wrapper.findAll(`p`)).toHaveLength(1);
    expect(wrapper.find(`p`).text()).toBe(`空白以外の文字を１つ以上入力してください。`);
  });
});

describe(`event`, () => {
  it(`text`, async ({ wrapper }) => {
    await (dialog.state.mode = `text`);
    wrapper.find(`main input[type='text']`).trigger(`input`);
    expect(dialog.state.init).toBe(false);
  });
  it(`check`, async ({ wrapper }) => {
    const clickCheckAllMock = vi.spyOn(dialog.handle, `clickCheckAll`).mockReturnValue();
    await (dialog.state.mode = `check`);
    wrapper.findAll(`main input[type='checkbox']`)[0]!.trigger(`change`);
    expect(clickCheckAllMock).toBeCalledTimes(1);
    expect(clickCheckAllMock).toBeCalledWith({ check: false });
  });
  it(`footer`, async ({ wrapper }) => {
    await (dialog.state.mode = `confirm`);
    const cancelMock = vi.spyOn(dialog.refer.callback, `cancel`).mockReturnValue();
    const okMock = vi.spyOn(dialog.refer.callback, `ok`).mockReturnValue();
    wrapper.findAll(`footer button`)[0]!.trigger(`click`);
    expect(cancelMock).toBeCalledTimes(1);
    expect(cancelMock).toBeCalledWith();
    wrapper.findAll(`footer button`)[1]!.trigger(`click`);
    expect(okMock).toBeCalledTimes(1);
    expect(okMock).toBeCalledWith();
  });
});
