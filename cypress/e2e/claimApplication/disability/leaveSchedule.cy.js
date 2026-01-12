import {
  globalTestsNew,
  globalTestsOld
} from "../shared";

const PAGE_ID = 'disabilityInformation';
const URL = 'ClaimantDisabililty';
const FIXTURE = "./cypress/fixtures/claimApplication/disability/information.html";

describe("Disability Information page", () => {
  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    globalTestsOld(URL);
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit(FIXTURE);
      cy.wait('@script');
    });

    it("navigates to Leave Schedule page when user affirms that their FDD is correct", () => {
      cy.mockASPX(URL);
      cy.get('#reason-pregnancy').click({ force: true });
      cy.get('#submitReasonForLeave').click();
      cy.get('#fddFieldset').should('be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbConfFDDYes').click({ force: true });
      cy.get('#reasonForLeavePage').should('not.exist')
      cy.get('#divLDW').should('be.visible');
    });

    globalTestsNew(PAGE_ID, URL);
  });


});
