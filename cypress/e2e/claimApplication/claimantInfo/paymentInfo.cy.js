import { globalTestsNew, globalTestsOld } from "../shared";

const PAGE_ID = 'paymentInfo';
const URL = 'ClaimantDisabililty';
const FIXTURE = "./cypress/fixtures/claimApplication/claimantInfo/paymentInfo.html";

describe("Payment Info page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantDisabilityTab_ClientState=%7B%22ActiveTabIndex%22%3A4%2C%22TabState%22%3A%5Btrue%2Ctrue%2Cfalse%2Ctrue%2Ctrue%2Cfalse%5D%7D&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDisStartDt=07%2F15%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=07%2F14%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=08%2F13%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtInjury=Injury&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24text_num_inj=294&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocNm=Dr.+Spaceman&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbnDocAdd=rbnDocAddYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip1=08901&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOutCtryDocZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbER=rbtnERNO&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtERStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtEREndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbHosp=rbtnHospNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbInj=rbtnInjNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbTDI=rbTDINo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenSt=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbTDEmp=rbTDEmpNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpNm=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpCity=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenEmpSt=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpZip1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpOutCtryZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenEmpCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtEmpBenStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtEmpBenEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbSS=rbSSNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtSSDate=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbUI=rbUINo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlUISt=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24TempDisab=rbtnDisNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24txtWeeklyAmt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24lpayReason=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24text_num_lpayreason=300&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24btnNextVer=Continue');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can input info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_rbtnDisNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_btnNextVer').click();
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
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_rbtnDisNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_btnNextVer').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
