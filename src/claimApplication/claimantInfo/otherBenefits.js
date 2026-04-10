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
        <legend class="usa-legend">
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

function restyleEmployerFollowup() {
  const divEmp = document.getElementById('divEmp');
  divEmp.classList.add("bordered-set");
}

function restyleFollowups() {
  restyleSSDIFollowup();
  restyleUIFollowup();
  restyleTDIFollowup();
}

function restyleSSDIFollowup() {
  const divSS = document.getElementById('divSS');
  clearTextNodes(divSS);

  const newTitle = document.createElement('h2');
  newTitle.textContent = i18next.t('otherBenefits.ssdi.followup.title');
  divSS.insertAdjacentElement('afterbegin', newTitle);

  const fieldset = document.createElement('fieldset');
  fieldset.classList.add("bordered-set");
  newTitle.insertAdjacentElement('afterend', fieldset);

  const subtitle = document.createElement('h3');
  subtitle.textContent = i18next.t('otherBenefits.ssdi.followup.subtitle');
  fieldset.append(subtitle);

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

  const checkboxPending = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkSSDtStat');
  const labelPending = document.querySelector("#divSS > label");
  const pendingWrapper = document.createElement('div');
  pendingWrapper.className = 'usa-checkbox';
  checkboxPending.classList.add('usa-checkbox__input');
  labelPending.classList.add('usa-checkbox__label');
  labelPending.textContent = i18next.t('otherBenefits.pendingLabel');
  pendingWrapper.appendChild(checkboxPending);
  pendingWrapper.appendChild(labelPending);
  fieldset.append(pendingWrapper);
}

function restyleUIFollowup() {
  const divUI = document.getElementById('divUI');
  clearTextNodes(divUI);

  const newTitle = document.createElement('h2');
  newTitle.textContent = i18next.t('otherBenefits.ui.followup.title');
  divUI.insertAdjacentElement('afterbegin', newTitle);

  const fieldset = document.createElement('fieldset');
  fieldset.classList.add("bordered-set");
  newTitle.insertAdjacentElement('afterend', fieldset);

  const subtitle = document.createElement('h3');
  subtitle.textContent = i18next.t('otherBenefits.ui.followup.subtitle');
  fieldset.append(subtitle);

  const stateLabel = document.createElement('label');
  stateLabel.classList.add('usa-label');
  stateLabel.htmlFor = 'ctl00$ContentPlaceHolder1$ClaimantDisabilityTab$TabBenefits$ddlUISt';
  stateLabel.textContent = i18next.t('otherBenefits.stateLabel');
  fieldset.append(stateLabel);

  const stateSelect = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlUISt');
  stateSelect.classList.add('usa-select');
  stateSelect.style.height = 'auto';
  fieldset.append(stateSelect);

  const divUIDates = document.getElementById('divUI_Dates');
  fieldset.append(divUIDates);

  const dateLabel = document.createElement('p');
  dateLabel.textContent = i18next.t('otherBenefits.dateLabel');
  divUIDates.prepend(dateLabel);

  const startLabel = document.createElement('label');
  startLabel.textContent = i18next.t('otherBenefits.startLabel');
  startLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtUIBenStDt';
  dateLabel.insertAdjacentHTML('afterend', '<br>');
  dateLabel.nextSibling.insertAdjacentElement('afterend', startLabel);

  const startHint = document.createElement('div');
  startHint.classList.add("usa-hint");
  startHint.textContent = i18next.t('shared.dateFormat');
  startLabel.insertAdjacentElement('afterend', startHint);

  const startCalendar = document.getElementById('Image14');
  const endLabel = document.createElement('label');
  endLabel.textContent = i18next.t('otherBenefits.endLabel');
  endLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtUIBenEndDt';
  startCalendar.insertAdjacentHTML('afterend', '<br>');
  startCalendar.nextSibling.insertAdjacentElement('afterend', endLabel);

  const endHint = document.createElement('div');
  endHint.classList.add("usa-hint");
  endHint.textContent = i18next.t('shared.dateFormat');
  endLabel.insertAdjacentElement('afterend', endHint);

  const pendingCheckbox = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkUIStatusPend');
  const pendingLabel = document.querySelector("#divUI > label");
  const pendingWrapper = document.createElement('div');
  pendingWrapper.className = 'usa-checkbox';
  pendingCheckbox.classList.add('usa-checkbox__input');
  pendingLabel.classList.add('usa-checkbox__label');
  pendingLabel.textContent = i18next.t('otherBenefits.pendingLabel');
  pendingWrapper.appendChild(pendingCheckbox);
  pendingWrapper.appendChild(pendingLabel);
  fieldset.append(pendingWrapper);
}

function restyleTDIFollowup() {
  const divTDI = document.getElementById('divTDI');
  clearTextNodes(divTDI);

  const newTitle = document.createElement('h2');
  newTitle.textContent = i18next.t('otherBenefits.tdi.followup.title');
  divTDI.insertAdjacentElement('afterbegin', newTitle);

  const fieldset = document.createElement('fieldset');
  fieldset.classList.add("bordered-set");
  newTitle.insertAdjacentElement('afterend', fieldset);

  const subtitle = document.createElement('h3');
  subtitle.textContent = i18next.t('otherBenefits.tdi.followup.subtitle');
  fieldset.append(subtitle);

  const stateLabel = document.createElement('label');
  stateLabel.classList.add('usa-label');
  stateLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt';
  stateLabel.textContent = i18next.t('otherBenefits.stateLabel');
  fieldset.append(stateLabel);

  const stateSelect = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_ddlBenSt');
  stateSelect.classList.add('usa-select');
  stateSelect.style.height = 'auto';
  fieldset.append(stateSelect);

  const divBenDt = document.getElementById('divBenDt');
  fieldset.append(divBenDt);

  const dateLabel = document.createElement('p');
  dateLabel.textContent = i18next.t('otherBenefits.dateLabel');
  divBenDt.prepend(dateLabel);

  const startLabel = document.createElement('label');
  startLabel.textContent = i18next.t('otherBenefits.startLabel');
  startLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenStDt';
  dateLabel.insertAdjacentHTML('afterend', '<br>');
  dateLabel.nextSibling.insertAdjacentElement('afterend', startLabel);

  const startHint = document.createElement('div');
  startHint.classList.add("usa-hint");
  startHint.textContent = i18next.t('shared.dateFormat');
  startLabel.insertAdjacentElement('afterend', startHint);

  const startCalendar = document.getElementById('Image5');
  const endLabel = document.createElement('label');
  endLabel.textContent = i18next.t('otherBenefits.endLabel');
  endLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtBenEndDt';
  startCalendar.insertAdjacentHTML('afterend', '<br>');
  startCalendar.nextSibling.insertAdjacentElement('afterend', endLabel);

  const endHint = document.createElement('div');
  endHint.classList.add("usa-hint");
  endHint.textContent = i18next.t('shared.dateFormat');
  endLabel.insertAdjacentElement('afterend', endHint);

  const pendingCheckbox = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_chkBenDtStat');
  const pendingLabel = document.querySelector("#divTDI > label");
  const pendingWrapper = document.createElement('div');
  pendingWrapper.className = 'usa-checkbox';
  pendingCheckbox.classList.add('usa-checkbox__input');
  pendingLabel.classList.add('usa-checkbox__label');
  pendingLabel.textContent = i18next.t('otherBenefits.pendingLabel');
  pendingWrapper.appendChild(pendingCheckbox);
  pendingWrapper.appendChild(pendingLabel);
  fieldset.append(pendingWrapper);
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
