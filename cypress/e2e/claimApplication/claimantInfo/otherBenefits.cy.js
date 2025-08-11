const PAGE_ID = 'otherBenefits';

describe("Other Benefits page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDisStartDt=07%2F15%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=07%2F14%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=08%2F13%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtInjury=Injury&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24text_num_inj=294&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocNm=Dr.+Spaceman&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbnDocAdd=rbnDocAddYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip1=08901&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOutCtryDocZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbER=rbtnERNO&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtERStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtEREndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbHosp=rbtnHospNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbInj=rbtnInjNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbTDI=rbTDINo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenSt=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbTDEmp=rbTDEmpNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpNm=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpCity=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenEmpSt=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpZip1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpOutCtryZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlBenEmpCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtBenEmpPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtEmpBenStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtEmpBenEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbSS=rbSSNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtSSDate=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24rbUI=rbUINo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24ddlUISt=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24txtUIBenEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabBenefits%24btnUI=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimantDisabililty.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/otherBenefits.html");
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it('should open FAQ and post data when the Help link is clicked', () => {
      cy.checkHelpButtonBehavior();
    });
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/otherBenefits.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.wait('@aspxSubmission').then(checkPostData);
      cy.confirmEventIsNotTracked("Other Benefits Yes Clicked");
    });

    it("applies the new font family", () => {
      cy.checkFontFamily();
    });

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });

    it("tracks the page view", () => {
      cy.trackPageView(PAGE_ID);
    });

    it('should open FAQ, post data, and track when the Help link is clicked', () => {
      cy.checkHelpButtonBehavior();
      cy.trackHelpClick(PAGE_ID);
    });

    it('tracks when page submitted with Yes for Another State', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDIYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt').select("CA");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkBenDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "another state" ] });
    });

    it('tracks when page submitted with Yes for Employer/Union', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpNm').type('Murch');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpAdd1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip1').type('08901');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh').type('222');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh2').type('111');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh3').type('2222');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkEmpBenDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "employer/union" ] });
    });

    it('tracks when page submitted with Yes Pending for receiving Soc Sec benefits', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkSSDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "social security" ] });
    });

    it('tracks when page submitted with Yes for UI', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUIYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt').select('AK');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkUIStatusPend').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "ui" ] });
    });

    it('tracks when page submitted with Yes for everything', () => {
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDIYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt').select("CA");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkBenDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpNm').type('Murch');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpAdd1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip1').type('08901');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh').type('222');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh2').type('111');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh3').type('2222');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkEmpBenDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkSSDtStat').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUIYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt').select('AK');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkUIStatusPend').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();
      cy.checkLogEvent(`Other Benefits Yes Clicked`, { otherBenefits: [ "another state", "employer/union", "social security", "ui" ] });
    });
  });
});
