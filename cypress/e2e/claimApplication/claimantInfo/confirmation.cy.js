import { globalTestsNew, globalTestsOld } from "../shared";
import { encodeDecode } from '../../../../src/claimApplication/utils';

const PAGE_ID = 'confirmation';
const URL = 'ClaimantCertification';

describe("Confirmation page with First Day of Disability in the past", () => {
  const FIXTURE = "./cypress/fixtures/claimApplication/claimantInfo/confirmation.html";

  function checkClaimDownload(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantCertTab_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Bfalse%2Ctrue%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertStatus=&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertFDD=07%2F15%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPConfirmation%24btnContinue=Print+Claim+Summary');
  }

  function checkM01InstructionsDownload(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPConfirmation%24lnkbtnClickM01&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantCertTab_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Bfalse%2Ctrue%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertStatus=&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertFDD=07%2F15%2F2025');
  }

  function checkC01AwardDownload(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPConfirmation%24lnkbtnClickC01Award&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantCertTab_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Bfalse%2Ctrue%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertStatus=&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertFDD=07%2F15%2F2025');
  }

  function checkC01CardDownload(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPConfirmation%24lnkbtnClickC01Card&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantCertTab_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Bfalse%2Ctrue%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertStatus=&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertFDD=07%2F15%2F2025');
  }

  function checkW01Download(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPConfirmation%24lnkbtnClickW01&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantCertTab_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Bfalse%2Ctrue%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertStatus=&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertFDD=07%2F15%2F2025');
  }

  function checkV01Download(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPConfirmation%24lnkbtnClickV01&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantCertTab_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Bfalse%2Ctrue%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertStatus=&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertFDD=07%2F15%2F2025');
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

    it("shows link to open PDF of claim summary", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_btnContinue').click();
      cy.wait('@aspxSubmission').then(checkClaimDownload);
    });

    it("user can download M01 instructions", () => {
      cy.mockASPX(URL);
      showElement('divC01Award');
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lnkbtnClickM01').click();
      cy.wait('@aspxSubmission').then(checkM01InstructionsDownload);
    });

    it("shows the no employer message when needed", () => {
      showElement('DivNoEmps');
      cy.contains('There are no employers that you worked for in the 180 days prior to your first day of disability.')
        .should('be.visible');
    });

    it("user can download C01 Award when needed", () => {
      cy.mockASPX(URL);
      showElement('divC01Award');
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lnkbtnClickC01Award').click();
      cy.wait('@aspxSubmission').then(checkC01AwardDownload);
    });

    it("user can download C01 Card when needed", () => {
      cy.mockASPX(URL);
      showElement('divC01Card');
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lnkbtnClickC01Card').click();
      cy.wait('@aspxSubmission').then(checkC01CardDownload);
    });

    it("user can download W01 when needed", () => {
      cy.mockASPX(URL);
      showElement('divW01');
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lnkbtnClickW01').click();
      cy.wait('@aspxSubmission').then(checkW01Download);
    });

    it("user can download V01 when needed", () => {
      cy.mockASPX(URL);
      showElement('divV01');
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lnkbtnClickV01').click();
      cy.wait('@aspxSubmission').then(checkV01Download);
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

    it("displays the mailing address when present", () => {
      cy.window().then((win) => {
        const data = {
          user_name: "Liz Lemon",
          user_mail_address: {
            line1: "123 Main Street",
            line2: "Newark, NJ 07123-1234"
          }
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));          
      });
      cy.visit(FIXTURE);
      cy.get('body').should('contain.text', '123 Main Street');
    });

    it("shows link to open PDF of claim summary", () => {
      cy.mockASPX(URL);
      cy.get('#applicationPdfDownload').click();
      cy.wait('@aspxSubmission').then(checkClaimDownload);
      cy.checkLogEvent(`TDI Confirmation - PDF Download Clicked`, {});
    });

    it("shows button to copy sample M01 text when session has data", () => {
      cy.clock(new Date(2025, 8, 23)); // 0-indexed; Sept. 23, 2025
      cy.window().then((win) => {
        const data = {
          provider_name: "Dr. Spaceman",
          user_dob: "Jan 1, 2000",
          user_name: "Liz Lemon",
          user_email: "lemon@nbc.com",
          user_phone: "(555) 555-5555"
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);

      cy.get('button.usa-accordion__button[aria-controls="sampleLanguageContainer"]').click();
      cy.get('#m01CopyButton').click();

      const expectedText = `
        Subject: Request for Medical Form M01 - Temporary Disability Claim
        Dear Dr. Spaceman,
        I'm requesting your help to complete Form M01 for my
        New Jersey Temporary Disability Insurance claim.
        The easiest way to submit it is online at
        www.nj.gov/labor/MedicalApplicationTDI using this
        Online Form ID: 25091950002 and my date of birth: Jan 1, 2000.
        Please submit the form by October 7, 2025 to avoid delays on my claim.
        Please let me know when it's complete. Thank you for your help.
        Liz Lemon
        lemon@nbc.com
        (555) 555-5555
      `;

      const normalizeWhitespace = (text) => text.replace(/\s+/g, ' ').trim();
      cy.window().then((win) => {
        return win.navigator.clipboard.readText();
      }).then((clipboardText) => {
        expect(normalizeWhitespace(clipboardText)).to.eq(normalizeWhitespace(expectedText));
      });
    });

    it("shows button to copy sample M01 text when session does not have data", () => {
      cy.clock(new Date(2025, 8, 23)); // 0-indexed; Sept. 23, 2025
      cy.visit(FIXTURE);
      cy.get('button.usa-accordion__button[aria-controls="sampleLanguageContainer"]').click();
      cy.get('#m01CopyButton').click();

      const expectedText = `
        Subject: Request for Medical Form M01 - Temporary Disability Claim
        Dear {{ INSERT YOUR MEDICAL PROVIDER'S NAME }},
        I'm requesting your help to complete Form M01 for my
        New Jersey Temporary Disability Insurance claim.
        The easiest way to submit it is online at
        www.nj.gov/labor/MedicalApplicationTDI using this
        Online Form ID: 25091950002 and my date of birth: {{ INSERT YOUR DATE OF BIRTH }}.
        Please submit the form by October 7, 2025 to avoid delays on my claim.
        Please let me know when it's complete. Thank you for your help.
        {{ INSERT YOUR NAME }}
      `;

      const normalizeWhitespace = (text) => text.replace(/\s+/g, ' ').trim();
      cy.window().then((win) => {
        return win.navigator.clipboard.readText();
      }).then((clipboardText) => {
        expect(normalizeWhitespace(clipboardText)).to.eq(normalizeWhitespace(expectedText));
        cy.checkLogEvent(`TDI Confirmation - Copy M01 Sample Clicked`, {});
      });
    });

    it("shows button to download M01 instructions", () => {
      cy.mockASPX(URL);
      cy.get('#downloadM01InstructionsButton').click();
      cy.wait('@aspxSubmission').then(checkM01InstructionsDownload);
      cy.checkLogEvent(`TDI Confirmation - Download M01 Instructions Clicked`, {});
    });

    it("shows the no employer message when needed", () => {
      showElement('DivNoEmps');
      cy.checkLogEvent(`TDI Confirmation - No Emp Shown`, {});
      cy.contains('There are no employers that you worked for in the 180 days prior to your first day of disability.')
        .should('be.visible');
    });

    it("shows C01 download button when award normally shown", () => {
      cy.mockASPX(URL);
      showElement('divC01Award');
      cy.checkLogEvent(`TDI Confirmation - C01 Award Shown`, {});
      cy.get('#downloadC01Award').click();
      cy.wait('@aspxSubmission').then(checkC01AwardDownload);
      cy.checkLogEvent(`TDI Confirmation - Download C01 Award Clicked`, {});
    });

    it("shows button to download C01 when card normally shown", () => {
      cy.mockASPX(URL);
      showElement('divC01Card');
      cy.checkLogEvent(`TDI Confirmation - C01 Card Shown`, {});
      cy.get('#downloadC01Card').click();
      cy.wait('@aspxSubmission').then(checkC01CardDownload);
      cy.checkLogEvent(`TDI Confirmation - Download C01 Card Clicked`, {});
    });

    it("shows button to download W01 when needed", () => {
      cy.mockASPX(URL);
      showElement('divW01');
      cy.checkLogEvent(`TDI Confirmation - W01 Shown`, {});
      cy.get('#downloadW01').click();
      cy.wait('@aspxSubmission').then(checkW01Download);
      cy.checkLogEvent(`TDI Confirmation - Download W01 Clicked`, {});
    });

    it("shows button to download V01 when needed", () => {
      cy.mockASPX(URL);
      showElement('divV01');
      cy.checkLogEvent(`TDI Confirmation - V01 Shown`, {});
      cy.get('#downloadV01').click();
      cy.wait('@aspxSubmission').then(checkV01Download);
      cy.checkLogEvent(`TDI Confirmation - Download V01 Clicked`, {});
    });

    globalTestsNew(PAGE_ID, URL);
  });
});

describe("Confirmation page with First Day of Disability in the future", () => {

  const FIXTURE = "./cypress/fixtures/claimApplication/confirmationFuture/confirmationFuture.html";

  function checkClaimDownload(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantCertTab_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Bfalse%2Ctrue%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertStatus=N&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPCertification%24hdnCertFDD=10%2F25%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantCertTab%24TPConfirmation%24btnFDDContinue=Print+Claim+Summary');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("shows link to open PDF of claim summary", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_btnFDDContinue').click();
      cy.wait('@aspxSubmission').then(checkClaimDownload);
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

    it("shows link to open PDF of claim summary", () => {
      cy.mockASPX(URL);
      cy.get('#applicationPdfDownload').click();
      cy.wait('@aspxSubmission').then(checkClaimDownload);
      cy.checkLogEvent(`TDI Confirmation - PDF Download Clicked`, {});
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
