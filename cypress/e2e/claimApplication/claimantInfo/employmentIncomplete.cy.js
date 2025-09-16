const PAGE_ID = 'employment';

describe("Employment Info page", () => {
  function mockASPX() {
    cy.intercept('POST', '**/ClaimentEmployment.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  function checkConfirm() {
    cy.get('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_btnEmpCertify').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains("You cannot proceed with Confirmation now. Please verify the employers below.");
    });
  }

  function checkAddEmployer() {
    cy.window().then((win) => {
      cy.stub(win, '__doPostBack').as('doPostBackStub');
    });
    cy.get('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvEmployers_chkEmployer_0').click();
    cy.get('@doPostBackStub').should('be.calledWith', 'ctl00$ContentPlaceHolder1$TabEmployment$tbpnlEMP$gvEmployers$ctl02$chkEmployer', '');
  }

  function checkCompleteEmployer() {
    cy.window().then((win) => {
      cy.stub(win, '__doPostBack').as('doPostBackStub');
    });
    cy.get('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvEmployers_chkEmployer_1').click();
    cy.get('@doPostBackStub').should('be.calledWith', 'ctl00$ContentPlaceHolder1$TabEmployment$tbpnlEMP$gvEmployers$ctl03$chkEmployer', '');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/employmentIncomplete.html");
    });

    it("user can input info and proceed to next page", () => {
      checkConfirm();
    });

    it("user can enter the flow to add a new employer", () => {
      checkAddEmployer();
    });

    it("user can enter the flow to complete an incomplete employer", () => {
      checkCompleteEmployer();
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
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/employmentIncomplete.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      checkConfirm();
    });

    it("user can enter the flow to add a new employer", () => {
      checkAddEmployer();
    });

    it("user can enter the flow to complete an incomplete employer", () => {
      checkCompleteEmployer();
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
