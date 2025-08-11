const PAGE_ID = 'employmentDetails';

describe("Employment Details page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__LASTFOCUS=&__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A2%2C%22TabState%22%3A%5Btrue%2Ctrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnFDDate=7%2F1%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=01%2F01%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2023&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=6%2F30%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl02%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=Spaceman&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=10+Main&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=08111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=3333&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=01%2F01%2F2023&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=01%2F01%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24ddlStopWorkReason=1&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtSepReason=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24rdoLstSeperation=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtStreetAddrSOE=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtStreetAddrSOE2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtCitySOE=New+Brunswick&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24ddlStateSOE=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtZipSOE1=08901&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtZipSOE2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24TxtEmpOutCtryZip=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24ddlCtrySOE=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtDeptUnitSOE=Workers&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24textDeptUnitSOECount=93&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24rdoUnionGrp=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtUnionNameSOE=Union&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtLocalNoSOE=1&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24btnNextSpanOfEmpymt=Continue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimentEmployment.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/employmentDetails/employmentDetails.html");
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_ddlStopWorkReason').select('Illness/Injury');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_rdoLstSeperation_0').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtStreetAddrSOE').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtCitySOE').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtZipSOE1').type('08901');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtDeptUnitSOE').type('Workers');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_rdoUnionYes').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtUnionNameSOE').type('Union');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtLocalNoSOE').type('1');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_btnNextSpanOfEmpymt').click();
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
      cy.visit("./cypress/fixtures/claimApplication/employmentDetails/employmentDetails.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_ddlStopWorkReason').select('Illness/Injury');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_rdoLstSeperation_0').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtStreetAddrSOE').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtCitySOE').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtZipSOE1').type('08901');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtDeptUnitSOE').type('Workers');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_rdoUnionYes').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtUnionNameSOE').type('Union');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtLocalNoSOE').type('1');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelSpan_btnNextSpanOfEmpymt').click();
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

    it('should open FAQ, post data, and track when the Help link is clicked', () => {
      cy.checkNewHelpBehavior();
      cy.trackHelpClick(PAGE_ID);
    });
  });
});
