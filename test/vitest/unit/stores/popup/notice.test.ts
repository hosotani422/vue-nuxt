import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import fs from "fs";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import conf from "@/stores/page/conf";
import notice from "@/stores/popup/notice";

beforeEach(async () => {
  const backup = fs.readFileSync(`./test/memotea.bak`, `utf-8`).split(`\n`);
  app.state.backId = backup[0]!;
  list.state.data = JSON.parse(backup[1]!);
  main.state.data = JSON.parse(backup[2]!);
  sub.state.data = JSON.parse(backup[3]!);
  conf.state.data = JSON.parse(backup[4]!);
  vi.mock(`vue-router`, () => ({
    useRoute: () => ({
      params: { listId: `list1111111111111`, mainId: `main1111111111111` },
    }),
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe(`action`, () => {
  it(`open`, async () => {
    const option = {
      message: `message`,
      button: `button`,
      callback: () => ``,
    };
    vi.spyOn(notice.action, `close`).mockReturnValue();
    notice.action.open(option);
    expect(notice.state.open).toBe(true);
    expect(notice.state.message).toBe(`message`);
    expect(notice.state.button).toBe(`button`);
    expect(notice.state.callback).toEqual(option.callback);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(notice.action.close).toBeCalledTimes(1);
  });
  it(`close`, () => {
    notice.action.close();
    expect(notice.state.open).toBe(false);
  });
});
