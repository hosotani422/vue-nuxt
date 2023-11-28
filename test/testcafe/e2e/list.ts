import { test, fixture } from "testcafe";
import Page from "../model/page";

fixture(`list`).beforeEach(async () => {
  await Page.initList();
});
test(`route`, async (t) => {
  await t.click(Page.getById(`ListLeft`)).expect(Page.getById(`ListRoot`).count).eql(0);
});
test(`create`, async (t) => {
  await t.click(Page.getById(`ListPlus`));
  await Page.textDialog(`list4`);
  await t.expect(Page.getById(`ListItem`).count).eql(4);
});
test(`clone`, async (t) => {
  await Page.longClick(Page.getById(`ListItem`).nth(0));
  await t.click(Page.getById(`ListClone`)).expect(Page.getById(`ListItem`).count).eql(4);
});
test(`edit`, async (t) => {
  await t
    .click(Page.getById(`ListItem`).nth(0))
    .typeText(Page.getById(`MainTitle`), `list0`, { replace: true })
    .click(Page.getById(`MainList`))
    .expect(Page.getById(`ListTask`).nth(0).innerText)
    .eql(`list0`);
});
test(`delete`, async (t) => {
  await Page.longClick(Page.getById(`ListItem`).nth(1));
  await t
    .click(Page.getById(`ListTrash`))
    .click(Page.getById(`DialogOk`))
    .expect(Page.getById(`ListItem`).count)
    .eql(2)
    .click(Page.getById(`NoticeBack`))
    .expect(Page.getById(`ListItem`).count)
    .eql(3);
});
test(`current`, async (t) => {
  await Page.longClick(Page.getById(`ListItem`).nth(0));
  await t.expect(Page.getById(`ListClone`).count).eql(1).expect(Page.getById(`ListTrash`).count).eql(0);
});
test(`trash`, async (t) => {
  await Page.longClick(Page.getById(`ListItem`).nth(-1));
  await t.expect(Page.getById(`ListClone`).count).eql(0).expect(Page.getById(`ListTrash`).count).eql(0);
});
