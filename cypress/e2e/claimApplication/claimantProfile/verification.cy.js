describe("Profile Verification page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    expect(formData).to.include('__EVENTTARGET=');
    expect(formData).to.include('__EVENTARGUMENT=');
    expect(formData).to.match(/__VIEWSTATE=[^&]+/);
    expect(formData).to.match(/__VIEWSTATEGENERATOR=[^&]+/);
    expect(formData).to.match(/__EVENTVALIDATION=[^&]+/);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerFname=FirstNameTest+LastNameTest');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerDob=01%2F01%2F2000');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerGender=Male');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtRace=Caucasian');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24VerConf=rbtnPersYes');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24btncontinueVer=Continue');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimantProfile_IANM.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantProfile/verification.html");
    });

    it("user can confirm info is correct and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_rbtnPersYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btncontinueVer').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("invisible link is not hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('not.have.attr', 'aria-hidden');
    });
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit("./cypress/fixtures/claimApplication/claimantProfile/verification.html");
      cy.wait('@script');
    });

    it("user can confirm info is correct and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_rbtnPersYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btncontinueVer').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("invisible link is hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('have.attr', 'aria-hidden', 'true');
    });
  });
});
