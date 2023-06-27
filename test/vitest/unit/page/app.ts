import {expect, test, describe, beforeEach} from 'vitest';
import fixture from '../../fixture/fixture';
import app from '@/stores/page/app';
import main from '@/stores/page/main';

describe(`app`, () => {
  beforeEach(() => {
    fixture.init();
  });
  afterEach(() => {
    fixture.reset();
  });
  test(`getter.isApp`, () => {
    expect(app.getter.isApp()).toBe(false);
  });
  test(`getter.listId`, () => {
    expect(app.getter.listId()).toBe(fixture.getListId(0));
  });
  test(`getter.mainId`, () => {
    expect(app.getter.mainId()).toBe(fixture.getMainId(0));
  });
  test(`getter.lang`, () => {
    expect(app.getter.lang().button.cancel).toBe(`キャンセル`);
  });
  test(`getter.classTop`, () => {
    expect(app.getter.classTop()).toBe(`dark speed2 text-base`);
  });
  test(`getter.classBottom`, () => {
    expect(app.getter.classBottom()).toBe(`flex-[0_0_50px]`);
  });
  test(`action.saveRoute`, () => {
    app.action.saveRoute({listId: fixture.getListId(0)});
    expect(localStorage.getItem(`route`)).toBe(fixture.getListId(0));
  });
  test(`action.clearTrash`, () => {
    app.action.clearTrash();
    expect(main.state.data[fixture.getListId(2)]!.sort).toEqual([]);
  });
});
