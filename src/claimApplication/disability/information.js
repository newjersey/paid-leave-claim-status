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

const DisabilityType = Object.freeze({
  PREGNANCY: 'pregnancy',
  ILLNESS: 'illness',
  INJURY: 'injury',
});

const backButtonId = "leaveScheduleBack";

let currentScreen = Screens.REASON_FOR_LEAVE;
let disabilityType = null;

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

    .usa-label, .usa-radio__label {
      text-align: left;
    }

    .usa-legend {
      max-width: fit-content;
    }

    .usa-textarea {
      resize: none;
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

      <h2>${i18next.t('reasonForLeave.provider.title')}</h2>

      <p>${i18next.t('reasonForLeave.provider.explanation')}</p>

      <div class="bordered-set">
        <h3>${i18next.t('reasonForLeave.provider.info')}</h3>

        <label class="usa-label" for="provider-type">
          <span class="required-asterisk">*</span>
          ${i18next.t('reasonForLeave.provider.type.title')}
        </label>
        <select class="usa-select" name="provider-type" id="provider-type">
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

        <label class="usa-label" for="provider-first-name">${i18next.t('reasonForLeave.provider.firstName')}</label>
        <input class="usa-input" id="provider-first-name" name="provider-first-name" />

        <label class="usa-label" for="provider-last-name">${i18next.t('reasonForLeave.provider.lastName')}</label>
        <input class="usa-input" id="provider-last-name" name="provider-last-name" />

        <label class="usa-label" for="mailing-address-1">${i18next.t('contact.street1')}
          <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
        <input class="usa-input" id="mailing-address-1" name="mailing-address-1" required />

        <label class="usa-label" for="mailing-address-2">${i18next.t('contact.street2')}</label>
        <input class="usa-input" id="mailing-address-2" name="mailing-address-2" />

        <label class="usa-label" for="city">${i18next.t('contact.city')}
          <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
        <input class="usa-input" id="city" name="city" required />

        <label class="usa-label" for="state">${i18next.t('contact.state')}
          <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
        <div class="usa-combo-box">
          <select class="usa-select" id="state" name="state">
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
            <option value="VI">VI - Virgin Islands</option>
            <option value="VA">VA - Virginia</option>
            <option value="WA">WA - Washington</option>
            <option value="WV">WV - West Virginia</option>
            <option value="WI">WI - Wisconsin</option>
            <option value="WY">WY - Wyoming</option>
          </select>
        </div>

        <label class="usa-label" for="provider-zip">${i18next.t('contact.zipcode')}</label>
        <input class="usa-input usa-input--medium" id="provider-zip" name="provider-zip" pattern="[\d]{5}(-[\d]{4})?" />

        <label class="usa-label" for="provider-phone">${i18next.t('contact.phone')}</label>
        <div class="usa-hint" id="provider-primaryPnHint">${i18next.t('contact.phoneHint')}</div>
        <input
          class="usa-input margin-bottom-1"
          id="provider-phone"
          name="provider-phone"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          aria-describedby="provider-primaryPnHint"/>
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
      </div>

      <button class="usa-button" id="submitReasonForLeave">
        ${i18next.t('shared.saveAndContinue')}
      </button>
    `;

    leaveScheduleContainer.parentNode.insertBefore(newMain, leaveScheduleContainer);
  }

  setupInputMasks();
  setupRadioButtonListeners();
  setupSubmitReasonForLeaveButton();
}

function setupInputMasks() {
  const zipInput = document.getElementById('provider-zip');
  IMask(zipInput, { mask: '00000[-0000]' });

  const phoneInput = document.getElementById('provider-phone');
  IMask(phoneInput, { mask: '000-000-0000' });
}

function setupRadioButtonListeners() {
  const pregnancyRadio = document.getElementById('reason-pregnancy');
  const illnessRadio = document.getElementById('reason-illness');
  const injuryRadio = document.getElementById('reason-injury');

  const pregnancyDetails = document.getElementById('pregnancy-details');
  const workDetails = document.getElementById('reasonForLeaveWork');
  const causedByJobText = document.getElementById('causedByJobText');
  
  pregnancyRadio.addEventListener('change', function () {
    disabilityType = DisabilityType.PREGNANCY;
    pregnancyDetails.style.display = 'block';
    workDetails.style.display = 'none';
  });

  illnessRadio.addEventListener('change', function () {
    disabilityType = DisabilityType.ILLNESS;
    causedByJobText.textContent = i18next.t('reasonForLeave.work.causedByJob', { disabilityType });
    pregnancyDetails.style.display = 'none';
    workDetails.style.display = 'block';
  });

  injuryRadio.addEventListener('change', function () {
    disabilityType = DisabilityType.INJURY;
    causedByJobText.textContent = i18next.t('reasonForLeave.work.causedByJob', { disabilityType });
    pregnancyDetails.style.display = 'none';
    workDetails.style.display = 'block';
  });
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
