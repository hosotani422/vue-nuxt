import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import fixture from "../../../fixture/page/sub";
import app from "@/store/page/app";
import main from "@/store/page/main";
import sub from "@/store/page/sub";

const it = test.extend<{ wrapper: ReturnType<typeof mount> }>({
  wrapper: async ({}, use) => {
    fixture.setRouter();
    await fixture.init();
    await fixture.loadData();
    await use(fixture.getWrapper());
  },
});

describe(`view`, () => {
  it(`header`, ({ wrapper }) => {
    expect(wrapper.findAll(`header svg[aria-label='arrow']`)).toHaveLength(1);
    expect(wrapper.findAll(`header svg[aria-label='mode']`)).toHaveLength(1);
    expect(wrapper.findAll(`header input`)).toHaveLength(1);
    expect(wrapper.find<HTMLInputElement>(`header input`).element.value).toBe(`main1`);
    expect(wrapper.find(`header input`).attributes(`placeholder`)).toBe(`タスク`);
  });
  it(`contents - memo`, async ({ wrapper }) => {
    await (main.state.data[`list1111111111111`]!.data[`main1111111111111`]!.task = false);
    expect(wrapper.findAll(`main textarea`)).toHaveLength(1);
    expect(wrapper.find<HTMLInputElement>(`main textarea`).element.value).toEqual(`sub1\nsub2`);
    expect(wrapper.find<HTMLInputElement>(`main textarea`).attributes(`placeholder`)).toBe(`メモ`);
  });
  it(`contents - task`, ({ wrapper }) => {
    expect(wrapper.findAll(`main li`)).toHaveLength(2);
    expect(wrapper.findAll(`main li`)[0]!.classes()).toContain(`edit`);
    expect(wrapper.findAll(`main li`)[0]!.classes()).toContain(`hide`);
    expect(wrapper.findAll(`main li`)[1]!.classes()).not.toContain(`edit`);
    expect(wrapper.findAll(`main li`)[1]!.classes()).not.toContain(`hide`);
    expect(wrapper.findAll(`main input`)).toHaveLength(2);
    expect(wrapper.findAll<HTMLInputElement>(`main input`)[0]!.element.checked).toBe(false);
    expect(wrapper.findAll<HTMLInputElement>(`main input`)[1]!.element.checked).toBe(true);
    expect(wrapper.findAll(`main textarea`)).toHaveLength(2);
    expect(wrapper.findAll<HTMLInputElement>(`main textarea`)[0]!.element.value).toBe(`sub1`);
    expect(wrapper.findAll<HTMLInputElement>(`main textarea`)[1]!.element.value).toBe(`sub2`);
    expect(wrapper.findAll(`main textarea`)[0]!.attributes(`placeholder`)).toBe(`サブタスク`);
    expect(wrapper.findAll(`main textarea`)[1]!.attributes(`placeholder`)).toBe(`サブタスク`);
    expect(wrapper.findAll(`main svg[aria-label='drag']`)).toHaveLength(2);
    expect(wrapper.findAll(`main svg[aria-label='trash']`)).toHaveLength(2);
  });
  it(`footer`, ({ wrapper }) => {
    expect(wrapper.findAll(`footer`)).toHaveLength(1);
    expect(wrapper.find(`footer`).classes()).toContain(`text-theme-care`);
    expect(wrapper.find(`footer`).classes()).not.toContain(`text-theme-warn`);
    expect(wrapper.findAll(`footer input`)).toHaveLength(3);
    expect(wrapper.findAll<HTMLInputElement>(`footer input`)[0]!.element.value).toBe(`2000/01/01`);
    expect(wrapper.findAll(`footer input`)[0]!.attributes(`placeholder`)).toBe(`日付`);
    expect(wrapper.findAll<HTMLInputElement>(`footer input`)[1]!.element.value).toBe(`00:00`);
    expect(wrapper.findAll(`footer input`)[1]!.attributes(`placeholder`)).toBe(`時刻`);
    expect(wrapper.findAll<HTMLInputElement>(`footer input`)[2]!.element.value).toEqual(`5分前,1時間前`);
    expect(wrapper.findAll(`footer input`)[2]!.attributes(`placeholder`)).toBe(`アラーム`);
  });
});

