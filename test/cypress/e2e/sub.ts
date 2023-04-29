Cypress.on(`uncaught:exception`, () => false);

describe(`sub`, () => {
  beforeEach(() => {
    cy.visit(`/list0000000000000`);
    cy.get(`[data-test="MainPlus"]`).click();
    cy.get(`[data-test="DialogTitle"]`).type(`main1`);
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="MainItem"]`).click();
  });
  it(`route`, () => {
    cy.get(`[data-test="SubRight"]`).click();
    cy.get(`[data-test="SubRoot"]`).should(`not.exist`);
  });
  it(`create`, () => {
    cy.get(`[data-test="SubTask"]`).first().type(`{enter}`);
    cy.get(`[data-test="SubTask"]`).first().type(`{enter}`);
    cy.get(`[data-test="SubItem"]`).should(`have.length`, 3);
  });
  it(`check`, () => {
    cy.get(`[data-test="SubTask"]`).first().type(`{enter}`);
    cy.get(`[data-test="SubTask"]`).first().type(`{enter}`);
    cy.get(`[data-test="SubCheck"]`).first().check();
    cy.get(`[data-test="SubCheck"]`).last().should(`be.checked`);
    cy.get(`[data-test="SubCheck"]`).last().uncheck();
    cy.get(`[data-test="SubCheck"]`).last().should(`not.be.checked`);
  });
  it(`mode`, () => {
    cy.get(`[data-test="SubTask"]`).first().type(`{enter}`);
    cy.get(`[data-test="SubTask"]`).first().type(`{enter}`);
    cy.get(`[data-test="SubTask"]`).first().type(`sub1`);
    cy.get(`[data-test="SubTask"]`).eq(1).type(`sub2`);
    cy.get(`[data-test="SubTask"]`).last().type(`sub3`);
    cy.get(`[data-test="SubMode"]`).click();
    cy.get(`[data-test="SubMemo"]`).should(`have.value`, `sub1\nsub2\nsub3`);
  });
  it(`delete`, () => {
    cy.get(`[data-test="SubTask"]`).first().type(`{enter}`);
    cy.get(`[data-test="SubTask"]`).first().type(`{enter}`);
    cy.get(`[data-test="SubTask"]`).last().focus();
    cy.get(`[data-test="SubTrash"]`).last().trigger(`touchstart`);
    cy.get(`[data-test="SubItem"]`).should(`have.length`, 2);
  });
  it(`calendar`, () => {
    cy.get(`[data-test="SubCalendar"]`).click();
    cy.get(`[data-test="CalendarItem"]`).eq(45).click();
    cy.get(`[data-test="SubCalendar"]`).should(`not.have.value`, ``);
    cy.get(`[data-test="SubCalendar"]`).click();
    cy.get(`[data-test="CalendarClear"]`).click();
    cy.get(`[data-test="SubCalendar"]`).should(`have.value`, ``);
  });
  it(`clock`, () => {
    cy.get(`[data-test="SubClock"]`).click();
    cy.get(`[data-test="ClockOk"]`).click();
    cy.get(`[data-test="SubClock"]`).should(`have.value`, `00:00`);
    cy.get(`[data-test="SubClock"]`).click();
    cy.get(`[data-test="ClockClear"]`).click();
    cy.get(`[data-test="SubClock"]`).should(`have.value`, ``);
  });
  it(`dialog`, () => {
    cy.get(`[data-test="SubDialog"]`).click();
    cy.get(`[data-test="DialogCheck"]`).last().check();
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="SubDialog"]`).should(`have.value`, `2日前`);
  });
});
