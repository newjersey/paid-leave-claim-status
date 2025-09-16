const PAGE_ID = 'incompleteEmployer';

describe("Incomplete Employer page", () => {
  function checkPostDataYes(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Btrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnFDDate=5%2F13%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=05%2F11%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2023&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=5%2F12%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl03%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24rdoWrkEmp=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=00000&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=1&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=666&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=555&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=6666&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=05%2F01%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=05%2F05%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24btnNextEmpDet=Continue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=');
  }

  function checkPostDataNo(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Btrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnFDDate=5%2F13%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=05%2F11%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2023&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=5%2F12%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl03%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24rdoWrkEmp=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=00000&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=1&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=666&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=555&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=6666&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24btnNextEmpDet=Continue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimentEmployment.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  function checkYes() {
    mockASPX();
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type("05/01/2024");
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type("05/05/2024");
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
    cy.wait('@aspxSubmission').then(checkPostDataYes);
  }

  function checkNo() {
    mockASPX();
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
    cy.wait('@aspxSubmission').then(checkPostDataNo);
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/incompleteEmployer.html");
    });

    it("user can input employer info and proceed to next page", () => {
      checkYes();
    });

    it("user can say they did not work for employer", () => {
      checkNo();
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
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/incompleteEmployer.html");
      cy.wait('@script');
    });

    it("user can input employer info and proceed to next page", () => {
      checkYes();
    });

    it("user can say they did not work for employer", () => {
      checkNo();
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
