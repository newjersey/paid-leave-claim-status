const PAGE_ID = 'certification';

describe("Certification page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantCertTab_ClientState=%7B%22ActiveTabIndex%22%3A0%2C%22TabState%22%3A%5Btrue%2Cfalse%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertStatus=&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertFDD=07%2F15%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24rbAgree=rbtnAgYes&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24btnConfirm=File+My+Claim');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimantCertification.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/certification.html");
    });

    it("user can agree and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_btnConfirm').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it('should open FAQ and post data when the Help link is clicked', () => {
      cy.checkHelpButtonBehavior();
    });
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/certification.html");
      cy.wait('@script');
    });

    it("user can agree and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_btnConfirm').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("applies the new font family", () => {
      cy.checkFontFamily();
    });

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });

    it("tracks the page view", () => {
      cy.trackPageView(PAGE_ID);
    });

    it('should open FAQ, post data, and track when the Help link is clicked', () => {
      cy.checkNewHelpBehavior();
      cy.trackHelpClick(PAGE_ID);
    });
  });
});
