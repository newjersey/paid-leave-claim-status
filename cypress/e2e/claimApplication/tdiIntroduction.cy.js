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

  it("applies mobile-friendly adjustments", () => {
    cy.viewport(390, 844);
    cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");
    cy.get('meta[name="viewport"]')
      .should('have.attr', 'content', 'width=device-width, initial-scale=1');
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'style', 'width: 100%; height: auto;');
    });
  });
});
