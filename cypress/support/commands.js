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

  cy.get(".complete.received").contains("August 7, 2023").should("be.visible");
  cy.get(".complete").contains("Review").should("be.visible");
  cy.get(".complete.end").contains("Decision").should("be.visible");
});
