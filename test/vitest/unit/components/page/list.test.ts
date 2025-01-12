import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/page/list";
import app from "@/store/page/app";
import list from "@/store/page/list";

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
    expect(wrapper.findByTestIdAll(`ListPlus`)).toHaveLength(1);
    expect(wrapper.findByTestIdAll(`ListTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId(`ListTitle`).text()).toBe(`Memosuku`);
    expect(wrapper.findByTestIdAll(`ListLeft`)).toHaveLength(1);
  });
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`ListItem`)).toHaveLength(3);
    expect(wrapper.findByTestIdAll(`ListItem`)[0]!.classes()).toContain(`select`);
    expect(wrapper.findByTestIdAll(`ListItem`)[0]!.classes()).not.toContain(`edit`);
    expect(wrapper.findByTestIdAll(`ListItem`)[0]!.classes()).not.toContain(`hide`);
    expect(wrapper.findByTestIdAll(`ListItem`)[0]!.classes()).not.toContain(`text-theme-care`);
    expect(wrapper.findByTestIdAll(`ListItem`)[0]!.classes()).toContain(`text-theme-warn`);
    expect(wrapper.findByTestIdAll(`ListItem`)[1]!.classes()).not.toContain(`select`);
    expect(wrapper.findByTestIdAll(`ListItem`)[1]!.classes()).toContain(`edit`);
    expect(wrapper.findByTestIdAll(`ListItem`)[1]!.classes()).toContain(`hide`);
    expect(wrapper.findByTestIdAll(`ListItem`)[1]!.classes()).toContain(`text-theme-care`);
    expect(wrapper.findByTestIdAll(`ListItem`)[1]!.classes()).not.toContain(`text-theme-warn`);
    expect(wrapper.findByTestIdAll(`ListItem`)[2]!.classes()).not.toContain(`select`);
    expect(wrapper.findByTestIdAll(`ListItem`)[2]!.classes()).not.toContain(`edit`);
    expect(wrapper.findByTestIdAll(`ListItem`)[2]!.classes()).not.toContain(`hide`);
    expect(wrapper.findByTestIdAll(`ListItem`)[2]!.classes()).not.toContain(`text-theme-care`);
    expect(wrapper.findByTestIdAll(`ListItem`)[2]!.classes()).not.toContain(`text-theme-warn`);
    expect(wrapper.findByTestIdAll(`ListIcon`)).toHaveLength(3);
    expect(wrapper.findByTestIdAll(`ListTask`)).toHaveLength(3);
    expect(wrapper.findByTestIdAll(`ListTask`)[0]!.text()).toBe(`list1`);
    expect(wrapper.findByTestIdAll(`ListTask`)[1]!.text()).toBe(`Inbox`);
    expect(wrapper.findByTestIdAll(`ListTask`)[2]!.text()).toBe(`Trash`);
    expect(wrapper.findByTestIdAll(`ListCount`)).toHaveLength(3);
    expect(wrapper.findByTestIdAll(`ListCount`)[0]!.text()).toBe(`1/1`);
    expect(wrapper.findByTestIdAll(`ListCount`)[1]!.text()).toBe(`0/0`);
    expect(wrapper.findByTestIdAll(`ListCount`)[2]!.text()).toBe(`9/9`);
    expect(wrapper.findByTestIdAll(`ListClone`)).toHaveLength(2);
    expect(wrapper.findByTestIdAll(`ListTrash`)).toHaveLength(1);
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
    wrapper.findByTestId(`ListRoot`).trigger(`touchmove`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(dragStartMock).toBeCalledTimes(1);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(1);
    expect(dragMoveMock).toBeCalledWith({ y: 1 });
    expect(swipeStartMock).toBeCalledTimes(1);
    expect(swipeStartMock).toBeCalledWith({ x: 1, y: 1 });
    expect(swipeMoveMock).toBeCalledTimes(1);
    expect(swipeMoveMock).toBeCalledWith({ x: 1 });
    wrapper.findByTestId(`ListRoot`).trigger(`mousemove`, { clientX: 2, clientY: 2 });
    expect(dragStartMock).toBeCalledTimes(2);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(2);
    expect(dragMoveMock).toBeCalledWith({ y: 2 });
    expect(swipeStartMock).toBeCalledTimes(2);
    expect(swipeStartMock).toBeCalledWith({ x: 2, y: 2 });
    expect(swipeMoveMock).toBeCalledTimes(2);
    expect(swipeMoveMock).toBeCalledWith({ x: 2 });
    wrapper.findByTestId(`ListRoot`).trigger(`touchend`, { changedTouches: [{ clientX: 1 }] });
    expect(dragEndMock).toBeCalledTimes(1);
    expect(dragEndMock).toBeCalledWith();
    expect(swipeEndMock).toBeCalledTimes(1);
    expect(swipeEndMock).toBeCalledWith({ x: 1 });
    wrapper.findByTestId(`ListRoot`).trigger(`mouseup`, { clientX: 2 });
    expect(dragEndMock).toBeCalledTimes(2);
    expect(dragEndMock).toBeCalledWith();
    expect(swipeEndMock).toBeCalledTimes(2);
    expect(swipeEndMock).toBeCalledWith({ x: 2 });
    wrapper.findByTestId(`ListBack`).trigger(`touchstart`, { changedTouches: [{ clientX: 1, clientY: 1 }] });
    expect(swipeInitMock).toBeCalledTimes(1);
    expect(swipeInitMock).toBeCalledWith({ x: 1, y: 1 });
    wrapper.findByTestId(`ListBack`).trigger(`mousedown`, { clientX: 2, clientY: 2 });
    expect(swipeInitMock).toBeCalledTimes(2);
    expect(swipeInitMock).toBeCalledWith({ x: 2, y: 2 });
  });
  it(`header`, ({ wrapper }) => {
    const routerBackMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    const entryItemMock = vi.spyOn(list.handle, `entryItem`).mockReturnValue();
    wrapper.findByTestId(`ListPlus`).trigger(`click`);
    expect(entryItemMock).toBeCalledTimes(1);
    expect(entryItemMock).toBeCalledWith();
    wrapper.findByTestId(`ListLeft`).trigger(`click`);
    expect(routerBackMock).toBeCalledTimes(1);
    expect(routerBackMock).toBeCalledWith();
  });
  it(`contents`, ({ wrapper }) => {
    const routerBackMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    const editItemMock = vi.spyOn(list.handle, `editItem`).mockReturnValue();
    const copyItemMock = vi.spyOn(list.handle, `copyItem`).mockReturnValue();
    const deleteItemMock = vi.spyOn(list.handle, `deleteItem`).mockReturnValue();
    const dragInitMock = vi.spyOn(list.handle, `dragInit`).mockReturnValue();
    wrapper.findByTestId(`ListRoot`).trigger(`click`);
    expect(editItemMock).toBeCalledTimes(1);
    expect(editItemMock).toBeCalledWith();
    wrapper.findByTestIdAll(`ListItem`)[0]!.trigger(`longtouch`, { detail: { changedTouches: [{ clientY: 1 }] } });
    expect(editItemMock).toBeCalledTimes(2);
    expect(editItemMock).toBeCalledWith({ listId: `list1111111111111` });
    expect(dragInitMock).toBeCalledTimes(1);
    expect(dragInitMock).toBeCalledWith({ listId: `list1111111111111`, y: 1 });
    wrapper.findByTestIdAll(`ListItem`)[1]!.trigger(`longclick`, { detail: { clientY: 2 } });
    expect(editItemMock).toBeCalledTimes(3);
    expect(editItemMock).toBeCalledWith({ listId: `list0000000000000` });
    expect(dragInitMock).toBeCalledTimes(2);
    expect(dragInitMock).toBeCalledWith({ listId: `list0000000000000`, y: 2 });
    wrapper.findByTestIdAll(`ListItem`)[0]!.trigger(`click`);
    expect(routerBackMock).toBeCalledTimes(1);
    expect(routerBackMock).toBeCalledWith({ listId: `list1111111111111` });
    wrapper.findByTestIdAll(`ListClone`)[0]!.trigger(`click`);
    expect(copyItemMock).toBeCalledTimes(1);
    expect(copyItemMock).toBeCalledWith({ listId: `list1111111111111` });
    wrapper.findByTestIdAll(`ListTrash`)[0]!.trigger(`click`);
    expect(deleteItemMock).toBeCalledTimes(1);
    expect(deleteItemMock).toBeCalledWith({ listId: `list0000000000000` });
  });
});
