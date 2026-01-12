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

    it("sets disabilityInfoView to leaveSchedule when user selects YES on FDD confirmation", () => {
      cy.mockASPX(URL);
      cy.get('#reason-pregnancy').click({ force: true });
      cy.get('#submitReasonForLeave').click();
      cy.get('#fddFieldset').should('be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbConfFDDYes').click({ force: true });
      cy.window().then(win => {
        expect(win.sessionStorage.getItem('disabilityInfoView')).to.eq('leaveSchedule')
      });
    });

    it("sets disabilityInfoView to leaveSchedule when user selects NO on FDD confirmation", () => {
      cy.mockASPX(URL);
      cy.get('#reason-pregnancy').click({ force: true });
      cy.get('#submitReasonForLeave').click();
      cy.get('#fddFieldset').should('be.visible');
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbConfFDDNo').click({ force: true });
      cy.window().then(win => {
        expect(win.sessionStorage.getItem('disabilityInfoView')).to.eq('leaveSchedule')
      });
    });

    globalTestsNew(PAGE_ID, URL);
  });


});
