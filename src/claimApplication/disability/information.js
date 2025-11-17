import i18next from 'i18next';
import { reasonForLeavePage, setupReasonForLeavePage } from "./reasonForLeave";
import { leaveSchedulePage, setupLeaveSchedulePage, showLeaveScheduleForDisabilityType } from "./leaveSchedule";
import { logEvent } from "../../modules/shared.mjs";
import { DisabilityType, setNewTitle } from '../utils';

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

const backButtonId = "leaveScheduleBack";

let disabilityType = DisabilityType.UNKNOWN;
function setDisabilityType(type) {
  disabilityType = type;
}

export function changes() {
  addStyles();

  const leaveScheduleContainer = document.querySelector("#ContentPlaceHolder1_ClaimantDisabilityTab");
  if (leaveScheduleContainer) {
    leaveScheduleContainer.style.display = 'none';
    leaveScheduleContainer.parentNode.insertBefore(reasonForLeavePage(), leaveScheduleContainer);
    leaveScheduleContainer.parentNode.insertBefore(leaveSchedulePage(), leaveScheduleContainer);

    setupReasonForLeavePage(setDisabilityType, showLeaveSchedulePage);
    setupLeaveSchedulePage();

    showReasonForLeavePage();
  }
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    .page h2, .page h3 {
      color: black;
      font-variant: normal;
      font-weight: bold;
    }

    .page h2 {
      font-size: 24px;
      margin: 50px 0 10px;
    }

    .page h2.usa-alert__heading {
      margin: 0 0 10px;
    }

    .page h3 {
      font-size: 18px;
      margin: 0 0 10px;
    }

    .bold-text {
      font-weight: bold;
    }

    .bordered-set {
      background: white;
      border: 1px solid #b2b2b2;
      border-radius: 5px;
      margin: 10px 0;
      padding: 10px;
    }
    
    .optional-text {
      color: #757575;
    }

    .usa-label.no-margin-top {
      margin-top: 0;
    }

    .required-asterisk {
      color: rgb(139, 0, 0);
      font-weight: bold;
    }

    .usa-button {
      margin: 5px 0;
      max-width: 400px;
      min-height: 40px;
      padding: 10px;
    }

    .usa-checkbox {
      margin-bottom: 10px;
    }

    .usa-checkbox__input:checked+[class*=__label]:before, 
    .usa-checkbox__input:checked:disabled+[class*=__label]:before {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2265%22%20height=%2250%22%20viewBox=%220%200%2065%2050%22><title>correct8</title><path%20fill=%22%23FFF%22%20fill-rule=%22evenodd%22%20d=%22M63.268%207.063l-5.616-5.61C56.882.685%2055.946.3%2054.845.3s-2.038.385-2.808%201.155L24.951%2028.552%2012.81%2016.385c-.77-.77-1.707-1.155-2.808-1.155-1.1%200-2.037.385-2.807%201.154l-5.616%205.61C.81%2022.764.425%2023.7.425%2024.8s.385%202.035%201.155%202.805l14.947%2014.93%205.616%205.61c.77.77%201.706%201.154%202.807%201.154s2.038-.384%202.808-1.154l5.616-5.61%2029.894-29.86c.77-.77%201.157-1.707%201.157-2.805%200-1.101-.385-2.036-1.156-2.805l-.001-.002z%22/></svg>'), linear-gradient(transparent, transparent);
    }

    .usa-date-picker__button {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20height=%2224%22%20viewBox=%220%200%2024%2024%22%20width=%2224%22><path%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/><path%20d=%22M20%203h-1V1h-2v2H7V1H5v2H4c-1.1%200-2%20.9-2%202v16c0%201.1.9%202%202%202h16c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2zm0%2018H4V8h16v13z%22/></svg>');
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

    #reason-for-leave-form, #leave-schedule-pregnancy-form, #leave-schedule-illness-injury-form {
      margin: 0;
    }

    #fddPregnancyLabel, #lastWorkdayPregnancyLabel {
      margin-bottom: 20px;
    }
  `;
  document.head.appendChild(style);
}

function showReasonForLeavePage() {
  hideBackButton();
  setNewTitle(i18next.t('reasonForLeave.title'));

  document.querySelector("#reasonForLeavePage").style.display = 'block';
  document.querySelector("#leaveSchedulePage").style.display = 'none';
}

function showLeaveSchedulePage() {
  window.scrollTo(0, 0);
  showBackButton();
  setNewTitle(i18next.t('leaveSchedule.title'));

  document.querySelector("#reasonForLeavePage").style.display = 'none';
  document.querySelector("#leaveSchedulePage").style.display = 'block';

  showLeaveScheduleForDisabilityType(disabilityType, backButtonId);
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
  
  const pageTitle = document.querySelector('#pageTitle');
  
  if (pageTitle) {
    pageTitle.parentNode.insertBefore(backButton, pageTitle);
  }
}
