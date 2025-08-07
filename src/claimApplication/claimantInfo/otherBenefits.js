import { logEvent } from "../../modules/shared.mjs";

export const id = "otherBenefits";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits',
  text: 'Social Security Benefits',
};

export function trackSocSecYesSubmission(pageId) {
  if (pageId !== id) {
    return;
  }

  const form = document.getElementById('form1');

  if (form) {
    form.addEventListener('submit', function() {
      const formData = new FormData(form);
      
      if (formData.get('ctl00$ContentPlaceHolder1$ClaimantDisabilityTab$TabBenefits$rbSS') === 'rbSSYes') {
        const date = formData.get('ctl00$ContentPlaceHolder1$ClaimantDisabilityTab$TabBenefits$txtSSDate') || 'pending';
        
        logEvent('SocSec Yes Clicked', { date });
      }
    });
  }
}
