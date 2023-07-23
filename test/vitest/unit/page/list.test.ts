import {describe, it, expect} from 'vitest';
import fixture from '../../fixture/fixture';
import list from '@/stores/page/list';

describe(`PageList`, () => {
  beforeEach(async() => {
    await fixture.loadData();
    await fixture.mountList();
    fixture.entryMock();
  });
  afterEach(() => {
    fixture.resetMock();
  });
  it(`getter.stateFull`, () => {
    expect(list.getter.stateFull().sort).toEqual([fixture.getListId(0), fixture.getListId(1), fixture.getListId(2)]);
  });
  it(`getter.stateUnit`, () => {
    expect(list.getter.stateUnit()).toEqual({title: `list1`});
    expect(list.getter.stateUnit(fixture.getListId(0))).toEqual({title: `list1`});
    expect(list.getter.stateUnit(fixture.getListId(1))).toEqual({title: `Inbox`});
    expect(list.getter.stateUnit(fixture.getListId(2))).toEqual({title: `Trash`});
  });
  it(`getter.classItem`, () => {
    expect(list.getter.classItem(fixture.getListId(0))).toEqual({select: true, edit: false, hide: false});
    expect(list.getter.classItem(fixture.getListId(1))).toEqual({select: false, edit: false, hide: false});
    expect(list.getter.classItem(fixture.getListId(2))).toEqual({select: false, edit: false, hide: false});
  });
  it(`getter.iconType`, () => {
    expect(list.getter.iconType(fixture.getListId(0))).toBe(`ItemIconList`);
    expect(list.getter.iconType(fixture.getListId(1))).toBe(`ItemIconInbox`);
    expect(list.getter.iconType(fixture.getListId(2))).toBe(`ItemIconTrash`);
  });
  it(`getter.classLimit`, () => {
    expect(list.getter.classLimit(fixture.getListId(0))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
    expect(list.getter.classLimit(fixture.getListId(1))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
    expect(list.getter.classLimit(fixture.getListId(2))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
  });
  it(`getter.textCount`, () => {
    expect(list.getter.textCount(fixture.getListId(0))).toBe(`3/3`);
    expect(list.getter.textCount(fixture.getListId(1))).toBe(`0/0`);
    expect(list.getter.textCount(fixture.getListId(2))).toBe(`1/1`);
  });
  it(`action.loadItem`, async() => {
    const listId = fixture.getListId(0);
    await list.action.loadItem();
    expect(list.state.data.data[listId]).not.toBeDefined();
  });
  it(`action.saveItem`, () => {
    list.action.saveItem();
    expect(JSON.parse(localStorage.getItem(`list`)!).data[fixture.getListId(0)]).toBeDefined();
  });
  it(`action.insertItem`, () => {
    list.action.insertItem();
    fixture.dialogText(`list0`);
    expect(list.state.data.sort.length).toBe(4);
    expect(list.state.data.data[list.state.data.sort[0]!]!.title).toBe(`list0`);
  });
  it(`action.copyItem`, () => {
    list.action.copyItem({listId: fixture.getListId(0)});
    expect(list.state.data.sort.length).toBe(4);
    expect(list.state.data.data[list.state.data.sort[1]!]!.title).toBe(`list1`);
  });
  it(`action.deleteItem`, () => {
    list.action.deleteItem({listId: fixture.getListId(0)});
    fixture.dialogConfirm();
    expect(list.state.data.sort.length).toBe(2);
    fixture.execNotice();
    expect(list.state.data.sort.length).toBe(3);
  });
  it(`action.switchEdit`, () => {
    list.action.switchEdit({listId: fixture.getListId(0)});
    expect(list.state.status[fixture.getListId(0)]).toBe(`edit`);
    list.action.switchEdit();
    expect(list.state.status[fixture.getListId(0)]).toBe(``);
  });
  it(`action.drag`, () => {
    list.action.dragInit({listId: fixture.getListId(0), clientY: 0});
    expect(list.prop.drag.status).toBe(`start`);
    list.action.dragStart();
    expect(list.prop.drag.status).toBe(`move`);
    list.action.dragMove({clientY: 0});
    expect(list.prop.drag.status).toBe(`move`);
    list.action.dragEnd();
    expect(list.prop.drag.status).toBe(`end`);
  });
  it(`action.swipe`, () => {
    list.action.swipeInit({target: fixture.getTarget(), clientX: 0, clientY: 0});
    expect(list.prop.swipe.status).toBe(`start`);
    list.action.swipeStart({clientX: 16, clientY: 0});
    expect(list.prop.swipe.status).toBe(`move`);
    list.action.swipeMove({clientX: 16});
    expect(list.prop.swipe.status).toBe(`move`);
    list.action.swipeEnd({clientX: 16});
    expect(list.prop.swipe.status).not.toBeDefined();
  });
});
