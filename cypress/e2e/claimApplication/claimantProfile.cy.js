describe("Claimant Profile page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    expect(formData).to.include('__EVENTTARGET=');
    expect(formData).to.include('__EVENTARGUMENT=');
    expect(formData).to.match(/__VIEWSTATE=[^&]+/);
    expect(formData).to.match(/__VIEWSTATEGENERATOR=[^&]+/);
    expect(formData).to.match(/__EVENTVALIDATION=[^&]+/);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hddRET=01');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtFName=FirstNameTest+LastNameTest');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtDOB=01%2F01%2F2000');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24IANM=rbtnIAMYes');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24gGender=rbtnMale');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlRace=1');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtoccupation=Worker');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ResUSA=rbnResUSAYes');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtAddress1=30+Livingston+Avenue');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtCity=New+Brunswick');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlStates=34');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtZipCode1=08901');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24mailing=rbtnMailingYes');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24btnCitiZen=Continue');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimantProfile_IANM.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantProfile/TDI.html");
    });

    it("user can fill in info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMale').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlRace').select('Caucasian');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlEdctn').select('Have not graduated high school');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtoccupation').type('Worker');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbnResUSAYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtAddress1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtZipCode1').type('08901');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlCounties').select('MIDDLESEX');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMailingYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btnCitiZen').click();
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
      cy.visit("./cypress/fixtures/claimApplication/claimantProfile/TDI.html");
      cy.wait('@script');
    });

    it("user can fill in info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMale').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlRace').select('Caucasian');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlEdctn').select('Have not graduated high school');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtoccupation').type('Worker');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbnResUSAYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtAddress1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtZipCode1').type('08901');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlCounties').select('MIDDLESEX');
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMailingYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btnCitiZen').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("invisible link is hidden from screen readers", () => {
      cy.get('#lnkFake').should('exist').should('have.attr', 'aria-hidden', 'true');
    });
  });
});
