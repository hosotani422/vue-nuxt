import {describe, it, expect} from 'vitest';
import fixture from '../../fixture/fixture';
import clock from '@/stores/popup/clock';

describe(`PopupClock`, () => {
  beforeEach(async() => {
    await fixture.loadData();
    await fixture.mountClock();
    fixture.entryMock();
  });
  afterEach(() => {
    fixture.resetMock();
  });
  it(`action.open`, async() => {
    await clock.action.open({hour: 9, minute: 0, cancel: ``, clear: ``, ok: ``, callback: () => {}});
    expect(clock.state.open).toBe(true);
  });
  it(`action.close`, () => {
    clock.action.close();
    expect(clock.state.open).toBe(false);
  });
});
