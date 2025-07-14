describe("Introduction page", () => {
  describe("Form Submission Tests with Mocked Endpoint", () => {
    it("submits the form, loads a mocked page, and checks POST data", () => {
      cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");

      cy.intercept('POST', '**/TDIIntroduction.aspx',
        { statusCode: 200, headers: { 'content-type': 'text/html' } }
      ).as('checkboxSubmission');

      cy.get('#ContentPlaceHolder1_chkAgree').check();

      cy.wait('@checkboxSubmission').then((interception) => {
        const formData = interception.request.body;

        expect(formData).to.include('__EVENTTARGET=ctl00%24ContentPlaceHolder1%24chkAgree');
        expect(formData).to.include('__EVENTARGUMENT=');
        expect(formData).to.include('ctl00%24ContentPlaceHolder1%24chkAgree=on');

        expect(formData).to.match(/__VIEWSTATE=[^&]+/);
        expect(formData).to.match(/__EVENTVALIDATION=[^&]+/);
      });
    });
  });

  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");
    cy.contains("APPLICATION FOR STATE TEMPORARY DISABILITY BENEFITS");
    cy.contains("I have read the above information");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");
    cy.checkBodyA11y();
  });

  it("applies mobile-friendly adjustments", () => {
    cy.viewport(390, 844);
    cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");
    cy.get('meta[name="viewport"]')
      .should('have.attr', 'content', 'width=device-width, initial-scale=1');
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'style', 'width: 100%; height: auto;');
    });
  });
});
