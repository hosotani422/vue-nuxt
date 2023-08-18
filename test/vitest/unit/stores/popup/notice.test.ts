import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import fs from "fs";
import constant from "@/utils/const";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import conf from "@/stores/page/conf";
import notice from "@/stores/popup/notice";

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
    const param = {
      message: `message`,
      button: `button`,
      callback: () => ``,
    };
    notice.action.open(param);
    expect(notice.state.open).toBe(true);
    expect(notice.state.message).toBe(`message`);
    expect(notice.state.button).toBe(`button`);
    expect(notice.state.callback).toEqual(param.callback);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(notice.state.open).toBe(false);
  });
  it(`close`, () => {
    notice.action.close();
    expect(notice.state.open).toBe(false);
  });
});
