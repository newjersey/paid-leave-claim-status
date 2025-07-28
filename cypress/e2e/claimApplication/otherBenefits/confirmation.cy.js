describe("Confirmation page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantCertTab_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Bfalse%2Ctrue%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertStatus=&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertFDD=07%2F15%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPConfirmation%24btnContinue=Print+Claim+Summary');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimantCertification.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/otherBenefits/confirmation.html");
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_btnContinue').click();
      cy.wait('@aspxSubmission').then(checkPostData);
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
      cy.visit("./cypress/fixtures/claimApplication/otherBenefits/confirmation.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_btnContinue').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("invisible link is hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('have.attr', 'aria-hidden', 'true');
    });
  });
});
