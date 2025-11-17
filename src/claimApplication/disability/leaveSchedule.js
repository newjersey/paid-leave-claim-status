import i18next from 'i18next';
import { DisabilityType, elementTextError, resetElementText } from '../utils';

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

      <div class="usa-alert usa-alert--info" id="pregnancyAlert">
        <div class="usa-alert__body">
          <h2 class="usa-alert__heading">${i18next.t('leaveSchedule.pregnancy.whatsNext')}</h2>
          <p class="usa-alert__text">
            ${i18next.t('leaveSchedule.pregnancy.howDelivered')}
          </p>
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

export function showLeaveScheduleForDisabilityType(disabilityType, backButtonId) {
  const leaveSchedulePregnancyForm = document.getElementById('leave-schedule-pregnancy-form');
  const leaveScheduleIllnessInjuryForm = document.getElementById('leave-schedule-illness-injury-form');

  if (disabilityType === DisabilityType.PREGNANCY) {
    leaveSchedulePregnancyForm.style.display = 'block';
    leaveScheduleIllnessInjuryForm.style.display = 'none';
  } else if (disabilityType === DisabilityType.ILLNESS || disabilityType === DisabilityType.INJURY) {
    leaveSchedulePregnancyForm.style.display = 'none';
    leaveScheduleIllnessInjuryForm.style.display = 'block';
  } else {
    // unknown -- have user submit reason for leave again
    const backButton = document.getElementById(backButtonId);
    if (backButton) {
      backButton.click();
    }
  }
}

export function setupLeaveSchedulePage() {
  setupRecoveredPregnancyListeners();
  setupRecoveredIllnessInjuryListeners();
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
