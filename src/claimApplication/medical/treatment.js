import i18next from 'i18next';
import { logEvent } from "../../modules/shared.mjs";
import {
  adjustTableWidths,
  elementTextError,
  getSessionData,
  removeExtraSpaceBetweenRadioButtons,
  resetElementText,
  setNewTitle,
  STORAGE_KEY_REASON_FOR_LEAVE,
  addToSessionData,
  STORAGE_KEY_PROVIDER_TYPE_ACCEPTED,
  setRequiredForVisibleLeaveSectionFields,
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
  addStyles();
  replaceDoctorText();
  addProviderScreener();
  addWorkersCompScreener();
  loadReasonData();
  adjustTable();
  adjustTextEntries();
  styleRadioButtons();
  setNewTitle(i18next.t('medicalInfo.title'));

  const sessionData = getSessionData();
    const reasonData = sessionData[STORAGE_KEY_REASON_FOR_LEAVE];
    const reason = reasonData?.reasons;

    setRequiredForVisibleLeaveSectionFields('medicalTreatment', reason)
  }

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    .usa-accordion {
      margin-top: 10px;
    }

    .usa-checkbox__label, .usa-radio__label {
      text-align: left;
    }

    .usa-checkbox__input:checked+[class*=__label]:before, 
    .usa-checkbox__input:checked:disabled+[class*=__label]:before {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2265%22%20height=%2250%22%20viewBox=%220%200%2065%2050%22><title>correct8</title><path%20fill=%22%23FFF%22%20fill-rule=%22evenodd%22%20d=%22M63.268%207.063l-5.616-5.61C56.882.685%2055.946.3%2054.845.3s-2.038.385-2.808%201.155L24.951%2028.552%2012.81%2016.385c-.77-.77-1.707-1.155-2.808-1.155-1.1%200-2.037.385-2.807%201.154l-5.616%205.61C.81%2022.764.425%2023.7.425%2024.8s.385%202.035%201.155%202.805l14.947%2014.93%205.616%205.61c.77.77%201.706%201.154%202.807%201.154s2.038-.384%202.808-1.154l5.616-5.61%2029.894-29.86c.77-.77%201.157-1.707%201.157-2.805%200-1.101-.385-2.036-1.156-2.805l-.001-.002z%22/></svg>'), linear-gradient(transparent, transparent);
    }
  `;
  document.head.appendChild(style);
}

function replaceDoctorText() {
  // TODO: do in a translation-compatible way
  const linkElements = document.querySelectorAll('a');

  linkElements.forEach((element) => {
    let text = element.textContent;
    if (text.includes('doctor/hospital')) {
      text = text.replace('doctor/hospital', 'healthcare provider');
    }
    if (text.includes('doctor’s/hospital’s')) {
      text = text.replace('doctor’s/hospital’s', `healthcare provider's`);
    }
    element.textContent = text;
  });
}

function addProviderScreener() { 
  const doctorNameInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocNm');
  const fieldset = doctorNameInput.closest('fieldset');

  const providerType = document.createElement('div');
  providerType.style.margin = "0 0 50px";
  providerType.innerHTML = `
    ${i18next.t('medicalInfo.provider.explanation')}
    <div class="usa-checkbox">
      <input
        class="usa-checkbox__input"
        id="check-provider-type-accepted"
        type="checkbox"
        value="yes"
        required
      />
      <label id="provider-type-accepted-legend" class="usa-checkbox__label" for="check-provider-type-accepted">
        <span class="required-asterisk">*</span>
        <strong id="providerTypeQuestionNumber" style="display:none;">1. </strong>
        ${i18next.t('medicalInfo.provider.type.isAccepted')}
      </label>
    </div>

    <div class="usa-accordion usa-accordion--bordered">
      <h2 class="usa-accordion__heading">
        <button
          type="button"
          class="usa-accordion__button"
          aria-expanded="false"
          aria-controls="accepted-provider-types"
        >
          ${i18next.t('medicalInfo.provider.type.weAccept')}
        </button>
      </h2>
      <div id="accepted-provider-types" class="usa-accordion__content usa-prose">
        <ul>
          <li>${i18next.t('medicalInfo.provider.type.advancedPracticeNurse')}</li>
          <li>${i18next.t('medicalInfo.provider.type.registeredNurse')}</li>
          <li>${i18next.t('medicalInfo.provider.type.certifiedNursePractitioner')}</li>
          <li>${i18next.t('medicalInfo.provider.type.clinicalNurseSpecialist')}</li>
          <li>${i18next.t('medicalInfo.provider.type.certifiedNurseMidwife')}</li>
          <li>${i18next.t('medicalInfo.provider.type.certifiedProfessionalMidwife')}</li>
          <li>${i18next.t('medicalInfo.provider.type.chiropractor')}</li>
          <li>${i18next.t('medicalInfo.provider.type.dentist')}</li>
          <li>${i18next.t('medicalInfo.provider.type.erPhysician')}</li>
          <li>${i18next.t('medicalInfo.provider.type.medicalDoctor')}</li>
          <li>${i18next.t('medicalInfo.provider.type.optometrist')}</li>
          <li>${i18next.t('medicalInfo.provider.type.osteopath')}</li>
          <li>${i18next.t('medicalInfo.provider.type.podiatrist')}</li>
          <li>${i18next.t('medicalInfo.provider.type.psychologist')}</li>
          <li>${i18next.t('medicalInfo.provider.type.physicianAssistant')}</li>
          <li>${i18next.t('medicalInfo.provider.type.specialist')}</li>
        </ul>
      </div>
    </div>
  `;
  fieldset.insertBefore(providerType, fieldset.firstChild);

  const checkbox = document.getElementById("check-provider-type-accepted");
  const legend = document.getElementById("provider-type-accepted-legend");
  
  const sessionData = getSessionData();
    if (sessionData[STORAGE_KEY_PROVIDER_TYPE_ACCEPTED]) {
      checkbox.checked = true;
    }

  checkbox.addEventListener('change', function () {
    resetElementText(legend);
    addToSessionData({
      [STORAGE_KEY_PROVIDER_TYPE_ACCEPTED]: checkbox.checked
    });
  });

  checkbox.addEventListener('invalid', function () {
    elementTextError(legend);
  });
}

