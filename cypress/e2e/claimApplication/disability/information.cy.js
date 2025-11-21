import {
  EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS,
  EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS_DETAILS,
  EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY,
  EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY_DETAILS,
  EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY,
  EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY_DETAILS,
  globalTestsNew,
  globalTestsOld
} from "../shared";
import { encodeDecode } from '../../../../src/claimApplication/utils';

const PAGE_ID = 'disabilityInformation';
const URL = 'ClaimantDisabililty';
const FIXTURE = "./cypress/fixtures/claimApplication/disability/information.html";

describe("Disability Information page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDisStartDt=07%2F18%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=07%2F17%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=08%2F17%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24btnSubmitConflictCheck=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can input info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt').type("07/18/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd').type("07/17/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk').type("08/17/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_btnSubmitConflictCheck').click();
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

    function checkLeaveSchedule() {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt').type("07/18/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd').type("07/17/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk').type("08/17/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_btnSubmitConflictCheck').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    }

    it("user can input info about pregnancy with blank extra text and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#reason-pregnancy').click({ force: true });
      cy.get('#submitReasonForLeave').click();
      checkLeaveSchedule();
      cy.window().then((win) => {
        const encodedData = win.sessionStorage.getItem('session_data');
        const data = JSON.parse(encodeDecode(encodedData));
        expect(data).to.deep.equal({
          reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY
        });
      });
    });

    it("user can input info about pregnancy and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#reason-pregnancy').click({ force: true });
      cy.get('#pregnancy-details').type("Emergency C-Section.");
      cy.get('#submitReasonForLeave').click();
      cy.get('#leaveScheduleBack').click();
      cy.get('#submitReasonForLeave').click();
      checkLeaveSchedule();
      // TODO: check session storage
    });

    it("user can input info about illness with blank extra text after first choosing injury and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#reason-injury').click({ force: true });
      cy.get('#injury-details').type("Broken Elbow.");
      cy.get('#submitReasonForLeave').click();
      cy.get('#leaveScheduleBack').click();
      cy.get('#reason-illness').click({ force: true });
      cy.get('#submitReasonForLeave').click();
      checkLeaveSchedule();
      // TODO: check session storage
    });

    it("user can input info about illness and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#reason-illness').click({ force: true });
      cy.get('#illness-details').type("Lung Inflammation.");
      cy.get('#submitReasonForLeave').click();
      checkLeaveSchedule();
      // TODO: check session storage
    });

    it("user can input info about injury with blank extra text and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#reason-injury').click({ force: true });
      cy.get('#submitReasonForLeave').click();
      checkLeaveSchedule();
      // TODO: check session storage
    });

    it("user can input info about injury and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#reason-injury').click({ force: true });
      cy.get('#injury-details').type("Broken Elbow.");
      cy.get('#submitReasonForLeave').click();
      checkLeaveSchedule();
      // TODO: check session storage
    });

    it("blocks user that enters First Date of Disability in the future", () => {
      cy.mockASPX(URL);
      cy.get('#reason-pregnancy').click({ force: true });
      cy.get('#submitReasonForLeave').click();

      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 1); // 1 day in future

      // MM/DD/YYYY
      const formattedFutureDate = `${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${
        futureDate.getDate().toString().padStart(2, '0')}/${futureDate.getFullYear()}`;

      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt').type(formattedFutureDate);
      cy.get('h2').contains("You're a little early").should('be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_btnSubmitConflictCheck').should('not.be.visible');
    });

    it("tracks that this page fixture has a validation error", () => {
      const truncatedMessage = "PLEASE ANSWER THE FOLLOWING QUESTION(S). THEY MUST BE COMPLETED TO PROCEED:3a. Select the date you e";
      cy.checkLogEvent("Validation Error", { contents: truncatedMessage });
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
