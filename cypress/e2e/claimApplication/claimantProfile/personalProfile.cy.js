import { globalTestsNew, globalTestsOld } from "../shared";

const PAGE_ID = 'personalProfile';
const URL = 'ClaimantProfile_IANM';
const FIXTURE = "./cypress/fixtures/claimApplication/claimantProfile/personal.html";

describe("Claimant Personal Profile page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hddRET=01&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnDABSClmntID=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtFName=FirstNameTest+LastNameTest&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtDOB=01%2F01%2F2000&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24IANM=rbtnIAMYes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24gGender=rbtnMale&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlRace=1&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlEdctn=1&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtoccupation=Worker&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnHomeCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnMailCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnClearMailAddrFlg=Y&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ResUSA=rbnResUSAYes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtAddress1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtAddress2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlStates=34&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtZipCode1=08901&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtZipCode2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtOOCHZipCode=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlCounties=66&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24ddlCountry=0&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtOOCHomeAdd1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtOOCHomeAdd2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtOOCHomeAdd3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24txtOOCHomeAdd4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24mailing=rbtnMailingYes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24btnCitiZen=Continue&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hDDsEQ=');
  }

  function checkForm() {
    cy.mockASPX(URL);
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMale').click({ force: true });
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlRace').select('Caucasian');
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlEdctn').select('Have not graduated high school');
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtoccupation').type('Worker');
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbnResUSAYes').click({ force: true });
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtAddress1').type('30 Livingston Avenue');
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtCity').type('New Brunswick');
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtZipCode1').type('08901');
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlCounties').select('MIDDLESEX');
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMailingYes').click({ force: true });
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btnCitiZen').click();
    cy.wait('@aspxSubmission').then(checkPostData);
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can fill in info and proceed to next page", () => {
      checkForm();
    });

    globalTestsOld(URL);
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

    it("user can fill in info and proceed to next page", () => {
      checkForm();
      cy.window().then((win) => {
        expect(win.localStorage.getItem('user_dob')).to.equal('01/01/2000');
        expect(win.localStorage.getItem('user_name')).to.equal('FirstNameTest LastNameTest');
      });
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
