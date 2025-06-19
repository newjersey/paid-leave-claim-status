describe("Introduction page", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");

    cy.contains("APPLICATION FOR STATE TEMPORARY DISABILITY BENEFITS");
    cy.contains("I have read the above information");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");
    cy.checkBodyA11y();
  });
});
