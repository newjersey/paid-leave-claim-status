import i18next from 'i18next';
import { logEvent } from "../../modules/shared.mjs";
import {
  addToSessionData,
  getSessionData,
  removeExtraSpaceBetweenRadioButtons,
  setNewTitle,
  STORAGE_KEY_REASON_FOR_LEAVE,
  styleRadioButton
} from '../utils';

export const disabilityInformationLabels = [
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt', label: 'Disability Start Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd', label: 'Last Worked Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk', label: 'Expected Return to Work Date' },
];

export const id = "disabilityInformation";

// this page renders differently than all others, so we need two options for identifying the page
export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_ClientState',
  value: '"TabState":[true,false,false,false,false,false]',
};

export const alternateIdentifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_dvShowFDD',
  text: 'Select the date your disability',
};

const Screens = Object.freeze({
  REASON_FOR_LEAVE: 'reasonForLeave',
  LEAVE_SCHEDULE: 'leaveSchedule',
});

const backButtonId = "leaveScheduleBack";

let currentScreen = Screens.REASON_FOR_LEAVE;

export function changes() {
  addStyles();

  if (currentScreen == Screens.REASON_FOR_LEAVE) {
    reasonForLeavePage();
  } else {
    leaveSchedulePage();
  }
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    .bordered-set {
      background: white;
      border: 1px solid #b2b2b2;
      border-radius: 5px;
      margin: 10px 0;
      padding: 10px;
    }

    .required-asterisk {
      color: rgb(139, 0, 0);
      font-weight: bold;
    }

    .usa-radio__label {
      text-align: left;
    }
  `;
  document.head.appendChild(style);
}

function leaveSchedulePage() {

  const reasonForLeaveMain = document.querySelector("#reasonForLeaveMain");
  if (reasonForLeaveMain) {
    reasonForLeaveMain.style.display = 'none';
  }

  const leaveScheduleContainer = document.querySelector("#ContentPlaceHolder1_ClaimantDisabilityTab");
  if (leaveScheduleContainer) {
    leaveScheduleContainer.style.display = 'block';
  }
  
  showBackButton();

  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo', true);
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo'
  );
  setNewTitle(i18next.t('leaveSchedule.title'));
}

function hideBackButton() {
  const existingButton = document.getElementById(backButtonId);
  if (existingButton) {
    existingButton.style.display = 'none';
  }
}

function showBackButton() {
  const existingButton = document.getElementById(backButtonId);
  if (existingButton) {
    existingButton.style.display = 'block';
    return;
  }

  const backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.id = backButtonId;

  backButton.addEventListener('click', function (event) {
    event.preventDefault();
    logEvent('Leave schedule back clicked', {});

    currentScreen = Screens.REASON_FOR_LEAVE;
    changes();
  });
  
  const pageTitle = document.querySelector('#pageTitle');
  
  if (pageTitle) {
    pageTitle.parentNode.insertBefore(backButton, pageTitle);
  }
}

function reasonForLeavePage() {
  hideBackButton();
  setNewTitle(i18next.t('reasonForLeave.title'));

  const leaveScheduleContainer = document.getElementById("ContentPlaceHolder1_ClaimantDisabilityTab");
  if (leaveScheduleContainer) {
    leaveScheduleContainer.style.display = 'none';

    const mainId = "reasonForLeaveMain";
    const existingMain = document.getElementById(mainId);
    if (existingMain) {
      existingMain.style.display = 'block';
      return;
    }

    const newMain = document.createElement('main');
    newMain.id = mainId;
    newMain.innerHTML = `
      <div class="bordered-set">
        <fieldset class="usa-fieldset">
          <legend class="usa-legend usa-legend">
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
            />
            <label class="usa-radio__label" for="reason-pregnancy">
              ${i18next.t('reasonForLeave.pregnancy')}
            </label>
          </div>
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="reason-illness"
              type="radio"
              name="reasons"
              value="illness"
            />
            <label class="usa-radio__label" for="reason-illness">
              ${i18next.t('reasonForLeave.illness')}
            </label>
          </div>
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="reason-injury"
              type="radio"
              name="reasons"
              value="injury"
            />
            <label class="usa-radio__label" for="reason-injury">
              ${i18next.t('reasonForLeave.injury')}
            </label>
          </div>
        </fieldset>
      </div>

      <button class="usa-button" id="submitReasonForLeave">
        ${i18next.t('reasonForLeave.button')}
      </button>
    `;

    leaveScheduleContainer.parentNode.insertBefore(newMain, leaveScheduleContainer);
  }

  setupSubmitReasonForLeaveButton();
}

function setupSubmitReasonForLeaveButton() {
  const submitBtn = document.querySelector('#submitReasonForLeave');
  if (submitBtn) {
    submitBtn.addEventListener('click', function (event) {
      event.preventDefault();
      logEvent('Reason for leave submit clicked', {});

      addToSessionData({
        [STORAGE_KEY_REASON_FOR_LEAVE]: "injury"
      });      

      currentScreen = Screens.LEAVE_SCHEDULE;
      changes();
    });
  }
}