describe(`event`, () => {
  it(`root`, ({ wrapper }) => {
    const dragStartMock = vi.spyOn(sub.handle, `dragStart`).mockReturnValue();
    const dragMoveMock = vi.spyOn(sub.handle, `dragMove`).mockReturnValue();
    const dragEndMock = vi.spyOn(sub.handle, `dragEnd`).mockReturnValue();
    const swipeInitMock = vi.spyOn(sub.handle, `swipeInit`).mockReturnValue();
    const swipeStartMock = vi.spyOn(sub.handle, `swipeStart`).mockReturnValue();
    const swipeMoveMock = vi.spyOn(sub.handle, `swipeMove`).mockReturnValue();
    const swipeEndMock = vi.spyOn(sub.handle, `swipeEnd`).mockReturnValue();
    wrapper.find(`div[aria-label='sub']`).trigger(`touchmove`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(dragStartMock).toBeCalledTimes(1);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(1);
    expect(dragMoveMock).toBeCalledWith({ y: 1 });
    expect(swipeStartMock).toBeCalledTimes(1);
    expect(swipeStartMock).toBeCalledWith({ x: 1, y: 1 });
    expect(swipeMoveMock).toBeCalledTimes(1);
    expect(swipeMoveMock).toBeCalledWith({ x: 1 });
    wrapper.find(`div[aria-label='sub']`).trigger(`mousemove`, { clientX: 2, clientY: 2 });
    expect(dragStartMock).toBeCalledTimes(2);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(2);
    expect(dragMoveMock).toBeCalledWith({ y: 2 });
    expect(swipeStartMock).toBeCalledTimes(2);
    expect(swipeStartMock).toBeCalledWith({ x: 2, y: 2 });
    expect(swipeMoveMock).toBeCalledTimes(2);
    expect(swipeMoveMock).toBeCalledWith({ x: 2 });
    wrapper.find(`div[aria-label='sub']`).trigger(`touchend`, { changedTouches: [{ clientX: 1 }] });
    expect(dragEndMock).toBeCalledTimes(1);
    expect(dragEndMock).toBeCalledWith();
    expect(swipeEndMock).toBeCalledTimes(1);
    expect(swipeEndMock).toBeCalledWith({ x: 1 });
    wrapper.find(`div[aria-label='sub']`).trigger(`mouseup`, { clientX: 2 });
    expect(dragEndMock).toBeCalledTimes(2);
    expect(dragEndMock).toBeCalledWith();
    expect(swipeEndMock).toBeCalledTimes(2);
    expect(swipeEndMock).toBeCalledWith({ x: 2 });
    wrapper.find(`aside`).trigger(`touchstart`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(swipeInitMock).toBeCalledTimes(1);
    expect(swipeInitMock).toBeCalledWith({ x: 1, y: 1 });
    wrapper.find(`aside`).trigger(`mousedown`, { clientX: 2, clientY: 2 });
    expect(swipeInitMock).toBeCalledTimes(2);
    expect(swipeInitMock).toBeCalledWith({ x: 2, y: 2 });
  });
  it(`header`, ({ wrapper }) => {
    const routerBackMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    const toggleModeMock = vi.spyOn(sub.handle, `toggleMode`).mockReturnValue();
    wrapper.find(`header svg[aria-label='arrow']`).trigger(`click`);
    expect(routerBackMock).toBeCalledTimes(1);
    expect(routerBackMock).toBeCalledWith();
    wrapper.find(`header svg[aria-label='mode']`).trigger(`click`);
    expect(toggleModeMock).toBeCalledTimes(1);
    expect(toggleModeMock).toBeCalledWith();
  });
  it(`contents - memo`, async ({ wrapper }) => {
    const convertItemMock = vi.spyOn(sub.handle, `convertItem`).mockReturnValue();
    await (main.state.data[`list1111111111111`]!.data[`main1111111111111`]!.task = false);
    wrapper.find(`main textarea`).trigger(`input`);
    expect(convertItemMock).toBeCalledTimes(1);
    expect(convertItemMock).toBeCalledWith({ text: `sub1\nsub2` });
  });
  it(`contents - task`, async ({ wrapper }) => {
    const divideItemMock = vi.spyOn(sub.handle, `divideItem`).mockResolvedValue();
    const connectItemMock = vi.spyOn(sub.handle, `connectItem`).mockResolvedValue();
    const dragInitMock = vi.spyOn(sub.handle, `dragInit`).mockReturnValue();
    const deleteItemMock = vi.spyOn(sub.handle, `deleteItem`).mockReturnValue();
    wrapper.findAll<HTMLInputElement>(`main textarea`)[0]!.element.selectionStart = 3;
    wrapper.findAll<HTMLInputElement>(`main textarea`)[0]!.element.selectionEnd = 3;
    wrapper.findAll(`main textarea`)[0]!.trigger(`keydown.enter.prevent`);
    expect(divideItemMock).toBeCalledTimes(1);
    expect(divideItemMock).toBeCalledWith({ subId: `sub1111111111111`, caret: 3 });
    wrapper.findAll<HTMLInputElement>(`main textarea`)[1]!.element.selectionStart = 0;
    wrapper.findAll<HTMLInputElement>(`main textarea`)[1]!.element.selectionEnd = 0;
    wrapper.findAll(`main textarea`)[1]!.trigger(`keydown.backspace`);
    expect(connectItemMock).toBeCalledTimes(1);
    expect(connectItemMock).toBeCalledWith({ subId: `sub2222222222222` });
    wrapper.findAll(`main svg[aria-label='drag']`)[0]!.trigger(`touchstart`, { changedTouches: [{ clientY: 1 }] });
    expect(dragInitMock).toBeCalledTimes(1);
    expect(dragInitMock).toBeCalledWith({ subId: `sub1111111111111`, y: 1 });
    wrapper.findAll(`main svg[aria-label='drag']`)[0]!.trigger(`mousedown`, { clientY: 2 });
    expect(dragInitMock).toBeCalledTimes(2);
    expect(dragInitMock).toBeCalledWith({ subId: `sub1111111111111`, y: 2 });
    wrapper.findAll(`main svg[aria-label='trash']`)[0]!.trigger(`click`);
    expect(deleteItemMock).toBeCalledTimes(1);
    expect(deleteItemMock).toBeCalledWith({ subId: `sub1111111111111` });
  });
  it(`footer`, ({ wrapper }) => {
    const openDateMock = vi.spyOn(sub.handle, `openDate`).mockReturnValue();
    const openTimeMock = vi.spyOn(sub.handle, `openTime`).mockReturnValue();
    const openAlarmMock = vi.spyOn(sub.handle, `openAlarm`).mockReturnValue();
    wrapper.findAll(`footer input`)[0]!.trigger(`click`);
    expect(openDateMock).toBeCalledTimes(1);
    expect(openDateMock).toBeCalledWith();
    wrapper.findAll(`footer input`)[1]!.trigger(`click`);
    expect(openTimeMock).toBeCalledTimes(1);
    expect(openTimeMock).toBeCalledWith();
    wrapper.findAll(`footer input`)[2]!.trigger(`click`);
    expect(openAlarmMock).toBeCalledTimes(1);
    expect(openAlarmMock).toBeCalledWith();
  });
});
