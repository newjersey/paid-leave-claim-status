import i18next from 'i18next';
import IMask from 'imask';
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

const backButtonId = "leaveScheduleBack";

const DisabilityType = {
    UNKNOWN: '',
    PREGNANCY: 'pregnancy',
    ILLNESS: 'illness',
    INJURY: 'injury'
};
let disabilityType = DisabilityType.UNKNOWN;

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
    main h2, main h3 {
      color: black;
      font-variant: normal;
      font-weight: bold;
    }

    main h2 {
      font-size: 24px;
      margin: 50px 0 10px;
    }

    main h3 {
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

    .usa-legend {
      max-width: fit-content;
    }

    .usa-textarea {
      resize: none;
    }

    #reason-for-leave-form {
      margin: 0;
    }

    #workDisabilityDateLabel {
      margin-top: 0;
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
  backButton.id = backButtonId;
  backButton.className = 'usa-button usa-button--unstyled';
  backButton.type = 'button';
  backButton.textContent = '< Back';
  backButton.style.padding = '20px 0';

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
                title="please choose a reason"
              />
              <label class="usa-radio__label" for="reason-pregnancy">
                ${i18next.t('reasonForLeave.pregnancy')}
              </label>
              <div id="pregnancy-details" class="additional-content" style="display: none;">
                <p class="optional-text">
                  <span class="bold-text">${i18next.t('reasonForLeave.optional')} </span>
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
                title="please choose a reason"
              />
              <label class="usa-radio__label" for="reason-illness">
                ${i18next.t('reasonForLeave.illness')}
              </label>
              <div id="illness-details" class="additional-content" style="display: none;">
                <p class="optional-text">
                  <span class="bold-text">${i18next.t('reasonForLeave.optional')} </span>
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
                title="please choose a reason"
              />
              <label class="usa-radio__label" for="reason-injury">
                ${i18next.t('reasonForLeave.injury')}
              </label>
              <div id="injury-details" class="additional-content" style="display: none;">
                <p class="optional-text">
                  <span class="bold-text">${i18next.t('reasonForLeave.optional')} </span>
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

        <h2>${i18next.t('reasonForLeave.provider.title')}</h2>

        <p>${i18next.t('reasonForLeave.provider.explanation')}</p>

        <div class="bordered-set">
          <h3>${i18next.t('reasonForLeave.provider.info')}</h3>

          <div class="usa-checkbox">
            <input
              class="usa-checkbox__input"
              id="check-provider-type-accepted"
              type="checkbox"
              name="provider-type-accepted"
              value="yes"
              required
            />
            <label class="usa-checkbox__label" for="check-provider-type-accepted">
              <span class="required-asterisk">*</span>
              ${i18next.t('reasonForLeave.provider.type.isAccepted')}
            </label>
          </div>

          <div class="usa-accordion usa-accordion--bordered">
            <h4 class="usa-accordion__heading">
              <button
                type="button"
                class="usa-accordion__button"
                aria-expanded="false"
                aria-controls="accepted-provider-types"
              >
                ${i18next.t('reasonForLeave.provider.type.weAccept')}
              </button>
            </h4>
            <div id="accepted-provider-types" class="usa-accordion__content usa-prose">
              <ul>
                <li>${i18next.t('reasonForLeave.provider.type.advancedPracticeNurse')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.registeredNurse')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.certifiedNursePractitioner')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.clinicalNurseSpecialist')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.certifiedNurseMidwife')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.certifiedProfessionalMidwife')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.chiropractor')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.dentist')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.erPhysician')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.medicalDoctor')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.optometrist')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.osteopath')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.podiatrist')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.psychologist')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.physicianAssistant')}</li>
                <li>${i18next.t('reasonForLeave.provider.type.specialist')}</li>
              </ul>
            </div>
          </div>

          <label class="usa-label" for="provider-first-name">${i18next.t('reasonForLeave.provider.firstName')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input" id="provider-first-name" name="provider-first-name" required  title="hoooheee -0!" />

          <label class="usa-label" for="provider-last-name">${i18next.t('reasonForLeave.provider.lastName')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input" id="provider-last-name" name="provider-last-name" required />

          <label class="usa-label" for="provider-mailing-address-1">${i18next.t('contact.street1')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input" id="provider-mailing-address-1" name="provider-mailing-address-1" required />

          <label class="usa-label" for="provider-mailing-address-2">${i18next.t('contact.street2')}</label>
          <input class="usa-input" id="provider-mailing-address-2" name="provider-mailing-address-2" />

          <label class="usa-label" for="provider-city">${i18next.t('contact.city')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
          <input class="usa-input" id="provider-city" name="provider-city" required />

          <label class="usa-label" for="provider-state">${i18next.t('contact.state')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
          <div class="usa-combo-box">
            <select class="usa-select" id="provider-state" name="provider-state" required>
              ${stateOptions()}
            </select>
          </div>

          <label class="usa-label" for="provider-zip">${i18next.t('contact.zipcode')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input usa-input--medium" id="provider-zip" name="provider-zip" pattern="\\d{5}(-\\d{4})?" required />

          <label class="usa-label" for="provider-phone">${i18next.t('contact.phone')}</label>
          <div class="usa-hint" id="provider-primaryPnHint">${i18next.t('contact.phoneHint')}</div>
          <input
            class="usa-input margin-bottom-1"
            id="provider-phone"
            name="provider-phone"
            type="text"
            inputmode="numeric"
            pattern="\\d{3}-\\d{3}-\\d{4}"
            aria-describedby="provider-primaryPnHint"
          />
        </div>

        <div id="reasonForLeaveWork" style="display: none;">

          <h2>${i18next.t('reasonForLeave.work.title')}</h2>

          <div class="bordered-set">
            <fieldset class="usa-fieldset">
              <legend id="caused-by-job-legend" class="usa-legend usa-legend">
                <span class="required-asterisk">*</span>
                <span id="causedByJobText"></span>
              </legend>
              <div class="usa-radio">
                <input
                  class="usa-radio__input"
                  id="caused-by-job-yes"
                  type="radio"
                  name="caused-by-job"
                  value="yes"
                />
                <label class="usa-radio__label" for="caused-by-job-yes">
                  ${i18next.t('shared.yes')}
                </label>
              </div>
              <div class="usa-radio">
                <input
                  class="usa-radio__input"
                  id="caused-by-job-no"
                  type="radio"
                  name="caused-by-job"
                  value="no"
                />
                <label class="usa-radio__label" for="caused-by-job-no">
                  ${i18next.t('shared.no')}
                </label>
              </div>
            </fieldset>
          </div>

          <div id="workers-comp-claim" class="bordered-set" style="display:none;">
            <fieldset class="usa-fieldset">
              <legend id="workers-comp-legend" class="usa-legend usa-legend">
                <span class="required-asterisk">*</span>
                ${i18next.t('reasonForLeave.work.workersCompClaim')}
              </legend>
              <div class="usa-radio">
                <input
                  class="usa-radio__input"
                  id="workers-comp-yes"
                  type="radio"
                  name="workers-comp"
                  value="yes"
                />
                <label class="usa-radio__label" for="workers-comp-yes">
                  ${i18next.t('shared.yes')}
                </label>
              </div>
              <div class="usa-radio">
                <input
                  class="usa-radio__input"
                  id="workers-comp-no"
                  type="radio"
                  name="workers-comp"
                  value="no"
                />
                <label class="usa-radio__label" for="workers-comp-no">
                  ${i18next.t('shared.no')}
                </label>
              </div>
            </fieldset>
          </div>

          <div id="employerInfo" style="display:none;">
            <div class="bordered-set">
              <p id="employerInfoPrompt"></p>
              
              <label class="usa-label" for="employer-name">${i18next.t('reasonForLeave.work.employerInfo.name')}</label>
                <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
              </label>
              <input class="usa-input" id="employer-name" name="employer-name" />

              <label class="usa-label" for="employer-mailing-address-1">${i18next.t('contact.street1')}
                <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
              </label>
              <input class="usa-input" id="employer-mailing-address-1" name="employer-mailing-address-1" />

              <label class="usa-label" for="employer-mailing-address-2">${i18next.t('contact.street2')}</label>
              <input class="usa-input" id="employer-mailing-address-2" name="employer-mailing-address-2" />

              <label class="usa-label" for="employer-city">${i18next.t('contact.city')}
                <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
              </label>
              <input class="usa-input" id="employer-city" name="employer-city" />

              <label class="usa-label" for="employer-state">${i18next.t('contact.state')}
                <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
              <div class="usa-combo-box">
                <select class="usa-select" id="employer-state" name="employer-state">
                  ${stateOptions()}
                </select>
              </div>

              <label class="usa-label" for="employer-zip">${i18next.t('contact.zipcode')}
                <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
              </label>
              <input class="usa-input usa-input--medium" id="employer-zip" name="employer-zip" pattern="\\d{5}(-\\d{4})?" />

              <label class="usa-label" for="employer-phone">${i18next.t('contact.phone')}
                <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
              </label>
              <div class="usa-hint" id="employer-primaryPnHint">${i18next.t('contact.phoneHint')}</div>
              <input
                class="usa-input margin-bottom-1"
                id="employer-phone"
                name="employer-phone"
                type="text"
                inputmode="numeric"
                pattern="\\d{3}-\\d{3}-\\d{4}"
                aria-describedby="employer-primaryPnHint"
              />
            </div>
            <div class="bordered-set">
              <label class="usa-label" id="workDisabilityDateLabel" for="workDisabilityDate">
                <span class="required-asterisk">*</span>
                <span id="workDisabilityDateLabelText"></span>
              </label>
              <div class="usa-hint" id="workDisabilityDateHint">${i18next.t('shared.dateFormat')}</div>
              <div class="usa-date-picker">
                <input
                  class="usa-input"
                  id="workDisabilityDate"
                  name="workDisabilityDate"
                  aria-labelledby="workDisabilityDateLabel"
                  aria-describedby="workDisabilityDateHint"
                />
              </div>
            </div>
            <div class="bordered-set">
              <fieldset class="usa-fieldset">
                <legend class="usa-legend usa-legend">
                  <span class="required-asterisk">*</span>
                  ${i18next.t('reasonForLeave.work.workersCompClaimApproved')}
                </legend>
                <div class="usa-radio">
                  <input
                    class="usa-radio__input"
                    id="workers-comp-approved-yes"
                    type="radio"
                    name="workers-comp-approved"
                    value="yes"
                  />
                  <label class="usa-radio__label" for="workers-comp-approved-yes">
                    ${i18next.t('shared.yes')}
                  </label>
                </div>
                <div class="usa-radio">
                  <input
                    class="usa-radio__input"
                    id="workers-comp-approved-no"
                    type="radio"
                    name="workers-comp-approved"
                    value="no"
                  />
                  <label class="usa-radio__label" for="workers-comp-approved-no">
                    ${i18next.t('shared.no')}
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <button class="usa-button" id="submitReasonForLeave" type="submit">
          ${i18next.t('shared.saveAndContinue')}
        </button>
      </form>
    `;

    leaveScheduleContainer.parentNode.insertBefore(newMain, leaveScheduleContainer);
  }

  setupDisabilityTypeListeners();
  setupInputMasks();
  setupCausedByJobListeners();
  setupWorkersCompListeners();
  setupSubmitReasonForLeave();
}

function setupInputMasks() {
  const providerZipInput = document.getElementById('provider-zip');
  IMask(providerZipInput, { mask: '00000[-0000]' });

  const employerZipInput = document.getElementById('employer-zip');
  IMask(employerZipInput, { mask: '00000[-0000]' });

  const providerPhoneInput = document.getElementById('provider-phone');
  IMask(providerPhoneInput, { mask: '000-000-0000' });

  const employerPhoneInput = document.getElementById('employer-phone');
  IMask(employerPhoneInput, { mask: '000-000-0000' });
}

function setupDisabilityTypeListeners() {
  const pregnancyRadio = document.getElementById('reason-pregnancy');
  const illnessRadio = document.getElementById('reason-illness');
  const injuryRadio = document.getElementById('reason-injury');
  const reasonLegend = document.getElementById('reason-legend');
  const pregnancyDetails = document.getElementById('pregnancy-details');
  const illnessDetails = document.getElementById('illness-details');
  const injuryDetails = document.getElementById('injury-details');

  pregnancyRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    disabilityType = DisabilityType.PREGNANCY;
    pregnancyDetails.style.display = 'block';
    illnessDetails.style.display = 'none';
    injuryDetails.style.display = 'none';
    workDetailsVisible(false);
  });

  illnessRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    disabilityType = DisabilityType.ILLNESS;
    updateStringsWithDisabilityTypeString(i18next.t('reasonForLeave.work.illness'));
    pregnancyDetails.style.display = 'none';
    illnessDetails.style.display = 'block';
    injuryDetails.style.display = 'none';
    workDetailsVisible(true);
  });

  injuryRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    disabilityType = DisabilityType.INJURY;
    updateStringsWithDisabilityTypeString(i18next.t('reasonForLeave.work.injury'));
    pregnancyDetails.style.display = 'none';
    illnessDetails.style.display = 'none';
    injuryDetails.style.display = 'block';
    workDetailsVisible(true);
  });

  pregnancyRadio.addEventListener('invalid', function () {
    elementTextError(reasonLegend);
  });
}

function elementTextError(element) {
  element.style.color = 'rgb(139, 0, 0)';
  element.style.fontWeight = 'bold';
}

function resetElementText(element) {
  element.style.color = '';
  element.style.fontWeight = '';
}

function workDetailsVisible(visible) {
  document.getElementById('reasonForLeaveWork').style.display = visible ? "block" : "none";
  document.getElementById('caused-by-job-yes').required = visible;
  document.getElementById('caused-by-job-no').required = visible;
}

function updateStringsWithDisabilityTypeString(disabilityTypeString) {
  const causedByJobText = document.getElementById('causedByJobText');
  const employerInfoPrompt = document.getElementById('employerInfoPrompt');
  const workDisabilityDateLabelText = document.getElementById('workDisabilityDateLabelText');

  causedByJobText.textContent = i18next.t('reasonForLeave.work.causedByJob', { disabilityTypeString });
  employerInfoPrompt.textContent = i18next.t('reasonForLeave.work.employerInfo.prompt', { disabilityTypeString });
  workDisabilityDateLabelText.textContent = i18next.t('reasonForLeave.work.dateOfDisability', { disabilityTypeString });
}

function setupCausedByJobListeners() {
  const causedByJobYes = document.getElementById('caused-by-job-yes');
  const causedByJobNo = document.getElementById('caused-by-job-no');
  const causedByJobLegend = document.getElementById('caused-by-job-legend');
  
  causedByJobYes.addEventListener('change', function () {
    resetElementText(causedByJobLegend);
    workersCompVisible(true);
  });

  causedByJobNo.addEventListener('change', function () {
    resetElementText(causedByJobLegend);
    workersCompVisible(false);
  });

  causedByJobYes.addEventListener('invalid', function () {
    elementTextError(causedByJobLegend);
  });
}

function workersCompVisible(visible) {
  document.getElementById('workers-comp-claim').style.display = visible ? "block" : "none";
  document.getElementById('workers-comp-yes').required = visible;
  document.getElementById('workers-comp-no').required = visible;
  document.getElementById('workers-comp-approved-yes').required = visible;
  document.getElementById('workers-comp-approved-no').required = visible;
}

function setupWorkersCompListeners() {
  const workersCompYes = document.getElementById('workers-comp-yes');
  const workersCompNo = document.getElementById('workers-comp-no');
  const workersCompLegend = document.getElementById('workers-comp-legend');
  
  workersCompYes.addEventListener('change', function () {
    resetElementText(workersCompLegend);
    employerInfoVisible(true);
  });

  workersCompNo.addEventListener('change', function () {
    resetElementText(workersCompLegend);
    employerInfoVisible(false);
  });

  workersCompYes.addEventListener('invalid', function () {
    elementTextError(workersCompLegend);
  });
}

function employerInfoVisible(visible) {
  document.getElementById('employerInfo').style.display = visible ? "block" : "none";
  document.getElementById('employer-name').required = visible;
  document.getElementById('employer-mailing-address-1').required = visible;
  document.getElementById('employer-city').required = visible;
  document.getElementById('employer-state').required = visible;
  document.getElementById('employer-zip').required = visible;
  document.getElementById('workDisabilityDate').required = visible;
}

function setupSubmitReasonForLeave() {
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
        formValues[key] = value;
      }
    });

    logEvent('Reason for leave submit clicked', {});

    addToSessionData({
      [STORAGE_KEY_REASON_FOR_LEAVE]: JSON.stringify(formValues)
    });      

    currentScreen = Screens.LEAVE_SCHEDULE;
    changes();
  });
}

function stateOptions() {
  // TODO: accept more here, like territories etc?
  return `
    <option value>- Select -</option>
    <option value="AL">AL - Alabama</option>
    <option value="AK">AK - Alaska</option>
    <option value="AZ">AZ - Arizona</option>
    <option value="AR">AR - Arkansas</option>
    <option value="CA">CA - California</option>
    <option value="CO">CO - Colorado</option>
    <option value="CT">CT - Connecticut</option>
    <option value="DE">DE - Delaware</option>
    <option value="DC">DC - District of Columbia</option>
    <option value="FL">FL - Florida</option>
    <option value="GA">GA - Georgia</option>
    <option value="HI">HI - Hawaii</option>
    <option value="ID">ID - Idaho</option>
    <option value="IL">IL - Illinois</option>
    <option value="IN">IN - Indiana</option>
    <option value="IA">IA - Iowa</option>
    <option value="KS">KS - Kansas</option>
    <option value="KY">KY - Kentucky</option>
    <option value="LA">LA - Louisiana</option>
    <option value="ME">ME - Maine</option>
    <option value="MD">MD - Maryland</option>
    <option value="MA">MA - Massachusetts</option>
    <option value="MI">MI - Michigan</option>
    <option value="MN">MN - Minnesota</option>
    <option value="MS">MS - Mississippi</option>
    <option value="MO">MO - Missouri</option>
    <option value="MT">MT - Montana</option>
    <option value="NE">NE - Nebraska</option>
    <option value="NV">NV - Nevada</option>
    <option value="NH">NH - New Hampshire</option>
    <option value="NJ">NJ - New Jersey</option>
    <option value="NM">NM - New Mexico</option>
    <option value="NY">NY - New York</option>
    <option value="NC">NC - North Carolina</option>
    <option value="ND">ND - North Dakota</option>
    <option value="OH">OH - Ohio</option>
    <option value="OK">OK - Oklahoma</option>
    <option value="OR">OR - Oregon</option>
    <option value="PA">PA - Pennsylvania</option>
    <option value="RI">RI - Rhode Island</option>
    <option value="SC">SC - South Carolina</option>
    <option value="SD">SD - South Dakota</option>
    <option value="TN">TN - Tennessee</option>
    <option value="TX">TX - Texas</option>
    <option value="UT">UT - Utah</option>
    <option value="VT">VT - Vermont</option>
    <option value="VA">VA - Virginia</option>
    <option value="WA">WA - Washington</option>
    <option value="WV">WV - West Virginia</option>
    <option value="WI">WI - Wisconsin</option>
    <option value="WY">WY - Wyoming</option>
  `;
}
