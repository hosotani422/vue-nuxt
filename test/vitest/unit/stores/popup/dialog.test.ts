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
      all: false,
      sort: [`1`, `2`],
      data: { "1": { check: false, title: `1` }, "2": { check: false, title: `2` } },
    };
    expect(dialog.getter.stateCheckAll()).toBe(false);
    dialog.state.check = {
      all: false,
      sort: [`1`, `2`],
      data: { "1": { check: true, title: `1` }, "2": { check: false, title: `2` } },
    };
    expect(dialog.getter.stateCheckAll()).toBe(false);
    dialog.state.check = {
      all: false,
      sort: [`1`, `2`],
      data: { "1": { check: true, title: `1` }, "2": { check: true, title: `2` } },
    };
    expect(dialog.getter.stateCheckAll()).toBe(true);
  });
});

describe(`action`, () => {
  it(`open`, () => {
    const param = {
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
        data: { "1": { check: true, title: `1` }, "2": { check: false, title: `2` } },
      },
      radio: {
        none: false,
        select: `1`,
        sort: [`1`, `2`],
        data: { "1": { title: `1` }, "2": { title: `2` } },
      },
      ok: `ok`,
      cancel: `cancel`,
      callback: {
        ok: () => ``,
        cancel: () => ``,
      },
    };
    dialog.action.open(param);
    expect(dialog.state.open).toBe(true);
    expect(dialog.state.mode).toBe(`alert`);
    expect(dialog.state.title).toBe(`title`);
    expect(dialog.state.message).toBe(`message`);
    expect(dialog.state.text.value).toBe(`text`);
    expect(dialog.state.text.placeholder).toBe(`placeholder`);
    expect(dialog.state.check.all).toBe(false);
    expect(dialog.state.check.sort).toEqual([`1`, `2`]);
    expect(dialog.state.check.data).toEqual({
      "1": { check: true, title: `1` },
      "2": { check: false, title: `2` },
    });
    expect(dialog.state.radio.none).toBe(false);
    expect(dialog.state.radio.select).toBe(`1`);
    expect(dialog.state.radio.sort).toEqual([`1`, `2`]);
    expect(dialog.state.radio.data).toEqual({ "1": { title: `1` }, "2": { title: `2` } });
    expect(dialog.state.ok).toBe(`ok`);
    expect(dialog.state.cancel).toBe(`cancel`);
    expect(dialog.state.callback.ok).toEqual(param.callback.ok);
    expect(dialog.state.callback.cancel).toEqual(param.callback.cancel);
  });
  it(`close`, () => {
    dialog.action.close();
    expect(dialog.state.open).toBe(false);
  });
  it(`clickCheckAll`, () => {
    dialog.action.clickCheckAll({ checked: false });
    expect(dialog.state.check.data[`1`]!.check).toBe(false);
    expect(dialog.state.check.data[`2`]!.check).toBe(false);
    dialog.action.clickCheckAll({ checked: true });
    expect(dialog.state.check.data[`1`]!.check).toBe(true);
    expect(dialog.state.check.data[`2`]!.check).toBe(true);
  });
});
