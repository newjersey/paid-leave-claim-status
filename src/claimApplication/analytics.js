import { logEvent } from "../modules/shared.mjs";
import { trackOtherBenefitsYesSubmission } from './claimantInfo/otherBenefits.js';
import { trackWorkersCompYesSubmission } from './medical/treatment.js';
import { trackPrintClaimSummaryButton } from './claimantInfo/confirmation.js';

export function analyticsChanges(pageId) {
  logEvent(`${pageId} viewed`, {});
  trackHelpClicks(pageId);
  trackOtherBenefitsYesSubmission(pageId);
  trackWorkersCompYesSubmission(pageId);
  trackPrintClaimSummaryButton();
  trackValidationErrors(pageId);
  trackSystemAlerts(pageId);
  addPageIdToURL(pageId);
}

function trackHelpClicks(pageId) {
  const helpLink = document.getElementById('header_lbtnShowFAQ');
  if (helpLink) {
    helpLink.addEventListener('click', function() {
      logEvent('Help Clicked', { pageId });
    });
  }
}

function trackValidationErrors(pageId) {
  const errorElements = document.querySelectorAll(`
    [id*="lblError"],
    [id*="lblerror"],
    #lblValEmpDetMsg,
    #ValEmpSpanMsg,
    #divClEmpTelVal,
    #ValEmpWrkSch,
    #lblValPTO,
    #lblValWrkInt,
    #lblNotice,
    #ContentPlaceHolder1_TabEmployment_TabEmpDetails_lblValEmpDetMsg,
    #ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_lblDocError,
    #ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_lblLatePayerr
  `);

  errorElements.forEach(element => {
    const isVisible = element.offsetParent !== null;
    if (isVisible) {
      const contents = element.textContent.trim().substring(0, 100);
      if (contents) {
        logEvent('Validation Error', { contents, pageId });
      }
    }
  });
}

function trackSystemAlerts(pageId) {
  const originalAlert = window.alert;
  window.alert = function(contents) {
    logEvent('System Alert', { contents, pageId });
    return originalAlert.call(window, contents);
  };
}

export function addPageIdToURL(pageId) {
  const url = new URL(window.location.href);
  url.searchParams.set('pageId', pageId);
  history.replaceState(null, '', url.toString());
}
