import {Page, Locator} from '@playwright/test';

export default class Fixture {
  public constructor(private readonly page: Page) {}
  private async init(): Promise<void> {
    await this.page.goto(`/list0000000000000`);
    await this.page.getByTestId(`MainConf`).click();
    await this.page.getByTestId(`ConfLoad`).setInputFiles(`./test/memotea.bak`);
  }
  public async startList(): Promise<void> {
    await this.init();
    await this.page.getByTestId(`MainList`).click();
  }
  public async startMain(): Promise<void> {
    await this.init();
  }
  public async startSub(): Promise<void> {
    await this.init();
    await this.page.getByTestId(`MainItem`).first().click();
  }
  public async longClick(locator: Locator): Promise<void> {
    await locator.dispatchEvent(`touchstart`);
    await this.page.waitForTimeout(1000);
    await locator.dispatchEvent(`touchend`);
  }
  public async textDialog(title: string): Promise<void> {
    await this.page.getByTestId(`DialogTitle`).fill(title);
    await this.page.getByTestId(`DialogOk`).click();
  }
  public async checkDialog(locator: Locator): Promise<void> {
    await locator.check();
    await this.page.getByTestId(`DialogOk`).click();
  }
}