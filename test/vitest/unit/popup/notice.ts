import {expect, test, describe, beforeEach} from 'vitest';
import fixture from '../../fixture/fixture';
import notice from '@/stores/popup/notice';

describe(`notice`, () => {
  beforeEach(() => {
    fixture.init();
  });
  afterEach(() => {
    fixture.reset();
  });
  test(`action.open`, () => {
    notice.action.open({message: ``, button: ``, callback: () => {}});
    expect(notice.state.open).toBe(true);
  });
  test(`action.close`, () => {
    notice.action.close();
    expect(notice.state.open).toBe(false);
  });
});
