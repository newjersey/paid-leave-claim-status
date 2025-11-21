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

const PAGE_ID = 'medicalTreatment';
const URL = 'ClaimantDisabililty';
const FIXTURE = "./cypress/fixtures/claimApplication/medical/treatment.html";

describe("Medical Treatment page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDisStartDt=07%2F15%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=07%2F14%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=08%2F13%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtInjury=Injury&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24text_num_inj=294&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocNm=Dr.+Spaceman&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbnDocAdd=rbnDocAddYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip1=08901&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOutCtryDocZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbER=rbtnERNO&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtERStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtEREndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbHosp=rbtnHospNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbInj=rbtnInjNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24btnDoc=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=');
  }

  function fillCommonResponses() {
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocNm').type('Dr. Spaceman');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbnDocAddYes').click({ force: true });
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocAdd1').type('30 Livingston Avenue');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocCity').type('New Brunswick');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocZip1').type('08901');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnERNO').click({ force: true });
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnHospNo').click({ force: true });
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can input info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').type('Injury');
      fillCommonResponses();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
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

    it("user cannot submit if provider type unchecked", () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.get('#check-provider-type-accepted')
        .then(($input) => {
          expect($input[0].validationMessage).to.exist;
        });
    });

    it("user cannot submit if caused-by-job unanswered", () => {
      cy.get('#check-provider-type-accepted').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.get('#caused-by-job-yes')
        .then(($input) => {
          expect($input[0].validationMessage).to.exist;
        });
    });

    it("user can input info when session storage empty and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').type('Injury');
      cy.get('#check-provider-type-accepted').click({ force: true });
      fillCommonResponses();
      cy.get('#caused-by-job-no').click({ force: true });
      // cy.get('#workersCompContainer').should('not.be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.wait('@aspxSubmission').then(checkPostData);
      cy.confirmEventIsNotTracked("WorkersComp Yes Clicked");
    });

    it("user can input info when session contains pregnant reason and proceed to next page", () => {
      cy.window().then((win) => {
        const data = { reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));     
      });
      cy.visit(FIXTURE);
      cy.mockASPX(URL);

      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').should('not.be.visible');
      cy.get('#check-provider-type-accepted').click({ force: true });
      fillCommonResponses();
      cy.get('#causedByJobQuestion').should('not.be.visible');
      cy.get('#workersCompContainer').should('not.be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      // TODO: verify post data for automatic entry
      // cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("user can input info when session contains injury reason and proceed to next page", () => {
      cy.window().then((win) => {
        const data = { reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY_DETAILS };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));     
      });
      cy.visit(FIXTURE);
      cy.mockASPX(URL);

      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').should('not.be.visible');
      cy.get('#check-provider-type-accepted').click({ force: true });
      fillCommonResponses();
      cy.get('#caused-by-job-no').click({ force: true });
      cy.get('#workersCompContainer').should('not.be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      // TODO: verify post data for automatic entry
      // cy.wait('@aspxSubmission').then(checkPostData);
    });

    it('tracks when workers comp Yes is submitted', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').type('Injury');
      cy.get('#check-provider-type-accepted').click({ force: true });
      fillCommonResponses();
      cy.get('#caused-by-job-yes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.checkLogEvent("WorkersComp Yes Clicked", {});
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
