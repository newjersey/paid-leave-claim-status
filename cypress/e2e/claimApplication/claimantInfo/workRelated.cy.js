import {
  EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS_DETAILS,
  globalTestsNew,
  globalTestsOld,
} from "../shared";
import { encodeDecode } from '../../../../src/claimApplication/utils';

const PAGE_ID = 'workRelated';
const URL = 'ClaimantDisabililty';
const FIXTURE = "./cypress/fixtures/claimApplication/claimantInfo/workRelated.html";

describe("Work Related page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantDisabilityTab_ClientState=%7B%22ActiveTabIndex%22%3A2%2C%22TabState%22%3A%5Btrue%2Ctrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDisStartDt=07%2F01%2F2024&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=06%2F25%2F2024&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=07%2F10%2F2024&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtInjury=Injury&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24text_num_inj=294&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocNm=Dr.+Spaceman&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbnDocAdd=rbnDocAddYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd1=100+Main&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip1=08111&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOutCtryDocZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbER=rbtnERNO&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtERStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtEREndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbHosp=rbtnHospNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbInj=rbtnInjYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjEmpNm=Murch&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtEmpadd1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtEmpadd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtEmpZip1=08901&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtEmpZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24TxtEmpOutCtryZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24ddlEmpCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjEmpPh=111&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjEmpPh2=555&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjEmpPh3=1111&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjEmpPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjDt=01%2F01%2F2024&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24rbFWC=rbtnFWCYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24rbWCIns=rbWCInsNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtNoClaim=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24text_num_noClaim=300&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24btnWC=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can input info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpNm').type('Murch');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpadd1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpZip1').type('08901');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh').type('111');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh2').type('555');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh3').type('1111');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjDt').type('01/01/2024');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCInsNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_btnWC').click();
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

    it("user can input info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpNm').type('Murch');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpadd1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpZip1').type('08901');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh').type('111');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh2').type('555');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh3').type('1111');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjDt').type('01/01/2024');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCInsNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_btnWC').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it('hides question 2a and renames 2b and 2c when workers_comp is session storage', () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem('session_data', encodeDecode(JSON.stringify({ workers_comp: 'yes' })));
      });
      cy.visit(FIXTURE);
      cy.mockASPX(URL);
      //2a
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCYes')
        .should('not.be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCNo')
        .should('not.be.visible');
      cy.get('label[for="ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCYes"]')
        .should('not.be.visible');
      cy.get('label[for="ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCNo"]')
        .should('not.be.visible');
      //2b is made visible and renamed to 2a
      cy.get('#divWCIns').should('be.visible');
      cy.get('#divWCIns a strong').should('have.text', '2a.');
      //2c is renamed to 2b
      cy.get('#divWCBen a strong').should('have.text', '2b.');
    });

    it('autofills 2a workers comp question with yes when workers_comp is "yes" in session storage', () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem('session_data', encodeDecode(JSON.stringify({ workers_comp: 'yes' })));
      });
      cy.visit(FIXTURE);
      cy.mockASPX(URL);
      // autofills and hides 2a
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCYes')
        .should('be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCNo')
        .should('not.be.checked');
    });

    it('autofills and hides 2a workers comp question with no when workers_comp is "no" in session storage', () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem('session_data', encodeDecode(JSON.stringify({ workers_comp: 'no' })));
      });
      cy.visit(FIXTURE);
      cy.mockASPX(URL);
      // autofills and hides 2a
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCYes')
        .should('not.be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCNo')
        .should('be.checked');
    });

    it('still submits the 2a Yes value with the form', () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem('session_data', encodeDecode(JSON.stringify({ workers_comp: 'yes' })));
      });
      cy.visit(FIXTURE);
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpNm').type('Test Employer');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpadd1').type('123 Main St');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtCity').type('Newark');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_ddlEmpStates').select('NJ');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpZip1').type('07101');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh').type('973');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh2').type('555');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh3').type('1234');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjDt').type('06/01/2024');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_btnWC').click();
      cy.wait('@aspxSubmission').then((interception) => {
        const formData = interception.request.body;
        expect(formData).to.include('rbtnFWCYes');
      });
    });

    it('fills in illness or injury text when known from storage', () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem('session_data', encodeDecode(JSON.stringify({ reason_for_leave: EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS_DETAILS })));
      });
      cy.visit(FIXTURE);
      cy.contains('List the employer where this illness occurred').should('exist');
      cy.contains('Enter date of the work related illness.').should('exist');
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
