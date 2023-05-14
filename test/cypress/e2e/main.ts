Cypress.on(`uncaught:exception`, () => false);

describe(`main`, () => {
  beforeEach(() => {
    cy.visit(`/list0000000000000`);
  });
  it(`create`, () => {
    cy.get(`[data-testid="MainPlus"]`).click();
    cy.get(`[data-testid="DialogTitle"]`).type(`main1`);
    cy.get(`[data-testid="DialogOk"]`).click();
    cy.get(`[data-testid="MainItem"]`).should(`have.length`, 1);
  });
  it(`clone`, () => {
    cy.get(`[data-testid="MainPlus"]`).click();
    cy.get(`[data-testid="DialogTitle"]`).type(`main1`);
    cy.get(`[data-testid="DialogOk"]`).click();
    cy.get(`[data-testid="MainItem"]`).first().trigger(`touchstart`);
    cy.wait(1000);
    cy.get(`[data-testid="MainItem"]`).first().trigger(`touchend`);
    cy.get(`[data-testid="MainClone"]`).click();
    cy.get(`[data-testid="MainItem"]`).should(`have.length`, 2);
  });
  it(`edit`, () => {
    cy.get(`[data-testid="MainPlus"]`).click();
    cy.get(`[data-testid="DialogTitle"]`).type(`main1`);
    cy.get(`[data-testid="DialogOk"]`).click();
    cy.get(`[data-testid="MainItem"]`).click();
    cy.get(`[data-testid="SubTitle"]`).type(`{backspace}`);
    cy.get(`[data-testid="SubTitle"]`).type(`2`);
    cy.get(`[data-testid="SubRight"]`).click();
    cy.get(`[data-testid="MainTask"]`).should(`have.text`, `main2`);
  });
  it(`check`, () => {
    cy.get(`[data-testid="MainPlus"]`).click();
    cy.get(`[data-testid="DialogTitle"]`).type(`main1`);
    cy.get(`[data-testid="DialogOk"]`).click();
    cy.get(`[data-testid="MainPlus"]`).click();
    cy.get(`[data-testid="DialogTitle"]`).type(`main2`);
    cy.get(`[data-testid="DialogOk"]`).click();
    cy.get(`[data-testid="MainCheck"]`).first().check();
    cy.get(`[data-testid="MainCheck"]`).last().should(`be.checked`);
    cy.get(`[data-testid="MainCheck"]`).last().uncheck();
    cy.get(`[data-testid="MainCheck"]`).last().should(`not.be.checked`);
  });
  it(`move`, () => {
    cy.get(`[data-testid="MainPlus"]`).click();
    cy.get(`[data-testid="DialogTitle"]`).type(`main1`);
    cy.get(`[data-testid="DialogOk"]`).click();
    cy.get(`[data-testid="MainItem"]`).trigger(`touchstart`);
    cy.wait(1000);
    cy.get(`[data-testid="MainItem"]`).trigger(`touchend`);
    cy.get(`[data-testid="MainMove"]`).click();
    cy.get(`[data-testid="DialogRadio"]`).last().check();
    cy.get(`[data-testid="DialogOk"]`).click();
    cy.get(`[data-testid="MainItem"]`).should(`have.length`, 0);
  });
  it(`delete`, () => {
    cy.get(`[data-testid="MainPlus"]`).click();
    cy.get(`[data-testid="DialogTitle"]`).type(`main1`);
    cy.get(`[data-testid="DialogOk"]`).click();
    cy.get(`[data-testid="MainItem"]`).trigger(`touchstart`);
    cy.wait(1000);
    cy.get(`[data-testid="MainItem"]`).trigger(`touchend`);
    cy.get(`[data-testid="MainTrash"]`).click();
    cy.get(`[data-testid="MainItem"]`).should(`have.length`, 0);
    cy.get(`[data-testid="NoticeBack"]`).click();
    cy.get(`[data-testid="MainItem"]`).should(`have.length`, 1);
  });
});
