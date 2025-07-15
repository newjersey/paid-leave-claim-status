describe("Introduction page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;

    expect(formData).to.include('__EVENTTARGET=ctl00%24ContentPlaceHolder1%24chkAgree');
    expect(formData).to.include('__EVENTARGUMENT=');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24chkAgree=on');

    expect(formData).to.match(/__VIEWSTATE=[^&]+/);
    expect(formData).to.match(/__EVENTVALIDATION=[^&]+/);
  }

  function mockASPX() {
    cy.intercept('POST', '**/TDIIntroduction.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiIntroduction.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");
    });

    it("agrees to terms and checks POST data", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_chkAgree').check();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("does not render with updated content", () => {
      cy.contains("Agree & Continue").should('not.exist');
    });
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");
    });

    it("agrees to terms and checks POST data", () => {
      mockASPX();
      cy.contains('button', 'Agree & Continue').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });
  });
});
