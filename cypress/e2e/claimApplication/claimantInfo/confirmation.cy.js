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

  function showElement(elementId) {
    cy.intercept('GET', '**/confirmation.html', (req) => {
      req.reply((res) => {
        const regex = new RegExp(`<div id="${elementId}" style="display: none;">`, 'g');
        const modifiedHtml = res.body.replace(regex, `<div id="${elementId}">`);
        res.send(modifiedHtml);
      });
    });
    cy.visit(FIXTURE);
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

    it("shows the no employer message when needed", () => {
      showElement('DivNoEmps');
      cy.contains('There are no employers that you worked for in the 180 days prior to your first day of disability.')
        .should('be.visible');
    });

    it("shows the C01 Award message when needed", () => {
      showElement('divC01Award');
      cy.contains('This form must be returned along with a photocopy of your Social Security Award Letter.')
        .should('be.visible');
    });

    it("shows the C01 Card message when needed", () => {
      showElement('divC01Card');
      cy.contains('be returned along with a legible photocopy of your social security card, issued by the Social Security Administration')
        .should('be.visible');
    });

    it("shows the W01 message when needed", () => {
      showElement('divW01');
      cy.contains('You have indicated that your disability is work related')
        .should('be.visible');
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

    it("shows the no employer message when needed", () => {
      showElement('DivNoEmps');
      cy.contains('There are no employers that you worked for in the 180 days prior to your first day of disability.')
        .should('be.visible');
    });

    it("shows the C01 Award message when needed", () => {
      showElement('divC01Award');
      cy.contains('C01 Award!')
        .should('be.visible');
    });

    it("shows the C01 Card message when needed", () => {
      showElement('divC01Card');
      cy.contains('C01 Card info')
        .should('be.visible');
    });

    it("shows the W01 message when needed", () => {
      showElement('divW01');
      cy.contains('Info about W01')
        .should('be.visible');
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
