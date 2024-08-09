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

describe("Payment Detail page - Leave Ended TDI", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/paymentDetail/paymentDetailLeaveEndedTDI.html"
    );

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("Your Temporary Disability claim ended on May 6, 2024.").should(
      "be.visible"
    );
    cy.get("li")
      .contains(
        "If you're taking bonding leave (Family Leave Insurance) immediately after, look out for an FL2 form in the mail. We'll send it to you after your P30 is processed."
      )
      .should("be.visible");

    cy.get("#accordion0id")
      .contains("Next $770.00 to issue on August 13, 2024")
      .should("be.visible");
    cy.get("#accordion0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/paymentDetail/paymentDetailLeaveEndedTDI.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - Max Entitlement", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/paymentDetail/paymentDetailMaxEntitlement.html"
    );

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("You've reached the maximum benefits allowed").should(
      "be.visible"
    );
    cy.contains(
      "You can't extend your state benefits for this condition/disability, regardless of whether your doctor approves it."
    ).should("be.visible");

    cy.get("#accordion0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordion0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/paymentDetail/paymentDetailMaxEntitlement.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - No Additional Benefits", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/paymentDetail/paymentDetailNoAdditional.html");

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("No additional benefits have been authorized.").should(
      "be.visible"
    );

    cy.get("#accordion0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordion0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/paymentDetail/paymentDetailNoAdditional.html");
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - P30 received FLI", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/paymentDetail/paymentDetailP30ReceivedFLI.html"
    );

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Family Leave Insurance (FLI)").should("be.visible");
    cy.contains(
      "Your FL3 form (Family Leave Insurance Continued Claim Certification) was received on August 2, 2024."
    ).should("be.visible");
    cy.get("li")
      .contains("There's no action for you to take.")
      .should("be.visible");

    cy.get("#accordion0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordion0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/paymentDetail/paymentDetailP30ReceivedFLI.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - P30 received TDI", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/paymentDetail/paymentDetailP30ReceivedTDI.html"
    );

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains(
      "Your P30 form (Request to Claimant for Continued Claim Information) was received on August 2, 2024."
    ).should("be.visible");
    cy.get("li")
      .contains("There's no action for you to take.")
      .should("be.visible");
    cy.get("li")
      .contains(
        "The FL2 is how you'll start your bonding leave, without a break in payments."
      )
      .should("be.visible");

    cy.get("#accordion0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordion0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/paymentDetail/paymentDetailP30ReceivedTDI.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - P30 sent", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/paymentDetail/paymentDetailP30Sent.html");

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains(
      "To complete this step, you'll need the P30 letter, or Request for Continued Claim Information. We mailed this to you on August 1, 2024."
    ).should("be.visible");
    cy.get("li")
      .contains("Share the Form ID with your doctor.")
      .should("be.visible");

    cy.get("#accordion0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordion0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/paymentDetail/paymentDetailP30Sent.html");
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - Pay code 99/6", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/paymentDetail/paymentDetailPayCode996.html");

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("Please contact our office for additional information.").should(
      "be.visible"
    );

    cy.get("#accordion0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordion0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/paymentDetail/paymentDetailPayCode996.html");
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - Recovered", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/paymentDetail/paymentDetailRecovered.html");

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains(
      "No further benefits have been issued since you recovered / returned to work."
    ).should("be.visible");

    cy.get("#accordion0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordion0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/paymentDetail/paymentDetailRecovered.html");
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - Scheduled", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/paymentDetail/paymentDetailScheduled.html");

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains(
      "We're sending payment to your benefits debit card on October 13, 2024. You can access the funds about 2 business days later."
    ).should("be.visible");

    cy.get("#accordion0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordion0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/paymentDetail/paymentDetailScheduled.html");
    cy.checkBodyA11y();
  });
});
