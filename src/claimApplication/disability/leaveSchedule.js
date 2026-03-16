import i18next from 'i18next';
import { DisabilityType, styleRadioButton } from '../utils';

export function setupLeaveSchedulePage() {
  setupFDD();
  setupLDW();
  setupFutureDateAlert();
  restyleFDDDateEntry();
  restyleLDWDateEntry();
  restyleReturnedToWorkDateEntry();
  restyleExpectedReturnToWorkDateEntry();
  removeUnwantedBlankLine();
  preventLetterEntryInDateFields();
}

export function showLeaveScheduleForDisabilityType(disabilityType) {
  styleFDD(disabilityType);
  styleLDW(disabilityType);
  addStyles();
}

const ICONS = {
  calendar: `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
    </svg>
  `,
  prevMonth: `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  `,
  prevYear: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <polygon points="0 0 24 0 24 24 0 24"/>
        <polygon fill="#000" fill-rule="nonzero" points="11.41 7.41 10 6 4 12 10 18 11.41 16.59 6.83 12"/>
        <polygon fill="#000" fill-rule="nonzero" points="19.41 7.41 18 6 12 12 18 18 19.41 16.59 14.83 12"/>
      </g>
    </svg>
  `,
  nextMonth: `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  `,
  nextYear: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <polygon points="0 0 24 0 24 24 0 24"/>
        <g fill="#000" fill-rule="nonzero" transform="translate(4.59 6)">
          <polygon points="9.41 0 8 1.41 12.58 6 8 10.59 9.41 12 15.41 6"/>
          <polygon points="1.41 0 0 1.41 4.58 6 0 10.59 1.41 12 7.41 6"/>
        </g>
      </g>
    </svg>
  `
};

function addStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    input[type="image"][alt="calendar"] {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      padding-bottom:2px;
      margin-left:5px;
    }

    #ContentPlaceHolder1_ClaimantDisabilityTab_body,
    #ContentPlaceHolder1_ClaimantDisabilityTab {
      background-color: transparent !important;
    }

    /* Calendar popup container */
    #FDDCalendarControl table, #CalendarControl table {
      font-size: 16px;
    }

    .legendHeader {
      font-size: 22px;
    }

    .usa-label {
      font-size: 16px;
    }

    .usa-date-picker__calendar__previous-month:not([disabled]) {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E%3C/svg%3E"), linear-gradient(transparent, transparent);
      background-repeat: no-repeat;
    }

    .usa-date-picker__calendar__previous-year:not([disabled]) {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpolygon points='0 0 24 0 24 24 0 24'/%3E%3Cpolygon fill='%23000' fill-rule='nonzero' points='11.41 7.41 10 6 4 12 10 18 11.41 16.59 6.83 12'/%3E%3Cpolygon fill='%23000' fill-rule='nonzero' points='19.41 7.41 18 6 12 12 18 18 19.41 16.59 14.83 12'/%3E%3C/g%3E%3C/svg%3E"), linear-gradient(transparent, transparent);
      background-repeat: no-repeat;
    }

    .usa-date-picker__calendar__next-month:not([disabled]) {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3C/svg%3E"), linear-gradient(transparent, transparent);
      background-repeat: no-repeat;
    }

    .usa-date-picker__calendar__next-year:not([disabled]) {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpolygon points='0 0 24 0 24 24 0 24'/%3E%3Cg fill='%23000' fill-rule='nonzero' transform='translate(4.59 6)'%3E%3Cpolygon points='9.41 0 8 1.41 12.58 6 8 10.59 9.41 12 15.41 6'/%3E%3Cpolygon points='1.41 0 0 1.41 4.58 6 0 10.59 1.41 12 7.41 6'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(transparent, transparent);
      background-repeat: no-repeat;
    }

    .usa-date-picker__button:not([disabled]) {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z'/%3E%3C/svg%3E"), linear-gradient(transparent, transparent);
      background-repeat: no-repeat;
    }

    .usa-date-picker__calendar__month-selection,
    .usa-date-picker__calendar__year-selection {
      min-width: 80px;
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .usa-date-picker__calendar__row {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
    }

    .usa-date-picker__calendar__cell--center-items {
      flex-shrink: 0;
    }

    .usa-date-picker__calendar__month-label {
      min-height: 48px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .usa-date-picker__calendar__table {
      margin-top: 8px;
    }
  `;
  document.head.appendChild(style);
}

function setupFDD() {
  const fieldset = document.querySelector('#MainDiv > fieldset');
  fieldset.id = "fddFieldset";
  const divElement = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_dvShowFDD');

  const maternityTimelineToolHtml = `
    <div id="maternityTimeline" style="margin: 16px 0 8px 0; width: 100%;">
      <svg style="vertical-align:-5px;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>
      ${i18next.t('leaveSchedule.pregnancy.maternityTimeline')}
    </div>
  `;

  const notesHtml = `
    <br>
    <div id="fddNotes"></div>
    <br>
  `;

  const tabBody = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_body');
  tabBody.insertAdjacentHTML('beforebegin', maternityTimelineToolHtml);
  tabBody.insertAdjacentHTML('beforebegin', notesHtml);

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
  legend.classList.add('legendHeader');
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
    });
}

function removeUnwantedBlankLine() {
  const parentDiv = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_dvShowFDD');
  if (parentDiv) {
    Array.from(parentDiv.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length === 0) {
        parentDiv.removeChild(node);
      }
    });
  }
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

function setupLDW() {
  const ldwFieldset = document.querySelector('#divLDW > fieldset');
  ldwFieldset.id = "ldwFieldset";
  removeUnwantedElements(ldwFieldset);

  const ldwDateInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd');
  const ldwLabel = `
    <label class="usa-label no-margin-top" id="ldwPregnancyLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd">
      <span class="required-asterisk">*</span>
      <span id="lastWorkdayQuestion"></span>
    </label>
    <div class="usa-hint" id="ldwHint">${i18next.t('leaveSchedule.lastWorkdayHint')}<br>${i18next.t('shared.dateFormat')}</div>
  `;
  ldwDateInput.insertAdjacentHTML('beforebegin', ldwLabel);

  const recoveredYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes');
  const recoveredQuestion = `
    <br><br>
    <hr>
    <label class="usa-label">
      <span class="required-asterisk">*</span>
      <span id="recoveredQuestion"></span>
    </label>
  `;
  recoveredYes.insertAdjacentHTML('beforebegin', recoveredQuestion);

  styleRecoveryRadioButtons();

  const returnDateInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk');
  const returnDateQuestion = `
    <br><br>
    <hr>
    <label class="usa-label" id="returnLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk">
      <span class="required-asterisk">*</span>
      <span id="returnDateQuestion"></span>
    </label>
    <div class="usa-hint" id="returnHint">${i18next.t('leaveSchedule.recoveryDateHint')}<br>${i18next.t('shared.dateFormat')}</div>
  `;
  returnDateInput.insertAdjacentHTML('beforebegin', returnDateQuestion);

  const estReturnDateInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk');
  const estReturnDateQuestion = `
    <br><br>
    <hr>
    <label class="usa-label" id="estReturnLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk">
      <span class="required-asterisk">*</span>
      <span id="estReturnDateQuestion"></span>
    </label>
    <div class="usa-hint" id="estReturnHint">${i18next.t('shared.dateFormat')}</div>
  `;
  estReturnDateInput.insertAdjacentHTML('beforebegin', estReturnDateQuestion);

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
  ldwFieldset.insertAdjacentHTML('afterend', alertHtml);
}

function styleLDW(disabilityType) {
  const ldwFieldset = document.getElementById('ldwFieldset');

  const legend = ldwFieldset.querySelector('legend');
  legend.classList.add('legendHeader');
  legend.textContent = disabilityType === DisabilityType.PREGNANCY
    ? i18next.t('leaveSchedule.pregnancy.beforeAfterTitle')
    : i18next.t('leaveSchedule.illnessInjury.beforeAfterTitle');

  const lastWorkdayQuestion = document.getElementById('lastWorkdayQuestion');
  lastWorkdayQuestion.innerHTML = disabilityType === DisabilityType.PREGNANCY
    ? i18next.t('leaveSchedule.pregnancy.lastWorkday')
    : i18next.t('leaveSchedule.illnessInjury.lastWorkday');

  const recoveredQuestion = document.getElementById('recoveredQuestion');
  recoveredQuestion.innerHTML = disabilityType === DisabilityType.PREGNANCY
    ? i18next.t('leaveSchedule.pregnancy.recovered')
    : i18next.t('leaveSchedule.illnessInjury.recovered');

  const returnDateQuestion = document.getElementById('returnDateQuestion');
  returnDateQuestion.textContent = disabilityType === DisabilityType.PREGNANCY
    ? i18next.t('leaveSchedule.pregnancy.recoveryDate')
    : i18next.t('leaveSchedule.illnessInjury.recoveryDate');

  const estReturnDateQuestion = document.getElementById('estReturnDateQuestion');
  estReturnDateQuestion.textContent = disabilityType === DisabilityType.PREGNANCY
    ? i18next.t('leaveSchedule.pregnancy.estRecoveryDate')
    : i18next.t('leaveSchedule.illnessInjury.estRecoveryDate');

  const pregnancyAlert = document.getElementById('pregnancyAlert');
  pregnancyAlert.style.display = disabilityType === DisabilityType.PREGNANCY
    ? 'block'
    : 'none';
}

function styleRecoveryRadioButtons() {
  const recoveredYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes');
  const recoveredYesLabel = `
    <label id="recLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes">
      ${i18next.t('shared.yes')}
    </label>
  `;
  recoveredYes.insertAdjacentHTML('beforebegin', recoveredYesLabel);

  const recoveredNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo');
  const recoveredNoLabel = `
    <label id="recLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo">
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

function setupFutureDateAlert() {
  const futureDateDiv = document.getElementById('divPregRelated');

  Array.from(futureDateDiv.childNodes).forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      node.style.display = 'none';
    } else if (node.nodeType === Node.TEXT_NODE) {
      node.remove();
    }
  });

  const futureDateAlert = document.createElement('div');
  futureDateAlert.classList.add("usa-alert", "usa-alert--error");
  futureDateAlert.role = "alert"
  futureDateAlert.innerHTML = `
    <div class="usa-alert__body">
      <h2 class="usa-alert__heading"> ${i18next.t('leaveSchedule.futureDate.title')}</h2>
      <p class="usa-alert__text">
        ${i18next.t('leaveSchedule.futureDate.body')}
      </p>
    </div>
  `;
  futureDateDiv.appendChild(futureDateAlert);

  const callback = function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const currentDisplay = futureDateDiv.style.display;
        const submitBtn = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_btnSubmitConflictCheck');
        if (submitBtn) {
          submitBtn.style.display = currentDisplay === 'block'
            ? 'none'
            : 'block';
        }
      }
    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(futureDateDiv, {
    attributes: true,
    attributeFilter: ['style']
  });
}

