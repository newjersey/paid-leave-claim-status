describe("Claim Detail page - In Progress scenario", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailUndeterminedInProgress.html"
    );

    cy.contains("Undetermined").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Status").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("leave starting August 1, 2023").should("be.visible");

    cy.get(".complete.received")
      .contains("August 7, 2023")
      .should("be.visible");
    cy.get(".current").contains("Review").should("be.visible");
    cy.contains("In progress").should("be.visible");
    cy.get("li")
      .contains("There's no action for you to take.")
      .should("be.visible");
    cy.get("li").contains("We'll review your claim.").should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailUndeterminedInProgress.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page - 14 Day scenario", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailUndetermined14Day.html"
    );

    cy.contains("Undetermined").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Status").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("leave starting August 1, 2023").should("be.visible");

    cy.get(".complete.received")
      .contains("August 7, 2023")
      .should("be.visible");
    cy.get(".current").contains("Review").should("be.visible");
    cy.contains("In progress").should("be.visible");
    cy.get("li")
      .contains("There's no action for you to take.")
      .should("be.visible");
    cy.get("li").contains("We'll review your claim.").should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailUndetermined14Day.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page - Blank request scenario", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailUndeterminedBlankRequest.html"
    );

    cy.contains("Undetermined").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Status").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("leave starting August 1, 2023").should("be.visible");

    cy.get(".complete.received")
      .contains("August 7, 2023")
      .should("be.visible");
    cy.get(".current").contains("Review").should("be.visible");
    cy.contains("In progress").should("be.visible");
    cy.get("li")
      .contains("There's no action for you to take.")
      .should("be.visible");
    cy.get("li").contains("We'll review your claim.").should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailUndeterminedBlankRequest.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page - Information Needed scenario", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailUndeterminedInfoNeeded.html"
    );

    cy.contains("Undetermined").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Status").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("leave starting August 1, 2023").should("be.visible");

    cy.get(".complete.received")
      .contains("August 7, 2023")
      .should("be.visible");
    cy.get(".current").contains("Review").should("be.visible");
    cy.contains("Information needed").should("be.visible");
    cy.get("li")
      .contains(
        "After we receive the information, we'll continue reviewing your claim."
      )
      .should("be.visible");

    cy.get("#accordion1id")
      .contains("Missing claimant information (1 of 7)")
      .should("be.visible");
    cy.get("#accordion2id")
      .contains("Missing medical information (2 of 7)")
      .should("be.visible");
    cy.get("#accordion3id")
      .contains("Missing wage information (3 of 7)")
      .should("be.visible");
    cy.get("#accordion4id")
      .contains("Missing workers' compensation information (4 of 7)")
      .should("be.visible");
    cy.get("#accordion5id")
      .contains("Missing claimant information (5 of 7)")
      .should("be.visible");
    cy.get("#accordion6id")
      .contains("Missing workers' compensation information (6 of 7)")
      .should("be.visible");
    cy.get("#accordion7id")
      .contains("Missing medical information (7 of 7)")
      .should("be.visible");
  });

  it("renders C10 accordion that opens and closes on click", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailUndeterminedInfoNeeded.html"
    );

    const accordionButton = cy.get("#accordion1id");
    cy.get("#sect1").should("not.be.visible");
    accordionButton.click();
    cy.get("#sect1")
      .contains(
        "To process your claim, we need claimant information from you. On August 25, 2023, we mailed a Request to Claimant for Information (C10) to Jenni Mahlstedt."
      )
      .should("be.visible");
    cy.get("#sect1")
      .contains("Follow the instructions on the form and respond by")
      .get("b")
      .contains("September 8, 2023")
      .should("be.visible");
    cy.get("#sect1")
      .contains(
        "If you haven't received anything by September 4, 2023, reach out to our customer help team."
      )
      .should("be.visible");
    accordionButton.click();
    cy.get("#sect1").should("not.be.visible");
  });

  it("renders M01 accordion that opens and closes on click", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailUndeterminedInfoNeeded.html"
    );

    const accordionButton = cy.get("#accordion7id");
    cy.get("#sect7").should("not.be.visible");
    accordionButton.click();
    cy.get("#sect7")
      .contains(
        "To process your claim, we need a medical certificate from your doctor (or "
      )
      .should("be.visible");
    cy.get("#sect7").contains("August 21, 2023").should("be.visible");
    cy.get("#sect7 li > a")
      .should("have.attr", "href")
      .and(
        "include",
        "https://secure.dol.state.nj.us/tdi/caller.aspx?Source=TDI"
      );
    accordionButton.click();
    cy.get("#sect7").should("not.be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailUndeterminedInfoNeeded.html"
    );
    cy.checkBodyA11y();
  });
});
