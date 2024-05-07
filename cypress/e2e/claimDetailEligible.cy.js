describe("Claim Detail page - Eligible scenario with next pay date", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailEligible.html");

    cy.contains("Eligible").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Status").should("be.visible");

    cy.get(".complete.received")
      .contains("August 10, 2023")
      .should("be.visible");
    cy.get(".complete").contains("Review").should("be.visible");
    cy.get(".complete").contains("Decision").should("be.visible");
    cy.get(".end.current").contains("Payment").should("be.visible");

    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("Approved").should("be.visible");
    cy.get("button")
      .contains("Go to payment information")
      .should("have.attr", "onclick")
      .and("equal", "paymentDetail()");
    cy.contains("Your next payment is scheduled for").should("be.visible");
    cy.contains("November 22, 2023").should("be.visible");
    cy.get("li")
      .contains(
        "You'll keep getting paid. We'll post here if anything changes."
      )
      .should("be.visible");
    cy.contains("Weekly benefit rate")
      .contains("$1,025.00")
      .should("be.visible");
    cy.contains("Paid through date")
      .contains("September 14, 2023")
      .should("be.visible");
    cy.contains("Balance remaining")
      .contains("$20,649.00")
      .should("be.visible");
    cy.contains("Benefits start date")
      .contains("August 5, 2023")
      .should("be.visible");
    cy.contains("Benefits end date")
      .contains("December 1, 2023")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailEligible.html");
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page - Eligible scenario without next pay date", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailEligibleProcessing.html"
    );

    cy.contains("Eligible").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Status").should("be.visible");

    cy.get(".complete.received")
      .contains("August 10, 2023")
      .should("be.visible");
    cy.get(".complete").contains("Review").should("be.visible");
    cy.get(".complete").contains("Decision").should("be.visible");
    cy.get(".end.current").contains("Payment").should("be.visible");

    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("Approved").should("be.visible");
    cy.get("button")
      .contains("Go to payment information")
      .should("have.attr", "onclick")
      .and("equal", "paymentDetail()");
    cy.contains("Your payment is still processing.").should("be.visible");
    cy.get("li")
      .contains(
        "Payment is usually sent to your benefits debit card a few days after you're approved."
      )
      .should("be.visible");

    cy.get("li")
      .contains(
        "which is sent as back pay after your 22nd day of TDI benefits paid"
      )
      .should("be.visible");
    cy.contains("Weekly benefit rate")
      .contains("$1,025.00")
      .should("be.visible");
    cy.contains("Paid through date")
      .contains("September 14, 2023")
      .should("be.visible");
    cy.contains("Balance remaining")
      .contains("$20,649.00")
      .should("be.visible");
    cy.contains("Benefits start date")
      .contains("August 5, 2023")
      .should("be.visible");
    cy.contains("Benefits end date").should("not.exist");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailEligibleProcessing.html"
    );
    cy.checkBodyA11y();
  });
});
