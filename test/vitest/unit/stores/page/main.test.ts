import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import Api from "@/api/api";
import app from "@/stores/page/app";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import dialog from "@/stores/popup/dialog";
import notice from "@/stores/popup/notice";
import fixture from "../../../fixture/base";

beforeEach(async () => {
  await fixture.init();
  await fixture.loadData();
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
    const readMock = vi.spyOn(Api, `readMain`).mockResolvedValue({
      list1111111111111: {
        sort: [`main1111111111111`],
        data: {
          main1111111111111: {
            check: false,
            title: `main1`,
            date: `2000/01/01`,
            time: `00:00`,
            alarm: [`2`, `6`],
            task: true,
          },
        },
      },
    });
    const writeMock = vi.spyOn(Api, `writeMain`).mockReturnValue();
    await main.handle.init();
    expect(readMock).toBeCalledTimes(1);
    expect(readMock).toBeCalledWith();
    main.state.data[`list1111111111111`]!.data[`main1111111111111`]!.title = `main2`;
    expect(writeMock).toBeCalledTimes(1);
    expect(writeMock).toBeCalledWith({
      list1111111111111: {
        sort: [`main1111111111111`],
        data: {
          main1111111111111: {
            check: false,
            title: `main2`,
            date: `2000/01/01`,
            time: `00:00`,
            alarm: [`2`, `6`],
            task: true,
          },
        },
      },
    });
  });
  it(`editItem`, () => {
    main.handle.editItem({ mainId: `main2222222222222` });
    expect(main.state.status).toEqual({ main2222222222222: `edit` });
    main.handle.editItem();
    expect(main.state.status).toEqual({});
  });
  it(`entryItem`, () => {
    vi.setSystemTime(new Date(9465660000000));
    const openMock = vi.spyOn(dialog.handle, `open`);
    const closeMock = vi.spyOn(dialog.handle, `close`).mockReturnValue();
    main.handle.entryItem();
    expect(openMock).toBeCalledTimes(1);
    expect(openMock.mock.calls[0]![0]!.mode).toBe(`text`);
    expect(openMock.mock.calls[0]![0]!.title).toBe(`新規登録`);
    expect(openMock.mock.calls[0]![0]!.message).toBe(``);
    expect(openMock.mock.calls[0]![0]!.text!.value).toBe(``);
    expect(openMock.mock.calls[0]![0]!.text!.placeholder).toBe(`タスク`);
    expect(openMock.mock.calls[0]![0]!.text!.error).toBe(``);
    expect(openMock.mock.calls[0]![0]!.ok).toBe(`決定`);
    expect(openMock.mock.calls[0]![0]!.cancel).toBe(`キャンセル`);
    dialog.state.text!.value = `main3`;
    dialog.refer.callback.ok!();
    expect(main.state.data[`list1111111111111`]).toEqual({
      sort: [`main9465660000000`, `main1111111111111`, `main2222222222222`],
      data: {
        main9465660000000: { check: false, title: `main3`, date: ``, time: ``, alarm: [], task: true },
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
    expect(sub.state.data[`list1111111111111`]!.data[`main9465660000000`]).toEqual({
      sort: [`sub9465660000000`],
      data: { sub9465660000000: { check: false, title: `` } },
    });
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
    dialog.refer.callback.cancel!();
    expect(closeMock).toBeCalledTimes(2);
    expect(closeMock).toBeCalledWith();
  });
  it(`copyItem`, () => {
    vi.setSystemTime(new Date(9465660000000));
    main.handle.copyItem({ mainId: `main1111111111111` });
    expect(main.state.data[`list1111111111111`]).toEqual({
      sort: [`main1111111111111`, `main9465660000000`, `main2222222222222`],
      data: {
        main1111111111111: {
          check: false,
          title: `main1`,
          date: `2000/01/01`,
          time: `00:00`,
          alarm: [`2`, `6`],
          task: true,
        },
        main9465660000000: {
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
    expect(sub.state.data[`list1111111111111`]!.data[`main9465660000000`]).toEqual({
      sort: [`sub1111111111111`, `sub2222222222222`],
      data: { sub1111111111111: { check: false, title: `sub1` }, sub2222222222222: { check: true, title: `sub2` } },
    });
    expect(main.state.status[`main1111111111111`]).toBeUndefined();
  });
  it(`moveItem`, () => {
    const openMock = vi.spyOn(dialog.handle, `open`);
    const closeMock = vi.spyOn(dialog.handle, `close`).mockReturnValue();
    main.handle.moveItem({ mainId: `main2222222222222` });
    expect(openMock).toBeCalledTimes(1);
    expect(openMock.mock.calls[0]![0]!.mode).toBe(`radio`);
    expect(openMock.mock.calls[0]![0]!.title).toBe(`移動先の選択`);
    expect(openMock.mock.calls[0]![0]!.message).toBe(``);
    expect(openMock.mock.calls[0]![0]!.radio!.none).toBe(false);
    expect(openMock.mock.calls[0]![0]!.radio!.select).toBe(``);
    expect(openMock.mock.calls[0]![0]!.radio!.sort).toEqual([`list0000000000000`, `list9999999999999`]);
    expect(openMock.mock.calls[0]![0]!.radio!.data).toEqual({
      list1111111111111: { title: `list1` },
      list0000000000000: { title: `Inbox` },
      list9999999999999: { title: `Trash` },
    });
    expect(openMock.mock.calls[0]![0]!.ok).toBe(`決定`);
    expect(openMock.mock.calls[0]![0]!.cancel).toBe(`キャンセル`);
    dialog.state.radio.select = `list0000000000000`;
    dialog.refer.callback.ok!();
    expect(main.state.data).toEqual({
      list1111111111111: {
        sort: [`main1111111111111`],
        data: {
          main1111111111111: {
            check: false,
            title: `main1`,
            date: `2000/01/01`,
            time: `00:00`,
            alarm: [`2`, `6`],
            task: true,
          },
        },
      },
      list0000000000000: {
        sort: [`main2222222222222`],
        data: {
          main2222222222222: { check: true, title: `main2`, date: ``, time: ``, alarm: [], task: true },
        },
      },
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
        },
      },
      list0000000000000: { data: { main2222222222222: { sort: [], data: {} } } },
      list9999999999999: { data: {} },
    });
    expect(main.state.status[`main2222222222222`]).toBeUndefined();
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
    dialog.refer.callback.cancel!();
    expect(main.state.status[`main2222222222222`]).toBeUndefined();
    expect(closeMock).toBeCalledTimes(2);
    expect(closeMock).toBeCalledWith();
  });
  it(`deleteItem`, () => {
    const openMock = vi.spyOn(notice.handle, `open`);
    const closeMock = vi.spyOn(notice.handle, `close`).mockReturnValue();
    main.handle.deleteItem({ mainId: `main2222222222222` });
    expect(main.state.data).toEqual({
      list1111111111111: {
        sort: [`main1111111111111`],
        data: {
          main1111111111111: {
            check: false,
            title: `main1`,
            date: `2000/01/01`,
            time: `00:00`,
            alarm: [`2`, `6`],
            task: true,
          },
        },
      },
      list0000000000000: { sort: [], data: {} },
      list9999999999999: {
        sort: [`main2222222222222`],
        data: {
          main2222222222222: { check: true, title: `main2`, date: ``, time: ``, alarm: [], task: true },
        },
      },
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
        },
      },
      list0000000000000: { data: {} },
      list9999999999999: { data: { main2222222222222: { sort: [], data: {} } } },
    });
    expect(main.state.status[`main2222222222222`]).toBeUndefined();
    expect(openMock).toBeCalledTimes(1);
    expect(openMock.mock.calls[0]![0]!.message).toBe(`削除が完了しました`);
    expect(openMock.mock.calls[0]![0]!.button).toBe(`元に戻す`);
    notice.refer.callback();
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
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
  });
  it(`dragInit`, () => {
    const getByIdMock = vi.spyOn(app.refer, `getById`).mockReturnValue({
      getBoundingClientRect: () => ({ top: 40, left: 60, height: 40, width: 120 }),
    } as HTMLElement);
    const vibrateMock = vi.fn();
    vi.stubGlobal(`navigator`, { vibrate: vibrateMock });
    main.handle.dragInit({ mainId: `main1111111111111`, y: 0 });
    expect(getByIdMock).toBeCalledTimes(1);
    expect(getByIdMock).toBeCalledWith(`MainItemmain1111111111111`);
    expect(main.refer.drag).toEqual({
      status: `start`,
      id: `main1111111111111`,
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
    const getByIdMock = vi
      .spyOn(app.refer, `getById`)
      .mockReturnValue({ cloneNode: cloneMock, appendChild: appendMock } as unknown as HTMLElement);
    main.handle.dragStart();
    expect(main.refer.drag.status).toBe(`move`);
    expect(getByIdMock).toBeCalledTimes(2);
    expect(getByIdMock).toBeCalledWith(`MainItemmain1111111111111`);
    expect(getByIdMock).toBeCalledWith(`MainBody`);
    expect(cloneMock).toBeCalledTimes(1);
    expect(cloneMock).toBeCalledWith(true);
    expect(removeMock).toBeCalledTimes(1);
    expect(removeMock).toBeCalledWith(`data-id`);
    expect(appendMock).toBeCalledTimes(1);
    expect(appendMock.mock.calls[0]![0].style).toEqual({
      position: `absolute`,
      zIndex: `1`,
      top: `40px`,
      left: `60px`,
      height: `40px`,
      width: `120px`,
    });
    expect(main.state.status[`main1111111111111`]).toBe(`hide`);
  });
  it(`dragMove`, () => {
    const getByIdMock = vi.spyOn(app.refer, `getById`).mockImplementation(
      (id: string) =>
        ({
          getBoundingClientRect: () => {
            if (id === `MainItemmain1111111111111`) {
              return { top: 40, height: 40, bottom: 80 };
            } else if (id === `MainItemmain2222222222222`) {
              return { top: 80, height: 40, bottom: 120 };
            }
            return undefined;
          },
        }) as unknown as HTMLElement,
    );
    main.refer.drag.clone!.getBoundingClientRect = () => ({ top: 80, height: 40 }) as DOMRect;
    main.handle.dragMove({ y: 0 });
    expect(main.refer.drag.clone!.style.top).toBe(`40px`);
    expect(getByIdMock).toBeCalledTimes(3);
    expect(getByIdMock).toBeCalledWith(`MainItemundefined`);
    expect(getByIdMock).toBeCalledWith(`MainItemmain1111111111111`);
    expect(getByIdMock).toBeCalledWith(`MainItemmain2222222222222`);
    expect(main.state.data[`list1111111111111`]!.sort).toEqual([`main2222222222222`, `main1111111111111`]);
    main.refer.drag.clone!.getBoundingClientRect = () => ({ top: 0, height: 40 }) as DOMRect;
    main.handle.dragMove({ y: 0 });
    expect(main.state.data[`list1111111111111`]!.sort).toEqual([`main1111111111111`, `main2222222222222`]);
  });
  it(`dragEnd`, () => {
    const getByIdMock = vi
      .spyOn(app.refer, `getById`)
      .mockReturnValue({ getBoundingClientRect: () => ({ top: 40 }) } as HTMLElement);
    const removeClassMock = vi.fn();
    const removeCloneMock = vi.fn();
    const addListenerMock = vi.fn((_: string, listener: () => void) => listener());
    const removeListenerMock = vi.fn((_: string) => _);
    const animateMock = vi.fn(() => ({ addEventListener: addListenerMock }));
    (main.refer.drag.clone as unknown as { [K in string]: object }) = {
      classList: { remove: removeClassMock },
      animate: animateMock,
      remove: removeCloneMock,
      removeEventListener: removeListenerMock,
    };
    main.handle.dragEnd();
    expect(removeClassMock).toBeCalledTimes(1);
    expect(removeClassMock).toBeCalledWith(`edit`);
    expect(animateMock).toBeCalledTimes(1);
    expect(animateMock).toBeCalledWith({ top: `40px` }, { duration: 250, easing: `ease-in-out` });
    expect(getByIdMock).toBeCalledTimes(1);
    expect(getByIdMock).toBeCalledWith(`MainItemmain1111111111111`);
    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(removeListenerMock).toBeCalledTimes(1);
    expect(removeListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(removeCloneMock).toBeCalledTimes(1);
    expect(removeCloneMock).toBeCalledWith();
    expect(main.state.status[`main1111111111111`]).toBeUndefined();
    expect(main.refer.drag).toEqual({});
  });
  it(`dragEnd - extra`, () => {
    main.refer.drag = { status: `start` };
    main.handle.dragEnd();
    expect(main.refer.drag).toEqual({});
  });
});

describe(`render`, () => {
  it(`classStatus`, () => {
    expect(main.render.classStatus({ mainId: `main1111111111111` })).toEqual(`select`);
    expect(main.render.classStatus({ mainId: `main2222222222222` })).toEqual(``);
  });
  it(`classLimit`, () => {
    vi.setSystemTime(new Date(1999, 11, 30, 0, 0, 0, 0));
    expect(main.render.classLimit({ mainId: `main1111111111111` })).toEqual(``);
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0, 0));
    expect(main.render.classLimit({ mainId: `main1111111111111` })).toEqual(`text-theme-care`);
    vi.setSystemTime(new Date(2000, 1, 1, 0, 0, 0, 0));
    expect(main.render.classLimit({ mainId: `main1111111111111` })).toEqual(`text-theme-care text-theme-warn`);
  });
  it(`textCount`, () => {
    expect(main.render.textCount({ mainId: `main1111111111111` })).toBe(`1/2`);
    expect(main.render.textCount({ mainId: `main2222222222222` })).toBe(`0/0`);
  });
});
