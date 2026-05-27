describe("Payment Detail page - Leave Ended FLI", () => {
  it("renders with updated content", () => {
    const fixedDate = new Date(2024, 9, 1); // October 1, 2024
    cy.clock(fixedDate.getTime());

    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailLeaveEndedFLI.html"
    );

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Family Leave Insurance (FLI)").should("be.visible");
    cy.contains("JENNI MAHLSTEDT").should("be.visible");
    cy.contains("Your Family Leave claim ended on May 6, 2024.").should(
      "be.visible"
    );

    cy.get("button")
      .contains("Status")
      .should("have.attr", "onclick")
      .and("equal", "claimdetail()");

    cy.contains("Total payments issued: $4,366.00").should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Next $770.00 to issue on August 13, 2035")
      .should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Covers April 30, 2034 to May 5, 2034")
      .should("be.visible");

    cy.get("#accordionPast0id")
      .contains("$1,669.00 issued on May 6, 2024")
      .should("be.visible");
    cy.get("#accordionPast0id")
      .contains("Covers April 17, 2024 to April 29, 2024")
      .should("be.visible");

    cy.get("#accordionPast1id")
      .contains("$1,798.00 issued on May 6, 2024")
      .should("be.visible");
    cy.get("#accordionPast1id")
      .contains("Covers April 3, 2024 to April 16, 2024")
      .should("be.visible");

    cy.get("#accordionPast2id")
      .contains("$899.00 issued on May 6, 2024")
      .should("be.visible");
    cy.get("#accordionPast2id")
      .contains("Covers March 27, 2024 to April 2, 2024")
      .should("be.visible");
  });

  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailLeaveEndedFLI.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailLeaveEndedFLI.html"
    );
    cy.checkBodyA11y();
  });
});

it("renders payment record accordion that opens and closes on click", () => {
  const fixedDate = new Date(2024, 9, 1); // October 1, 2024
  cy.clock(fixedDate.getTime());

  cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailLeaveEndedFLI.html");

  const accordionButton = cy.get("#accordionPast1id");
  cy.get("#sectPast1").should("not.be.visible");
  accordionButton.click();
  cy.get("#sectPast1").contains("0D015764").should("be.visible");
  cy.get("#sectPast1").contains("$1,660.45").should("be.visible");
  accordionButton.click();
  cy.get("#sectPast1").should("not.be.visible");
});

describe("Payment Detail page - Leave Ended TDI", () => {
  it("renders with updated content", () => {
    const fixedDate = new Date(2024, 9, 1); // October 1, 2024
    cy.clock(fixedDate.getTime());

    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailLeaveEndedTDI.html"
    );

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("JENNI MAHLSTEDT").should("be.visible");
    cy.contains("Your Temporary Disability claim ended on May 6, 2024.").should(
      "be.visible"
    );
    cy.get("li")
      .contains(
        "If you're taking bonding leave (Family Leave Insurance) immediately after, look out for an FL2 form in the mail. We'll send it to you after your P30 is processed."
      )
      .should("be.visible");

    cy.contains("Total payments issued: $4,366.00").should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Next $770.00 to issue on August 13, 2035")
      .should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Covers April 30, 2034 to May 5, 2034")
      .should("be.visible");
  });
  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailLeaveEndedTDI.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailLeaveEndedTDI.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - Max Entitlement FLI", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailMaxEntitlementFLI.html"
    );
    cy.contains("Claim for Family Leave Insurance (FLI)").should(
      "be.visible"
    );
    cy.contains("You've reached the maximum benefits allowed").should(
      "be.visible"
    );
    cy.contains(
      "You can't extend your state benefits for this condition/disability, regardless of whether your doctor approves it."
    ).should("not.exist");
  });
  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailMaxEntitlementFLI.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailMaxEntitlementFLI.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - Max Entitlement TDI", () => {
  it("renders with updated content", () => {
    const fixedDate = new Date(2024, 9, 1); // October 1, 2024
    cy.clock(fixedDate.getTime());

    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailMaxEntitlementTDI.html"
    );

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("JENNI MAHLSTEDT").should("be.visible");
    cy.contains("You've reached the maximum benefits allowed").should(
      "be.visible"
    );
    cy.contains(
      "You can't extend your state benefits for this condition/disability, regardless of whether your doctor approves it."
    ).should("be.visible");

    cy.contains("Total payments issued: $4,366.00").should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });
  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailMaxEntitlementTDI.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailMaxEntitlementTDI.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - No Additional Benefits", () => {
  it("renders with updated content", () => {
    const fixedDate = new Date(2024, 9, 1); // October 1, 2024
    cy.clock(fixedDate.getTime());

    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailNoAdditional.html");

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("JENNI MAHLSTEDT").should("be.visible");
    cy.contains("No additional benefits have been authorized.").should(
      "be.visible"
    );

    cy.contains("Total payments issued: $4,366.00").should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });
  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailNoAdditional.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailNoAdditional.html");
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - P30 received FLI", () => {
  it("renders with updated content", () => {
    const fixedDate = new Date(2024, 9, 1); // October 1, 2024
    cy.clock(fixedDate.getTime());

    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailP30ReceivedFLI.html"
    );

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Family Leave Insurance (FLI)").should("be.visible");
    cy.contains("JENNI MAHLSTEDT").should("be.visible");
    cy.contains(
      "Your FL3 form (Family Leave Insurance Continued Claim Certification) was received on August 2, 2024."
    ).should("be.visible");
    cy.get("li")
      .contains("There's no action for you to take.")
      .should("be.visible");

    cy.contains("Total payments issued: $4,366.00").should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });
  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailP30ReceivedFLI.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailP30ReceivedFLI.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - P30 received TDI", () => {
  it("renders with updated content", () => {
    const fixedDate = new Date(2024, 9, 1); // October 1, 2024
    cy.clock(fixedDate.getTime());

    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailP30ReceivedTDI.html"
    );

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("JENNI MAHLSTEDT").should("be.visible");
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


    cy.contains("Total payments issued: $4,366.00").should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });
  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailP30ReceivedTDI.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailP30ReceivedTDI.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - P30 sent", () => {
  it("renders with updated content", () => {
    const fixedDate = new Date(2024, 9, 1); // October 1, 2024
    cy.clock(fixedDate.getTime());

    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailP30Sent.html");

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("JENNI MAHLSTEDT").should("be.visible");
    cy.contains(
      "To complete this step, you'll need the P30 letter, or Request for Continued Claim Information. We mailed this to you on August 1, 2024."
    ).should("be.visible");
    cy.get("li")
      .contains("Share the Form ID with your doctor.")
      .should("be.visible");

    cy.contains("Total payments issued: $4,366.00").should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });
  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailP30Sent.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailP30Sent.html");
    cy.checkBodyA11y();
  });
});


