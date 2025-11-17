import i18next from 'i18next';
import IMask from 'imask';
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

        <label class="usa-label" for="provider-name">${i18next.t('reasonForLeave.provider.name')}
          <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
        </label>
        <input class="usa-input" id="provider-name" name="provider-name" required />

        <fieldset class="usa-fieldset margin-top-5">
          <legend id="provider-in-usa-legend" class="usa-legend usa-legend">
            <span class="required-asterisk">*</span>
            ${i18next.t('reasonForLeave.provider.inUSA')}
          </legend>
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="provider-in-usa-yes"
              type="radio"
              name="provider-in-usa"
              value="yes"
              required
            />
            <label class="usa-radio__label" for="provider-in-usa-yes">
              ${i18next.t('shared.yes')}
            </label>
          </div>
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="provider-in-usa-no"
              type="radio"
              name="provider-in-usa"
              value="no"
              required
            />
            <label class="usa-radio__label" for="provider-in-usa-no">
              ${i18next.t('shared.no')}
            </label>
          </div>
        </fieldset>

        <div id="provider-intl-address" style="display:none;">
          <label class="usa-label" for="provider-intl-mailing-address-1">${i18next.t('contact.address')} 1
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input" id="provider-intl-mailing-address-1" name="provider-intl-mailing-address-1" />

          <label class="usa-label" for="provider-intl-mailing-address-2">${i18next.t('contact.address')} 2</label>
          <input class="usa-input" id="provider-intl-mailing-address-2" name="provider-intl-mailing-address-2" />

          <label class="usa-label" for="provider-intl-mailing-address-3">${i18next.t('contact.address')} 3</label>
          <input class="usa-input" id="provider-intl-mailing-address-3" name="provider-intl-mailing-address-3" />

          <label class="usa-label" for="provider-intl-mailing-address-4">${i18next.t('contact.address')} 4</label>
          <input class="usa-input" id="provider-intl-mailing-address-4" name="provider-intl-mailing-address-4" />
        </div>

        <div id="provider-usa-address" style="display:none;">
          <label class="usa-label" for="provider-mailing-address-1">${i18next.t('contact.street1')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input" id="provider-mailing-address-1" name="provider-mailing-address-1" />

          <label class="usa-label" for="provider-mailing-address-2">${i18next.t('contact.street2')}</label>
          <input class="usa-input" id="provider-mailing-address-2" name="provider-mailing-address-2" />

          <label class="usa-label" for="provider-city">${i18next.t('contact.city')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
          <input class="usa-input" id="provider-city" name="provider-city" />

          <label class="usa-label" for="provider-state">${i18next.t('contact.state')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
          <div class="usa-combo-box">
            <select class="usa-select" id="provider-state" name="provider-state">
              ${stateOptions()}
            </select>
          </div>

          <label class="usa-label" for="provider-zip">${i18next.t('contact.zipcode')}
            <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input usa-input--medium" id="provider-zip" name="provider-zip" pattern="\\d{5}(-\\d{4})?" />

        </div>

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
            
            <label class="usa-label" for="employer-name">${i18next.t('reasonForLeave.work.employerInfo.name')}
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
            <label class="usa-label no-margin-top" id="workDisabilityDateLabel" for="workDisabilityDate">
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
  return reasonForLeavePage;
}

export function setupReasonForLeavePage(setDisabilityType, showLeaveSchedulePage) {
  setupDisabilityTypeListeners(setDisabilityType);
  setupPasteDetection();
  setupAddressListeners();
  setupInputMasks();
  setupCausedByJobListeners();
  setupWorkersCompListeners();
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
    workDetailsVisible(false);
  });

  illnessRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    setDisabilityType(DisabilityType.ILLNESS);
    updateStringsWithDisabilityTypeString(i18next.t('shared.illness'));
    pregnancyDetails.style.display = 'none';
    illnessDetails.style.display = 'block';
    injuryDetails.style.display = 'none';
    workDetailsVisible(true);
  });

  injuryRadio.addEventListener('change', function () {
    resetElementText(reasonLegend);
    setDisabilityType(DisabilityType.INJURY);
    updateStringsWithDisabilityTypeString(i18next.t('shared.injury'));
    pregnancyDetails.style.display = 'none';
    illnessDetails.style.display = 'none';
    injuryDetails.style.display = 'block';
    workDetailsVisible(true);
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

function setupAddressListeners() {
  const addressInUSAYes = document.getElementById('provider-in-usa-yes');
  const addressInUSANo = document.getElementById('provider-in-usa-no');
  const addressInUSALegend = document.getElementById('provider-in-usa-legend');

  addressInUSAYes.addEventListener('change', function () {
    resetElementText(addressInUSALegend);
    providerAddressInUSA(true);
  });

  addressInUSANo.addEventListener('change', function () {
    resetElementText(addressInUSALegend);
    providerAddressInUSA(false);
  });

  addressInUSAYes.addEventListener('invalid', function () {
    elementTextError(addressInUSALegend);
  });
}

function providerAddressInUSA(inUSA) {
  document.getElementById('provider-intl-address').style.display = inUSA ? "none" : "block";
  document.getElementById('provider-usa-address').style.display = inUSA ? "block" : "none";

  document.getElementById('provider-mailing-address-1').required = inUSA;
  document.getElementById('provider-city').required = inUSA;
  document.getElementById('provider-state').required = inUSA;
  document.getElementById('provider-zip').required = inUSA;

  document.getElementById('provider-intl-mailing-address-1').required = !inUSA;
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
      [STORAGE_KEY_REASON_FOR_LEAVE]: JSON.stringify(formValues)
    });      

    showLeaveSchedulePage();
  });
}

function stateOptions() {
  // TODO: only accept 50 states + DC. all else must go through intl interface
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

function workDetailsVisible(visible) {
  document.getElementById('reasonForLeaveWork').style.display = visible ? "block" : "none";
  document.getElementById('caused-by-job-yes').required = visible;
  document.getElementById('caused-by-job-no').required = visible;

  if (!visible) {
    workersCompVisible(false);
  }
}

function workersCompVisible(visible) {
  document.getElementById('workers-comp-claim').style.display = visible ? "block" : "none";
  document.getElementById('workers-comp-yes').required = visible;
  document.getElementById('workers-comp-no').required = visible;
  document.getElementById('workers-comp-approved-yes').required = visible;
  document.getElementById('workers-comp-approved-no').required = visible;

  if (!visible) {
    employerInfoVisible(false);
  }
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

function updateStringsWithDisabilityTypeString(disabilityTypeString) {
  const causedByJobText = document.getElementById('causedByJobText');
  const employerInfoPrompt = document.getElementById('employerInfoPrompt');
  const workDisabilityDateLabelText = document.getElementById('workDisabilityDateLabelText');

  causedByJobText.textContent = i18next.t('reasonForLeave.work.causedByJob', { disabilityTypeString });
  employerInfoPrompt.textContent = i18next.t('reasonForLeave.work.employerInfo.prompt', { disabilityTypeString });
  workDisabilityDateLabelText.textContent = i18next.t('reasonForLeave.work.dateOfDisability', { disabilityTypeString });
}
