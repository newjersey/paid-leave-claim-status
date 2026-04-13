import i18next from 'i18next';
import { logEvent } from "../../modules/shared.mjs";
import {
  setNewTitle,
  updateCalendarUI,
} from '../utils';

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
  addStyles();
  replaceRadioButtonsWithCheckboxes();
  rearrangeFollowups();
  restyleFollowups();
  addCheckboxListeners();
  addOptionsToTDIStates();
  replaceQuestionNumbersInErrors();

  addEmployerBenefitsIfNeeded(); // remove once underlying question removed

  setNewTitle(i18next.t('otherBenefits.title'));
  updateCalendars();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    .required-asterisk-inline {
      margin-right: 3px;
    }

    .usa-radio {
      padding: 0;
    }

    #ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits fieldset {
      display: none !important;
    }

    #ContentPlaceHolder1_ClaimantDisabilityTab_body h2,
    #ContentPlaceHolder1_ClaimantDisabilityTab_body h3 {
      font-weight: bold;
      color: black;
    }

    #ContentPlaceHolder1_ClaimantDisabilityTab_body h2 {
      margin: 40px 0 20px;
    }

    #warning-ssdi .usa-alert__body {
      padding-left: 40px;
    }

    #new-other-benefits-form fieldset div {
      padding: 5px 0;
    }

    #new-other-benefits-form label,
    #new-other-benefits-form p {
      font-size: 16px;
      margin-left: 0;
      text-align: left;
    }

    #Image10 {
      padding-bottom: 0;
    }

    .dateInputContainer {
      display: flex;
      align-items: center;
    }

    #warning-ssdi p {
      margin-left: 10px;
    }
  `;
  document.head.appendChild(style);
}

function formattedDateFromField(id) {
  const field = document.getElementById(id);
  const date = new Date(field.value);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

function getPromptText() {
  const firstDayOfDisability = formattedDateFromField('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt');
  const returnedYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes');
  if (returnedYes && returnedYes.checked) {
    const returnedToWorkDay = formattedDateFromField('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk');
    return i18next.t('otherBenefits.areYouReceivingOrApplied', { context: 'returned', firstDayOfDisability, returnedToWorkDay });
  } else {
    return i18next.t('otherBenefits.areYouReceivingOrApplied', { firstDayOfDisability });
  }
}

function replaceRadioButtonsWithCheckboxes() {
  const existingForm = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits');
  const newForm = document.createElement('div');
  newForm.id = "new-other-benefits-form";
  newForm.innerHTML = `
    <div class="bordered-set">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend" style="margin-top: 0;">
          <span class="required-asterisk">*</span>
          ${getPromptText()}
        </legend>
        <div class="usa-checkbox">
          <input
            class="usa-checkbox__input"
            id="check-ssdi"
            type="checkbox"
            name="other-benefits"
            value="ssdi"
          />
          <label class="usa-checkbox__label" for="check-ssdi">${i18next.t('otherBenefits.ssdi.title')}</label>
        </div>
        <div id="warning-ssdi" class="usa-alert usa-alert--warning" style="display: none;">
          <div class="usa-alert__body">
            <p class="usa-alert__text">${i18next.t('otherBenefits.ssdi.areYouSure')}</p>
          </div>
        </div>
        <div class="usa-checkbox">
          <input
            class="usa-checkbox__input"
            id="check-ui"
            type="checkbox"
            name="other-benefits"
            value="ui"
          />
          <label class="usa-checkbox__label" for="check-ui">${i18next.t('otherBenefits.ui.title')}</label>
        </div>
        <div id="checkbox-tdi" class="usa-checkbox">
          <input
            class="usa-checkbox__input"
            id="check-tdi"
            type="checkbox"
            name="other-benefits"
            value="tdi"
          />
          <label class="usa-checkbox__label" for="check-tdi">${i18next.t('otherBenefits.tdi.title')}</label>
        </div>
        <div class="usa-checkbox" style="display: none;">
          <input
            class="usa-checkbox__input"
            id="check-none"
            type="checkbox"
            name="other-benefits"
            value="none"
          />
          <label class="usa-checkbox__label" for="check-none">${i18next.t('shared.noneOfTheAbove')}</label>
        </div>
      </fieldset>
    </div>
  `;

  existingForm.parentNode.insertBefore(newForm, existingForm);
}

// remove once underlying question removed
function addEmployerBenefitsIfNeeded() {
  const tdiFromEmployerNo = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo");
  if (tdiFromEmployerNo) {
    const tdiCheckbox = document.getElementById('checkbox-tdi');
    const employerCheckbox = document.createElement('div');
    employerCheckbox.className = "usa-checkbox";
    employerCheckbox.innerHTML = `
      <input
        class="usa-checkbox__input"
        id="check-employer"
        type="checkbox"
        name="other-benefits"
        value="employer"
      />
      <label class="usa-checkbox__label" for="check-employer">${i18next.t('otherBenefits.employer.title')}</label>
    `;

    tdiCheckbox.insertAdjacentElement('afterend', employerCheckbox);

    rearrangeEmployerFollowup();
    restyleEmployerFollowup();
    addEmployerListener();
  }
}

function addEmployerListener() {
  const checkEmployer = document.getElementById("check-employer");
  const originalEmployerYes = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpYes");
  const originalEmployerNo = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo");
  loadRadioButtonsIntoCheckbox(originalEmployerYes, originalEmployerNo, checkEmployer);

  checkEmployer.addEventListener('click', function () {
    if (checkEmployer.checked) {
      originalEmployerYes.click();
    } else {
      originalEmployerNo.click();
    }
  });
}

function rearrangeEmployerFollowup() {
  const newForm = document.getElementById('new-other-benefits-form');
  const divEmp = document.getElementById('divEmp');
  if (divEmp) {
    newForm.insertAdjacentElement('beforeend', divEmp);
  }
}

function rearrangeFollowups() {
  const newForm = document.getElementById('new-other-benefits-form');
  const divSS = document.getElementById('divSS');
  const divUI = document.getElementById('divUI');
  const divTDI = document.getElementById('divTDI');
  
  if (divSS) {
    newForm.insertAdjacentElement('beforeend', divSS);
  }
  if (divUI) {
    newForm.insertAdjacentElement('beforeend', divUI);
  }
  if (divTDI) {
    newForm.insertAdjacentElement('beforeend', divTDI);
  }
}

function restyleFollowups() {
  restyleSSDIFollowup();
  restyleUIFollowup();
  restyleTDIFollowup();
}

function restyleEmployerFollowup() {
  const fieldset = fieldsetWithTitleAndSubtitle(
    'divEmp',
    'otherBenefits.employer.followup.title',
    'otherBenefits.employer.followup.subtitle'
  );

  const employerLabel = document.createElement('p');
  employerLabel.textContent = i18next.t('otherBenefits.employer.followup.employerLabel');
  employerLabel.style.marginTop = '20px';
  fieldset.append(employerLabel);

  const nameLabel = document.createElement('label');
  nameLabel.classList.add('usa-label');
  nameLabel.textContent = i18next.t('contact.name');
  nameLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpNm';
  fieldset.append(nameLabel);
  nameLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const nameInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpNm');
  nameInput.classList.add('usa-input');
  fieldset.append(nameInput);

  const address1Label = document.createElement('label');
  address1Label.classList.add('usa-label');
  address1Label.textContent = i18next.t('contact.street1');
  address1Label.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpAdd1';
  fieldset.append(address1Label);
  address1Label.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const address1Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpAdd1');
  address1Input.classList.add('usa-input');
  fieldset.append(address1Input);

  const address2Label = document.createElement('label');
  address2Label.classList.add('usa-label');
  address2Label.textContent = i18next.t('contact.street2');
  address2Label.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpAdd2';
  fieldset.append(address2Label);

  const address2Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpAdd2');
  address2Input.classList.add('usa-input');
  fieldset.append(address2Input);

  const cityLabel = document.createElement('label');
  cityLabel.classList.add('usa-label');
  cityLabel.textContent = i18next.t('contact.city');
  cityLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpCity';
  fieldset.append(cityLabel);
  cityLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const cityInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpCity');
  cityInput.classList.add('usa-input');
  fieldset.append(cityInput);

  const stateLabel = document.createElement('label');
  stateLabel.classList.add('usa-label');
  stateLabel.textContent = i18next.t('contact.state');
  stateLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenEmpSt';
  fieldset.append(stateLabel);
  stateLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const stateSelect = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenEmpSt');
  stateSelect.classList.add('usa-select');
  stateSelect.style.width = '170px';
  stateSelect.style.height = 'auto';
  fieldset.append(stateSelect);

  const zipLabel = document.createElement('label');
  zipLabel.classList.add('usa-label');
  zipLabel.textContent = i18next.t('contact.zipcode');
  zipLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip1';
  fieldset.append(zipLabel);
  zipLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const zipContainer = document.createElement('div');
  zipContainer.id = 'zipContainer';
  zipContainer.style.display = 'flex';
  zipContainer.style.alignItems = 'center';
  zipContainer.style.fontSize = '16px';
  fieldset.append(zipContainer);

  const zip1Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip1');
  zip1Input.classList.add('usa-input');
  zip1Input.style.width = '120px';
  zip1Input.style.marginRight = '5px';
  zipContainer.append(zip1Input);
  zip1Input.insertAdjacentHTML('afterend', '-');

  const zip2Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip2');
  zip2Input.classList.add('usa-input');
  zip2Input.style.width = '100px';
  zip2Input.style.marginLeft = '5px';
  zipContainer.append(zip2Input);

  const intlContainer = document.createElement('div');
  intlContainer.id = 'intlContainer';
  intlContainer.style.display = 'none';
  fieldset.append(intlContainer);

  const intlZip = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpOutCtryZip');
  intlZip.classList.add('usa-input');
  intlZip.style.width = '200px';
  intlContainer.append(intlZip);

  const countryLabel = document.createElement('label');
  countryLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenEmpCountry';
  countryLabel.textContent = i18next.t('otherBenefits.employer.followup.country');
  countryLabel.style.marginTop = '20px';
  countryLabel.style.fontFamily = '"Public Sans", sans-serif';
  intlContainer.append(countryLabel);
  countryLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const selectCountry = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenEmpCountry');
  selectCountry.classList.add('usa-select');
  selectCountry.style.height = 'auto';
  selectCountry.style.width = '400px';
  intlContainer.append(selectCountry);

  const phoneLabel = document.createElement('label');
  phoneLabel.classList.add('usa-label');
  phoneLabel.textContent = i18next.t('contact.phone');
  phoneLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip1';
  fieldset.append(phoneLabel);
  phoneLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const phoneContainer = document.createElement('div');
  phoneContainer.style.display = 'flex';
  phoneContainer.style.alignItems = 'center';
  phoneContainer.style.fontSize = '16px';
  fieldset.append(phoneContainer);

  const phone1Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh');
  phone1Input.classList.add('usa-input');
  phone1Input.style.width = '70px';
  phone1Input.style.margin = '0';
  phoneContainer.append(phone1Input);
  phone1Input.insertAdjacentHTML('beforebegin', '(');
  phone1Input.insertAdjacentHTML('afterend', ')');

  const phone2Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh2');
  phone2Input.classList.add('usa-input');
  phone2Input.style.width = '50px';
  phone2Input.style.margin = '0 5px';
  phoneContainer.append(phone2Input);
  phone2Input.insertAdjacentHTML('afterend', '-');

  const phone3Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh3');
  phone3Input.classList.add('usa-input');
  phone3Input.style.width = '90px';
  phone3Input.style.margin = '0 10px 0 5px';
  phoneContainer.append(phone3Input);
  phone3Input.insertAdjacentHTML('afterend', 'Ext.');
  
  const phone4Input = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpPh4');
  phone4Input.classList.add('usa-input');
  phone4Input.style.width = '100px';
  phone4Input.style.margin = '0 5px';
  phoneContainer.append(phone4Input);

  appendDateRangeFields(
    fieldset,
    'divEmpBenDt',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtEmpBenStDt',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtEmpBenEndDt',
    'Image7',
    'Image9'
  );

  appendPendingCheckbox(fieldset, 'divEmp', 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkEmpBenDtStat');

  const oldEmployerAddBox = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_pnlEmpUnionadd');
  oldEmployerAddBox.style.display = 'none';

  stateSelect.addEventListener('change', function () {
    console.log(stateSelect.value);
    if (stateSelect.value == 0) {
      zipLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpOutCtryZip';
      zipContainer.style.display = 'none';
      intlContainer.style.display = 'block';
    } else {
      zipLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip1';
      zipContainer.style.display = 'flex';
      intlContainer.style.display = 'none';
    }
  });
}

function restyleSSDIFollowup() {
  const fieldset = fieldsetWithTitleAndSubtitle(
    'divSS',
    'otherBenefits.ssdi.followup.title',
    'otherBenefits.ssdi.followup.subtitle'
  );

  const divSSBenDt = document.getElementById('divSSBenDt'); 
  const dateLabel = document.createElement('label');
  dateLabel.textContent = i18next.t('otherBenefits.ssdi.followup.dateLabel');
  dateLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtSSDate';
  divSSBenDt.prepend(dateLabel);
  dateLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const hint = document.createElement('div');
  hint.classList.add("usa-hint");
  hint.textContent = i18next.t('otherBenefits.ssdi.followup.hint');
  dateLabel.insertAdjacentElement('afterend', hint);

  const dateInputContainer = document.createElement('div');
  dateInputContainer.classList.add('dateInputContainer');

  const dateInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtSSDate');
  dateInput.classList.add("usa-input");
  const calendarInput = document.getElementById('Image10');

  dateInputContainer.append(dateInput);
  dateInputContainer.append(calendarInput);
  divSSBenDt.append(dateInputContainer);
  fieldset.append(divSSBenDt);

  appendPendingCheckbox(fieldset, 'divSS', 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkSSDtStat');
}

function restyleUIFollowup() {
  const fieldset = fieldsetWithTitleAndSubtitle(
    'divUI',
    'otherBenefits.ui.followup.title',
    'otherBenefits.ui.followup.subtitle'
  );

  const stateLabel = document.createElement('label');
  stateLabel.classList.add('usa-label');
  stateLabel.htmlFor = 'ctl00$ContentPlaceHolder1$ClaimantDisabilityTab$TabBenefits$ddlUISt';
  stateLabel.textContent = i18next.t('otherBenefits.stateLabel');
  fieldset.append(stateLabel);
  stateLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const stateSelect = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt');
  stateSelect.classList.add('usa-select');
  stateSelect.style.height = 'auto';
  fieldset.append(stateSelect);
  
  appendDateRangeFields(
    fieldset,
    'divUI_Dates',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtUIBenStDt',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtUIBenEndDt',
    'Image14',
    'Image15'
  );

  appendPendingCheckbox(fieldset, 'divUI', 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkUIStatusPend');
}

function restyleTDIFollowup() {
  const fieldset = fieldsetWithTitleAndSubtitle(
    'divTDI',
    'otherBenefits.tdi.followup.title',
    'otherBenefits.tdi.followup.subtitle'
  );

  const stateLabel = document.createElement('label');
  stateLabel.classList.add('usa-label');
  stateLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt';
  stateLabel.textContent = i18next.t('otherBenefits.stateLabel');
  fieldset.append(stateLabel);
  stateLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const stateSelect = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt');
  stateSelect.classList.add('usa-select');
  stateSelect.style.height = 'auto';
  fieldset.append(stateSelect);

  appendDateRangeFields(
    fieldset,
    'divBenDt',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenStDt',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEndDt',
    'Image5',
    'Image6'
  );

  appendPendingCheckbox(fieldset, 'divTDI', 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkBenDtStat');
}

function fieldsetWithTitleAndSubtitle(containerId, titleKey, subtitleKey) {
  const container = document.getElementById(containerId);
  clearTextNodes(container);

  const title = document.createElement('h2');
  title.textContent = i18next.t(titleKey);
  container.insertAdjacentElement('afterbegin', title);

  const fieldset = document.createElement('fieldset');
  fieldset.classList.add("bordered-set");
  title.insertAdjacentElement('afterend', fieldset);

  const subtitle = document.createElement('h3');
  subtitle.textContent = i18next.t(subtitleKey);
  fieldset.append(subtitle);

  return fieldset;
}

function appendDateRangeFields(fieldset, dateContainerId, startInputId, endInputId, startCalendarId, endCalendarId) {
  const dateContainer = document.getElementById(dateContainerId);
  dateContainer.style.marginTop = '30px';
  fieldset.append(dateContainer);

  const dateLabel = document.createElement('p');
  dateLabel.textContent = i18next.t('otherBenefits.dateLabel');
  dateLabel.style.fontWeight = 'bold';
  dateContainer.prepend(dateLabel);
  dateLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const startLabel = document.createElement('label');
  startLabel.textContent = i18next.t('otherBenefits.startLabel');
  startLabel.htmlFor = startInputId;
  dateLabel.insertAdjacentElement('afterend', startLabel);
  startLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const startHint = document.createElement('div');
  startHint.classList.add("usa-hint");
  startHint.textContent = i18next.t('shared.dateFormat');
  startLabel.insertAdjacentElement('afterend', startHint);

  const startDateInputContainer = document.createElement('div');
  startDateInputContainer.classList.add('dateInputContainer');

  const startInput = document.getElementById(startInputId);
  const startCalendar = document.getElementById(startCalendarId);
  startInput.classList.add("usa-input");

  startDateInputContainer.append(startInput);
  startDateInputContainer.append(startCalendar);
  dateContainer.append(startDateInputContainer);

  const endLabel = document.createElement('label');
  endLabel.textContent = i18next.t('otherBenefits.endLabel');
  endLabel.htmlFor = endInputId;
  startDateInputContainer.insertAdjacentHTML('afterend', '<br>');
  startDateInputContainer.nextSibling.insertAdjacentElement('afterend', endLabel);
  endLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const endHint = document.createElement('div');
  endHint.classList.add("usa-hint");
  endHint.textContent = i18next.t('shared.dateFormat');
  endLabel.insertAdjacentElement('afterend', endHint);

  const endDateInputContainer = document.createElement('div');
  endDateInputContainer.classList.add('dateInputContainer');

  const endInput = document.getElementById(endInputId);
  const endCalendar = document.getElementById(endCalendarId);
  endInput.classList.add("usa-input");

  endDateInputContainer.append(endInput);
  endDateInputContainer.append(endCalendar);
  dateContainer.append(endDateInputContainer);
}

function appendPendingCheckbox(fieldset, containerId, checkboxId) {
  const checkbox = document.getElementById(checkboxId);
  const label = document.querySelector(`#${containerId} > label`);
  const wrapper = document.createElement('div');
  wrapper.className = 'usa-checkbox';
  checkbox.classList.add('usa-checkbox__input');
  label.classList.add('usa-checkbox__label');
  label.textContent = i18next.t('otherBenefits.pendingLabel');
  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);
  fieldset.append(wrapper);
}

