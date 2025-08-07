import { logEvent } from "../../modules/shared.mjs";

export const id = "otherBenefits";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits',
  text: 'Social Security Benefits',
};

function isOnCorrectPage(formData) {
  const clientStateString = formData.get('ContentPlaceHolder1_ClaimantDisabilityTab_ClientState');
  const clientState = clientStateString ? JSON.parse(clientStateString) : null;
  const correctActiveTabIndex = 3;
  const correctTabState = [true, true, false, true, false, false];
  return clientState &&
    clientState.ActiveTabIndex === correctActiveTabIndex &&
    JSON.stringify(clientState.TabState) === JSON.stringify(correctTabState);
}

export function trackSocSecYesSubmission(pageId) {
  if (pageId !== id) {
    return;
  }

  const form = document.getElementById('form1');

  if (form) {
    form.addEventListener('submit', function() {
      const formData = new FormData(form);
      if (isOnCorrectPage(formData) && formData.get('ctl00$ContentPlaceHolder1$ClaimantDisabilityTab$TabBenefits$rbSS') === 'rbSSYes') {
        const date = formData.get('ctl00$ContentPlaceHolder1$ClaimantDisabilityTab$TabBenefits$txtSSDate') || 'pending';
        logEvent('SocSec Yes Clicked', { date });
      }
    });
  }
}
