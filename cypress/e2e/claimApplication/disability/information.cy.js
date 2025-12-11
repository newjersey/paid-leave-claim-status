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

    function checkSessionData(reasonForLeaveData) {
      cy.window().then((win) => {
        const encodedData = win.sessionStorage.getItem('session_data');
        const data = JSON.parse(encodeDecode(encodedData));
        expect(data).to.deep.equal({
          reason_for_leave: reasonForLeaveData
        });
      });
    }

    it("user can input info about pregnancy with blank extra text and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#reason-pregnancy').click({ force: true });
      cy.get('#submitReasonForLeave').click();
      checkLeaveSchedule();
      checkSessionData(EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY);
    });

    it("user can input info about pregnancy and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#reason-pregnancy').click({ force: true });
      cy.get('#pregnancy-details').type("Emergency C-section.");
      cy.get('#submitReasonForLeave').click();
      cy.get('#leaveScheduleBack').click();
      cy.get('#submitReasonForLeave').click();
      checkLeaveSchedule();
      checkSessionData(EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY_DETAILS);
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
      checkSessionData(EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS);
    });

    it("user can input info about illness and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#reason-illness').click({ force: true });
      cy.get('#illness-details').type("Lung Inflammation.");
      cy.get('#submitReasonForLeave').click();
      checkLeaveSchedule();
      checkSessionData(EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS_DETAILS);
    });

    it("user can input info about injury with blank extra text and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#reason-injury').click({ force: true });
      cy.get('#submitReasonForLeave').click();
      checkLeaveSchedule();
      checkSessionData(EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY);
    });

    it("user can input info about injury and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#reason-injury').click({ force: true });
      cy.get('#injury-details').type("Broken Elbow.");
      cy.get('#submitReasonForLeave').click();
      checkLeaveSchedule();
      checkSessionData(EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY_DETAILS);
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

    it("has required reason for leave fields on Leave Reason page", () => {
      cy.get('#reason-pregnancy').should('have.attr', 'required');
      cy.get('#reason-illness').should('have.attr', 'required');
      cy.get('#reason-injury').should('have.attr', 'required');
    });
  
    it("reason for leave fields are NOT required on when on Leave Schedule page", () => {
      cy.get('#reason-illness').click({ force: true });
      cy.get('#submitReasonForLeave').click();
      cy.get('#reason-pregnancy').should('not.have.attr', 'required');
      cy.get('#reason-illness').should('not.have.attr', 'required');
      cy.get('#reason-injury').should('not.have.attr', 'required');
    });
  
    it("reason fields become required again when navigating back", () => {
      cy.get('#reason-illness').click({ force: true });
      cy.get('#submitReasonForLeave').click();
      cy.get('#leaveScheduleBack').click();
      cy.get('#reason-pregnancy').should('have.attr', 'required');
      cy.get('#reason-illness').should('have.attr', 'required');
      cy.get('#reason-injury').should('have.attr', 'required');
    });

    it("restores reason for leave (pregnancy) with details from session storage", () => {
      cy.window().then((win) => {
        const data = {
          reason_for_leave: {
            reasons: "pregnancy",
            "pregnancy-details": "Emergency C-section."
          }
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#reason-pregnancy').should('be.checked');
      cy.get('textarea[name="pregnancy-details"]')
        .should('be.visible')
        .and('have.value', 'Emergency C-section.');
      cy.get('#illness-details').should('not.be.visible');
      cy.get('#injury-details').should('not.be.visible');
    });

    it("restores reason for leave (illness) with details from session storage", () => {
      cy.window().then((win) => {
        const data = {
          reason_for_leave: {
            reasons: "illness",
            "illness-details": "Lung inflammation."
          }
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#reason-illness').should('be.checked');
      cy.get('textarea[name="illness-details"]')
        .should('be.visible')
        .and('have.value', 'Lung inflammation.');
    });
  
    it("restores reason for leave (injury) with details from session storage", () => {
      cy.window().then((win) => {
        const data = {
          reason_for_leave: {
            reasons: "injury",
            "injury-details": "Fell down"
          }
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#reason-injury').should('be.checked');
      cy.get('textarea[name="injury-details"]')
        .should('be.visible')
        .and('have.value', 'Fell down');
    });

    it("strips paste signal suffix from restored details", () => {
      cy.window().then((win) => {
        const data = {
          reason_for_leave: {
            reasons: "illness",
            "illness-details": "Lung Inflammation.p120"  // has paste signal
          }
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('textarea[name="illness-details"]')
        .should('have.value', 'Lung Inflammation.');
    });
  
    it("shows pregnancy-specific Leave Schedule content after restoring from session data", () => {
      cy.window().then((win) => {
        const data = { reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#submitReasonForLeave').click();
      cy.get('#maternityTimeline').should('be.visible');
      cy.get('#pregnancyAlert').should('be.visible');
    });
    
    it("does not show pregnancy related info with non-pregnancy leave type after restoring from session data", () => {
      cy.window().then((win) => {
        const data = { reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#submitReasonForLeave').click();
      cy.get('#maternityTimeline').should('not.be.visible');
      cy.get('#pregnancyAlert').should('not.be.visible');
    });

    it("handles empty session storage gracefully", () => {
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#reason-pregnancy').should('not.be.checked');
      cy.get('#reason-illness').should('not.be.checked');
      cy.get('#reason-injury').should('not.be.checked');
    });
    
    it("handles malformed session data gracefully", () => {
      cy.window().then((win) => {
        const data = { reason_for_leave: { reasons: null } };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#reason-pregnancy').should('not.be.checked');
    });
    
    it("handles missing details key gracefully when restoring from session data", () => {
      cy.window().then((win) => {
        const data = {
          reason_for_leave: {
            reasons: "illness"
            // no details key
          }
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#reason-illness').should('be.checked');
      cy.get('textarea[name="illness-details"]')
        .should('be.visible')
        .and('have.value', '');  
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
