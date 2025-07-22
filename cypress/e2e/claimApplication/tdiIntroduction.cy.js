describe("Introduction page", () => {
  beforeEach(() => {
    cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
      req.continue((res) => {
        expect([200, 304]).to.include(res.statusCode);
      });
    }).as('script');
    cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/TDI.html");
    cy.wait('@script');
  });

  it("displays existing page with no visible changes", () => {
    cy.contains("APPLICATION FOR STATE TEMPORARY DISABILITY BENEFITS").should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.checkBodyA11y();
  });
});
