import { test as base, expect } from "@playwright/test";
import Fixture from "../fixture/fixture";

const test = base.extend<{ fixture: Fixture }>({
  fixture: async ({ page, context }, use) => {
    await use(new Fixture(page, context));
  },
});

test.describe(`sub`, () => {
  test.beforeEach(async ({ fixture, page }) => {
    await fixture.init();
    await page.getByLabel(`main`).getByRole(`listitem`).nth(0).click();
  });
  test.describe(`init`, () => {
    test(`header`, async ({ page }) => {
      await expect(page).toHaveTitle(`Memotea`);
      await expect(page).toHaveURL(`/list1111111111111/main1111111111111`);
      await expect(page.getByLabel(`sub`).getByRole(`img`, { name: `arrow` })).toHaveCount(1);
      await expect(page.getByLabel(`sub`).getByRole(`img`, { name: `arrow` })).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: /^タスク$/ })).toHaveCount(1);
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: /^タスク$/ })).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: /^タスク$/ })).toHaveValue(`main1`);
      await expect(page.getByLabel(`sub`).getByRole(`img`, { name: `mode` })).toHaveCount(1);
      await expect(page.getByLabel(`sub`).getByRole(`img`, { name: `mode` })).toBeVisible();
    });
    test(`main/checkbox`, async ({ page }) => {
      await expect(page.getByLabel(`sub`).getByRole(`listitem`)).toHaveCount(2);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).toHaveCount(1);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).not.toBeChecked();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`checkbox`)).toHaveCount(1);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`checkbox`)).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`checkbox`)).toBeChecked();
    });
    test(`main/title`, async ({ page }) => {
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`textbox`)).toHaveCount(1);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`textbox`)).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`textbox`)).toHaveValue(`sub1`);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`textbox`)).toHaveCount(1);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`textbox`)).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`textbox`)).toHaveValue(`sub2`);
    });
    test(`main/icon`, async ({ page }) => {
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `drag` })).toHaveCount(
        1,
      );
      await expect(
        page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `drag` }),
      ).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`img`, { name: `drag` })).toHaveCount(
        1,
      );
      await expect(
        page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`img`, { name: `drag` }),
      ).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `trash` })).toHaveCount(
        1,
      );
      await expect(
        page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `trash` }),
      ).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`img`, { name: `trash` })).toHaveCount(
        1,
      );
      await expect(
        page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`img`, { name: `trash` }),
      ).toBeVisible();
    });
    test(`footer`, async ({ page }) => {
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `日付` })).toHaveCount(1);
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `日付` })).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `日付` })).toHaveValue(`2000/01/01`);
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `時刻` })).toHaveCount(1);
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `時刻` })).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `時刻` })).toHaveValue(`00:00`);
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `アラーム` })).toHaveCount(1);
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `アラーム` })).toBeVisible();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `アラーム` })).toHaveValue(`5分前,1時間前`);
    });
  });
  test.describe(`route`, () => {
    test(`swipe`, async ({ page, fixture }) => {
      await fixture.dragDrop(
        page.getByLabel(`sub`).getByRole(`complementary`),
        page.getByLabel(`sub`).getByRole(`img`, { name: `mode` }),
      );
      await expect(page).toHaveURL(`/list1111111111111`);
    });
    test(`back`, async ({ page }) => {
      await page.getByLabel(`sub`).getByRole(`img`, { name: `arrow` }).click();
      await expect(page).toHaveURL(`/list1111111111111`);
    });
  });
  test.describe(`status`, () => {
    test(`limit`, async ({ page }) => {
      await expect(page.getByLabel(`sub`).getByRole(`contentinfo`)).toHaveClass(/ text-theme-warn/);
      await page.getByLabel(`sub`).getByRole(`textbox`, { name: `日付` }).click();
      await page.getByLabel(`date`).getByRole(`button`, { name: `クリア` }).click();
      await expect(page.getByLabel(`sub`).getByRole(`contentinfo`)).not.toHaveClass(/ text-theme-warn/);
    });
  });
  test.describe(`update`, () => {
    test(`mode`, async ({ page }) => {
      await page.getByLabel(`sub`).getByRole(`img`, { name: `mode` }).click();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `メモ` })).toHaveValue(`sub1\nsub2`);
      await page.getByLabel(`sub`).getByRole(`textbox`, { name: `メモ` }).fill(`sub1\nsub2\nsub3`);
      await page.getByLabel(`sub`).getByRole(`img`, { name: `mode` }).click();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`)).toHaveCount(3);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).not.toBeChecked();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`checkbox`)).not.toBeChecked();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(2).getByRole(`checkbox`)).not.toBeChecked();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`textbox`)).toHaveValue(`sub1`);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`textbox`)).toHaveValue(`sub2`);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(2).getByRole(`textbox`)).toHaveValue(`sub3`);
      await expect(page.getByLabel(`sub`).getByRole(`img`, { name: `drag` })).toHaveCount(3);
      await expect(page.getByLabel(`sub`).getByRole(`img`, { name: `trash` })).toHaveCount(3);
    });
    test(`check`, async ({ page }) => {
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).not.toBeChecked();
      await page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`checkbox`).check();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).toBeChecked();
      await page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`checkbox`).uncheck();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`checkbox`)).not.toBeChecked();
    });
    test(`sort`, async ({ page, fixture }) => {
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`textbox`)).toHaveValue(`sub1`);
      await fixture.dragDrop(
        page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `drag` }),
        page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`img`, { name: `drag` }),
      );
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`textbox`)).toHaveValue(`sub2`);
    });
    test(`date`, async ({ page }) => {
      await page.getByLabel(`sub`).getByRole(`textbox`, { name: `日付` }).click();
      await page.getByLabel(`date`).getByRole(`main`).getByRole(`listitem`).nth(32).click();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `日付` })).toHaveValue(`2000/01/02`);
      await page.getByLabel(`sub`).getByRole(`textbox`, { name: `日付` }).click();
      await page.getByLabel(`date`).getByRole(`button`, { name: `クリア` }).click();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `日付` })).toHaveValue(``);
    });
    test(`time`, async ({ page }) => {
      await page.getByLabel(`sub`).getByRole(`textbox`, { name: `時刻` }).click();
      await page.getByLabel(`time`).getByRole(`button`, { name: `決定` }).click();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `時刻` })).toHaveValue(`00:00`);
      await page.getByLabel(`sub`).getByRole(`textbox`, { name: `時刻` }).click();
      await page.getByLabel(`time`).getByRole(`button`, { name: `クリア` }).click();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `時刻` })).toHaveValue(``);
    });
    test(`dialog`, async ({ page }) => {
      await page.getByLabel(`sub`).getByRole(`textbox`, { name: `アラーム` }).click();
      await page.getByLabel(`dialog`).getByRole(`checkbox`).nth(12).check();
      await page.getByLabel(`dialog`).getByRole(`button`, { name: `決定` }).click();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `アラーム` })).toHaveValue(
        `5分前,1時間前,2日前`,
      );
      await page.getByLabel(`sub`).getByRole(`textbox`, { name: `アラーム` }).click();
      await page.getByLabel(`dialog`).getByRole(`checkbox`).nth(0).check();
      await page.getByLabel(`dialog`).getByRole(`checkbox`).nth(0).uncheck();
      await page.getByLabel(`dialog`).getByRole(`button`, { name: `決定` }).click();
      await expect(page.getByLabel(`sub`).getByRole(`textbox`, { name: `アラーム` })).toHaveValue(``);
    });
  });
  test.describe(`entry`, () => {
    test(`edit`, async ({ page }) => {
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`textbox`)).toHaveValue(`sub2`);
      await page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`textbox`).press(`Enter`);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`)).toHaveCount(3);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`textbox`)).toHaveValue(``);
      await page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`textbox`).press(`Backspace`);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`)).toHaveCount(2);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(1).getByRole(`textbox`)).toHaveValue(`sub2`);
    });
    test(`delete`, async ({ page }) => {
      await expect(page.getByLabel(`sub`).getByRole(`listitem`)).toHaveCount(2);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`textbox`)).toHaveValue(`sub1`);
      await page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`textbox`).focus();
      await page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`img`, { name: `trash` }).click();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`)).toHaveCount(1);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`textbox`)).toHaveValue(`sub2`);
      await page.getByLabel(`notice`).getByRole(`button`, { name: `元に戻す` }).click();
      await expect(page.getByLabel(`sub`).getByRole(`listitem`)).toHaveCount(2);
      await expect(page.getByLabel(`sub`).getByRole(`listitem`).nth(0).getByRole(`textbox`)).toHaveValue(`sub1`);
    });
  });
});
