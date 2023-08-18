import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import * as Vue from "vue";
import fs from "fs";
import constant from "@/utils/const";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import conf from "@/stores/page/conf";
import clock from "@/stores/popup/clock";

beforeEach(async () => {
  constant.base.id.inbox = `list000`;
  constant.base.id.trash = `list900`;
  const backup = fs.readFileSync(`./test/memotea.bak`, `utf-8`).split(`\n`);
  app.state.backId = backup[0]!;
  list.state.data = JSON.parse(backup[1]!);
  main.state.data = JSON.parse(backup[2]!);
  sub.state.data = JSON.parse(backup[3]!);
  conf.state.data = JSON.parse(backup[4]!);
  vi.mock(`vue-router`, () => ({
    useRoute: () => ({
      params: { listId: `list100`, mainId: `main110` },
    }),
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe(`action`, () => {
  it(`open`, async () => {
    const callbackData = () => ``;
    clock.refer.hour = { value: 23 } as unknown as Vue.Ref<Vue.ComponentPublicInstance<HTMLCanvasElement> | undefined>;
    clock.refer.minute = { value: 59 } as unknown as Vue.Ref<
      Vue.ComponentPublicInstance<HTMLCanvasElement> | undefined
    >;
    vi.spyOn(clock.action, `drawHour`).mockReturnValue();
    vi.spyOn(clock.action, `drawMinute`).mockReturnValue();
    await clock.action.open({
      hour: 23,
      minute: 59,
      cancel: `cancel`,
      clear: `clear`,
      ok: `ok`,
      callback: callbackData,
    });
    expect(clock.state.open).toBe(true);
    expect(clock.state.hour).toBe(23);
    expect(clock.state.minute).toBe(59);
    expect(clock.state.cancel).toBe(`cancel`);
    expect(clock.state.clear).toBe(`clear`);
    expect(clock.state.ok).toBe(`ok`);
    expect(clock.state.callback).toEqual(callbackData);
    expect(clock.action.drawHour).toBeCalledTimes(1);
    expect(clock.action.drawHour).toBeCalledWith({ target: 23 });
    expect(clock.action.drawMinute).toBeCalledTimes(1);
    expect(clock.action.drawMinute).toBeCalledWith({ target: 59 });
  });
  it(`close`, () => {
    clock.action.close();
    expect(clock.state.open).toBe(false);
  });
  it(`inputHour`, () => {
    const eventMock = {
      touches: [{ pageX: 240, pageY: 120 }],
      target: { getBoundingClientRect: () => ({ top: 80, left: 80, height: 240 }) },
    } as unknown as TouchEvent;
    vi.spyOn(clock.action, `drawHour`).mockReturnValue();
    clock.action.inputHour({ event: eventMock });
    expect(clock.state.hour).toBe(1);
    expect(clock.action.drawHour).toBeCalledTimes(1);
    expect(clock.action.drawHour).toBeCalledWith({ target: eventMock.target });
  });
  it(`inputMinute`, () => {
    const eventMock = {
      touches: [{ pageX: 240, pageY: 360 }],
      target: { getBoundingClientRect: () => ({ top: 330, left: 77, height: 233 }) },
    } as unknown as TouchEvent;
    vi.spyOn(clock.action, `drawMinute`).mockReturnValue();
    clock.action.inputMinute({ event: eventMock });
    expect(clock.state.minute).toBe(5);
    expect(clock.action.drawMinute).toBeCalledTimes(1);
    expect(clock.action.drawMinute).toBeCalledWith({ target: eventMock.target });
  });
});
