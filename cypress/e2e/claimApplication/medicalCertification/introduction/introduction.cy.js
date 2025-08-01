describe("Medical Certification Intro page", () => {
  function mockASPX() {
    cy.intercept('GET', '**/LoginMedicalCertification.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/medicalCertification/introduction/MedicalIntroduction.aspx.html");
    });

    it("user can agree and proceed to next page", () => {
      mockASPX();
      cy.contains('a', 'SUPPLY PATIENT’S MEDICAL CERTIFICATE').click();
      cy.wait('@aspxSubmission');
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
      cy.visit("./cypress/fixtures/claimApplication/medicalCertification/introduction/MedicalIntroduction.aspx.html");
      cy.wait('@script');
    });

    it("user can agree and proceed to next page", () => {
      mockASPX();
      cy.contains('a', 'SUPPLY PATIENT’S MEDICAL CERTIFICATE').click();
      cy.wait('@aspxSubmission');
    });

    it("invisible link is not hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('not.have.attr', 'aria-hidden');
    });
  });
});
