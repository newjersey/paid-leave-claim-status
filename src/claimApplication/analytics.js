import { logEvent } from "../modules/shared.mjs";
import { trackSocSecYesSubmission } from './claimantInfo/otherBenefits.js';
import { trackWorkersCompYesSubmission } from './medical/treatment.js';
import { trackPrintClaimSummaryButton } from './claimantInfo/confirmation.js';

export function analyticsChanges(pageId) {
  logEvent(`${pageId} viewed`, {});
  trackHelpClicks(pageId);
  trackSocSecYesSubmission(pageId);
  trackWorkersCompYesSubmission(pageId);
  trackPrintClaimSummaryButton();
  trackValidationErrors();
}

function trackHelpClicks(pageId) {
  const helpLink = document.getElementById('header_lbtnShowFAQ');
  if (helpLink) {
    helpLink.addEventListener('click', function() {
      logEvent('Help Clicked', { pageId });
    });
  }
}

function trackValidationErrors() {
  const errorElements = document.querySelectorAll('[id*="lblError"], [id*="lblerror"]');
  errorElements.forEach(element => {
    const isVisible = element.offsetParent !== null;
    if (isVisible) {
      const contents = element.textContent.trim().substring(0, 100);
      logEvent('Validation Error', { contents });
    }
  });
}
