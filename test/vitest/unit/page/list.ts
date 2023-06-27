import {expect, test, describe, beforeEach, vi} from 'vitest';
import fixture from '../../fixture/fixture';
import list from '@/stores/page/list';

describe(`list`, () => {
  beforeEach(() => {
    fixture.init();
  });
  afterEach(() => {
    fixture.reset();
  });
  test(`getter.stateFull`, () => {
    expect(list.getter.stateFull().sort).toEqual([fixture.getListId(0), fixture.getListId(1), fixture.getListId(2)]);
  });
  test(`getter.stateUnit`, () => {
    expect(list.getter.stateUnit()).toEqual({title: `list1`});
    expect(list.getter.stateUnit(fixture.getListId(0))).toEqual({title: `list1`});
    expect(list.getter.stateUnit(fixture.getListId(1))).toEqual({title: `Inbox`});
    expect(list.getter.stateUnit(fixture.getListId(2))).toEqual({title: `Trash`});
  });
  test(`getter.classItem`, () => {
    expect(list.getter.classItem(fixture.getListId(0))).toEqual({select: true, edit: false, hide: false});
    expect(list.getter.classItem(fixture.getListId(1))).toEqual({select: false, edit: false, hide: false});
    expect(list.getter.classItem(fixture.getListId(2))).toEqual({select: false, edit: false, hide: false});
  });
  test(`getter.iconType`, () => {
    expect(list.getter.iconType(fixture.getListId(0))).toBe(`ItemIconList`);
    expect(list.getter.iconType(fixture.getListId(1))).toBe(`ItemIconInbox`);
    expect(list.getter.iconType(fixture.getListId(2))).toBe(`ItemIconTrash`);
  });
  test(`getter.classLimit`, () => {
    expect(list.getter.classLimit(fixture.getListId(0))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
    expect(list.getter.classLimit(fixture.getListId(1))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
    expect(list.getter.classLimit(fixture.getListId(2))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
  });
  test(`getter.textCount`, () => {
    expect(list.getter.textCount(fixture.getListId(0))).toBe(`3/3`);
    expect(list.getter.textCount(fixture.getListId(1))).toBe(`0/0`);
    expect(list.getter.textCount(fixture.getListId(2))).toBe(`1/1`);
  });
  test(`action.loadItem`, async() => {
    const listId = fixture.getListId(0);
    await list.action.loadItem();
    expect(list.state.data.data[listId]).not.toBeDefined();
  });
  test(`action.saveItem`, () => {
    list.action.saveItem();
    expect(JSON.parse(localStorage.getItem(`list`)!).data[fixture.getListId(0)]).toBeDefined();
  });
  test(`action.insertItem`, () => {
    list.action.insertItem();
    fixture.dialogText(`list0`);
    expect(list.state.data.sort.length).toBe(4);
    expect(list.state.data.data[list.state.data.sort[0]!]!.title).toBe(`list0`);
  });
  test(`action.copyItem`, () => {
    list.action.copyItem({event: fixture.getEvent(), listId: fixture.getListId(0)});
    expect(list.state.data.sort.length).toBe(4);
    expect(list.state.data.data[list.state.data.sort[1]!]!.title).toBe(`list1`);
  });
  test(`action.deleteItem`, () => {
    list.action.deleteItem({event: fixture.getEvent(), listId: fixture.getListId(0)});
    fixture.dialogConfirm();
    expect(list.state.data.sort.length).toBe(2);
    fixture.execNotice();
    expect(list.state.data.sort.length).toBe(3);
  });
  test(`action.switchEdit`, () => {
    list.action.switchEdit({listId: fixture.getListId(0)});
    expect(list.state.status[fixture.getListId(0)]).toBe(`edit`);
    list.action.switchEdit();
    expect(list.state.status[fixture.getListId(0)]).toBe(``);
  });
  test(`action.drag`, () => {
    list.action.dragInit({event: fixture.getEvent<TouchEvent>(), listId: fixture.getListId(0)});
    expect(list.prop.drag.status).toBe(`start`);
    list.action.dragStart({event: fixture.getEvent<TouchEvent>()});
    expect(list.prop.drag.status).toBe(`move`);
    list.action.dragMove({event: fixture.getEvent<TouchEvent>()});
    expect(list.prop.drag.status).toBe(`move`);
    list.action.dragEnd();
    expect(list.prop.drag.status).not.toBeDefined();
  });
  test(`action.swipe`, () => {
    const touchEvent = fixture.getEvent<TouchEvent>();
    list.action.swipeInit({event: touchEvent});
    expect(list.prop.swipe.status).toBe(`start`);
    vi.spyOn(touchEvent.changedTouches[0]!, `clientX`, `get`).mockReturnValue(16);
    list.action.swipeStart({event: touchEvent});
    expect(list.prop.swipe.status).toBe(`move`);
    list.action.swipeMove({event: touchEvent});
    expect(list.prop.swipe.status).toBe(`move`);
    list.action.swipeEnd({event: touchEvent});
    expect(list.prop.swipe.status).not.toBeDefined();
  });
});
