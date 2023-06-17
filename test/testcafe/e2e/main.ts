import Page from '../model/page';

fixture(`main`).beforeEach(async() => {
  await Page.initMain();
});
test(`create`, async(t: any) => {
  await t.click(Page.getById(`MainPlus`));
  await Page.textDialog(`main4`);
  await t.expect(Page.getById(`MainItem`).count).eql(4);
});
test(`clone`, async(t: any) => {
  await Page.longClick(Page.getById(`MainItem`).nth(0));
  await t
    .click(Page.getById(`MainClone`))
    .expect(Page.getById(`MainItem`).count).eql(4);
});
test(`edit`, async(t: any) => {
  await t
    .click(Page.getById(`MainItem`).nth(0))
    .typeText(Page.getById(`SubTitle`), `main0`, {replace: true})
    .click(Page.getById(`SubRight`))
    .expect(Page.getById(`MainTask`).nth(0).innerText).eql(`main0`);
});
test(`check`, async(t: any) => {
  await t
    .click(Page.getById(`MainCheck`).nth(0))
    .expect(Page.getById(`MainCheck`).nth(-1).checked).eql(true)
    .click(Page.getById(`MainCheck`).nth(-1))
    .expect(Page.getById(`MainCheck`).nth(-1).checked).eql(false);
});
test(`move`, async(t: any) => {
  await Page.longClick(Page.getById(`MainItem`).nth(0));
  await t.click(Page.getById(`MainMove`));
  await Page.checkDialog(Page.getById(`DialogRadio`).nth(-1));
  await t.expect(Page.getById(`MainItem`).count).eql(2);
});
test(`delete`, async(t: any) => {
  await Page.longClick(Page.getById(`MainItem`).nth(0));
  await t
    .click(Page.getById(`MainTrash`))
    .expect(Page.getById(`MainItem`).count).eql(2)
    .click(Page.getById(`NoticeBack`))
    .expect(Page.getById(`MainItem`).count).eql(3);
});
