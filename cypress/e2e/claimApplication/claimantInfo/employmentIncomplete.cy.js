import { globalTestsNew, globalTestsOld } from "../shared";

const PAGE_ID = 'employment';
const URL = 'ClaimentEmployment';
const FIXTURE = "./cypress/fixtures/claimApplication/claimantInfo/employmentIncomplete.html";

describe("Employment Info page", () => {
  function checkConfirm() {
    cy.get('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_btnEmpCertify').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains("You cannot proceed with Confirmation now. Please verify the employers below.");
    });
  }

  function checkAddEmployer() {
    cy.window().then((win) => {
      cy.stub(win, '__doPostBack').as('doPostBackStub');
    });
    cy.get('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvEmployers_chkEmployer_0').click();
    cy.get('@doPostBackStub').should('be.calledWith', 'ctl00$ContentPlaceHolder1$TabEmployment$tbpnlEMP$gvEmployers$ctl02$chkEmployer', '');
  }

  function checkCompleteEmployer() {
    cy.window().then((win) => {
      cy.stub(win, '__doPostBack').as('doPostBackStub');
    });
    cy.get('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvEmployers_chkEmployer_1').click();
    cy.get('@doPostBackStub').should('be.calledWith', 'ctl00$ContentPlaceHolder1$TabEmployment$tbpnlEMP$gvEmployers$ctl03$chkEmployer', '');
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

    it("user can enter the flow to complete an incomplete employer", () => {
      checkCompleteEmployer();
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

    afterEach(() => {
      cy.checkBodyA11y(true);
    });

    it("user can input info and proceed to next page", () => {
      checkConfirm();
    });

    it("user can enter the flow to add a new employer", () => {
      checkAddEmployer();
    });

    it("user can enter the flow to complete an incomplete employer", () => {
      checkCompleteEmployer();
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
