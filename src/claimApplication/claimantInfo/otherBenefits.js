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
  `;
  document.head.appendChild(style);
}

function replaceRadioButtonsWithCheckboxes() {
  const existingForm = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits');
  const newForm = document.createElement('div');
  newForm.id = "newOtherBenefitsForm";

  newForm.innerHTML = `
    <form id="new-other-benefits-form" novalidate>
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
            <label class="usa-checkbox__label" for="check-ssdi">${i18next.t('otherBenefits.ssdi')}</label>
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
          <div class="usa-checkbox">
            <input
              class="usa-checkbox__input"
              id="check-tdi"
              type="checkbox"
              name="other-benefits"
              value="tdi"
            />
            <label class="usa-checkbox__label" for="check-tdi">${i18next.t('otherBenefits.tdi')}</label>
          </div>
          <div class="usa-checkbox">
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
