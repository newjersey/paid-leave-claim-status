describe("page without new JS", () => {
  beforeEach(() => {
    cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
    cy.visit("https://securest.dol.state.nj.us/tdi_iam/TDIIntroduction.aspx");
  });

  it("proceeds through an example user flow", () => {
    // Login page

    // type demo username
    cy.get('#idToken1').type('doltest@mailinator.com');

    // type demo password
    cy.get('#idToken2').type('Test@123');

    // press Login button
    cy.get('#loginButton_0').click();

    // TDI Introduction
    cy.get('#ContentPlaceHolder1_chkAgree', { timeout: 300000 }).check();
  });
});
