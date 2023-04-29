Cypress.on(`uncaught:exception`, () => false);

describe(`sub`, () => {
  beforeEach(() => {
    cy.visit(`/list0000000000000`);
  });
  it(`create`, () => {
    cy.get(`[data-test="MainPlus"]`).click();
    cy.get(`[data-test="DialogTitle"]`).type(`main1`);
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="MainItem"]`).should(`have.length`, 1);
  });
  it(`clone`, () => {
    cy.get(`[data-test="MainPlus"]`).click();
    cy.get(`[data-test="DialogTitle"]`).type(`main1`);
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="MainItem"]`).first().trigger(`touchstart`);
    cy.wait(1000);
    cy.get(`[data-test="MainItem"]`).first().trigger(`touchend`);
    cy.get(`[data-test="MainClone"]`).click();
    cy.get(`[data-test="MainItem"]`).should(`have.length`, 2);
  });
  it(`edit`, () => {
    cy.get(`[data-test="MainPlus"]`).click();
    cy.get(`[data-test="DialogTitle"]`).type(`main1`);
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="MainItem"]`).click();
    cy.get(`[data-test="SubTitle"]`).type(`{backspace}`);
    cy.get(`[data-test="SubTitle"]`).type(`2`);
    cy.get(`[data-test="SubRight"]`).click();
    cy.get(`[data-test="MainTask"]`).should(`have.text`, `main2`);
  });
  it(`check`, () => {
    cy.get(`[data-test="MainPlus"]`).click();
    cy.get(`[data-test="DialogTitle"]`).type(`main1`);
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="MainPlus"]`).click();
    cy.get(`[data-test="DialogTitle"]`).type(`main2`);
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="MainCheck"]`).first().check();
    cy.get(`[data-test="MainCheck"]`).last().should(`be.checked`);
    cy.get(`[data-test="MainCheck"]`).last().uncheck();
    cy.get(`[data-test="MainCheck"]`).last().should(`not.be.checked`);
  });
  it(`move`, () => {
    cy.get(`[data-test="MainPlus"]`).click();
    cy.get(`[data-test="DialogTitle"]`).type(`main1`);
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="MainItem"]`).trigger(`touchstart`);
    cy.wait(1000);
    cy.get(`[data-test="MainItem"]`).trigger(`touchend`);
    cy.get(`[data-test="MainMove"]`).click();
    cy.get(`[data-test="DialogRadio"]`).last().check();
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="MainItem"]`).should(`have.length`, 0);
  });
  it(`delete`, () => {
    cy.get(`[data-test="MainPlus"]`).click();
    cy.get(`[data-test="DialogTitle"]`).type(`main1`);
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="MainItem"]`).trigger(`touchstart`);
    cy.wait(1000);
    cy.get(`[data-test="MainItem"]`).trigger(`touchend`);
    cy.get(`[data-test="MainTrash"]`).click();
    cy.get(`[data-test="MainItem"]`).should(`have.length`, 0);
    cy.get(`[data-test="NoticeBack"]`).click();
    cy.get(`[data-test="MainItem"]`).should(`have.length`, 1);
  });
});
