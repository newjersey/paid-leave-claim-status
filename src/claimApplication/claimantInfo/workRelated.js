import {
  adjustTableWidths,
  removeExtraSpaceBetweenRadioButtons,
  styleRadioButton,
  getSessionData,
  STORAGE_KEY_REASON_FOR_LEAVE,
  STORAGE_KEY_WORKERS_COMP,
  setNewTitle,
  updateCalendarUI,
} from '../utils';
import i18next from 'i18next';

export const workRelatedLabels = [
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpNm', label: 'Employer Name' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpadd1', label: 'Employer Address Line 1' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpadd2', label: 'Employer Address Line 2' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtCity', label: 'Employer City' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_ddlEmpStates', label: 'Employer State' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpZip1', label: 'Employer Zipcode 1' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpZip2', label: 'Employer Zipcode 2' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh', label: 'Employer Phone Number First 3 Digits' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh2', label: 'Employer Phone Number Digits 4, 5, and 6' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh3', label: 'Employer Phone Number Last 4 Digits' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh4', label: 'Employer Phone Number Extension' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjDt', label: 'Injury Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtNoClaim', label: 'Why No Workers Comp Claim' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_text_num_noClaim', label: 'No Claim Characters Left' },
];

export const id = "workRelated";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC',
  text: 'Work Related Information',
};

export function changes() {
  adjustWidths();
  styleRadioButtons();
  updateInjuryIllnessText();
  updateWorkersCompQuestions();
  updateWorkersCompensationHeader();
  setNewTitle(i18next.t('workRelated.title'));
  updateCalendarUI("Image4");
}

function styleRadioButtons() {
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCNo', true);
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCInsYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCInsNo', true);
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCBenYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCBenNo', true);
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCNo'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCInsYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCInsNo'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCBenYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCBenNo'
  );
}

function updateInjuryIllnessText() {
  const reason = getSessionData()?.[STORAGE_KEY_REASON_FOR_LEAVE]?.reasons;
  const newText = reason === 'illness' ? i18next.t('shared.illness')
    : reason === 'injury' ? i18next.t('shared.injury')
    : null;

  if (!newText) {
    return;
  }

  const container = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC');
  if (!container) {
    return;
  }

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue.includes('illness/injury')) {
      walker.currentNode.nodeValue = walker.currentNode.nodeValue.replace(/illness\/injury/g, newText);
    }
  }
}

function updateWorkersCompensationHeader() {
  const div = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC');
  const legend = div.querySelector('legend');
  legend.style.display = "none";
}

function adjustWidths() {
  const div = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_Panel3');
  if (div) {
    div.style.width = 'auto';
    div.style.maxWidth = '700px';
  }

  const outerDiv = document.getElementById('divWCNo');
  if (outerDiv) {
    const innerDivs = outerDiv.querySelectorAll('div');
    innerDivs.forEach(div => {
      div.style.width = '100%';
      div.style.marginLeft = '0';
    });

    const textarea = outerDiv.querySelector('textarea');
    if (textarea) {
      textarea.style.width = '100%';
    }
  }

  const fieldsets = document.querySelectorAll('fieldset');

  fieldsets.forEach(fieldset => {
    fieldset.style.width = 'auto';
    fieldset.style.maxWidth = '100%';
    adjustTableWidths(fieldset);
  });
}

function updateWorkersCompQuestions() {
  const workersCompYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCYes');
  const workersCompNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCNo');

  if (!workersCompYes || !workersCompNo) return;

  const sessionData = getSessionData();
  const workersCompAnswer = sessionData[STORAGE_KEY_WORKERS_COMP];

  if (workersCompAnswer === 'yes') {
    workersCompYes.checked = true;
    workersCompNo.checked = false;
  } else {
    workersCompYes.checked = false;
    workersCompNo.checked = true;
  }

  hideQuestion2a();
  updateQuestion2bAnd2c();
}

function hideQuestion2a() {
  const workersCompYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCYes');
  const workersCompNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCNo');
  workersCompYes.parentElement.style.display = 'none';
  workersCompNo.parentElement.style.display = 'none';

  let yesRadioParentElem = workersCompYes.parentElement;
  let workersCompQuestionElem = yesRadioParentElem.previousElementSibling;
  let workersCompQuestionNumberElem = workersCompQuestionElem.previousElementSibling;
  let workersCompQuestionAsteriskElem = workersCompQuestionNumberElem.previousElementSibling;
  let brTag1 = workersCompQuestionAsteriskElem.previousElementSibling;
  let brTag2 = brTag1.previousElementSibling;

  workersCompQuestionElem.style.display = 'none'
  workersCompQuestionNumberElem.style.display = 'none'
  workersCompQuestionAsteriskElem.style.display = 'none'
  brTag1.style.display = 'none'
  brTag2.style.display = 'none'
}

function updateQuestion2bAnd2c() {
  // 2b is displayed when a user answers yes to 2a
  // since 2a will be auto-answered, update the display
  const question2b = document.getElementById('divWCIns')
  question2b.style.display = 'block'

  const spacesBefore2b = document.querySelector('#divWCIns br').nextSibling;
  spacesBefore2b.textContent = ""

  const question2bNumberElement = document.querySelector('#divWCIns a strong')
  question2bNumberElement.textContent = '2a.'

  const spacesBefore2c = document.querySelector('#divWCBen br').nextSibling;
  spacesBefore2c.textContent = ""

  const question2cNumberElement = document.querySelector('#divWCBen a strong')
  question2cNumberElement.textContent = '2b.'
}
