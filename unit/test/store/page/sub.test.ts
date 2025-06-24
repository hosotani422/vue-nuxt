import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import app from "@/store/page/app";
import main from "@/store/page/main";
import sub from "@/store/page/sub";
import date from "@/store/popup/date";
import time from "@/store/popup/time";
import dialog from "@/store/popup/dialog";
import notice from "@/store/popup/notice";
import fixture from "../../../fixture/base";

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
    const parseMock = vi.spyOn(JSON, `parse`).mockReturnValue({
      list1111111111111: {
        data: {
          main1111111111111: {
            sort: [`sub1111111111111`],
            data: { sub1111111111111: { check: false, title: `sub1` } },
          },
        },
      },
    });
    const setItemMock = vi.spyOn(localStorage, `setItem`).mockReturnValue();
    await sub.handle.init();
    expect(parseMock).toBeCalledTimes(1);
    expect(parseMock).toBeCalledWith(null);
    sub.state.data[`list1111111111111`]!.data[`main1111111111111`]!.data[`sub1111111111111`]!.title = `sub3`;
    expect(setItemMock).toBeCalledTimes(1);
    expect(setItemMock).toBeCalledWith(
      `sub`,
      JSON.stringify({
        list1111111111111: {
          data: {
            main1111111111111: {
              sort: [`sub1111111111111`],
              data: { sub1111111111111: { check: false, title: `sub1` } },
            },
          },
        },
      }),
    );
  });
  it(`toggleMode`, () => {
    sub.handle.toggleMode();
    expect(main.state.data[`list1111111111111`]!.data[`main1111111111111`]!.task).toBe(false);
    sub.handle.toggleMode();
    expect(main.state.data[`list1111111111111`]!.data[`main1111111111111`]!.task).toBe(true);
  });
  it(`convertItem`, () => {
    vi.setSystemTime(new Date(9465660000000));
    sub.handle.convertItem({ text: `memo1\nmemo2` });
    expect(sub.state.data[`list1111111111111`]!.data[`main1111111111111`]).toEqual({
      sort: [`sub9465660000000`, `sub9465660000001`],
      data: { sub9465660000000: { check: false, title: `memo1` }, sub9465660000001: { check: false, title: `memo2` } },
    });
  });
  it(`divideItem`, async () => {
    vi.setSystemTime(new Date(9465660000000));
    const focusMock = vi.fn();
    const elementMock = { focus: focusMock, selectionStart: 1, selectionEnd: 1 } as unknown as HTMLInputElement;
    const selectorMock = vi.spyOn(document, `querySelector`).mockReturnValue(elementMock);
    await sub.handle.divideItem({ subId: `sub1111111111111`, caret: 3 });
    expect(sub.state.data[`list1111111111111`]!.data[`main1111111111111`]).toEqual({
      sort: [`sub1111111111111`, `sub9465660000000`, `sub2222222222222`],
      data: {
        sub1111111111111: { check: false, title: `sub` },
        sub9465660000000: { check: false, title: `1` },
        sub2222222222222: { check: true, title: `sub2` },
      },
    });
    expect(selectorMock).toBeCalledTimes(1);
    expect(selectorMock).toBeCalledWith(`textarea[data-id='SubTasksub9465660000000']`);
    expect(focusMock).toBeCalledTimes(1);
    expect(focusMock).toBeCalledWith();
    expect(elementMock.selectionStart).toBe(0);
    expect(elementMock.selectionEnd).toBe(0);
  });
  it(`connectItem`, async () => {
    sub.state.status[`sub2222222222222`] = `edit`;
    const focusMock = vi.fn();
    const elementMock = { focus: focusMock, selectionStart: 1, selectionEnd: 1 } as unknown as HTMLInputElement;
    const selectorMock = vi.spyOn(document, `querySelector`).mockReturnValue(elementMock);
    await sub.handle.connectItem({ subId: `sub2222222222222` });
    expect(sub.state.data[`list1111111111111`]!.data[`main1111111111111`]).toEqual({
      sort: [`sub1111111111111`],
      data: { sub1111111111111: { check: false, title: `sub1sub2` } },
    });
    expect(sub.state.status[`sub2222222222222`]).toBeUndefined();
    expect(selectorMock).toBeCalledTimes(1);
    expect(selectorMock).toBeCalledWith(`textarea[data-id='SubTasksub1111111111111']`);
    expect(focusMock).toBeCalledTimes(1);
    expect(focusMock).toBeCalledWith();
    expect(elementMock.selectionStart).toBe(4);
    expect(elementMock.selectionEnd).toBe(4);
  });
  it(`deleteItem`, () => {
    sub.state.status[`sub2222222222222`] = `edit`;
    const openMock = vi.spyOn(notice.handle, `open`);
    const closeMock = vi.spyOn(notice.handle, `close`).mockReturnValue();
    sub.handle.deleteItem({ subId: `sub2222222222222` });
    expect(sub.state.data[`list1111111111111`]!.data[`main1111111111111`]).toEqual({
      sort: [`sub1111111111111`],
      data: { sub1111111111111: { check: false, title: `sub1` } },
    });
    expect(sub.state.status[`sub2222222222222`]).toBeUndefined();
    expect(openMock).toBeCalledTimes(1);
    expect(openMock.mock.calls[0]![0]!.message).toBe(`削除が完了しました`);
    expect(openMock.mock.calls[0]![0]!.button).toBe(`元に戻す`);
    notice.refer.callback();
    expect(sub.state.data[`list1111111111111`]!.data[`main1111111111111`]).toEqual({
      sort: [`sub1111111111111`, `sub2222222222222`],
      data: { sub1111111111111: { check: false, title: `sub1` }, sub2222222222222: { check: true, title: `sub2` } },
    });
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
  });
  it(`openDate`, () => {
    main.state.data[app.render.listId()]!.data[app.render.mainId()]!.date = `1999/12/31`;
    const openMock = vi.spyOn(date.handle, `open`);
    const closeMock = vi.spyOn(date.handle, `close`).mockReturnValue();
    sub.handle.openDate();
    expect(openMock).toBeCalledTimes(1);
    expect(openMock.mock.calls[0]![0]!.select).toBe(`1999/12/31`);
    expect(openMock.mock.calls[0]![0]!.cancel).toBe(`キャンセル`);
    expect(openMock.mock.calls[0]![0]!.clear).toBe(`クリア`);
    date.refer.callback(`2000/01/01`);
    expect(main.state.data[app.render.listId()]!.data[app.render.mainId()]!.date).toBe(`2000/01/01`);
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
  });
  it(`openTime`, () => {
    main.state.data[app.render.listId()]!.data[app.render.mainId()]!.time = `12:45`;
    const openMock = vi.spyOn(time.handle, `open`);
    const closeMock = vi.spyOn(time.handle, `close`).mockReturnValue();
    vi.spyOn(time.handle, `drawCanvas`).mockReturnValue();
    sub.handle.openTime();
    expect(openMock).toBeCalledTimes(1);
    expect(openMock.mock.calls[0]![0]!.time).toBe(`12:45`);
    expect(openMock.mock.calls[0]![0]!.cancel).toBe(`キャンセル`);
    expect(openMock.mock.calls[0]![0]!.clear).toBe(`クリア`);
    expect(openMock.mock.calls[0]![0]!.ok).toBe(`決定`);
    time.refer.callback({ hour: 23, minute: 59 });
    expect(main.state.data[app.render.listId()]!.data[app.render.mainId()]!.time).toBe(`23:59`);
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
  });
  it(`openAlarm`, () => {
    const openMock = vi.spyOn(dialog.handle, `open`);
    const closeMock = vi.spyOn(dialog.handle, `close`).mockReturnValue();
    sub.handle.openAlarm();
    expect(openMock).toBeCalledTimes(1);
    expect(openMock.mock.calls[0]![0]!.mode).toBe(`check`);
    expect(openMock.mock.calls[0]![0]!.title).toBe(`通知タイミングの選択`);
    expect(openMock.mock.calls[0]![0]!.message).toBe(``);
    expect(openMock.mock.calls[0]![0]!.check).toEqual({
      all: true,
      sort: [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`],
      data: {
        "1": { check: false, title: `時刻通り` },
        "2": { check: true, title: `5分前` },
        "3": { check: false, title: `10分前` },
        "4": { check: false, title: `15分前` },
        "5": { check: false, title: `30分前` },
        "6": { check: true, title: `1時間前` },
        "7": { check: false, title: `2時間前` },
        "8": { check: false, title: `3時間前` },
        "9": { check: false, title: `6時間前` },
        "10": { check: false, title: `12時間前` },
        "11": { check: false, title: `1日前` },
        "12": { check: false, title: `2日前` },
      },
    });
    expect(openMock.mock.calls[0]![0]!.ok).toBe(`決定`);
    expect(openMock.mock.calls[0]![0]!.cancel).toBe(`キャンセル`);
    dialog.state.check.data[`1`]!.check = true;
    dialog.refer.callback.cancel!();
    expect(main.state.data[app.render.listId()]!.data[app.render.mainId()]!.alarm).toEqual([`2`, `6`]);
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
    dialog.state.check.data[`1`]!.check = true;
    dialog.refer.callback.ok!();
    expect(main.state.data[app.render.listId()]!.data[app.render.mainId()]!.alarm).toEqual([`1`, `2`, `6`]);
    expect(closeMock).toBeCalledTimes(2);
    expect(closeMock).toBeCalledWith();
  });
  it(`dragInit`, () => {
    const selectorMock = vi.spyOn(document, `querySelector`).mockReturnValue({
      getBoundingClientRect: () => ({ top: 40, left: 60, height: 40, width: 120 }),
    } as HTMLElement);
    const vibrateMock = vi.fn();
    vi.stubGlobal(`navigator`, { vibrate: vibrateMock });
    sub.handle.dragInit({ subId: `sub1111111111111`, y: 0 });
    expect(selectorMock).toBeCalledTimes(2);
    expect(selectorMock).toBeCalledWith(`li[data-id='SubItemsub1111111111111']`);
    expect(selectorMock).toBeCalledWith(`div[aria-label='sub'] div`);
    expect(sub.refer.drag).toEqual({
      status: `start`,
      id: `sub1111111111111`,
      y: 0,
      top: 40,
      left: 0,
      height: 40,
      width: 120,
    });
    expect(sub.state.status[`sub1111111111111`]).toBe(`edit`);
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
    sub.handle.dragStart();
    expect(sub.refer.drag.status).toBe(`move`);
    expect(selectorMock).toBeCalledTimes(2);
    expect(selectorMock).toBeCalledWith(`li[data-id='SubItemsub1111111111111']`);
    expect(selectorMock).toBeCalledWith(`div[aria-label='sub'] main ul`);
    expect(cloneMock).toBeCalledTimes(1);
    expect(cloneMock).toBeCalledWith(true);
    expect(removeMock).toBeCalledTimes(1);
    expect(removeMock).toBeCalledWith(`data-id`);
    expect(appendMock).toBeCalledTimes(1);
    expect(appendMock.mock.calls[0]![0].style).toEqual({
      position: `absolute`,
      zIndex: `1`,
      top: `40px`,
      left: `0px`,
      height: `40px`,
      width: `120px`,
    });
    expect(sub.state.status[`sub1111111111111`]).toBe(`hide`);
  });
  it(`dragMove`, () => {
    const selectorMock = vi.spyOn(document, `querySelector`).mockImplementation(
      (id: string) =>
        ({
          getBoundingClientRect: () => {
            if (id === `li[data-id='SubItemsub1111111111111']`) {
              return { height: 40 };
            } else if (id === `li[data-id='SubItemsub2222222222222']`) {
              return { top: 80, height: 40 };
            } else if (id === `div[aria-label='sub'] main ul`) {
              return { top: 40, bottom: 160 };
            }
            return undefined;
          },
        }) as unknown as HTMLElement,
    );
    sub.refer.drag.clone!.getBoundingClientRect = () => ({ top: 80, height: 40 }) as DOMRect;
    sub.handle.dragMove({ y: 0 });
    expect(sub.refer.drag.clone!.style.top).toBe(`40px`);
    expect(selectorMock).toBeCalledTimes(4);
    expect(selectorMock).toBeCalledWith(`div[aria-label='sub'] main ul`);
    expect(selectorMock).toBeCalledWith(`li[data-id='SubItemundefined']`);
    expect(selectorMock).toBeCalledWith(`li[data-id='SubItemsub1111111111111']`);
    expect(selectorMock).toBeCalledWith(`li[data-id='SubItemsub2222222222222']`);
    expect(sub.state.data[app.render.listId()]!.data[app.render.mainId()]!.sort).toEqual([
      `sub2222222222222`,
      `sub1111111111111`,
    ]);
    sub.refer.drag.clone!.getBoundingClientRect = () => ({ top: 40, height: 40 }) as DOMRect;
    sub.handle.dragMove({ y: 0 });
    expect(sub.state.data[app.render.listId()]!.data[app.render.mainId()]!.sort).toEqual([
      `sub1111111111111`,
      `sub2222222222222`,
    ]);
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
    (sub.refer.drag.clone as unknown as { [K in string]: object }) = {
      classList: { remove: removeClassMock },
      animate: animateMock,
      remove: removeCloneMock,
      removeEventListener: removeListenerMock,
    };
    sub.handle.dragEnd();
    expect(removeClassMock).toBeCalledTimes(1);
    expect(removeClassMock).toBeCalledWith(`edit`);
    expect(animateMock).toBeCalledTimes(1);
    expect(animateMock).toBeCalledWith({ top: `40px` }, { duration: 250, easing: `ease-in-out` });
    expect(selectorMock).toBeCalledTimes(1);
    expect(selectorMock).toBeCalledWith(`li[data-id='SubItemsub1111111111111']`);
    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(removeListenerMock).toBeCalledTimes(1);
    expect(removeListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(removeCloneMock).toBeCalledTimes(1);
    expect(removeCloneMock).toBeCalledWith();
    expect(sub.state.status[`sub1111111111111`]).toBeUndefined();
    expect(sub.refer.drag).toEqual({});
  });
  it(`dragEnd - extra`, () => {
    sub.state.status[`sub1111111111111`] = `edit`;
    sub.refer.drag = { status: `start`, id: `sub1111111111111` };
    sub.handle.dragEnd();
    expect(sub.state.status[`sub1111111111111`]).toBeUndefined();
    expect(sub.refer.drag).toEqual({});
  });
  it(`swipeInit`, () => {
    const selectorMock = vi
      .spyOn(document, `querySelector`)
      .mockReturnValue({ getBoundingClientRect: () => ({ left: 0, width: 0 }) } as HTMLElement);
    sub.handle.swipeInit({ x: 0, y: 0 });
    expect(selectorMock).toBeCalledTimes(1);
    expect(selectorMock).toBeCalledWith(`div[aria-label='sub']`);
    expect(sub.refer.swipe.status).toBe(`start`);
    expect(sub.refer.swipe.x).toBe(0);
    expect(sub.refer.swipe.y).toBe(0);
    expect(sub.refer.swipe.right).toBe(0);
  });
  it(`swipeStart`, () => {
    sub.handle.swipeStart({ x: 0, y: 20 });
    expect(sub.refer.swipe).toEqual({});
    sub.refer.swipe = { status: `start`, x: 0, y: 0, right: 0 };
    sub.handle.swipeStart({ x: 20, y: 0 });
    expect(sub.refer.swipe.status).toBe(`move`);
  });
  it(`swipeMove`, () => {
    sub.refer.swipe.elem = { style: {} } as HTMLElement;
    sub.handle.swipeMove({ x: 100 });
    expect(sub.refer.swipe.elem.style.transform).toBe(`translateX(100px)`);
    sub.handle.swipeMove({ x: -100 });
    expect(sub.refer.swipe.elem.style.transform).toBe(`translateX(0px)`);
  });
  it(`swipeEnd`, () => {
    const addListenerMock = vi.fn((_: string, listener: () => void) => listener());
    const removeListenerMock = vi.fn((_: string) => _);
    const animateMock = vi.fn(() => ({ addEventListener: addListenerMock }));
    (sub.refer.swipe.elem as unknown as { [K in string]: object }).animate = animateMock;
    (sub.refer.swipe.elem as unknown as { [K in string]: object }).removeEventListener = removeListenerMock;
    sub.handle.swipeEnd({ x: 100 });
    expect(animateMock).toBeCalledTimes(1);
    expect(animateMock).toBeCalledWith({ transform: `translateX(0px)` }, { duration: 250, easing: `ease-in-out` });
    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(removeListenerMock).toBeCalledTimes(1);
    expect(removeListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(sub.refer.swipe).toEqual({});
  });
  it(`swipeEnd - extra`, () => {
    sub.refer.swipe = { status: `move`, x: 0, right: 0 };
    const routerMock = vi.spyOn(app.handle, `routerBack`).mockReturnValue();
    sub.handle.swipeEnd({ x: 200 });
    expect(routerMock).toBeCalledTimes(1);
    expect(routerMock).toBeCalledWith();
    expect(sub.refer.swipe).toEqual({});
    sub.refer.swipe = { status: `start` };
    sub.handle.swipeEnd({ x: 0 });
    expect(sub.refer.swipe).toEqual({});
  });
});

describe(`render`, () => {
  it(`classStatus`, () => {
    expect(sub.render.classStatus({ subId: `sub1111111111111` })).toEqual({
      edit: false,
      hide: false,
    });
  });
  it(`classLimit`, () => {
    vi.setSystemTime(new Date(1999, 11, 30, 0, 0, 0, 0));
    expect(sub.render.classLimit()).toEqual({
      "text-theme-care": false,
      "text-theme-warn": false,
    });
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0, 0));
    expect(sub.render.classLimit()).toEqual({
      "text-theme-care": true,
      "text-theme-warn": false,
    });
    vi.setSystemTime(new Date(2000, 1, 1, 0, 0, 0, 0));
    expect(sub.render.classLimit()).toEqual({
      "text-theme-care": true,
      "text-theme-warn": true,
    });
  });
  it(`textMemo`, () => {
    expect(sub.render.textMemo()).toEqual(`sub1\nsub2`);
  });
  it(`textAlarm`, () => {
    expect(sub.render.textAlarm()).toEqual(`5分前,1時間前`);
  });
});
