import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import app from "@/store/page/app";
import list from "@/store/page/list";
import main from "@/store/page/main";
import sub from "@/store/page/sub";
import dialog from "@/store/popup/dialog";
import notice from "@/store/popup/notice";
import fixture from "../../../fixture/base";
import IconList from "@/components/icon/list.vue";
import IconInbox from "@/components/icon/inbox.vue";
import IconTrash from "@/components/icon/trash.vue";

beforeEach(async () => {
  await fixture.init();
  await fixture.loadData();
  vi.stubGlobal(`process`, { client: true });
  vi.mock(`vue-router`, () => ({
    useRoute: () => ({
      params: { listId: `list1111111111111`, mainId: `main1111111111111` },
    }),
    useRouter: () => ({ push: () => {}, replace: () => {}, back: () => {} }),
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe(`handle`, () => {
  it(`init`, async () => {
    const parseMock = vi
      .spyOn(JSON, `parse`)
      .mockReturnValue({ sort: [`list1111111111111`], data: { list1111111111111: { title: `list1` } } });
    const setItemMock = vi.spyOn(localStorage, `setItem`).mockReturnValue();
    await list.handle.init();
    expect(parseMock).toBeCalledTimes(1);
    expect(parseMock).toBeCalledWith(null);
    list.state.data.data[`list1111111111111`]!.title = `list2`;
    expect(setItemMock).toBeCalledTimes(1);
    expect(setItemMock).toBeCalledWith(
      `list`,
      JSON.stringify({ sort: [`list1111111111111`], data: { list1111111111111: { title: `list1` } } }),
    );
  });
  it(`editItem`, () => {
    list.handle.editItem({ listId: `list1111111111111` });
    expect(list.state.status).toEqual({ list1111111111111: `edit` });
    list.handle.editItem();
    expect(list.state.status).toEqual({});
  });
  it(`entryItem`, () => {
    vi.setSystemTime(new Date(9465660000000));
    const openMock = vi.spyOn(dialog.handle, `open`);
    const closeMock = vi.spyOn(dialog.handle, `close`).mockReturnValue();
    list.handle.entryItem();
    expect(openMock).toBeCalledTimes(1);
    expect(openMock.mock.calls[0]![0]!.mode).toBe(`text`);
    expect(openMock.mock.calls[0]![0]!.title).toBe(`新規登録`);
    expect(openMock.mock.calls[0]![0]!.message).toBe(``);
    expect(openMock.mock.calls[0]![0]!.text!.value).toBe(``);
    expect(openMock.mock.calls[0]![0]!.text!.placeholder).toBe(`リスト`);
    expect(openMock.mock.calls[0]![0]!.text!.error).toBe(``);
    expect(openMock.mock.calls[0]![0]!.ok).toBe(`決定`);
    expect(openMock.mock.calls[0]![0]!.cancel).toBe(`キャンセル`);
    dialog.state.text!.value = `list2`;
    dialog.refer.callback.ok!();
    expect(list.state.data).toEqual({
      sort: [`list9465660000000`, `list1111111111111`, `list0000000000000`, `list9999999999999`],
      data: {
        list9465660000000: { title: `list2` },
        list1111111111111: { title: `list1` },
        list0000000000000: { title: `Inbox` },
        list9999999999999: { title: `Trash` },
      },
    });
    expect(main.state.data[`list9465660000000`]).toEqual({ sort: [], data: {} });
    expect(sub.state.data[`list9465660000000`]).toEqual({ data: {} });
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
    dialog.refer.callback.cancel!();
    expect(closeMock).toBeCalledTimes(2);
    expect(closeMock).toBeCalledWith();
  });
  it(`copyItem`, () => {
    vi.setSystemTime(new Date(9465660000000));
    list.handle.copyItem({ listId: `list1111111111111` });
    expect(list.state.data).toEqual({
      sort: [`list1111111111111`, `list9465660000000`, `list0000000000000`, `list9999999999999`],
      data: {
        list1111111111111: { title: `list1` },
        list9465660000000: { title: `list1` },
        list0000000000000: { title: `Inbox` },
        list9999999999999: { title: `Trash` },
      },
    });
    expect(main.state.data[`list9465660000000`]).toEqual({
      sort: [`main1111111111111`, `main2222222222222`],
      data: {
        main1111111111111: {
          check: false,
          title: `main1`,
          date: `2000/01/01`,
          time: `00:00`,
          alarm: [`2`, `6`],
          task: true,
        },
        main2222222222222: { check: true, title: `main2`, date: ``, time: ``, alarm: [], task: true },
      },
    });
    expect(sub.state.data[`list9465660000000`]).toEqual({
      data: {
        main1111111111111: {
          sort: [`sub1111111111111`, `sub2222222222222`],
          data: { sub1111111111111: { check: false, title: `sub1` }, sub2222222222222: { check: true, title: `sub2` } },
        },
        main2222222222222: { sort: [], data: {} },
      },
    });
    expect(list.state.status[`list1111111111111`]).toBeUndefined();
  });
  it(`deleteItem`, () => {
    const openDialogMock = vi.spyOn(dialog.handle, `open`);
    const closeDialogMock = vi.spyOn(dialog.handle, `close`).mockReturnValue();
    const openNoticeMock = vi.spyOn(notice.handle, `open`);
    const closeNoticeMock = vi.spyOn(notice.handle, `close`).mockReturnValue();
    list.handle.deleteItem({ listId: `list1111111111111` });
    expect(openDialogMock).toBeCalledTimes(1);
    expect(openDialogMock.mock.calls[0]![0]!.mode).toBe(`confirm`);
    expect(openDialogMock.mock.calls[0]![0]!.title).toBe(`データを削除します。\nよろしいですか？`);
    expect(openDialogMock.mock.calls[0]![0]!.message).toBe(``);
    expect(openDialogMock.mock.calls[0]![0]!.ok).toBe(`決定`);
    expect(openDialogMock.mock.calls[0]![0]!.cancel).toBe(`キャンセル`);
    dialog.refer.callback.ok!();
    expect(list.state.data).toEqual({
      sort: [`list0000000000000`, `list9999999999999`],
      data: {
        list0000000000000: { title: `Inbox` },
        list9999999999999: { title: `Trash` },
      },
    });
    expect(main.state.data).toEqual({
      list0000000000000: { sort: [], data: {} },
      list9999999999999: {
        sort: [`main1111111111111`, `main2222222222222`],
        data: {
          main1111111111111: {
            check: false,
            title: `main1`,
            date: `2000/01/01`,
            time: `00:00`,
            alarm: [`2`, `6`],
            task: true,
          },
          main2222222222222: { check: true, title: `main2`, date: ``, time: ``, alarm: [], task: true },
        },
      },
    });
    expect(sub.state.data).toEqual({
      list0000000000000: { data: {} },
      list9999999999999: {
        data: {
          main1111111111111: {
            sort: [`sub1111111111111`, `sub2222222222222`],
            data: {
              sub1111111111111: { check: false, title: `sub1` },
              sub2222222222222: { check: true, title: `sub2` },
            },
          },
          main2222222222222: { sort: [], data: {} },
        },
      },
    });
    expect(list.state.status).toEqual({});
    expect(closeDialogMock).toBeCalledTimes(1);
    expect(closeDialogMock).toBeCalledWith();
    expect(openNoticeMock).toBeCalledTimes(1);
    expect(openNoticeMock.mock.calls[0]![0]!.message).toBe(`削除が完了しました`);
    expect(openNoticeMock.mock.calls[0]![0]!.button).toBe(`元に戻す`);
    notice.refer.callback();
    expect(list.state.data).toEqual({
      sort: [`list1111111111111`, `list0000000000000`, `list9999999999999`],
      data: {
        list1111111111111: { title: `list1` },
        list0000000000000: { title: `Inbox` },
        list9999999999999: { title: `Trash` },
      },
    });
    expect(main.state.data).toEqual({
      list1111111111111: {
        sort: [`main1111111111111`, `main2222222222222`],
        data: {
          main1111111111111: {
            check: false,
            title: `main1`,
            date: `2000/01/01`,
            time: `00:00`,
            alarm: [`2`, `6`],
            task: true,
          },
          main2222222222222: { check: true, title: `main2`, date: ``, time: ``, alarm: [], task: true },
        },
      },
      list0000000000000: { sort: [], data: {} },
      list9999999999999: { sort: [], data: {} },
    });
    expect(sub.state.data).toEqual({
      list1111111111111: {
        data: {
          main1111111111111: {
            sort: [`sub1111111111111`, `sub2222222222222`],
            data: {
              sub1111111111111: { check: false, title: `sub1` },
              sub2222222222222: { check: true, title: `sub2` },
            },
          },
          main2222222222222: { sort: [], data: {} },
        },
      },
      list0000000000000: { data: {} },
      list9999999999999: { data: {} },
    });
    expect(closeNoticeMock).toBeCalledTimes(1);
    expect(closeNoticeMock).toBeCalledWith();
    dialog.refer.callback.cancel!();
    expect(list.state.status).toEqual({});
    expect(closeDialogMock).toBeCalledTimes(2);
    expect(closeDialogMock).toBeCalledWith();
  });
  it(`dragInit`, () => {
    const selectorMock = vi.spyOn(document, `querySelector`).mockReturnValue({
      getBoundingClientRect: () => ({ top: 40, left: 60, height: 40, width: 120 }),
    } as HTMLElement);
    const vibrateMock = vi.fn();
    vi.stubGlobal(`navigator`, { vibrate: vibrateMock });
    list.handle.dragInit({ listId: `list1111111111111`, y: 0 });
    expect(selectorMock).toBeCalledTimes(1);
    expect(selectorMock).toBeCalledWith(`li[data-id='ListItemlist1111111111111']`);
    expect(list.refer.drag).toEqual({
      status: `start`,
      id: `list1111111111111`,
      y: 0,
      top: 40,
      left: 60,
      height: 40,
      width: 120,
    });
    expect(vibrateMock).toBeCalledTimes(1);
    expect(vibrateMock).toBeCalledWith(40);
  });
  it(`dragStart`, () => {
    const removeMock = vi.fn();
    const cloneMock = vi.fn(() => ({ style: {}, removeAttribute: removeMock }));
    const appendMock = vi.fn();
    const selectorMock = vi
      .spyOn(document, `querySelector`)
      .mockReturnValue({ cloneNode: cloneMock, appendChild: appendMock } as unknown as HTMLElement);
    list.handle.dragStart();
    expect(list.refer.drag.status).toBe(`move`);
    expect(selectorMock).toBeCalledTimes(2);
    expect(selectorMock).toBeCalledWith(`li[data-id='ListItemlist1111111111111']`);
    expect(selectorMock).toBeCalledWith(`div[aria-label='list'] main ul`);
    expect(cloneMock).toBeCalledTimes(1);
    expect(cloneMock).toBeCalledWith(true);
    expect(appendMock).toBeCalledTimes(1);
    expect(appendMock.mock.calls[0]![0].style).toEqual({
      position: `absolute`,
      zIndex: `1`,
      top: `40px`,
      left: `60px`,
      height: `40px`,
      width: `120px`,
    });
    expect(list.state.status[`list1111111111111`]).toBe(`hide`);
  });
  it(`dragMove`, () => {
    const selectorMock = vi.spyOn(document, `querySelector`).mockImplementation(
      (id: string) =>
        ({
          getBoundingClientRect: () => {
            if (id === `li[data-id='ListItemlist1111111111111']`) {
              return { top: 40, height: 40, bottom: 80 };
            } else if (id === `li[data-id='ListItemlist0000000000000']`) {
              return { top: 80, height: 40, bottom: 120 };
            } else if (id === `li[data-id='ListItemlist9999999999999']`) {
              return { top: 120, height: 40, bottom: 160 };
            }
            return undefined;
          },
        }) as unknown as HTMLElement,
    );
    list.refer.drag.clone!.getBoundingClientRect = () => ({ top: 80, height: 40 }) as DOMRect;
    list.handle.dragMove({ y: 0 });
    expect(list.refer.drag.clone!.style.top).toBe(`40px`);
    expect(selectorMock).toBeCalledTimes(3);
    expect(selectorMock).toBeCalledWith(`li[data-id='ListItemundefined']`);
    expect(selectorMock).toBeCalledWith(`li[data-id='ListItemlist1111111111111']`);
    expect(selectorMock).toBeCalledWith(`li[data-id='ListItemlist0000000000000']`);
    expect(list.state.data.sort).toEqual([`list0000000000000`, `list1111111111111`, `list9999999999999`]);
    list.refer.drag.clone!.getBoundingClientRect = () => ({ top: 40, height: 40 }) as DOMRect;
    list.handle.dragMove({ y: 0 });
    expect(list.state.data.sort).toEqual([`list1111111111111`, `list0000000000000`, `list9999999999999`]);
  });
  it(`dragEnd`, () => {
    const selectorMock = vi
      .spyOn(document, `querySelector`)
      .mockReturnValue({ getBoundingClientRect: () => ({ top: 40 }) } as HTMLElement);
    const removeClassMock = vi.fn();
    const removeCloneMock = vi.fn();
    const addListenerMock = vi.fn((_: string, listener: () => void) => listener());
    const removeListenerMock = vi.fn((_: string) => _);
    const animateMock = vi.fn(() => ({ addEventListener: addListenerMock }));
    (list.refer.drag.clone as unknown as { [K in string]: object }) = {
      classList: { remove: removeClassMock },
      animate: animateMock,
      remove: removeCloneMock,
      removeEventListener: removeListenerMock,
    };
    list.handle.dragEnd();
    expect(removeClassMock).toBeCalledTimes(1);
    expect(removeClassMock).toBeCalledWith(`edit`);
    expect(animateMock).toBeCalledTimes(1);
    expect(animateMock).toBeCalledWith({ top: `40px` }, { duration: 250, easing: `ease-in-out` });
    expect(selectorMock).toBeCalledTimes(1);
    expect(selectorMock).toBeCalledWith(`li[data-id='ListItemlist1111111111111']`);
    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(removeListenerMock).toBeCalledTimes(1);
    expect(removeListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(removeCloneMock).toBeCalledTimes(1);
    expect(removeCloneMock).toBeCalledWith();
    expect(list.state.status[`list1111111111111`]).toBeUndefined();
    expect(list.refer.drag).toEqual({});
  });
  it(`dragEnd - extra`, () => {
    list.refer.drag = { status: `start` };
    list.handle.dragEnd();
    expect(list.refer.drag).toEqual({});
  });
  it(`swipeInit`, () => {
    const selectorMock = vi
      .spyOn(document, `querySelector`)
      .mockReturnValue({ getBoundingClientRect: () => ({ left: 0 }) } as HTMLElement);
    list.handle.swipeInit({ x: 0, y: 0 });
    expect(selectorMock).toBeCalledTimes(1);
    expect(selectorMock).toBeCalledWith(`div[aria-label='list']`);
    expect(list.refer.swipe.status).toBe(`start`);
    expect(list.refer.swipe.x).toBe(0);
    expect(list.refer.swipe.y).toBe(0);
    expect(list.refer.swipe.left).toBe(0);
  });
  it(`swipeStart`, () => {
    list.handle.swipeStart({ x: 0, y: 20 });
    expect(list.refer.swipe).toEqual({});
    list.refer.swipe = { status: `start`, x: 0, y: 0, left: 0 };
    list.handle.swipeStart({ x: 20, y: 0 });
    expect(list.refer.swipe.status).toBe(`move`);
  });
  it(`swipeMove`, () => {
    list.refer.swipe.elem = { style: {} } as HTMLElement;
    list.handle.swipeMove({ x: -100 });
    expect(list.refer.swipe.elem!.style.transform).toBe(`translateX(-100px)`);
    list.handle.swipeMove({ x: 100 });
    expect(list.refer.swipe.elem!.style.transform).toBe(`translateX(0px)`);
  });
  it(`swipeEnd`, () => {
    const addListenerMock = vi.fn((_: string, listener: () => void) => listener());
    const removeListenerMock = vi.fn((_: string) => _);
    const animateMock = vi.fn(() => ({ addEventListener: addListenerMock }));
    (list.refer.swipe.elem as unknown as { [K in string]: object }).animate = animateMock;
    (list.refer.swipe.elem as unknown as { [K in string]: object }).removeEventListener = removeListenerMock;
    list.handle.swipeEnd({ x: 100 });
    expect(animateMock).toBeCalledTimes(1);
    expect(animateMock).toBeCalledWith({ transform: `translateX(0px)` }, { duration: 250, easing: `ease-in-out` });
    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(removeListenerMock).toBeCalledTimes(1);
    expect(removeListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(list.refer.swipe).toEqual({});
  });
  it(`swipeEnd - extra`, () => {
    list.refer.swipe = { status: `move`, x: 0, left: 0 };
    const routerMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    list.handle.swipeEnd({ x: -200 });
    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith();
    expect(list.refer.swipe).toEqual({});
    list.refer.swipe = { status: `start` };
    list.handle.swipeEnd({ x: 0 });
    expect(list.refer.swipe).toEqual({});
  });
});

describe(`render`, () => {
  it(`classStatus`, () => {
    expect(list.render.classStatus({ listId: `list1111111111111` })).toEqual({
      select: true,
      edit: false,
      hide: false,
    });
    expect(list.render.classStatus({ listId: `list0000000000000` })).toEqual({
      select: false,
      edit: false,
      hide: false,
    });
  });
  it(`classLimit`, () => {
    vi.setSystemTime(new Date(1999, 11, 30, 0, 0, 0, 0));
    expect(list.render.classLimit({ listId: `list1111111111111` })).toEqual({
      "text-theme-care": false,
      "text-theme-warn": false,
    });
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0, 0));
    expect(list.render.classLimit({ listId: `list1111111111111` })).toEqual({
      "text-theme-care": true,
      "text-theme-warn": false,
    });
    vi.setSystemTime(new Date(2000, 1, 1, 0, 0, 0, 0));
    expect(list.render.classLimit({ listId: `list1111111111111` })).toEqual({
      "text-theme-care": true,
      "text-theme-warn": true,
    });
  });
  it(`typeIcon`, () => {
    expect(list.render.typeIcon({ listId: `list1111111111111` })).toBe(IconList);
    expect(list.render.typeIcon({ listId: `list0000000000000` })).toBe(IconInbox);
    expect(list.render.typeIcon({ listId: `list9999999999999` })).toBe(IconTrash);
  });
  it(`textCount`, () => {
    expect(list.render.textCount({ listId: `list1111111111111` })).toBe(`1/2`);
    expect(list.render.textCount({ listId: `list0000000000000` })).toBe(`0/0`);
    expect(list.render.textCount({ listId: `list9999999999999` })).toBe(`0/0`);
  });
});
