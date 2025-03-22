import { vi, afterEach, describe, it, expect } from "vitest";
import notice from "@/store/popup/notice";

afterEach(() => {
  vi.restoreAllMocks();
});

describe(`handle`, () => {
  it(`open`, async () => {
    notice.refer.timeoutId = 1;
    const clearMock = vi.spyOn(window, `clearTimeout`).mockReturnValue();
    const setMock = vi.spyOn(window, `setTimeout`).mockImplementation((listener) => {
      listener();
      return 3 as unknown as NodeJS.Timeout;
    });
    const closeMock = vi.spyOn(notice.handle, `close`).mockReturnValue();
    notice.handle.open({ message: `message`, button: `button`, callback: () => `` });
    expect(notice.state.message).toBe(`message`);
    expect(notice.state.button).toBe(`button`);
    expect(notice.refer.timeoutId).toBe(3);
    expect(clearMock).toBeCalledTimes(1);
    expect(clearMock).toBeCalledWith(1);
    expect(setMock).toBeCalledTimes(1);
    expect(setMock.mock.calls[0]![1]).toBe(3000);
    expect(closeMock).toBeCalledTimes(1);
    expect(closeMock).toBeCalledWith();
  });
  it(`close`, () => {
    notice.handle.close();
    expect(notice.state.open).toBe(false);
  });
});
