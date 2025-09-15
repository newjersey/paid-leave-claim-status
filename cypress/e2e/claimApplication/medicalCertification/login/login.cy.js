describe("Medical Certification Login page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24txtMedFormId=11111&ctl00%24ContentPlaceHolder1%24txtDOB=01%2F01%2F2000&ctl00%24ContentPlaceHolder1%24btnLogIn=Log+In');
  }

  function mockASPX() {
    cy.intercept('POST', '**/LoginMedicalCertification.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  function currentPageBehavior() {
    it("user can fill in info and search", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_txtMedFormId').type('11111');
      cy.get('#ContentPlaceHolder1_txtDOB').type('01/01/2000');
      cy.get('#ContentPlaceHolder1_btnLogIn').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("invisible link is not hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('not.have.attr', 'aria-hidden');
    });
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/medicalCertification/login/LoginMedicalCertification.aspx.html");
    });

    currentPageBehavior();
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit("./cypress/fixtures/claimApplication/medicalCertification/login/LoginMedicalCertification.aspx.html");
      cy.wait('@script');
    });

    currentPageBehavior();
  });
});
