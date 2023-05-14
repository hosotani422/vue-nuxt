import {test, expect} from '@playwright/test';
import Fixture from '../fixture/fixture';

test.describe(`list`, () => {
  let fixture: Fixture | null = null;
  test.beforeEach(async({page}) => {
    fixture = new Fixture(page);
    await fixture!.startList();
  });
  test(`route`, async({page}) => {
    await expect(page).toHaveURL(`/list1685704768236/list`);
    await page.getByTestId(`ListLeft`).click();
    await expect(page.getByTestId(`ListRoot`)).toHaveCount(0);
  });
  test(`create`, async({page}) => {
    await page.getByTestId(`ListPlus`).click();
    await fixture!.textDialog(`list1`);
    await expect(page.getByTestId(`ListItem`)).toHaveCount(4);
  });
  test(`clone`, async({page}) => {
    await fixture!.longClick(page.getByTestId(`ListItem`).first());
    await page.getByTestId(`ListClone`).click();
    await expect(page.getByTestId(`ListItem`)).toHaveCount(4);
  });
  test(`edit`, async({page}) => {
    await page.getByTestId(`ListItem`).first().click();
    await page.getByTestId(`MainTitle`).fill(`list2`);
    await page.getByTestId(`MainList`).click();
    await expect(page.getByTestId(`ListTask`).first()).toHaveText(`list2`);
  });
  test(`remove`, async({page}) => {
    await fixture!.longClick(page.getByTestId(`ListItem`).nth(1));
    await page.getByTestId(`ListTrash`).click();
    await page.getByTestId(`DialogOk`).click();
    await expect(page.getByTestId(`ListItem`)).toHaveCount(2);
    await page.getByTestId(`NoticeBack`).click();
    await expect(page.getByTestId(`ListItem`)).toHaveCount(3);
  });
  test(`current`, async({page}) => {
    await fixture!.longClick(page.getByTestId(`ListItem`).first());
    await expect(page.getByTestId(`ListClone`)).toHaveCount(1);
    await expect(page.getByTestId(`ListTrash`)).toHaveCount(0);
  });
  test(`trash`, async({page}) => {
    await fixture!.longClick(page.getByTestId(`ListItem`).last());
    await expect(page.getByTestId(`ListClone`)).toHaveCount(0);
    await expect(page.getByTestId(`ListTrash`)).toHaveCount(0);
  });
});
