import i18next from 'i18next';
import {
  clearTextNodes,
  formattedDateFromField,
  logout,
  updateCalendarUI,
} from '../utils';

export const employerDetailsLabels = [
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpNm', label: 'Employer Name' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd1', label: 'Employer Address Line 1' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd2', label: 'Employer Address Line 2' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpCity', label: 'Employer City' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_ddlEmpStates', label: 'Employer State' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip1', label: 'Employer Zipcode 1' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip2', label: 'Employer Zipcode 2' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA', label: 'Employer Phone First 3 Digits' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo1', label: 'Employer Phone Digits 4, 5, and 6' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo2', label: 'Employer Phone Last 4 Digits' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoX', label: 'Employer Phone Extension' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt', label: 'Employment Start Date' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt', label: 'Employment End Date' },
];

export const id = "employerDetails";

export const identifyingContent = {
  id,
  elementId: 'divEmp',
  text: 'Employers Details',
};

export function changes() {
  addStyles();
  rearrangeAddressFieldset();
  stillWorkHereFieldset();
  dateRangeFieldset();
  hideUnusedElements();
  updateAllCalendars();
  stillWorkHereListeners();
  endDateListener();
  cancelButtonDoesNotRequireRadioButtons();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    #ContentPlaceHolder1_TabEmployment, #ContentPlaceHolder1_TabEmployment_body {
      background-color: #FBFCFD !important;
      padding: 0 !important;
    }

    .usa-form-group--error {
      margin-top: 0;
    }

    .usa-hint {
      margin-top: 0.5rem;
    }

    .usa-label {
      max-width: 100%;
    }
  `;
  document.head.appendChild(style);
}

function rearrangeAddressFieldset() {
  const addressFieldset = document.querySelector("#divEmp > fieldset");
  addressFieldset.id = 'address-fieldset';
  addressFieldset.classList.add('usa-fieldset', 'bordered-set');

  const addressLegend = document.querySelector("#divEmp > fieldset > legend");
  addressLegend.nextSibling.nextSibling.remove();
  addressLegend.remove();

  const addressContainer = document.getElementById('divClEmpDet');
  clearTextNodes(addressContainer);
  
  const nameLabel = document.createElement('label');
  nameLabel.classList.add('usa-label');
  nameLabel.textContent = i18next.t('employerDetails.name');
  nameLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpNm';
  nameLabel.style.marginTop = '0';
  addressContainer.prepend(nameLabel);
  nameLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const nameInput = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpNm");
  nameInput.classList.add('usa-input');
  nameInput.style.width = '100%';
  nameLabel.insertAdjacentElement('afterend', nameInput);

  const address1Label = document.createElement('label');
  address1Label.classList.add('usa-label');
  address1Label.textContent = i18next.t('contact.street1');
  address1Label.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd1';
  nameInput.insertAdjacentElement('afterend', address1Label);
  address1Label.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const address1Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd1");
  address1Input.classList.add('usa-input');
  address1Input.style.width = '100%';
  address1Label.insertAdjacentElement('afterend', address1Input);

  const address2Label = document.createElement('label');
  address2Label.classList.add('usa-label');
  address2Label.textContent = i18next.t('contact.street2');
  address2Label.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd2';
  address1Input.insertAdjacentElement('afterend', address2Label);

  const address2Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd2");
  address2Input.classList.add('usa-input');
  address2Input.style.width = '100%';
  address2Label.insertAdjacentElement('afterend', address2Input);

  const cityLabel = document.createElement('label');
  cityLabel.classList.add('usa-label');
  cityLabel.textContent = i18next.t('contact.city');
  cityLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpCity';
  address2Input.insertAdjacentElement('afterend', cityLabel);
  cityLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const cityInput = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpCity");
  cityInput.classList.add('usa-input');
  cityInput.style.width = '100%';
  cityLabel.insertAdjacentElement('afterend', cityInput);

  const stateLabel = document.createElement('label');
  stateLabel.classList.add('usa-label');
  stateLabel.textContent = i18next.t('contact.stateOrTerritory');
  stateLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_ddlEmpStates';
  cityInput.insertAdjacentElement('afterend', stateLabel);
  stateLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const stateSelect = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_ddlEmpStates");
  stateSelect.classList.add('usa-select');
  stateSelect.style.height = 'auto';
  stateSelect.style.width = '160px';
  stateLabel.insertAdjacentElement('afterend', stateSelect);

  const oldZipLabel = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_lblAddEmpZip');
  oldZipLabel.remove();

  const zipLabel = document.createElement('label');
  zipLabel.classList.add('usa-label');
  zipLabel.textContent = i18next.t('contact.zipcode');
  zipLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip1';
  stateSelect.insertAdjacentElement('afterend', zipLabel);
  zipLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const zipContainer = document.getElementById('divAddEmpZip');
  zipContainer.style.display = 'flex';
  zipContainer.style.alignItems = 'center';
  zipContainer.style.marginTop = '0.5rem';
  zipLabel.insertAdjacentElement('afterend', zipContainer);

  const zip1Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip1");
  zip1Input.classList.add('usa-input');
  zip1Input.style.width = '80px';
  zip1Input.style.marginTop = '0';
  zip1Input.style.marginRight = '5px';
  zip1Input.insertAdjacentHTML('afterend', '-');

  const zip2Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip2");
  zip2Input.classList.add('usa-input');
  zip2Input.style.width = '60px';
  zip2Input.style.marginTop = '0';
  zip2Input.style.marginLeft = '5px';

  const intlZipInput = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZipOOC');
  intlZipInput.classList.add('usa-input');
  intlZipInput.style.display = 'none';
  intlZipInput.style.width = '140px';
  zipLabel.insertAdjacentElement('afterend', intlZipInput);

  const countryLabel = document.createElement('label');
  countryLabel.classList.add('usa-label');
  countryLabel.style.display = 'none';
  countryLabel.textContent = i18next.t('contact.country');
  countryLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_ddlAddEmpCtry';
  intlZipInput.insertAdjacentElement('afterend', countryLabel);
  countryLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const countrySelect = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_ddlAddEmpCtry');
  countrySelect.classList.add('usa-select');
  countrySelect.style.display = 'none';
  countrySelect.style.height = 'auto';
  countrySelect.style.width = '400px';
  countryLabel.insertAdjacentElement('afterend', countrySelect);

  const phoneLabel = document.createElement('label');
  phoneLabel.classList.add('usa-label');
  phoneLabel.textContent = i18next.t('contact.phone');
  phoneLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA';
  zipContainer.insertAdjacentElement('afterend', phoneLabel);
  phoneLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const phone1Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA");
  phone1Input.classList.add('usa-input');
  phone1Input.style.marginRight = '2px';
  phone1Input.style.marginTop = '0';
  phone1Input.style.width = '50px';

  const phone2Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo1");
  phone2Input.classList.add('usa-input');
  phone2Input.style.marginLeft = '2px';
  phone2Input.style.marginRight = '2px';
  phone2Input.style.marginTop = '0';
  phone2Input.style.width = '50px';

  const phone3Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo2");
  phone3Input.classList.add('usa-input');
  phone3Input.style.marginLeft = '2px';
  phone3Input.style.marginRight = '10px';
  phone3Input.style.marginTop = '0';
  phone3Input.style.width = '60px';

  const phone4Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoX");
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
  phoneContainer.nextSibling.remove();
  phoneContainer.nextSibling.remove();
  phoneContainer.nextSibling.remove();
  phoneLabel.insertAdjacentElement('afterend', phoneContainer);

  const startDateInput = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt");
  startDateInput.classList.add('usa-input');

  const endDateInput = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt");
  endDateInput.classList.add('usa-input');

  stateSelect.addEventListener('change', function () {
    if (stateSelect.value == 0) {
      zipLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZipOOC';
      intlZipInput.style.display = 'block';
      countryLabel.style.display = 'block';
      countrySelect.style.display = 'block';
      zipContainer.style.display = 'none';
    } else {
      zipLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip1';
      zipContainer.style.display = 'flex';
      intlZipInput.style.display = 'none';
      countryLabel.style.display = 'none';
      countrySelect.style.display = 'none';
    }
  });
}

function stillWorkHereFieldset() {
  const addressFieldset = document.getElementById('address-fieldset');
  const stillWorkHereContainer = document.createElement('div');
  stillWorkHereContainer.id = 'stillWorkHereContainer';
  stillWorkHereContainer.classList.add('bordered-set');
  stillWorkHereContainer.innerHTML = `
    <fieldset id="still-work-here-fieldset" class="usa-fieldset">
      <legend class="usa-legend">
        <span class="required-asterisk">*</span> ${i18next.t('employerDetails.stillWorkHere')}
      </legend>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="still-work-here-yes"
          type="radio"
          name="still-work-here"
          value="yes"
          required
        />
        <label class="usa-radio__label" for="still-work-here-yes">${i18next.t('shared.yes')}</label>
      </div>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="still-work-here-no"
          type="radio"
          name="still-work-here"
          value="no"
        />
        <label class="usa-radio__label" for="still-work-here-no">${i18next.t('shared.no')}</label>
      </div>
      <div
        id="still-work-here-error"
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
    </fieldset>
  `;

  addressFieldset.insertAdjacentElement('afterend', stillWorkHereContainer);
}

function dateRangeFieldset() {
  const stillWorkHereContainer = document.getElementById('stillWorkHereContainer');
  const dateRangeFieldset = document.createElement('fieldset');
  dateRangeFieldset.id = 'dateRangeFieldset';
  dateRangeFieldset.classList.add('bordered-set', 'usa-fieldset');
  dateRangeFieldset.style.display = 'none';

  const startLabel = document.createElement('label');
  startLabel.classList.add('usa-label');
  startLabel.style.marginTop = '0';
  startLabel.textContent = i18next.t('employerDetails.startLabel');
  startLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt';
  dateRangeFieldset.append(startLabel);
  startLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const startHint = document.createElement('div');
  startHint.id = 'employment-start-hint';
  startHint.classList.add("usa-hint");
  startHint.textContent = i18next.t('employerDetails.startHint');
  dateRangeFieldset.append(startHint);

  const startFormatHint = document.createElement('div');
  startFormatHint.id = 'employment-start-format-hint';
  startFormatHint.classList.add("usa-hint");
  startFormatHint.textContent = i18next.t('shared.dateFormat');
  dateRangeFieldset.append(startFormatHint);

  const startInput = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt');
  startInput.classList.add('dateInput');
  startInput.setAttribute('aria-describedby', 'employment-start-hint employment-start-format-hint');
  const startCalendar = document.getElementById('Image2');

  const startDateInputContainer = document.createElement('div');
  startDateInputContainer.classList.add('dateInputContainer');
  startDateInputContainer.append(startInput);
  startDateInputContainer.append(startCalendar);
  dateRangeFieldset.append(startDateInputContainer);

  const endLabel = document.createElement('label');
  endLabel.id = 'employment-end-label';
  endLabel.classList.add('usa-label');
  endLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt';
  dateRangeFieldset.append(endLabel);

  const endHint = document.createElement('div');
  endHint.id = 'employment-end-hint';
  endHint.classList.add("usa-hint");
  dateRangeFieldset.append(endHint);

  const endFormatHint = document.createElement('div');
  endFormatHint.id = 'employment-end-format-hint';
  endFormatHint.classList.add("usa-hint");
  endFormatHint.textContent = i18next.t('shared.dateFormat');
  dateRangeFieldset.append(endFormatHint);

  const endInput = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt');
  endInput.classList.add('dateInput');
  endInput.setAttribute('aria-describedby', 'employment-end-hint employment-end-format-hint');
  const endCalendar = document.getElementById('Image4');

  const endDateInputContainer = document.createElement('div');
  endDateInputContainer.classList.add('dateInputContainer');
  endDateInputContainer.append(endInput);
  endDateInputContainer.append(endCalendar);
  dateRangeFieldset.append(endDateInputContainer);

  const lastDayOfWork = formattedDateFromField('ContentPlaceHolder1_TabEmployment_tbpnlEMP_hdnClmtLWD');
  const endInfo = document.createElement('div');
  endInfo.id = 'employment-end-info';
  endInfo.classList.add("usa-alert", "usa-alert--info", "usa-alert--slim");
  endInfo.innerHTML = `
    <div class="usa-alert__body">
      <p class="usa-alert__text">
        ${i18next.t('employerDetails.endInfo', { lastDayOfWork })}
      </p>
    </div>
  `;
  dateRangeFieldset.append(endInfo);

  const endWarning = document.createElement('div');
  endWarning.id = 'employment-end-warning';
  endWarning.style.display = 'none';
  endWarning.classList.add("usa-alert", "usa-alert--warning", "usa-alert--slim");
  endWarning.innerHTML = `
    <div class="usa-alert__body">
      <p class="usa-alert__text" id="employment-end-warning-text-before-fdd">
        ${i18next.t('employerDetails.endWarning', { lastDayOfWork })}
      </p>
      <p class="usa-alert__text" id="employment-end-warning-text-on-fdd">
        ${i18next.t('employerDetails.endWarningOnFDD', { lastDayOfWork })}
      </p>
    </div>
  `;
  dateRangeFieldset.append(endWarning);

  const updateLink = dateRangeFieldset.querySelector('#update-last-day-link');
  if (updateLink) {
    updateLink.addEventListener('click', function (event) {
      event.preventDefault();
      logout(true);
    });
  }

  stillWorkHereContainer.insertAdjacentElement('afterend', dateRangeFieldset);
}

function hideUnusedElements() {
  const oldPhoneDiv = document.getElementById('divClEmpTelVal');
  oldPhoneDiv.previousElementSibling.style.display = 'none';

  const table = document.getElementById('divAddEmplyrName').closest('table');
  table.style.display = 'none';
  table.nextElementSibling.style.display = 'none';
  table.nextElementSibling.nextElementSibling.style.display = 'none';
}

function updateAllCalendars() {
  const employedFromId = 'Image2';
  const employedToId = 'Image4';

  updateCalendarUI(employedFromId);
  updateCalendarUI(employedToId);
}

function stillWorkHereListeners() {
  const stillWorkHereError = document.getElementById('still-work-here-error');
  const stillWorkHereFieldset = document.getElementById('still-work-here-fieldset');
  const stillWorkHereYes = document.getElementById('still-work-here-yes');
  const stillWorkHereNo = document.getElementById('still-work-here-no');
  const dateRangeFieldset = document.getElementById('dateRangeFieldset');
  const employmentEndLabel = document.getElementById('employment-end-label');
  const employmentEndHint = document.getElementById('employment-end-hint');
  const employmentEndInfo = document.getElementById('employment-end-info');

  const firstDayOfDisability = formattedDateFromField('ContentPlaceHolder1_TabEmployment_tbpnlEMP_hdnFDDate');

  stillWorkHereYes.addEventListener('change', function () {
    stillWorkHereError.style.display = 'none';
    stillWorkHereFieldset.classList.remove('usa-form-group--error');
    dateRangeFieldset.style.display = 'block';
    employmentEndLabel.textContent = i18next.t('employerDetails.endLabel', { context: 'current', firstDayOfDisability });
    employmentEndLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);
    employmentEndHint.textContent = i18next.t('employerDetails.endHint');
    employmentEndInfo.style.display = 'block';
  });

  stillWorkHereNo.addEventListener('change', function () {
    stillWorkHereError.style.display = 'none';
    stillWorkHereFieldset.classList.remove('usa-form-group--error');
    dateRangeFieldset.style.display = 'block';
    employmentEndLabel.textContent = i18next.t('employerDetails.endLabel');
    employmentEndLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);
    employmentEndHint.textContent = '';
    employmentEndInfo.style.display = 'none';
  });

  stillWorkHereYes.addEventListener('invalid', function () {
    stillWorkHereError.style.display = 'block';
    stillWorkHereFieldset.classList.add('usa-form-group--error');
  });
}

function endDateListener() {
  const employmentEndWarning = document.getElementById('employment-end-warning');
  const employmentEndWarningTextBeforeFDD = document.getElementById('employment-end-warning-text-before-fdd');
  const employmentEndWarningTextOnFDD = document.getElementById('employment-end-warning-text-on-fdd');

  const endInput = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt');

  const firstDayOfDisability = document.getElementById('ContentPlaceHolder1_TabEmployment_tbpnlEMP_hdnFDDate').value;
  const firstDayOfDisabilityDate = new Date(firstDayOfDisability).getTime();
  const lastDayOfWork = document.getElementById('ContentPlaceHolder1_TabEmployment_tbpnlEMP_hdnClmtLWD').value;
  const lastDayOfWorkDate = new Date(lastDayOfWork).getTime();

  endInput.addEventListener('blur', function() {
    if (!this.value) {
      employmentEndWarning.style.display = 'none';
      return;
    }

    const endDate = new Date(this.value).getTime();

    if (endDate === firstDayOfDisabilityDate) {
      employmentEndWarning.style.display = 'block';
      employmentEndWarningTextBeforeFDD.style.display = 'none';
      employmentEndWarningTextOnFDD.style.display = 'block';
    } else if (endDate > lastDayOfWorkDate) {
      employmentEndWarning.style.display = 'block';
      employmentEndWarningTextBeforeFDD.style.display = 'block';
      employmentEndWarningTextOnFDD.style.display = 'none';
    } else {
      employmentEndWarning.style.display = 'none';
    }
  });
}

function cancelButtonDoesNotRequireRadioButtons() {
  const cancelButton = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnCancelEmp1');
  const stillWorkHereYes = document.getElementById('still-work-here-yes');

  cancelButton.addEventListener('click', function() {
    stillWorkHereYes.removeAttribute('required');
  });
}
