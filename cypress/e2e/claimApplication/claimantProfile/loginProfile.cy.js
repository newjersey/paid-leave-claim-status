const PAGE_ID = 'loginProfile';
const URL = 'IAM_Login_Profile';
const FIXTURE = "./cypress/fixtures/claimApplication/claimantProfile/login.html";

describe("Login Profile page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hClmtName=0&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtConfSSN1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtConfSSN2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtConfSSN3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24VerConf=rbtnPersYes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24btncontinueVer=Continue');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can confirm info is correct and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnPersYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btncontinueVer').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("user can log out", () => {
      cy.mockASPX(URL);
      cy.checkOldLogout();
    });

    it('should open FAQ and post data when the Help link is clicked', () => {
      cy.checkHelpButtonBehavior();
    });
  });

  describe("page with lazy loading header and new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit("./cypress/fixtures/claimApplication/claimantProfile/loginLazyHeader.html");
      cy.wait('@script');
    });

    it("hides old tabs and shows new title", () => {
      cy.get('.ajax__tab_header').should('not.exist');
      cy.wait(1000);
      cy.get('.ajax__tab_header').should('exist');
      cy.get('.ajax__tab_header').should("not.be.visible");
      cy.get('h1').contains('Profile Information').should('be.visible');
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

    it("user can confirm info is correct and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnPersYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btncontinueVer').click();
      cy.wait('@aspxSubmission').then(checkPostData);
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

    it("user can log out", () => {
      cy.mockASPX(URL);
      cy.checkNewLogout();
    });

    it('should open Resources and track when clicked', () => {
      cy.trackResourcesClick(PAGE_ID);
    });
  });
});
