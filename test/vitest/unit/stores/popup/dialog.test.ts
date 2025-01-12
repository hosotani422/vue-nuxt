import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import dialog from "@/stores/popup/dialog";
import fixture from "../../../fixture/base";

beforeEach(async () => {
  await fixture.init();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe(`handle`, () => {
  it(`open`, () => {
    dialog.handle.open({
      mode: `alert`,
      title: `title`,
      message: `message`,
      text: {
        value: `text`,
        placeholder: `placeholder`,
        error: ``,
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
    });
    expect(dialog.state.init).toBe(true);
    expect(dialog.state.open).toBe(true);
    expect(dialog.state.mode).toBe(`alert`);
    expect(dialog.state.title).toBe(`title`);
    expect(dialog.state.message).toBe(`message`);
    expect(dialog.state.text).toEqual({
      value: `text`,
      placeholder: `placeholder`,
      error: ``,
    });
    expect(dialog.state.check).toEqual({
      all: false,
      sort: [`1`, `2`],
      data: { 1: { check: true, title: `1` }, 2: { check: false, title: `2` } },
    });
    expect(dialog.state.radio).toEqual({
      none: false,
      select: `1`,
      sort: [`1`, `2`],
      data: { 1: { title: `1` }, 2: { title: `2` } },
    });
    expect(dialog.state.ok).toBe(`ok`);
    expect(dialog.state.cancel).toBe(`cancel`);
  });
  it(`close`, () => {
    dialog.handle.close();
    expect(dialog.state.open).toBe(false);
  });
  it(`clickCheckAll`, () => {
    dialog.handle.clickCheckAll({ check: true });
    expect(dialog.state.check).toEqual({
      all: false,
      sort: [`1`, `2`],
      data: { 1: { check: true, title: `1` }, 2: { check: true, title: `2` } },
    });
    dialog.handle.clickCheckAll({ check: false });
    expect(dialog.state.check).toEqual({
      all: false,
      sort: [`1`, `2`],
      data: { 1: { check: false, title: `1` }, 2: { check: false, title: `2` } },
    });
  });
});

describe(`render`, () => {
  it(`stateCheckAll`, () => {
    dialog.state.check = {
      all: true,
      sort: [`1`, `2`],
      data: { 1: { check: false, title: `1` }, 2: { check: false, title: `2` } },
    };
    expect(dialog.render.stateCheckAll()).toBe(false);
    dialog.state.check = {
      all: true,
      sort: [`1`, `2`],
      data: { 1: { check: true, title: `1` }, 2: { check: false, title: `2` } },
    };
    expect(dialog.render.stateCheckAll()).toBe(false);
    dialog.state.check = {
      all: true,
      sort: [`1`, `2`],
      data: { 1: { check: true, title: `1` }, 2: { check: true, title: `2` } },
    };
    expect(dialog.render.stateCheckAll()).toBe(true);
  });
  it(`errorValidation`, () => {
    dialog.state.mode = `text`;
    dialog.state.text.value = ``;
    expect(dialog.render.errorValidation()).toBe(`空白以外の文字を１つ以上入力してください。`);
    dialog.state.mode = `text`;
    dialog.state.text.value = `text`;
    expect(dialog.render.errorValidation()).toBe(``);
    dialog.state.mode = `radio`;
    dialog.state.radio.select = ``;
    expect(dialog.render.errorValidation()).toBe(`空白以外の文字を１つ以上入力してください。`);
    dialog.state.mode = `radio`;
    dialog.state.radio.select = `radio`;
    expect(dialog.render.errorValidation()).toBe(``);
    dialog.state.mode = `check`;
    expect(dialog.render.errorValidation()).toBe(``);
  });
});
