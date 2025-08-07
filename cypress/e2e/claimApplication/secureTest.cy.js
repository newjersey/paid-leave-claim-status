describe("Claim Application on Secure Test environment", () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (_err, _runnable) => { return false; });
    cy.visit("https://securest.dol.state.nj.us/tdi_iam/TDIIntroduction.aspx");
  });

  it("proceeds through an example user flow", () => {
    // Login page
    cy.get('#idToken1').type('johnsmith2205@mailinator.com');
    cy.get('#idToken2').type('Test@123');
    cy.get('#loginButton_0').click();

    // TDI Introduction
    cy.get('#ContentPlaceHolder1_chkAgree', { timeout: 3000000 }).check();

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
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtEmail').type('johnsmith2205@mailinator.com');
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtConEmail').type('johnsmith2205@mailinator.com');
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepNo').click();
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_btnSave').click();

    // Profile Verification
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_rbtnPersYes').click();
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btncontinueVer').click();
    
    // Disability Information
    // Note: expiration logic here is unclear. these dates may eventually need to be made later.
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt').type("08/03/2024");
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd').type("08/01/2024");
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk').type("08/05/2024");
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_btnSubmitConflictCheck').click();

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
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_lpayReason').type('Waited.');
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_btnNextVer').click();

    // Disability Verification
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_rbtnDisabsYes').click();
    cy.get('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_btncontinueVer').click();

    // Employment Information
    cy.get('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_btnEmpCertify').click();

    // TODO: unable to fully test on ST unless we have an account where we can repeatedly apply

    // Claimant Certification
    cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgNo').should('be.visible');
    cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgYes').should('be.visible');
    cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_btnConfirm').should('be.visible');

    // Claimant Confirmation
    // cy.get('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_btnContinue').click();
  });
});
