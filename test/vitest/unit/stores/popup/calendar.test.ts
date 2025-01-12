import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import app from "@/stores/page/app";
import calendar from "@/stores/popup/calendar";
import fixture from "../../../fixture/base";

beforeEach(async () => {
  await fixture.init();
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
  it(`open`, () => {
    calendar.handle.open({
      select: `1999/12/31`,
      cancel: `cancel`,
      clear: `clear`,
      callback: () => ``,
    });
    expect(calendar.state.open).toBe(true);
    expect(calendar.state.select).toBe(`1999/12/31`);
    expect(calendar.state.current).toBe(`1999/12`);
    expect(calendar.state.cancel).toBe(`cancel`);
    expect(calendar.state.clear).toBe(`clear`);
  });
  it(`close`, () => {
    calendar.handle.close();
    expect(calendar.state.open).toBe(false);
  });
  it(`getWeek`, () => {
    expect(calendar.handle.getWeek()).toEqual([`日`, `月`, `火`, `水`, `木`, `金`, `土`]);
  });
  it(`getDay`, () => {
    calendar.state.current = `1999/12`;
    expect(calendar.handle.getDay()[1]).toEqual({
      id: `1999/12`,
      day: [
        { id: `1999/11/28`, text: `28` },
        { id: `1999/11/29`, text: `29` },
        { id: `1999/11/30`, text: `30` },
        { id: `1999/12/01`, text: `1` },
        { id: `1999/12/02`, text: `2` },
        { id: `1999/12/03`, text: `3` },
        { id: `1999/12/04`, text: `4` },
        { id: `1999/12/05`, text: `5` },
        { id: `1999/12/06`, text: `6` },
        { id: `1999/12/07`, text: `7` },
        { id: `1999/12/08`, text: `8` },
        { id: `1999/12/09`, text: `9` },
        { id: `1999/12/10`, text: `10` },
        { id: `1999/12/11`, text: `11` },
        { id: `1999/12/12`, text: `12` },
        { id: `1999/12/13`, text: `13` },
        { id: `1999/12/14`, text: `14` },
        { id: `1999/12/15`, text: `15` },
        { id: `1999/12/16`, text: `16` },
        { id: `1999/12/17`, text: `17` },
        { id: `1999/12/18`, text: `18` },
        { id: `1999/12/19`, text: `19` },
        { id: `1999/12/20`, text: `20` },
        { id: `1999/12/21`, text: `21` },
        { id: `1999/12/22`, text: `22` },
        { id: `1999/12/23`, text: `23` },
        { id: `1999/12/24`, text: `24` },
        { id: `1999/12/25`, text: `25` },
        { id: `1999/12/26`, text: `26` },
        { id: `1999/12/27`, text: `27` },
        { id: `1999/12/28`, text: `28` },
        { id: `1999/12/29`, text: `29` },
        { id: `1999/12/30`, text: `30` },
        { id: `1999/12/31`, text: `31` },
      ],
    });
  });
  it(`pageMove`, () => {
    calendar.state.current = `1999/12`;
    const addListenerMock = vi.fn((_: string, listener: () => void) => listener());
    const removeListenerMock = vi.fn((_: string) => _);
    const animateMock = vi.fn(() => ({ addEventListener: addListenerMock }));
    const styleMock = { transform: `` };
    const getByIdMock = vi.spyOn(app.refer, `getById`).mockReturnValue({
      animate: animateMock,
      removeEventListener: removeListenerMock,
      style: styleMock,
    } as unknown as HTMLElement);
    calendar.handle.pageMove({ mode: `prev` });
    expect(getByIdMock).toBeCalledTimes(3);
    expect(getByIdMock).toBeCalledWith(`CalendarArea`);
    expect(animateMock).toBeCalledTimes(1);
    expect(animateMock).toBeCalledWith({ transform: `translateX(0px)` }, { duration: 250, easing: `ease-in-out` });
    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(removeListenerMock).toBeCalledTimes(1);
    expect(removeListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(styleMock.transform).toBe(`translateX(-33.333%)`);
    expect(calendar.state.current).toBe(`1999/11`);
    calendar.handle.pageMove({ mode: `next` });
    expect(getByIdMock).toBeCalledTimes(6);
    expect(getByIdMock).toBeCalledWith(`CalendarArea`);
    expect(animateMock).toBeCalledTimes(2);
    expect(animateMock).toBeCalledWith({ transform: `translateX(-66.666%)` }, { duration: 250, easing: `ease-in-out` });
    expect(addListenerMock).toBeCalledTimes(2);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(styleMock.transform).toBe(`translateX(-33.333%)`);
    expect(calendar.state.current).toBe(`1999/12`);
  });
  it(`swipeInit`, () => {
    const getByIdMock = vi.spyOn(app.refer, `getById`).mockReturnValue({
      getBoundingClientRect: () => ({ left: 60 }),
      children: [{ getBoundingClientRect: () => ({ left: 40 }) }],
    } as unknown as HTMLElement);
    calendar.handle.swipeInit({ x: 0, y: 0 });
    expect(getByIdMock).toBeCalledTimes(2);
    expect(getByIdMock).toBeCalledWith(`CalendarArea`);
    expect(getByIdMock).toBeCalledWith(`CalendarRoot`);
    expect(calendar.refer.swipe.status).toBe(`start`);
    expect(calendar.refer.swipe.x).toBe(0);
    expect(calendar.refer.swipe.y).toBe(0);
    expect(calendar.refer.swipe.left).toBe(20);
  });
  it(`swipeStart`, () => {
    calendar.handle.swipeStart({ x: 0, y: 20 });
    expect(calendar.refer.swipe).toEqual({});
    calendar.refer.swipe = { status: `start`, x: 0, y: 0 };
    calendar.handle.swipeStart({ x: 20, y: 0 });
    expect(calendar.refer.swipe.status).toBe(`move`);
  });
  it(`swipeMove`, () => {
    calendar.refer.swipe = { status: `move`, elem: { style: {} } as HTMLElement, x: 0, y: 0, left: 20 };
    calendar.handle.swipeMove({ x: 100 });
    expect(calendar.refer.swipe.elem!.style.transform).toBe(`translateX(120px)`);
  });
  it(`swipeEnd`, () => {
    const addListenerMock = vi.fn((_: string, listener: () => void) => listener());
    const removeListenerMock = vi.fn((_: string) => _);
    const animateMock = vi.fn(() => ({ addEventListener: addListenerMock }));
    (calendar.refer.swipe.elem as unknown as { [K in string]: object }).animate = animateMock;
    (calendar.refer.swipe.elem as unknown as { [K in string]: object }).removeEventListener = removeListenerMock;
    calendar.handle.swipeEnd({ x: 0 });
    expect(animateMock).toBeCalledTimes(1);
    expect(animateMock).toBeCalledWith({ transform: `translateX(-33.333%)` }, { duration: 250, easing: `ease-in-out` });
    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(removeListenerMock).toBeCalledTimes(1);
    expect(removeListenerMock.mock.calls[0]![0]).toBe(`finish`);
    expect(calendar.refer.swipe).toEqual({});
  });
  it(`swipeEnd - extra`, () => {
    calendar.refer.swipe = { status: `move`, elem: { style: {} } as unknown as HTMLElement, x: 0, y: 0 };
    const moveMock = vi.spyOn(calendar.handle, `pageMove`).mockReturnValue();
    calendar.handle.swipeEnd({ x: 100 });
    expect(moveMock).toBeCalledTimes(1);
    expect(moveMock).toBeCalledWith({ mode: `prev` });
    expect(calendar.refer.swipe).toEqual({});
    calendar.refer.swipe = { status: `move`, elem: { style: {} } as unknown as HTMLElement, x: 0, y: 0 };
    calendar.handle.swipeEnd({ x: -100 });
    expect(moveMock).toBeCalledTimes(2);
    expect(moveMock).toBeCalledWith({ mode: `next` });
    expect(calendar.refer.swipe).toEqual({});
    calendar.refer.swipe = { status: `start`, elem: { style: {} } as unknown as HTMLElement, x: 0, y: 0 };
    calendar.handle.swipeEnd({ x: 0 });
    expect(calendar.refer.swipe).toEqual({});
  });
});

describe(`render`, () => {
  it(`classStatus`, () => {
    vi.setSystemTime(new Date(1999, 11, 31, 0, 0, 0, 0));
    calendar.state.select = `1999/12/31`;
    expect(calendar.render.classStatus({ month: `1999/12`, day: `1999/12/31` })).toEqual(`select today`);
    expect(calendar.render.classStatus({ month: `1999/12`, day: `2000/01/01` })).toEqual(`hide`);
  });
});
