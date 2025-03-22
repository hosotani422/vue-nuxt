import { test as base, expect } from "@playwright/test";
import Fixture from "../fixture/fixture";

const test = base.extend<{ fixture: Fixture }>({
  fixture: async ({ page, context }, use) => {
    await use(new Fixture(page, context));
  },
});

test.describe(`list`, () => {
  test.beforeEach(async ({ fixture, page }) => {
    await fixture.init();
    await page.getByLabel(`main`).getByRole(`img`, { name: `list` }).click();
  });
  test.describe(`init`, () => {
    test(`header`, async ({ page }) => {
      await expect(page).toHaveTitle(`Memosuku`);
      await expect(page).toHaveURL(`/list1111111111111/list`);
      await expect(page.getByLabel(`list`).getByRole(`img`, { name: `plus` })).toHaveCount(1);
      await expect(page.getByLabel(`list`).getByRole(`img`, { name: `plus` })).toBeVisible();
      await expect(page.getByLabel(`list`).getByRole(`heading`, { name: `Memosuku` })).toHaveCount(1);
      await expect(page.getByLabel(`list`).getByRole(`heading`, { name: `Memosuku` })).toBeVisible();
      await expect(page.getByLabel(`list`).getByRole(`img`, { name: `arrow` })).toHaveCount(1);
      await expect(page.getByLabel(`list`).getByRole(`img`, { name: `arrow` })).toBeVisible();
    });
    test(`main/icon`, async ({ page }) => {
      await expect(page.getByLabel(`list`).getByRole(`listitem`)).toHaveCount(3);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `list` })).toHaveCount(
        1,
      );
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `list` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(1).getByRole(`img`, { name: `inbox` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(1).getByRole(`img`, { name: `inbox` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(2).getByRole(`img`, { name: `trash` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(2).getByRole(`img`, { name: `trash` }),
      ).toBeVisible();
    });
    test(`main/title`, async ({ page }) => {
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`heading`, { name: `list1` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`heading`, { name: `list1` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(1).getByRole(`heading`, { name: `Inbox` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(1).getByRole(`heading`, { name: `Inbox` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(2).getByRole(`heading`, { name: `Trash` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(2).getByRole(`heading`, { name: `Trash` }),
      ).toBeVisible();
    });
    test(`main/count`, async ({ page }) => {
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByText(`1/2`)).toHaveCount(1);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByText(`1/2`)).toBeVisible();
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(1).getByText(`0/0`)).toHaveCount(1);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(1).getByText(`0/0`)).toBeVisible();
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(2).getByText(`0/0`)).toHaveCount(1);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(2).getByText(`0/0`)).toBeVisible();
    });
  });
  test.describe(`route`, () => {
    test(`swipe`, async ({ page, fixture }) => {
      await fixture.dragDrop(
        page.getByLabel(`list`).getByRole(`complementary`),
        page.getByLabel(`list`).getByRole(`img`, { name: `plus` }),
      );
      await expect(page).toHaveURL(`/list1111111111111`);
    });
    test(`back`, async ({ page }) => {
      await page.getByLabel(`list`).getByRole(`img`, { name: `arrow` }).click();
      await expect(page).toHaveURL(`/list1111111111111`);
    });
    test(`select`, async ({ page }) => {
      await page.getByLabel(`list`).getByRole(`listitem`).nth(2).click();
      await expect(page).toHaveURL(`/list9999999999999`);
    });
  });
  test.describe(`status`, () => {
    test(`select`, async ({ page }) => {
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(1)).not.toHaveClass(/ select/);
      await page.getByLabel(`list`).getByRole(`listitem`).nth(1).click();
      await page.getByLabel(`main`).getByRole(`banner`).getByRole(`img`, { name: `list` }).click();
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(1)).toHaveClass(/ select/);
    });
    test(`limit`, async ({ page }) => {
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0)).toHaveClass(/text-theme-warn/);
      await page.getByLabel(`list`).getByRole(`listitem`).nth(0).click();
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).click();
      await page.getByLabel(`sub`).getByRole(`textbox`, { name: `日付` }).click();
      await page.getByLabel(`date`).getByRole(`button`, { name: `クリア` }).click();
      await page.getByLabel(`sub`).getByRole(`img`, { name: `arrow` }).click();
      await page.getByLabel(`main`).getByRole(`img`, { name: `list` }).click();
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0)).not.toHaveClass(/text-theme-warn/);
    });
    test(`edit`, async ({ page, fixture }) => {
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(1)).not.toHaveClass(/ edit/);
      await fixture.longClick(page.getByLabel(`list`).getByRole(`listitem`).nth(1));
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(1)).toHaveClass(/ edit/);
      await page.getByLabel(`list`).getByRole(`heading`, { name: `Memosuku` }).click();
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(1)).not.toHaveClass(/ edit/);
    });
    test(`edit/current`, async ({ page, fixture }) => {
      await fixture.longClick(page.getByLabel(`list`).getByRole(`listitem`).nth(0));
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `clone` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `trash` }),
      ).toHaveCount(0);
    });
    test(`edit/normal`, async ({ page, fixture }) => {
      await fixture.longClick(page.getByLabel(`list`).getByRole(`listitem`).nth(1));
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(1).getByRole(`img`, { name: `clone` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(1).getByRole(`img`, { name: `trash` }),
      ).toHaveCount(1);
    });
    test(`edit/trash`, async ({ page, fixture }) => {
      await fixture.longClick(page.getByLabel(`list`).getByRole(`listitem`).nth(2));
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(2).getByRole(`img`, { name: `clone` }),
      ).toHaveCount(0);
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(2).getByRole(`img`, { name: `trash` }),
      ).toHaveCount(1);
    });
  });
  test.describe(`update`, () => {
    test(`title`, async ({ page }) => {
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`list1`);
      await page.getByLabel(`list`).getByRole(`listitem`).nth(0).click();
      await page.getByLabel(`main`).getByRole(`textbox`, { name: `リスト` }).fill(`list0`);
      await page.getByLabel(`main`).getByRole(`banner`).getByRole(`img`, { name: `list` }).click();
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`list0`);
    });
    test(`count`, async ({ page }) => {
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toContainText(`1/2`);
      await page.getByLabel(`list`).getByRole(`listitem`).nth(0).click();
      await page.getByLabel(`main`).getByRole(`listitem`).nth(0).getByRole(`checkbox`).check();
      await page.getByLabel(`main`).getByRole(`banner`).getByRole(`img`, { name: `list` }).click();
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toContainText(`0/2`);
    });
    test(`sort`, async ({ page, fixture }) => {
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`list1`);
      await fixture.dragDrop(
        page.getByLabel(`list`).getByRole(`listitem`).nth(0),
        page.getByLabel(`list`).getByRole(`listitem`).nth(1),
      );
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`Inbox`);
    });
  });
  test.describe(`entry`, () => {
    test(`create`, async ({ page }) => {
      await page.getByLabel(`list`).getByRole(`img`, { name: `plus` }).click();
      await page.getByLabel(`dialog`).getByRole(`textbox`, { name: `リスト` }).fill(`list2`);
      await page.getByLabel(`dialog`).getByRole(`button`, { name: `決定` }).click();
      await expect(page.getByLabel(`list`).getByRole(`listitem`)).toHaveCount(4);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `list` })).toHaveCount(
        1,
      );
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`list2`);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toHaveText(`0/0`);
    });
    test(`clone`, async ({ page, fixture }) => {
      await fixture.longClick(page.getByLabel(`list`).getByRole(`listitem`).nth(0));
      await page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `clone` }).click();
      await expect(page.getByLabel(`list`).getByRole(`listitem`)).toHaveCount(4);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `list` })).toHaveCount(
        1,
      );
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`list1`);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toHaveText(`1/2`);
    });
    test(`delete`, async ({ page, fixture }) => {
      await page.getByLabel(`list`).getByRole(`listitem`).nth(1).click();
      await page.getByLabel(`main`).getByRole(`banner`).getByRole(`img`, { name: `list` }).click();
      await fixture.longClick(page.getByLabel(`list`).getByRole(`listitem`).nth(0));
      await page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `trash` }).click();
      await page.getByLabel(`dialog`).getByRole(`button`, { name: `決定` }).click();
      await expect(page.getByLabel(`list`).getByRole(`listitem`)).toHaveCount(2);
      await expect(
        page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `inbox` }),
      ).toHaveCount(1);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`Inbox`);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toHaveText(`0/0`);
      await page.getByLabel(`notice`).getByRole(`button`, { name: `元に戻す` }).click();
      await expect(page.getByLabel(`list`).getByRole(`listitem`)).toHaveCount(3);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `list` })).toHaveCount(
        1,
      );
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`heading`)).toHaveText(`list1`);
      await expect(page.getByLabel(`list`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toHaveText(`1/2`);
    });
  });
});
