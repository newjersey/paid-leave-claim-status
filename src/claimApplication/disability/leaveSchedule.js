import i18next from 'i18next';
import { DisabilityType, styleRadioButton } from '../utils';

const CALENDAR_CONTROL_ID = "CalendarControl";
const FDD_CALENDAR_CONTROL_ID = "FDDCalendarControl"; // DEPENDENT on FDD, not setting it

export function setupLeaveSchedulePage() {
  setupFDD();
  setupLDW();
  setupFutureDateAlert();
  removeUnwantedBlankLine();
  updateAllCalendars();
}

export function showLeaveScheduleForDisabilityType(disabilityType) {
  styleFDD(disabilityType);
  styleLDW(disabilityType);
  addStyles();
}

function addStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    input[type="image"][alt="calendar"] {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      padding-bottom: 2px;
      margin-left: 5px;
    }

    #ContentPlaceHolder1_ClaimantDisabilityTab_body,
    #ContentPlaceHolder1_ClaimantDisabilityTab {
      background-color: transparent !important;
    }

    /* Calendar popup container */
    #FDDCalendarControl table, #CalendarControl table {
      background-color: #EDEFF0;
      border-left: 5px solid #EDEFF0;
      border-right: none;
      font-size: 16px;
    }

    .legendHeader {
      font-size: 22px;
    }

    .usa-label {
      font-size: 16px;
    }

    #CalendarControl td.empty,
    #FDDCalendarControl td.empty {
      visibility: hidden !important;
    }

    #CalendarControl td,
    #CalendarControl th,
    #FDDCalendarControl td,
    #FDDCalendarControl th {
      width: 36px !important;
      height: 36px !important;
      padding: 0 !important;
      margin: 0 !important;
      border: 0 !important;
      box-sizing: border-box !important;
    }

    #CalendarControl tr.header,
    #CalendarControl tr.footer,
    #FDDCalendarControl tr.header,
    #FDDCalendarControl tr.footer {
      background-color: #EDEFF0
    }

    #CalendarControl tr.header td,
    #CalendarControl tr.footer td,
    #FDDCalendarControl tr.header td,
    #FDDCalendarControl tr.footer td {
      background-color: #EDEFF0
    }

    #CalendarControl th a,
    #FDDCalendarControl th a,
    #FDDCalendarControl .previous a,
    #FDDCalendarControl .next a {
      color: blue;
      text-decoration: underline;
    }

    #CalendarControl .title,
    #FDDCalendarControl .title {
      color: black;
    }

    #CalendarControl .weekday,
    #CalendarControl .weekend,
    #CalendarControl .current,
    #FDDCalendarControl .weekday,
    #FDDCalendarControl .weekend,
    #FDDCalendarControl .current {
      background-color: #EDEFF0;
      border: none;
      line-height: 26px;
    }

    #CalendarControl .weekday:hover,
    #CalendarControl .weekend:hover,
    #CalendarControl .current:hover,
    #FDDCalendarControl .weekday:hover,
    #FDDCalendarControl .weekend:hover,
    #FDDCalendarControl .current:hover {
      background-color: #dfe1e2;
      border: none;
      color: black;
    }

    #CalendarControl .weekday:active,
    #CalendarControl .weekend:active,
    #CalendarControl .current:active,
    #FDDCalendarControl .weekday:active,
    #FDDCalendarControl .weekend:active,
    #FDDCalendarControl .current:active {
      background-color: #c6cace;
      border: none;
      color: black;
    }

    #CalendarControl .current,
    #FDDCalendarControl .current {
      border: 5px solid #005ea2;
      color: black;
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

function updateAllCalendars() {
  const fddCalendarBtnId = 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_Image11';
  const ldwCalendarBtnId = 'btnDtLstWorkd';
  const returnToWorkCalendarBtnId = 'Image12';
  const estReturnToWorkCalendarBtnId = 'Image13';

  updateCalendarUI(fddCalendarBtnId, CALENDAR_CONTROL_ID);
  updateCalendarUI(ldwCalendarBtnId, FDD_CALENDAR_CONTROL_ID);
  updateCalendarUI(returnToWorkCalendarBtnId, FDD_CALENDAR_CONTROL_ID);
  updateCalendarUI(estReturnToWorkCalendarBtnId, FDD_CALENDAR_CONTROL_ID);
}

