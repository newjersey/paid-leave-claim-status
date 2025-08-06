describe("Introduction page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=ctl00%24ContentPlaceHolder1%24chkAgree');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24chkAgree=on');
  }

  function mockASPX() {
    cy.intercept('POST', '**/TDIIntroduction.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");
    });

    it("agrees to terms and checks POST data", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_chkAgree').check();
      cy.wait('@aspxSubmission').then(checkPostData);
    });
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit("./cypress/fixtures/claimApplication/tdiIntroduction/tdiIntroduction.html");
      cy.wait('@script');
    });

    it("agrees to terms and checks POST data", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_chkAgree').check();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });

    it("tracks the page view", () => {
      cy.window().then((win) => {
        const pageId = 'tdiIntroduction';
        const loggedEvent = win.loggedEvents.find(event => event.name === `${pageId} viewed`);
        expect(loggedEvent.parameters).to.deep.equal({});
      });
    });
  });
});
