import { globalTestsNew, globalTestsOld } from "../shared";
import { encodeDecode } from '../../../../src/claimApplication/utils';

const PAGE_ID = 'claimantProfileVerification';
const URL = 'ClaimantProfile_IANM';
const FIXTURE = "./cypress/fixtures/claimApplication/claimantProfile/verification.html";

describe("Profile Verification page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hddRET=01&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnDABSClmntID=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnHomeCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnMailCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnClearMailAddrFlg=Y&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hDDsEQ=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerFname=FirstNameTest+LastNameTest&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerDob=01%2F01%2F2000&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerGender=Male&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtRace=Caucasian&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtEdctn=Graduate+Degree&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerOccupation=Timemaster&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeUSAddr1Addr2=111++&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeUSCityStZip=g%2C+NJ+07123-1234+WARREN&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailUSAddr1Addr2=111++&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailUSCityStZip=g%2C+NJ+07123-1234&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerCitznFlg=Yes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerCountryOrigin=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAlienNum=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAuthoStart=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAuthEnd=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel1=222&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel2=111&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel3=2222&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTelExt=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTelExt=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerEmail=time%40time.com&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepName=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepDOB=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTelExt=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24VerConf=rbtnPersYes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24btncontinueVer=Continue');
  }

  function checkPersonalPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantProfileTab_ClientState=%7B%22ActiveTabIndex%22%3A2%2C%22TabState%22%3A%5Bfalse%2Cfalse%2Ctrue%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hddRET=01&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnDABSClmntID=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnHomeCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnMailCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnClearMailAddrFlg=Y&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hDDsEQ=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerFname=FirstNameTest+LastNameTest&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerDob=01%2F01%2F2000&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24btnEditPersInfo=EDIT&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerGender=Male&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtRace=Caucasian&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtEdctn=Graduate+Degree&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerOccupation=Timemaster&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeUSAddr1Addr2=111++&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeUSCityStZip=g%2C+NJ+07123-1234+WARREN&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailUSAddr1Addr2=111++&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailUSCityStZip=g%2C+NJ+07123-1234&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerCitznFlg=Yes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerCountryOrigin=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAlienNum=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAuthoStart=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAuthEnd=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel1=222&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel2=111&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel3=2222&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTelExt=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTelExt=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerEmail=time%40time.com&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepName=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepDOB=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTelExt=');
  }

  function checkContactInfoData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_ClaimantProfileTab_ClientState=%7B%22ActiveTabIndex%22%3A2%2C%22TabState%22%3A%5Bfalse%2Cfalse%2Ctrue%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hddRET=01&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnDABSClmntID=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnHomeCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnMailCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnClearMailAddrFlg=Y&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hDDsEQ=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerFname=FirstNameTest+LastNameTest&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerDob=01%2F01%2F2000&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerGender=Male&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtRace=Caucasian&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtEdctn=Graduate+Degree&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerOccupation=Timemaster&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeUSAddr1Addr2=111++&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeUSCityStZip=g%2C+NJ+07123-1234+WARREN&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailUSAddr1Addr2=111++&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailUSCityStZip=g%2C+NJ+07123-1234&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24btnEditCitznInfo=EDIT&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerCitznFlg=Yes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerCountryOrigin=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAlienNum=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAuthoStart=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAuthEnd=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel1=222&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel2=111&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel3=2222&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTelExt=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTelExt=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerEmail=time%40time.com&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepName=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepDOB=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTelExt=');
  }

  function checkConfirmInfo(newSubmitButton = false) {
    cy.mockASPX(URL);
    if (newSubmitButton) {
      cy.get('#submitButton').click();
    } else {
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_rbtnPersYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btncontinueVer').click();
    }
    cy.wait('@aspxSubmission').then(checkPostData);
  }

  function checkPersonalEdit() {
    cy.mockASPX(URL);
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btnEditPersInfo').click();
    cy.wait('@aspxSubmission').then(checkPersonalPostData);
  }

  function checkContactEdit() {
    cy.mockASPX(URL);
    cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btnEditCitznInfo').click();
    cy.wait('@aspxSubmission').then(checkContactInfoData);
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can confirm info is correct and proceed to next page", () => {
      checkConfirmInfo();
    });

    it("allows user to edit personal information", () => {
      checkPersonalEdit();
    });

    it("allows user to edit contact information", () => {
      checkContactEdit();
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

    it("user can confirm info is correct and proceed to next page", () => {
      checkConfirmInfo(true);
      cy.window().then((win) => {
        const encodedData = win.sessionStorage.getItem('session_data');
        const data = JSON.parse(encodeDecode(encodedData));
        expect(data).to.deep.equal({
          user_dob: '01/01/2000',
          user_name: 'FirstNameTest LastNameTest',
          user_phone: '(222) 111-2222',
          user_email: 'time@time.com',
          user_mail_address: {
            line1: "111",
            line2: "g, NJ 07123-1234"
          }
        });
      });
    });

    it('left-aligns all data', () => {
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTel1')
        .should('have.css', 'text-align', 'left');
    });

    it("allows user to edit personal information", () => {
      checkPersonalEdit();
    });

    it("allows user to edit contact information", () => {
      checkContactEdit();
    });

    it("has reworded data text", () => {
      cy.get('#divVerRep').then(($div) => {
        $div.css('display', 'block');
      });

      cy.contains('Telephone Number:').should('not.exist');
      cy.contains('Phone:').should('exist');

      cy.contains('Cell Phone Number / Alternate Telephone Number:').should('not.exist');
      cy.contains('Alternate phone:').should('exist');

      cy.contains('E-Mail Address:').should('not.exist');
      cy.contains('Email:').should('exist');

      cy.contains('Representative:').should('not.exist');
      cy.contains("Representative's name:").should('exist');

      cy.contains('Representative Date of Birth').should('not.exist');
      cy.contains("Representative's date of birth:").should('exist');

      cy.contains('Representative Telephone Number:').should('not.exist');
      cy.contains("Representative's phone:").should('exist');
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
