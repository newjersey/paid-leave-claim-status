import { globalTestsNew, globalTestsOld } from "../shared";
import { encodeDecode } from '../../../../src/claimApplication/utils';

const PAGE_ID = 'otherBenefits';
const URL = 'ClaimantDisabililty';
const FIXTURE = "./cypress/fixtures/claimApplication/claimantInfo/otherBenefits.html";

describe("Other Benefits page", () => {
  function checkNoPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    const expectedParamsString = `ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDisStartDt=07%2F15%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=07%2F14%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=08%2F13%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtInjury=Injury&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24text_num_inj=294&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocNm=Dr.+Spaceman&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbnDocAdd=rbnDocAddYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip1=08901&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOutCtryDocZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbER=rbtnERNO&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtERStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtEREndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbHosp=rbtnHospNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbInj=rbtnInjNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbTDI=rbTDINo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenSt=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbTDEmp=rbTDEmpNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpNm=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpCity=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenEmpSt=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpZip1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpOutCtryZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenEmpCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtEmpBenStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtEmpBenEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbSS=rbSSNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtSSDate=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbUI=rbUINo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlUISt=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24btnUI=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=`;

    const actual = new URLSearchParams(formData);
    const expected = new URLSearchParams(expectedParamsString);
  
    for (const [key, value] of expected.entries()) {
      expect(actual.get(key), `${key} should match`).to.equal(value);
    }
  }

  function checkDetailedPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    const expectedParamsString = `ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDisStartDt=07%2F15%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=07%2F14%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=08%2F13%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtInjury=Injury&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24text_num_inj=294&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocNm=Dr.+Spaceman&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbnDocAdd=rbnDocAddYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip1=08901&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOutCtryDocZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbER=rbtnERNO&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtERStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtEREndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbHosp=rbtnHospNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbInj=rbtnInjNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbTDI=rbTDIYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenSt=6&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenStDt=07/16/2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEndDt=07/17/2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbTDEmp=rbTDEmpYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpNm=Vandelay&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpAdd1=123 Main Street&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpCity=Newark&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenEmpSt=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpZip1=08111&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpOutCtryZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenEmpCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh=234&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh2=25&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh3=2678&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtEmpBenStDt=07/18/2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtEmpBenEndDt=07/19/2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbSS=rbSSYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtSSDate=08/01/2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbUI=rbUIYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlUISt=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenStDt=07/20/2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenEndDt=07/21/2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24btnUI=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=`;

    const actual = new URLSearchParams(formData);
    const expected = new URLSearchParams(expectedParamsString);
  
    for (const [key, value] of expected.entries()) {
      expect(actual.get(key), `${key} should match`).to.equal(value);
    }
  }

  function mockASPX() {
    cy.intercept('POST', '**/.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  function checkDetailedInput() {
    cy.mockASPX(URL);
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDIYes').click({ force: true });
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt').select('CA');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenStDt').type('07/16/2025');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEndDt').type('07/17/2025');

    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpYes').click({ force: true });
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpNm').type('Vandelay');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpAdd1').type('123 Main Street');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpCity').type('Newark');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip1').type('08111');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh').type('234');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh2').type('25');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh3').type('2678');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtEmpBenStDt').type('07/18/2025').blur();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtEmpBenEndDt').type('07/19/2025');

    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSYes').click({ force: true });
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtSSDate').type('08/01/2025');

    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUIYes').click({ force: true });
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt').select('NJ');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtUIBenStDt').type('07/20/2025');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtUIBenEndDt').type('07/21/2025');

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
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.wait('@aspxSubmission').then(checkNoPostData);
    });

    it("user can input yes to everything with details and proceed to next page", () => {
      checkDetailedInput();
    });

    xit("user can input info when the employer benefits question is removed and proceed to next page", () => {
      // todo: use fixture with question removed
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

    xit("fills in existing values when known", () => {
      // todo
    });

    it("user can input no to everything and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.wait('@aspxSubmission').then(checkNoPostData);
      cy.confirmEventIsNotTracked("Other Benefits Yes Clicked");
    });

    it("user can input yes to everything with details and proceed to next page", () => {
      checkDetailedInput();
    });

    xit("user can input info when the employer benefits question is removed and proceed to next page", () => {
      // todo use fixture with question removed
    });

    xit("user can input a state not originally listed for TDI", () => {
      // todo
    });

    xit('tracks when page submitted with Yes for Another State', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDIYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt').select("CA");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkBenDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "another state" ] });
    });

    xit('tracks when page submitted with Yes for Employer/Union', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpNm').type('Murch');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpAdd1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip1').type('08901');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh').type('222');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh2').type('111');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh3').type('2222');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkEmpBenDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "employer/union" ] });
    });

    xit('tracks when page submitted with Yes Pending for receiving Soc Sec benefits', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkSSDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "social security" ] });
    });

    xit('tracks when page submitted with Yes for UI', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUIYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt').select('AK');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkUIStatusPend').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "ui" ] });
    });

    xit('tracks when page submitted with Yes for everything', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDIYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt').select("CA");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkBenDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpNm').type('Murch');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpAdd1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip1').type('08901');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh').type('222');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh2').type('111');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh3').type('2222');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkEmpBenDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkSSDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUIYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt').select('AK');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkUIStatusPend').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "another state", "employer/union", "social security", "ui" ] });
    });

    it('clicks Back', () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem("session_data", encodeDecode(JSON.stringify({ disabilityInfoView: 'leaveSchedule' })));
      });
      cy.get('footer#helpSection').should('exist').and('have.length', 1);
      
      cy.get('#headerWithMargin > button').contains('< Back').click();

      cy.get('h1').contains('Medical details').should('be.visible');
      cy.get('footer#helpSection').should('exist').and('have.length', 1);

      cy.get('#headerWithMargin > button').contains('< Back').click();

      cy.get('h1').contains('Leave schedule').should('be.visible');
      cy.get('footer#helpSection').should('exist').and('have.length', 1);
      cy.get('#headerWithMargin > button').should('exist');

      cy.checkFeedbackWidgetIsRendered();
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
