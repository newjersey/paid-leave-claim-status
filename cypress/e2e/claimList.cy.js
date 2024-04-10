describe("Claim List page - with recent and older claims", () => {
  it("when script is disabled, opens site with original content", () => {
    // Arrange
    cy.intercept(
      "/cypress/fixtures/claimList/claimList.min.js",
      `console.log("Script has been intercepted and replaced with this line");`
    );

    // Act
    cy.visit("./cypress/fixtures/claimList/claimList.html");

    // Assert
    cy.contains("XXX-XX-2204").should("be.visible");
    cy.contains("Check all your claims").should("not.exist");
  });

  it("when script is enabled, opens site with updated content", () => {
    const now = new Date(2024, 3, 14); // month is 0-indexed
    cy.clock(now);
    cy.visit("./cypress/fixtures/claimList/claimList.html");

    cy.contains("XXX-XX-2204").should("not.exist");
    cy.get("h1").contains("jenni mahlstedt").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("Claim for Family Leave Insurance (FLI)").should("be.visible");

    // Recent claims (within 1 year of `now`)
    cy.contains("Started March 5, 2024").should("be.visible");
    cy.contains("Started December 25, 2023").should("be.visible");
    cy.contains("Started July 10, 2023").should("be.visible");

    // Older claims (earlier than 1 year)
    cy.contains("started more than a year ago").should("be.visible");
    cy.contains("started February 14, 2021").should("be.visible");
    cy.contains("started May 26, 2020").should("be.visible");
  });

  it("when script is enabled, new design is accessible", () => {
    cy.visit("./cypress/fixtures/noRecordFound/noRecordFound.html");
    cy.checkBodyA11y();
  });
});
