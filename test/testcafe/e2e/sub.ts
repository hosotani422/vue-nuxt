import { test, fixture, Selector } from "testcafe";
import Page from "../model/page";

fixture(`sub`).beforeEach(async () => {
  await Page.initSub();
});
test(`route`, async (t) => {
  await t
    .click(`[data-testid="SubRight"]`)
    .expect(Selector(`[data-testid="SubRoot"]`).count)
    .eql(0);
});
test(`create`, async (t) => {
  await t
    .click(Selector(`[data-testid="SubTask"]`).nth(0))
    .pressKey(`enter`)
    .expect(Selector(`[data-testid="SubItem"]`).count)
    .eql(4);
});
test(`check`, async (t) => {
  await t
    .click(Selector(`[data-testid="SubCheck"]`).nth(0))
    .expect(Selector(`[data-testid="SubCheck"]`).nth(-1).checked)
    .eql(true)
    .click(Selector(`[data-testid="SubCheck"]`).nth(-1))
    .expect(Selector(`[data-testid="SubCheck"]`).nth(-1).checked)
    .eql(false);
});
test(`mode`, async (t) => {
  await t
    .click(`[data-testid="SubMode"]`)
    .expect(Selector(`[data-testid="SubMemo"]`).value)
    .eql(`sub1\nsub2\nsub3`);
});
test(`delete`, async (t) => {
  await t
    .click(Selector(`[data-testid="SubTask"]`).nth(-1))
    .dispatchEvent(`[data-testid="SubTrash"]`, `touchstart`)
    .expect(Selector(`[data-testid="SubItem"]`).count)
    .eql(2);
});
test(`calendar`, async (t) => {
  await t
    .click(`[data-testid="SubCalendar"]`)
    .click(Selector(`[data-testid="CalendarItem"]`).nth(45))
    .expect(Selector(`[data-testid="SubCalendar"]`).value)
    .notEql(``)
    .click(`[data-testid="SubCalendar"]`)
    .click(`[data-testid="CalendarClear"]`)
    .expect(Selector(`[data-testid="SubCalendar"]`).value)
    .eql(``);
});
test(`clock`, async (t) => {
  await t
    .click(`[data-testid="SubClock"]`)
    .click(`[data-testid="ClockOk"]`)
    .expect(Selector(`[data-testid="SubClock"]`).value)
    .eql(`00:00`)
    .click(`[data-testid="SubClock"]`)
    .click(`[data-testid="ClockClear"]`)
    .expect(Selector(`[data-testid="SubClock"]`).value)
    .eql(``);
});
test(`dialog`, async (t) => {
  await t.click(`[data-testid="SubDialog"]`);
  await Page.checkDialog(Page.getById(`DialogCheck`).nth(-1));
  await t.expect(Selector(`[data-testid="SubDialog"]`).value).eql(`2日前`);
});
