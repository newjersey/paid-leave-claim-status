describe("Intermittent Employment page", () => {
  function checkPostData(interception) {
    const formData = interception.request.body;
    cy.checkCommonPostData(formData);
    expect(formData).to.include('__EVENTTARGET=&__EVENTARGUMENT=&ContentPlaceHolder1_TabEmployment_ClientState=%7B%22ActiveTabIndex%22%3A5%2C%22TabState%22%3A%5Btrue%2Ctrue%2Ctrue%2Ctrue%2Ctrue%2Ctrue%2Cfalse%5D%7D&__LASTFOCUS=&');
    expect(formData).to.include('ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnFDDate=7%2F2%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnClmtLWD=01%2F01%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnDispOtherTabs=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearStart=1%2F1%2F2023&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24hdnBaseYearEnd=7%2F1%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24tbpnlEMP%24gvEmployers%24ctl02%24chkEmployer=on&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnPersTabCnt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24hdnExtEmplSel=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpNm=Spaceman&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd1=10+Main&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpAdd2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpCity=New+Brunswick&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlEmpStates=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip1=08111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZip2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtCEmpZipOOC=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24ddlAddEmpCtry=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoA=222&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo1=111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNo2=3333&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmpPhNoX=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentStartDt=01%2F01%2F2021&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabEmpDetails%24txtEmploymentEndDt=01%2F01%2F2024&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24ddlStopWorkReason=1&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtSepReason=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24rdoLstSeperation=Y&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtStreetAddrSOE=10+Main&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtStreetAddrSOE2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtCitySOE=New+Brunswick&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24ddlStateSOE=34&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtZipSOE1=08111&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtZipSOE2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24TxtEmpOutCtryZip=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24ddlCtrySOE=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtDeptUnitSOE=Time&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24hdnDeptUnitSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24textDeptUnitSOECount=96&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24rdoUnionGrp=N&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtUnionNameSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelSpan%24txtLocalNoSOE=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24rdoWrkSchTyp=FT&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCMon=8&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCTue=8&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCWed=8&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCThu=8&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCFri=8&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCSat=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkSch%24txtWCSun=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24rdoPTOGrp=N&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtFromPTODt1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtToPTODt1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24ddlPTOType1=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtGPTOAmt1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtFromPTODt2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtToPTODt2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24ddlPTOType2=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtGPTOAmt2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtFromPTODt3=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtToPTODt3=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24ddlPTOType3=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtGPTOAmt3=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtFromPTODt4=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtToPTODt4=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24ddlPTOType4=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtGPTOAmt4=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtFromPTODt5=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtToPTODt5=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24ddlPTOType5=0&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtGPTOAmt5=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24rdoPenGrp=N&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtEPenDt=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtAmtLS=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelPTO%24txtAmtMthly=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24rdoWrkIntGrp=N&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24hdnInterMtFlgs=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtFromWrkIntDt1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtToWrkIntDt1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtIntGrossAmt1=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtFromWrkIntDt2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtToWrkIntDt2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtIntGrossAmt2=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtFromWrkIntDt3=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtToWrkIntDt3=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtIntGrossAmt3=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtFromWrkIntDt4=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtToWrkIntDt4=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtIntGrossAmt4=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtFromWrkIntDt5=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtToWrkIntDt5=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtIntGrossAmt5=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtFromWrkIntDt6=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtToWrkIntDt6=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtIntGrossAmt6=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtFromWrkIntDt7=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtToWrkIntDt7=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtIntGrossAmt7=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtFromWrkIntDt8=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtToWrkIntDt8=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtIntGrossAmt8=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtFromWrkIntDt9=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtToWrkIntDt9=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtIntGrossAmt9=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtFromWrkIntDt10=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtToWrkIntDt10=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24txtIntGrossAmt10=&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24rdoLbrDisGrp=N&ctl00%24ContentPlaceHolder1%24TabEmployment%24TabPanelWrkDte%24btnSaveEmp=Continue');
  }

  function mockASPX() {
    cy.intercept('POST', '**/ClaimentEmployment.aspx',
      { statusCode: 200, headers: { 'content-type': 'text/html' } }
    ).as('aspxSubmission');
  };

  describe("page without new JS", () => {
    beforeEach(() => {
      cy.intercept('**/tdiOverride.min.js', { body: '', disableCache: true }).as('scriptIntercept');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/intermittent.html");
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkDte_rdoWrkIntNo').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkDte_rdoLbrDisNo').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkDte_btnSaveEmp').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });
  });

  describe("page with new JS", () => {
    beforeEach(() => {
      cy.intercept('GET', '**/tdiOverride.min.js', (req) => {
        req.continue((res) => {
          expect([200, 304]).to.include(res.statusCode);
        });
      }).as('script');
      cy.visit("./cypress/fixtures/claimApplication/claimantInfo/intermittent.html");
      cy.wait('@script');
    });

    it("user can input info and proceed to next page", () => {
      mockASPX();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkDte_rdoWrkIntNo').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkDte_rdoLbrDisNo').click();
      cy.get('#ContentPlaceHolder1_TabEmployment_TabPanelWrkDte_btnSaveEmp').click();
      cy.wait('@aspxSubmission').then(checkPostData);
    });

    it("passes accessibility checks", () => {
      cy.checkBodyA11y();
    });
  });
});
