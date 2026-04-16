import i18next from 'i18next';

// remove these keys once DOL has deployed update to get from db
export const STORAGE_KEY_PROVIDER_NAME = "provider_name";
export const STORAGE_KEY_USER_DOB = "user_dob";
export const STORAGE_KEY_USER_NAME = "user_name";
export const STORAGE_KEY_USER_EMAIL = "user_email";
export const STORAGE_KEY_USER_PHONE = "user_phone";
export const STORAGE_KEY_USER_MAIL_ADDRESS = "user_mail_address";

export const STORAGE_KEY_DISABILITY_INFO_VIEW = "disabilityInfoView";
export const STORAGE_KEY_REASON_FOR_LEAVE = "reason_for_leave";
export const STORAGE_KEY_PROVIDER_TYPE_ACCEPTED = "provider_type_accepted";
export const STORAGE_KEY_CAUSED_BY_JOB = "caused_by_job";
export const STORAGE_KEY_WORKERS_COMP = "workers_comp";
export const STORAGE_KEY_EDITING_WORKERS_COMP = "editing_workers_comp";

export const STORAGE_KEY_SESSION_DATA = "session_data";

const CALENDAR_CONTROL_ID = "CalendarControl";
const FDD_CALENDAR_CONTROL_ID = "FDDCalendarControl"; // DEPENDENT on FDD, not setting it

export function getSessionData() {
  try {
    const encodedData = sessionStorage.getItem(STORAGE_KEY_SESSION_DATA);
    if (!encodedData) return {};
    return JSON.parse(encodeDecode(encodedData));
  } catch (error) {
    console.error("Error decoding data:", error);
    return {};
  }
}

export function addToSessionData(newData) {
  const existingData = getSessionData();
  const sessionData = { ...existingData, ...newData };

  try {
    const encodedData = encodeDecode(JSON.stringify(sessionData));
    sessionStorage.setItem(STORAGE_KEY_SESSION_DATA, encodedData);
  } catch (error) {
    console.error("Error encoding data:", error);
  }
}

export function clearSessionData() {
  sessionStorage.removeItem(STORAGE_KEY_SESSION_DATA);
}

// Note: this is only a simple XOR to make not plaintext - not encryption
// Fetching from backend is more robust when possible
export function encodeDecode(data) {
  return data.split('').map(char => String.fromCharCode(char.charCodeAt(0) ^ 100)).join('');
}

export function logout(skipConfirmation = false) {
  if (skipConfirmation || confirmLogout()) { // confirmLogout is an existing JS function from .NET
    __doPostBack('ctl00$header$lbtnLogout', ''); // existing JS function from .NET
    clearSessionData();
  }
}

// This only styles the buttons.
// When possible also use USWDS suggested HTML fieldset and legend structure
export function styleRadioButton(radioButtonId, marginBottom = false) {
  const radioButton = document.getElementById(radioButtonId);
  const label = document.querySelector(`label[for="${radioButtonId}"]`);

  if (radioButton && label) {
    const radioDiv = document.createElement('div');
    radioDiv.classList.add('usa-radio');

    radioButton.classList.add('usa-radio__input');
    label.classList.add('usa-radio__label');
    label.style.marginBottom = marginBottom ? '20px': '0';
    label.style.textAlign = 'left';

    radioDiv.appendChild(radioButton.cloneNode(true));
    radioDiv.appendChild(label.cloneNode(true));

    radioButton.parentNode.insertBefore(radioDiv, radioButton);

    radioButton.remove();
    label.remove();
  }
}

export function fixPhoneNumberText(
  areaCodeInputId,
  tel2InputId,
  tel3InputId,
  extInputId
) {
  const areaCodeInput = document.querySelector(areaCodeInputId);
  if (areaCodeInput) {
    areaCodeInput.style.maxWidth = '30px';

    const parentTd = areaCodeInput.closest('td');
    const labelLink = Array.from(parentTd.querySelectorAll('a')).find(a => a.textContent.includes("Telephone Number:"));
      if (labelLink) {
        const brElement = document.createElement('br');
        labelLink.parentNode.insertBefore(brElement, labelLink.nextSibling);
      }
  }

  const tel2Input = document.querySelector(tel2InputId);
  if (tel2Input) {
    tel2Input.style.maxWidth = '40px';
  }

  const tel3Input = document.querySelector(tel3InputId);
  if (tel3Input) {
    tel3Input.style.maxWidth = '50px';
  }

  const extInput = document.querySelector(extInputId);
  if (extInput) {
    extInput.style.maxWidth = '50px';
  }
}

