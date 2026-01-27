const PAGE_ID = 'tdiIntroduction';
const URL = 'TDIIntroduction';
const FIXTURE = "./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html";

describe("Introduction page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=ctl00%24ContentPlaceHolder1%24chkAgree');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24chkAgree=on');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("agrees to terms and checks POST data", () => {
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

    it("agrees to terms and checks POST data", () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem('session_data', 'testValue');
      });
      cy.visit(FIXTURE);
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_chkAgree').check();
      cy.wait('@aspxSubmission').then(checkPostData);
      cy.window().then((win) => {
        expect(win.sessionStorage.length).to.equal(0);
      });
    });
    
    it("applies the new font family", () => {
      cy.checkFontFamily();
    });

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });

    it("tracks the page view", () => {
      cy.trackPageView(PAGE_ID);
    });

    it('should open Resources and track when clicked', () => {
      cy.trackResourcesClick(PAGE_ID);
    });

    it('info alert is not present', () => {
      cy.checkInfoAlertBehavior();
    });
  });
});
