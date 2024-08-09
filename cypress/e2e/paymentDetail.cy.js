describe("Payment Detail page - Leave Ended FLI", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/paymentDetail/paymentDetailLeaveEndedFLI.html"
    );

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Family Leave Insurance (FLI)").should("be.visible");
    cy.contains("Your Family Leave claim ended on May 6, 2024.").should(
      "be.visible"
    );

    cy.get("#accordion0id")
      .contains("Next $770.00 to issue on August 13, 2024")
      .should("be.visible");
    cy.get("#accordion0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");

    cy.get("#accordion1id")
      .contains("$1,669.00 issued on May 6, 2024")
      .should("be.visible");
    cy.get("#accordion1id")
      .contains("Covers April 17, 2024 to April 29, 2024")
      .should("be.visible");

    cy.get("#accordion2id")
      .contains("$1,798.00 issued on May 6, 2024")
      .should("be.visible");
    cy.get("#accordion2id")
      .contains("Covers April 3, 2024 to April 16, 2024")
      .should("be.visible");

    cy.get("#accordion3id")
      .contains("$899.00 issued on May 6, 2024")
      .should("be.visible");
    cy.get("#accordion3id")
      .contains("Covers March 27, 2024 to April 2, 2024")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/paymentDetail/paymentDetailLeaveEndedFLI.html"
    );
    cy.checkBodyA11y();
  });
});

it("renders payment record accordion that opens and closes on click", () => {
  cy.visit("./cypress/fixtures/paymentDetail/paymentDetailLeaveEndedFLI.html");

  const accordionButton = cy.get("#accordion2id");
  cy.get("#sect2").should("not.be.visible");
  accordionButton.click();
  cy.get("#sect2").contains("0D015764").should("be.visible");
  cy.get("#sect2").contains("$1,660.45").should("be.visible");
  accordionButton.click();
  cy.get("#sect2").should("not.be.visible");
});
