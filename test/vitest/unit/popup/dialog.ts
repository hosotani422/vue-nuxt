import {expect, test, describe, beforeEach} from 'vitest';
import fixture from '../../fixture/fixture';
import dialog from '@/stores/popup/dialog';

describe(`dialog`, () => {
  beforeEach(() => {
    fixture.init();
  });
  afterEach(() => {
    fixture.reset();
  });
  test(`getter.stateCheckAll`, () => {
    expect(dialog.getter.stateCheckAll()).toBe(false);
  });
  test(`action.open`, () => {
    dialog.action.open({mode: `confirm`, title: ``, message: ``});
    expect(dialog.state.open).toBe(true);
  });
  test(`action.close`, () => {
    dialog.action.close();
    expect(dialog.state.open).toBe(false);
  });
  test(`action.clickCheckAll`, () => {
    dialog.action.clickCheckAll({event: fixture.getEvent()});
    expect(dialog.state.check.data).toEqual({dialog: {check: true, title: ``}});
  });
});
