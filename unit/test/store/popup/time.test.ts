import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import conf from "@/store/page/conf";
import time from "@/store/popup/time";
import fixture from "../../../fixture/base";

beforeEach(async () => {
  await fixture.loadData();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe(`handle`, () => {
  it(`open`, async () => {
    const canvasMock = vi.spyOn(time.handle, `drawCanvas`).mockReturnValue();
    await time.handle.open({ time: `23:59`, cancel: `cancel`, clear: `clear`, ok: `ok`, callback: () => `` });
    expect(time.state.open).toBe(true);
    expect(time.state.hour).toBe(23);
    expect(time.state.minute).toBe(59);
    expect(time.state.cancel).toBe(`cancel`);
    expect(time.state.clear).toBe(`clear`);
    expect(time.state.ok).toBe(`ok`);
    expect(canvasMock).toBeCalledTimes(2);
    expect(canvasMock).toBeCalledWith({ type: `hour` });
    expect(canvasMock).toBeCalledWith({ type: `minute` });
  });
  it(`close`, () => {
    time.handle.close();
    expect(time.state.open).toBe(false);
  });
  it(`inputTime`, () => {
    const selectorMock = vi.spyOn(document, `querySelector`).mockImplementation((id: string) => {
      if (id === `div[aria-label='time'] canvas:nth-of-type(1)`) {
        return { getBoundingClientRect: () => ({ top: 80, left: 80, height: 240 }) } as HTMLElement;
      } else if (id === `div[aria-label='time'] canvas:nth-of-type(2)`) {
        return { getBoundingClientRect: () => ({ top: 330, left: 77, height: 233 }) } as HTMLElement;
      }
      return undefined as unknown as Element;
    });
    const canvasMock = vi.spyOn(time.handle, `drawCanvas`).mockReturnValue();
    time.handle.inputTime({ type: `hour`, x: 240, y: 120 });
    expect(selectorMock).toBeCalledTimes(1);
    expect(selectorMock).toBeCalledWith(`div[aria-label='time'] canvas:nth-of-type(1)`);
    expect(canvasMock).toBeCalledTimes(1);
    expect(canvasMock).toBeCalledWith({ type: `hour` });
    expect(time.state.hour).toBe(1);
    time.handle.inputTime({ type: `minute`, x: 240, y: 360 });
    expect(selectorMock).toBeCalledTimes(2);
    expect(selectorMock).toBeCalledWith(`div[aria-label='time'] canvas:nth-of-type(2)`);
    expect(canvasMock).toBeCalledTimes(2);
    expect(canvasMock).toBeCalledWith({ type: `minute` });
    expect(time.state.minute).toBe(5);
  });
  it(`drawCanvas - hour`, () => {
    const attributeMock = vi.fn();
    const translateMock = vi.fn();
    const rotateMock = vi.fn();
    const selectorMock = vi.spyOn(document, `querySelector`).mockReturnValue({
      setAttribute: attributeMock,
      getBoundingClientRect: () => ({ height: 100 }),
      getContext: () => ({ translate: translateMock, rotate: rotateMock }),
    } as unknown as HTMLCanvasElement);
    const circleMock = vi.spyOn(time.handle, `drawCircle`).mockReturnValue();
    const lineMock = vi.spyOn(time.handle, `drawLine`).mockReturnValue();
    const charMock = vi.spyOn(time.handle, `drawChar`).mockReturnValue();
    time.handle.drawCanvas({ type: `hour` });
    expect(selectorMock).toBeCalledTimes(1);
    expect(selectorMock).toBeCalledWith(`div[aria-label='time'] canvas:nth-of-type(1)`);
    expect(attributeMock).toBeCalledTimes(2);
    expect(attributeMock).toBeCalledWith(`width`, `100px`);
    expect(attributeMock).toBeCalledWith(`height`, `100px`);
    expect(translateMock).toBeCalledTimes(1);
    expect(translateMock).toBeCalledWith(50, 50);
    expect(rotateMock).toBeCalledTimes(2);
    expect(rotateMock).toBeCalledWith(0.5235987755982988);
    expect(rotateMock).toBeCalledWith(-0.5235987755982988);
    expect(circleMock).toBeCalledTimes(3);
    expect(circleMock.mock.calls[0]![0]!.x).toBe(0);
    expect(circleMock.mock.calls[0]![0]!.y).toBe(0);
    expect(circleMock.mock.calls[0]![0]!.radius).toBe(50);
    expect(circleMock.mock.calls[0]![0]!.color).toBe(`#000000`);
    expect(circleMock.mock.calls[1]![0]!.x).toBe(0);
    expect(circleMock.mock.calls[1]![0]!.y).toBe(0);
    expect(circleMock.mock.calls[1]![0]!.radius).toBe(3);
    expect(circleMock.mock.calls[1]![0]!.color).toBe(`#1188dd`);
    expect(circleMock.mock.calls[2]![0]!.x).toBe(0);
    expect(circleMock.mock.calls[2]![0]!.y).toBe(-41);
    expect(circleMock.mock.calls[2]![0]!.radius).toBe(20);
    expect(circleMock.mock.calls[2]![0]!.color).toBe(`#1188dd`);
    expect(lineMock).toBeCalledTimes(1);
    expect(lineMock.mock.calls[0]![0]!.from).toEqual({ x: 0, y: 0 });
    expect(lineMock.mock.calls[0]![0]!.to).toEqual({ x: 0, y: -41 });
    expect(lineMock.mock.calls[0]![0]!.width).toBe(1);
    expect(lineMock.mock.calls[0]![0]!.color).toBe(`#1188dd`);
    expect(charMock).toBeCalledTimes(2);
    expect(charMock.mock.calls[0]![0]!.list).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(charMock.mock.calls[0]![0]!.select).toBe(1);
    expect(charMock.mock.calls[0]![0]!.size).toBe(`1rem`);
    expect(charMock.mock.calls[0]![0]!.radius).toBe(41);
    expect(charMock.mock.calls[0]![0]!.color).toBe(`#ffffff`);
    expect(charMock.mock.calls[1]![0]!.list).toEqual([12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
    expect(charMock.mock.calls[1]![0]!.select).toBe(1);
    expect(charMock.mock.calls[1]![0]!.size).toBe(`0.8rem`);
    expect(charMock.mock.calls[1]![0]!.radius).toBe(26);
    expect(charMock.mock.calls[1]![0]!.color).toBe(`#ffffff`);
  });
  it(`drawCanvas - minute`, () => {
    const attributeMock = vi.fn();
    const translateMock = vi.fn();
    const rotateMock = vi.fn();
    const selectorMock = vi.spyOn(document, `querySelector`).mockReturnValue({
      setAttribute: attributeMock,
      getBoundingClientRect: () => ({ height: 100 }),
      getContext: () => ({ translate: translateMock, rotate: rotateMock }),
    } as unknown as HTMLCanvasElement);
    const circleMock = vi.spyOn(time.handle, `drawCircle`).mockReturnValue();
    const lineMock = vi.spyOn(time.handle, `drawLine`).mockReturnValue();
    const charMock = vi.spyOn(time.handle, `drawChar`).mockReturnValue();
    time.handle.drawCanvas({ type: `minute` });
    expect(selectorMock).toBeCalledTimes(1);
    expect(selectorMock).toBeCalledWith(`div[aria-label='time'] canvas:nth-of-type(2)`);
    expect(attributeMock).toBeCalledTimes(2);
    expect(attributeMock).toBeCalledWith(`width`, `100px`);
    expect(attributeMock).toBeCalledWith(`height`, `100px`);
    expect(translateMock).toBeCalledTimes(1);
    expect(translateMock).toBeCalledWith(50, 50);
    expect(rotateMock).toBeCalledTimes(2);
    expect(rotateMock).toBeCalledWith(0.5235987755982988);
    expect(rotateMock).toBeCalledWith(-0.5235987755982988);
    expect(circleMock).toBeCalledTimes(3);
    expect(circleMock.mock.calls[0]![0]!.x).toBe(0);
    expect(circleMock.mock.calls[0]![0]!.y).toBe(0);
    expect(circleMock.mock.calls[0]![0]!.radius).toBe(50);
    expect(circleMock.mock.calls[0]![0]!.color).toBe(`#000000`);
    expect(circleMock.mock.calls[1]![0]!.x).toBe(0);
    expect(circleMock.mock.calls[1]![0]!.y).toBe(0);
    expect(circleMock.mock.calls[1]![0]!.radius).toBe(3);
    expect(circleMock.mock.calls[1]![0]!.color).toBe(`#1188dd`);
    expect(circleMock.mock.calls[2]![0]!.x).toBe(0);
    expect(circleMock.mock.calls[2]![0]!.y).toBe(-41);
    expect(circleMock.mock.calls[2]![0]!.radius).toBe(20);
    expect(circleMock.mock.calls[2]![0]!.color).toBe(`#1188dd`);
    expect(lineMock).toBeCalledTimes(1);
    expect(lineMock.mock.calls[0]![0]!.from).toEqual({ x: 0, y: 0 });
    expect(lineMock.mock.calls[0]![0]!.to).toEqual({ x: 0, y: -41 });
    expect(lineMock.mock.calls[0]![0]!.width).toBe(1);
    expect(lineMock.mock.calls[0]![0]!.color).toBe(`#1188dd`);
    expect(charMock).toBeCalledTimes(1);
    expect(charMock.mock.calls[0]![0]!.list).toEqual([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    expect(charMock.mock.calls[0]![0]!.select).toBe(5);
    expect(charMock.mock.calls[0]![0]!.size).toBe(`1rem`);
    expect(charMock.mock.calls[0]![0]!.radius).toBe(41);
    expect(charMock.mock.calls[0]![0]!.color).toBe(`#ffffff`);
    conf.state.data.size = 1;
    time.handle.drawCanvas({ type: `minute` });
    expect(circleMock.mock.calls[5]![0]!.radius).toBe(18);
    conf.state.data.size = 3;
    time.handle.drawCanvas({ type: `minute` });
    expect(circleMock.mock.calls[8]![0]!.radius).toBe(22);
  });
  it(`drawCircle`, () => {
    const beginMock = vi.fn();
    const arcMock = vi.fn();
    const fillMock = vi.fn();
    const ctx = {
      beginPath: beginMock,
      arc: arcMock,
      fill: fillMock,
      fillStyle: ``,
    } as unknown as CanvasRenderingContext2D;
    time.handle.drawCircle({ ctx, x: 0, y: 0, radius: 100, color: `#1188dd` });
    expect(beginMock).toBeCalledTimes(1);
    expect(beginMock).toBeCalledWith();
    expect(arcMock).toBeCalledTimes(1);
    expect(arcMock).toBeCalledWith(0, 0, 100, 0, 6.283185307179586, false);
    expect(fillMock).toBeCalledTimes(1);
    expect(fillMock).toBeCalledWith();
    expect(ctx.fillStyle).toBe(`#1188dd`);
  });
  it(`drawLine`, () => {
    const beginMock = vi.fn();
    const moveMock = vi.fn();
    const lineMock = vi.fn();
    const strokeMock = vi.fn();
    const ctx = {
      beginPath: beginMock,
      moveTo: moveMock,
      lineTo: lineMock,
      stroke: strokeMock,
      lineWidth: 0,
      strokeStyle: ``,
    } as unknown as CanvasRenderingContext2D;
    time.handle.drawLine({ ctx, from: { x: 0, y: 0 }, to: { x: 100, y: 100 }, width: 200, color: `#1188dd` });
    expect(beginMock).toBeCalledTimes(1);
    expect(beginMock).toBeCalledWith();
    expect(moveMock).toBeCalledTimes(1);
    expect(moveMock).toBeCalledWith(0, 0);
    expect(lineMock).toBeCalledTimes(1);
    expect(lineMock).toBeCalledWith(100, 100);
    expect(strokeMock).toBeCalledTimes(1);
    expect(strokeMock).toBeCalledWith();
    expect(ctx.lineWidth).toBe(200);
    expect(ctx.strokeStyle).toBe(`#1188dd`);
  });
  it(`drawChar`, () => {
    const fillMock = vi.fn();
    const ctx = {
      fillText: fillMock,
      font: ``,
      textAlign: ``,
      textBaseline: ``,
      fillStyle: ``,
    } as unknown as CanvasRenderingContext2D;
    time.handle.drawChar({ ctx, list: [1], select: 1, size: `base`, radius: 0, color: `#1188dd` });
    expect(ctx.font).toBe(`normal base sans-serif`);
    expect(ctx.textAlign).toBe(`center`);
    expect(ctx.textBaseline).toBe(`middle`);
    expect(ctx.fillStyle).toBe(`#ffffff`);
    expect(fillMock).toBeCalledTimes(1);
    expect(fillMock).toBeCalledWith(`1`, -0, -0);
    time.handle.drawChar({ ctx, list: [1], select: 2, size: `base`, radius: 0, color: `#1188dd` });
    expect(ctx.fillStyle).toBe(`#1188dd`);
  });
});
