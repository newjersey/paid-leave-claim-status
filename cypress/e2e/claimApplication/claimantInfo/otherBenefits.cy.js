import { globalTestsNew, globalTestsOld } from "../shared";
import { encodeDecode } from '../../../../src/claimApplication/utils';

const PAGE_ID = 'otherBenefits';
const URL = 'ClaimantDisabililty';
const FIXTURE = "./cypress/fixtures/claimApplication/otherBenefits/otherBenefitsEmpty/otherBenefits.html";
const FIXTURE_WITH_ERROR = "./cypress/fixtures/claimApplication/otherBenefits/otherBenefitsError/otherBenefitsError.html";
const FIXTURE_FILLED_ALL_NO = "./cypress/fixtures/claimApplication/otherBenefits/otherBenefitsFilled/otherBenefitsFilled.html";
const FIXTURE_WITH_PRE_POPULATED_VALUES = "./cypress/fixtures/claimApplication/otherBenefits/otherBenefitsWithPrePopulatedValues/otherBenefitsWithPrePopulatedValues.html"

describe("Other Benefits page", () => {
  function checkNoPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    const expectedParamsString = `ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=05%2F05%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=N&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=05%2F04%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=Y&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=05%2F27%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=05%2F04%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=05%2F27%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtInjury=pregnancy&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24text_num_inj=291&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocNm=Test&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbnDocAdd=rbnDocAddYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd1=test&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd2=45+MAIN+STREET++45+MAIN+STREET&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocCity=TRENTON&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip1=07765&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOutCtryDocZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh=804&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh2=294&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh3=4544&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbER=rbtnERNO&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtERStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtEREndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbHosp=rbtnHospNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbInj=rbtnInjNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbTDI=rbTDINo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenSt=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbSS=rbSSNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtSSDate=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbUI=rbUINo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlUISt=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24btnUI=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=`;
    cy.checkPostData(formData, expectedParamsString);
  }

  function checkDetailedPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    const expectedParamsString = `ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=05%2F05%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=N&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=05%2F04%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=Y&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=05%2F27%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=05%2F04%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=05%2F27%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtInjury=pregnancy&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24text_num_inj=291&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocNm=Test&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbnDocAdd=rbnDocAddYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd1=test&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd2=45+MAIN+STREET++45+MAIN+STREET&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocCity=TRENTON&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip1=07765&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOutCtryDocZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh=804&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh2=294&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh3=4544&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbER=rbtnERNO&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtERStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtEREndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbHosp=rbtnHospNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbInj=rbtnInjNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbTDI=rbTDIYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenSt=6&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenStDt=05%2F06%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEndDt=05%2F07%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbSS=rbSSYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtSSDate=08%2F01%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbUI=rbUIYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlUISt=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenStDt=05%2F05%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenEndDt=06%2F07%2F2026&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24btnUI=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=`;
    cy.checkPostData(formData, expectedParamsString);
  }

  function checkILPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    // update new formData
  }

  function mockASPX() {
    cy.intercept('POST', '**/.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  function checkDetailedInput(useNewCheckboxes) {
    cy.mockASPX(URL);

    if (useNewCheckboxes) {
      cy.get('#check-tdi').click({ force: true });
    } else {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDIYes').click({ force: true });
    }
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt').select('CA');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenStDt').type('05/06/2026');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEndDt').type('05/07/2026');

    if (useNewCheckboxes) {
      cy.get('#check-ssdi').click({ force: true });
    } else {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSYes').click({ force: true });
    }
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtSSDate').type('08/01/2025');

    if (useNewCheckboxes) {
      cy.get('#check-ui').click({ force: true });
    } else {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUIYes').click({ force: true });
    }
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt').select('NJ');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtUIBenStDt').type('05/05/2026');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtUIBenEndDt').type('06/07/2026');

    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
    cy.wait('@aspxSubmission').then(checkDetailedPostData);
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can input no to everything and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.wait('@aspxSubmission').then(checkNoPostData);
    });

    it("user can input yes to everything with details and proceed to next page", () => {
      checkDetailedInput(false);
    });

    it("user sees all no answers when loaded and can proceed", () => {
      cy.mockASPX(URL);
      cy.visit(FIXTURE_FILLED_ALL_NO);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').should('be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').should('be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').should('be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.wait('@aspxSubmission');
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

    afterEach(() => {
      cy.checkBodyA11y(true);
    });

    it("fills in existing values when known", () => {
      cy.visit(FIXTURE_WITH_PRE_POPULATED_VALUES);
      cy.get('#check-ssdi').should('be.checked');
      cy.get('#warning-ssdi').should('be.visible');
      cy.get('#check-ui').should('be.checked');
      cy.get('#check-tdi').should('be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtSSDate').should('have.value', '05/01/2026');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt').should('have.value', '34');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtUIBenEndDt').should('have.value', '05/05/2027');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt').should('have.value', '6');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkBenDtStat').should('not.be.checked');
    });

    it("shows error without question number", () => {
      cy.visit(FIXTURE_WITH_ERROR);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_lblUIerror').contains('Unemployment Insurance Enter the dates for the period that you received benefits OR check Status Pending.');
    });

    it("user sees all no answers when loaded and can proceed", () => {
      cy.mockASPX(URL);
      cy.visit(FIXTURE_FILLED_ALL_NO);
      cy.get('#check-none').should('be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.wait('@aspxSubmission');
    });

    it("user can input no to everything and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#check-none').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.wait('@aspxSubmission').then(checkNoPostData);
      cy.confirmEventIsNotTracked("Other Benefits Yes Clicked");
      cy.confirmEventIsNotTracked("TDI Other Benefits Checkboxes Empty");
    });

    it("user can input yes to everything with details and proceed to next page", () => {
      checkDetailedInput(true);
    });

    it("ssdi calendar control navigates to year of fdd", () => {
      cy.get('#check-ssdi').click({ force: true });
      cy.get('#Image10').click();
      // fdd in fixture is 05/05/2026
      cy.get('#CalendarControl > table > tbody > tr.header > td > div > div.title').should('contain.text', '2026');
    });

    // needs more testing
    xit("user can input a state not originally listed for TDI", () => {
      cy.mockASPX(URL);
      cy.get('#check-tdi').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt').select('IL');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenStDt').type('05/16/2025');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEndDt').type('07/17/2025');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.wait('@aspxSubmission').then(checkILPostData);
    });

    it('tracks when page submitted with Yes for Another State', () => {
      cy.get('#check-tdi').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt').select("CA");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkBenDtStat').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "another state" ] });
    });

      it('tracks when page submitted with Yes Pending for receiving Soc Sec benefits', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click({ force: true });
      cy.get('#check-ssdi').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkSSDtStat').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "social security" ] });
    });

    it('tracks when page submitted with Yes for UI', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click({ force: true });
      cy.get('#check-ui').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt').select('AK');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkUIStatusPend').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "ui" ] });
    });

    it('tracks when page submitted with Yes for everything', () => {
      cy.get('#check-tdi').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt').select("CA");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkBenDtStat').click({ force: true });
      cy.get('#check-ssdi').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkSSDtStat').click({ force: true });
      cy.get('#check-ui').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt').select('AK');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkUIStatusPend').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "another state", "social security", "ui" ] });
    });

    it('user can choose none of the above but must choose something', () => {
      cy.get('#checkbox-error').should('not.be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.get('#checkbox-error').should('be.visible');
      cy.checkLogEvent(`TDI Other Benefits Checkboxes Empty`, {});

      cy.get('#check-none').click({ force: true });
      cy.get('#checkbox-error').should('not.be.visible');

      cy.get('#check-ui').click({ force: true });
      cy.get('#check-ui').should('be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt').should('be.visible');
      cy.get('#check-none').should('not.be.checked');

      cy.get('#check-ui').click({ force: true });
      cy.get('#check-ui').should('not.be.checked');
      cy.get('#check-none').should('not.be.checked');

      cy.get('#check-ui').click({ force: true });
      cy.get('#check-none').click({ force: true });
      cy.get('#check-none').should('be.checked');
      cy.get('#check-ui').should('not.be.checked');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt').should('not.be.visible');
    });

    it('clicks Back', () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify({ disabilityInfoView: 'leaveSchedule' })));
      });
      cy.get('footer#helpSection').should('exist').and('have.length', 1);
      
      cy.get('#headerWithMargin > button').contains('< Back').click();

      cy.get('h1').contains('Medical details').should('be.visible');
      cy.get('#new-other-benefits-form').should('not.be.visible');
      cy.get('footer#helpSection').should('exist').and('have.length', 1);

      cy.get('#headerWithMargin > button').contains('< Back').click();

      cy.get('h1').contains('Leave schedule').should('be.visible');
      cy.get('footer#helpSection').should('exist').and('have.length', 1);
      cy.get('#headerWithMargin > button').should('exist');

      cy.checkWrappedFeedbackWidgetIsRendered();
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
