describe("Citizenship page", () => {
  function checkPostData(interception) {
  const formData = interception.request.body;
  expect(formData).to.include('__EVENTTARGET=');
  expect(formData).to.include('__EVENTARGUMENT=');
  expect(formData).to.match(/__VIEWSTATE=[^&]+/);
  expect(formData).to.match(/__VIEWSTATEGENERATOR=[^&]+/);
  expect(formData).to.match(/__EVENTVALIDATION=[^&]+/);
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDisStartDt=07%2F18%2F2025');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtDtLastWorkd=07%2F17%2F2025');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24rbRec=rbtnRecNo');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24txtExpectedReturnedDtToWrk=08%2F17%2F2025');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantDisabilityTab%24Dis1%24btnSubmitConflictCheck=Continue');
}

  function mockASPX() {
    cy.intercept('POST', '**/ClaimantDisabililty.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/disability/information.html");
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      const currentDate = new Date();
      const tenDaysAgo = new Date(currentDate);
      tenDaysAgo.setDate(currentDate.getDate() - 10);
      const formattedTenDaysAgo = (
        (tenDaysAgo.getMonth() + 1).toString().padStart(2, '0') + '/' +
        tenDaysAgo.getDate().toString().padStart(2, '0') + '/' +
        tenDaysAgo.getFullYear()
      );
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt').type(formattedTenDaysAgo);

      const elevenDaysAgo = new Date(currentDate);
      elevenDaysAgo.setDate(currentDate.getDate() - 11);
      const formattedElevenDaysAgo = (
        (elevenDaysAgo.getMonth() + 1).toString().padStart(2, '0') + '/' +
        elevenDaysAgo.getDate().toString().padStart(2, '0') + '/' +
        elevenDaysAgo.getFullYear()
      );
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd').type(formattedElevenDaysAgo);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo').click();

      const twentyDaysFromNow = new Date(currentDate);
      twentyDaysFromNow.setDate(currentDate.getDate() + 20);
      const formattedTwentyDaysFromNow = (
        (twentyDaysFromNow.getMonth() + 1).toString().padStart(2, '0') + '/' +
        twentyDaysFromNow.getDate().toString().padStart(2, '0') + '/' +
        twentyDaysFromNow.getFullYear()
      );
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk').type(formattedTwentyDaysFromNow);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_btnSubmitConflictCheck').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("invisible link is not hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('not.have.attr', 'aria-hidden');
    });
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit("./cypress/fixtures/claimApplication/disability/information.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      const currentDate = new Date();
      const tenDaysAgo = new Date(currentDate);
      tenDaysAgo.setDate(currentDate.getDate() - 10);
      const formattedTenDaysAgo = (
        (tenDaysAgo.getMonth() + 1).toString().padStart(2, '0') + '/' +
        tenDaysAgo.getDate().toString().padStart(2, '0') + '/' +
        tenDaysAgo.getFullYear()
      );
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt').type(formattedTenDaysAgo);

      const elevenDaysAgo = new Date(currentDate);
      elevenDaysAgo.setDate(currentDate.getDate() - 11);
      const formattedElevenDaysAgo = (
        (elevenDaysAgo.getMonth() + 1).toString().padStart(2, '0') + '/' +
        elevenDaysAgo.getDate().toString().padStart(2, '0') + '/' +
        elevenDaysAgo.getFullYear()
      );
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd').type(formattedElevenDaysAgo);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo').click();

      const twentyDaysFromNow = new Date(currentDate);
      twentyDaysFromNow.setDate(currentDate.getDate() + 20);
      const formattedTwentyDaysFromNow = (
        (twentyDaysFromNow.getMonth() + 1).toString().padStart(2, '0') + '/' +
        twentyDaysFromNow.getDate().toString().padStart(2, '0') + '/' +
        twentyDaysFromNow.getFullYear()
      );
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk').type(formattedTwentyDaysFromNow);
      cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_btnSubmitConflictCheck').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("invisible link is hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('have.attr', 'aria-hidden', 'true');
    });
  });
});
