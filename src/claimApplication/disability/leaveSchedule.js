import i18next from 'i18next';
import { DisabilityType, elementTextError, resetElementText, styleRadioButton } from '../utils';

export function leaveSchedulePage() {
  const leaveSchedulePage = document.createElement('div');
  leaveSchedulePage.id = "leaveSchedulePage";
  leaveSchedulePage.classList.add("page");
  leaveSchedulePage.innerHTML = `
    <form id="leave-schedule-pregnancy-form">
      <h2>${i18next.t('leaveSchedule.pregnancy.fddTitle')}</h2>
      <p><strong>${i18next.t('leaveSchedule.pregnancy.importantNotes')}</strong></p>
      <p>${i18next.t('leaveSchedule.pregnancy.youCanApply')}</p>



      <div class="bordered-set">
        <label class="usa-label no-margin-top" id="fddPregnancyLabel" for="fddPregnancy">
          <span class="required-asterisk">*</span>
          ${i18next.t('leaveSchedule.pregnancy.fddQuestion')}
        </label>
        <div class="usa-hint" id="fddPregnancyHint">${i18next.t('shared.dateFormat')}</div>
        <div class="usa-date-picker">
          <input
            class="usa-input"
            id="fddPregnancy"
            name="fddPregnancy"
            aria-labelledby="fddPregnancyLabel"
            aria-describedby="fddPregnancyHint"
            required
          />
        </div>
      </div>

      <h2>${i18next.t('leaveSchedule.pregnancy.beforeAfterTitle')}</h2>
      <div class="bordered-set">
        <label class="usa-label no-margin-top" id="lastWorkdayPregnancyLabel" for="lastWorkdayPregnancy">
          <span class="required-asterisk">*</span>
          ${i18next.t('leaveSchedule.pregnancy.lastWorkday')}
        </label>
        <div class="usa-hint" id="lastWorkdayPregnancyHint">${i18next.t('shared.dateFormat')}</div>
        <div class="usa-date-picker">
          <input
            class="usa-input"
            id="lastWorkdayPregnancy"
            name="lastWorkdayPregnancy"
            aria-labelledby="lastWorkdayPregnancyLabel"
            aria-describedby="lastWorkdayPregnancyHint"
            required
          />
        </div>
      </div>

      <div class="bordered-set">
        <fieldset class="usa-fieldset">
          <legend id="recovered-pregnancy-legend" class="usa-legend usa-legend">
            <span class="required-asterisk">*</span>
            ${i18next.t('leaveSchedule.pregnancy.recovered')}
          </legend>
          
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="recovered-pregnancy-yes"
              type="radio"
              name="recovered-pregnancy"
              value="yes"
              required
            />
            <label class="usa-radio__label" for="recovered-pregnancy-yes">
              ${i18next.t('shared.yes')}
            </label>
          </div>
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="recovered-pregnancy-no"
              type="radio"
              name="recovered-pregnancy"
              value="no"
              required
            />
            <label class="usa-radio__label" for="recovered-pregnancy-no">
              ${i18next.t('shared.no')}
            </label>
          </div>
        </fieldset>
      </div>

      <div id="recoveryDatePregnancyContainer" class="bordered-set" style="display:none;">
        <label class="usa-label no-margin-top" id="recoveryDatePregnancyLabel" for="recoveryDatePregnancy">
          <span class="required-asterisk">*</span>
          ${i18next.t('leaveSchedule.pregnancy.recoveryDate')}
        </label>
        <div class="usa-hint" id="recoveryDatePregnancyHint">${i18next.t('shared.dateFormat')}</div>
        <div class="usa-date-picker">
          <input
            class="usa-input"
            id="recoveryDatePregnancy"
            name="recoveryDatePregnancy"
            aria-labelledby="recoveryDatePregnancyLabel"
            aria-describedby="recoveryDatePregnancyHint"
          />
        </div>
      </div>

      <div id="estRecoveryDatePregnancyContainer" class="bordered-set" style="display:none;">
        <label class="usa-label no-margin-top" id="estRecoveryDatePregnancyLabel" for="estRecoveryDatePregnancy">
          <span class="required-asterisk">*</span>
          ${i18next.t('leaveSchedule.pregnancy.estRecoveryDate')}
        </label>
        <div class="usa-hint" id="estRecoveryDatePregnancyHint">${i18next.t('shared.dateFormat')}</div>
        <div class="usa-date-picker">
          <input
            class="usa-input"
            id="estRecoveryDatePregnancy"
            name="estRecoveryDatePregnancy"
            aria-labelledby="estRecoveryDatePregnancyLabel"
            aria-describedby="estRecoveryDatePregnancyHint"
          />
        </div>
      </div>



      <button class="usa-button" id="submitLeaveSchedulePregnancy" type="submit">
        ${i18next.t('shared.saveAndContinue')}
      </button>
    </form>

    <form id="leave-schedule-illness-injury-form">
      <h2>${i18next.t('leaveSchedule.illnessInjury.fddTitle')}</h2>
      <p>${i18next.t('leaveSchedule.illnessInjury.fddNotes')}</p>

      <div class="bordered-set">
        <label class="usa-label no-margin-top" id="fddIllnessInjuryLabel" for="fddIllnessInjury">
          <span class="required-asterisk">*</span>
          ${i18next.t('leaveSchedule.illnessInjury.fddQuestion')}
        </label>
        <div class="usa-hint" id="fddIllnessInjuryHint">${i18next.t('shared.dateFormat')}</div>
        <div class="usa-date-picker">
          <input
            class="usa-input"
            id="fddIllnessInjury"
            name="fddIllnessInjury"
            aria-labelledby="fddIllnessInjuryLabel"
            aria-describedby="fddIllnessInjuryHint"
            required
          />
        </div>
      </div>

      <h2>${i18next.t('leaveSchedule.illnessInjury.beforeAfterTitle')}</h2>
      <div class="bordered-set">
        <label class="usa-label no-margin-top" id="lastWorkdayIllnessInjuryLabel" for="lastWorkdayIllnessInjury">
          <span class="required-asterisk">*</span>
          ${i18next.t('leaveSchedule.illnessInjury.lastWorkday')}
        </label>
        <div class="usa-hint" id="lastWorkdayIllnessInjuryHint">${i18next.t('shared.dateFormat')}</div>
        <div class="usa-date-picker">
          <input
            class="usa-input"
            id="lastWorkdayIllnessInjury"
            name="lastWorkdayIllnessInjury"
            aria-labelledby="lastWorkdayIllnessInjuryLabel"
            aria-describedby="lastWorkdayIllnessInjuryHint"
            required
          />
        </div>
      </div>

      <div class="bordered-set">
        <fieldset class="usa-fieldset">
          <legend id="recovered-illness-injury-legend" class="usa-legend usa-legend">
            <span class="required-asterisk">*</span>
            ${i18next.t('leaveSchedule.illnessInjury.recovered')}
          </legend>
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="recovered-illness-injury-yes"
              type="radio"
              name="recovered-illness-injury"
              value="yes"
              required
            />
            <label class="usa-radio__label" for="recovered-illness-injury-yes">
              ${i18next.t('shared.yes')}
            </label>
          </div>
          <div class="usa-radio">
            <input
              class="usa-radio__input"
              id="recovered-illness-injury-no"
              type="radio"
              name="recovered-illness-injury"
              value="no"
              required
            />
            <label class="usa-radio__label" for="recovered-illness-injury-no">
              ${i18next.t('shared.no')}
            </label>
          </div>
        </fieldset>
      </div>

      <div id="recoveryDateIllnessInjuryContainer" class="bordered-set" style="display:none;">
        <label class="usa-label no-margin-top" id="recoveryDateIllnessInjuryLabel" for="recoveryDateIllnessInjury">
          <span class="required-asterisk">*</span>
          ${i18next.t('leaveSchedule.illnessInjury.recoveryDate')}
        </label>
        <div class="usa-hint" id="recoveryDateIllnessInjuryHint">${i18next.t('shared.dateFormat')}</div>
        <div class="usa-date-picker">
          <input
            class="usa-input"
            id="recoveryDateIllnessInjury"
            name="recoveryDateIllnessInjury"
            aria-labelledby="recoveryDateIllnessInjuryLabel"
            aria-describedby="recoveryDateIllnessInjuryHint"
          />
        </div>
      </div>

      <div id="estRecoveryDateIllnessInjuryContainer" class="bordered-set" style="display:none;">
        <label class="usa-label no-margin-top" id="estRecoveryDateIllnessInjuryLabel" for="estRecoveryDateIllnessInjury">
          <span class="required-asterisk">*</span>
          ${i18next.t('leaveSchedule.illnessInjury.estRecoveryDate')}
        </label>
        <div class="usa-hint" id="estRecoveryDateIllnessInjuryHint">${i18next.t('shared.dateFormat')}</div>
        <div class="usa-date-picker">
          <input
            class="usa-input"
            id="estRecoveryDateIllnessInjury"
            name="estRecoveryDateIllnessInjury"
            aria-labelledby="estRecoveryDateIllnessInjuryLabel"
            aria-describedby="estRecoveryDateIllnessInjuryHint"
          />
        </div>
      </div>

      <button class="usa-button" id="submitLeaveSchedule" type="submit">
        ${i18next.t('shared.saveAndContinue')}
      </button>
    </form>
  `;

  return leaveSchedulePage;  
}

