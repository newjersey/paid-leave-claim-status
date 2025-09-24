import { globalTestsNew, globalTestsOld } from "../shared";

const PAGE_ID = 'claimantProfileVerification';
const URL = 'ClaimantProfile_IANM';
const FIXTURE = "./cypress/fixtures/claimApplication/claimantProfile/verification.html";

describe("Profile Verification page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hddRET=01&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnDABSClmntID=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnHomeCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnMailCountry=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hdnClearMailAddrFlg=Y&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24PERSONNEL%24hDDsEQ=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerFname=FirstNameTest+LastNameTest&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerDob=01%2F01%2F2000&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerGender=Male&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtRace=Caucasian&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtEdctn=Graduate+Degree&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerOccupation=Timemaster&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeUSAddr1Addr2=111++&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeUSCityStZip=g%2C+NJ+07123-1234+WARREN&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerHomeOOCAddr4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailUSAddr1Addr2=111++&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailUSCityStZip=g%2C+NJ+07123-1234&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerMailOOCAddr4=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerCitznFlg=Yes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerCountryOrigin=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAlienNum=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAuthoStart=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAuthEnd=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel1=222&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel2=111&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTel3=2222&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerTelExt=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTel3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerAltTelExt=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerEmail=time%40time.com&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepName=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepDOB=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel1=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel2=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTel3=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24txtVerRepTelExt=&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24VerConf=rbtnPersYes&ctl00%24ContentPlaceHolder1%24ClaimantProfileTab%24tpnlVerification%24btncontinueVer=Continue');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can confirm info is correct and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_rbtnPersYes').click();
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btncontinueVer').click();
      cy.wait('@aspxSubmission').then(checkPostData);
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
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_rbtnPersYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btncontinueVer').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it('left-aligns all data', () => {
      cy.get('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTel1')
        .should('have.css', 'text-align', 'left');
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
