describe("Claim Detail page - Ineligible scenario with Blank claim notes", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleBlank.html");

    cy.checkIneligibleCore();
    cy.contains(
      "Claim for Temporary Disability Insurance (TDI), starting August 1, 2023"
    ).should("be.visible");
    cy.contains("Denied").should("be.visible");
    cy.contains(
      "Your claim for benefits is currently denied. Check your mail for a denial letter, which includes more details about why you were denied, and how to appeal."
    ).should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleBlank.html");
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page - Ineligible scenario with C10 missing", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleC10.html");

    cy.checkIneligibleCore();
    cy.contains(
      "Claim for Temporary Disability Insurance (TDI), starting August 1, 2023"
    ).should("be.visible");
    cy.contains("Denied").should("be.visible");
    cy.contains(
      "We didn't receive your claimant information (Form C10) requested during our review."
    ).should("be.visible");
    cy.get("li")
      .contains(
        "You can also look for the Request for Claimant Information (C10) sent earlier."
      )
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleC10.html");
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page - Ineligible scenario with M10 missing", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleM10.html");

    cy.checkIneligibleCore();
    cy.contains(
      "Claim for Temporary Disability Insurance (TDI), starting August 1, 2023"
    ).should("be.visible");
    cy.contains("Denied").should("be.visible");
    cy.contains(
      "We didn't receive your medical information (Form M10 or M20) requested during our review."
    ).should("be.visible");
    cy.get("li")
      .contains(
        "You can also look for the Request for Medical Information (M10 or M20), sent earlier."
      )
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleM10.html");
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page - Ineligible scenario with C10 and M10 missing", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleC10M10.html");

    cy.checkIneligibleCore();
    cy.contains(
      "Claim for Temporary Disability Insurance (TDI), starting August 1, 2023"
    ).should("be.visible");
    cy.contains("Denied").should("be.visible");
    cy.contains(
      "We didn't receive claimant information (Form C10) and medical information (Form M10 or M20) requested during our review."
    ).should("be.visible");
    cy.get("li")
      .contains(
        "You can also look for the Request for Medical Information (M10 or M20) and Request for Claimant Information (C10) sent earlier."
      )
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleC10M10.html");
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page - Ineligible scenario for DDU", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleDDU.html");

    cy.checkIneligibleCore();
    cy.contains(
      "Claim for Temporary Disability Insurance (TDI), starting August 1, 2023"
    ).should("be.visible");
    cy.contains("Transferred to Disability During Unemployment team").should(
      "be.visible"
    );
    cy.contains(
      "Your claim was sent to our Disability During Unemployment team for review."
    ).should("be.visible");
    cy.get("a").contains("Disability During Unemployment").should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleDDU.html");
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page - Ineligible scenario for FLDU", () => {
  it("renders with updated content", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleFLDU.html");

    cy.checkIneligibleCore();
    cy.contains(
      "Claim for Family Leave Insurance (FLI), starting August 1, 2023"
    ).should("be.visible");
    cy.contains("Transferred to Family Leave During Unemployment team").should(
      "be.visible"
    );
    cy.contains(
      "Your claim was sent to our Family Leave During Unemployment team for review."
    ).should("be.visible");
    cy.get("a")
      .contains("Family Leave During Unemployment")
      .should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit("./cypress/fixtures/claimDetail/claimDetailIneligibleFLDU.html");
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page -  Ineligible scenario due to invalid wage (2010)", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailIneligibleInvalidWage2007.html"
    );

    cy.checkIneligibleCore();
    cy.contains(
      "Claim for Temporary Disability Insurance (TDI), starting August 1, 2023"
    ).should("be.visible");
    cy.contains("Denied").should("be.visible");
    cy.contains(
      "It looks like you didn't meet the wage requirement to qualify for benefits."
    ).should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailIneligibleInvalidWage2007.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page - Ineligible scenario due to invalid wage (2010)", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailIneligibleInvalidWage2010.html"
    );

    cy.checkIneligibleCore();
    cy.contains(
      "Claim for Temporary Disability Insurance (TDI), starting August 1, 2023"
    ).should("be.visible");
    cy.contains("Denied").should("be.visible");
    cy.contains(
      "It looks like you didn't meet the wage requirement to qualify for benefits."
    ).should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailIneligibleInvalidWage2010.html"
    );
    cy.checkBodyA11y();
  });
});

describe("Claim Detail page - Ineligible scenario due to private plan", () => {
  it("renders with updated content", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailIneligiblePrivatePlan.html"
    );

    cy.checkIneligibleCore();
    cy.contains(
      "Claim for Temporary Disability Insurance (TDI), starting August 1, 2023"
    ).should("be.visible");
    cy.contains("Denied").should("be.visible");
    cy.contains(
      "Your employer has a private plan, so you don't qualify for State benefits. You may be eligible through your employer."
    ).should("be.visible");
  });

  it("passes accessibility checks", () => {
    cy.visit(
      "./cypress/fixtures/claimDetail/claimDetailIneligiblePrivatePlan.html"
    );
    cy.checkBodyA11y();
  });
});
