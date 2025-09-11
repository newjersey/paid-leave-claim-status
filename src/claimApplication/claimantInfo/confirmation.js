import { logEvent } from "../../modules/shared.mjs";

export const confirmationAltTexts = [
  { id: 'ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_imgbtnM01', alt: 'Submit Query' },
];

export const id = "confirmation";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_lblHeader',
  text: 'CLAIMANT CONFIRMATION',
};

export function trackPrintClaimSummaryButton() {
  const printClaimSummaryButton = document.getElementById('ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_btnContinue');
  if (printClaimSummaryButton) {
    printClaimSummaryButton.addEventListener('click', function() {
      logEvent('Print Claim Summary Button Clicked', {});
    });
  }
}

export function changes() {
  addStyles();
  removeWhitespace();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    #ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_btnContinue {
      width: auto;
    }
    .imgbtnPrinter {
      display: inline;
    }
  `;
  document.head.appendChild(style);
}

function removeWhitespace() {
  const element = document.querySelector("#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_tblPrintForms > tbody > tr:nth-child(14) > td > strong > a");
  if (element) {
    element.innerHTML = element.innerHTML.replace(/(<br>|&nbsp;)/g, '').trim();
  }
}
