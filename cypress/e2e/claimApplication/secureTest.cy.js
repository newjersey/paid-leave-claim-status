describe("page without new JS", () => {
  beforeEach(() => {
    cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
    cy.visit("https://securest.dol.state.nj.us/tdi_iam/TDIIntroduction.aspx");
  });

  xit("proceeds through an example user flow", () => {
    // Login page
    cy.get('#idToken1').type('doltest@mailinator.com');
    cy.get('#idToken2').type('Test@123');
    cy.get('#loginButton_0').click();

    // TDI Introduction
    cy.get('#ContentPlaceHolder1_chkAgree', { timeout: 300000 }).check();

    // Profile Info 1
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnPersYes').click();
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btncontinueVer').click();

    // Profile Info 2
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
    
    // Citizenship and Contact Info
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbtnCitizenYes').click();
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtEmail').type('doltest@mailinator.com');
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtConEmail').type('doltest@mailinator.com');
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepNo').click();
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_btnSave').click();

    // Profile Verification
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_rbtnPersYes').click();
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btncontinueVer').click();
    
    // Disability Information
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

    // cy.on('window:confirm', () => {return true;});

    // Medical Treatment Info
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').type('Injury');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocNm').type('Dr. Spaceman');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbnDocAddYes').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocAdd1').type('30 Livingston Avenue');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocCity').type('New Brunswick');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocZip1').type('08901');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnERNO').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnHospNo').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc').click();

    // Other Benefits
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI').click();

    // Payment Information
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_rbtnDisNo').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_btnNextVer').click();

    // Disability Verification
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_rbtnDisabsYes').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_btncontinueVer').click();

    // Employment Information
    cy.get('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_btnEmpCertify').click();
    // cy.on('window:confirm', () => {return true;});

    // Claimant Certification
    cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgYes').click();
    cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_btnConfirm').click();

    // Claimant Confirmation
    cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_btnContinue').click();
  });
});
