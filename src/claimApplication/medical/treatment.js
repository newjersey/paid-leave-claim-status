import { logEvent } from "../../modules/shared.mjs";
import {
  adjustTableWidths,
  LOCAL_STORAGE_KEY_PROVIDER_NAME,
  removeExtraSpaceBetweenRadioButtons,
  styleRadioButton
} from '../utils';

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

export function changes() {
  adjustTable();
  adjustTextEntries();
  styleRadioButtons();
  saveProvider();
}

function styleRadioButtons() {
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbnDocAddYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbnDocAddNo');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnERYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnERNO');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnHospYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnHospNo');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo');
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbnDocAddYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbnDocAddNo'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnERYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnERNO'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnHospYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnHospNo'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo'
  );
}

function adjustTextEntries() {
  const disabilityEntry = document.querySelector("#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury");
  if (disabilityEntry) {
    disabilityEntry.style.width = '100%';
  }

  const injuryDiv = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury').closest('div');
  if (injuryDiv) {
    injuryDiv.style.marginLeft = '0';
  }

  const doctorEntry = document.querySelector("#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocNm");
  if (doctorEntry) {
    doctorEntry.style.width = '100%';
  }

  const doctorAddressEntry = document.querySelector("#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_Panel1");
  if (doctorAddressEntry) {
    doctorAddressEntry.style.width = '100%';
  }

  const workersCompDiv = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes').closest('div');
  if (workersCompDiv) {
    workersCompDiv.style.width = '100%';
  }
}

function adjustTable() {
  const doctorAddress = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_pnlDocOCCAdd');
  if (doctorAddress) {
    doctorAddress.style.width = 'auto';
    doctorAddress.style.maxWidth = '100%';
  }

  adjustTableWidths(document);
}

function saveProvider() {
  const submit = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc');
  const providerName = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocNm');
  if (submit && providerName) {
    submit.addEventListener('click', function () {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROVIDER_NAME, providerName.value.trim());
    });
  }
}
