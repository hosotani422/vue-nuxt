import {expect, test, describe, beforeEach, vi} from 'vitest';
import fixture from '../../fixture/fixture';
import main from '@/stores/page/main';

describe(`main`, () => {
  beforeEach(() => {
    fixture.init();
  });
  afterEach(() => {
    fixture.reset();
  });
  test(`getter.stateFull`, () => {
    expect(main.getter.stateFull().sort).toEqual([fixture.getMainId(0), fixture.getMainId(1), fixture.getMainId(2)]);
    expect(main.getter.stateFull(fixture.getListId(0)).sort).toEqual([fixture.getMainId(0), fixture.getMainId(1), fixture.getMainId(2)]);
    expect(main.getter.stateFull(fixture.getListId(1)).sort).toEqual([]);
    expect(main.getter.stateFull(fixture.getListId(2)).sort).toEqual([main.state.data[fixture.getListId(2)]!.sort[0]]);
  });
  test(`getter.stateUnit`, () => {
    expect(main.getter.stateUnit()).toEqual({check: false, title: `main1`, task: true, date: ``, time: ``, alarm: []});
    expect(main.getter.stateUnit(fixture.getListId(0), fixture.getMainId(0))).toEqual({check: false, title: `main1`, task: true, date: ``, time: ``, alarm: []});
    expect(main.getter.stateUnit(fixture.getListId(0), fixture.getMainId(1))).toEqual({check: false, title: `main2`, task: true, date: ``, time: ``, alarm: []});
    expect(main.getter.stateUnit(fixture.getListId(0), fixture.getMainId(2))).toEqual({check: false, title: `main3`, task: true, date: ``, time: ``, alarm: []});
  });
  test(`getter.classItem`, () => {
    expect(main.getter.classItem(fixture.getMainId(0))).toEqual({select: true, check: false, edit: false, drag: false, hide: false});
    expect(main.getter.classItem(fixture.getMainId(1))).toEqual({select: false, check: false, edit: false, drag: false, hide: false});
    expect(main.getter.classItem(fixture.getMainId(2))).toEqual({select: false, check: false, edit: false, drag: false, hide: false});
  });
  test(`getter.classLimit`, () => {
    expect(main.getter.classLimit(fixture.getMainId(0))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
    expect(main.getter.classLimit(fixture.getMainId(1))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
    expect(main.getter.classLimit(fixture.getMainId(2))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
  });
  test(`getter.textCount`, () => {
    expect(main.getter.textCount(fixture.getMainId(0))).toBe(`3/3`);
    expect(main.getter.textCount(fixture.getMainId(1))).toBe(`1/1`);
    expect(main.getter.textCount(fixture.getMainId(2))).toBe(`1/1`);
  });
  test(`action.loadItem`, async() => {
    await main.action.loadItem();
    expect(main.state.data[fixture.getListId(0)]).not.toBeDefined();
  });
  test(`action.saveItem`, () => {
    main.action.saveItem();
    expect(JSON.parse(localStorage.getItem(`main`)!)[fixture.getListId(0)]).toBeDefined();
  });
  test(`action.insertItem`, () => {
    main.action.insertItem();
    fixture.dialogText(`main0`);
    expect(main.state.data[fixture.getListId(0)]!.sort.length).toBe(4);
    expect(main.state.data[fixture.getListId(0)]!.data[main.state.data[fixture.getListId(0)]!.sort[0]!]!.title).toBe(`main0`);
  });
  test(`action.copyItem`, () => {
    main.action.copyItem({event: fixture.getEvent(), mainId: fixture.getMainId(0)});
    expect(main.state.data[fixture.getListId(0)]!.sort.length).toBe(4);
    expect(main.state.data[fixture.getListId(0)]!.data[main.state.data[fixture.getListId(0)]!.sort[1]!]!.title).toBe(`main1`);
  });
  test(`action.moveItem`, () => {
    main.action.moveItem({event: fixture.getEvent(), mainId: fixture.getMainId(0)});
    fixture.dialogRadio(fixture.getListId(2));
    expect(main.state.data[fixture.getListId(0)]!.sort.length).toBe(2);
  });
  test(`action.deleteItem`, () => {
    main.action.deleteItem({event: fixture.getEvent(), mainId: fixture.getMainId(0)});
    expect(main.state.data[fixture.getListId(0)]!.sort.length).toBe(2);
    fixture.execNotice();
    expect(main.state.data[fixture.getListId(0)]!.sort.length).toBe(3);
  });
  test(`action.checkItem`, () => {
    const spyEvent = fixture.getEvent();
    main.action.checkItem({event: spyEvent, mainId: fixture.getMainId(0)});
    expect(main.state.data[fixture.getListId(0)]!.data[fixture.getMainId(2)]!.check).toBe(true);
    vi.spyOn((spyEvent as any).target, `checked`, `get`).mockReturnValue(false);
    main.action.checkItem({event: spyEvent, mainId: fixture.getMainId(2)});
    expect(main.state.data[fixture.getListId(0)]!.data[fixture.getMainId(2)]!.check).toBe(false);
  });
  test(`action.switchEdit`, () => {
    main.action.switchEdit({mainId: fixture.getMainId(0)});
    expect(main.state.status[fixture.getMainId(0)]).toBe(`edit`);
    main.action.switchEdit();
    expect(main.state.status[fixture.getMainId(0)]).toBe(``);
  });
  test(`action.drag`, () => {
    main.action.dragInit({event: fixture.getEvent<TouchEvent>(), mainId: fixture.getMainId(0)});
    expect(main.prop.drag.status).toBe(`start`);
    main.action.dragStart({event: fixture.getEvent<TouchEvent>()});
    expect(main.prop.drag.status).toBe(`move`);
    main.action.dragMove({event: fixture.getEvent<TouchEvent>()});
    expect(main.prop.drag.status).toBe(`move`);
    main.action.dragEnd();
    expect(main.prop.drag.status).not.toBeDefined();
  });
});
