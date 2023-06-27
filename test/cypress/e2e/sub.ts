Cypress.on(`uncaught:exception`, () => false);

describe(`sub`, () => {
  beforeEach(() => {
    cy.visit(`/list0000000000000`);
    cy.get(`[data-testid="MainConf"]`).click();
    cy.get(`[data-testid="ConfLoad"]`).selectFile(`./test/memotea.bak`);
    cy.get(`[data-testid="MainItem"]`).first().click();
  });
  it(`route`, () => {
    cy.get(`[data-testid="SubRight"]`).click();
    cy.get(`[data-testid="SubRoot"]`).should(`not.exist`);
  });
  it(`create`, () => {
    cy.get(`[data-testid="SubTask"]`).first().type(`{enter}`);
    cy.get(`[data-testid="SubItem"]`).should(`have.length`, 4);
  });
  it(`check`, () => {
    cy.get(`[data-testid="SubCheck"]`).first().check();
    cy.get(`[data-testid="SubCheck"]`).last().should(`be.checked`);
    cy.get(`[data-testid="SubCheck"]`).last().uncheck();
    cy.get(`[data-testid="SubCheck"]`).last().should(`not.be.checked`);
  });
  it(`mode`, () => {
    cy.get(`[data-testid="SubMode"]`).click();
    cy.get(`[data-testid="SubMemo"]`).should(`have.value`, `sub1\nsub2\nsub3`);
  });
  it(`delete`, () => {
    cy.get(`[data-testid="SubTask"]`).last().click();
    cy.get(`[data-testid="SubTrash"]`).trigger(`touchstart`);
    cy.get(`[data-testid="SubItem"]`).should(`have.length`, 2);
  });
  it(`calendar`, () => {
    cy.get(`[data-testid="SubCalendar"]`).click();
    cy.get(`[data-testid="CalendarItem"]`).eq(45).click();
    cy.get(`[data-testid="SubCalendar"]`).should(`not.have.value`, ``);
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
    cy.get(`[data-testid="SubDialog"]`).should(`have.value`, `2日前`);
  });
});
