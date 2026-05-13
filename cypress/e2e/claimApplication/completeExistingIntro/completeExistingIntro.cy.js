import { globalTestsNew } from "../shared";

const PAGE_ID = 'completeExistingIntro';
const URL = 'TDI_PndClaim_Intro';
const FIXTURE = "./cypress/fixtures/claimApplication/completeExistingIntro/completeExistingIntro.html";

describe("Complete Existing Intro page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=ctl00%24ContentPlaceHolder1%24chkAgree&__EVENTARGUMENT=&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24chkAgree=on');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can input info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_chkAgree').check();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it('should open FAQ and post data when the Help link is clicked', () => {
      cy.checkHelpButtonBehavior();
    });
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

    afterEach(() => {
      cy.checkBodyA11y(true);
    });

    it("user can input info and proceed to next page", () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem('session_data', 'testValue');
      });
      cy.visit(FIXTURE);
      cy.mockASPX(URL);
      cy.get('#getStartedButton').click();
      cy.wait('@aspxSubmission').then(checkPostData);
      cy.window().then((win) => {
        expect(win.sessionStorage.length).to.equal(0);
      });
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
