import { test as base, expect } from "@playwright/test";
import Fixture from "../fixture/fixture";

const test = base.extend<{ fixture: Fixture }>({
  fixture: async ({ page, context }, use) => {
    await use(new Fixture(page, context));
  },
});

test.describe(`main`, () => {
  test.beforeEach(async ({ fixture }) => {
    await fixture.init();
  });
  test.describe(`init`, () => {
    test(`header`, async ({ page }) => {
      await expect(page).toHaveTitle(`Memotea`);
      await expect(page).toHaveURL(`/list1111111111111`);
      await expect(page.getByLabel(`main`).getByRole(`img`, { name: `list` })).toHaveCount(1);
      await expect(page.getByLabel(`main`).getByRole(`img`, { name: `list` })).toBeVisible();
      await expect(page.getByLabel(`main`).getByRole(`textbox`, { name: `リスト` })).toHaveCount(1);
      await expect(page.getByLabel(`main`).getByRole(`textbox`, { name: `リスト` })).toBeVisible();
      await expect(page.getByLabel(`main`).getByRole(`textbox`, { name: `リスト` })).toHaveValue(`list1`);
      await expect(page.getByLabel(`main`).getByRole(`img`, { name: `conf` })).toHaveCount(1);
      await expect(page.getByLabel(`main`).getByRole(`img`, { name: `conf` })).toBeVisible();
      await expect(page.getByLabel(`main`).getByRole(`img`, { name: `plus` })).toHaveCount(1);
      await expect(page.getByLabel(`main`).getByRole(`img`, { name: `plus` })).toBeVisible();
    });
    test(`main/checkbox`, async ({ page }) => {
      await expect(page.getByLabel(`main`).getByRole(`listitem`)).toHaveCount(2);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).toHaveCount(1);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).toBeVisible();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).not.toBeChecked();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(1).getByRole(`checkbox`)).toHaveCount(1);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(1).getByRole(`checkbox`)).toBeVisible();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(1).getByRole(`checkbox`)).toBeChecked();
    });
    test(`main/title`, async ({ page }) => {
      await expect(
        page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`heading`, { name: `main1` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`heading`, { name: `main1` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`main`).getByRole(`listitem`).nth(1).getByRole(`heading`, { name: `main2` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`main`).getByRole(`listitem`).nth(1).getByRole(`heading`, { name: `main2` }),
      ).toBeVisible();
    });
    test(`main/count`, async ({ page }) => {
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByText(`1/2`)).toHaveCount(1);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByText(`1/2`)).toBeVisible();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(1).getByText(`0/0`)).toHaveCount(1);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(1).getByText(`0/0`)).toBeVisible();
    });
  });
  test.describe(`route`, () => {
    test(`list`, async ({ page }) => {
      await page.getByLabel(`main`).getByRole(`img`, { name: `list` }).click();
      await expect(page).toHaveURL(`/list1111111111111/list`);
    });
    test(`conf`, async ({ page }) => {
      await page.getByLabel(`main`).getByRole(`img`, { name: `conf` }).click();
      await expect(page).toHaveURL(`/list1111111111111/conf`);
    });
    test(`select`, async ({ page }) => {
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).click();
      await expect(page).toHaveURL(`/list1111111111111/main1111111111111`);
    });
  });
  test.describe(`status`, () => {
    test(`select`, async ({ page }) => {
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0)).not.toHaveClass(/ select/);
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0)).toHaveClass(/ select/);
      await page.getByLabel(`sub`).getByRole(`img`, { name: `arrow` }).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0)).not.toHaveClass(/ select/);
    });
    test(`limit`, async ({ page }) => {
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0)).toHaveClass(/text-theme-warn/);
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).click();
      await page.getByLabel(`sub`).getByRole(`textbox`, { name: `日付` }).click();
      await page.getByLabel(`date`).getByRole(`button`, { name: `クリア` }).click();
      await page.getByLabel(`sub`).getByRole(`img`, { name: `arrow` }).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0)).not.toHaveClass(/text-theme-warn/);
    });
    test(`edit`, async ({ page, fixture }) => {
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0)).not.toHaveClass(/ edit/);
      await fixture.longClick(page.getByLabel(`main`).getByRole(`listitem`).nth(0));
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0)).toHaveClass(/ edit/);
      await page.getByLabel(`main`).getByRole(`textbox`, { name: `リスト` }).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0)).not.toHaveClass(/ edit/);
    });
  });
  test.describe(`update`, () => {
    test(`check`, async ({ page }) => {
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).not.toBeChecked();
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`).check();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).toBeChecked();
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`).uncheck();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).not.toBeChecked();
    });
    test(`title`, async ({ page }) => {
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`main1`);
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).click();
      await page
        .getByLabel(`sub`)
        .getByRole(`textbox`, { name: /^タスク$/ })
        .fill(`main0`);
      await page.getByLabel(`sub`).getByRole(`img`, { name: `arrow` }).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`main0`);
    });
    test(`count`, async ({ page }) => {
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0)).toContainText(`1/2`);
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).click();
      await page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`checkbox`).check();
      await page.getByLabel(`sub`).getByRole(`img`, { name: `arrow` }).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0)).toContainText(`0/2`);
    });
    test(`sort`, async ({ page, fixture }) => {
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`main1`);
      await fixture.dragDrop(
        page.getByLabel(`main`).getByRole(`listitem`).nth(0),
        page.getByLabel(`main`).getByRole(`listitem`).nth(1),
      );
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`main2`);
    });
  });
  test.describe(`entry`, () => {
    test(`create`, async ({ page }) => {
      await page.getByLabel(`main`).getByRole(`img`, { name: `plus` }).click();
      await page.getByLabel(`dialog`).getByRole(`textbox`, { name: `タスク` }).fill(`main3`);
      await page.getByLabel(`dialog`).getByRole(`button`, { name: `決定` }).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`)).toHaveCount(3);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).not.toBeChecked();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`main3`);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toHaveText(`1/1`);
    });
    test(`clone`, async ({ page, fixture }) => {
      await fixture.longClick(page.getByLabel(`main`).getByRole(`listitem`).nth(0));
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `clone` }).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`)).toHaveCount(3);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(1).getByRole(`checkbox`)).not.toBeChecked();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(1).getByRole(`heading`)).toHaveText(`main1`);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(1).getByRole(`paragraph`)).toHaveText(`1/2`);
    });
    test(`move`, async ({ page, fixture }) => {
      await fixture.longClick(page.getByLabel(`main`).getByRole(`listitem`).nth(0));
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `move` }).click();
      await page.getByLabel(`dialog`).getByRole(`radio`).nth(0).check();
      await page.getByLabel(`dialog`).getByRole(`button`, { name: `決定` }).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`)).toHaveCount(1);
      await page.getByLabel(`main`).getByRole(`img`, { name: `list` }).click();
      await page.getByLabel(`list`).getByRole(`listitem`).nth(1).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`)).toHaveCount(1);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).not.toBeChecked();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`main1`);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toHaveText(`1/2`);
    });
    test(`delete`, async ({ page, fixture }) => {
      await fixture.longClick(page.getByLabel(`main`).getByRole(`listitem`).nth(0));
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `trash` }).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`)).toHaveCount(1);
      await page.getByLabel(`main`).getByRole(`img`, { name: `list` }).click();
      await page.getByLabel(`list`).getByRole(`listitem`).nth(2).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`)).toHaveCount(1);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).not.toBeChecked();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`main1`);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toHaveText(`1/2`);
      await page.getByLabel(`notice`).getByRole(`button`, { name: `元に戻す` }).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`)).toHaveCount(0);
      await page.getByLabel(`main`).getByRole(`img`, { name: `list` }).click();
      await page.getByLabel(`list`).getByRole(`listitem`).nth(0).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`)).toHaveCount(2);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).not.toBeChecked();
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`main1`);
      await expect(page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toHaveText(`1/2`);
    });
  });
});
