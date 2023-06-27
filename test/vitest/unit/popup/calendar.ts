import {expect, test, describe, beforeEach, vi} from 'vitest';
import fixture from '../../fixture/fixture';
import calendar from '@/stores/popup/calendar';

describe(`calendar`, () => {
  beforeEach(() => {
    fixture.init();
  });
  afterEach(() => {
    fixture.reset();
  });
  test(`getter.textWeek`, () => {
    expect(calendar.getter.textWeek()).toEqual([`日`, `月`, `火`, `水`, `木`, `金`, `土`]);
  });
  test(`getter.textDay`, () => {
    expect(calendar.getter.textDay()[1]!.day[3]).toEqual({month: `1999/12`, day: `1999/12/01`, text: `1`});
  });
  test(`getter.classDay`, () => {
    expect(calendar.getter.classDay(`1999/12`, `1999/12/31`)).toEqual({select: false, today: false, hide: false});
  });
  test(`action.open`, () => {
    calendar.action.open({select: ``, current: ``, cancel: ``, clear: ``, callback: () => {}});
    expect(calendar.state.open).toBe(true);
  });
  test(`action.close`, () => {
    calendar.action.close();
    expect(calendar.state.open).toBe(false);
  });
  test(`action.pageMove`, () => {
    calendar.action.pageMove({prev: false});
    expect(calendar.state.current).toBe(`2000/01`);
    calendar.action.pageMove({prev: true});
    expect(calendar.state.current).toBe(`1999/12`);
  });
  test(`action.swipe`, () => {
    const touchEvent = fixture.getEvent<TouchEvent>();
    calendar.action.swipeInit({event: touchEvent});
    expect(calendar.prop.swipe.status).toBe(`start`);
    vi.spyOn(touchEvent.changedTouches[0]!, `clientX`, `get`).mockReturnValue(11);
    calendar.action.swipeStart({event: touchEvent});
    expect(calendar.prop.swipe.status).toBe(`move`);
    calendar.action.swipeMove({event: touchEvent});
    expect(calendar.prop.swipe.status).toBe(`move`);
    calendar.action.swipeEnd({event: touchEvent});
    expect(calendar.prop.swipe.status).not.toBeDefined();
  });
});