export function showLeaveScheduleForDisabilityType(disabilityType) {
  styleFDD(disabilityType);
  if (disabilityType === DisabilityType.PREGNANCY) {
    // styleFDDForPregnancy();
    // styleLDWForPregnancy();
  } else {
    // styleFDDForIllnessInjury(disabilityType);
    // styleLDWForIllnessInjury(disabilityType);
  }

  // TODO:

  // const leaveSchedulePregnancyForm = document.getElementById('leave-schedule-pregnancy-form');
  // const leaveScheduleIllnessInjuryForm = document.getElementById('leave-schedule-illness-injury-form');

  // if (disabilityType === DisabilityType.PREGNANCY) {
  //   leaveSchedulePregnancyForm.style.display = 'block';
  //   leaveScheduleIllnessInjuryForm.style.display = 'none';
  // } else if (disabilityType === DisabilityType.ILLNESS || disabilityType === DisabilityType.INJURY) {
  //   leaveSchedulePregnancyForm.style.display = 'none';
  //   leaveScheduleIllnessInjuryForm.style.display = 'block';
  // } else {
  //   // unknown -- have user submit reason for leave again
  //   const backButton = document.getElementById(backButtonId);
  //   if (backButton) {
  //     backButton.click();
  //   }
  // }
}

export function setupLeaveSchedulePage() {
  setupFDD();
}

