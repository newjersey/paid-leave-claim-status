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
