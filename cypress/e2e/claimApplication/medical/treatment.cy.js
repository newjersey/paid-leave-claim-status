import {
  EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS_DETAILS,
  EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY,
  EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY_DETAILS,
  globalTestsNew,
  globalTestsOld
} from "../shared";
import { encodeDecode } from '../../../../src/claimApplication/utils';

const PAGE_ID = 'medicalTreatment';
const URL = 'ClaimantDisabililty';
const FIXTURE = "./cypress/fixtures/claimApplication/medical/treatment.html";

describe("Medical Treatment page", () => {
  function checkInjuryPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDisStartDt=07%2F15%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=07%2F14%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=08%2F13%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtInjury=injury&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24text_num_inj=294&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocNm=Dr.+Spaceman&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbnDocAdd=rbnDocAddYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip1=08901&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOutCtryDocZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbER=rbtnERNO&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtERStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtEREndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbHosp=rbtnHospNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbInj=rbtnInjNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24btnDoc=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=');
  }

  function checkPregnancyDetailsPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=07%2F14%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=08%2F13%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtInjury=pregnancy.+Emergency+C-section.&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24text_num_inj=269&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocNm=Dr.+Spaceman&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbnDocAdd=rbnDocAddYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip1=08901&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOutCtryDocZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbER=rbtnERNO&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtERStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtEREndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbHosp=rbtnHospNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbInj=rbtnInjNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24btnDoc=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=');
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

    it("user can input injury info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').type('injury');
      fillCommonResponses();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.wait('@aspxSubmission').then(checkInjuryPostData);
    });

    it("user can input pregnancy details info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').type('pregnancy. Emergency C-section.');
      fillCommonResponses();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.wait('@aspxSubmission').then(checkPregnancyDetailsPostData);
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

    it('calendar UX allows only valid inputs', () => {
      cy.clock(new Date(2025, 7, 18)); // 0-indexed; August 18, 2025
      cy.visit(FIXTURE);
      cy.window().then((win) => {
        cy.spy(win, 'alert').as('alertSpy');
      });

      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnERYes').click({ force: true });

      cy.get('#Image8').click();
      cy.tick(200);
      cy.get('#FDDCalendarControl').should('be.visible');

      cy.get('#pageTitle').click(); // test click-away-to-close
      cy.get('#FDDCalendarControl').should('not.be.visible');

      cy.get('#Image8').click();
      cy.tick(200);
      cy.get('a.weekday').contains('8').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtERStDt').blur();
      cy.get('@alertSpy').invoke('getCall', 0).should('be.calledWith', 'Emergency room start date should be on or after 07/15/2025');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtERStDt').should('have.value', '');

      cy.get('#Image8').click();
      cy.tick(200);
      cy.get('#FDDCalendarControl img[alt="Next year"]').click(); 
      cy.tick(200);
      cy.get('a.weekday').contains('8').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtERStDt').blur();
      cy.get('@alertSpy').invoke('getCall', 1).should('be.calledWith', "Emergency room start date cannot be after today's date.");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtERStDt').should('have.value', '');

      cy.get('#Image8').click();
      cy.tick(200);
      cy.get('a.weekday').contains('16').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtERStDt').blur();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtERStDt').should('have.value', '07/16/2025');

      cy.get('#Image1').click();
      cy.tick(200);
      cy.get('a.weekday').contains('15').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtEREndDt').blur();
      cy.get('@alertSpy').invoke('getCall', 2).should('be.calledWith', "Emergency room end date should be on or after 07/16/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtEREndDt').should('have.value', '');

      cy.get('#Image1').click();
      cy.tick(200);
      cy.get('a.weekday').contains('17').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtEREndDt').blur();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtEREndDt').should('have.value', '07/17/2025');
      
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnHospYes').click({ force: true });

      cy.get('#Image2').click();
      cy.tick(200);
      cy.get('a.weekday').contains('8').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospStDt').blur();
      cy.get('@alertSpy').invoke('getCall', 3).should('be.calledWith', 'Hospitalization start date should be on or after 07/15/2025');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospStDt').should('have.value', '');

      cy.get('#Image2').click();
      cy.tick(200);
      cy.get('#FDDCalendarControl img[alt="Next year"]').click(); 
      cy.tick(200);
      cy.get('a.weekday').contains('8').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospStDt').blur();
      cy.get('@alertSpy').invoke('getCall', 4).should('be.calledWith', "Hospitalization start date cannot be after today's date.");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospStDt').should('have.value', '');

      cy.get('#Image2').click();
      cy.tick(200);
      cy.get('a.weekday').contains('16').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospStDt').blur();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospStDt').should('have.value', '07/16/2025');

      cy.get('#Image3').click();
      cy.tick(200);
      cy.get('a.weekday').contains('15').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospEndDt').blur();
      cy.get('@alertSpy').invoke('getCall', 5).should('be.calledWith', "Hospitalization end date should be on or after 07/16/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospEndDt').should('have.value', '');

      cy.get('#Image3').click();
      cy.tick(200);
      cy.get('a.weekday').contains('17').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospEndDt').blur();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospEndDt').should('have.value', '07/17/2025');
    });

    it("page jumps to Workers Comp if coming from review Edit", () => {
      cy.window().then((win) => {
        const data = { editing_workers_comp: true };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));     
      });

      cy.visit(FIXTURE);

      cy.get('#caused-by-job-no').should('be.focused');
      cy.window().then((win) => {
        const encodedData = win.sessionStorage.getItem('session_data');
        const data = JSON.parse(encodeDecode(encodedData));
        expect(data["editing_workers_comp"]).to.equal(undefined);
      });
    });

    it("user cannot submit if provider type unanswered", () => {
      cy.get('#provider-type-accepted-yes').should('not.be.checked');
      cy.get('#provider-type-accepted-no').should('not.be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.get('#provider-type-accepted-yes')
        .then(($input) => {
          expect($input[0].validationMessage).to.exist;
        });
    });

    it("user cannot submit if caused-by-job unanswered", () => {
      cy.get('#provider-type-accepted-yes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.get('#caused-by-job-yes')
        .then(($input) => {
          expect($input[0].validationMessage).to.exist;
        });
    });

    it("user can input info when session storage empty and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').type('injury');
      cy.get('#provider-type-accepted-yes').click({ force: true });
      fillCommonResponses();
      cy.get('#caused-by-job-no').click({ force: true });
      // cy.get('#workersCompContainer').should('not.be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.wait('@aspxSubmission').then(checkInjuryPostData);
      cy.confirmEventIsNotTracked("WorkersComp Yes Clicked");
      cy.confirmEventIsNotTracked("Medical Provider Type Warning Shown");
      cy.confirmEventIsNotTracked("Medical Provider Type No Submitted");
    });

    it("user can input info when session contains pregnant reason and proceed to next page", () => {
      cy.window().then((win) => {
        const data = { reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY_DETAILS };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));     
      });
      cy.visit(FIXTURE);
      cy.mockASPX(URL);

      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').should('not.be.visible');
      cy.get('#provider-type-accepted-yes').click({ force: true });
      fillCommonResponses();
      cy.get('#causedByJobQuestion').should('not.be.visible');
      cy.get('#workersCompContainer').should('not.be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.wait('@aspxSubmission').then(checkPregnancyDetailsPostData);
    });

    it("user can input info when session contains injury reason and proceed to next page", () => {
      cy.window().then((win) => {
        const data = { reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));     
      });
      cy.visit(FIXTURE);
      cy.mockASPX(URL);

      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').should('not.be.visible');
      cy.get('#provider-type-accepted-no').click({ force: true });
      fillCommonResponses();
      cy.get('#caused-by-job-no').click({ force: true });
      cy.get('#workersCompContainer').should('not.be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.wait('@aspxSubmission').then(checkInjuryPostData);
      cy.checkLogEvent(`Medical Provider Type Warning Shown`, {});
      cy.checkLogEvent(`Medical Provider Type No Submitted`, {});
    });

    it('tracks when workers comp Yes is submitted', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').type('Injury');
      cy.get('#provider-type-accepted-yes').click({ force: true });
      fillCommonResponses();
      cy.get('#caused-by-job-yes').click({ force: true });
      cy.get('#workersCompContainer a[href*="workerscompensation"]')
        .should('be.visible')
        .and('have.text', "Workers' Compensation Claim");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();
      cy.checkLogEvent("WorkersComp Yes Clicked", {});
    });

    it("has required provider type question and caused-by-job field when reason is not pregnancy", () => {
      cy.window().then((win) => {
        const data = { reason_for_leave: { reasons: "illness" } };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#provider-type-accepted-yes').should('have.attr', 'required');
      cy.get('#caused-by-job-yes').should('have.attr', 'required');
    });

    it("has required provider type question (caused-by-job field is not required) when reason is pregnancy", () => {  
      cy.window().then((win) => {
        const data = { reason_for_leave: { reasons: "pregnancy" } };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#provider-type-accepted-yes').should('have.attr', 'required');
      cy.get('#caused-by-job-yes').should('not.have.attr', 'required');
    });

    it("saves provider_type_accepted as true session storage when provider accepted yes radio is checked", () => {
      cy.get('#provider-type-accepted-yes').click({ force: true });
      cy.window().then((win) => {
        const encodedData = win.sessionStorage.getItem('session_data');
        const data = JSON.parse(encodeDecode(encodedData));
        expect(data.provider_type_accepted).to.equal(true);
      });
    });
    
    it("saves provider_type_accepted as false session storage when provider accepted no radio is selected", () => {
      cy.get('#provider-type-accepted-no').click({ force: true });
      cy.window().then((win) => {
        const encodedData = win.sessionStorage.getItem('session_data');
        const data = JSON.parse(encodeDecode(encodedData));
        expect(data.provider_type_accepted).to.equal(false);
      });
    });

    it("has Yes selected when provider_type_accepted is true in session storage", () => {
      cy.window().then((win) => {
        const data = { provider_type_accepted: true };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#provider-type-accepted-yes').should('be.checked');
      cy.get('#provider-type-accepted-no').should('not.be.checked');
      cy.get('#provider-type-alert').should('not.be.visible');
    });
    
    it("has No selected when provider_type_accepted is false in session storage", () => {
      cy.window().then((win) => {
        const data = { provider_type_accepted: false };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#provider-type-accepted-yes').should('not.be.checked');
      cy.get('#provider-type-accepted-no').should('be.checked');
      cy.get('#provider-type-alert').should('be.visible');
    });

    it("saves caused_by_job as 'yes' to session storage when caused-by-job-yes is clicked", () => {
      cy.get('#caused-by-job-yes').click({ force: true });
      cy.window().then((win) => {
        const encodedData = win.sessionStorage.getItem('session_data');
        const data = JSON.parse(encodeDecode(encodedData));
        expect(data.caused_by_job).to.equal('yes');
      });
    });
    
    it("saves caused_by_job as 'no' to session storage when caused-by-job-no is clicked", () => {
      cy.get('#caused-by-job-no').click({ force: true });
      cy.window().then((win) => {
        const encodedData = win.sessionStorage.getItem('session_data');
        const data = JSON.parse(encodeDecode(encodedData));
        expect(data.caused_by_job).to.equal('no');
      });
    });


    it("saves workers_comp as 'yes' to session storage when workers comp yes is clicked", () => {
      cy.get('#caused-by-job-yes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes').click({ force: true });
      cy.window().then((win) => {
        const encodedData = win.sessionStorage.getItem('session_data');
        const data = JSON.parse(encodeDecode(encodedData));
        expect(data.workers_comp).to.equal('yes');
      });
    });
    
    it("saves workers_comp as 'no' to session storage when workers comp no is clicked", () => {
      cy.get('#caused-by-job-yes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo').click({ force: true });
      cy.window().then((win) => {
        const encodedData = win.sessionStorage.getItem('session_data');
        const data = JSON.parse(encodeDecode(encodedData));
        expect(data.workers_comp).to.equal('no');
      });
    });

    it("clears workers_comp from session storage when caused-by-job-no is clicked", () => {
      cy.get('#caused-by-job-yes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes').click({ force: true });
      cy.get('#caused-by-job-no').click({ force: true });
      cy.window().then((win) => {
        const encodedData = win.sessionStorage.getItem('session_data');
        const data = JSON.parse(encodeDecode(encodedData));
        expect(data.caused_by_job).to.equal('no');
        expect(data.workers_comp).to.equal(null);
      });
    });

    it("restores caused-by-job-yes from session storage on page load", () => {
      cy.window().then((win) => {
        const data = {
          reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY,
          caused_by_job: 'yes'
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#caused-by-job-yes').should('be.checked');
      cy.get('#caused-by-job-no').should('not.be.checked');
      cy.get('#workersCompContainer').should('be.visible');
    });
    
    it("restores caused-by-job-no from session storage on page load", () => {
      cy.window().then((win) => {
        const data = {
          reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY,
          caused_by_job: 'no'
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#caused-by-job-yes').should('not.be.checked');
      cy.get('#caused-by-job-no').should('be.checked');
      cy.get('#workersCompContainer').should('not.be.visible');
    });

    it("restores workers_comp yes from session storage on page load", () => {
      cy.window().then((win) => {
        const data = {
          reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY,
          caused_by_job: 'yes',
          workers_comp: 'yes'
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
    
      cy.get('#caused-by-job-yes').should('be.checked');
      cy.get('#workersCompensationHeader').should('be.visible');
      cy.get('#workersCompFieldset').should('be.visible');
      cy.get('#workersCompContainer').should('be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes').should('be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo').should('not.be.checked');
    });
    
    it("restores workers_comp no from session storage on page load", () => {
      cy.window().then((win) => {
        const data = {
          reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY,
          caused_by_job: 'yes',
          workers_comp: 'no'
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
    
      cy.get('#caused-by-job-yes').should('be.checked');
      cy.get('#workersCompContainer').should('be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes').should('not.be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo').should('be.checked');
    });

    it("hides caused-by-job question when reason is pregnancy", () => {
      cy.window().then((win) => {
        const data = {
          reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY_DETAILS
        };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#workersCompensationHeader').should('not.be.visible');
      cy.get('#workersCompFieldset').should('not.be.visible');
      cy.get('#causedByJobQuestion').should('not.be.visible');
      cy.get('#workersCompContainer').should('not.be.visible');
    });

    it("shows warning alert when No is selected for provider type", () => {
      cy.get('#provider-type-alert').should('not.be.visible');
      cy.get('#provider-type-accepted-no').click({ force: true });
      cy.get('#provider-type-alert').should('be.visible');
      cy.checkLogEvent(`Medical Provider Type Warning Shown`, {});
    });

    it("hides warning alert when Yes is selected for provider type", () => {
      cy.get('#provider-type-accepted-no').click({ force: true });
      cy.get('#provider-type-alert').should('be.visible');
      cy.get('#provider-type-accepted-yes').click({ force: true });
      cy.get('#provider-type-alert').should('not.be.visible');
    });

    it("shows warning alert on page load when provider_type_accepted is false in session storage", () => {
      cy.window().then((win) => {
        const data = { provider_type_accepted: false };
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify(data)));
      });
      cy.visit(FIXTURE);
      cy.wait('@script');
      cy.get('#provider-type-alert').should('be.visible');
    });

    it('fills in illness text when known from storage', () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem('session_data', encodeDecode(JSON.stringify({ reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS_DETAILS })));
      });
      cy.visit(FIXTURE);
      cy.contains('Was your illness caused by your job?').should('exist');
    });

    it('fills in injury text when known from storage', () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem('session_data', encodeDecode(JSON.stringify({ reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY })));
      });
      cy.visit(FIXTURE);
      cy.contains('Was your injury caused by your job?').should('exist');
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
