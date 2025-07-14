describe("Introduction page", () => {

  describe("Form Submission Tests with Mocked Endpoint", () => {
    it("submits the form and loads a mocked page", () => {
      cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");

      // Intercept the form submission POST request and provide a mock HTML response
      cy.intercept('POST', '**/TDIIntroduction.aspx', {
        statusCode: 200,
        headers: { 'content-type': 'text/html' },
        body: `
          <html>
            <head><title>Submission Successful</title></head>
            <body>
              <h1>Form Submission Successful</h1>
              <p>The form has been submitted successfully.</p>
              <!-- Add any necessary mock HTML content here -->
            </body>
          </html>
        `,
      }).as('checkboxSubmission');

      // Check the checkbox to trigger the form submission
      cy.get('#ContentPlaceHolder1_chkAgree').check();

      // Wait for the mock submission to complete
      cy.wait('@checkboxSubmission');

      // Verify the mocked page content
      cy.contains('Form Submission Successful').should('be.visible');
      cy.contains('The form has been submitted successfully.').should('be.visible');
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
