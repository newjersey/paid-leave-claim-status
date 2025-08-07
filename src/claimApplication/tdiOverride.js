import { logEvent, setupAnalytics } from "../modules/shared.mjs";
import { accessibilityChanges } from './accessibility.js';
import { identifyPage } from './identifyPage.js';

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

function executeOverride() {
  setupAnalytics();

  const pageId = identifyPage();
  if (pageId === 'other') {
    return; // do not apply any other changes
  }

  accessibilityChanges();
  logEvent(`${pageId} viewed`, {});
  trackHelpClicks(pageId);
  trackSocSecYesSubmissions();
}

function trackHelpClicks(pageId) {
  const helpLink = document.getElementById('header_lbtnShowFAQ');
  if (helpLink) {
    helpLink.addEventListener('click', function() {
      logEvent('Help Clicked', { pageId });
    });
  }
}

function trackSocSecYesSubmissions() {
  const submitButton = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI');
  const ssYesRadio = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSYes');
  const ssPendingCheckbox = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkSSDtStat');
  const ssDateInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtSSDate');

  if (submitButton && ssYesRadio && ssPendingCheckbox && ssDateInput) {
    submitButton.addEventListener('click', function() {
      if (ssYesRadio.checked) {
        let date;

        if (ssPendingCheckbox.checked) {
          date = 'pending';
        } else {
          date = ssDateInput.value.trim();
        }

        logEvent('SocSec Yes Clicked', { date });
      }
    });
  }
}
