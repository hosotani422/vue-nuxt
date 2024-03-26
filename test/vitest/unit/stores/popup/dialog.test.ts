import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import fs from "fs";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import conf from "@/stores/page/conf";
import dialog from "@/stores/popup/dialog";

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

describe(`getter`, () => {
  it(`stateCheckAll`, () => {
    dialog.state.check = {
      all: true,
      sort: [`1`, `2`],
      data: { 1: { check: false, title: `1` }, 2: { check: false, title: `2` } },
    };
    expect(dialog.getter.stateCheckAll()).toBe(false);
    dialog.state.check = {
      all: true,
      sort: [`1`, `2`],
      data: { 1: { check: true, title: `1` }, 2: { check: false, title: `2` } },
    };
    expect(dialog.getter.stateCheckAll()).toBe(false);
    dialog.state.check = {
      all: true,
      sort: [`1`, `2`],
      data: { 1: { check: true, title: `1` }, 2: { check: true, title: `2` } },
    };
    expect(dialog.getter.stateCheckAll()).toBe(true);
  });
});

describe(`action`, () => {
  it(`open`, () => {
    const option = {
      mode: `alert` as typeof dialog.state.mode,
      title: `title`,
      message: `message`,
      text: {
        value: `text`,
        placeholder: `placeholder`,
      },
      check: {
        all: false,
        sort: [`1`, `2`],
        data: { 1: { check: true, title: `1` }, 2: { check: false, title: `2` } },
      },
      radio: {
        none: false,
        select: `1`,
        sort: [`1`, `2`],
        data: { 1: { title: `1` }, 2: { title: `2` } },
      },
      ok: `ok`,
      cancel: `cancel`,
      callback: {
        ok: () => ``,
        cancel: () => ``,
      },
    };
    dialog.action.open(option);
    expect(dialog.state).toEqual({ open: true, ...option });
  });
  it(`close`, () => {
    dialog.action.close();
    expect(dialog.state.open).toBe(false);
  });
  it(`clickCheckAll`, () => {
    dialog.action.clickCheckAll({ checked: true });
    expect(dialog.state.check.data[`1`]!.check).toBe(true);
    expect(dialog.state.check.data[`2`]!.check).toBe(true);
    dialog.action.clickCheckAll({ checked: false });
    expect(dialog.state.check.data[`1`]!.check).toBe(false);
    expect(dialog.state.check.data[`2`]!.check).toBe(false);
  });
});