function addCheckboxListeners() {
  const ssdiWarning = document.getElementById("warning-ssdi");
  const checkSsdi = document.getElementById("check-ssdi");
  const originalSsdiYes = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSYes");
  const originalSsdiNo = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo");

  checkSsdi.addEventListener('click', function () {
    if (checkSsdi.checked) {
      ssdiWarning.style.display = "block";
      originalSsdiYes.click();
    } else {
      ssdiWarning.style.display = "none";
      originalSsdiNo.click();
    }
  });

  const checkUi = document.getElementById("check-ui");
  const originalUiYes = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUIYes");
  const originalUiNo = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo");

  checkUi.addEventListener('click', function () {
    if (checkUi.checked) {
      originalUiYes.click();
    } else {
      originalUiNo.click();
    }
  });

  const checkTdi = document.getElementById("check-tdi");
  const originalTdiYes = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDIYes");
  const originalTdiNo = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo");

  checkTdi.addEventListener('click', function () {
    if (checkTdi.checked) {
      originalTdiYes.click();
    } else {
      originalTdiNo.click();
    }
  });

  loadRadioButtonsIntoCheckbox(originalSsdiYes, originalSsdiNo, checkSsdi);
  loadRadioButtonsIntoCheckbox(originalUiYes, originalUiNo, checkUi);
  loadRadioButtonsIntoCheckbox(originalTdiYes, originalTdiNo, checkTdi);
}

