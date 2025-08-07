describe("Citizenship page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hddRET=01&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnDABSClmntID=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtFName=FirstNameTest+LastNameTest&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtDOB=01%2F01%2F2000&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24IANM=rbtnIAMYes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24gGender=rbtnMale&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlRace=1&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlEdctn=4&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtoccupation=Timemaster&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnHomeCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnMailCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnClearMailAddrFlg=Y&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ResUSA=rbnResUSAYes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtAddress1=111&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtAddress2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtCity=g&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlStates=34&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtZipCode1=07123&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtZipCode2=1234&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtOOCHZipCode=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlCounties=75&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtOOCHomeAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtOOCHomeAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtOOCHomeAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtOOCHomeAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24mailing=rbtnMailingYes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hDDsEQ=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24Citizen=rbtnCitizenYes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24ddlCountryCitizen=0&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtAlienNo=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtAuthDate=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtAuthEndDate=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtContactNum=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtContactNum2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtContactNum3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtContactNum4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtContactAltNum=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtContactAltNum2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtContactAltNum3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtContactAltNum4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24TxtEmail=doltest%40mailinator.com&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24TxtConEmail=doltest%40mailinator.com&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24CtznRep=rbnRepNo&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtRepIns=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtRepDOB=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtRepTelephone=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtRepTelephone2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtRepTelephone3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24txtRepTelephone4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlCitizen%24btnSave=Continue');
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

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });

    it("tracks the page view", () => {
      cy.trackPageView('citizenship');
    });
  });
});
