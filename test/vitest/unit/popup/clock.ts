import {expect, test, describe, beforeEach} from 'vitest';
import fixture from '../../fixture/fixture';
import clock from '@/stores/popup/clock';

describe(`clock`, () => {
  beforeEach(() => {
    fixture.init();
  });
  afterEach(() => {
    fixture.reset();
  });
  test(`action.open`, async() => {
    await clock.action.open({hour: 9, minute: 0, cancel: ``, clear: ``, ok: ``, callback: () => {}});
    expect(clock.state.open).toBe(true);
  });
  test(`action.close`, () => {
    clock.action.close();
    expect(clock.state.open).toBe(false);
  });
});
