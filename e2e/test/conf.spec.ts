import fs from "fs";
import { test as base, expect } from "@playwright/test";
import Fixture from "../fixture/fixture";

const test = base.extend<{ fixture: Fixture }>({
  fixture: async ({ page, context }, use) => {
    await use(new Fixture(page, context));
  },
});

test.describe(`conf`, () => {
  test.beforeEach(async ({ fixture, page }) => {
    await fixture.init();
    await page.getByLabel(`main`).getByRole(`img`, { name: `conf` }).click();
  });
  test.describe(`init`, () => {
    test(`header`, async ({ page }) => {
      await expect(page).toHaveTitle(`Memosuku`);
      await expect(page).toHaveURL(`/list1111111111111/conf`);
      await expect(page.getByLabel(`conf`).getByRole(`img`, { name: `arrow` })).toHaveCount(1);
      await expect(page.getByLabel(`conf`).getByRole(`img`, { name: `arrow` })).toBeVisible();
      await expect(page.getByLabel(`conf`).getByRole(`heading`, { name: `設定` })).toHaveCount(1);
      await expect(page.getByLabel(`conf`).getByRole(`heading`, { name: `設定` })).toBeVisible();
      await expect(page.getByLabel(`conf`).getByText(/Memosuku/)).toHaveCount(1);
      await expect(page.getByLabel(`conf`).getByText(/Memosuku/)).toBeVisible();
    });
    test(`main/range`, async ({ page }) => {
      await expect(page.getByLabel(`conf`).getByRole(`listitem`)).toHaveCount(8);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(0).getByRole(`heading`, { name: `文字サイズ` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(0).getByRole(`heading`, { name: `文字サイズ` }),
      ).toBeVisible();
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(0).getByRole(`slider`)).toHaveCount(1);
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(0).getByRole(`slider`)).toBeVisible();
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(0).getByRole(`slider`)).toHaveValue(`2`);
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(0).getByText(`中`)).toHaveCount(1);
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(0).getByText(`中`)).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(1).getByRole(`heading`, { name: `アニメ速度` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(1).getByRole(`heading`, { name: `アニメ速度` }),
      ).toBeVisible();
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(1).getByRole(`slider`)).toHaveCount(1);
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(1).getByRole(`slider`)).toBeVisible();
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(1).getByRole(`slider`)).toHaveValue(`2`);
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(1).getByText(`中`)).toHaveCount(1);
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(1).getByText(`中`)).toBeVisible();
    });
    test(`main/radio`, async ({ page }) => {
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`heading`, { name: `テーマ` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`heading`, { name: `テーマ` }),
      ).toBeVisible();
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `明` })).toHaveCount(
        1,
      );
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `明` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `明` }),
      ).not.toBeChecked();
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `暗` })).toHaveCount(
        1,
      );
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `暗` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `暗` }),
      ).toBeChecked();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(3).getByRole(`heading`, { name: `言語` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(3).getByRole(`heading`, { name: `言語` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(3).getByRole(`radio`, { name: `英語` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(3).getByRole(`radio`, { name: `英語` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(3).getByRole(`radio`, { name: `英語` }),
      ).not.toBeChecked();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(3).getByRole(`radio`, { name: `日本語` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(3).getByRole(`radio`, { name: `日本語` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(3).getByRole(`radio`, { name: `日本語` }),
      ).toBeChecked();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(4).getByRole(`heading`, { name: `振動` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(4).getByRole(`heading`, { name: `振動` }),
      ).toBeVisible();
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(4).getByRole(`radio`, { name: `無` })).toHaveCount(
        1,
      );
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(4).getByRole(`radio`, { name: `無` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(4).getByRole(`radio`, { name: `無` }),
      ).not.toBeChecked();
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(4).getByRole(`radio`, { name: `有` })).toHaveCount(
        1,
      );
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(4).getByRole(`radio`, { name: `有` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(4).getByRole(`radio`, { name: `有` }),
      ).toBeChecked();
    });
    test(`main/button`, async ({ page }) => {
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(5).getByRole(`heading`, { name: `ファイル保存` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(5).getByRole(`heading`, { name: `ファイル保存` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(5).getByRole(`button`, { name: `ローカル` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(5).getByRole(`button`, { name: `ローカル` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(5).getByRole(`button`, { name: `サーバー` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(5).getByRole(`button`, { name: `サーバー` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(6).getByRole(`heading`, { name: `ファイル復元` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(6).getByRole(`heading`, { name: `ファイル復元` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(6).getByRole(`button`, { name: `ローカル` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(6).getByRole(`button`, { name: `ローカル` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(6).getByRole(`button`, { name: `サーバー` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(6).getByRole(`button`, { name: `サーバー` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(7).getByRole(`heading`, { name: `初期化` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(7).getByRole(`heading`, { name: `初期化` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(7).getByRole(`button`, { name: `設定` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(7).getByRole(`button`, { name: `設定` }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(7).getByRole(`button`, { name: `メモ` }),
      ).toHaveCount(1);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(7).getByRole(`button`, { name: `メモ` }),
      ).toBeVisible();
    });
  });
  test.describe(`route`, () => {
    test(`swipe`, async ({ page, fixture }) => {
      await fixture.dragDrop(
        page.getByLabel(`conf`).getByRole(`complementary`),
        page.getByLabel(`conf`).getByRole(`listitem`).nth(7),
      );
      await expect(page).toHaveURL(`/list1111111111111`);
    });
    test(`back`, async ({ page }) => {
      await page.getByLabel(`conf`).getByRole(`img`, { name: `arrow` }).click();
      await expect(page).toHaveURL(`/list1111111111111`);
    });
  });
  test.describe(`range`, () => {
    test(`size`, async ({ page }) => {
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(0).getByRole(`slider`).fill(`1`);
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toHaveText(`小`);
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(0).getByRole(`slider`).fill(`3`);
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(0).getByRole(`paragraph`)).toHaveText(`大`);
    });
    test(`speed`, async ({ page }) => {
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(1).getByRole(`slider`).fill(`1`);
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(1).getByRole(`paragraph`)).toHaveText(`低`);
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(1).getByRole(`slider`).fill(`3`);
      await expect(page.getByLabel(`conf`).getByRole(`listitem`).nth(1).getByRole(`paragraph`)).toHaveText(`高`);
    });
  });
  test.describe(`radio`, () => {
    test(`theme`, async ({ page }) => {
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `明` }).check();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `明` }),
      ).toBeChecked();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `暗` }),
      ).not.toBeChecked();
    });
    test(`lang`, async ({ page }) => {
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(3).getByRole(`radio`).nth(0).check();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(3).getByRole(`radio`, { name: `English` }),
      ).toBeChecked();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(3).getByRole(`radio`, { name: `Japanese` }),
      ).not.toBeChecked();
    });
    test(`vibrate`, async ({ page }) => {
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(4).getByRole(`radio`, { name: `無` }).check();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(4).getByRole(`radio`, { name: `無` }),
      ).toBeChecked();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(4).getByRole(`radio`, { name: `有` }),
      ).not.toBeChecked();
    });
  });
  test.describe(`button`, () => {
    test(`save/local`, async ({ page }) => {
      let download = ``;
      const downloadPromise = page.waitForEvent(`download`);
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(5).getByRole(`button`, { name: `ローカル` }).click();
      const stream = await (await downloadPromise).createReadStream();
      for await (const chunk of stream) {
        download += chunk;
      }
      const upload = fs.readFileSync(`./e2e/memosuku.bak`, `utf8`);
      await expect(download).toBe(upload);
    });
    test(`save/server`, async ({ page }) => {
      await page.route(`/api/backup`, async (route) => {
        await route.fulfill();
      });
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(5).getByRole(`button`, { name: `サーバー` }).click();
      await page.getByLabel(`dialog`).getByRole(`button`, { name: `決定` }).click();
    });
    test(`load/local`, async ({ page }) => {
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `明` }).check();
      await page
        .getByLabel(`conf`)
        .getByRole(`listitem`)
        .nth(6)
        .getByRole(`button`)
        .nth(1)
        .setInputFiles(`./e2e/memosuku.bak`);
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `明` }),
      ).not.toBeChecked();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `暗` }),
      ).toBeChecked();
    });
    test(`load/server`, async ({ page }) => {
      await page.route(`/api/backup`, async (route) => {
        await route.fulfill({ body: fs.readFileSync(`./e2e/memosuku.bak`, `utf8`) });
      });
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `明` }).check();
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(6).getByRole(`button`, { name: `サーバー` }).click();
      await page.getByLabel(`dialog`).getByRole(`button`, { name: `決定` }).click();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `明` }),
      ).not.toBeChecked();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `暗` }),
      ).toBeChecked();
    });
    test(`reset/conf`, async ({ page }) => {
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(7).getByRole(`button`, { name: `設定` }).click();
      await page.getByLabel(`dialog`).getByRole(`button`, { name: `決定` }).click();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `明` }),
      ).toBeChecked();
      await expect(
        page.getByLabel(`conf`).getByRole(`listitem`).nth(2).getByRole(`radio`, { name: `暗` }),
      ).not.toBeChecked();
    });
    test(`reset/memo`, async ({ page }) => {
      await page.getByLabel(`conf`).getByRole(`listitem`).nth(7).getByRole(`button`, { name: `メモ` }).click();
      await page.getByLabel(`dialog`).getByRole(`button`, { name: `決定` }).click();
      await expect(page.getByLabel(`main`).getByRole(`listitem`)).toHaveCount(1);
    });
  });
});