function setupFDD() {
  const fieldset = document.querySelector('#MainDiv > fieldset');
  fieldset.id = "fddFieldset";
  const divElement = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_dvShowFDD');

  const maternityTimelineToolHtml = `
    <fieldset id="maternityTimeline">
      <svg style="vertical-align:-5px;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>
      ${i18next.t('leaveSchedule.pregnancy.maternityTimeline')}
    </fieldset>
  `;

  fieldset.insertAdjacentHTML('beforebegin', maternityTimelineToolHtml);

  const notesHtml = `
    <br>
    <p id="fddNotes"></p>
    <br>
  `;

  fieldset.insertAdjacentHTML('beforebegin', notesHtml);

  removeOldFDDText();

  const fddQuestion = document.createElement('div');
  fddQuestion.innerHTML = `
    <label class="usa-label no-margin-top" id="fddLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt">
      <span class="required-asterisk">*</span>
      <span id="fddQuestion"></span>
      </label>
    <div class="usa-hint" id="fddHint">${i18next.t('shared.dateFormat')}</div>
  `;
  divElement.insertBefore(fddQuestion, divElement.firstChild);
}

function styleFDD(disabilityType) {
  const fddFieldset = document.getElementById('fddFieldset');
  
  const maternityTimeline = document.getElementById('maternityTimeline');
  maternityTimeline.style.display = disabilityType === DisabilityType.PREGNANCY
    ? 'block'
    : 'none';

  const fddNotes = document.getElementById('fddNotes');
  fddNotes.innerHTML = disabilityType === DisabilityType.PREGNANCY
    ? i18next.t('leaveSchedule.pregnancy.fddNotes')
    : i18next.t('leaveSchedule.illnessInjury.fddNotes');

  const legend = fddFieldset.querySelector('legend');
  legend.textContent = disabilityType === DisabilityType.PREGNANCY
    ? i18next.t('leaveSchedule.pregnancy.fddTitle')
    : i18next.t('leaveSchedule.illnessInjury.fddTitle');

  const fddQuestion = document.getElementById('fddQuestion');
  fddQuestion.innerHTML = disabilityType === DisabilityType.PREGNANCY
    ? i18next.t('leaveSchedule.pregnancy.fddQuestion')
    : i18next.t('leaveSchedule.illnessInjury.fddQuestion', {
      disabilityTypeString: disabilityType === DisabilityType.ILLNESS 
        ? i18next.t('shared.illness') 
        : i18next.t('shared.injury') 
      }
    );
}

