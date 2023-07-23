import {describe, it, expect} from 'vitest';
import fixture from '../../fixture/fixture';
import list from '@/stores/page/list';
import conf from '@/stores/page/conf';

describe(`PageSub`, () => {
  beforeEach(async() => {
    await fixture.loadData();
    await fixture.mountConf();
    fixture.entryMock();
  });
  afterEach(() => {
    fixture.resetMock();
  });
  it(`action.loadItem`, async() => {
    await conf.action.loadItem();
    expect(conf.state.data.theme).toBe(`light`);
  });
  it(`action.saveItem`, () => {
    conf.action.saveItem();
    expect(JSON.parse(localStorage.getItem(`conf`)!).theme).toBe(`dark`);
  });
  it(`action.resetConf`, () => {
    conf.action.resetConf();
    fixture.dialogConfirm();
    expect(conf.state.data.theme).toBe(`light`);
  });
  it(`action.resetList`, () => {
    const listId = fixture.getListId(0);
    conf.action.resetList();
    fixture.dialogConfirm();
    expect(list.state.data.data[listId]).not.toBeDefined();
  });
  it(`action.swipe`, () => {
    conf.action.swipeInit({target: fixture.getTarget(), clientX: 0, clientY: 0});
    expect(conf.prop.swipe.status).toBe(`start`);
    conf.action.swipeStart({clientX: 0, clientY: 16});
    expect(conf.prop.swipe.status).toBe(`move`);
    conf.action.swipeMove({clientY: 16});
    expect(conf.prop.swipe.status).toBe(`move`);
    conf.action.swipeEnd({clientY: 16});
    expect(conf.prop.swipe.status).not.toBeDefined();
  });
});
