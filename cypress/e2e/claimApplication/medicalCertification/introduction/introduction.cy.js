describe("Medical Certification page", () => {
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

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });
  });
});