function removeOldFDDText() {
  const divElement = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_dvShowFDD');
  divElement.querySelector('a').remove();
  divElement.querySelector('strong').remove();
  const childNodes = divElement.childNodes;
  childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.remove();
    }
  });
}

function styleLDWForPregnancy() {
  const fieldset = document.querySelector('#divLDW > fieldset');
  removeUnwantedElements(fieldset);

  const legend = fieldset.querySelector('legend');
  legend.textContent = i18next.t('leaveSchedule.pregnancy.beforeAfterTitle');

  const ldwDateInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd');
  const ldwLabel = `
    <label class="usa-label no-margin-top" id="ldwPregnancyLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd">
      <span class="required-asterisk">*</span>
      ${i18next.t('leaveSchedule.pregnancy.lastWorkday')}
    </label>
    <div class="usa-hint" id="ldwPregnancyHint">${i18next.t('shared.dateFormat')}</div>
  `;
  ldwDateInput.insertAdjacentHTML('beforebegin', ldwLabel);

  const recoveredYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes');
  const recoveredQuestion = `
    <br><br>
    <hr>
    <label class="usa-label">
      <span class="required-asterisk">*</span>
      ${i18next.t('leaveSchedule.pregnancy.recovered')}
    </label>
  `;
  recoveredYes.insertAdjacentHTML('beforebegin', recoveredQuestion);
  styleRecoveryRadioButtons();

  const returnInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk');
  const returnLabel = `
    <br><br>
    <hr>
    <label class="usa-label" id="returnPregnancyLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk">
      <span class="required-asterisk">*</span>
      ${i18next.t('leaveSchedule.pregnancy.recoveryDate')}
    </label>
    <div class="usa-hint" id="returnPregnancyHint">${i18next.t('shared.dateFormat')}</div>
  `;
  returnInput.insertAdjacentHTML('beforebegin', returnLabel);

  const estReturnInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk');
  const estReturnLabel = `
    <br><br>
    <hr>
    <label class="usa-label" id="estReturnPregnancyLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk">
      <span class="required-asterisk">*</span>
      ${i18next.t('leaveSchedule.pregnancy.estRecoveryDate')}
    </label>
    <div class="usa-hint" id="estReturnPregnancyHint">${i18next.t('shared.dateFormat')}</div>
  `;
  estReturnInput.insertAdjacentHTML('beforebegin', estReturnLabel);

  const alertHtml = `
    <div class="usa-alert usa-alert--info" id="pregnancyAlert">
      <div class="usa-alert__body">
        <h2 class="usa-alert__heading">${i18next.t('leaveSchedule.pregnancy.whatsNext')}</h2>
        <p class="usa-alert__text">
          ${i18next.t('leaveSchedule.pregnancy.howDelivered')}
        </p>
      </div>
    </div>
  `;
  fieldset.insertAdjacentHTML('afterend', alertHtml);
}

function styleLDWForIllnessInjury(disabilityType) {
  const fieldset = document.querySelector('#divLDW > fieldset');
  removeUnwantedElements(fieldset);

  const legend = fieldset.querySelector('legend');
  legend.textContent = i18next.t('leaveSchedule.illnessInjury.beforeAfterTitle');
}

