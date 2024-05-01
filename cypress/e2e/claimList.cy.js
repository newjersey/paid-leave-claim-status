describe("Claim List page - with recent and older claims", () => {
  it("renders with updated content", () => {
    const now = new Date(2024, 3, 14); // month is 0-indexed
    cy.clock(now);
    cy.visit("./cypress/fixtures/claimList/claimList.html");

    cy.contains("XXX-XX-2204").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("jenni mahlstedt").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("Claim for Family Leave Insurance (FLI)").should("be.visible");

    // Recent claims (within 1 year of `now`), uses "Started" text
    cy.contains("Started March 5, 2024").should("be.visible");
    cy.contains("Started December 25, 2023").should("be.visible");
    cy.contains("Started July 10, 2023").should("be.visible");

    // Older claims (earlier than 1 year), uses "started" text
    cy.contains("started more than a year ago").should("be.visible");
    cy.contains("started February 14, 2021").should("be.visible");
    cy.contains("started May 26, 2020").should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimList/claimList.html");
    cy.checkBodyA11y();
  });
});

describe("Claim List page - with no older claims", () => {
  it("renders with updated content", () => {
    const now = new Date(2024, 3, 14); // month is 0-indexed
    cy.clock(now);
    cy.visit("./cypress/fixtures/claimList/claimListNoOlder.html");

    cy.get("XXX-XX-2204").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("jenni mahlstedt").should("be.visible");
    cy.contains("Claim for Family Leave Insurance (FLI)").should("be.visible");
    cy.contains("started in the last 12 months").should("be.visible");
    cy.contains("Started March 5, 2024").should("be.visible");

    // Check that old claim section is hidden
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "not.exist"
    );
    cy.contains("started more than a year ago").should("not.exist");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimList/claimListNoOlder.html");
    cy.checkBodyA11y();
  });
});

describe("Claim List page - with no recent claims", () => {
  it("renders with updated content", () => {
    const now = new Date(2024, 3, 14); // month is 0-indexed
    cy.clock(now);
    cy.visit("./cypress/fixtures/claimList/claimListNoRecent.html");

    cy.get("XXX-XX-2204").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("jenni mahlstedt").should("be.visible");
    cy.contains("started in the last 12 months").should("be.visible");
    cy.contains("No recent claims on file").should("be.visible");

    cy.contains("started more than a year ago").should("be.visible");
    cy.contains("Claim for Family Leave Insurance (FLI)").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("started August 5, 2021").should("be.visible");
    cy.contains("started March 5, 2020").should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimList/claimListNoRecent.html");
    cy.checkBodyA11y();
  });
});
