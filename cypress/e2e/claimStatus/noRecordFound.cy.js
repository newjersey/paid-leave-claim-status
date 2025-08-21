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

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimStatus/noRecordFound/noRecordFound.html");
    cy.checkBodyA11y();
  });

  describe("feedback widget", () => {
    it("renders the feedback widget", () => {
      cy.visit("./cypress/fixtures/claimStatus/noRecordFound/noRecordFound.html")
      cy.get("feedback-widget").should('have.length', 1)
      cy.get("feedback-widget").within(() => {
          cy.contains("Did you find what you were looking for on this page?").should('be.visible');
      })
    })

    it("calls the /rating endpoint when the 'Yes' button is clicked and displays the next screen", () => {
      const commentScreenTextMatcher = /what ideas come to mind/i
      cy.intercept('POST', '**/rating', { message: "Success", feedbackId: "1"})
        .as("postRating")

      cy.visit("./cypress/fixtures/claimStatus/claimList/claimList.html")

      cy.get("feedback-widget").within(() => {
        cy.contains(commentScreenTextMatcher).should('not.be.visible')
      })

      cy.get("feedback-widget")
        .contains("button", /yes/i)
        .click()

      cy.wait("@postRating")
        .its('request.body')
        .should('have.property', 'rating', true)
      
      cy.get("feedback-widget").within(() => {
        cy.contains(commentScreenTextMatcher).should('be.visible')
      })
    })
  })
});

