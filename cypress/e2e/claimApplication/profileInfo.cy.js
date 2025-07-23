describe("Profile Info page", () => {
  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/profileInfo/TDI.html");
    });

    // TODO: replace with test of important behavior
    it("displays existing page with no visible changes", () => {
      cy.contains("Profile Information").should("be.visible");
    });

    it("invisible link is not hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('not.have.attr', 'aria-hidden');
    });
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit("./cypress/fixtures/claimApplication/profileInfo/TDI.html");
      cy.wait('@script');
    });

    // TODO: replace with test of important behavior
    it("displays existing page with no visible changes", () => {
      cy.contains("Profile Information").should("be.visible");
    });

    it("invisible link is hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('have.attr', 'aria-hidden', 'true');
    });
  });
});
