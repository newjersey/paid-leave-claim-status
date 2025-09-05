Cypress.Commands.add("checkBodyA11y", () => {
  cy.injectAxe();

  cy.checkA11y("body", {
    rules: {
      region: { enabled: false }, // Disable rule because can't control top-level elements easily
    },
  });
});

Cypress.Commands.add("checkIneligibleCore", () => {
  cy.contains("Ineligible").should("not.exist"); // Rendered on original HTML, without script change

  cy.get("h1").contains("Status").should("be.visible");
  cy.contains("leave starting August 1, 2023").should("be.visible");
  cy.contains("JENNI MAHLSTEDT").should("be.visible");
  cy.get(".complete.received").contains("August 7, 2023").should("be.visible");
  cy.get(".complete").contains("Review").should("be.visible");
  cy.get(".complete.end").contains("Decision").should("be.visible");
});

Cypress.Commands.add("checkCommonPostData", (formData) => {
  expect(formData).to.include('__EVENTTARGET=');
  expect(formData).to.include('__EVENTARGUMENT=');
  expect(formData).to.match(/__VIEWSTATE=[^&]+/);
  expect(formData).to.match(/__VIEWSTATEGENERATOR=[^&]+/);
  expect(formData).to.match(/__EVENTVALIDATION=[^&]+/);
});

Cypress.Commands.add("checkFontFamily", () => {
  cy.get('p').should('have.css', 'font-family')
    .then(fontFamily => {
      expect(fontFamily).to.contain('"Public Sans", sans-serif');
    });
});

Cypress.Commands.add("confirmEventIsNotTracked", (name) => {
  cy.window().then((win) => {
    const events = JSON.parse(win.localStorage.getItem('loggedEvents')) || [];
    const loggedEvent = events.find(event => event.name === name);
    expect(loggedEvent).to.be.undefined;
  });
});

Cypress.Commands.add("checkLogEvent", (name, parameters) => {
  cy.window().then((win) => {
    const events = JSON.parse(win.localStorage.getItem('loggedEvents')) || [];
    const loggedEvent = events.find(event => event.name === name);
    expect(loggedEvent.parameters).to.deep.equal(parameters);
  });
});

Cypress.Commands.add("trackPageView", (pageId) => {
  cy.checkLogEvent(`${pageId} viewed`, {});
});

Cypress.Commands.add("trackHelpClick", (pageId) => {
  cy.checkLogEvent(`Help Clicked`, { pageId });
});

Cypress.Commands.add("trackResourcesClick", (pageId) => {
  cy.checkLogEvent(`Resources Clicked`, { pageId });
});

function checkHelpBehavior(buttonSelector) {
  cy.window().then(win => {
    cy.stub(win, 'openFAQWindow').as('openFAQWindowStub');
    cy.stub(win, '__doPostBack').as('doPostBackStub');
  });
  cy.get(buttonSelector).click();
  cy.get('@openFAQWindowStub').should('be.calledWithMatch', 'http://lwd.dol.state.nj.us/labor/tdi/content/webapplicationfaq.html');
  cy.get('@doPostBackStub').should('be.calledWith', 'ctl00$header$lbtnShowFAQ', '');
}

Cypress.Commands.add("checkHelpButtonBehavior", () => {
  checkHelpBehavior('#header_lbtnShowFAQ');
});

Cypress.Commands.add("checkInfoAlertBehavior", () => {
  cy.get('#info-alert').should('be.visible');
  cy.get('#dismiss-alert').click();
  cy.get('#info-alert').should('not.be.visible');
  cy.reload();
  cy.get('#info-alert').should('not.exist');
});

function checkLogoutData(interception) {
  const formData = interception.request.body;
  expect(formData).to.include('__EVENTTARGET=ctl00%24header%24lbtnLogout');
}

Cypress.Commands.add("checkOldLogout", () => {
  cy.get('#header_lbtnLogout').click();
  cy.wait('@aspxSubmission').then(checkLogoutData);
});

Cypress.Commands.add("checkOldLogoutCancel", () => {
  cy.on('window:confirm', () => false);
  cy.get('#header_lbtnLogout').click();
  cy.get('@aspxSubmission').should('not.exist');
});

Cypress.Commands.add("checkNewLogout", () => {
  cy.get('#logoutButton').click();
  cy.wait('@aspxSubmission').then(checkLogoutData);
});

Cypress.Commands.add("checkNewLogoutCancel", () => {
  cy.on('window:confirm', () => false);
  cy.get('#logoutButton').click();
  cy.get('@aspxSubmission').should('not.exist');
});
