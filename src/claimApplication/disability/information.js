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

let currentScreen = Screens.REASON_FOR_LEAVE;

export function changes() {
  console.log(`currentScreen: ${currentScreen}`);
  if (currentScreen == Screens.REASON_FOR_LEAVE) {
    reasonForLeavePage();
  } else {
    leaveSchedulePage();
  }
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
  
  addBackButton();

  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo', true);
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo'
  );
  setNewTitle(i18next.t('leaveSchedule.title'));

  const sessionData = getSessionData();
  const reasonForLeave = sessionData[STORAGE_KEY_REASON_FOR_LEAVE];
  console.log(`reasonForLeave: ${reasonForLeave}`);
}

function addBackButton() {
  const backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.id = 'leaveScheduleBack';

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
  setNewTitle(i18next.t('reasonForLeave.title'));

  const leaveScheduleContainer = document.querySelector("#ContentPlaceHolder1_ClaimantDisabilityTab");
  if (leaveScheduleContainer) {
    leaveScheduleContainer.style.display = 'none';
    const newMain = document.createElement('main');
    newMain.id = "reasonForLeaveMain";
    newMain.innerHTML = `
      <p>Hello there!</p>

      <button id="submitReasonForLeave">${i18next.t('reasonForLeave.button')}</button>
    `;

    leaveScheduleContainer.parentNode.insertBefore(newMain, leaveScheduleContainer);
  }

  setupSubmitReasonForLeaveButton();
}

function setupSubmitReasonForLeaveButton() {
  console.log();
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
