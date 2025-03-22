import { describe, test, expect } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import fixture from "../../../fixture/page/main";
import app from "@/store/page/app";
import main from "@/store/page/main";

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
    expect(wrapper.findByTestIdAll(`MainList`)).toHaveLength(1);
    expect(wrapper.findByTestIdAll(`MainTitle`)).toHaveLength(1);
    expect(wrapper.findByTestId<HTMLInputElement>(`MainTitle`).element.value).toBe(`list1`);
    expect(wrapper.findByTestId(`MainTitle`).attributes(`placeholder`)).toBe(`リスト`);
    expect(wrapper.findByTestIdAll(`MainConf`)).toHaveLength(1);
    expect(wrapper.findByTestIdAll(`MainPlus`)).toHaveLength(1);
  });
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findByTestIdAll(`MainItem`)).toHaveLength(2);
    expect(wrapper.findByTestIdAll(`MainItem`)[0]!.classes()).toContain(`select`);
    expect(wrapper.findByTestIdAll(`MainItem`)[0]!.classes()).not.toContain(`edit`);
    expect(wrapper.findByTestIdAll(`MainItem`)[0]!.classes()).not.toContain(`hide`);
    expect(wrapper.findByTestIdAll(`MainItem`)[1]!.classes()).not.toContain(`select`);
    expect(wrapper.findByTestIdAll(`MainItem`)[1]!.classes()).toContain(`edit`);
    expect(wrapper.findByTestIdAll(`MainItem`)[1]!.classes()).toContain(`hide`);
    expect(wrapper.findByTestIdAll(`MainCheck`)).toHaveLength(2);
    expect(wrapper.findByTestIdAll<HTMLInputElement>(`MainCheck`)[0]!.element.checked).toBe(false);
    expect(wrapper.findByTestIdAll<HTMLInputElement>(`MainCheck`)[1]!.element.checked).toBe(true);
    expect(wrapper.findByTestIdAll(`MainTask`)).toHaveLength(2);
    expect(wrapper.findByTestIdAll(`MainTask`)[0]!.text()).toBe(`main1`);
    expect(wrapper.findByTestIdAll(`MainTask`)[1]!.text()).toBe(`main2`);
    expect(wrapper.findByTestIdAll(`MainCount`)).toHaveLength(2);
    expect(wrapper.findByTestIdAll(`MainCount`)[0]!.text()).toBe(`1/1`);
    expect(wrapper.findByTestIdAll(`MainCount`)[1]!.text()).toBe(`1/2`);
    expect(wrapper.findByTestIdAll(`MainClone`)).toHaveLength(2);
    expect(wrapper.findByTestIdAll(`MainMove`)).toHaveLength(2);
    expect(wrapper.findByTestIdAll(`MainTrash`)).toHaveLength(2);
  });
});

describe(`event`, () => {
  it(`root`, ({ wrapper }) => {
    const dragStartMock = vi.spyOn(main.handle, `dragStart`).mockReturnValue();
    const dragMoveMock = vi.spyOn(main.handle, `dragMove`).mockReturnValue();
    const dragEndMock = vi.spyOn(main.handle, `dragEnd`).mockReturnValue();
    wrapper.findByTestId(`MainRoot`).trigger(`touchmove`, { changedTouches: [{ clientY: 1 }] });
    expect(dragStartMock).toBeCalledTimes(1);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(1);
    expect(dragMoveMock).toBeCalledWith({ y: 1 });
    wrapper.findByTestId(`MainRoot`).trigger(`mousemove`, { clientY: 2 });
    expect(dragStartMock).toBeCalledTimes(2);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(2);
    expect(dragMoveMock).toBeCalledWith({ y: 2 });
    wrapper.findByTestId(`MainRoot`).trigger(`touchend`);
    expect(dragEndMock).toBeCalledTimes(1);
    expect(dragEndMock).toBeCalledWith();
    wrapper.findByTestId(`MainRoot`).trigger(`mouseup`);
    expect(dragEndMock).toBeCalledTimes(2);
    expect(dragEndMock).toBeCalledWith();
  });
  it(`header`, ({ wrapper }) => {
    const routerListMock = vi.spyOn(app.handle, `routerList`).mockReturnValue();
    const routerConfMock = vi.spyOn(app.handle, `routerConf`).mockReturnValue();
    const entryItemMock = vi.spyOn(main.handle, `entryItem`).mockReturnValue();
    wrapper.findByTestId(`MainList`).trigger(`click`);
    expect(routerListMock).toBeCalledTimes(1);
    expect(routerListMock).toBeCalledWith();
    wrapper.findByTestId(`MainConf`).trigger(`click`);
    expect(routerConfMock).toBeCalledTimes(1);
    expect(routerConfMock).toBeCalledWith();
    wrapper.findByTestId(`MainPlus`).trigger(`click`);
    expect(entryItemMock).toBeCalledTimes(1);
    expect(entryItemMock).toBeCalledWith();
  });
  it(`contents`, ({ wrapper }) => {
    const routerSubMock = vi.spyOn(app.handle, `routerSub`).mockReturnValue();
    const editItemMock = vi.spyOn(main.handle, `editItem`).mockReturnValue();
    const dragInitMock = vi.spyOn(main.handle, `dragInit`).mockReturnValue();
    const copyItemMock = vi.spyOn(main.handle, `copyItem`).mockReturnValue();
    const moveItemMock = vi.spyOn(main.handle, `moveItem`).mockReturnValue();
    const deleteItemMock = vi.spyOn(main.handle, `deleteItem`).mockReturnValue();
    wrapper.findByTestId(`MainRoot`).trigger(`click`);
    expect(editItemMock).toBeCalledTimes(1);
    expect(editItemMock).toBeCalledWith();
    wrapper.findByTestIdAll(`MainItem`)[0]!.trigger(`longtouch`, { detail: { changedTouches: [{ clientY: 1 }] } });
    expect(editItemMock).toBeCalledTimes(2);
    expect(editItemMock).toBeCalledWith({ mainId: `main1111111111111` });
    expect(dragInitMock).toBeCalledTimes(1);
    expect(dragInitMock).toBeCalledWith({ mainId: `main1111111111111`, y: 1 });
    wrapper.findByTestIdAll(`MainItem`)[1]!.trigger(`longclick`, { detail: { clientY: 2 } });
    expect(editItemMock).toBeCalledTimes(3);
    expect(editItemMock).toBeCalledWith({ mainId: `main2222222222222` });
    expect(dragInitMock).toBeCalledTimes(2);
    expect(dragInitMock).toBeCalledWith({ mainId: `main2222222222222`, y: 2 });
    wrapper.findByTestIdAll(`MainItem`)[0]!.trigger(`click`);
    expect(routerSubMock).toBeCalledTimes(1);
    expect(routerSubMock).toBeCalledWith({ mainId: `main1111111111111` });
    wrapper.findByTestId(`MainClone`).trigger(`click`);
    expect(copyItemMock).toBeCalledTimes(1);
    expect(copyItemMock).toBeCalledWith({ mainId: `main1111111111111` });
    wrapper.findByTestId(`MainMove`).trigger(`click`);
    expect(moveItemMock).toBeCalledTimes(1);
    expect(moveItemMock).toBeCalledWith({ mainId: `main1111111111111` });
    wrapper.findByTestId(`MainTrash`).trigger(`click`);
    expect(deleteItemMock).toBeCalledTimes(1);
    expect(deleteItemMock).toBeCalledWith({ mainId: `main1111111111111` });
  });
});