function addWorkersCompScreener() {
  const workersCompNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo');
  const workersCompContainer = workersCompNo.closest('div').closest('div');
  workersCompContainer.id = "workersCompContainer"
  workersCompContainer.style.display = 'none';

  const linkElements = workersCompContainer.querySelectorAll('a');
  linkElements.forEach((element) => {
    let text = element.textContent;
    if (text.includes('7.')) {
      text = text.replace('7.', '7a.');
    }
    element.textContent = text;
  });

  const causedByJobQuestion = document.createElement('div');
  causedByJobQuestion.id = "causedByJobQuestion";
  causedByJobQuestion.style.margin = "0 0 20px";
  causedByJobQuestion.innerHTML = `
    <fieldset class="usa-fieldset">
      <legend id="caused-by-job-legend" class="usa-legend usa-legend">
        <span class="required-asterisk">*</span>
        7. <span id="causedByJobText">${i18next.t('medicalInfo.work.causedByJob')}</span>
      </legend>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="caused-by-job-yes"
          type="radio"
          name="caused-by-job"
          value="yes"
          required
        />
        <label class="usa-radio__label" for="caused-by-job-yes">
          ${i18next.t('shared.yes')}
        </label>
      </div>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="caused-by-job-no"
          type="radio"
          name="caused-by-job"
          value="no"
          required
        />
        <label class="usa-radio__label" for="caused-by-job-no">
          ${i18next.t('shared.no')}
        </label>
      </div>
    </fieldset>
  `;
  workersCompContainer.parentElement.insertBefore(causedByJobQuestion, workersCompContainer);

  const causedByJobYes = document.getElementById('caused-by-job-yes');
  const causedByJobNo = document.getElementById('caused-by-job-no');
  const causedByJobLegend = document.getElementById('caused-by-job-legend');

  causedByJobYes.addEventListener('change', function () {
    const refreshedWorkersCompNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo');
    resetElementText(causedByJobLegend);
    workersCompContainer.style.display = 'block';
    refreshedWorkersCompNo.checked = false;
  });

  causedByJobNo.addEventListener('change', function () {
    const refreshedWorkersCompNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo');
    resetElementText(causedByJobLegend);
    workersCompContainer.style.display = 'none';
    refreshedWorkersCompNo.click();
  });

  const form = document.getElementById('form1');
  form.addEventListener('submit', (event) => {
    if (!causedByJobYes.checked && !causedByJobNo.checked) {
      event.preventDefault();
      elementTextError(causedByJobLegend);
      causedByJobYes.focus();
    } else {
      causedByJobYes.removeAttribute('name');
      causedByJobNo.removeAttribute('name');
      form.addEventListener('formdata', () => {
        causedByJobYes.setAttribute('name', 'caused-by-job');
        causedByJobNo.setAttribute('name', 'caused-by-job');
      }, { once: true });
    }
  });

  causedByJobYes.addEventListener('invalid', function () {
    elementTextError(causedByJobLegend);
  });
}

function loadReasonData() {
  const sessionData = getSessionData();
  const reasonData = sessionData[STORAGE_KEY_REASON_FOR_LEAVE];

  if (!reasonData) {
    return;
  }

  const reason = reasonData['reasons'];
  if (!reason) {
    return;
  }

  let details;
  if (reason === 'pregnancy') {
    details = reasonData['pregnancy-details'];
  } else if (reason === 'illness') {
    details = reasonData['illness-details'];
  } else if (reason === 'injury') {
    details = reasonData['injury-details'];
  }

  const textArea = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury');
  textArea.value = `${reason}${details ? `. ${details}` : ''}`;
  textArea.closest('fieldset').style.display = 'none';
  document.getElementById('providerTypeQuestionNumber').style.display = 'inline';

  if (reason === 'pregnancy') {
    const causedByJobNo = document.getElementById('caused-by-job-no');
    const workersCompNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo');
    const causedByJobQuestion = document.getElementById('causedByJobQuestion');
    const workersCompContainer = document.getElementById('workersCompContainer');

    causedByJobNo.click();
    workersCompNo.click();
    causedByJobQuestion.style.display = 'none';
    workersCompContainer.style.display = 'none';
  }
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
