export const EXAMPLE_REASON_FOR_LEAVE_DATA_PREGNANCY = {
  "reasons":"pregnancy",
  "pregnancy-details": "emergency C-section",
  "provider-type-eligible":"yes",
  "provider-name":"Dr. Spaceman",
  "provider-mailing-address-1":"30 Livingston Avenue",
  "provider-mailing-address-2":"",
  "provider-city":"New Brunswick",
  "provider-state":"NJ",
  "provider-zip":"08901",
  "provider-phone":"609-292-7060",
};

export const EXAMPLE_REASON_FOR_LEAVE_DATA_ILLNESS = {
  "reasons":"illness",
  "illness-details": "inflammation in lungs",
  "provider-type-eligible":"yes",
  "provider-name":"Dr. Spaceman",
  "provider-mailing-address-1":"30 Livingston Avenue",
  "provider-mailing-address-2":"",
  "provider-city":"New Brunswick",
  "provider-state":"NJ",
  "provider-zip":"08901",
  "provider-phone":"609-292-7060",
  "caused-by-job":"no",
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

  it('clicks Dismiss on the info alert, alert hides and does not return', () => {
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
