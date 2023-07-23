import {describe, it, expect} from 'vitest';
import fixture from '../../fixture/fixture';
import calendar from '@/stores/popup/calendar';

describe(`PopupCalendar`, () => {
  beforeEach(async() => {
    await fixture.loadData();
    await fixture.mountCalendar();
    fixture.entryMock();
  });
  afterEach(() => {
    fixture.resetMock();
  });
  it(`getter.textWeek`, () => {
    expect(calendar.getter.textWeek()).toEqual([`日`, `月`, `火`, `水`, `木`, `金`, `土`]);
  });
  it(`getter.textDay`, () => {
    expect(calendar.getter.textDay()[1]!.day[3]).toEqual({month: `1999/12`, day: `1999/12/01`, text: `1`});
  });
  it(`getter.classDay`, () => {
    expect(calendar.getter.classDay(`1999/12`, `1999/12/31`)).toEqual({select: false, today: false, hide: false});
  });
  it(`action.open`, () => {
    calendar.action.open({select: ``, current: ``, cancel: ``, clear: ``, callback: () => {}});
    expect(calendar.state.open).toBe(true);
  });
  it(`action.close`, () => {
    calendar.action.close();
    expect(calendar.state.open).toBe(false);
  });
  it(`action.pageMove`, () => {
    calendar.action.pageMove({prev: false});
    expect(calendar.state.current).toBe(`2000/01`);
    calendar.action.pageMove({prev: true});
    expect(calendar.state.current).toBe(`1999/12`);
  });
  it(`action.swipe`, () => {
    calendar.action.swipeInit({target: fixture.getTarget(), clientX: 0, clientY: 0});
    expect(calendar.prop.swipe.status).toBe(`start`);
    calendar.action.swipeStart({clientX: 11, clientY: 0});
    expect(calendar.prop.swipe.status).toBe(`move`);
    calendar.action.swipeMove({clientX: 11});
    expect(calendar.prop.swipe.status).toBe(`move`);
    calendar.action.swipeEnd({clientX: 11});
    expect(calendar.prop.swipe.status).not.toBeDefined();
  });
});
