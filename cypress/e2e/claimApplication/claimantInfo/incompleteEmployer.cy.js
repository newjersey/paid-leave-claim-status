import { globalTestsNew, globalTestsOld } from "../shared";

const PAGE_ID = 'incompleteEmployer';
const URL = 'ClaimentEmployment';
const FIXTURE = "./cypress/fixtures/claimApplication/incompleteEmployer/incompleteEmployer.html";
const FIXTURE_WITH_ERROR = "./cypress/fixtures/claimApplication/incompleteEmployer/incompleteEmployerError.html";
const FIXTURE_FILLED = "./cypress/fixtures/claimApplication/incompleteEmployer/incompleteEmployerFilled.html";

describe("Incomplete Employer page", () => {
  function checkPostDataYes(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Btrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&');
    
    const expectedParamsString = 'ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=04%2F11%2F2026&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2025&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=4%2F11%2F2026&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl03%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24rdoWrkEmp=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=00000&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=1&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=2222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=05%2F01%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=05%2F05%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24btnNextEmpDet=Continue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=';

    const actual = new URLSearchParams(formData);
    const expected = new URLSearchParams(expectedParamsString);
  
    for (const [key, value] of expected.entries()) {
      expect(actual.get(key), `${key} should match`).to.equal(value);
    }
  }

  function checkPostDataNo(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Btrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&');
    
    const expectedParamsString = 'ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=04%2F11%2F2026&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2025&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=4%2F11%2F2026&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl03%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24rdoWrkEmp=N&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24BtnDelete=Continue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=00000&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=1&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=2222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=';

    const actual = new URLSearchParams(formData);
    const expected = new URLSearchParams(expectedParamsString);
  
    for (const [key, value] of expected.entries()) {
      expect(actual.get(key), `${key} should match`).to.equal(value);
    }
  }

  function checkCancelData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Btrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&');
    
    const expectedParamsString = 'ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=04%2F11%2F2026&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2025&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=4%2F11%2F2026&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl03%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24rdoWrkEmp=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=2222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=00000&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=1&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24btnCancelEmp1=Cancel&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=';

    const actual = new URLSearchParams(formData);
    const expected = new URLSearchParams(expectedParamsString);
  
    for (const [key, value] of expected.entries()) {
      expect(actual.get(key), `${key} should match`).to.equal(value);
    }
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can input employer info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type("05/01/2024");
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type("05/05/2024");
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
      cy.wait('@aspxSubmission').then(checkPostDataYes);
    });

    it("user can say they did not work for employer", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_BtnDelete').click();
      cy.wait('@aspxSubmission').then(checkPostDataNo);
    });

    it("user can cancel", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnCancelEmp1').click();
      cy.wait('@aspxSubmission').then(checkCancelData);
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
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').should('not.be.visible');
      cy.get('#still-work-here-no').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').should('not.be.visible');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type("05/01/2024");
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type("05/05/2024");
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
      cy.wait('@aspxSubmission').then(checkPostDataYes);
      cy.checkLogEvent(`TDI Employer Still Work Here Submitted`, { contents: "no", pageId: 'incompleteEmployer' });
    });

    it("user can say they did not work for employer", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerNo').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_BtnDelete').click();
      cy.wait('@aspxSubmission').then(checkPostDataNo);
    });

    it("shows error without question number", () => {
      cy.visit(FIXTURE_WITH_ERROR);
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_lblValEmpDetMsg').invoke('text').should('not.match', /\d/);
    });

    it("shows all fields when data is filled", () => {
      cy.visit(FIXTURE_FILLED);
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').should('be.checked');
      cy.get('#still-work-here-yes').should('be.visible');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').should('not.be.visible');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').should('not.be.visible');
      cy.get('#still-work-here-yes').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').should('have.value', '04/01/2025');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').should('be.visible');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').should('have.value', '04/02/2026');
    });

    it("updates employer name into labels", () => {
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });
      cy.contains('Are you currently employed by Test?').should('be.visible');
    });

    it("user cannot submit if still-work-here unanswered", () => {
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });
      cy.get('#still-work-here-yes').should('not.be.checked');
      cy.get('#still-work-here-no').should('not.be.checked');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
      cy.get('#still-work-here-yes')
        .then(($input) => {
          expect($input[0].validationMessage).to.exist;
        });
      cy.confirmEventIsNotTracked("TDI Employer Still Work Here Submitted");
    });

    it("user can cancel", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnCancelEmp1').click();
      cy.wait('@aspxSubmission').then(checkCancelData);
    });

    it('system alert shows on invalid date', () => {
      cy.window().then((win) => {
        cy.spy(win, 'alert').as('alertSpy');
      });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });
      cy.get('#still-work-here-no').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type('04/13/2026');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').blur();
      cy.get('@alertSpy').invoke('getCall', 0).should('be.calledWith', 'Employment Start Date cannot be later than First Day Of Disability.');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').should('have.value', '');
      cy.checkLogEvent(`System Alert`, { contents: "Employment Start Date cannot be later than First Day Of Disability.", pageId: 'incompleteEmployer' });
    });

    it('shows info and warning alerts properly', () => {
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes').click({ force: true });

      cy.get('#still-work-here-no').click({ force: true });
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type('04/13/2026');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').blur();
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('12345');
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').clear();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('04/12/2026');
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('be.visible');
      cy.get('#employment-end-error').should('not.be.visible');
      cy.checkLogEvent(`TDI Employer End Date Warning`, { pageId: 'incompleteEmployer' });

      cy.get('#still-work-here-yes').click({ force: true });
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').clear();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('04/13/2026');
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('be.visible');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').blur();
      cy.get('#employment-end-info').should('be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').clear();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('04/10/2026');
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').clear();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('04/12/2026');
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
      cy.checkLogEvent(`TDI Employer Submitted With End Date Warning`, { pageId: 'incompleteEmployer' });
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
