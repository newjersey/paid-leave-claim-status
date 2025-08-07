describe("Employment Details page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Btrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnFDDate=7%2F1%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=06%2F25%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2023&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=6%2F30%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl02%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=Murch&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=08901&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=555&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=1111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=01%2F01%2F2021&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=01%2F01%2F2022&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24btnNextEmpDet=Continue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimentEmployment.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/employerDetails.html");
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpNm').type('Murch');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip1').type('08901');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA').type('111');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo1').type('555');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo2').type('1111');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type('01/01/2021');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('01/01/2022');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
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
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/employerDetails.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpNm').type('Murch');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip1').type('08901');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA').type('111');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo1').type('555');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo2').type('1111');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type('01/01/2021');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('01/01/2022');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });

    it("tracks the page view", () => {
      cy.trackPageView('employerDetails');
    });
  });
});
