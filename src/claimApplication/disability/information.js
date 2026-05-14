import i18next from 'i18next';
import { reasonForLeavePage, setupReasonForLeavePage, restoreReasonForLeaveData } from "./reasonForLeave";
import { setupLeaveSchedulePage, showLeaveScheduleForDisabilityType } from "./leaveSchedule";
import { logEvent } from "../../modules/shared.mjs";
import {
  addToSessionData,
  DisabilityType,
  getSessionData,
  setNewTitle,
  setRequiredForVisibleLeaveSectionFields,
  STORAGE_KEY_DISABILITY_INFO_VIEW
} from '../utils';
import { addPageIdToURL } from '../analytics';

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

const backButtonId = "leaveScheduleBack";
const leaveScheduleId = "ContentPlaceHolder1_ClaimantDisabilityTab";
const reasonForLeaveId = "reasonForLeavePage";

let disabilityType = DisabilityType.UNKNOWN;
function setDisabilityType(type) {
  disabilityType = type;
}

export function changes() {
  addStyles();
  determineDisabilityInfoScreen();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    .bold-text {
      font-weight: bold;
    }
    
    .optional-text {
      color: #757575;
    }

    p.usa-alert__text {
      margin: 0;
    }

    .usa-alert--error::before {
      content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>');
      background: none !important;
      -webkit-mask: none !important;
      mask: none !important;
      top: auto !important;
    }

    .usa-label.no-margin-top {
      margin-top: 0;
    }

    .usa-button {
      margin: 5px 0;
      max-width: 400px;
      min-height: 40px;
      padding: 10px;
    }

    .usa-label, .usa-checkbox__label {
      margin-top: 30px;
    }

    .usa-label, .usa-checkbox__label, .usa-radio__label {
      text-align: left;
    }

    .usa-label, .usa-legend {
      max-width: fit-content;
    }

    .usa-textarea {
      resize: none;
    }

    #reason-for-leave-form {
      margin: 0;
    }

    #reason-legend {
      margin-top: 0;
    }
  `;
  document.head.appendChild(style);
}

function determineDisabilityInfoScreen() {
  const leaveScheduleContainer = document.getElementById(leaveScheduleId); 
  if (leaveScheduleContainer) {
    leaveScheduleContainer.parentNode.insertBefore(reasonForLeavePage(), leaveScheduleContainer);

    setupReasonForLeavePage(setDisabilityType, showLeaveSchedulePage);
    setupLeaveSchedulePage();
    restoreReasonForLeaveData(setDisabilityType);

    const sessionData = getSessionData();
    const disabilityInfoView = sessionData[STORAGE_KEY_DISABILITY_INFO_VIEW];
    if (disabilityInfoView === 'leaveSchedule') {
      showLeaveSchedulePage();
    } else {
      showReasonForLeavePage();
    }
  }
}

function showReasonForLeavePage() {
  addToSessionData({
    [STORAGE_KEY_DISABILITY_INFO_VIEW]: 'reasonForLeave'
  });
  hideBackButton();
  addPageIdToURL('reasonForLeave');
  setNewTitle(i18next.t('reasonForLeave.title'));

  document.getElementById(reasonForLeaveId).style.display = 'block';
  document.getElementById(leaveScheduleId).style.display = 'none';
  setRequiredForVisibleLeaveSectionFields('reasonForLeave');
}

function showLeaveSchedulePage() {
  addToSessionData({
    [STORAGE_KEY_DISABILITY_INFO_VIEW]: 'leaveSchedule'
  });
  window.scrollTo(0, 0);
  showBackButton();
  addPageIdToURL('leaveSchedule');
  setNewTitle(i18next.t('leaveSchedule.title'));

  document.getElementById(reasonForLeaveId).style.display = 'none';
  document.getElementById(leaveScheduleId).style.display = 'block';

  showLeaveScheduleForDisabilityType(disabilityType);
  setRequiredForVisibleLeaveSectionFields('leaveSchedule');
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
  backButton.id = backButtonId;
  backButton.className = 'usa-button usa-button--unstyled';
  backButton.type = 'button';
  backButton.textContent = '< Back';
  backButton.style.padding = '20px 0';

  backButton.addEventListener('click', function (event) {
    event.preventDefault();
    logEvent('Leave schedule back clicked', {});
    showReasonForLeavePage();
  });

  const insertBackButton = () => {
    if (document.getElementById(backButtonId)) {
      document.removeEventListener('headerReady', insertBackButton);
      return;
    }

    const stepIndicator = document.querySelector('.usa-step-indicator--no-labels');
    if (stepIndicator) {
      stepIndicator.parentNode.insertBefore(backButton, stepIndicator);
      document.removeEventListener('headerReady', insertBackButton);
    }
  };

  insertBackButton();
  document.addEventListener('headerReady', insertBackButton);
}