describe("Payment Detail page - FL3 sent", () => {
  it("renders with updated content", () => {
    const fixedDate = new Date(2025, 8, 10); // September 10, 2025
    cy.clock(fixedDate.getTime());

    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailFl3Sent.html");

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Family Leave Insurance (FLI)").should(
      "be.visible"
    );
    cy.contains("JOHN").should("be.visible");
    cy.contains(
      "Your last scheduled payment is coming up. To request more days, you'll need to mail or fax us the Family Leave Insurance Continued Claim Certification (FL3 form), showing your updated leave schedule. We mailed this on September 10, 2025."
    ).should("be.visible");
    cy.get("li")
      .contains("Caregiving leave?")
      .should("be.visible");


    cy.contains("Total payments issued: $1,081.00").should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Next $1,853.00 to issue on September 11, 2025")
      .should("be.visible");
    cy.get("#accordionPast0id")
      .contains("1,081.00 issued on September 9, 2025")
      .should("be.visible");
  });
  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailFl3Sent.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailFl3Sent.html");
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - Pay code 99/6", () => {
  it("renders with updated content", () => {
    const fixedDate = new Date(2024, 9, 1); // October 1, 2024
    cy.clock(fixedDate.getTime());

    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailPayCode996.html");

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("JENNI MAHLSTEDT").should("be.visible");
    cy.contains("Please contact our office for additional information.").should(
      "be.visible"
    );

    cy.contains("Total payments issued: $4,366.00").should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });
  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailPayCode996.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailPayCode996.html");
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - Recovered", () => {
  it("renders with updated content", () => {
    const fixedDate = new Date(2024, 9, 1); // October 1, 2024
    cy.clock(fixedDate.getTime());

    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailRecovered.html");

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("JENNI MAHLSTEDT").should("be.visible");
    cy.contains(
      "No further benefits have been issued since you recovered / returned to work."
    ).should("be.visible");

    cy.contains("Total payments issued: $4,366.00").should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });
  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailRecovered.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailRecovered.html");
    cy.checkBodyA11y();
  });
});

describe("Payment Detail page - Scheduled", () => {
  it("renders with updated content", () => {
    const fixedDate = new Date(2024, 9, 1); // October 1, 2024
    cy.clock(fixedDate.getTime());

    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailScheduled.html");

    cy.contains("PAYMENT DETAIL").should("not.exist"); // Rendered on original HTML, without script change

    cy.get("h1").contains("Payments").should("be.visible");
    cy.contains("Claim for Temporary Disability Insurance (TDI)").should(
      "be.visible"
    );
    cy.contains("JENNI MAHLSTEDT").should("be.visible");
    cy.contains(
      "We're sending payment to your benefits debit card on October 13, 2024. You can access the funds about 2 business days later."
    ).should("be.visible");

    cy.contains("Total payments issued: $4,366.00").should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Next payment to issue on October 13, 2024")
      .should("be.visible");
    cy.get("#accordionFuture0id")
      .contains("Covers April 30, 2024 to May 5, 2024")
      .should("be.visible");
  });
  it("ensures viewport meta tag exists", () => {
    cy.visit(
      "./cypress/fixtures/claimStatus/paymentDetail/paymentDetailScheduled.html"
    );
    cy.checksViewportMetaTag();
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailScheduled.html");
    cy.checkBodyA11y();
  });
});

describe("feedback widget", () => {
  it("renders the feedback widget inside the footer", () => {
    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailLeaveEndedFLI.html")

    cy.get("footer").find("feedback-widget").should('have.length', 1)
    cy.get("footer").within(() => {
      cy.checkFeedbackWidgetIsRendered()
    })
  })

  it("calls the /rating endpoint when the 'Yes' button is clicked and displays the next screen", () => {
    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailLeaveEndedFLI.html")

    cy.get("footer").within(() => {
      cy.checkFeedbackWidgetIsInteractable()
    })
  })

  it("displays the overridden version of the email disclaimer text", () => {
    cy.visit("./cypress/fixtures/claimStatus/paymentDetail/paymentDetailLeaveEndedFLI.html")
    cy.checkFeedbackWidgetEmailDisclaimerTextIsOverridden()
  })
})