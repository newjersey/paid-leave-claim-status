import { logEvent } from "../../modules/shared.mjs";

export const medicalTreatmentLabels = [
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury', label: 'Describe your Disability' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_text_num_inj', label: 'Characters Left in Description Textbox' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocNm', label: 'Doctor or Hospital Name' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocPh', label: 'First 3 digits of Doctor/Hospital Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocPh2', label: 'Fourth, fifth, and sixth digits of Doctor/Hospital Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocPh3', label: 'Last 4 digits of Doctor/Hospital Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocPh4', label: 'Doctor/Hospital Phone Number Extension' },
];

export const id = "medicalTreatment";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor',
  text: 'Describe your disability.',
};

function formFromCorrectPage(formData) {
  const clientStateString = formData.get('ContentPlaceHolder1_ClaimantDisabilityTab_ClientState');
  const clientState = clientStateString ? JSON.parse(clientStateString) : null;

  const correctActiveTabIndex = 1;
  const correctTabState = [true, true, false, false, false, false];

  return clientState &&
    clientState.ActiveTabIndex === correctActiveTabIndex &&
    JSON.stringify(clientState.TabState) === JSON.stringify(correctTabState);
}

export function trackWorkersCompYesSubmission(pageId) {
  if (pageId !== id) {
    return;
  }

  const form = document.getElementById('form1');

  if (form) {
    form.addEventListener('submit', function() {
      const formData = new FormData(form);
      if (
        formFromCorrectPage(formData) &&
        formData.get('ctl00$ContentPlaceHolder1$ClaimantDisabilityTab$TabDoctor$rbInj') === 'rbtnInjYes'
      ) {
        logEvent('WorkersComp Yes Clicked', {});
      }
    });
  }
}