function styleRecoveryRadioButtons() {
  const recoveredYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes');
  const recoveredYesLabel = `
    <label class="usa-label" id="recPregnancyLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes">
      ${i18next.t('shared.yes')}
    </label>
  `;
  recoveredYes.insertAdjacentHTML('beforebegin', recoveredYesLabel);

  const recoveredNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo');
  const recoveredNoLabel = `
    <label class="usa-label" id="recPregnancyLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo">
      ${i18next.t('shared.no')}
    </label>
  `;
  recoveredNo.insertAdjacentHTML('beforebegin', recoveredNoLabel);

  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo');
}

function removeUnwantedElements(parent) {
  Array.from(parent.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName.toLowerCase() !== 'legend' && node.tagName.toLowerCase() !== 'div' && node.tagName.toLowerCase() !== 'input') {
        node.remove();
      } else {
        removeUnwantedElements(node);
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      node.remove();
    }
  });
}

function setupRecoveredPregnancyListeners() {
  const recoveredPregnancyYes = document.getElementById('recovered-pregnancy-yes');
  const recoveredPregnancyNo = document.getElementById('recovered-pregnancy-no');
  const recoveredPregnancyLegend = document.getElementById('recovered-pregnancy-legend');

  recoveredPregnancyYes.addEventListener('change', function () {
    resetElementText(recoveredPregnancyLegend);
    recoveredPregnancy(true);
  });

  recoveredPregnancyNo.addEventListener('change', function () {
    resetElementText(recoveredPregnancyLegend);
    recoveredPregnancy(false);
  });

  recoveredPregnancyYes.addEventListener('invalid', function () {
    elementTextError(recoveredPregnancyLegend);
  });
}

function recoveredPregnancy(recovered) {
  document.getElementById('recoveryDatePregnancyContainer').style.display = recovered ? "block" : "none";
  document.getElementById('recoveryDatePregnancy').required = recovered;

  document.getElementById('estRecoveryDatePregnancyContainer').style.display = recovered ? "none" : "block";
  document.getElementById('estRecoveryDatePregnancy').required = !recovered;
}

function setupRecoveredIllnessInjuryListeners() {
  const recoveredIllnessInjuryYes = document.getElementById('recovered-illness-injury-yes');
  const recoveredIllnessInjuryNo = document.getElementById('recovered-illness-injury-no');
  const recoveredIllnessInjuryLegend = document.getElementById('recovered-illness-injury-legend');

  recoveredIllnessInjuryYes.addEventListener('change', function () {
    resetElementText(recoveredIllnessInjuryLegend);
    recoveredIllnessInjury(true);
  });

  recoveredIllnessInjuryNo.addEventListener('change', function () {
    resetElementText(recoveredIllnessInjuryLegend);
    recoveredIllnessInjury(false);
  });

  recoveredIllnessInjuryYes.addEventListener('invalid', function () {
    elementTextError(recoveredIllnessInjuryLegend);
  });
}

function recoveredIllnessInjury(recovered) {
  document.getElementById('recoveryDateIllnessInjuryContainer').style.display = recovered ? "block" : "none";
  document.getElementById('recoveryDateIllnessInjury').required = recovered;

  document.getElementById('estRecoveryDateIllnessInjuryContainer').style.display = recovered ? "none" : "block";
  document.getElementById('estRecoveryDateIllnessInjury').required = !recovered;
}

function setupSubmitLeaveSchedulePregnancy() {
  const form = document.getElementById('leave-schedule-pregnancy-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // take fddPregnancy
    document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt');
    

    // TODO: fill fields:
    // 1. start date
    



    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd

    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes
    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo


    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk

    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk

    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_btnSubmitConflictCheck

  });
}

function setupSubmitLeaveScheduleIllnessInjury() {
  const form = document.getElementById('leave-schedule-pregnancy-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // take fddPregnancy
    document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt');
    

    // TODO: fill fields:
    // 1. start date
    



    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd

    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes
    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo


    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk

    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk

    ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_btnSubmitConflictCheck

  });
}
