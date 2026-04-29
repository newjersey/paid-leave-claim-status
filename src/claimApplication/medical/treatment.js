import i18next from 'i18next';
import { logEvent } from "../../modules/shared.mjs";
import {
  elementTextError,
  getSessionData,
  removeExtraSpaceBetweenRadioButtons,
  resetElementText,
  setNewTitle,
  STORAGE_KEY_REASON_FOR_LEAVE,
  addToSessionData,
  removeQuestionNumbersFromError,
  STORAGE_KEY_PROVIDER_TYPE_ACCEPTED,
  STORAGE_KEY_CAUSED_BY_JOB,
  STORAGE_KEY_WORKERS_COMP,
  STORAGE_KEY_EDITING_WORKERS_COMP,
  setRequiredForVisibleLeaveSectionFields,
  styleRadioButton,
  updateCalendarUI,
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
  styleRadioButtons();
  hideOldFieldset();
  addProviderScreener();
  moveUSAQuestionToNewFieldset();
  moveProviderContactToNewFieldset();
  addWorkersCompFieldset();
  moveERHospitalToNewFieldset();
  addWorkersCompListeners();
  loadReasonData();
  setNewTitle(i18next.t('medicalInfo.title'));
  addSubtitleAndExplainer();

  const sessionData = getSessionData();
  const reasonData = sessionData[STORAGE_KEY_REASON_FOR_LEAVE];
  const reason = reasonData?.reasons;

  setRequiredForVisibleLeaveSectionFields('medicalTreatment', reason);
  focusOnWorkersCompIfEditing();
  updateAllCalendars();
  removeQuestionNumbersFromError('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_lblDocError');
}

function addStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    .usa-label {
      text-align: left;
    }

    .usa-legend {
      margin-top: 0;
      padding: 0;
    }

    .usa-radio__label {
      text-align: left;
    }
  `;
  document.head.appendChild(style);
}

function addSubtitleAndExplainer() {
  const questionDiv = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor');
  const subtitleDiv = document.createElement('div');
  subtitleDiv.style.margin = "0 0 0";
  subtitleDiv.innerHTML = `
  <h2 style="font-size: 22px; font-weight: bold; color: black; font-variant: none" class="margin-bottom-1"> ${i18next.t('medicalInfo.provider.title')}</h2>
  <p class="margin-bottom-3">${i18next.t('medicalInfo.provider.explanation')}</p>`

  questionDiv.prepend(subtitleDiv);
}

function hideOldFieldset() {
  const oldFieldset = document.getElementById('divDocHosAdd').closest('fieldset');
  oldFieldset.style.display = 'none';
}

function addProviderScreener() {
  const submitBtn = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_btnDoc');
  const submitBtnContainer = submitBtn.closest('table');

  const fieldset = document.createElement('fieldset');
  fieldset.id = 'providerTypeFieldset';
  fieldset.classList.add('bordered-set');
  submitBtnContainer.insertAdjacentElement('beforebegin', fieldset);

  const providerType = document.createElement('div');
  providerType.id = 'providerTypeQuestion';
  providerType.style.margin = "0";
  providerType.style.padding = "0";
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

  <fieldset id="provider-type-accepted-fieldset" class="usa-fieldset">
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
    <div
      id="providerError"
      class="form-alert"
      style="display: none;"
      role="alert"
      aria-live="polite"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#B50909"/>
      </svg>
      ${i18next.t('shared.makeSelection')}
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
  const providerAcceptedFieldset = document.getElementById("provider-type-accepted-fieldset");
  const providerError = document.getElementById('providerError');
  const providerAlert = document.getElementById('provider-type-alert');

  const sessionData = getSessionData();
  if (sessionData[STORAGE_KEY_PROVIDER_TYPE_ACCEPTED] === true) {
    providerYes.checked = true;
  } else if (sessionData[STORAGE_KEY_PROVIDER_TYPE_ACCEPTED] === false) {
    providerAlert.style.display = 'block';
    providerNo.checked = true;
    logEvent('Medical Provider Type Warning Shown', {});
  }

  providerYes.addEventListener('change', function () {
    providerAlert.style.display = 'none';
    providerError.style.display = 'none';
    providerAcceptedFieldset.classList.remove('usa-form-group--error');
    addToSessionData({
      [STORAGE_KEY_PROVIDER_TYPE_ACCEPTED]: true
    });
  });

  providerNo.addEventListener('change', function () {
    providerAlert.style.display = 'block';
    providerError.style.display = 'none';
    providerAcceptedFieldset.classList.remove('usa-form-group--error');
    addToSessionData({
      [STORAGE_KEY_PROVIDER_TYPE_ACCEPTED]: false
    });
    logEvent('Medical Provider Type Warning Shown', {});
  });

  providerYes.addEventListener('invalid', function () {
    providerError.style.display = 'block';
    providerAcceptedFieldset.classList.add('usa-form-group--error');
    fieldset.scrollIntoView();
  });

  submitBtn.addEventListener('click', function() {
    if(providerNo?.checked) {
      logEvent('Medical Provider Type No Submitted', {});
    }
  });
}

function moveUSAQuestionToNewFieldset() {
  const usaContainer = document.createElement('div');
  usaContainer.id = 'usaContainer';
  usaContainer.classList.add('bordered-set');

  const usaFieldset = document.createElement('fieldset');
  usaFieldset.classList.add('usa-fieldset');
  usaContainer.append(usaFieldset);

  const usaLegend = document.createElement('legend');
  usaLegend.classList.add('usa-legend');
  usaLegend.textContent = i18next.t('medicalInfo.provider.inUSA');
  usaFieldset.append(usaLegend);
  usaLegend.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const yesButton = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbnDocAddYes');
  usaFieldset.append(yesButton.closest('div'));
    
  const noButton = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbnDocAddNo');
  usaFieldset.append(noButton.closest('div'));

  const oldQuestion = Array.from(document.querySelectorAll('a'))
    .find(a => a.textContent.includes('Is your doctor/hospital located in the United States?'));
  oldQuestion.style.display = 'none';

  const providerTypeFieldset = document.getElementById('providerTypeFieldset');
  providerTypeFieldset.insertAdjacentElement('afterend', usaContainer);

  yesButton.addEventListener('click', function () {
    const providerContactContainer = document.getElementById('providerContactContainer');
    const usaAddressContainer = document.getElementById('usaAddressContainer');
    const intlAddressContainer = document.getElementById('intlAddressContainer');
    providerContactContainer.style.display = 'block';
    usaAddressContainer.style.display = 'block';
    intlAddressContainer.style.display = 'none';
  });

  noButton.addEventListener('click', function () {
    const providerContactContainer = document.getElementById('providerContactContainer');
    const usaAddressContainer = document.getElementById('usaAddressContainer');
    const intlAddressContainer = document.getElementById('intlAddressContainer');
    providerContactContainer.style.display = 'block';
    usaAddressContainer.style.display = 'none';
    intlAddressContainer.style.display = 'block';
  });
}

function moveProviderContactToNewFieldset() {
  const providerContactContainer = document.createElement('div');
  providerContactContainer.id = 'providerContactContainer';
  providerContactContainer.classList.add('bordered-set', 'usa-fieldset');
  providerContactContainer.style.display = 'none';

  const providerContactLegend = document.createElement('legend');
  providerContactLegend.classList.add('usa-legend');
  providerContactLegend.textContent = i18next.t('medicalInfo.provider.info');
  providerContactLegend.style.fontWeight = 'bold';
  providerContactContainer.append(providerContactLegend);

  const nameLabel = document.createElement('label');
  nameLabel.classList.add('usa-label');
  nameLabel.textContent = i18next.t('medicalInfo.provider.name');
  nameLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocNm';
  providerContactContainer.append(nameLabel);
  nameLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const nameInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocNm');
  nameInput.classList.add('usa-input');
  nameInput.style.width = '100%';
  providerContactContainer.append(nameInput);

  const usaAddressContainer = document.createElement('div');
  usaAddressContainer.id = 'usaAddressContainer';
  usaAddressContainer.style.display = 'block';
  providerContactContainer.append(usaAddressContainer);

  const usaAddress1Label = document.createElement('label');
  usaAddress1Label.classList.add('usa-label');
  usaAddress1Label.textContent = i18next.t('contact.street1');
  usaAddress1Label.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocAdd1';
  usaAddressContainer.append(usaAddress1Label);
  usaAddress1Label.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const usaAddress1Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocAdd1');
  usaAddress1Input.classList.add('usa-input');
  usaAddress1Input.style.width = '100%';
  usaAddressContainer.append(usaAddress1Input);

  const usaAddress2Label = document.createElement('label');
  usaAddress2Label.classList.add('usa-label');
  usaAddress2Label.textContent = i18next.t('contact.street2');
  usaAddress2Label.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocAdd2';
  usaAddressContainer.append(usaAddress2Label);

  const usaAddress2Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocAdd2');
  usaAddress2Input.classList.add('usa-input');
  usaAddress2Input.style.width = '100%';
  usaAddressContainer.append(usaAddress2Input);

  const usaCityLabel = document.createElement('label');
  usaCityLabel.classList.add('usa-label');
  usaCityLabel.textContent = i18next.t('contact.city');
  usaCityLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocCity';
  usaAddressContainer.append(usaCityLabel);
  usaCityLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const usaCityInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocCity');
  usaCityInput.classList.add('usa-input');
  usaCityInput.style.width = '100%';
  usaAddressContainer.append(usaCityInput);

  const usaStateLabel = document.createElement('label');
  usaStateLabel.classList.add('usa-label');
  usaStateLabel.textContent = i18next.t('contact.stateOrTerritory');
  usaStateLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_ddlDocStates';
  usaAddressContainer.append(usaStateLabel);
  usaStateLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const usaStateSelect = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_ddlDocStates');
  usaStateSelect.classList.add('usa-select');
  usaAddressContainer.append(usaStateSelect);

  const zipLabel = document.createElement('label');
  zipLabel.classList.add('usa-label');
  zipLabel.textContent = i18next.t('contact.zipcode');
  zipLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocZip1';
  usaAddressContainer.append(zipLabel);
  zipLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const zipContainer = document.createElement('div');
  zipContainer.style.display = 'flex';
  zipContainer.style.alignItems = 'center';
  zipContainer.style.marginTop = '0.5rem';
  usaAddressContainer.append(zipContainer);

  const usaZip1Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocZip1');
  usaZip1Input.classList.add('usa-input');
  usaZip1Input.style.width = '80px';
  usaZip1Input.style.marginTop = '0';
  usaZip1Input.style.marginRight = '5px';
  zipContainer.append(usaZip1Input);
  usaZip1Input.insertAdjacentHTML('afterend', '-');

  const usaZip2Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocZip2');
  usaZip2Input.classList.add('usa-input');
  usaZip2Input.classList.add('usa-input');
  usaZip2Input.style.width = '60px';
  usaZip2Input.style.marginTop = '0';
  usaZip2Input.style.marginLeft = '5px';
  zipContainer.append(usaZip2Input);

  const intlAddressContainer = document.createElement('div');
  intlAddressContainer.id = 'intlAddressContainer';
  intlAddressContainer.style.display = 'none';
  providerContactContainer.append(intlAddressContainer);

  const intlAddressLabel = document.createElement('label');
  intlAddressLabel.classList.add('usa-label');
  intlAddressLabel.textContent = i18next.t('contact.address');
  intlAddressLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtOOCDocAdd1';
  intlAddressContainer.append(intlAddressLabel);
  intlAddressLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const intlAddress1Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtOOCDocAdd1');
  intlAddress1Input.classList.add('usa-input');
  intlAddress1Input.style.width = '100%';
  intlAddressContainer.append(intlAddress1Input);

  const intlAddress2Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtOOCDocAdd2');
  intlAddress2Input.classList.add('usa-input');
  intlAddress2Input.style.width = '100%';
  intlAddressContainer.append(intlAddress2Input);

  const intlAddress3Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtOOCDocAdd3');
  intlAddress3Input.classList.add('usa-input');
  intlAddress3Input.style.width = '100%';
  intlAddressContainer.append(intlAddress3Input);

  const intlAddress4Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtOOCDocAdd4');
  intlAddress4Input.classList.add('usa-input');
  intlAddress4Input.style.width = '100%';
  intlAddressContainer.append(intlAddress4Input);

  const phoneLabel = document.createElement('label');
  phoneLabel.classList.add('usa-label');
  phoneLabel.textContent = i18next.t('contact.phone');
  phoneLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocPh';
  providerContactContainer.append(phoneLabel);

  const phone1Input = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocPh");
  phone1Input.classList.add('usa-input');
  phone1Input.style.marginRight = '2px';
  phone1Input.style.marginTop = '0';
  phone1Input.style.width = '50px';

  const phone2Input = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocPh2");
  phone2Input.classList.add('usa-input');
  phone2Input.style.marginLeft = '2px';
  phone2Input.style.marginRight = '2px';
  phone2Input.style.marginTop = '0';
  phone2Input.style.width = '50px';

  const phone3Input = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocPh3");
  phone3Input.classList.add('usa-input');
  phone3Input.style.marginLeft = '2px';
  phone3Input.style.marginRight = '10px';
  phone3Input.style.marginTop = '0';
  phone3Input.style.width = '60px';

  const phone4Input = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtDocPh4");
  phone4Input.classList.add('usa-input');
  phone4Input.style.marginLeft = '2px';
  phone4Input.style.marginTop = '0';
  phone4Input.style.width = '70px';

  const phoneContainer = document.createElement('div');
  phoneContainer.style.display = 'flex';
  phoneContainer.style.alignItems = 'center';
  phoneContainer.style.marginTop = '0.5rem';
  phone1Input.insertAdjacentElement('beforebegin', phoneContainer);
  phoneContainer.append(phone1Input);
  phone1Input.insertAdjacentHTML('afterend', '-');
  phoneContainer.append(phone2Input);
  phone2Input.insertAdjacentHTML('afterend', '-');
  phoneContainer.append(phone3Input);
  phone3Input.insertAdjacentHTML('afterend', 'Ext.');
  phoneContainer.append(phone4Input);
  providerContactContainer.append(phoneContainer);

  const usaContainer = document.getElementById('usaContainer');
  usaContainer.insertAdjacentElement('afterend', providerContactContainer);
}

function moveERHospitalToNewFieldset() {
  const erYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnERYes');
  const erNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnERNO');

  const hospitalYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnHospYes');
  const hospitalNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnHospNo');

  // nothing to do once questions removed
  if (!erYes || !hospitalYes) {
    return;
  }

  const erHospitalContainer = document.createElement('div');
  erHospitalContainer.id = 'erHospitalContainer';
  erHospitalContainer.classList.add('bordered-set', 'usa-fieldset');

  const erLegend = document.createElement('legend');
  erLegend.classList.add('usa-legend');
  erLegend.textContent = 'Were you treated in the emergency room?';
  erHospitalContainer.append(erLegend);
  erLegend.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  erHospitalContainer.append(erYes.closest('div'));
  erHospitalContainer.append(erNo.closest('div'));

  const erDatesContainer = document.createElement('div');
  erDatesContainer.style.display = 'none';
  erHospitalContainer.append(erDatesContainer);

  const erStartLabel = document.createElement('label');
  erStartLabel.classList.add('usa-label');
  erStartLabel.textContent = 'Emergency room start date';
  erStartLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtERStDt';
  erDatesContainer.append(erStartLabel);
  erStartLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const erStartHint = document.createElement('div');
  erStartHint.id = 'erStartHint';
  erStartHint.classList.add("usa-hint");
  erStartHint.textContent = i18next.t('shared.dateFormat');
  erDatesContainer.append(erStartHint);

  const erStartInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtERStDt');
  erStartInput.classList.add('usa-input', 'dateInput');
  erStartInput.setAttribute('aria-describedby', 'erStartHint');
  const erStartCalendar = document.getElementById('Image8');

  const erStartDateInputContainer = document.createElement('div');
  erStartDateInputContainer.classList.add('dateInputContainer');
  erStartDateInputContainer.append(erStartInput);
  erStartDateInputContainer.append(erStartCalendar);
  erDatesContainer.append(erStartDateInputContainer);

  const erEndLabel = document.createElement('label');
  erEndLabel.classList.add('usa-label');
  erEndLabel.textContent = 'Emergency room end date';
  erEndLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtEREndDt';
  erDatesContainer.append(erEndLabel);
  erEndLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const erEndHint = document.createElement('div');
  erEndHint.id = 'erEndHint';
  erEndHint.classList.add("usa-hint");
  erEndHint.textContent = i18next.t('shared.dateFormat');
  erDatesContainer.append(erEndHint);

  const erEndInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtEREndDt');
  erEndInput.classList.add('usa-input', 'dateInput');
  erEndInput.setAttribute('aria-describedby', 'erEndHint');
  const erEndCalendar = document.getElementById('Image1');

  const erEndDateInputContainer = document.createElement('div');
  erEndDateInputContainer.classList.add('dateInputContainer');
  erEndDateInputContainer.append(erEndInput);
  erEndDateInputContainer.append(erEndCalendar);
  erDatesContainer.append(erEndDateInputContainer);

  const hospitalLegend = document.createElement('legend');
  hospitalLegend.classList.add('usa-legend');
  hospitalLegend.style.marginTop = '40px';
  hospitalLegend.textContent = 'Were you hospitalized for this disability?';
  erHospitalContainer.append(hospitalLegend);
  hospitalLegend.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  erHospitalContainer.append(hospitalYes.closest('div'));
  erHospitalContainer.append(hospitalNo.closest('div'));

  const hospitalDatesContainer = document.createElement('div');
  hospitalDatesContainer.style.display = 'none';
  erHospitalContainer.append(hospitalDatesContainer);

  const hospitalStartLabel = document.createElement('label');
  hospitalStartLabel.classList.add('usa-label');
  hospitalStartLabel.textContent = 'Hospitalization start date';
  hospitalStartLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospStDt';
  hospitalDatesContainer.append(hospitalStartLabel);
  hospitalStartLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const hospitalStartHint = document.createElement('div');
  hospitalStartHint.id = 'hospitalStartHint';
  hospitalStartHint.classList.add("usa-hint");
  hospitalStartHint.textContent = i18next.t('shared.dateFormat');
  hospitalDatesContainer.append(hospitalStartHint);

  const hospitalStartInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospStDt');
  hospitalStartInput.classList.add('usa-input', 'dateInput');
  hospitalStartInput.setAttribute('aria-describedby', 'hospitalStartHint');
  const hospitalStartCalendar = document.getElementById('Image2');

  const hospitalStartDateInputContainer = document.createElement('div');
  hospitalStartDateInputContainer.classList.add('dateInputContainer');
  hospitalStartDateInputContainer.append(hospitalStartInput);
  hospitalStartDateInputContainer.append(hospitalStartCalendar);
  hospitalDatesContainer.append(hospitalStartDateInputContainer);

  const hospitalEndLabel = document.createElement('label');
  hospitalEndLabel.classList.add('usa-label');
  hospitalEndLabel.textContent = 'Hospitalization end date';
  hospitalEndLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospEndDt';
  hospitalDatesContainer.append(hospitalEndLabel);
  hospitalEndLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const hospitalEndHint = document.createElement('div');
  hospitalEndHint.id = 'hospitalEndHint';
  hospitalEndHint.classList.add("usa-hint");
  hospitalEndHint.textContent = i18next.t('shared.dateFormat');
  hospitalDatesContainer.append(hospitalEndHint);

  const hospitalEndInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtHospEndDt');
  hospitalEndInput.classList.add('usa-input', 'dateInput');
  hospitalEndInput.setAttribute('aria-describedby', 'hospitalEndHint');
  const hospitalEndCalendar = document.getElementById('Image3');

  const hospitalEndDateInputContainer = document.createElement('div');
  hospitalEndDateInputContainer.classList.add('dateInputContainer');
  hospitalEndDateInputContainer.append(hospitalEndInput);
  hospitalEndDateInputContainer.append(hospitalEndCalendar);
  hospitalDatesContainer.append(hospitalEndDateInputContainer);
  
  const providerContactContainer = document.getElementById('providerContactContainer');
  providerContactContainer.insertAdjacentElement('afterend', erHospitalContainer);

  erYes.addEventListener('click', function () {
    erDatesContainer.style.display = 'block';
  });

  erNo.addEventListener('click', function () {
    erDatesContainer.style.display = 'none';
  });
  
  hospitalYes.addEventListener('click', function () {
    hospitalDatesContainer.style.display = 'block';
  });

  hospitalNo.addEventListener('click', function () {
    hospitalDatesContainer.style.display = 'none';
  });
}

function addWorkersCompFieldset() {
  const workersCompFieldset = document.createElement('fieldset');
  workersCompFieldset.id = 'workersCompFieldset';
  workersCompFieldset.classList.add('usa-fieldset', 'bordered-set');

  const providerContactContainer = document.getElementById('providerContactContainer');
  providerContactContainer.insertAdjacentElement('afterend', workersCompFieldset);

  const h2 = document.createElement('h2');
  h2.id = "workersCompensationHeader";
  h2.textContent = i18next.t('medicalInfo.work.title');
  h2.style.fontSize = "22px";
  h2.style.fontWeight = "bold";
  h2.style.color = "black";
  h2.style.fontVariant = "none";
  h2.style.marginTop = "40px";
  workersCompFieldset.insertAdjacentElement('beforebegin', h2);

  const causedByJobQuestion = document.createElement('div');
  causedByJobQuestion.id = "causedByJobQuestion";
  causedByJobQuestion.style.margin = "0 0 20px";
  causedByJobQuestion.innerHTML = `
    <fieldset class="usa-fieldset">
      <legend id="caused-by-job-legend" class="usa-legend usa-legend">
        <span class="required-asterisk">*</span>
        <span id="causedByJobText">${i18next.t('medicalInfo.work.causedByJob', { disabilityTypeString: i18next.t('shared.disability') })}</span>
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

  workersCompFieldset.append(causedByJobQuestion);

  const workersCompClaimContainer = document.createElement('fieldset');
  workersCompClaimContainer.classList.add('usa-fieldset');
  workersCompClaimContainer.style.display = 'none';
  workersCompFieldset.append(workersCompClaimContainer);

  const workersCompClaimLegend = document.createElement('legend');
  workersCompClaimLegend.classList.add('usa-legend');
  workersCompClaimLegend.innerHTML = i18next.t('medicalInfo.work.workersCompClaim');
  workersCompClaimContainer.append(workersCompClaimLegend);
  workersCompClaimLegend.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const workersCompClaimYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes').closest('div');
  workersCompClaimContainer.append(workersCompClaimYes);

  const workersCompClaimNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo').closest('div');
  workersCompClaimContainer.append(workersCompClaimNo);

  const causedByJobYes = document.getElementById('caused-by-job-yes');
  const causedByJobNo = document.getElementById('caused-by-job-no');
  const causedByJobLegend = document.getElementById('caused-by-job-legend');

  causedByJobYes.addEventListener('change', function () {
    const refreshedWorkersCompNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo');
    const refreshedWorkersCompYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes');
    resetElementText(causedByJobLegend);
    workersCompClaimContainer.style.display = 'block';
    refreshedWorkersCompNo.checked = false;
    refreshedWorkersCompYes.checked = false;
    addToSessionData({ [STORAGE_KEY_CAUSED_BY_JOB]: 'yes' });
  });

  causedByJobNo.addEventListener('change', function () {
    const refreshedWorkersCompNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjNo');
    const refreshedWorkersCompYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_rbtnInjYes');
    resetElementText(causedByJobLegend);
    workersCompClaimContainer.style.display = 'none';
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
  const workersCompensationHeader = document.getElementById('workersCompensationHeader');
  const workersCompFieldset = document.getElementById('workersCompFieldset');
  const causedByJobQuestion = document.getElementById('causedByJobQuestion');

  if (reason === 'pregnancy') {
    causedByJobNo.checked = true;
    workersCompNo.checked = true;
    workersCompensationHeader.style.display = 'none';
    workersCompFieldset.style.display = 'none';
    causedByJobQuestion.style.display = 'none';
    addToSessionData({
      [STORAGE_KEY_CAUSED_BY_JOB]: 'no',
      [STORAGE_KEY_WORKERS_COMP]: null
    });
  } else {
    // Show the caused-by-job question for illness/injury
    workersCompensationHeader.style.display = 'block';
    workersCompFieldset.style.display = 'block';
    causedByJobQuestion.style.display = 'block';

    const causedByJobText = document.getElementById('causedByJobText');
    const disabilityTypeString = reason === 'illness' ? i18next.t('shared.illness') : i18next.t('shared.injury');
    causedByJobText.textContent = i18next.t('medicalInfo.work.causedByJob', { disabilityTypeString });

    // Restore caused-by-job answer
    const savedCausedByJob = sessionData[STORAGE_KEY_CAUSED_BY_JOB];

    if (savedCausedByJob === 'yes') {
      causedByJobYes.click();
      causedByJobNo.checked = false;

      // Restore workers comp answer
      const savedWorkersComp = sessionData[STORAGE_KEY_WORKERS_COMP];
      if (savedWorkersComp === 'yes') {
        workersCompYes.click();
      } else if (savedWorkersComp === 'no') {
        workersCompNo.click();
      } else {
        // No saved workers comp answer - reset both
        workersCompYes.checked = false;
        workersCompNo.checked = false;
      }
    } else if (savedCausedByJob === 'no') {
      causedByJobNo.click();
    } else {
      // No saved caused-by-job answer - reset both
      causedByJobYes.checked = false;
      causedByJobNo.checked = false;
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

function focusOnWorkersCompIfEditing() {
  const sessionData = getSessionData();
  const editingWorkersComp = sessionData[STORAGE_KEY_EDITING_WORKERS_COMP];

  if (editingWorkersComp) {
    const workersCompHeader = document.getElementById('workersCompensationHeader');
    const causedByJobYes = document.getElementById('caused-by-job-yes');
    const causedByJobNo = document.getElementById('caused-by-job-no');

    if (workersCompHeader && causedByJobYes && causedByJobNo) {
      workersCompHeader.scrollIntoView();
      if (causedByJobYes.checked) {
        causedByJobYes.focus();
      } else {
        causedByJobNo.focus();
      }
    }
    addToSessionData({
      [STORAGE_KEY_EDITING_WORKERS_COMP]: undefined
    });
  }
}

// not needed once questions removed at .NET layer
function updateAllCalendars() {
  const ERStartId = 'Image8';
  const EREndId = 'Image1';
  const hospitalStartId = 'Image2';
  const hospitalEndId = 'Image3';

  updateCalendarUI(ERStartId);
  updateCalendarUI(EREndId);
  updateCalendarUI(hospitalStartId);
  updateCalendarUI(hospitalEndId);
}
