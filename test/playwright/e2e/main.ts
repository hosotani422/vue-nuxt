import {test, expect} from '@playwright/test';
import Fixture from '../fixture/fixture';

test.describe(`main`, () => {
  let fixture: Fixture | null = null;
  test.beforeEach(async({page}) => {
    fixture = new Fixture(page);
    await fixture!.startMain();
  });
  test(`create`, async({page}) => {
    await page.getByTestId(`MainPlus`).click();
    await fixture!.textDialog(`main2`);
    await expect(page.getByTestId(`MainItem`)).toHaveCount(4);
  });
  test(`clone`, async({page}) => {
    await fixture!.longClick(page.getByTestId(`MainItem`).first());
    await page.getByTestId(`MainClone`).click();
    await expect(page.getByTestId(`MainItem`)).toHaveCount(4);
  });
  test(`edit`, async({page}) => {
    await page.getByTestId(`MainItem`).first().click();
    await page.getByTestId(`SubTitle`).fill(`main0`);
    await page.getByTestId(`SubRight`).click();
    await expect(page.getByTestId(`MainTask`).first()).toHaveText(`main0`);
  });
  test(`check`, async({page}) => {
    await page.getByTestId(`MainCheck`).first().check();
    await expect(page.getByTestId(`MainCheck`).last()).toBeChecked();
    await page.getByTestId(`MainCheck`).last().uncheck();
    await expect(page.getByTestId(`MainCheck`).last()).not.toBeChecked();
  });
  test(`move`, async({page}) => {
    await fixture!.longClick(page.getByTestId(`MainItem`).first());
    await page.getByTestId(`MainMove`).click();
    await fixture!.checkDialog(page.getByTestId(`DialogRadio`).last());
    await expect(page.getByTestId(`MainItem`)).toHaveCount(2);
  });
  test(`delete`, async({page}) => {
    await fixture!.longClick(page.getByTestId(`MainItem`).first());
    await page.getByTestId(`MainTrash`).click();
    await expect(page.getByTestId(`MainItem`)).toHaveCount(2);
    await page.getByTestId(`NoticeBack`).click();
    await expect(page.getByTestId(`MainItem`)).toHaveCount(3);
  });
});
