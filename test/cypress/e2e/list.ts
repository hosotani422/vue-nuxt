Cypress.on(`uncaught:exception`, () => false);

describe(`sub`, () => {
  beforeEach(() => {
    cy.visit(`/list0000000000000`);
    cy.get(`[data-test="MainList"]`).click();
  });
  it(`route`, () => {
    cy.get(`[data-test="ListLeft"]`).click();
    cy.get(`[data-test="ListRoot"]`).should(`not.exist`);
  });
  it(`create`, () => {
    cy.get(`[data-test="ListPlus"]`).click();
    cy.get(`[data-test="DialogTitle"]`).type(`list1`);
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="ListItem"]`).should(`have.length`, 3);
  });
  it(`clone`, () => {
    cy.get(`[data-test="ListItem"]`).first().trigger(`touchstart`);
    cy.wait(1000);
    cy.get(`[data-test="ListItem"]`).first().trigger(`touchend`);
    cy.get(`[data-test="ListClone"]`).click();
    cy.get(`[data-test="ListItem"]`).should(`have.length`, 3);
  });
  it(`edit`, () => {
    cy.get(`[data-test="ListItem"]`).first().click();
    cy.get(`[data-test="MainTitle"]`).type(`2`);
    cy.get(`[data-test="MainList"]`).click();
    cy.get(`[data-test="ListTask"]`).first().should(`have.text`, `Inbox2`);
  });
  it(`remove`, () => {
    cy.get(`[data-test="ListItem"]`).last().click();
    cy.get(`[data-test="MainList"]`).click();
    cy.get(`[data-test="ListItem"]`).first().trigger(`touchstart`);
    cy.wait(1000);
    cy.get(`[data-test="ListItem"]`).first().trigger(`touchend`);
    cy.get(`[data-test="ListTrash"]`).click();
    cy.get(`[data-test="DialogOk"]`).click();
    cy.get(`[data-test="ListItem"]`).should(`have.length`, 1);
    cy.get(`[data-test="NoticeBack"]`).click();
    cy.get(`[data-test="ListItem"]`).should(`have.length`, 2);
  });
  it(`current`, () => {
    cy.get(`[data-test="ListItem"]`).first().trigger(`touchstart`);
    cy.wait(1000);
    cy.get(`[data-test="ListItem"]`).first().trigger(`touchend`);
    cy.get(`[data-test="ListClone"]`).should(`exist`);
    cy.get(`[data-test="ListTrash"]`).should(`not.exist`);
  });
  it(`trash`, () => {
    cy.get(`[data-test="ListItem"]`).last().click();
    cy.get(`[data-test="MainList"]`).click();
    cy.get(`[data-test="ListItem"]`).last().trigger(`touchstart`);
    cy.wait(1000);
    cy.get(`[data-test="ListItem"]`).last().trigger(`touchend`);
    cy.get(`[data-test="ListClone"]`).should(`not.exist`);
    cy.get(`[data-test="ListTrash"]`).should(`not.exist`);
  });
});
