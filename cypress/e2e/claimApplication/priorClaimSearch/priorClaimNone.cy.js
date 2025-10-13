const PAGE_ID = 'priorClaimSearch';
const URL = 'TDI_PndClaim_Search';
const FIXTURE = "./cypress/fixtures/claimApplication/priorClaimSearch/priorClaimNone.html";

describe("Prior Claim Search page", () => {
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

    it("does not overlap footer and info for no pending claims", () => {
      cy.get('#ContentPlaceHolder1_rbtnClmNo').click({ force: true});

      cy.get('#ContentPlaceHolder1_dvNoData').should('be.visible');
      cy.get('#helpSection').should('be.visible');

      cy.get('#ContentPlaceHolder1_dvNoData').then(($noData) => {
        const noDataBottom = $noData[0].offsetTop + $noData[0].offsetHeight;

        cy.get('#helpSection').then(($helpSection) => {
          const helpSectionTop = $helpSection[0].offsetTop;
          expect(noDataBottom).to.be.lessThan(helpSectionTop);
        });
      });
    });
  });
});
