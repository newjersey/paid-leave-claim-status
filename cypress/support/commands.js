// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("checkBodyA11y", () => {
  cy.injectAxe();

  // Assert
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

Cypress.Commands.add("checkHelpButtonBehavior", () => {
  cy.window().then(win => {
    cy.stub(win, 'openFAQWindow').as('openFAQWindowStub');
    cy.stub(win, '__doPostBack').as('doPostBackStub');
  });
  cy.get('#header_lbtnShowFAQ').click();
  cy.get('@openFAQWindowStub').should('be.calledWithMatch', 'http://lwd.dol.state.nj.us/labor/tdi/content/webapplicationfaq.html');
  cy.get('@doPostBackStub').should('be.calledWith', 'ctl00$header$lbtnShowFAQ', '');
});

Cypress.Commands.add("checkFeedbackWidgetIsRendered", () => {
    cy.get("feedback-widget").should('have.length', 1)
    cy.get("feedback-widget").within(() => {
        cy.contains("Did you find what you were looking for on this page?").should('be.visible');
    })
})

Cypress.Commands.add("checkFeedbackWidgetIsInteractable", () => {
    const commentScreenTextMatcher = /what ideas come to mind/i
    cy.intercept('POST', '**/rating', { message: "Success", feedbackId: "1"})
      .as("postRating")

    cy.get("feedback-widget").within(() => {
      cy.contains(commentScreenTextMatcher).should('not.be.visible')
    })

    cy.get("feedback-widget")
      .contains("button", /yes/i)
      .click()

    cy.wait("@postRating")
      .its('request.body')
      .should('have.property', 'rating', true)
    
    cy.get("feedback-widget").within(() => {
      cy.contains(commentScreenTextMatcher).should('be.visible')
  })
})