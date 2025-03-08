import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/page/sub";
import app from "@/store/page/app";
import main from "@/store/page/main";
import sub from "@/store/page/sub";

const it = test.extend<{ wrapper: VueWrapper }>({
  wrapper: async ({}, use) => {
    fixture.setRouter();
    await fixture.init();
    await fixture.loadData();
    await use(fixture.getWrapper());
  },
});

describe(`dom`, () => {
  it(`header`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`SubRight`)).toHaveLength(1);
    expect(wrapper.findByTestIdAll(`SubTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`SubTitle`).element.value).toBe(`main1`);
    expect(wrapper.findByTestId(`SubTitle`).attributes(`placeholder`)).toBe(`タスク`);
    expect(wrapper.findByTestIdAll(`SubMode`)).toHaveLength(1);
  });
  it(`contents - memo`, async ({ wrapper }) => {
    await (main.state.data[`list1111111111111`]!.data[`main1111111111111`]!.task = false);
    expect(wrapper.findByTestIdAll(`SubItem`)).toHaveLength(0);
    expect(wrapper.findByTestIdAll(`SubMemo`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`SubMemo`).element.value).toEqual(`sub1\nsub2`);
    expect(wrapper.findByTestId(`SubMemo`).attributes(`placeholder`)).toBe(`メモ`);
  });
  it(`contents - task`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`SubMemo`)).toHaveLength(0);
    expect(wrapper.findByTestIdAll(`SubItem`)).toHaveLength(2);
    expect(wrapper.findByTestIdAll(`SubItem`)[0]!.classes()).toContain(`edit`);
    expect(wrapper.findByTestIdAll(`SubItem`)[0]!.classes()).toContain(`hide`);
    expect(wrapper.findByTestIdAll(`SubItem`)[1]!.classes()).not.toContain(`edit`);
    expect(wrapper.findByTestIdAll(`SubItem`)[1]!.classes()).not.toContain(`hide`);
    expect(wrapper.findByTestIdAll(`SubCheck`)).toHaveLength(2);
    expect(wrapper.findByTestIdAll<HTMLInputElement>(`SubCheck`)[0]!.element.checked).toBe(false);
    expect(wrapper.findByTestIdAll<HTMLInputElement>(`SubCheck`)[1]!.element.checked).toBe(true);
    expect(wrapper.findByTestIdAll(`SubTask`)).toHaveLength(2);
    expect(wrapper.findByTestIdAll<HTMLInputElement>(`SubTask`)[0]!.element.value).toBe(`sub1`);
    expect(wrapper.findByTestIdAll<HTMLInputElement>(`SubTask`)[1]!.element.value).toBe(`sub2`);
    expect(wrapper.findByTestIdAll(`SubTask`)[0]!.attributes(`placeholder`)).toBe(`サブタスク`);
    expect(wrapper.findByTestIdAll(`SubTask`)[1]!.attributes(`placeholder`)).toBe(`サブタスク`);
    expect(wrapper.findByTestIdAll(`SubDrag`)).toHaveLength(2);
    expect(wrapper.findByTestIdAll(`SubTrash`)).toHaveLength(2);
  });
  it(`footer`, ({ wrapper }) => {
    expect(wrapper.findByTestId(`SubFoot`).classes()).toContain(`text-theme-care`);
    expect(wrapper.findByTestId(`SubFoot`).classes()).not.toContain(`text-theme-warn`);
    expect(wrapper.findByTestIdAll(`SubDate`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`SubDate`).element.value).toBe(`2000/01/01`);
    expect(wrapper.findByTestId(`SubDate`).attributes(`placeholder`)).toBe(`日付`);
    expect(wrapper.findByTestIdAll(`SubTime`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`SubTime`).element.value).toBe(`00:00`);
    expect(wrapper.findByTestId(`SubTime`).attributes(`placeholder`)).toBe(`時刻`);
    expect(wrapper.findByTestIdAll(`SubDialog`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`SubDialog`).element.value).toEqual(`5分前,1時間前`);
    expect(wrapper.findByTestId(`SubDialog`).attributes(`placeholder`)).toBe(`アラーム`);
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
    wrapper.findByTestId(`SubRoot`).trigger(`touchmove`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(dragStartMock).toBeCalledTimes(1);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(1);
    expect(dragMoveMock).toBeCalledWith({ y: 1 });
    expect(swipeStartMock).toBeCalledTimes(1);
    expect(swipeStartMock).toBeCalledWith({ x: 1, y: 1 });
    expect(swipeMoveMock).toBeCalledTimes(1);
    expect(swipeMoveMock).toBeCalledWith({ x: 1 });
    wrapper.findByTestId(`SubRoot`).trigger(`mousemove`, { clientX: 2, clientY: 2 });
    expect(dragStartMock).toBeCalledTimes(2);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(2);
    expect(dragMoveMock).toBeCalledWith({ y: 2 });
    expect(swipeStartMock).toBeCalledTimes(2);
    expect(swipeStartMock).toBeCalledWith({ x: 2, y: 2 });
    expect(swipeMoveMock).toBeCalledTimes(2);
    expect(swipeMoveMock).toBeCalledWith({ x: 2 });
    wrapper.findByTestId(`SubRoot`).trigger(`touchend`, { changedTouches: [{ clientX: 1 }] });
    expect(dragEndMock).toBeCalledTimes(1);
    expect(dragEndMock).toBeCalledWith();
    expect(swipeEndMock).toBeCalledTimes(1);
    expect(swipeEndMock).toBeCalledWith({ x: 1 });
    wrapper.findByTestId(`SubRoot`).trigger(`mouseup`, { clientX: 2 });
    expect(dragEndMock).toBeCalledTimes(2);
    expect(dragEndMock).toBeCalledWith();
    expect(swipeEndMock).toBeCalledTimes(2);
    expect(swipeEndMock).toBeCalledWith({ x: 2 });
    wrapper.findByTestId(`SubBack`).trigger(`touchstart`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(swipeInitMock).toBeCalledTimes(1);
    expect(swipeInitMock).toBeCalledWith({ x: 1, y: 1 });
    wrapper.findByTestId(`SubBack`).trigger(`mousedown`, { clientX: 2, clientY: 2 });
    expect(swipeInitMock).toBeCalledTimes(2);
    expect(swipeInitMock).toBeCalledWith({ x: 2, y: 2 });
  });
  it(`header`, ({ wrapper }) => {
    const routerBackMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    const toggleModeMock = vi.spyOn(sub.handle, `toggleMode`).mockReturnValue();
    wrapper.findByTestId(`SubRight`).trigger(`click`);
    expect(routerBackMock).toBeCalledTimes(1);
    expect(routerBackMock).toBeCalledWith();
    wrapper.findByTestId(`SubMode`).trigger(`click`);
    expect(toggleModeMock).toBeCalledTimes(1);
    expect(toggleModeMock).toBeCalledWith();
  });
  it(`contents - memo`, async ({ wrapper }) => {
    const convertItemMock = vi.spyOn(sub.handle, `convertItem`).mockReturnValue();
    await (main.state.data[`list1111111111111`]!.data[`main1111111111111`]!.task = false);
    wrapper.findByTestId(`SubMemo`).trigger(`input`);
    expect(convertItemMock).toBeCalledTimes(1);
    expect(convertItemMock).toBeCalledWith({ text: `sub1\nsub2` });
  });
  it(`contents - task`, async ({ wrapper }) => {
    const divideItemMock = vi.spyOn(sub.handle, `divideItem`).mockResolvedValue();
    const connectItemMock = vi.spyOn(sub.handle, `connectItem`).mockResolvedValue();
    const dragInitMock = vi.spyOn(sub.handle, `dragInit`).mockReturnValue();
    const deleteItemMock = vi.spyOn(sub.handle, `deleteItem`).mockReturnValue();
    wrapper.findByTestIdAll<HTMLInputElement>(`SubTask`)[0]!.element.selectionStart = 3;
    wrapper.findByTestIdAll<HTMLInputElement>(`SubTask`)[0]!.element.selectionEnd = 3;
    wrapper.findByTestIdAll(`SubTask`)[0]!.trigger(`keydown.enter.prevent`);
    expect(divideItemMock).toBeCalledTimes(1);
    expect(divideItemMock).toBeCalledWith({ subId: `sub1111111111111`, caret: 3 });
    wrapper.findByTestIdAll<HTMLInputElement>(`SubTask`)[1]!.element.selectionStart = 0;
    wrapper.findByTestIdAll<HTMLInputElement>(`SubTask`)[1]!.element.selectionEnd = 0;
    wrapper.findByTestIdAll(`SubTask`)[1]!.trigger(`keydown.backspace`);
    expect(connectItemMock).toBeCalledTimes(1);
    expect(connectItemMock).toBeCalledWith({ subId: `sub2222222222222` });
    wrapper.findByTestIdAll(`SubDrag`)[0]!.trigger(`touchstart`, { changedTouches: [{ clientY: 1 }] });
    expect(dragInitMock).toBeCalledTimes(1);
    expect(dragInitMock).toBeCalledWith({ subId: `sub1111111111111`, y: 1 });
    wrapper.findByTestIdAll(`SubDrag`)[0]!.trigger(`mousedown`, { clientY: 2 });
    expect(dragInitMock).toBeCalledTimes(2);
    expect(dragInitMock).toBeCalledWith({ subId: `sub1111111111111`, y: 2 });
    wrapper.findByTestIdAll(`SubTrash`)[0]!.trigger(`click`);
    expect(deleteItemMock).toBeCalledTimes(1);
    expect(deleteItemMock).toBeCalledWith({ subId: `sub1111111111111` });
  });
  it(`footer`, ({ wrapper }) => {
    const openDateMock = vi.spyOn(sub.handle, `openDate`).mockReturnValue();
    const openTimeMock = vi.spyOn(sub.handle, `openTime`).mockReturnValue();
    const openAlarmMock = vi.spyOn(sub.handle, `openAlarm`).mockReturnValue();
    wrapper.findByTestId(`SubDate`).trigger(`click`);
    expect(openDateMock).toBeCalledTimes(1);
    expect(openDateMock).toBeCalledWith();
    wrapper.findByTestId(`SubTime`).trigger(`click`);
    expect(openTimeMock).toBeCalledTimes(1);
    expect(openTimeMock).toBeCalledWith();
    wrapper.findByTestId(`SubDialog`).trigger(`click`);
    expect(openAlarmMock).toBeCalledTimes(1);
    expect(openAlarmMock).toBeCalledWith();
  });
});
