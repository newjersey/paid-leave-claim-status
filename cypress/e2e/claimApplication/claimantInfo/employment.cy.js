import { globalTestsNew, globalTestsOld } from "../shared";

const PAGE_ID = 'employment';
const URL = 'ClaimentEmployment';
const FIXTURE = "./cypress/fixtures/claimApplication/claimantInfo/employment.html";

describe("Employment Info page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A0%2C%22TabState%22%3A%5Btrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnFDDate=5%2F24%2F2025&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=05%2F21%2F2025&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=5%2F23%2F2025&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24btnEmpCertify=Confirmation&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=');
  }

  function checkConfirm() {
    cy.mockASPX(URL);
    cy.get('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_btnEmpCertify').click();
    cy.wait('@aspxSubmission').then(checkPostData);
  }

  function checkAddEmployer() {
    cy.window().then((win) => {
      cy.stub(win, '__doPostBack').as('doPostBackStub');
    });
    cy.get('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvEmployers_chkEmployer_0').click();
    cy.get('@doPostBackStub').should('be.calledWith', 'ctl00$ContentPlaceHolder1$TabEmployment$tbpnlEMP$gvEmployers$ctl02$chkEmployer', '');
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can input info and proceed to next page", () => {
      checkConfirm();
    });

    it("user can enter the flow to add a new employer", () => {
      checkAddEmployer();
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

    it("user can input info and proceed to next page", () => {
      checkConfirm();
    });

    it("user can enter the flow to add a new employer", () => {
      checkAddEmployer();
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
