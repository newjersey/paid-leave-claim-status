import i18next from 'i18next';
import { logEvent } from "../../modules/shared.mjs";
import {
  addToSessionData,
  DisabilityType,
  elementTextError,
  resetElementText,
  STORAGE_KEY_REASON_FOR_LEAVE
} from '../utils';

const TEXT_AREA_IDS = ['pregnancy-details', 'illness-details', 'injury-details'];
let pastedTextSignal = "";

export function reasonForLeavePage() {
  const reasonForLeavePage = document.createElement('div');
  reasonForLeavePage.id = "reasonForLeavePage";
  reasonForLeavePage.classList.add("page");
  reasonForLeavePage.innerHTML = `
    <form id="reason-for-leave-form">
      <div class="bordered-set">
        <fieldset class="usa-fieldset">
          <legend id="reason-legend" class="usa-legend usa-legend">
            <span class="required-asterisk">*</span>
            ${i18next.t('reasonForLeave.chooseReason')}
          </legend>
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="reason-pregnancy"
              type="radio"
              name="reasons"
              value="pregnancy"
              required
            />
            <label class="usa-radio__label" for="reason-pregnancy">
              ${i18next.t('reasonForLeave.pregnancy')}
            </label>
            <div id="pregnancy-details" class="additional-content" style="display: none;">
              <p class="optional-text">
                <span class="bold-text">${i18next.t('shared.optional')} </span>
                ${i18next.t('reasonForLeave.pregnancyDetails')}
              </p>
              <textarea
                class="usa-textarea"
                id="pregnancy-details"
                maxlength="250"
                name="pregnancy-details"></textarea>
              <p class="optional-text">${i18next.t('reasonForLeave.characterLimit', { limit: 250 })}</p>
            </div>
          </div>
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="reason-illness"
              type="radio"
              name="reasons"
              value="illness"
              required
            />
            <label class="usa-radio__label" for="reason-illness">
              ${i18next.t('reasonForLeave.illness')}
            </label>
            <div id="illness-details" class="additional-content" style="display: none;">
              <p class="optional-text">
                <span class="bold-text">${i18next.t('shared.optional')} </span>
                ${i18next.t('reasonForLeave.illnessDetails')}
              </p>
              <textarea
                class="usa-textarea"
                id="illness-details"
                maxlength="250"
                name="illness-details"></textarea>
              <p class="optional-text">${i18next.t('reasonForLeave.characterLimit', { limit: 250 })}</p>
            </div>
          </div>
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="reason-injury"
              type="radio"
              name="reasons"
              value="injury"
              required
            />
            <label class="usa-radio__label" for="reason-injury">
              ${i18next.t('reasonForLeave.injury')}
            </label>
            <div id="injury-details" class="additional-content" style="display: none;">
              <p class="optional-text">
                <span class="bold-text">${i18next.t('shared.optional')} </span>
                ${i18next.t('reasonForLeave.injuryDetails')}
              </p>
              <textarea
                class="usa-textarea"
                id="injury-details"
                maxlength="250"
                name="injury-details"></textarea>
              <p class="optional-text">${i18next.t('reasonForLeave.characterLimit', { limit: 250 })}</p>
            </div>
          </div>
        </fieldset>
      </div>

      <button class="usa-button" id="submitReasonForLeave" type="submit">
        ${i18next.t('shared.saveAndContinue')}
      </button>
    </form>
  `;
  return reasonForLeavePage;
}

export function setupReasonForLeavePage(setDisabilityType, showLeaveSchedulePage) {
  setupDisabilityTypeListeners(setDisabilityType);
  setupPasteDetection();
  setupSubmitReasonForLeave(showLeaveSchedulePage);
}

function setupDisabilityTypeListeners(setDisabilityType) {
  const pregnancyRadio = document.getElementById('reason-pregnancy');
  const illnessRadio = document.getElementById('reason-illness');
  const injuryRadio = document.getElementById('reason-injury');
  const reasonLegend = document.getElementById('reason-legend');
  const pregnancyDetails = document.getElementById('pregnancy-details');
  const illnessDetails = document.getElementById('illness-details');
  const injuryDetails = document.getElementById('injury-details');

  pregnancyRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    setDisabilityType(DisabilityType.PREGNANCY);
    pregnancyDetails.style.display = 'block';
    illnessDetails.style.display = 'none';
    injuryDetails.style.display = 'none';
  });

  illnessRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    setDisabilityType(DisabilityType.ILLNESS);
    pregnancyDetails.style.display = 'none';
    illnessDetails.style.display = 'block';
    injuryDetails.style.display = 'none';
  });

  injuryRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    setDisabilityType(DisabilityType.INJURY);
    pregnancyDetails.style.display = 'none';
    illnessDetails.style.display = 'none';
    injuryDetails.style.display = 'block';
  });

  pregnancyRadio.addEventListener('invalid', function () {
    elementTextError(reasonLegend);
  });
}

function setupPasteDetection() {
  TEXT_AREA_IDS.forEach(id => {
    const textArea = document.getElementById(id);

    textArea.addEventListener('paste', (event) => {
      const clipboardData = event.clipboardData;
      const pastedText = clipboardData.getData('Text');

      if (pastedText.length >= 50) {
        pastedTextSignal = `p${pastedText.length}`;
      }
    });
  });
}

function setupSubmitReasonForLeave(showLeaveSchedulePage) {
  const form = document.getElementById('reason-for-leave-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const hiddenFieldNames = new Set();
    const fields = form.querySelectorAll('*');
    fields.forEach(field => {
      if (field.offsetParent === null && 'name' in field) {
        hiddenFieldNames.add(field.name);
      }
    });

    const formData = new FormData(form);
    const formValues = {};
    formData.forEach((value, key) => {
      if (!hiddenFieldNames.has(key)) {
        if (TEXT_AREA_IDS.includes(key)) {
          formValues[key] = value + pastedTextSignal;
        } else {
          formValues[key] = value;
        }
      }
    });

    logEvent('Reason for leave submit clicked', {});

    addToSessionData({
      [STORAGE_KEY_REASON_FOR_LEAVE]: formValues
    });      

    showLeaveSchedulePage();
  });
}
