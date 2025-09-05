const PAGE_ID = 'workRelated';

describe("Work Related page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantDisabilityTab_ClientState=%7B%22ActiveTabIndex%22%3A2%2C%22TabState%22%3A%5Btrue%2Ctrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDisStartDt=07%2F01%2F2024&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=06%2F25%2F2024&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=07%2F10%2F2024&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtInjury=Injury&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24text_num_inj=294&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocNm=Dr.+Spaceman&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbnDocAdd=rbnDocAddYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd1=100+Main&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip1=08111&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOutCtryDocZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24ddlDocCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtOOCDocAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh3=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtDocPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbER=rbtnERNO&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtERStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtEREndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbHosp=rbtnHospNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospStDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24txtHospEndDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24rbInj=rbtnInjYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjEmpNm=Murch&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtEmpadd1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtEmpadd2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtEmpZip1=08901&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtEmpZip2=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24TxtEmpOutCtryZip=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24ddlEmpCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjEmpPh=111&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjEmpPh2=555&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjEmpPh3=1111&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjEmpPh4=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtInjDt=01%2F01%2F2024&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24rbFWC=rbtnFWCYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24rbWCIns=rbWCInsNo&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24txtNoClaim=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24text_num_noClaim=300&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24btnWC=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimantDisabililty.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/workRelated.html");
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
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

    it("user can log out", () => {
      mockASPX();
      cy.checkOldLogout();
    });

    it("user can cancel logging out", () => {
      mockASPX();
      cy.checkOldLogoutCancel();
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
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/workRelated.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
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

    it("applies the new font family", () => {
      cy.checkFontFamily();
    });

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });

    it("tracks the page view", () => {
      cy.trackPageView(PAGE_ID);
    });

    it("user can log out", () => {
      mockASPX();
      cy.checkNewLogout();
    });

    it("user can cancel logging out", () => {
      mockASPX();
      cy.checkNewLogoutCancel();
    });

    it('should open Resources and track when clicked', () => {
      cy.get('#resourcesLink').click();
      cy.trackResourcesClick(PAGE_ID);
    });

    it('clicks Dismiss on the info alert, alert hides and does not return', () => {
      cy.checkInfoAlertBehavior();
    });
  });
});
