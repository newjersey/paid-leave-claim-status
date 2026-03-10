import i18next from 'i18next';
import { DisabilityType, styleRadioButton } from '../utils';

export function setupLeaveSchedulePage() {
  setupFDD();
  setupLDW();
  setupFutureDateAlert();
}

export function showLeaveScheduleForDisabilityType(disabilityType) {
  styleFDD(disabilityType);
  styleLDW(disabilityType);
  addStyles();
  restyleFDDDateEntry();
  restyleLDWDateEntry();
  restyleReturnedToWorkDateEntry();
  restyleExpectedReturnToWorkDateEntry();
}

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
    });
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
    <label class="usa-label" id="returnPregnancyLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk">
      <span class="required-asterisk">*</span>
      <span id="returnDateQuestion"></span>
    </label>
  `;
  returnDateInput.insertAdjacentHTML('beforebegin', returnDateQuestion);

  const estReturnDateInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk');
  const estReturnDateQuestion = `
    <br><br>
    <hr>
    <label class="usa-label" id="estReturnPregnancyLabel" for="ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk">
      <span class="required-asterisk">*</span>
      <span id="estReturnDateQuestion"></span>
    </label>
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

function createDateInput(id, ariaLabel) {
  const input = document.createElement('input');
  input.setAttribute('type', 'date');
  input.setAttribute('id', id);
  input.setAttribute('class', 'usa-input');
  input.setAttribute('aria-label', ariaLabel);
  input.setAttribute('maxlength', '10');
  return input;
}

function restyleFDDDateEntry() {
  const imageInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_Image11');
  if (imageInput) {
    imageInput.style.display = 'none';
  }

  const originalInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt');
  originalInput.style.display = 'none';

  const newInput = createDateInput('txtDisStartDt', 'Disability Start Date');
  newInput.setAttribute('onblur', 'EmptyDate();');
  originalInput.parentNode.insertBefore(newInput, originalInput);

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
        ldwInput.setAttribute('max', maxDate);
      }

      const returnedToWorkInput = document.getElementById('txtDtReturnedToWrk');
      if (returnedToWorkInput) {
        const oneDayLater = new Date(selectedDate);
        oneDayLater.setDate(selectedDate.getDate() + 1);
        const minDate = reformatDateYYYYMMDD(oneDayLater);
        returnedToWorkInput.setAttribute('min', minDate);
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

  const newInput = createDateInput('txtDtLastWorkd', 'Last Worked Date');
  originalInput.parentNode.insertBefore(newInput, originalInput);

  const updateOriginalInput = function() {
    const formattedDate = reformatDateMMDDYYYY(newInput.value);
    if (formattedDate) {
      originalInput.value = formattedDate;
      priorFDD(originalInput);
    }
  };
  
  newInput.onblur = updateOriginalInput;
}

function restyleReturnedToWorkDateEntry() {
  const imageInput = document.getElementById('Image12');
  if (imageInput) {
    imageInput.style.display = 'none';
  }

  const originalInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtReturnedToWrk');
  originalInput.style.display = 'none';

  const newInput = createDateInput('txtDtReturnedToWrk', 'Returned to Work Date');

  const maxDate = new Date();
  const maxDateFormatted = reformatDateYYYYMMDD(maxDate);
  newInput.setAttribute('max', maxDateFormatted);

  originalInput.parentNode.insertBefore(newInput, originalInput);

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

  const newInput = createDateInput('txtExpectedReturnedDtToWrk', 'Expected Return to Work Date');

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // tomorrow
  const minDateFormatted = reformatDateYYYYMMDD(minDate);
  newInput.setAttribute('min', minDateFormatted);

  originalInput.parentNode.insertBefore(newInput, originalInput);

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