export function removeExtraSpaceBetweenRadioButtons(yesId, noId) {
  const yesElement = document.getElementById(yesId);
  const noElement = document.getElementById(noId);
  if (yesElement && noElement) {
    const radioYes = yesElement.closest('.usa-radio');
    const radioNo = noElement.closest('.usa-radio');

    let currentNode = radioYes.nextSibling;
    while (currentNode && currentNode !== radioNo) {
      const nextNode = currentNode.nextSibling;
      if (currentNode.nodeType === Node.TEXT_NODE || currentNode.nodeType === Node.ELEMENT_NODE && currentNode.tagName === 'BR') {
          currentNode.parentNode.removeChild(currentNode);
      }
      currentNode = nextNode;
    }
  }
}

export function adjustTableWidths(parent) {
  const tables = parent.querySelectorAll('table');
  tables.forEach(table => {
    table.style.width = 'auto';
    table.style.maxWidth = '100%';
    table.style.tableLayout = 'auto';

    const cells = table.querySelectorAll('td');
    cells.forEach(cell => {
      cell.style.width = 'auto';
      cell.style.maxWidth = '100%';
    });

    const inputsAndSelects = table.querySelectorAll('input[type="text"], select, textarea');
    inputsAndSelects.forEach(element => {
      element.style.width = 'auto';
      element.style.maxWidth = '100%';
      element.style.boxSizing = 'border-box';
    });
  });
}

export function replaceVerificationRadioButtons(
  informationText,
  radioButtonYesId,
  originalSubmitId,
) {
  const tdElements = document.querySelectorAll('td');

  for (const tdElement of tdElements) {
    if (tdElement.textContent.includes(informationText)) {
      Array.from(tdElement.children).forEach(child => {
        child.style.display = 'none';
      });

      var submitButton = document.createElement('button');
      submitButton.id = 'submitButton';
      submitButton.classList.add('usa-button');
      submitButton.textContent = i18next.t('reviewAndSave.button');
      submitButton.style.display = 'block';
      submitButton.style.margin = 'auto';
      submitButton.style.padding = '10px';
      submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        const radioButtonYes = document.querySelector(radioButtonYesId);
        const originalSubmit = document.querySelector(originalSubmitId);
        if (radioButtonYes && originalSubmit) {
          radioButtonYes.click();
          originalSubmit.style.display = 'none';
          originalSubmit.click();
        }
      });

      tdElement.appendChild(submitButton);
      break;
    }
  };
}

export function setNewTitle(text) {
  const setText = () => {
    const title = document.querySelector("#pageTitle");
    if (title) {
      title.textContent = text;
      document.removeEventListener('headerReady', setText);
    }
  };
  setText();
  document.addEventListener('headerReady', setText);
}

export const DisabilityType = {
    UNKNOWN: '',
    PREGNANCY: 'pregnancy',
    ILLNESS: 'illness',
    INJURY: 'injury'
};

export function elementTextError(element) {
  element.style.color = 'rgb(139, 0, 0)';
  element.style.fontWeight = 'bold';
}

export function resetElementText(element) {
  element.style.color = '';
  element.style.fontWeight = '';
}

export function setRequiredForVisibleLeaveSectionFields(currentSection, reason = null, causedByJob = null) {
  // Reason for Leave fields
  const reasonFields = [
    document.getElementById('reason-pregnancy'),
    document.getElementById('reason-illness'),
    document.getElementById('reason-injury')
  ];

  // Medical info fields
  const providerYesRadio = document.getElementById('provider-type-accepted-yes');
  const causedByJobYes = document.getElementById('caused-by-job-yes');
  const causedByJobNo = document.getElementById('caused-by-job-no');

  // Step 1: First remove required from ALL custom fields first
  reasonFields.forEach(field => field?.removeAttribute('required'));
  providerYesRadio?.removeAttribute('required');

  causedByJobYes?.removeAttribute('required');
  causedByJobNo?.removeAttribute('required');

  // Step 2: Then add required based on current section
  if (currentSection === 'reasonForLeave') {
    reasonFields.forEach(field => field?.setAttribute('required', ''));
  }
  else if (currentSection === 'medicalTreatment') {
    providerYesRadio?.setAttribute('required', '');

    // Caused by job only required if NOT pregnancy
    if (reason !== 'pregnancy') {
      causedByJobYes?.setAttribute('required', '');
      causedByJobNo?.setAttribute('required', '');
    }
  }
  // leaveSchedule: nothing required (all removed in step 1)
}

