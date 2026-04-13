import i18next from 'i18next';
import { logEvent } from "../../modules/shared.mjs";
import {
  addToSessionData,
  DisabilityType,
  elementTextError,
  resetElementText,
  getSessionData,
  STORAGE_KEY_REASON_FOR_LEAVE,
  STORAGE_KEY_CAUSED_BY_JOB,
  STORAGE_KEY_WORKERS_COMP
} from '../utils';

const TEXT_AREA_IDS = ['pregnancy-details', 'illness-details', 'injury-details'];
let pastedTextSignal = "";

export function reasonForLeavePage() {
  const reasonForLeavePage = document.createElement('div');
  reasonForLeavePage.id = "reasonForLeavePage";
  reasonForLeavePage.classList.add("page");
  reasonForLeavePage.innerHTML = `
    <form id="reason-for-leave-form" novalidate>
      <div class="bordered-set">
        <fieldset class="usa-fieldset">
          <legend id="reason-legend" class="usa-legend">
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
            <div id="pregnancy-details-container" class="additional-content" style="display: none;">
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
            <div id="illness-details-container" class="additional-content" style="display: none;">
              <p>
                <span class="required-asterisk">*</span>
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
            <div id="injury-details-container" class="additional-content" style="display: none;">
              <p>
                <span class="required-asterisk">*</span>
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
  const pregnancyDetails = document.getElementById('pregnancy-details-container');
  const illnessDetails = document.getElementById('illness-details-container');
  const injuryDetails = document.getElementById('injury-details-container');

  const illnessTextarea = document.querySelector('textarea[name="illness-details"]');
  const injuryTextarea = document.querySelector('textarea[name="injury-details"]');
  const pregnancyTextarea = document.querySelector('textarea[name="pregnancy-details"]');

  pregnancyRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    setDisabilityType(DisabilityType.PREGNANCY);
    pregnancyDetails.style.display = 'block';
    illnessDetails.style.display = 'none';
    injuryDetails.style.display = 'none';

    illnessTextarea.required = false;
    injuryTextarea.required = false;

    illnessTextarea.value = '';
    injuryTextarea.value = '';

    addToSessionData({
      [STORAGE_KEY_CAUSED_BY_JOB]: 'no',
      [STORAGE_KEY_WORKERS_COMP]: 'no'
    });
  });

  illnessRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    setDisabilityType(DisabilityType.ILLNESS);
    pregnancyDetails.style.display = 'none';
    illnessDetails.style.display = 'block';
    injuryDetails.style.display = 'none';

    illnessTextarea.required = true;
    injuryTextarea.required = false;

    injuryTextarea.value = '';
    pregnancyTextarea.value = '';

    addToSessionData({
      [STORAGE_KEY_CAUSED_BY_JOB]: null,
      [STORAGE_KEY_WORKERS_COMP]: null
    });
  });

  injuryRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    setDisabilityType(DisabilityType.INJURY);
    pregnancyDetails.style.display = 'none';
    illnessDetails.style.display = 'none';
    injuryDetails.style.display = 'block';

    illnessTextarea.required = false;
    injuryTextarea.required = true;

    pregnancyTextarea.value = '';
    illnessTextarea.value = '';

    addToSessionData({
      [STORAGE_KEY_CAUSED_BY_JOB]: null,
      [STORAGE_KEY_WORKERS_COMP]: null
    });
  });

  pregnancyRadio.addEventListener('invalid', function () {
    elementTextError(reasonLegend);
  });

  illnessTextarea.addEventListener('invalid', function () {
    const label = illnessDetails.querySelector('p');
    elementTextError(label);
  });

  injuryTextarea.addEventListener('invalid', function () {
    const label = injuryDetails.querySelector('p');
    elementTextError(label);
  });

  illnessTextarea.addEventListener('input', function () {
    const label = illnessDetails.querySelector('p');
    resetElementText(label);
  });

  injuryTextarea.addEventListener('input', function () {
    const label = injuryDetails.querySelector('p');
    resetElementText(label);
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
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const visibleTextarea = form.querySelector('textarea[required]');
    if (visibleTextarea && !visibleTextarea.value.trim()) {
      const detailsDiv = visibleTextarea.closest('.additional-content');
      const label = detailsDiv.querySelector('p');
      elementTextError(label);
      return;
    }
    const reasonSelected = form.querySelector('input[name="reasons"]:checked');
    if (!reasonSelected) {
      const reasonLegend = document.getElementById('reason-legend');
      elementTextError(reasonLegend);
      return;
    }

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

export function restoreReasonForLeaveData(setDisabilityType) {
  const savedData = getSessionData();
  let savedReason = savedData[STORAGE_KEY_REASON_FOR_LEAVE]

  if (!savedReason || !savedReason.reasons) {
    savedReason = parseReasonFromOriginalField();
    if (!savedReason) {
      return false;
    }
    addToSessionData({ [STORAGE_KEY_REASON_FOR_LEAVE]: savedReason });
  };

  const reason = savedReason.reasons;

  const radioId = `reason-${reason}`
  const radioButton = document.getElementById(radioId)
  if (radioButton) {
    radioButton.checked = true;
  }

  const disabilityTypeMap = {
    'pregnancy': DisabilityType.PREGNANCY,
    'illness': DisabilityType.ILLNESS,
    'injury': DisabilityType.INJURY
  };
  setDisabilityType(disabilityTypeMap[reason]);

  // Manually show the correct details container (without triggering change events which will update session storage)
  const pregnancyDetails = document.getElementById('pregnancy-details-container');
  const illnessDetails = document.getElementById('illness-details-container');
  const injuryDetails = document.getElementById('injury-details-container');

  const illnessTextarea = document.querySelector('textarea[name="illness-details"]');
  const injuryTextarea = document.querySelector('textarea[name="injury-details"]');

  pregnancyDetails.style.display = reason === 'pregnancy' ? 'block' : 'none';
  illnessDetails.style.display = reason === 'illness' ? 'block' : 'none';
  injuryDetails.style.display = reason === 'injury' ? 'block' : 'none';

  illnessTextarea.required = reason === 'illness';
  injuryTextarea.required = reason === 'injury';

  const detailsKey = `${reason}-details`;
  const savedDetails = savedReason[detailsKey];
  if (savedDetails) {

    // Remove the paste signal suffix if it exists (e.g., "p120")
    const cleanedDetails = savedDetails.replace(/p\d+$/, '');
    const textarea = document.querySelector(`textarea[name="${detailsKey}"]`);
    if (textarea) {
      textarea.value = cleanedDetails;
    }
  }
}

function parseReasonFromOriginalField() {
  const originalTextarea = document.getElementById(
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabDoctor_txtInjury'
  );

  if (!originalTextarea || !originalTextarea.value) {
    return null;
  }

  let rawValue = originalTextarea.value.trim();
  if (!rawValue) {
    return null;
  }

  rawValue = rawValue.replace(/p\d+$/, '').trim();

  const validReasons = ['pregnancy', 'illness', 'injury'];

  const firstPeriodIndex = rawValue.indexOf('. ');

  let reason;
  let details = '';

  if (firstPeriodIndex !== -1) {
    reason = rawValue.substring(0, firstPeriodIndex).toLowerCase();
    details = rawValue.substring(firstPeriodIndex + 2);
  } else {
    reason = rawValue.toLowerCase();
  }

  if (!validReasons.includes(reason)) {
    return null;
  }

  const result = {
    reasons: reason,
    [`${reason}-details`]: details
  };

  return result;
}