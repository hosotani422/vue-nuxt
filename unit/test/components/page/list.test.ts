import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import fixture from "../../../fixture/page/list";
import app from "@/store/page/app";
import list from "@/store/page/list";

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
    expect(wrapper.findAll(`header svg[aria-label='plus']`)).toHaveLength(1);
    expect(wrapper.findAll(`header svg[aria-label='arrow']`)).toHaveLength(1);
    expect(wrapper.findAll(`header h1`)).toHaveLength(1);
    expect(wrapper.find(`header h1`).text()).toBe(`Memosuku`);
  });
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findAll(`main li`)).toHaveLength(3);
    expect(wrapper.findAll(`main li`)[0]!.classes()).toContain(`select`);
    expect(wrapper.findAll(`main li`)[0]!.classes()).not.toContain(`edit`);
    expect(wrapper.findAll(`main li`)[0]!.classes()).not.toContain(`hide`);
    expect(wrapper.findAll(`main li`)[0]!.classes()).not.toContain(`text-theme-care`);
    expect(wrapper.findAll(`main li`)[0]!.classes()).toContain(`text-theme-warn`);
    expect(wrapper.findAll(`main li`)[1]!.classes()).not.toContain(`select`);
    expect(wrapper.findAll(`main li`)[1]!.classes()).toContain(`edit`);
    expect(wrapper.findAll(`main li`)[1]!.classes()).toContain(`hide`);
    expect(wrapper.findAll(`main li`)[1]!.classes()).toContain(`text-theme-care`);
    expect(wrapper.findAll(`main li`)[1]!.classes()).not.toContain(`text-theme-warn`);
    expect(wrapper.findAll(`main li`)[2]!.classes()).not.toContain(`select`);
    expect(wrapper.findAll(`main li`)[2]!.classes()).not.toContain(`edit`);
    expect(wrapper.findAll(`main li`)[2]!.classes()).not.toContain(`hide`);
    expect(wrapper.findAll(`main li`)[2]!.classes()).not.toContain(`text-theme-care`);
    expect(wrapper.findAll(`main li`)[2]!.classes()).not.toContain(`text-theme-warn`);
    expect(wrapper.findAll(`main svg[aria-label='list']`)).toHaveLength(1);
    expect(wrapper.findAll(`main svg[aria-label='inbox']`)).toHaveLength(1);
    expect(wrapper.findAll(`main svg[aria-label='trash']`)).toHaveLength(2);
    expect(wrapper.findAll(`main svg[aria-label='clone']`)).toHaveLength(2);
    expect(wrapper.findAll(`main h2`)).toHaveLength(3);
    expect(wrapper.findAll(`main h2`)[0]!.text()).toBe(`list1`);
    expect(wrapper.findAll(`main h2`)[1]!.text()).toBe(`Inbox`);
    expect(wrapper.findAll(`main h2`)[2]!.text()).toBe(`Trash`);
    expect(wrapper.findAll(`main p`)).toHaveLength(3);
    expect(wrapper.findAll(`main p`)[0]!.text()).toBe(`1/1`);
    expect(wrapper.findAll(`main p`)[1]!.text()).toBe(`0/0`);
    expect(wrapper.findAll(`main p`)[2]!.text()).toBe(`9/9`);
  });
});