function addOptionsToTDIStates() {
  const stateSelect = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt');
  const caOption = stateSelect.options[1];
  const hiOption = stateSelect.options[2];
  const nyOption = stateSelect.options[3];
  const riOption = stateSelect.options[4];
  const prOption = stateSelect.options[5];

  createAndAppendOption(stateSelect, '2', 'AK');
  createAndAppendOption(stateSelect, '1', 'AL');
  createAndAppendOption(stateSelect, '5', 'AR');
  createAndAppendOption(stateSelect, '4', 'AZ');
  stateSelect.appendChild(caOption);
  createAndAppendOption(stateSelect, '8', 'CO');
  createAndAppendOption(stateSelect, '9', 'CT');
  createAndAppendOption(stateSelect, '11', 'DC');
  createAndAppendOption(stateSelect, '10', 'DE');
  createAndAppendOption(stateSelect, '12', 'FL'); 
  createAndAppendOption(stateSelect, '13', 'GA');
  stateSelect.appendChild(hiOption);
  createAndAppendOption(stateSelect, '19', 'IA');
  createAndAppendOption(stateSelect, '16', 'ID');
  createAndAppendOption(stateSelect, '17', 'IL');
  createAndAppendOption(stateSelect, '18', 'IN');
  createAndAppendOption(stateSelect, '20', 'KS');
  createAndAppendOption(stateSelect, '21', 'KY');
  createAndAppendOption(stateSelect, '22', 'LA');
  createAndAppendOption(stateSelect, '25', 'MA');
  createAndAppendOption(stateSelect, '24', 'MD');
  createAndAppendOption(stateSelect, '23', 'ME');
  createAndAppendOption(stateSelect, '26', 'MI');
  createAndAppendOption(stateSelect, '27', 'MN');
  createAndAppendOption(stateSelect, '29', 'MO');
  createAndAppendOption(stateSelect, '28', 'MS');
  createAndAppendOption(stateSelect, '30', 'MT');
  createAndAppendOption(stateSelect, '37', 'NC');
  createAndAppendOption(stateSelect, '38', 'ND');
  createAndAppendOption(stateSelect, '31', 'NE');
  createAndAppendOption(stateSelect, '33', 'NH');
  createAndAppendOption(stateSelect, '35', 'NM');
  createAndAppendOption(stateSelect, '32', 'NV');
  stateSelect.appendChild(nyOption);
  createAndAppendOption(stateSelect, '39', 'OH');
  createAndAppendOption(stateSelect, '40', 'OK');
  createAndAppendOption(stateSelect, '41', 'OR');
  createAndAppendOption(stateSelect, '42', 'PA');
  stateSelect.appendChild(prOption);
  stateSelect.appendChild(riOption);
  createAndAppendOption(stateSelect, '45', 'SC');
  createAndAppendOption(stateSelect, '46', 'SD');
  createAndAppendOption(stateSelect, '47', 'TN');
  createAndAppendOption(stateSelect, '48', 'TX');
  createAndAppendOption(stateSelect, '49', 'UT');
  createAndAppendOption(stateSelect, '51', 'VA');
  createAndAppendOption(stateSelect, '50', 'VT');
  createAndAppendOption(stateSelect, '53', 'WA');
  createAndAppendOption(stateSelect, '55', 'WI');
  createAndAppendOption(stateSelect, '54', 'WV');
  createAndAppendOption(stateSelect, '56', 'WY');
}

