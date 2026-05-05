import { globalTestsNew, globalTestsOld } from "../shared";

const PAGE_ID = 'employerDetails';
const URL = 'ClaimentEmployment';
const FIXTURE = "./cypress/fixtures/claimApplication/claimantInfo/employerDetails.html";
const FIXTURE_WITH_ERROR = "./cypress/fixtures/claimApplication/incompleteEmployer/employerDetailsError.html";

describe("Employment Details page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    const expectedStateString = '__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Btrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&__LASTFOCUS=&';
    const expectedParamsString = 'ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnFDDate=7%2F1%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=06%2F25%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2023&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=6%2F30%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl02%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=Murch&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=30+Livingston+Avenue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=08901&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=555&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=1111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=01%2F01%2F2021&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=01%2F01%2F2022&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24btnNextEmpDet=Continue&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=';
    cy.checkPostData(formData, expectedStateString);
    cy.checkPostData(formData, expectedParamsString);
  }

  function checkCancelData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    const expectedStateString = '__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A1%2C%22TabState%22%3A%5Btrue%2Ctrue%2Cfalse%2Cfalse%2Cfalse%2Cfalse%2Cfalse%5D%7D&';
    const expectedParamsString = 'ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnFDDate=7%2F1%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=06%2F25%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2023&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=6%2F30%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl02%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24btnCancelEmp1=Cancel&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=';
    cy.checkPostData(formData, expectedStateString);
    cy.checkPostData(formData, expectedParamsString);
  }

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit(FIXTURE);
    });

    it("user can input info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpNm').type('Murch');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip1').type('08901');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA').type('111');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo1').type('555');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo2').type('1111');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type('01/01/2021');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('01/01/2022');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("user can cancel", () => {
      cy.mockASPX(URL);
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

    it("user can input info and proceed to next page", () => {
      cy.mockASPX(URL);
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpNm').type('Murch');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd1').type('30 Livingston Avenue');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpCity').type('New Brunswick');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip1').type('08901');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA').type('111');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo1').type('555');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo2').type('1111');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').should('not.be.visible');
      cy.get('#still-work-here-no').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').should('not.be.visible');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type('01/01/2021');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('01/01/2022');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
      cy.wait('@aspxSubmission').then(checkPostData);
      cy.confirmEventIsNotTracked("System Alert");
      cy.checkLogEvent(`TDI Employer Still Work Here Submitted`, { contents: "no", pageId: 'employerDetails' });
    });

    it("user cannot submit if still-work-here unanswered", () => {
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
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnCancelEmp1').click();
      cy.wait('@aspxSubmission').then(checkCancelData);
    });

    it("shows error without question number", () => {
      cy.visit(FIXTURE_WITH_ERROR);
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_lblValEmpDetMsg').invoke('text').should('not.match', /\d/);
    });

    it('calendar UX allows only valid inputs', () => {
      cy.clock(new Date(2025, 7, 18)); // 0-indexed; August 18, 2025
      cy.visit(FIXTURE);
      cy.window().then((win) => {
        cy.spy(win, 'alert').as('alertSpy');
      });

      cy.get('#still-work-here-no').click({ force: true });

      cy.get('#Image2').click();
      cy.tick(200);
      cy.get('#FDDCalendarControl').should('be.visible');

      cy.get('#pageTitle').click(); // test click-away-to-close
      cy.tick(200);
      cy.get('#FDDCalendarControl').should('not.be.visible');

      cy.get('#Image2').click();
      cy.tick(200);
      cy.get('a.weekday').contains('2').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').blur();
      cy.get('@alertSpy').invoke('getCall', 0).should('be.calledWith', 'Employment Start Date cannot be later than First Day Of Disability.');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').should('have.value', '');

      cy.get('#Image2').click();
      cy.tick(200);
      cy.get('#FDDCalendarControl img[alt="Previous month"]').click();
      cy.get('a.weekend').contains('30').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').blur();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').should('have.value', '06/30/2024');

      cy.get('#Image4').click();
      cy.tick(200);
      cy.get('a.weekday').contains('3').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').blur();
      cy.get('@alertSpy').invoke('getCall', 1).should('be.calledWith', "Employment End Date cannot be later than First Day Of Disability.");
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').should('have.value', '');

      cy.get('#Image4').click();
      cy.tick(200);
      cy.get('#FDDCalendarControl img[alt="Previous month"]').click();
      cy.tick(200);
      cy.get('a.weekday').contains('26').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').blur();
      cy.get('@alertSpy').invoke('getCall', 2).should('be.calledWith', "Employment End Date cannot be earlier than Start Date");
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').should('have.value', '');

      cy.get('#Image4').click();
      cy.tick(200);
      cy.get('a.current').contains('1').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').blur();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').should('have.value', '07/01/2024');
    });

    it('system alert shows on invalid date', () => {
      cy.window().then((win) => {
        cy.spy(win, 'alert').as('alertSpy');
      });
      cy.get('#still-work-here-no').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type('09/02/2025');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').blur();
      cy.get('@alertSpy').invoke('getCall', 0).should('be.calledWith', 'Employment Start Date cannot be later than First Day Of Disability.');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').should('have.value', '');
      cy.checkLogEvent(`System Alert`, { contents: "Employment Start Date cannot be later than First Day Of Disability.", pageId: 'employerDetails' });
    });

    it('shows info and warning alerts properly', () => {
      cy.get('#still-work-here-no').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').should('not.be.visible');
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').type('09/02/2025');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt').blur();
      cy.get('#employment-end-info').should('be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#still-work-here-yes').click({ force: true });
      cy.get('#employment-end-info').should('be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#still-work-here-no').click({ force: true });
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('12345');
      cy.get('#employment-end-info').should('be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').clear();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('06/30/2024');
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('be.visible');
      cy.checkLogEvent(`TDI Employer End Date Warning`, { pageId: 'employerDetails' });
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#still-work-here-yes').click({ force: true });
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').clear();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('09/02/2025');
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('be.visible');
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').blur();
      cy.get('#employment-end-info').should('be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').clear();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('06/20/2024');
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#still-work-here-no').click({ force: true });
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('not.be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').clear();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt').type('06/30/2024');
      cy.get('#employment-end-info').should('not.be.visible');
      cy.get('#employment-end-warning').should('be.visible');
      cy.get('#employment-end-error').should('not.be.visible');

      cy.get('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnNextEmpDet').click();
      cy.checkLogEvent(`TDI Employer Submitted With End Date Warning`, { pageId: 'employerDetails' });
    });

    globalTestsNew(PAGE_ID, URL);
  });
});
