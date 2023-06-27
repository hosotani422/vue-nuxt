import {expect, test, describe, beforeEach, vi} from 'vitest';
import fixture from '../../fixture/fixture';
import list from '@/stores/page/list';
import conf from '@/stores/page/conf';

describe(`conf`, () => {
  beforeEach(() => {
    fixture.init();
  });
  afterEach(() => {
    fixture.reset();
  });
  test(`action.loadItem`, async() => {
    await conf.action.loadItem();
    expect(conf.state.data.theme).toBe(`light`);
  });
  test(`action.saveItem`, () => {
    conf.action.saveItem();
    expect(JSON.parse(localStorage.getItem(`conf`)!).theme).toBe(`dark`);
  });
  test(`action.resetConf`, () => {
    conf.action.resetConf();
    fixture.dialogConfirm();
    expect(conf.state.data.theme).toBe(`light`);
  });
  test(`action.resetList`, () => {
    const listId = fixture.getListId(0);
    conf.action.resetList();
    fixture.dialogConfirm();
    expect(list.state.data.data[listId]).not.toBeDefined();
  });
  test(`action.swipe`, () => {
    const touchEvent = fixture.getEvent<TouchEvent>();
    conf.action.swipeInit({event: touchEvent});
    expect(conf.prop.swipe.status).toBe(`start`);
    vi.spyOn(touchEvent.changedTouches[0]!, `clientY`, `get`).mockReturnValue(16);
    conf.action.swipeStart({event: touchEvent});
    expect(conf.prop.swipe.status).toBe(`move`);
    conf.action.swipeMove({event: touchEvent});
    expect(conf.prop.swipe.status).toBe(`move`);
    conf.action.swipeEnd({event: touchEvent});
    expect(conf.prop.swipe.status).not.toBeDefined();
  });
});
