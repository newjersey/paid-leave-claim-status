describe("Citizenship page", () => {
  function checkPostData(interception) {
  const formData = interception.request.body;
  expect(formData).to.include('__EVENTTARGET=');
  expect(formData).to.include('__EVENTARGUMENT=');
  expect(formData).to.match(/__VIEWSTATE=[^&]+/);
  expect(formData).to.match(/__VIEWSTATEGENERATOR=[^&]+/);
  expect(formData).to.match(/__EVENTVALIDATION=[^&]+/);
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtFName=FirstNameTest+LastNameTest');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtDOB=01%2F01%2F2000');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24IANM=rbtnIAMYes');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24gGender=rbtnMale');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlRace=1');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlEdctn=4');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtoccupation=Timemaster');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtAddress1=111');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtCity=g');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlStates=34');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtZipCode1=07123');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtZipCode2=1234');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24mailing=rbtnMailingYes');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24Citizen=rbtnCitizenYes');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24TxtEmail=doltest%40mailinator.com');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24TxtConEmail=doltest%40mailinator.com');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24CtznRep=rbnRepNo');
  expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24btnSave=Continue');
}

  function mockASPX() {
    cy.intercept('POST', '**/ClaimantProfile_IANM.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantProfile/citizenship.html");
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbtnCitizenYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtEmail').type('doltest@mailinator.com');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtConEmail').type('doltest@mailinator.com');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_btnSave').click();
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
      cy.visit("./cypress/fixtures/claimApplication/claimantProfile/citizenship.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbtnCitizenYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtEmail').type('doltest@mailinator.com');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtConEmail').type('doltest@mailinator.com');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepNo').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_btnSave').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("invisible link is hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('have.attr', 'aria-hidden', 'true');
    });
  });
});
