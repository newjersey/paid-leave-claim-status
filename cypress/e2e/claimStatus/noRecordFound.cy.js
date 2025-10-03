describe("No Record Found page", () => {
  it("renders with updated content", () => {
    const now = new Date(2021, 3, 14); // month is 0-indexed
    cy.clock(now);

    cy.visit("./cypress/fixtures/claimStatus/noRecordFound/noRecordFound.html");

    cy.contains(
      "No record of a New Jersey State Plan Temporary Disability or State Plan Family Leave Insurance claim has been found under the social security number (666-00-0000)."
    ).should("not.exist");
    cy.contains("No claim on file");
    cy.contains("If you recently applied, don't worry!");
    cy.contains("Current as of April 14, 2021");
  });

    it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/noRecordFound/noRecordFound.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimStatus/noRecordFound/noRecordFound.html");
    cy.checkBodyA11y();
  });

  describe("feedback widget", () => {
    it("renders the feedback widget inside the footer", () => {
      cy.visit("./cypress/fixtures/claimStatus/noRecordFound/noRecordFound.html")
      cy.get("footer").find("feedback-widget").should('have.length', 1)
      cy.get("footer").within(() => {
        cy.checkFeedbackWidgetIsRendered()
      })
    })

    it("calls the /rating endpoint when the 'Yes' button is clicked and displays the next screen", () => {
      cy.visit("./cypress/fixtures/claimStatus/noRecordFound/noRecordFound.html")
      
      cy.get("footer").within(() => {
        cy.checkFeedbackWidgetIsInteractable()
      })
    })

    it("displays the overridden version of the email disclaimer text", () => {
      cy.visit("./cypress/fixtures/claimStatus/noRecordFound/noRecordFound.html")
      cy.checkFeedbackWidgetEmailDisclaimerTextIsOverridden()
    })
  })
});

