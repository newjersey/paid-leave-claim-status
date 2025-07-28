describe("Profile Info page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    expect(formData).to.include('__EVENTTARGET=');
    expect(formData).to.include('__EVENTARGUMENT=');
    expect(formData).to.match(/__VIEWSTATE=[^&]+/);
    expect(formData).to.match(/__VIEWSTATEGENERATOR=[^&]+/);
    expect(formData).to.match(/__EVENTVALIDATION=[^&]+/);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24VerConf=rbtnPersYes');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24btncontinueVer=Continue');
  }

  function mockASPX() {
    cy.intercept('POST', '**/IAM_Login_Profile.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/profileInfo/TDI.html");
    });

    it("user can confirm info is correct and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnPersYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btncontinueVer').click();
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
      cy.visit("./cypress/fixtures/claimApplication/profileInfo/TDI.html");
      cy.wait('@script');
    });

    it("user can confirm info is correct and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnPersYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btncontinueVer').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("invisible link is hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('have.attr', 'aria-hidden', 'true');
    });
  });
});
