const PAGE_ID = 'priorClaimSearch';
const URL = 'TDI_PndClaim_Search';
const FIXTURE = "./cypress/fixtures/claimApplication/priorClaimSearch/priorClaimSearch.html";

describe("Prior Claim Search page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24txtFName=FirstNameTest+LastNameTest&ctl00%24ContentPlaceHolder1%24txtDOB=01%2F01%2F2000&ctl00%24ContentPlaceHolder1%24IANM=rbtnIAMYes&ctl00%24ContentPlaceHolder1%24CheckClm=rbtnClmYes&ctl00%24ContentPlaceHolder1%24hdnNumAttempt=0&ctl00%24ContentPlaceHolder1%24hdnNoData=0&ctl00%24ContentPlaceHolder1%24hdnCheck=&ctl00%24ContentPlaceHolder1%24txtClmID=11111&ctl00%24ContentPlaceHolder1%24btnRetrieve=Proceed+to+Complete+Claim&ctl00%24ContentPlaceHolder1%24gvPndClaims%24ctl02%24FlgCertifyClaim=&ctl00%24ContentPlaceHolder1%24gvPndClaims%24ctl02%24ClmtID=13600&ctl00%24ContentPlaceHolder1%24gvPndClaims%24ctl02%24RSASTATUS=');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can input info and proceed to next page", () => {
      cy.mockASPX(URL);
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
      cy.visit(FIXTURE);
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_rbtnClmYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_txtClmID').type('11111');
      cy.get('#ContentPlaceHolder1_btnRetrieve').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("does not overlap footer and info for no pending claims", () => {
      cy.get('#ContentPlaceHolder1_dvNoData')
      .invoke('attr', 'style')
      .then((style) => {
        const newStyle = style.replace('display: none;', '').replace('display:none;', '');
        cy.get('#ContentPlaceHolder1_dvNoData').invoke('attr', 'style', newStyle);
      });

      cy.get('#ContentPlaceHolder1_rbtnClmNo').click({ force: true});

      cy.get('#ContentPlaceHolder1_dvNoData').should('be.visible');
      cy.get('#helpSection').should('be.visible');
    
      cy.get('#ContentPlaceHolder1_dvNoData').then(($noData) => {
        const noDataBottom = $noData[0].offsetTop + $noData[0].offsetHeight;

        cy.get('#helpSection').then(($helpSection) => {
          const helpSectionTop = $helpSection[0].offsetTop;
          expect(noDataBottom).to.be.lessThan(helpSectionTop);
        });
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

    it('clicks Dismiss on the info alert, alert hides and does not return', () => {
      cy.checkInfoAlertBehavior();
    });
  });
});
