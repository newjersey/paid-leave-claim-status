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

    #warning-ssdi .usa-alert__body {
      padding-left: 40px;
    }

    #new-other-benefits-form label {
      text-align: left;
    }

    #ContentPlaceHolder1_ClaimantDisabilityTab_body h2 {
      color: black;
      font-weight: bold;
      margin: 40px 0 20px;
    }
  `;
  document.head.appendChild(style);
}

function replaceRadioButtonsWithCheckboxes() {
  const existingForm = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits');
  const newForm = document.createElement('div');
  newForm.id = "new-other-benefits-form";

  newForm.innerHTML = `
    <form novalidate>
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
            <label class="usa-checkbox__label" for="check-ui">${i18next.t('otherBenefits.ui')}</label>
          </div>
          <div id="checkbox-tdi" class="usa-checkbox">
            <input
              class="usa-checkbox__input"
              id="check-tdi"
              type="checkbox"
              name="other-benefits"
              value="tdi"
            />
            <label class="usa-checkbox__label" for="check-tdi">${i18next.t('otherBenefits.tdi')}</label>
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
    </form>
  `;

  existingForm.parentNode.insertBefore(newForm, existingForm);

  addEmployerBenefitsIfNeeded(); // remove once underlying question removed
  rearrangeFollowups();
  restyleSSDIFollowup();
  addCheckboxListeners();
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
  const divEmp = document.getElementById('divEmp');
  const submitBtn = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_btnUI');
  if (divEmp) {
    submitBtn.parentNode.insertBefore(divEmp, submitBtn);
  }
}

function rearrangeFollowups() {
  const newForm = document.getElementById('new-other-benefits-form');
  const divSS = document.getElementById('divSS');
  const divUI = document.getElementById('divUI');
  const divTDI = document.getElementById('divTDI');
  
  if (divTDI) {
    newForm.parentNode.insertBefore(divTDI, newForm.nextSibling);
  }
  if (divUI) {
    newForm.parentNode.insertBefore(divUI, newForm.nextSibling);
  }
  if (divSS) {
    newForm.parentNode.insertBefore(divSS, newForm.nextSibling);
  }
}

function restyleEmployerFollowup() {
  const divEmp = document.getElementById('divEmp');

  // restyle
}

function restyleSSDIFollowup() {
  const newTitle = document.createElement('h2');
  newTitle.textContent = i18next.t('otherBenefits.ssdi.followupTitle');
  divSS.prepend(newTitle);
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
