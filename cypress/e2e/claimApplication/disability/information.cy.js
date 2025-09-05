const PAGE_ID = 'disabilityInformation';

describe("Disability Information page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDisStartDt=07%2F18%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDisStartDt=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnPregFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtLDW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnRTWFlg=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtRTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnDtExpRDTW=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=07%2F17%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecYes&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtReturnedToWrk=08%2F17%2F2025&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnConflictType=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24hdnTDIPayCode=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24btnSubmitConflictCheck=Continue&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabDoctor%24hdnInjCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24TabWC%24hdnNoClaimCount=&ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24tbpnlLatePayment%24hdnLPay=');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimantDisabililty.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/disability/information.html");
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt').type("07/18/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd').type("07/17/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk').type("08/17/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_btnSubmitConflictCheck').click();
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
      cy.visit("./cypress/fixtures/claimApplication/disability/information.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt').type("07/18/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd').type("07/17/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk').type("08/17/2025");
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_btnSubmitConflictCheck').click();
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

    it("tracks that this page fixture has a validation error", () => {
      const truncatedMessage = "PLEASE ANSWER THE FOLLOWING QUESTION(S). THEY MUST BE COMPLETED TO PROCEED:3a. Select the date you e";
      cy.checkLogEvent("Validation Error", { contents: truncatedMessage });
    });

    it('clicks Dismiss on the info alert, alert hides and does not return', () => {
      cy.checkInfoAlertBehavior();
    });
  });
});
