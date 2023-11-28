Cypress.on(`uncaught:exception`, () => false);

describe(`sub`, () => {
  beforeEach(() => {
    cy.visit(`/list0000000000000`);
    cy.get(`[data-testid="MainConf"]`).click();
    cy.get(`[data-testid="ConfBackupUpload"]`).selectFile(`./test/memotea.bak`);
    cy.get(`[data-testid="MainItem"]`).first().click();
  });
  it(`route`, () => {
    cy.get(`[data-testid="SubRight"]`).click();
    cy.get(`[data-testid="SubRoot"]`).should(`not.exist`);
  });
  it(`create`, () => {
    cy.get(`[data-testid="SubTask"]`).first().type(`{enter}`);
    cy.get(`[data-testid="SubItem"]`).should(`have.length`, 3);
  });
  it(`check`, () => {
    cy.get(`[data-testid="SubCheck"]`).first().check();
    cy.get(`[data-testid="SubCheck"]`).first().should(`be.checked`);
    cy.get(`[data-testid="SubCheck"]`).last().uncheck();
    cy.get(`[data-testid="SubCheck"]`).first().should(`not.be.checked`);
  });
  it(`mode`, () => {
    cy.get(`[data-testid="SubMode"]`).click();
    cy.get(`[data-testid="SubMemo"]`).should(`have.value`, `sub1\nsub2`);
  });
  it(`delete`, () => {
    cy.get(`[data-testid="SubTask"]`).last().click();
    cy.get(`[data-testid="SubTrash"]`).trigger(`touchstart`);
    cy.get(`[data-testid="SubItem"]`).should(`have.length`, 1);
  });
  it(`calendar`, () => {
    cy.get(`[data-testid="SubCalendar"]`).click();
    cy.get(`[data-testid="CalendarDay"]`).eq(41).click();
    cy.get(`[data-testid="SubCalendar"]`).should(`have.value`, `2000/01/02`);
    cy.get(`[data-testid="SubCalendar"]`).click();
    cy.get(`[data-testid="CalendarClear"]`).click();
    cy.get(`[data-testid="SubCalendar"]`).should(`have.value`, ``);
  });
  it(`clock`, () => {
    cy.get(`[data-testid="SubClock"]`).click();
    cy.get(`[data-testid="ClockOk"]`).click();
    cy.get(`[data-testid="SubClock"]`).should(`have.value`, `00:00`);
    cy.get(`[data-testid="SubClock"]`).click();
    cy.get(`[data-testid="ClockClear"]`).click();
    cy.get(`[data-testid="SubClock"]`).should(`have.value`, ``);
  });
  it(`dialog`, () => {
    cy.get(`[data-testid="SubDialog"]`).click();
    cy.get(`[data-testid="DialogCheck"]`).last().check();
    cy.get(`[data-testid="DialogOk"]`).click();
    cy.get(`[data-testid="SubDialog"]`).should(`have.value`, `5分前,1時間前,2日前`);
  });
});
