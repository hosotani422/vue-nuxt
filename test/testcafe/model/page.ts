import {Selector, t} from 'testcafe';

export default class Page {
  private static async loadData(): Promise<void> {
    await t
      .click(`[data-testid="MainConf"]`)
      .setFilesToUpload(`[data-testid="ConfLoad"]`, `../../memotea.bak`);
  }
  public static async initList(): Promise<void> {
    await this.loadData();
    await t.click(`[data-testid="MainList"]`);
  }
  public static async initMain(): Promise<void> {
    await this.loadData();
  }
  public static async initSub(): Promise<void> {
    await this.loadData();
    await t.click(Selector(`[data-testid="MainItem"]`).nth(0));
  }
  public static getById(selector: string): Selector {
    return Selector(`[data-testid="${selector}"]`);
  }
  public static async longClick(selector: string | Selector | NodeSnapshot | SelectorPromise | ((...args: any[]) => Node | Node[] | NodeList | HTMLCollection)): Promise<void> {
    await t
      .dispatchEvent(selector, `touchstart`)
      .wait(1000)
      .dispatchEvent(selector, `touchend`);
  }
  public static async textDialog(text: string): Promise<void> {
    await t
      .typeText(Page.getById(`DialogTitle`), text)
      .click(Page.getById(`DialogOk`));
  }
  public static async checkDialog(selector: string | Selector | NodeSnapshot | SelectorPromise | ((...args: any[]) => Node | Node[] | NodeList | HTMLCollection)): Promise<void> {
    await t
      .click(selector)
      .click(Page.getById(`DialogOk`));
  }
}
