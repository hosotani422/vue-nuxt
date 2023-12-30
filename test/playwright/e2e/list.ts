import { test as base, expect } from "@playwright/test";
import Fixture from "../fixture/fixture";

const test = base.extend<{ fixture: Fixture }>({
  fixture: async ({ page }, use) => {
    await use(new Fixture(page));
  },
});

test.describe(`list`, () => {
  test.beforeEach(async ({ fixture }) => {
    await fixture.initList();
  });
  test(`route`, async ({ page }) => {
    await expect(page).toHaveURL(`/list1111111111111/list`);
    await page.getByTestId(`ListLeft`).click();
    await expect(page.getByTestId(`ListRoot`)).toHaveCount(0);
  });
  test(`create`, async ({ page, fixture }) => {
    await page.getByTestId(`ListPlus`).click();
    await fixture.textDialog(`list4`);
    await expect(page.getByTestId(`ListItem`)).toHaveCount(4);
  });
  test(`clone`, async ({ page, fixture }) => {
    await fixture.longClick(page.getByTestId(`ListItem`).first());
    await page.getByTestId(`ListClone`).click();
    await expect(page.getByTestId(`ListItem`)).toHaveCount(4);
  });
  test(`edit`, async ({ page }) => {
    await page.getByTestId(`ListItem`).first().click();
    await page.getByTestId(`MainTitle`).fill(`list0`);
    await page.getByTestId(`MainList`).click();
    await expect(page.getByTestId(`ListTask`).first()).toHaveText(`list0`);
  });
  test(`remove`, async ({ page, fixture }) => {
    await fixture.longClick(page.getByTestId(`ListItem`).nth(1));
    await page.getByTestId(`ListTrash`).click();
    await page.getByTestId(`DialogOk`).click();
    await expect(page.getByTestId(`ListItem`)).toHaveCount(2);
    await page.getByTestId(`NoticeBack`).click();
    await expect(page.getByTestId(`ListItem`)).toHaveCount(3);
  });
  test(`current`, async ({ page, fixture }) => {
    await fixture.longClick(page.getByTestId(`ListItem`).first());
    await expect(page.getByTestId(`ListClone`)).toHaveCount(1);
    await expect(page.getByTestId(`ListTrash`)).toHaveCount(0);
  });
  test(`trash`, async ({ page, fixture }) => {
    await fixture.longClick(page.getByTestId(`ListItem`).last());
    await expect(page.getByTestId(`ListClone`)).toHaveCount(0);
    await expect(page.getByTestId(`ListTrash`)).toHaveCount(0);
  });
});
