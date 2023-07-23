import {describe, it, expect} from 'vitest';
import fixture from '../../fixture/fixture';
import dialog from '@/stores/popup/dialog';

describe(`PopupDialog`, () => {
  beforeEach(async() => {
    await fixture.loadData();
    await fixture.mountDialog();
    fixture.entryMock();
  });
  afterEach(() => {
    fixture.resetMock();
  });
  it(`getter.stateCheckAll`, () => {
    expect(dialog.getter.stateCheckAll()).toBe(false);
  });
  it(`action.open`, () => {
    dialog.action.open({mode: `confirm`, title: ``, message: ``});
    expect(dialog.state.open).toBe(true);
  });
  it(`action.close`, () => {
    dialog.action.close();
    expect(dialog.state.open).toBe(false);
  });
  it(`action.clickCheckAll`, () => {
    dialog.action.clickCheckAll({checked: true});
    expect(dialog.state.check.data).toEqual({dialog: {check: true, title: ``}});
  });
});
