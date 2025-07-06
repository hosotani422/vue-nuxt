import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import fixture from "../../../fixture/page/main";
import app from "@/store/page/app";
import main from "@/store/page/main";

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
    expect(wrapper.findAll(`header svg[aria-label='list']`)).toHaveLength(1);
    expect(wrapper.findAll(`header svg[aria-label='conf']`)).toHaveLength(1);
    expect(wrapper.findAll(`header svg[aria-label='plus']`)).toHaveLength(1);
    expect(wrapper.findAll(`header input`)).toHaveLength(1);
    expect(wrapper.find<HTMLInputElement>(`header input`).element.value).toBe(`list1`);
    expect(wrapper.find(`header input`).attributes(`placeholder`)).toBe(`リスト`);
  });
  it(`contents`, ({ wrapper }) => {
    expect(wrapper.findAll(`main li`)).toHaveLength(2);
    expect(wrapper.findAll(`main li`)[0]!.classes()).toContain(`select`);
    expect(wrapper.findAll(`main li`)[0]!.classes()).not.toContain(`edit`);
    expect(wrapper.findAll(`main li`)[0]!.classes()).not.toContain(`hide`);
    expect(wrapper.findAll(`main li`)[1]!.classes()).not.toContain(`select`);
    expect(wrapper.findAll(`main li`)[1]!.classes()).toContain(`edit`);
    expect(wrapper.findAll(`main li`)[1]!.classes()).toContain(`hide`);
    expect(wrapper.findAll(`main input`)).toHaveLength(2);
    expect(wrapper.findAll<HTMLInputElement>(`main input`)[0]!.element.checked).toBe(false);
    expect(wrapper.findAll<HTMLInputElement>(`main input`)[1]!.element.checked).toBe(true);
    expect(wrapper.findAll(`main h3`)).toHaveLength(2);
    expect(wrapper.findAll(`main h3`)[0]!.text()).toBe(`main1`);
    expect(wrapper.findAll(`main h3`)[1]!.text()).toBe(`main2`);
    expect(wrapper.findAll(`main p`)).toHaveLength(2);
    expect(wrapper.findAll(`main p`)[0]!.text()).toBe(`1/1`);
    expect(wrapper.findAll(`main p`)[1]!.text()).toBe(`1/2`);
    expect(wrapper.findAll(`main svg[aria-label='clone']`)).toHaveLength(2);
    expect(wrapper.findAll(`main svg[aria-label='move']`)).toHaveLength(2);
    expect(wrapper.findAll(`main svg[aria-label='trash']`)).toHaveLength(2);
  });
});

describe(`event`, () => {
  it(`root`, ({ wrapper }) => {
    const dragStartMock = vi.spyOn(main.handle, `dragStart`).mockReturnValue();
    const dragMoveMock = vi.spyOn(main.handle, `dragMove`).mockReturnValue();
    const dragEndMock = vi.spyOn(main.handle, `dragEnd`).mockReturnValue();
    wrapper.find(`div[aria-label='main']`).trigger(`touchmove`, { changedTouches: [{ clientY: 1 }] });
    expect(dragStartMock).toBeCalledTimes(1);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(1);
    expect(dragMoveMock).toBeCalledWith({ y: 1 });
    wrapper.find(`div[aria-label='main']`).trigger(`mousemove`, { clientY: 2 });
    expect(dragStartMock).toBeCalledTimes(2);
    expect(dragStartMock).toBeCalledWith();
    expect(dragMoveMock).toBeCalledTimes(2);
    expect(dragMoveMock).toBeCalledWith({ y: 2 });
    wrapper.find(`div[aria-label='main']`).trigger(`touchend`);
    expect(dragEndMock).toBeCalledTimes(1);
    expect(dragEndMock).toBeCalledWith();
    wrapper.find(`div[aria-label='main']`).trigger(`mouseup`);
    expect(dragEndMock).toBeCalledTimes(2);
    expect(dragEndMock).toBeCalledWith();
  });
  it(`header`, ({ wrapper }) => {
    const routerListMock = vi.spyOn(app.handle, `routerList`).mockReturnValue();
    const routerConfMock = vi.spyOn(app.handle, `routerConf`).mockReturnValue();
    const entryItemMock = vi.spyOn(main.handle, `entryItem`).mockReturnValue();
    wrapper.find(`header svg[aria-label='list']`).trigger(`click`);
    expect(routerListMock).toBeCalledTimes(1);
    expect(routerListMock).toBeCalledWith();
    wrapper.find(`header svg[aria-label='conf']`).trigger(`click`);
    expect(routerConfMock).toBeCalledTimes(1);
    expect(routerConfMock).toBeCalledWith();
    wrapper.find(`header svg[aria-label='plus']`).trigger(`click`);
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
    wrapper.find(`div[aria-label='main']`).trigger(`click`);
    expect(editItemMock).toBeCalledTimes(1);
    expect(editItemMock).toBeCalledWith();
    wrapper.findAll(`main li`)[0]!.trigger(`longtouch`, { detail: { changedTouches: [{ clientY: 1 }] } });
    expect(editItemMock).toBeCalledTimes(2);
    expect(editItemMock).toBeCalledWith({ mainId: `main1111111111111` });
    expect(dragInitMock).toBeCalledTimes(1);
    expect(dragInitMock).toBeCalledWith({ mainId: `main1111111111111`, y: 1 });
    wrapper.findAll(`main li`)[1]!.trigger(`longclick`, { detail: { clientY: 2 } });
    expect(editItemMock).toBeCalledTimes(3);
    expect(editItemMock).toBeCalledWith({ mainId: `main2222222222222` });
    expect(dragInitMock).toBeCalledTimes(2);
    expect(dragInitMock).toBeCalledWith({ mainId: `main2222222222222`, y: 2 });
    wrapper.findAll(`main li`)[0]!.trigger(`click`);
    expect(routerSubMock).toBeCalledTimes(1);
    expect(routerSubMock).toBeCalledWith({ mainId: `main1111111111111` });
    wrapper.find(`main svg[aria-label='clone']`).trigger(`click`);
    expect(copyItemMock).toBeCalledTimes(1);
    expect(copyItemMock).toBeCalledWith({ mainId: `main1111111111111` });
    wrapper.find(`main svg[aria-label='move']`).trigger(`click`);
    expect(moveItemMock).toBeCalledTimes(1);
    expect(moveItemMock).toBeCalledWith({ mainId: `main1111111111111` });
    wrapper.find(`main svg[aria-label='trash']`).trigger(`click`);
    expect(deleteItemMock).toBeCalledTimes(1);
    expect(deleteItemMock).toBeCalledWith({ mainId: `main1111111111111` });
  });
});