function updateCalendarUI(id, calendarId) {
  const element = document.getElementById(id);
  if (element) {
    element.src = "https://beta.nj.gov/files/tdi-fli-claim-status/assets/calendar_today.svg";
    element.addEventListener('click', function() {
      closeCalendarPopup(calendarId);
      setTimeout(() => fixCalendarPopup(calendarId), 10);
    });
  }
}

function fixCalendarPopup(calendarId) {
  const headerRows = document.querySelectorAll(`#${calendarId} tr.header`);
  if (headerRows.length != 2) return;

  const navHeaderRow = headerRows[0];
  const footerRow = headerRows[1];

  const functionSuffix = calendarId === FDD_CALENDAR_CONTROL_ID ? 'FDD' : '';
  const linkStyle = 'font-size: 1.2em; padding: 4px; display: inline-flex; align-items: center; justify-content: center; min-width: 22px; min-height: 22px; text-decoration: none; color: inherit;';
  const imgStyle = 'width: 20px; height: 20px; display: block;';
  
  const baseUrl = 'https://beta.nj.gov/files/tdi-fli-claim-status/assets/';
  const prevYear = `<a href="javascript:changeCalendarControlYear${functionSuffix}(-1);" style="${linkStyle}"><img src="${baseUrl}navigate_far_before.svg" alt="Previous year" style="${imgStyle}"></a>`;
  const prevMonth = `<a href="javascript:changeCalendarControlMonth${functionSuffix}(-1);" style="${linkStyle}"><img src="${baseUrl}navigate_before.svg" alt="Previous month" style="${imgStyle}"></a>`;
  const nextMonth = `<a href="javascript:changeCalendarControlMonth${functionSuffix}(1);" style="${linkStyle}"><img src="${baseUrl}navigate_next.svg" alt="Next month" style="${imgStyle}"></a>`;
  const nextYear = `<a href="javascript:changeCalendarControlYear${functionSuffix}(1);" style="${linkStyle}"><img src="${baseUrl}navigate_far_next.svg" alt="Next year" style="${imgStyle}"></a>`;
  
  const title = navHeaderRow.querySelector('.title')?.innerHTML || '';
  
  const gapStyle = 'display: flex; gap: 12px; align-items: center;';
  
  navHeaderRow.innerHTML = `
    <td colspan="7" style="padding: 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 4px;">
        <div style="text-align: left; ${gapStyle}">
          ${prevYear}
          ${prevMonth}
        </div>
        <div class="title" style="text-align: center; flex: 1;">${title}</div>
        <div style="text-align: right; ${gapStyle}">
          ${nextMonth}
          ${nextYear}
        </div>
      </div>
    </td>
  `;

  removeEmptyRows(calendarId);

  const navLinks = navHeaderRow.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      setTimeout(() => fixCalendarPopup(calendarId), 10);
    });
  });

  footerRow.remove();
}

function closeCalendarPopup(calendarId) {
  const calendarPopup = document.getElementById(calendarId);
  
  if (window.calendarClickOutsideHandler) {
    document.removeEventListener('click', window.calendarClickOutsideHandler);
  }
  
  window.calendarClickOutsideHandler = function(event) {
    if (!calendarPopup || !calendarPopup.offsetParent) return;
    const isClickInside = calendarPopup.contains(event.target);
    if (!isClickInside) {
      if (calendarId === CALENDAR_CONTROL_ID) {
        hideCalendarControl();
      } else if (calendarId === FDD_CALENDAR_CONTROL_ID) {
        hideCalendarControlFDD();
      }
      document.removeEventListener('click', window.calendarClickOutsideHandler);
    }
  };
  
  setTimeout(() => {
    document.addEventListener('click', window.calendarClickOutsideHandler);
  }, 100);
}

function removeEmptyRows(calendarId) {
  const calendarTable = document.querySelector(`#${calendarId} table`);
  if (calendarTable) {
    const allRows = calendarTable.querySelectorAll('tr');
    allRows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length > 0) {
        const allEmpty = Array.from(cells).every(cell => cell.classList.contains('empty'));
        if (allEmpty) {
          row.remove();
        }
      }
    });
  }
}
