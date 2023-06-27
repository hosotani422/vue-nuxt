import {expect, test, describe, beforeEach, vi} from 'vitest';
import fixture from '../../fixture/fixture';
import main from '@/stores/page/main';
import sub from '@/stores/page/sub';

describe(`sub`, () => {
  beforeEach(() => {
    fixture.init();
  });
  afterEach(() => {
    fixture.reset();
  });
  test(`getter.stateFull`, () => {
    expect(sub.getter.stateFull().sort).toEqual([fixture.getSubId(0), fixture.getSubId(1), fixture.getSubId(2)]);
    expect(sub.getter.stateFull(fixture.getListId(0), fixture.getMainId(0)).sort).toEqual([fixture.getSubId(0), fixture.getSubId(1), fixture.getSubId(2)]);
    expect(sub.getter.stateFull(fixture.getListId(0), fixture.getMainId(1)).sort.length).toBe(1);
    expect(sub.getter.stateFull(fixture.getListId(0), fixture.getMainId(2)).sort.length).toBe(1);
  });
  test(`getter.stateUnit`, () => {
    expect(sub.getter.stateUnit(``, ``, fixture.getSubId(0))).toEqual({check: false, title: `sub1`});
    expect(sub.getter.stateUnit(fixture.getListId(0), fixture.getMainId(0), fixture.getSubId(0))).toEqual({check: false, title: `sub1`});
    expect(sub.getter.stateUnit(fixture.getListId(0), fixture.getMainId(0), fixture.getSubId(1))).toEqual({check: false, title: `sub2`});
    expect(sub.getter.stateUnit(fixture.getListId(0), fixture.getMainId(0), fixture.getSubId(2))).toEqual({check: false, title: `sub3`});
  });
  test(`getter.classItem`, () => {
    expect(sub.getter.classItem(fixture.getSubId(0))).toEqual({check: false, edit: false, drag: false, hide: false});
    expect(sub.getter.classItem(fixture.getSubId(1))).toEqual({check: false, edit: false, drag: false, hide: false});
    expect(sub.getter.classItem(fixture.getSubId(2))).toEqual({check: false, edit: false, drag: false, hide: false});
  });
  test(`getter.textMemo`, () => {
    expect(sub.getter.textMemo()).toBe(`sub1\nsub2\nsub3`);
  });
  test(`getter.classLimit`, () => {
    expect(sub.getter.classLimit()).toEqual({'text-theme-care': false, 'text-theme-warn': false});
  });
  test(`getter.textAlarm`, () => {
    expect(sub.getter.textAlarm()).toBe(``);
  });
  test(`action.loadItem`, async() => {
    await sub.action.loadItem();
    expect(sub.state.data[fixture.getListId(0)]).not.toBeDefined();
  });
  test(`action.saveItem`, () => {
    sub.action.saveItem();
    expect(JSON.parse(localStorage.getItem(`sub`)!)[fixture.getListId(0)]).toBeDefined();
  });
  test(`action.enterItem`, async() => {
    await sub.action.enterItem({event: fixture.getEvent<KeyboardEvent>(), subId: fixture.getSubId(0)});
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.data[fixture.getSubId(0)]?.title).toBe(`sub`);
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.data[fixture.getSubId(1)]?.title).toBe(`1`);
  });
  test(`action.backItem`, async() => {
    const keyboardEvent = fixture.getEvent<any>();
    vi.spyOn(keyboardEvent.target, `selectionStart`, `get`).mockReturnValue(0);
    await sub.action.backItem({event: keyboardEvent, subId: fixture.getSubId(1)});
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.data[fixture.getSubId(0)]?.title).toBe(`sub1sub2`);
  });
  test(`action.deleteItem`, () => {
    sub.action.deleteItem({subId: fixture.getSubId(0)});
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.sort.length).toBe(2);
    fixture.execNotice();
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.sort.length).toBe(3);
  });
  test(`action.checkItem`, () => {
    const spyEvent = fixture.getEvent();
    sub.action.checkItem({event: spyEvent, subId: fixture.getSubId(0)});
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.data[fixture.getSubId(2)]?.check).toBe(true);
    vi.spyOn((spyEvent as any).target, `checked`, `get`).mockReturnValue(false);
    sub.action.checkItem({event: spyEvent, subId: fixture.getSubId(2)});
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.data[fixture.getSubId(2)]?.check).toBe(false);
  });
  test(`action.switchItem`, () => {
    sub.action.switchItem();
    expect(main.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.task).toBe(false);
    sub.action.switchItem();
    expect(main.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.task).toBe(true);
  });
  test(`action.switchEdit`, () => {
    sub.action.switchEdit({subId: fixture.getSubId(0)});
    expect(sub.state.status[fixture.getSubId(0)]).toBe(`edit`);
    sub.action.switchEdit();
    expect(sub.state.status[fixture.getSubId(0)]).toBe(``);
  });
  test(`action.inputMemo`, () => {
    sub.action.inputMemo({event: fixture.getEvent()});
    expect(sub.state.data[fixture.getListId(0)]!.data[fixture.getMainId(0)]!.data).toEqual({
      [sub.state.data[fixture.getListId(0)]!.data[fixture.getMainId(0)]!.sort[0]!]: {check: false, title: `sub0`},
      [sub.state.data[fixture.getListId(0)]!.data[fixture.getMainId(0)]!.sort[1]!]: {check: false, title: `sub1`},
      [sub.state.data[fixture.getListId(0)]!.data[fixture.getMainId(0)]!.sort[2]!]: {check: false, title: `sub2`},
    });
  });
  test(`action.openCalendar`, () => {
    sub.action.openCalendar({date: ``});
    fixture.execCalendar(`1999/12/31`);
    expect(main.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.date).toBe(`1999/12/31`);
  });
  test(`action.openClock`, () => {
    sub.action.openClock({time: ``});
    fixture.execClock(0, 47);
    expect(main.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.time).toBe(`00:47`);
  });
  test(`action.openAlarm`, () => {
    sub.action.openAlarm();
    fixture.dialogCheck([`1`, `2`]);
    expect(main.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.alarm).toEqual([`1`, `2`]);
  });
  test(`action.drag`, () => {
    sub.action.dragInit({event: fixture.getEvent<TouchEvent>(), subId: fixture.getSubId(0)});
    expect(sub.prop.drag.status).toBe(`start`);
    sub.action.dragStart({event: fixture.getEvent<TouchEvent>()});
    expect(sub.prop.drag.status).toBe(`move`);
    sub.action.dragMove({event: fixture.getEvent<TouchEvent>()});
    expect(sub.prop.drag.status).toBe(`move`);
    sub.action.dragEnd();
    expect(sub.prop.drag.status).not.toBeDefined();
  });
  test(`action.swipe`, () => {
    const touchEvent = fixture.getEvent<TouchEvent>();
    sub.action.swipeInit({event: touchEvent});
    expect(sub.prop.swipe.status).toBe(`start`);
    vi.spyOn(touchEvent.changedTouches[0]!, `clientX`, `get`).mockReturnValue(-16);
    sub.action.swipeStart({event: touchEvent});
    expect(sub.prop.swipe.status).toBe(`move`);
    sub.action.swipeMove({event: touchEvent});
    expect(sub.prop.swipe.status).toBe(`move`);
    sub.action.swipeEnd({event: touchEvent});
    expect(sub.prop.swipe.status).not.toBeDefined();
  });
});
