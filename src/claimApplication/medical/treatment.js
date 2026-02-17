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
  STORAGE_KEY_CAUSED_BY_JOB,
  STORAGE_KEY_WORKERS_COMP,
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
    form.addEventListener('submit', function () {
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
  matchNewFormDataToExisting();
  adjustTable();
  adjustTextEntries();
  styleRadioButtons();
  addWorkersCompListeners();
  loadReasonData();
  setNewTitle(i18next.t('medicalInfo.title'));
  addSubtitleAndExplainer();

  const sessionData = getSessionData();
  const reasonData = sessionData[STORAGE_KEY_REASON_FOR_LEAVE];
  const reason = reasonData?.reasons;

  setRequiredForVisibleLeaveSectionFields('medicalTreatment', reason)
}

function addStyles() {
  const style = document.createElement('style');
  style.innerHTML = `

    .usa-radio__label {
      text-align: left;
    }

    .provider-accepted-list li {
      list-style-type: disc;
    }
  
    .required-asterisk {
      color: rgb(139, 0, 0);
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

function addSubtitleAndExplainer() {
  const questionDiv = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor');
  const subtitleDiv = document.createElement('div');
  subtitleDiv.style.margin = "0 0 0";
  subtitleDiv.innerHTML = `
  <h2 style="font-size: 20px; font-weight: bold; color: black; font-variant: none" class="margin-bottom-1"> ${i18next.t('medicalInfo.provider.title')}</h2>
  <p class="margin-bottom-3">${i18next.t('medicalInfo.provider.explanation')}</p>`

  questionDiv.prepend(subtitleDiv);
}

function addProviderScreener() {
  const doctorNameInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocNm');
  const fieldset = doctorNameInput.closest('fieldset');

  const providerType = document.createElement('div');
  providerType.style.margin = "0 0 50px";
  providerType.innerHTML = `
        <p>${i18next.t('medicalInfo.provider.theseTypesProviders')}</p>
        <div class="provider-accepted-list margin-bottom-2">
          <ul class="usa-list margin-top-0">
            <li>${i18next.t('medicalInfo.provider.type.advancedPracticeNurse')}</li>
            <li>${i18next.t('medicalInfo.provider.type.certifiedNurseMidwife')}</li>
            <li>${i18next.t('medicalInfo.provider.type.certifiedNursePractitioner')}</li>
            <li>${i18next.t('medicalInfo.provider.type.certifiedProfessionalMidwife')}</li>
            <li>${i18next.t('medicalInfo.provider.type.chiropractor')}</li>
            <li>${i18next.t('medicalInfo.provider.type.clinicalNurseSpecialist')}</li>
            <li>${i18next.t('medicalInfo.provider.type.dentist')}</li>
            <li>${i18next.t('medicalInfo.provider.type.medicalDoctor')}</li>
            <li>${i18next.t('medicalInfo.provider.type.optometrist')}</li>
            <li>${i18next.t('medicalInfo.provider.type.physicianAssistant')}</li>
            <li>${i18next.t('medicalInfo.provider.type.podiatrist')}</li>
            <li>${i18next.t('medicalInfo.provider.type.psychologist')}</li>
          </ul>
        </div>


  <fieldset class="usa-fieldset">
    <legend id="provider-type-accepted-legend" class="usa-legend">
      <span class="required-asterisk">*</span>
      <strong id="providerTypeQuestionNumber" style="display:none;">1. </strong>
      ${i18next.t('medicalInfo.provider.type.isAccepted')}
    </legend>
    <div class="usa-radio">
      <input
        class="usa-radio__input"
        id="provider-type-accepted-yes"
        type="radio"
        name="provider-type-accepted"
        value="yes"
      
      />
      <label class="usa-radio__label" for="provider-type-accepted-yes">
        ${i18next.t('shared.yes')}
      </label>
    </div>
    <div class="usa-radio">
      <input
        class="usa-radio__input"
        id="provider-type-accepted-no"
        type="radio"
        name="provider-type-accepted"
        value="no"
      />
      <label class="usa-radio__label" for="provider-type-accepted-no">
        ${i18next.t('shared.no')}
      </label>
    </div>
        

    <div id="provider-type-alert" class="usa-alert usa-alert--warning usa-alert--slim" style="display: none; margin-top: 1rem;">
    <div class="usa-alert__body">
      <p class="usa-alert__text">
        ${i18next.t('medicalInfo.provider.notAcceptedMessage')}
      </p>
    </div>
  </div>


  </fieldset>



  `;
  fieldset.insertBefore(providerType, fieldset.firstChild);

  const providerYes = document.getElementById("provider-type-accepted-yes");
  const providerNo = document.getElementById("provider-type-accepted-no");
  const legend = document.getElementById("provider-type-accepted-legend");
  const providerAlert = document.getElementById('provider-type-alert');

  const sessionData = getSessionData();
  if (sessionData[STORAGE_KEY_PROVIDER_TYPE_ACCEPTED] === true) {
    providerYes.checked = true;
  } else if (sessionData[STORAGE_KEY_PROVIDER_TYPE_ACCEPTED] === false) {
    providerAlert.style.display = 'block';
    providerNo.checked = true;
  }

  providerYes.addEventListener('change', function () {
    providerAlert.style.display = 'none';
    resetElementText(legend);
    addToSessionData({
      [STORAGE_KEY_PROVIDER_TYPE_ACCEPTED]: true
    });
  });

  providerNo.addEventListener('change', function () {
    providerAlert.style.display = 'block';
    resetElementText(legend);
    addToSessionData({
      [STORAGE_KEY_PROVIDER_TYPE_ACCEPTED]: false
    });
  });

  providerYes.addEventListener('invalid', function () {
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
    const refreshedWorkersCompYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes');
    resetElementText(causedByJobLegend);
    workersCompContainer.style.display = 'block';
    refreshedWorkersCompNo.checked = false;
    refreshedWorkersCompYes.checked = false;
    addToSessionData({ [STORAGE_KEY_CAUSED_BY_JOB]: 'yes' });
  });

  causedByJobNo.addEventListener('change', function () {
    const refreshedWorkersCompNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo');
    const refreshedWorkersCompYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes');
    resetElementText(causedByJobLegend);
    workersCompContainer.style.display = 'none';
    refreshedWorkersCompYes.checked = false;
    refreshedWorkersCompNo.checked = true;
    addToSessionData({
      [STORAGE_KEY_CAUSED_BY_JOB]: 'no',
      [STORAGE_KEY_WORKERS_COMP]: null
    });
  });

  causedByJobYes.addEventListener('invalid', function () {
    elementTextError(causedByJobLegend);
  });
}

function matchNewFormDataToExisting() {
  const form = document.getElementById('form1');

  // frontend-only fields
  const causedByJobYes = document.getElementById('caused-by-job-yes');
  const causedByJobNo = document.getElementById('caused-by-job-no');
  const providerYes = document.getElementById("provider-type-accepted-yes");
  const providerNo = document.getElementById("provider-type-accepted-no");
  const causedByJobLegend = document.getElementById('caused-by-job-legend');

  form.addEventListener('submit', (event) => {
    const formData = new FormData(form);
    const correctPage = formFromCorrectPage(formData);

    if (correctPage && !causedByJobYes.checked && !causedByJobNo.checked) {
      event.preventDefault();
      elementTextError(causedByJobLegend);
      causedByJobYes.focus();
    } else {
      providerYes.removeAttribute('name');
      providerNo.removeAttribute('name');
      causedByJobYes.removeAttribute('name');
      causedByJobNo.removeAttribute('name');
      form.addEventListener('formdata', () => {
        providerYes.setAttribute('name', 'provider-type-accepted');
        providerNo.setAttribute('name', 'provider-type-accepted');
        causedByJobYes.setAttribute('name', 'caused-by-job');
        causedByJobNo.setAttribute('name', 'caused-by-job');
      }, { once: true });
    }
  });
}

function addWorkersCompListeners() {
  const workersCompYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes');
  const workersCompNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo');

  workersCompYes.addEventListener('change', function () {
    addToSessionData({ [STORAGE_KEY_WORKERS_COMP]: 'yes' });
  });

  workersCompNo.addEventListener('change', function () {
    addToSessionData({ [STORAGE_KEY_WORKERS_COMP]: 'no' });
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

  const causedByJobYes = document.getElementById('caused-by-job-yes');
  const causedByJobNo = document.getElementById('caused-by-job-no');
  const workersCompYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes');
  const workersCompNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo');
  const causedByJobQuestion = document.getElementById('causedByJobQuestion');
  const workersCompContainer = document.getElementById('workersCompContainer');

  if (reason === 'pregnancy') {
    causedByJobNo.checked = true;
    workersCompNo.checked = true;
    causedByJobQuestion.style.display = 'none';
    workersCompContainer.style.display = 'none';
    addToSessionData({
      [STORAGE_KEY_CAUSED_BY_JOB]: 'no',
      [STORAGE_KEY_WORKERS_COMP]: null
    });
  } else {
    // Show the caused-by-job question for illness/injury
    causedByJobQuestion.style.display = 'block';

    // Restore caused-by-job answer
    const savedCausedByJob = sessionData[STORAGE_KEY_CAUSED_BY_JOB];

    if (savedCausedByJob === 'yes') {
      causedByJobYes.checked = true;
      causedByJobNo.checked = false;
      workersCompContainer.style.display = 'block';

      // Restore workers comp answer
      const savedWorkersComp = sessionData[STORAGE_KEY_WORKERS_COMP];
      if (savedWorkersComp === 'yes') {
        workersCompYes.checked = true;
        workersCompNo.checked = false;
      } else if (savedWorkersComp === 'no') {
        workersCompYes.checked = false;
        workersCompNo.checked = true;
      } else {
        // No saved workers comp answer - reset both
        workersCompYes.checked = false;
        workersCompNo.checked = false;
      }
    } else if (savedCausedByJob === 'no') {
      causedByJobYes.checked = false;
      causedByJobNo.checked = true;
      workersCompContainer.style.display = 'none';
      workersCompYes.checked = false;
      workersCompNo.checked = true;
    } else {
      // No saved caused-by-job answer - reset both
      causedByJobYes.checked = false;
      causedByJobNo.checked = false;
      workersCompContainer.style.display = 'none';
      workersCompYes.checked = false;
      workersCompNo.checked = false;
    }
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
