import { logEvent } from "../modules/shared.mjs";
import { trackSocSecYesSubmission } from './claimantInfo/otherBenefits.js';
import { trackPrintClaimSummaryButton } from './claimantInfo/confirmation.js';

export function analyticsChanges(pageId) {
  logEvent(`${pageId} viewed`, {});
  trackHelpClicks(pageId);
  trackSocSecYesSubmission(pageId);
  trackPrintClaimSummaryButton();
}

function trackHelpClicks(pageId) {
  const helpLink = document.getElementById('header_lbtnShowFAQ');
  if (helpLink) {
    helpLink.addEventListener('click', function() {
      logEvent('Help Clicked', { pageId });
    });
  }
}
