describe("Profile Info page", () => {
  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/profileInfo/TDI.html");
    });

    it("displays existing page with no visible changes", () => {
      cy.contains("Profile Information").should("be.visible");
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

    it("displays existing page with no visible changes", () => {
      cy.contains("Profile Information").should("be.visible");
    });
  });
});
