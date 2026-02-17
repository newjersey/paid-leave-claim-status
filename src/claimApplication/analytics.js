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
  const errorElements = document.querySelectorAll('[id*="lblError"], [id*="lblerror"]');
  errorElements.forEach(element => {
    const isVisible = element.offsetParent !== null;
    if (isVisible) {
      const contents = element.textContent.trim().substring(0, 100);
      logEvent('Validation Error', { contents, pageId });
    }
  });
}
