import { Page, Locator } from "@playwright/test";

export default class Fixture {
  public constructor(private readonly page: Page) {}
  private async loadData(): Promise<void> {
    await this.page.goto(`/list0000000000000`);
    await this.page.getByTestId(`MainConf`).click();
    await this.page.getByTestId(`ConfBackupUpload`).setInputFiles(`./test/memotea.bak`);
    await this.page.waitForTimeout(1000);
  }
  public async initList(): Promise<void> {
    await this.loadData();
    await this.page.getByTestId(`MainList`).click();
  }
  public async initMain(): Promise<void> {
    await this.loadData();
  }
  public async initSub(): Promise<void> {
    await this.loadData();
    await this.page.getByTestId(`MainItem`).first().click();
  }
  public async longClick(locator: Locator): Promise<void> {
    await locator.dispatchEvent(`touchstart`);
    await this.page.waitForTimeout(1000);
    await locator.dispatchEvent(`touchend`);
  }
  public async textDialog(title: string): Promise<void> {
    await this.page.getByTestId(`DialogText`).fill(title);
    await this.page.getByTestId(`DialogOk`).click();
  }
  public async checkDialog(locator: Locator): Promise<void> {
    await locator.check();
    await this.page.getByTestId(`DialogOk`).click();
  }
}
