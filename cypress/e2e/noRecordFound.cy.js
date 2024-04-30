describe("No Record Found page", () => {
  it("when script is enabled, opens site with updated content", () => {
    const now = new Date(2021, 3, 14); // month is 0-indexed
    cy.clock(now);

    cy.visit("./cypress/fixtures/noRecordFound/noRecordFound.html");

    cy.contains(
      "No record of a New Jersey State Plan Temporary Disability or State Plan Family Leave Insurance claim has been found under the social security number (666-00-0000)."
    ).should("not.exist");
    cy.contains("No claim on file");
    cy.contains("If you recently applied, don't worry!");
    cy.contains("Give feedback");
    cy.contains("Current as of April 14, 2021");
  });

  it("when script is enabled, new design is accessible", () => {
    cy.visit("./cypress/fixtures/noRecordFound/noRecordFound.html");
    cy.checkBodyA11y();
  });
});
