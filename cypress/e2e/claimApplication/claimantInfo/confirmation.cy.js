import { globalTestsNew, globalTestsOld } from "../shared";

const PAGE_ID = 'confirmation';
const URL = 'ClaimantCertification';
const FIXTURE = "./cypress/fixtures/claimApplication/claimantInfo/confirmation.html";

describe("Confirmation page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantCertTab_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Bfalse%2Ctrue%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertStatus=&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertFDD=07%2F15%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPConfirmation%24btnContinue=Print+Claim+Summary');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can open PDF of claim summary", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_btnContinue').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    globalTestsOld(URL);
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit(FIXTURE);
      cy.wait('@script');
    });

    it("user can open PDF of claim summary", () => {
      cy.mockASPX(URL);
      cy.get('#applicationPdfDownload').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
