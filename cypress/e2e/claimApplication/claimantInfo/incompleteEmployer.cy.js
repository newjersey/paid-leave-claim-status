import { globalTestsNew, globalTestsOld } from "../shared";

const PAGE_ID = 'incompleteEmployer';
const URL = 'ClaimentEmployment';
const FIXTURE = "./cypress/fixtures/claimApplication/incompleteEmployer/incompleteEmployer.html";

describe("Incomplete Employer page", () => {
  function checkPostDataYes(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Btrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnFDDate=5%2F13%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=05%2F11%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2023&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=5%2F12%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl03%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24rdoWrkEmp=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=00000&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=1&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=666&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=555&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=6666&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=05%2F01%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=05%2F05%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24btnNextEmpDet=Continue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=');
  }

  function checkPostDataNo(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Btrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnFDDate=5%2F13%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=05%2F11%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2023&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=5%2F12%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl03%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24rdoWrkEmp=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=00000&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=1&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=666&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=555&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=6666&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24btnNextEmpDet=Continue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=');
  }

  function checkYes() {
    cy.mockASPX(URL);
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type("05/01/2024");
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type("05/05/2024");
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
    cy.wait('@aspxSubmission').then(checkPostDataYes);
  }

  function checkNo() {
    cy.mockASPX(URL);
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });
    cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
    cy.wait('@aspxSubmission').then(checkPostDataNo);
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can input employer info and proceed to next page", () => {
      checkYes();
    });

    it("user can say they did not work for employer", () => {
      checkNo();
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

    it("user can input employer info and proceed to next page", () => {
      checkYes();
    });

    it("user can say they did not work for employer", () => {
      checkNo();
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