describe(`event`, () => {
  it(`root`, ({ wrapper }) => {
    const dragStartMock = vi.spyOn(list.handle, `dragStart`).mockReturnValue();
    const dragMoveMock = vi.spyOn(list.handle, `dragMove`).mockReturnValue();
    const dragEndMock = vi.spyOn(list.handle, `dragEnd`).mockReturnValue();
    const swipeInitMock = vi.spyOn(list.handle, `swipeInit`).mockReturnValue();
    const swipeStartMock = vi.spyOn(list.handle, `swipeStart`).mockReturnValue();
    const swipeMoveMock = vi.spyOn(list.handle, `swipeMove`).mockReturnValue();
    const swipeEndMock = vi.spyOn(list.handle, `swipeEnd`).mockReturnValue();
    wrapper.find(`div[aria-label='list']`).trigger(`touchmove`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(dragStartMock).toBeCalledTimes(1);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(1);
    expect(dragMoveMock).toBeCalledWith({ y: 1 });
    expect(swipeStartMock).toBeCalledTimes(1);
    expect(swipeStartMock).toBeCalledWith({ x: 1, y: 1 });
    expect(swipeMoveMock).toBeCalledTimes(1);
    expect(swipeMoveMock).toBeCalledWith({ x: 1 });
    wrapper.find(`div[aria-label='list']`).trigger(`mousemove`, { clientX: 2, clientY: 2 });
    expect(dragStartMock).toBeCalledTimes(2);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(2);
    expect(dragMoveMock).toBeCalledWith({ y: 2 });
    expect(swipeStartMock).toBeCalledTimes(2);
    expect(swipeStartMock).toBeCalledWith({ x: 2, y: 2 });
    expect(swipeMoveMock).toBeCalledTimes(2);
    expect(swipeMoveMock).toBeCalledWith({ x: 2 });
    wrapper.find(`div[aria-label='list']`).trigger(`touchend`, { changedTouches: [{ clientX: 1 }] });
    expect(dragEndMock).toBeCalledTimes(1);
    expect(dragEndMock).toBeCalledWith();
    expect(swipeEndMock).toBeCalledTimes(1);
    expect(swipeEndMock).toBeCalledWith({ x: 1 });
    wrapper.find(`div[aria-label='list']`).trigger(`mouseup`, { clientX: 2 });
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
    const entryItemMock = vi.spyOn(list.handle, `entryItem`).mockReturnValue();
    wrapper.find(`header svg[aria-label='plus']`).trigger(`click`);
    expect(entryItemMock).toBeCalledTimes(1);
    expect(entryItemMock).toBeCalledWith();
    wrapper.find(`header svg[aria-label='arrow']`).trigger(`click`);
    expect(routerBackMock).toBeCalledTimes(1);
    expect(routerBackMock).toBeCalledWith();
  });
  it(`contents`, ({ wrapper }) => {
    const routerBackMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    const editItemMock = vi.spyOn(list.handle, `editItem`).mockReturnValue();
    const copyItemMock = vi.spyOn(list.handle, `copyItem`).mockReturnValue();
    const deleteItemMock = vi.spyOn(list.handle, `deleteItem`).mockReturnValue();
    const dragInitMock = vi.spyOn(list.handle, `dragInit`).mockReturnValue();
    wrapper.find(`div[aria-label='list']`).trigger(`click`);
    expect(editItemMock).toBeCalledTimes(1);
    expect(editItemMock).toBeCalledWith();
    wrapper.findAll(`main li`)[0]!.trigger(`longtouch`, { detail: { changedTouches: [{ clientY: 1 }] } });
    expect(editItemMock).toBeCalledTimes(2);
    expect(editItemMock).toBeCalledWith({ listId: `list1111111111111` });
    expect(dragInitMock).toBeCalledTimes(1);
    expect(dragInitMock).toBeCalledWith({ listId: `list1111111111111`, y: 1 });
    wrapper.findAll(`main li`)[1]!.trigger(`longclick`, { detail: { clientY: 2 } });
    expect(editItemMock).toBeCalledTimes(3);
    expect(editItemMock).toBeCalledWith({ listId: `list0000000000000` });
    expect(dragInitMock).toBeCalledTimes(2);
    expect(dragInitMock).toBeCalledWith({ listId: `list0000000000000`, y: 2 });
    wrapper.findAll(`main li`)[0]!.trigger(`click`);
    expect(routerBackMock).toBeCalledTimes(1);
    expect(routerBackMock).toBeCalledWith({ listId: `list1111111111111` });
    wrapper.findAll(`main svg[aria-label='clone']`)[0]!.trigger(`click`);
    expect(copyItemMock).toBeCalledTimes(1);
    expect(copyItemMock).toBeCalledWith({ listId: `list1111111111111` });
    wrapper.findAll(`main svg[aria-label='trash']`)[0]!.trigger(`click`);
    expect(deleteItemMock).toBeCalledTimes(1);
    expect(deleteItemMock).toBeCalledWith({ listId: `list0000000000000` });
  });
});