function createDateInputWrapper() {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('class', 'usa-date-picker');
  return wrapper;
}

function createDateInput(id, ariaLabel) {
  const input = document.createElement('input');
  input.setAttribute('class', 'usa-input');
  input.setAttribute('id', id);
  input.setAttribute('name', id);
  input.setAttribute('placeholder', i18next.t('shared.dateFormat'));
  input.setAttribute('maxlength', '10');
  input.setAttribute('aria-label', ariaLabel);
  return input;
}

function restyleFDDDateEntry() {
  const imageInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_Image11');
  if (imageInput) {
    imageInput.style.display = 'none';
  }

  const originalInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt');
  originalInput.style.display = 'none';

  const wrapper = createDateInputWrapper();
  const newInput = createDateInput('txtDisStartDt', 'Disability Start Date');
  newInput.setAttribute('onblur', 'EmptyDate();');
  wrapper.appendChild(newInput);
  originalInput.parentNode.insertBefore(wrapper, originalInput);

  const updateOriginalInput = function() {
    const formattedDate = reformatDateMMDDYYYY(newInput.value);
    if (formattedDate) {
      originalInput.value = formattedDate;
      dateFormatforFDD(originalInput);

      const selectedDate = new Date(newInput.value);

      const ldwInput = document.getElementById('txtDtLastWorkd');
      if (ldwInput) {
        const oneDayEarlier = new Date(selectedDate);
        oneDayEarlier.setDate(selectedDate.getDate() - 1); 
        const maxDate = reformatDateYYYYMMDD(oneDayEarlier);
        const ldwWrapper = ldwInput.closest('.usa-date-picker');
        if (ldwWrapper) {
          ldwWrapper.setAttribute('data-max-date', maxDate);
        }
      }

      const returnedToWorkInput = document.getElementById('txtDtReturnedToWrk');
      if (returnedToWorkInput) {
        const oneDayLater = new Date(selectedDate);
        oneDayLater.setDate(selectedDate.getDate() + 1);
        const minDate = reformatDateYYYYMMDD(oneDayLater);
        const returnedToWorkWrapper = returnedToWorkInput.closest('.usa-date-picker');
        if (returnedToWorkWrapper) {
          returnedToWorkWrapper.setAttribute('data-min-date', minDate);
        }
      }
    }
  };

  newInput.onchange = updateOriginalInput;
  newInput.onkeyup = updateOriginalInput;
}

