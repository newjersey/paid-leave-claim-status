export const EXAMPLE_PREGNANCY_DETAILS = "hospital birth.";

export const EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY = {
  "reasons": "pregnancy",
  "pregnancy-details": "",
};

export const EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS = {
  "reasons": "illness",
  "illness-details": "",
};

export const EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY = {
  "reasons": "injury",
  "injury-details": "",
};

export const EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY_DETAILS = {
  "reasons": "pregnancy",
  "pregnancy-details": "Emergency C-section.",
};

export const EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS_DETAILS = {
  "reasons": "illness",
  "illness-details": "Lung Inflammation.",
};

export const EXAMPLE_REASON_FOR_LEAVE_DATA_INJURY_DETAILS = {
  "reasons": "injury",
  "injury-details": "Broken Elbow.",
};

export function globalTestsOld(url) {
  it("user can log out", () => {
    cy.mockASPX(url);
    cy.checkOldLogout();
  });

  it("user can cancel logging out", () => {
    cy.mockASPX(url);
    cy.checkOldLogoutCancel();
  });

  it('should open FAQ and post data when the Help link is clicked', () => {
    cy.checkHelpButtonBehavior();
  });
}

export function globalTestsNew(pageId, url) {
  it("feedback widget is visible", () => {
    cy.checkFeedbackWidgetIsRendered();
    // TODO: determine why cy.checkFeedbackWidgetIsInteractable() 
    // and cy.checkFeedbackWidgetEmailDisclaimerTextIsOverridden()
    // fail and test those as well
  });

  it("applies the new font family", () => {
    cy.checkFontFamily();
  });

  it("passes accessibility checks", () => {
    cy.checkBodyA11y();
  });

  it("tracks the page view", () => {
    cy.trackPageView(pageId);
  });

  it('should open Resources and track when clicked', () => {
    cy.trackResourcesClick(pageId);
  });

  it('info alert is not present', () => {
    cy.checkInfoAlertBehavior();
  });

  it("user can log out", () => {
    cy.mockASPX(url);
    cy.checkNewLogout();
  });

  it("user can cancel logging out", () => {
    cy.mockASPX(url);
    cy.checkNewLogoutCancel();
  });
}