function updateCalendars() {
  updateCalendarUI("Image5");
  updateCalendarUI("Image6");
  updateCalendarUI("Image7");
  updateCalendarUI("Image9");
  updateCalendarUI("Image10", false, true);
  updateCalendarUI("Image14");
  updateCalendarUI("Image15");
}

function createAndAppendOption(selectElement, valueString, stateString) {
  const option = document.createElement('option');
  option.value = valueString;
  option.textContent = stateString;
  selectElement.appendChild(option);
}

function clearTextNodes(node) {
  if (node.parentElement?.tagName.toLowerCase() === 'option') {
    return;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    if (/^\s*$/.test(text)) {
      node.remove(); 
    } else {
      node.textContent = ''; 
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    Array.from(node.childNodes).forEach(clearTextNodes);
    const tagName = node.tagName.toLowerCase();
    if ((tagName === 'a' || tagName === 'strong' || tagName === 'br')) {
      node.remove();
    }
  }
}

function loadRadioButtonsIntoCheckbox(originalYes, originalNo, checkbox) {
  if (originalYes.checked) {
    checkbox.click();
  } else {
    originalNo.click();
  }
}

function replaceQuestionNumbersInErrors() {
  const errorSpan = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_lblUIerror');
  if (errorSpan) {
    const questionMap = {
      '1a.': 'otherBenefits.tdi.followup.subtitle',
      '1b.': 'otherBenefits.tdi.followup.subtitle',
      '2a.': 'otherBenefits.employer.followup.subtitle',
      '2b.': 'otherBenefits.employer.followup.subtitle',
      '3a.': 'otherBenefits.ssdi.followup.subtitle',
      '4a.': 'otherBenefits.ui.followup.subtitle',
      '4b.': 'otherBenefits.ui.followup.subtitle',
    };

    const newForm = document.getElementById('new-other-benefits-form');
    let text = errorSpan.innerHTML;
    
    Object.keys(questionMap).forEach(questionNum => {
      text = text.replace(questionNum, i18next.t(questionMap[questionNum]) + " ");
    });
    
    errorSpan.innerHTML = text;
    errorSpan.style.fontSize = '20px';
    newForm.insertAdjacentElement('beforebegin', errorSpan);
  }
}
