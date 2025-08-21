describe("Claim List page - with recent and older claims", () => {
  it("renders with updated content", () => {
    const now = new Date(2024, 3, 14); // month is 0-indexed
    cy.clock(now);
    cy.visit("./cypress/fixtures/claimStatus/claimList/claimList.html");

    cy.contains("XXX-XX-2204").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("jenni mahlstedt").should("be.visible");
    cy.contains("Temporary Disability Insurance (TDI)").should("be.visible");
    cy.contains("Family Leave Insurance (FLI)").should("be.visible");

    // Recent claims (within 1 year of `now`)
    cy.contains("Leave starting March 5, 2024").should("not.exist");
    cy.contains("Leave starting December 25, 2023").should("be.visible");
    cy.contains("Leave starting July 10, 2023").should("exist");

    // Older claims (earlier than 1 year)
    cy.contains("more than 12 months ago").should("be.visible");
    cy.contains("- February 14, 2021").should("be.visible");
    cy.contains("- May 26, 2020").should("be.visible");

    cy.get("button")
      .contains("Check claim status")
      .should("have.attr", "onclick")
      .and("include", "populateMoreDetail('001', 'FLI', 'U')");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimStatus/claimList/claimList.html");
    cy.checkBodyA11y();
  });
});

describe("Claim List page - with no older claims", () => {
  it("renders with updated content", () => {
    const now = new Date(2024, 3, 14); // month is 0-indexed
    cy.clock(now);
    cy.visit("./cypress/fixtures/claimStatus/claimList/claimListNoOlder.html");

    cy.get("XXX-XX-2204").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("jenni mahlstedt").should("be.visible");
    cy.contains("Family Leave Insurance (FLI)").should("be.visible");
    cy.contains("from last 12 months").should("be.visible");
    cy.contains("Leave starting March 5, 2024").should("exist");

    // Check that old claim section is hidden
    cy.contains("Temporary Disability Insurance (TDI)").should("not.exist");
    cy.contains("more than 12 months ago").should("not.exist");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimStatus/claimList/claimListNoOlder.html");
    cy.checkBodyA11y();
  });
});

describe("Claim List page - with no recent claims", () => {
  it("renders with updated content", () => {
    const now = new Date(2024, 3, 14); // month is 0-indexed
    cy.clock(now);
    cy.visit("./cypress/fixtures/claimStatus/claimList/claimListNoRecent.html");

    cy.get("XXX-XX-2204").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("jenni mahlstedt").should("be.visible");
    cy.contains("from last 12 months").should("be.visible");
    cy.contains("No claim on file.").should("be.visible");

    cy.contains("more than 12 months ago").should("be.visible");
    cy.contains("Family Leave Insurance (FLI)").should("be.visible");
    cy.contains("Temporary Disability Insurance (TDI)").should("be.visible");
    cy.contains("- August 5, 2021").should("be.visible");
    cy.contains("- March 5, 2020").should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimStatus/claimList/claimListNoRecent.html");
    cy.checkBodyA11y();
  });
});

describe("feedback widget", () => {
  it("renders the feedback widget inside the footer", () => {
    cy.visit("./cypress/fixtures/claimStatus/claimList/claimList.html")
    cy.get("footer").find("feedback-widget").should('have.length', 1)
    cy.get("footer").find("feedback-widget").within(() => {
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