export function removeIntroTextReferencingFuture() {
  const content = document.getElementById("ContentPlaceHolder1_tblContent");

  if (!content) return;
  
  // rendered text is wonky, so regex with variable whitespace throughout
  const targetRegex = /\s+If\s+your\s+disability\s+date\s+is\s+in\s+the\s+future,\s+you\s+must\s+also\s+return\s+to\s+certify\s+your\s+claim\s+within\s+fourteen\s+\(14\)\s+days\s+after\s+your\s+first\s+date\s+of\s+disability\s+or\s+your\s+data\s+will\s+be\s+removed\.\s+You\s+will\s+then\s+need\s+to\s+restart\s+the\s+application\s+process./gi;
  
  content.querySelectorAll('*').forEach(el => {
    if (targetRegex.test(el.textContent)) {
      el.innerHTML = el.innerHTML.replace(targetRegex, '');
    }
  });
}

export function updateCalendarUI(id, isFddCalendar = true, onlyShowYearControls = false) {
  const calendarId = isFddCalendar ? FDD_CALENDAR_CONTROL_ID : CALENDAR_CONTROL_ID;
  const element = document.getElementById(id);
  if (element) {
    element.src = "https://beta.nj.gov/files/tdi-fli-claim-status/assets/calendar_today.svg";
    element.addEventListener('click', function() {
      closeCalendarPopup(calendarId);
      setTimeout(() => fixCalendarPopup(calendarId, onlyShowYearControls), 10);
    });
  }
}

function fixCalendarPopup(calendarId, onlyShowYearControls) {
  const headerRows = document.querySelectorAll(`#${calendarId} tr.header`);
  if (headerRows.length != 2) return;

  const navHeaderRow = headerRows[0];
  const footerRow = headerRows[1];

  const functionSuffix = calendarId === FDD_CALENDAR_CONTROL_ID ? 'FDD' : '';
  const linkStyle = 'font-size: 1.2em; padding: 4px; display: inline-flex; align-items: center; justify-content: center; min-width: 22px; min-height: 22px; text-decoration: none; color: inherit;';
  const imgStyle = 'width: 20px; height: 20px; display: block;';
  
  const baseUrl = 'https://beta.nj.gov/files/tdi-fli-claim-status/assets/';
  const prevYear = `<a href="javascript:changeCalendarControlYear${functionSuffix}(-1);" style="${linkStyle}"><img src="${baseUrl}navigate_far_before.svg" alt="Previous year" style="${imgStyle}"></a>`;
  const prevMonth = onlyShowYearControls ? "" : `<a href="javascript:changeCalendarControlMonth${functionSuffix}(-1);" style="${linkStyle}"><img src="${baseUrl}navigate_before.svg" alt="Previous month" style="${imgStyle}"></a>`;
  const nextMonth = onlyShowYearControls ? "" : `<a href="javascript:changeCalendarControlMonth${functionSuffix}(1);" style="${linkStyle}"><img src="${baseUrl}navigate_next.svg" alt="Next month" style="${imgStyle}"></a>`;
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
      setTimeout(() => fixCalendarPopup(calendarId, onlyShowYearControls), 10);
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

export function clearTextNodes(node) {
  if (node.parentElement?.tagName.toLowerCase() === 'option') {
    return;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    if (/^\s*$/.test(text)) {
      node.remove(); 
    } else {
      node.textContent = ''; 
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    Array.from(node.childNodes).forEach(clearTextNodes);
    const tagName = node.tagName.toLowerCase();
    if ((tagName === 'a' || tagName === 'strong' || tagName === 'br')) {
      node.remove();
    }
  }
}

export function formattedDateFromField(id) {
  const field = document.getElementById(id);
  const date = new Date(field.value);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
