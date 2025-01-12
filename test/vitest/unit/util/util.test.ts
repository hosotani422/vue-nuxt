import { vi, describe, it, expect } from "vitest";
import app from "@/stores/page/app";

describe(`util`, () => {
  it(`getById`, () => {
    const queryMock = vi.spyOn(document, `querySelector`).mockReturnValue(`element` as unknown as Element);
    const element = app.refer.getById(`id`);
    expect(queryMock).toBeCalledTimes(1);
    expect(queryMock).toBeCalledWith(`[data-id='id']`);
    expect(element).toBe(`element`);
  });
  it(`getByIdAll`, () => {
    const queryMock = vi
      .spyOn(document, `querySelectorAll`)
      .mockReturnValue(`element` as unknown as NodeListOf<Element>);
    const element = app.refer.getByIdAll(`id`);
    expect(queryMock).toBeCalledTimes(1);
    expect(queryMock).toBeCalledWith(`[data-id='id']`);
    expect(element).toBe(`element`);
  });
  it(`isJson`, () => {
    expect(app.refer.isJson(`{}`)).toBe(true);
    expect(app.refer.isJson(``)).toBe(false);
    expect(app.refer.isJson(false)).toBe(false);
  });
});
