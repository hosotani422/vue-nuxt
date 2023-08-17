import {describe, it, expect} from 'vitest';
import fixture from '../../fixture/fixture';
import main from '@/stores/page/main';
import sub from '@/stores/page/sub';

describe(`PageMain`, () => {
  beforeEach(async() => {
    await fixture.loadData();
    await fixture.mountMain();
    fixture.entryMock();
  });
  afterEach(() => {
    fixture.resetMock();
  });
  it(`getter.stateFull`, () => {
    expect(main.getter.stateFull().sort).toEqual([fixture.getMainId(0), fixture.getMainId(1), fixture.getMainId(2)]);
    expect(main.getter.stateFull(fixture.getListId(0)).sort).toEqual([fixture.getMainId(0), fixture.getMainId(1), fixture.getMainId(2)]);
    expect(main.getter.stateFull(fixture.getListId(1)).sort).toEqual([]);
    expect(main.getter.stateFull(fixture.getListId(2)).sort).toEqual([main.state.data[fixture.getListId(2)]!.sort[0]]);
  });
  it(`getter.stateUnit`, () => {
    expect(main.getter.stateUnit()).toEqual({check: false, title: `main1`, task: true, date: ``, time: ``, alarm: []});
    expect(main.getter.stateUnit(fixture.getListId(0), fixture.getMainId(0))).toEqual({check: false, title: `main1`, task: true, date: ``, time: ``, alarm: []});
    expect(main.getter.stateUnit(fixture.getListId(0), fixture.getMainId(1))).toEqual({check: false, title: `main2`, task: true, date: ``, time: ``, alarm: []});
    expect(main.getter.stateUnit(fixture.getListId(0), fixture.getMainId(2))).toEqual({check: false, title: `main3`, task: true, date: ``, time: ``, alarm: []});
  });
  it(`getter.classItem`, () => {
    expect(main.getter.classItem(fixture.getMainId(0))).toEqual({select: true, check: false, edit: false, drag: false, hide: false});
    expect(main.getter.classItem(fixture.getMainId(1))).toEqual({select: false, check: false, edit: false, drag: false, hide: false});
    expect(main.getter.classItem(fixture.getMainId(2))).toEqual({select: false, check: false, edit: false, drag: false, hide: false});
  });
  it(`getter.classLimit`, () => {
    expect(main.getter.classLimit(fixture.getMainId(0))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
    expect(main.getter.classLimit(fixture.getMainId(1))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
    expect(main.getter.classLimit(fixture.getMainId(2))).toEqual({'text-theme-care': false, 'text-theme-warn': false});
  });
  it(`getter.textCount`, () => {
    expect(main.getter.textCount(fixture.getMainId(0))).toBe(`3/3`);
    expect(main.getter.textCount(fixture.getMainId(1))).toBe(`1/1`);
    expect(main.getter.textCount(fixture.getMainId(2))).toBe(`1/1`);
  });
  it(`action.loadItem`, async() => {
    vi.spyOn(await import(`vue-router`), `useRoute`).mockReturnValue({params: {listId: `list0000000000000`, mainId: `main0000000000000`}} as any);
    await Promise.all([
      main.action.loadItem(),
      sub.action.loadItem(),
    ]);
    expect(main.state.data[fixture.getListId(0)]).not.toBeDefined();
  });
  it(`action.saveItem`, () => {
    main.action.saveItem();
    expect(JSON.parse(localStorage.getItem(`main`)!)[fixture.getListId(0)]).toBeDefined();
  });
  it(`action.insertItem`, () => {
    main.action.insertItem();
    fixture.dialogText(`main0`);
    expect(main.state.data[fixture.getListId(0)]!.sort.length).toBe(4);
    expect(main.state.data[fixture.getListId(0)]!.data[main.state.data[fixture.getListId(0)]!.sort[0]!]!.title).toBe(`main0`);
  });
  it(`action.copyItem`, () => {
    main.action.copyItem({mainId: fixture.getMainId(0)});
    expect(main.state.data[fixture.getListId(0)]!.sort.length).toBe(4);
    expect(main.state.data[fixture.getListId(0)]!.data[main.state.data[fixture.getListId(0)]!.sort[1]!]!.title).toBe(`main1`);
  });
  it(`action.moveItem`, () => {
    main.action.moveItem({mainId: fixture.getMainId(0)});
    fixture.dialogRadio(fixture.getListId(2));
    expect(main.state.data[fixture.getListId(0)]!.sort.length).toBe(2);
  });
  it(`action.deleteItem`, () => {
    main.action.deleteItem({mainId: fixture.getMainId(0)});
    expect(main.state.data[fixture.getListId(0)]!.sort.length).toBe(2);
    fixture.execNotice();
    expect(main.state.data[fixture.getListId(0)]!.sort.length).toBe(3);
  });
  it(`action.checkItem`, () => {
    main.action.checkItem({mainId: fixture.getMainId(0), checked: true});
    expect(main.state.data[fixture.getListId(0)]!.data[fixture.getMainId(2)]!.check).toBe(true);
    main.action.checkItem({mainId: fixture.getMainId(2), checked: false});
    expect(main.state.data[fixture.getListId(0)]!.data[fixture.getMainId(2)]!.check).toBe(false);
  });
  it(`action.switchEdit`, () => {
    main.action.switchEdit({mainId: fixture.getMainId(0)});
    expect(main.state.status[fixture.getMainId(0)]).toBe(`edit`);
    main.action.switchEdit();
    expect(main.state.status[fixture.getMainId(0)]).toBe(``);
  });
  it(`action.drag`, () => {
    main.action.dragInit({mainId: fixture.getMainId(0), clientY: 0});
    expect(main.prop.drag.status).toBe(`start`);
    main.action.dragStart();
    expect(main.prop.drag.status).toBe(`move`);
    main.action.dragMove({clientY: 0});
    expect(main.prop.drag.status).toBe(`move`);
    main.action.dragEnd();
    expect(main.prop.drag.status).toBe(`end`);
  });
});
