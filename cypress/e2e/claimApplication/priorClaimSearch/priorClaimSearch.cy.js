const PAGE_ID = 'priorClaimSearch';

describe("Prior Claim Search page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24txtFName=FirstNameTest+LastNameTest&ctl00%24ContentPlaceHolder1%24txtDOB=01%2F01%2F2000&ctl00%24ContentPlaceHolder1%24IANM=rbtnIAMYes&ctl00%24ContentPlaceHolder1%24CheckClm=rbtnClmYes&ctl00%24ContentPlaceHolder1%24hdnNumAttempt=0&ctl00%24ContentPlaceHolder1%24hdnNoData=0&ctl00%24ContentPlaceHolder1%24hdnCheck=&ctl00%24ContentPlaceHolder1%24txtClmID=11111&ctl00%24ContentPlaceHolder1%24btnRetrieve=Proceed+to+Complete+Claim&ctl00%24ContentPlaceHolder1%24gvPndClaims%24ctl02%24FlgCertifyClaim=&ctl00%24ContentPlaceHolder1%24gvPndClaims%24ctl02%24ClmtID=13600&ctl00%24ContentPlaceHolder1%24gvPndClaims%24ctl02%24RSASTATUS=');
  }

  function mockASPX() {
    cy.intercept('POST', '**/TDI_PndClaim_Search.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/priorClaimSearch/priorClaimSearch.html");
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_rbtnClmYes').click();
      cy.get('#ContentPlaceHolder1_txtClmID').type('11111');
      cy.get('#ContentPlaceHolder1_btnRetrieve').click();
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
      cy.visit("./cypress/fixtures/claimApplication/priorClaimSearch/priorClaimSearch.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_rbtnClmYes').click();
      cy.get('#ContentPlaceHolder1_txtClmID').type('11111');
      cy.get('#ContentPlaceHolder1_btnRetrieve').click();
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

    it('should open FAQ, post data, and track when the Help link is clicked', () => {
      cy.checkHelpButtonBehavior();
      cy.trackHelpClick(PAGE_ID);
    });
  });
});