function restyleLDWDateEntry() {
  const imageInput = document.getElementById('btnDtLstWorkd');
  if (imageInput) {
    imageInput.style.display = 'none';
  }

  const originalInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd');
  originalInput.style.display = 'none';

  const wrapper = createDateInputWrapper();
  const newInput = createDateInput('txtDtLastWorkd', 'Last Worked Date');
  wrapper.appendChild(newInput);
  originalInput.parentNode.insertBefore(wrapper, originalInput);

  wrapper.addEventListener('blur', function() {
    const formattedDate = reformatDateMMDDYYYY(newInput.value);
    if (formattedDate) {
      originalInput.value = formattedDate;
      priorFDD(originalInput);
    }
  }, true);

  wrapper.addEventListener('change', function() {
    const externalInput = document.getElementById('txtDtLastWorkd');
    externalInput.setCustomValidity('');
  });
}

function restyleReturnedToWorkDateEntry() {
  const imageInput = document.getElementById('Image12');
  if (imageInput) {
    imageInput.style.display = 'none';
  }

  const originalInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk');
  originalInput.style.display = 'none';

  const wrapper = createDateInputWrapper();
  const newInput = createDateInput('txtDtReturnedToWrk', 'Returned to Work Date');

  const maxDate = new Date();
  const maxDateFormatted = reformatDateYYYYMMDD(maxDate);
  wrapper.setAttribute('data-max-date', maxDateFormatted);

  wrapper.appendChild(newInput);
  originalInput.parentNode.insertBefore(wrapper, originalInput);

  const updateOriginalInput = function() {
    const formattedDate = reformatDateMMDDYYYY(newInput.value);
    if (formattedDate) {
      originalInput.value = formattedDate;
      AfterFDDnNotFuture(originalInput,'you returned to work');
    }
  };
  
  newInput.onblur = updateOriginalInput;
}

function restyleExpectedReturnToWorkDateEntry() {
  const imageInput = document.getElementById('Image13');
  if (imageInput) {
    imageInput.style.display = 'none';
  }

  const originalInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk');
  originalInput.style.display = 'none';

  const wrapper = createDateInputWrapper();
  const newInput = createDateInput('txtExpectedReturnedDtToWrk', 'Expected Return to Work Date');
  
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // tomorrow
  const minDateFormatted = reformatDateYYYYMMDD(minDate);
  wrapper.setAttribute('data-min-date', minDateFormatted);

  wrapper.appendChild(newInput);
  originalInput.parentNode.insertBefore(wrapper, originalInput);

  const updateOriginalInput = function() {
    const formattedDate = reformatDateMMDDYYYY(newInput.value);
    if (formattedDate) {
      originalInput.value = formattedDate;
      totestYearExpectedRTW(originalInput,'you expect to return to work');
    }
  };
  
  newInput.onblur = updateOriginalInput;
}

function reformatDateYYYYMMDD(date) {
  return date.toISOString().split('T')[0];
}

function reformatDateMMDDYYYY(dateValue) {
  if (!dateValue) return '';

  const dateParts = dateValue.split('-');
  if (dateParts.length !== 3) return '';

  const [year, month, day] = dateParts;

  const strippedMonth = month.replace(/^0+/, '');
  const strippedDay = day.replace(/^0+/, '');
  const strippedYear = year.replace(/^0+/, '');

  if (strippedMonth.length < 1 || strippedDay.length < 1 || strippedYear.length !== 4) {
    return '';
  }

  return `${month}/${day}/${year}`;
}

function preventLetterEntryInDateFields() {
  document.addEventListener('input', function(e) {
    if (e.target.classList.contains('usa-date-picker__external-input')) {
      e.target.value = e.target.value.replace(/[^0-9/]/g, '');
    }
  });
}
