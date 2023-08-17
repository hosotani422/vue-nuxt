import {describe, it, expect} from 'vitest';
import fixture from '../../fixture/fixture';
import notice from '@/stores/popup/notice';

describe(`PopupNotice`, () => {
  beforeEach(async() => {
    await fixture.loadData();
    await fixture.mountNotice();
    fixture.entryMock();
  });
  afterEach(() => {
    fixture.resetMock();
  });
  it(`action.open`, () => {
    notice.action.open({message: ``, button: ``, callback: () => {}});
    expect(notice.state.open).toBe(true);
  });
  it(`action.close`, () => {
    notice.action.close();
    expect(notice.state.open).toBe(false);
  });
});
