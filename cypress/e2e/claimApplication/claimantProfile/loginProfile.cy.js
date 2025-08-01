describe("Login Profile page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hClmtName=0&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtConfSSN1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtConfSSN2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtConfSSN3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24VerConf=rbtnPersYes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24btncontinueVer=Continue');
  }

  function mockASPX() {
    cy.intercept('POST', '**/IAM_Login_Profile.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantProfile/login.html");
    });

    it("user can confirm info is correct and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnPersYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btncontinueVer').click();
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
      cy.visit("./cypress/fixtures/claimApplication/claimantProfile/login.html");
      cy.wait('@script');
    });

    it("user can confirm info is correct and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnPersYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btncontinueVer').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });
  });
});
