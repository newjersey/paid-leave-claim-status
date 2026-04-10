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
  setNewTitle(i18next.t('otherBenefits.title'));
  updateCalendars();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
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

    #dateInputContainer {
      display: flex;
      align-items: center;
    }

    #warning-ssdi p {
      margin-left: 10px;
    }
  `;
  document.head.appendChild(style);
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
          ${i18next.t('otherBenefits.areYouReceivingOrApplied')}
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

  rearrangeFollowups();
  restyleFollowups();
  addCheckboxListeners();

  addEmployerBenefitsIfNeeded(); // remove once underlying question removed
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
  checkEmployer.addEventListener('click', function () {
    if (checkEmployer.checked) {
      const originalEmployerYes = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpYes");
      originalEmployerYes.click();
    } else {
      const originalEmployerNo = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDEmpNo");
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

  const nameInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpNm');
  nameInput.classList.add('usa-input');
  fieldset.append(nameInput);

  const address1Label = document.createElement('label');
  address1Label.classList.add('usa-label');
  address1Label.textContent = i18next.t('contact.street1');
  address1Label.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpAdd1';
  fieldset.append(address1Label);

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

  const cityInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpCity');
  cityInput.classList.add('usa-input');
  fieldset.append(cityInput);

  const stateLabel = document.createElement('label');
  stateLabel.classList.add('usa-label');
  stateLabel.textContent = i18next.t('contact.state');
  stateLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenEmpSt';
  fieldset.append(stateLabel);

  const stateSelect = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenEmpSt');
  stateSelect.classList.add('usa-select');
  stateSelect.style.height = 'auto';
  fieldset.append(stateSelect);

  const zipLabel = document.createElement('label');
  zipLabel.classList.add('usa-label');
  zipLabel.textContent = i18next.t('contact.zipcode');
  zipLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip1';
  fieldset.append(zipLabel);

  const zipContainer = document.createElement('div');
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

  const phoneLabel = document.createElement('label');
  phoneLabel.classList.add('usa-label');
  phoneLabel.textContent = i18next.t('contact.phone');
  phoneLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEmpZip1';
  fieldset.append(phoneLabel);

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
    'Image7'
  );

  appendPendingCheckbox(fieldset, 'divEmp', 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkEmpBenDtStat');

  const oldEmployerAddBox = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_pnlEmpUnionadd');
  oldEmployerAddBox.style.display = 'none';
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

  const hint = document.createElement('div');
  hint.classList.add("usa-hint");
  hint.textContent = i18next.t('otherBenefits.ssdi.followup.hint');
  dateLabel.insertAdjacentElement('afterend', hint);

  const dateInputContainer = document.createElement('div');
  dateInputContainer.id = 'dateInputContainer';

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

  const stateSelect = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt');
  stateSelect.classList.add('usa-select');
  stateSelect.style.height = 'auto';
  fieldset.append(stateSelect);
  
  appendDateRangeFields(
    fieldset,
    'divUI_Dates',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtUIBenStDt',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtUIBenEndDt',
    'Image14'
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

  const stateSelect = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt');
  stateSelect.classList.add('usa-select');
  stateSelect.style.height = 'auto';
  fieldset.append(stateSelect);

  appendDateRangeFields(
    fieldset,
    'divBenDt',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenStDt',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEndDt',
    'Image5'
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

function appendDateRangeFields(fieldset, dateContainerId, startInputId, endInputId, calendarId) {
  const dateContainer = document.getElementById(dateContainerId);
  dateContainer.style.marginTop = '30px';
  fieldset.append(dateContainer);

  const dateLabel = document.createElement('p');
  dateLabel.textContent = i18next.t('otherBenefits.dateLabel');
  dateLabel.style.fontWeight = 'bold';
  dateContainer.prepend(dateLabel);

  const startLabel = document.createElement('label');
  startLabel.textContent = i18next.t('otherBenefits.startLabel');
  startLabel.htmlFor = startInputId;
  dateLabel.insertAdjacentElement('afterend', startLabel);

  const startHint = document.createElement('div');
  startHint.classList.add("usa-hint");
  startHint.textContent = i18next.t('shared.dateFormat');
  startLabel.insertAdjacentElement('afterend', startHint);

  const startCalendar = document.getElementById(calendarId);
  const endLabel = document.createElement('label');
  endLabel.textContent = i18next.t('otherBenefits.endLabel');
  endLabel.htmlFor = endInputId;
  startCalendar.insertAdjacentHTML('afterend', '<br>');
  startCalendar.nextSibling.insertAdjacentElement('afterend', endLabel);

  const endHint = document.createElement('div');
  endHint.classList.add("usa-hint");
  endHint.textContent = i18next.t('shared.dateFormat');
  endLabel.insertAdjacentElement('afterend', endHint);
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
  checkSsdi.addEventListener('click', function () {
    if (checkSsdi.checked) {
      ssdiWarning.style.display = "block";
      const originalSsdiYes = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSYes");
      originalSsdiYes.click();
    } else {
      ssdiWarning.style.display = "none";
      const originalSsdiNo = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbSSNo");
      originalSsdiNo.click();
    }
  });

  const checkUi = document.getElementById("check-ui");
  checkUi.addEventListener('click', function () {
    if (checkUi.checked) {
      const originalUiYes = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUIYes");
      originalUiYes.click();
    } else {
      const originalUiNo = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbUINo");
      originalUiNo.click();
    }
  });

  const checkTdi = document.getElementById("check-tdi");
  checkTdi.addEventListener('click', function () {
    if (checkTdi.checked) {
      const originalTdiYes = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDIYes");
      originalTdiYes.click();
    } else {
      const originalTdiNo = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_rbTDINo");
      originalTdiNo.click();
    }
  });
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
