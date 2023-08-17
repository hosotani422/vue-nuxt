import {describe, it, expect} from 'vitest';
import fixture from '../../fixture/fixture';
import app from '@/stores/page/app';
import main from '@/stores/page/main';

describe(`PageApp`, () => {
  beforeEach(async() => {
    await fixture.loadData();
    await fixture.mountApp();
    fixture.entryMock();
  });
  afterEach(() => {
    fixture.resetMock();
  });
  it(`getter.isApp`, () => {
    expect(app.getter.isApp()).toBe(false);
  });
  it(`getter.listId`, () => {
    expect(app.getter.listId()).toBe(fixture.getListId(0));
  });
  it(`getter.mainId`, () => {
    expect(app.getter.mainId()).toBe(fixture.getMainId(0));
  });
  it(`getter.lang`, () => {
    expect(app.getter.lang().button.cancel).toBe(`キャンセル`);
  });
  it(`getter.classTop`, () => {
    expect(app.getter.classTop()).toBe(`dark speed2 text-base`);
  });
  it(`getter.classBottom`, () => {
    expect(app.getter.classBottom()).toBe(`flex-[0_0_90px]`);
  });
  it(`action.saveRoute`, () => {
    app.action.saveRoute({listId: fixture.getListId(0)});
    expect(localStorage.getItem(`route`)).toBe(fixture.getListId(0));
  });
  it(`action.clearTrash`, () => {
    app.action.clearTrash();
    expect(main.state.data[fixture.getListId(2)]!.sort).toEqual([]);
  });
});
