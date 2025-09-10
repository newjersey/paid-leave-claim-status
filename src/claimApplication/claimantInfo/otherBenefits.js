import { logEvent } from "../../modules/shared.mjs";
import { styleRadioButton } from '../utils';

export const id = "otherBenefits";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits',
  text: 'Social Security Benefits',
};

function formFromCorrectPage(formData) {
  const clientStateString = formData.get('ContentPlaceHolder1_ClaimantDisabilityTab_ClientState');
  const clientState = clientStateString ? JSON.parse(clientStateString) : null;
  const correctActiveTabIndex = 3;
  const correctTabState = [true, true, false, true, false, false];
  return clientState &&
    clientState.ActiveTabIndex === correctActiveTabIndex &&
    JSON.stringify(clientState.TabState) === JSON.stringify(correctTabState);
}

export function trackOtherBenefitsYesSubmission(pageId) {
  if (pageId !== id) {
    return;
  }

  const form = document.getElementById('form1');

  if (form) {
    form.addEventListener('submit', function() {
      const formData = new FormData(form);

      if (formFromCorrectPage(formData)) {
        let otherBenefits = [];
        if (
        formData.get('ctl00$ContentPlaceHolder1$ClaimantDisabilityTab$TabBenefits$rbTDI') === 'rbTDIYes'
        ) {
          otherBenefits.push("another state");
        }
        if (
        formData.get('ctl00$ContentPlaceHolder1$ClaimantDisabilityTab$TabBenefits$rbTDEmp') === 'rbTDEmpYes'
        ) {
          otherBenefits.push("employer/union");
        }
        if (
        formData.get('ctl00$ContentPlaceHolder1$ClaimantDisabilityTab$TabBenefits$rbSS') === 'rbSSYes'
        ) {
          otherBenefits.push("social security");
        }
        if (
        formData.get('ctl00$ContentPlaceHolder1$ClaimantDisabilityTab$TabBenefits$rbUI') === 'rbUIYes'
        ) {
          otherBenefits.push("ui");
        }

        if (otherBenefits.length > 0) {
          logEvent('Other Benefits Yes Clicked', { otherBenefits });
        }
      }
    });
  }
}

export function changes() {
  const radioButtonIds = [
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDIYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUIYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo'
  ];

  radioButtonIds.forEach(styleRadioButton);
}
