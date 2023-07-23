import {describe, it, expect} from 'vitest';
import fixture from '../../fixture/fixture';
import main from '@/stores/page/main';
import sub from '@/stores/page/sub';

describe(`PageSub`, () => {
  beforeEach(async() => {
    await fixture.loadData();
    await fixture.mountSub();
    fixture.entryMock();
  });
  afterEach(() => {
    fixture.resetMock();
  });
  it(`getter.stateFull`, () => {
    expect(sub.getter.stateFull().sort).toEqual([fixture.getSubId(0), fixture.getSubId(1), fixture.getSubId(2)]);
    expect(sub.getter.stateFull(fixture.getListId(0), fixture.getMainId(0)).sort).toEqual([fixture.getSubId(0), fixture.getSubId(1), fixture.getSubId(2)]);
    expect(sub.getter.stateFull(fixture.getListId(0), fixture.getMainId(1)).sort.length).toBe(1);
    expect(sub.getter.stateFull(fixture.getListId(0), fixture.getMainId(2)).sort.length).toBe(1);
  });
  it(`getter.stateUnit`, () => {
    expect(sub.getter.stateUnit(``, ``, fixture.getSubId(0))).toEqual({check: false, title: `sub1`});
    expect(sub.getter.stateUnit(fixture.getListId(0), fixture.getMainId(0), fixture.getSubId(0))).toEqual({check: false, title: `sub1`});
    expect(sub.getter.stateUnit(fixture.getListId(0), fixture.getMainId(0), fixture.getSubId(1))).toEqual({check: false, title: `sub2`});
    expect(sub.getter.stateUnit(fixture.getListId(0), fixture.getMainId(0), fixture.getSubId(2))).toEqual({check: false, title: `sub3`});
  });
  it(`getter.classItem`, () => {
    expect(sub.getter.classItem(fixture.getSubId(0))).toEqual({check: false, edit: false, drag: false, hide: false});
    expect(sub.getter.classItem(fixture.getSubId(1))).toEqual({check: false, edit: false, drag: false, hide: false});
    expect(sub.getter.classItem(fixture.getSubId(2))).toEqual({check: false, edit: false, drag: false, hide: false});
  });
  it(`getter.textMemo`, () => {
    expect(sub.getter.textMemo()).toBe(`sub1\nsub2\nsub3`);
  });
  it(`getter.classLimit`, () => {
    expect(sub.getter.classLimit()).toEqual({'text-theme-care': false, 'text-theme-warn': false});
  });
  it(`getter.textAlarm`, () => {
    expect(sub.getter.textAlarm()).toBe(``);
  });
  it(`action.loadItem`, async() => {
    vi.spyOn(await import(`vue-router`), `useRoute`).mockReturnValue({params: {listId: `list0000000000000`, mainId: `main0000000000000`}} as any);
    await Promise.all([
      main.action.loadItem(),
      sub.action.loadItem(),
    ]);
    expect(sub.state.data[fixture.getListId(0)]).not.toBeDefined();
  });
  it(`action.saveItem`, () => {
    sub.action.saveItem();
    expect(JSON.parse(localStorage.getItem(`sub`)!)[fixture.getListId(0)]).toBeDefined();
  });
  it(`action.enterItem`, async() => {
    await sub.action.enterItem({subId: fixture.getSubId(0), selectionStart: 3});
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.data[fixture.getSubId(0)]?.title).toBe(`sub`);
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.data[fixture.getSubId(1)]?.title).toBe(`1`);
  });
  it(`action.backItem`, async() => {
    await sub.action.backItem({subId: fixture.getSubId(1)});
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.data[fixture.getSubId(0)]?.title).toBe(`sub1sub2`);
  });
  it(`action.deleteItem`, () => {
    sub.action.deleteItem({subId: fixture.getSubId(0)});
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.sort.length).toBe(2);
    fixture.execNotice();
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.sort.length).toBe(3);
  });
  it(`action.checkItem`, () => {
    sub.action.checkItem({subId: fixture.getSubId(0), checked: true});
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.data[fixture.getSubId(2)]?.check).toBe(true);
    sub.action.checkItem({subId: fixture.getSubId(2), checked: false});
    expect(sub.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.data[fixture.getSubId(2)]?.check).toBe(false);
  });
  it(`action.switchItem`, () => {
    sub.action.switchItem();
    expect(main.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.task).toBe(false);
    sub.action.switchItem();
    expect(main.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.task).toBe(true);
  });
  it(`action.switchEdit`, () => {
    sub.action.switchEdit({subId: fixture.getSubId(0)});
    expect(sub.state.status[fixture.getSubId(0)]).toBe(`edit`);
    sub.action.switchEdit();
    expect(sub.state.status[fixture.getSubId(0)]).toBe(``);
  });
  it(`action.inputMemo`, () => {
    sub.action.inputMemo({value: `sub0\nsub1\nsub2`});
    expect(sub.state.data[fixture.getListId(0)]!.data[fixture.getMainId(0)]!.data).toEqual({
      [sub.state.data[fixture.getListId(0)]!.data[fixture.getMainId(0)]!.sort[0]!]: {check: false, title: `sub0`},
      [sub.state.data[fixture.getListId(0)]!.data[fixture.getMainId(0)]!.sort[1]!]: {check: false, title: `sub1`},
      [sub.state.data[fixture.getListId(0)]!.data[fixture.getMainId(0)]!.sort[2]!]: {check: false, title: `sub2`},
    });
  });
  it(`action.openCalendar`, () => {
    sub.action.openCalendar({date: ``});
    fixture.execCalendar(`1999/12/31`);
    expect(main.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.date).toBe(`1999/12/31`);
  });
  it(`action.openClock`, () => {
    sub.action.openClock({time: ``});
    fixture.execClock(0, 47);
    expect(main.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.time).toBe(`00:47`);
  });
  it(`action.openAlarm`, () => {
    sub.action.openAlarm();
    fixture.dialogCheck([`1`, `2`]);
    expect(main.state.data[fixture.getListId(0)]?.data[fixture.getMainId(0)]?.alarm).toEqual([`1`, `2`]);
  });
  it(`action.drag`, () => {
    sub.action.dragInit({subId: fixture.getSubId(0), clientY: 0});
    expect(sub.prop.drag.status).toBe(`start`);
    sub.action.dragStart();
    expect(sub.prop.drag.status).toBe(`move`);
    sub.action.dragMove({clientY: 0});
    expect(sub.prop.drag.status).toBe(`move`);
    sub.action.dragEnd();
    expect(sub.prop.drag.status).toBe(`end`);
  });
  it(`action.swipe`, () => {
    sub.action.swipeInit({target: fixture.getTarget(), clientX: 0, clientY: 0});
    expect(sub.prop.swipe.status).toBe(`start`);
    sub.action.swipeStart({clientX: -16, clientY: 0});
    expect(sub.prop.swipe.status).toBe(`move`);
    sub.action.swipeMove({clientX: -16});
    expect(sub.prop.swipe.status).toBe(`move`);
    sub.action.swipeEnd({clientX: -16});
    expect(sub.prop.swipe.status).not.toBeDefined();
  });
});
