import i18next from 'i18next';
import {
  formattedDateFromField,
  updateCalendarUI,
} from '../utils';

export const id = "incompleteEmployer";

export const identifyingContent = {
  id,
  elementId: 'divWorkedEmployer',
  text: 'Did you work for',
};

export function changes() {
  addStyles();
  rearrangeDidYouWorkQuestion();
  rearrangeAddressFieldset();
  stillWorkHereFieldset();
  dateRangeFieldset();
  hideUnusedElements();
  stillWorkHereListeners();
  updateCalendars();
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
  `;
  document.head.appendChild(style);
}

function rearrangeDidYouWorkQuestion() {
  const divWorkedEmployer = document.getElementById('divWorkedEmployer');
  divWorkedEmployer.classList.add('bordered-set');
  const existingQuestion = document.querySelector('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_lblWrkEmployerName');
  const yesRadio = document.querySelector('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes');
  const yesLabel = document.querySelector('label[for="ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes"]');
  const noRadio = document.querySelector('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerNo');
  const noLabel = document.querySelector('label[for="ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerNo"]');

  const fieldset = document.createElement('fieldset');
  fieldset.className = 'usa-fieldset';

  const legend = document.createElement('legend');
  legend.className = 'usa-legend';
  legend.textContent = existingQuestion.textContent;

  fieldset.appendChild(legend);

  const yesContainer = document.createElement('div');
  yesContainer.className = 'usa-radio';
  yesRadio.classList.add('usa-radio__input');
  yesLabel.classList.add('usa-radio__label');
  yesContainer.appendChild(yesRadio);
  yesContainer.appendChild(yesLabel);

  const noContainer = document.createElement('div');
  noContainer.className = 'usa-radio';
  noRadio.classList.add('usa-radio__input');
  noLabel.classList.add('usa-radio__label');
  noLabel.style.marginBottom = '20px';
  noContainer.appendChild(noRadio);
  noContainer.appendChild(noLabel);

  fieldset.appendChild(yesContainer);
  fieldset.appendChild(noContainer);

  divWorkedEmployer.innerHTML = '';
  divWorkedEmployer.appendChild(fieldset);
}

function updateCalendars() {
  updateCalendarUI("Image2");
  updateCalendarUI("Image4");
}

function rearrangeAddressFieldset() {
  const addressFieldset = document.querySelector("#divEmp > fieldset");
  addressFieldset.id = 'address-fieldset';
  addressFieldset.classList.add('usa-fieldset', 'bordered-set');

  const addressLegend = document.querySelector("#divEmp > fieldset > legend");
  addressLegend.remove();

  const addressDetails = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_lblEmpDet');

  const phoneLabel = document.createElement('label');
  phoneLabel.classList.add('usa-label');
  phoneLabel.textContent = i18next.t('contact.phone');
  phoneLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA';
  addressDetails.insertAdjacentElement('afterend', phoneLabel);
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

  phoneContainer.nextElementSibling.remove();
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

  const firstDayOfDisability = formattedDateFromField('ContentPlaceHolder1_TabEmployment_tbpnlEMP_hdnFDDate');

  const endError = document.createElement('div');
  endError.id = 'employment-end-error';
  endError.style.display = 'none';
  endError.classList.add("usa-alert", "usa-alert--error", "usa-alert--slim");
  endError.innerHTML = `
    <div class="usa-alert__body">
      <p class="usa-alert__text" id="employment-end-error-text">
        ${i18next.t('employerDetails.endError', { firstDayOfDisability })}
      </p>
    </div>
  `;
  dateRangeFieldset.append(endError);

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
  const oldPhoneInput = document.getElementById("divExtEmplPhone");
  oldPhoneInput.style.display = 'none';

  const table = document.getElementById('divAddEmplyrName').closest('table');
  table.style.display = 'none';
  table.nextElementSibling.style.display = 'none';
  table.nextElementSibling.nextElementSibling.style.display = 'none';
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
  const employmentEndWarning= document.getElementById('employment-end-warning');

  const firstDayOfDisability = formattedDateFromField('ContentPlaceHolder1_TabEmployment_tbpnlEMP_hdnFDDate');

  stillWorkHereYes.addEventListener('change', function () {
    stillWorkHereError.style.display = 'none';
    stillWorkHereFieldset.classList.remove('usa-form-group--error');
    dateRangeFieldset.style.display = 'block';
    employmentEndLabel.textContent = i18next.t('employerDetails.endLabel', { context: 'current', firstDayOfDisability });
    employmentEndLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);
    employmentEndHint.textContent = i18next.t('employerDetails.endHint');
    employmentEndInfo.style.display = employmentEndWarning.style.display == 'none' ? 'block' : 'none';
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
  const stillWorkHereNo = document.getElementById('still-work-here-no');

  const employmentEndInfo = document.getElementById('employment-end-info');
  const employmentEndWarning = document.getElementById('employment-end-warning');
  const employmentEndWarningTextBeforeFDD = document.getElementById('employment-end-warning-text-before-fdd');
  const employmentEndWarningTextOnFDD = document.getElementById('employment-end-warning-text-on-fdd');
  const employmentEndError = document.getElementById('employment-end-error');

  const endInput = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt');

  const firstDayOfDisability = document.getElementById('ContentPlaceHolder1_TabEmployment_tbpnlEMP_hdnFDDate').value;
  const firstDayOfDisabilityDate = new Date(firstDayOfDisability).getTime();
  const lastDayOfWork = document.getElementById('ContentPlaceHolder1_TabEmployment_tbpnlEMP_hdnClmtLWD').value;
  const lastDayOfWorkDate = new Date(lastDayOfWork).getTime();

  const validateEndDate = function(dateField) {
    if (dateField.id != endInput.id) {
      return;
    }

    if (!endInput.value || endInput.value.length < 10) {
      employmentEndInfo.style.display = stillWorkHereNo.checked ? 'none' : 'block';
      employmentEndWarning.style.display = 'none';
      employmentEndError.style.display = 'none';
      return;
    }

    const endDate = new Date(endInput.value).getTime();
    employmentEndInfo.style.display = 'none';

    if (endDate > firstDayOfDisabilityDate) {
      employmentEndError.style.display = 'block';
      employmentEndWarning.style.display = 'none';
    } else if (endDate === firstDayOfDisabilityDate) {
      employmentEndError.style.display = 'none';
      employmentEndWarning.style.display = 'block';
      employmentEndWarningTextBeforeFDD.style.display = 'none';
      employmentEndWarningTextOnFDD.style.display = 'block';
    } else if (endDate > lastDayOfWorkDate) {
      employmentEndError.style.display = 'none';
      employmentEndWarning.style.display = 'block';
      employmentEndWarningTextBeforeFDD.style.display = 'block';
      employmentEndWarningTextOnFDD.style.display = 'none';
    } else {
      employmentEndError.style.display = 'none';
      employmentEndWarning.style.display = 'none';
    }
  };

  document.addEventListener('calendarDateSelected', (event) => {validateEndDate(document.getElementById(event.detail.dateFieldId))});
  endInput.addEventListener('input', (event) => {validateEndDate(event.target)});
  endInput.addEventListener('change', (event) => {validateEndDate(event.target)});
  endInput.addEventListener('focus', (event) => {validateEndDate(event.target)});
}

function cancelButtonDoesNotRequireRadioButtons() {
  const cancelButton = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_btnCancelEmp1');
  const didNotWorkHereButton = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_BtnDelete');
  const stillWorkHereYes = document.getElementById('still-work-here-yes');

  const removeRequired = function() {
    stillWorkHereYes.removeAttribute('required');
  };

  cancelButton.addEventListener('click', removeRequired);
  didNotWorkHereButton.addEventListener('click', removeRequired);
}
