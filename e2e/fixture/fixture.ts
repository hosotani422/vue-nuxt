import fs from "fs";
import { Page, Locator, BrowserContext } from "@playwright/test";

export default class Fixture {
  public constructor(
    private readonly page: Page,
    private readonly contest: BrowserContext,
  ) {}
  public async init(): Promise<void> {
    const backup = await fs.readFileSync(`./e2e/memotea.bak`, `utf8`).split(`\n`);
    await this.contest.addInitScript((backup) => {
      window.localStorage.setItem(`route`, backup[0]!);
      window.localStorage.setItem(`list`, backup[1]!);
      window.localStorage.setItem(`main`, backup[2]!);
      window.localStorage.setItem(`sub`, backup[3]!);
      window.localStorage.setItem(`conf`, backup[4]!);
    }, backup);
    await this.page.goto(`/list1111111111111`);
  }
  public async longClick(locator: Locator): Promise<void> {
    await locator.dispatchEvent(`touchstart`);
    await this.page.waitForTimeout(500);
    await locator.dispatchEvent(`touchend`);
  }
  public async dragDrop(from: Locator, to: Locator): Promise<void> {
    await from.hover();
    await this.page.mouse.down();
    await this.page.waitForTimeout(500);
    await to.hover();
    await this.page.mouse.up();
  }
}
