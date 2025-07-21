describe("Introduction page", () => {
  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");
    cy.checkBodyA11y();
  });
});
