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

const backButtonId = "leaveScheduleBack";

let disabilityType = null;
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
    main h2, main h3 {
      color: black;
      font-variant: normal;
      font-weight: bold;
    }

    main h2 {
      font-size: 24px;
      margin: 20px 0 10px;
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

    .usa-date-picker__button {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20height=%2224%22%20viewBox=%220%200%2024%2024%22%20width=%2224%22><path%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/><path%20d=%22M20%203h-1V1h-2v2H7V1H5v2H4c-1.1%200-2%20.9-2%202v16c0%201.1.9%202%202%202h16c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2zm0%2018H4V8h16v13z%22/></svg>');
    }

    .usa-label {
      margin-top: 30px;
    }

    .usa-label, .usa-radio__label {
      text-align: left;
    }

    .usa-legend {
      max-width: fit-content;
    }

    .usa-textarea {
      resize: none;
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
            </div>
          </fieldset>
        </div>

        <h2>${i18next.t('reasonForLeave.provider.title')}</h2>

        <p>${i18next.t('reasonForLeave.provider.explanation')}</p>

        <div class="bordered-set">
          <h3>${i18next.t('reasonForLeave.provider.info')}</h3>

          <label class="usa-label" for="provider-type">
            ${i18next.t('reasonForLeave.provider.type.title')}
            <span class="required-asterisk">*</span>
          </label>
          <select class="usa-select" name="provider-type" id="provider-type" required>
            <option value>- ${i18next.t('reasonForLeave.provider.type.select')} -</option>
            <option value="advancedPracticeNurse">${i18next.t('reasonForLeave.provider.type.advancedPracticeNurse')}</option>
            <option value="advancedPracticeRegisteredNurse">${i18next.t('reasonForLeave.provider.type.advancedPracticeRegisteredNurse')}</option>
            <option value="certifiedNursePractitioner">${i18next.t('reasonForLeave.provider.type.certifiedNursePractitioner')}</option>
            <option value="clinicalNurseSpecialist">${i18next.t('reasonForLeave.provider.type.clinicalNurseSpecialist')}</option>
            <option value="certifiedNurseMidwife">${i18next.t('reasonForLeave.provider.type.certifiedNurseMidwife')}</option>
            <option value="certifiedProfessionalMidwife">${i18next.t('reasonForLeave.provider.type.certifiedProfessionalMidwife')}</option>
            <option value="chiropractor">${i18next.t('reasonForLeave.provider.type.chiropractor')}</option>
            <option value="dentist">${i18next.t('reasonForLeave.provider.type.dentist')}</option>
            <option value="erPhysician">${i18next.t('reasonForLeave.provider.type.erPhysician')}</option>
            <option value="medicalDoctor">${i18next.t('reasonForLeave.provider.type.medicalDoctor')}</option>
            <option value="optometrist">${i18next.t('reasonForLeave.provider.type.optometrist')}</option>
            <option value="osteopath">${i18next.t('reasonForLeave.provider.type.osteopath')}</option>
            <option value="podiatrist">${i18next.t('reasonForLeave.provider.type.podiatrist')}</option>
            <option value="psychologist">${i18next.t('reasonForLeave.provider.type.psychologist')}</option>
            <option value="physicianAssistant">${i18next.t('reasonForLeave.provider.type.physicianAssistant')}</option>
            <option value="specialist">${i18next.t('reasonForLeave.provider.type.specialist')}</option>
          </select>

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
            </select>
          </div>

          <label class="usa-label" for="provider-zip">${i18next.t('contact.zipcode')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input usa-input--medium" id="provider-zip" name="provider-zip" pattern="[\d]{5}(-[\d]{4})?" required />

          <label class="usa-label" for="provider-phone">${i18next.t('contact.phone')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <div class="usa-hint" id="provider-primaryPnHint">${i18next.t('contact.phoneHint')}</div>
          <input
            class="usa-input margin-bottom-1"
            id="provider-phone"
            name="provider-phone"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            aria-describedby="provider-primaryPnHint"
            required
          />
        </div>

        <div id="reasonForLeaveWork" style="display: none;">

          <h2>${i18next.t('reasonForLeave.work.title')}</h2>

          <div class="bordered-set">
            <fieldset class="usa-fieldset">
              <legend class="usa-legend usa-legend">
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
              <legend class="usa-legend usa-legend">
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
                </select>
              </div>

              <label class="usa-label" for="employer-zip">${i18next.t('contact.zipcode')}
                <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
              </label>
              <input class="usa-input usa-input--medium" id="employer-zip" name="employer-zip" pattern="[\d]{5}(-[\d]{4})?" />

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
                pattern="[0-9]*"
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
  const workDetails = document.getElementById('reasonForLeaveWork');

  pregnancyRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    pregnancyDetails.style.display = 'block';
    workDetails.style.display = 'none';
  });

  illnessRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    disabilityType = i18next.t('reasonForLeave.work.illness');
    updateStringsWithDisabilityType(disabilityType);
    pregnancyDetails.style.display = 'none';
    workDetails.style.display = 'block';
  });

  injuryRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    disabilityType = i18next.t('reasonForLeave.work.injury');
    updateStringsWithDisabilityType(disabilityType);
    pregnancyDetails.style.display = 'none';
    workDetails.style.display = 'block';
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

function updateStringsWithDisabilityType(disabilityType) {
  const causedByJobText = document.getElementById('causedByJobText');
  const employerInfoPrompt = document.getElementById('employerInfoPrompt');
  const workDisabilityDateLabelText = document.getElementById('workDisabilityDateLabelText');

  causedByJobText.textContent = i18next.t('reasonForLeave.work.causedByJob', { disabilityType });
  employerInfoPrompt.textContent = i18next.t('reasonForLeave.work.employerInfo.prompt', { disabilityType });
  workDisabilityDateLabelText.textContent = i18next.t('reasonForLeave.work.dateOfDisability', { disabilityType });
}

function setupCausedByJobListeners() {
  const workersCompYes = document.getElementById('workers-comp-yes');
  const workersCompNo = document.getElementById('workers-comp-no');

  const employerInfo = document.getElementById('employerInfo');
  
  workersCompYes.addEventListener('change', function () {
    employerInfo.style.display = 'block';
  });

  workersCompNo.addEventListener('change', function () {
    employerInfo.style.display = 'none';
  });
}

function setupWorkersCompListeners() {
  const causedByJobYes = document.getElementById('caused-by-job-yes');
  const causedByJobNo = document.getElementById('caused-by-job-no');

  const workersCompClaim = document.getElementById('workers-comp-claim');
  
  causedByJobYes.addEventListener('change', function () {
    workersCompClaim.style.display = 'block';
  });

  causedByJobNo.addEventListener('change', function () {
    workersCompClaim.style.display = 'none';
  });
}

function setupSubmitReasonForLeave() {
  // const form = document.getElementById('reason-for-leave-form');
  // form.addEventListener('submit', function() {
  //   console.log(`submit form: ${form}`);
  // });



  // const submitBtn = document.querySelector('#submitReasonForLeave');
  // if (submitBtn) {
  //   submitBtn.addEventListener('click', function (event) {
  //     event.preventDefault();
  //     logEvent('Reason for leave submit clicked', {});

  //     addToSessionData({
  //       [STORAGE_KEY_REASON_FOR_LEAVE]: "injury"
  //     });      

  //     currentScreen = Screens.LEAVE_SCHEDULE;
  //     changes();
  //   });
  // }
}
