import {test as base, expect} from '@playwright/test';
import Fixture from '../fixture/fixture';

const test = base.extend<{fixture: Fixture;}>({
  fixture: async({page}, use) => {
    await use(new Fixture(page));
  },
});

test.describe(`sub`, () => {
  test.beforeEach(async({fixture}) => {
    await fixture.initSub();
  });
  test(`route`, async({page}) => {
    await expect(page).toHaveURL(`/list1685704768236/sub/main1685704776101`);
    await page.getByTestId(`SubRight`).click();
    await expect(page.getByTestId(`SubRoot`)).toHaveCount(0);
  });
  test(`create`, async({page}) => {
    await page.getByTestId(`SubTask`).first().press(`Enter`);
    await expect(page.getByTestId(`SubItem`)).toHaveCount(4);
  });
  test(`check`, async({page}) => {
    await page.getByTestId(`SubCheck`).first().check();
    await expect(page.getByTestId(`SubCheck`).last()).toBeChecked();
    await page.getByTestId(`SubCheck`).last().uncheck();
    await expect(page.getByTestId(`SubCheck`).last()).not.toBeChecked();
  });
  test(`mode`, async({page}) => {
    await page.getByTestId(`SubMode`).click();
    await expect(page.getByTestId(`SubMemo`)).toHaveValue(`sub1\nsub2\nsub3`);
  });
  test(`delete`, async({page}) => {
    await page.getByTestId(`SubTask`).last().click();
    await page.getByTestId(`SubTrash`).dispatchEvent(`touchstart`);
    await expect(page.getByTestId(`SubItem`)).toHaveCount(2);
  });
  test(`calendar`, async({page}) => {
    await page.getByTestId(`SubCalendar`).click();
    await page.getByTestId(`CalendarItem`).nth(45).click();
    await expect(page.getByTestId(`SubCalendar`)).not.toHaveValue(``);
    await page.getByTestId(`SubCalendar`).click();
    await page.getByTestId(`CalendarClear`).click();
    await expect(page.getByTestId(`SubCalendar`)).toHaveValue(``);
  });
  test(`clock`, async({page}) => {
    await page.getByTestId(`SubClock`).click();
    await page.getByTestId(`ClockOk`).click();
    await expect(page.getByTestId(`SubClock`)).toHaveValue(`00:00`);
    await page.getByTestId(`SubClock`).click();
    await page.getByTestId(`ClockClear`).click();
    await expect(page.getByTestId(`SubClock`)).toHaveValue(``);
  });
  test(`dialog`, async({page, fixture}) => {
    await page.getByTestId(`SubDialog`).click();
    await fixture.checkDialog(page.getByTestId(`DialogCheck`).last());
    await expect(page.getByTestId(`SubDialog`)).toHaveValue(`2日前`);
  });
});
