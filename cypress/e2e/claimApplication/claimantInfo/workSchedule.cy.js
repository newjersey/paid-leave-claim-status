describe("Work Schedule page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A3%2C%22TabState%22%3A%5Btrue%2Ctrue%2Ctrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnFDDate=7%2F2%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=01%2F01%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2023&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=7%2F1%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl02%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=Spaceman&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=10+Main&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=08111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=3333&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=01%2F01%2F2021&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=01%2F01%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24ddlStopWorkReason=1&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtSepReason=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24rdoLstSeperation=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtStreetAddrSOE=10+Main&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtStreetAddrSOE2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtCitySOE=New+Brunswick&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24ddlStateSOE=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtZipSOE1=08111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtZipSOE2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24TxtEmpOutCtryZip=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24ddlCtrySOE=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtDeptUnitSOE=Time&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24textDeptUnitSOECount=96&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24rdoUnionGrp=N&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtUnionNameSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtLocalNoSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24rdoWrkSchTyp=FT&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCMon=8&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCTue=8&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCWed=8&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCThu=8&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCFri=8&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCSat=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCSun=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24btnNextWrkSch=Continue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimentEmployment.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/workSchedule.html");
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_rdoWrkSchTyp_0').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCMon').type('8');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCTue').type('8');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCWed').type('8');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCThu').type('8');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCFri').type('8');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_btnNextWrkSch').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/workSchedule.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_rdoWrkSchTyp_0').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCMon').type('8');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCTue').type('8');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCWed').type('8');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCThu').type('8');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCFri').type('8');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_btnNextWrkSch').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("applies the new font family", () => {
      cy.checkFontFamily();
    });    

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });
  });
});
