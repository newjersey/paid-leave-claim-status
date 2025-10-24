import i18next from 'i18next';
import { removeExtraSpaceBetweenRadioButtons, styleRadioButton } from '../utils';

export const citizenshipLabels = [
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum', label: 'First 3 digits of Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum2', label: 'Fourth, fifth, and sixth digits of Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum3', label: 'Last 4 digits of Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum4', label: 'Phone Number Extension' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactAltNum', label: 'First 3 digits of Alternate Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactAltNum2', label: 'Fourth, fifth, and sixth digits of Alternate Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactAltNum3', label: 'Last 4 digits of Alternate Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactAltNum4', label: 'Alternate Phone Number Extension' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtEmail', label: 'Email Address' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtConEmail', label: 'Email Address Confirmation' },
];

export const id = "citizenship";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_pnlCitizen',
  text: 'Are you a citizen',
};

export function changes() {
  adjustWidths();
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepNo');
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepYes',
    'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepNo'
  );
  requirePhone();
  removeCitizenshipQuestion();
  adjustQuestionNumbers();
  document.addEventListener('headerReady', setNewTitle);
}

function adjustWidths () {
  const emailField = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtEmail');
  if (emailField) {
    emailField.style.width = '100%';
  }

  const confirmEmailField = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtConEmail');
  if (confirmEmailField) {
    confirmEmailField.style.width = '100%';
  }

  const repEntry = document.getElementById("ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtRepIns");
  if (repEntry) {
    repEntry.style.width = '100%';
  }
}

function requirePhone() {
  const phone1 = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum');
  const phone2 = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum2');
  const phone3 = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum3');

  phone1.setAttribute('required', '');
  phone1.setAttribute('pattern', '\\d{3}');
  phone1.setAttribute('title', i18next.t('citizenship.phoneValidation.digits_three'));

  phone2.setAttribute('required', '');
  phone2.setAttribute('pattern', '\\d{3}');
  phone2.setAttribute('title', i18next.t('citizenship.phoneValidation.digits_three'));

  phone3.setAttribute('required', '');
  phone3.setAttribute('pattern', '\\d{4}');
  phone3.setAttribute('title', i18next.t('citizenship.phoneValidation.digits_four'));

  const label = phone1.previousElementSibling;
  const asterisk = document.createElement('a');
  asterisk.style.color = 'rgb(139, 0, 0)';
  asterisk.textContent = '* ';
  label.parentNode.insertBefore(asterisk, label);
}

function removeCitizenshipQuestion() {
  const citizenshipQuestion = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_pnlCitizen');
  const citizenshipParentTr = citizenshipQuestion.closest('tr');
  citizenshipParentTr.style.display = 'none';
  const radioButtonYes = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbtnCitizenYes');
  radioButtonYes.click();
}

function adjustQuestionNumbers() {
  const contactInfo = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_pnlContact');
  const strongElements = Array.from(contactInfo.querySelectorAll('strong'));

  const newQuestionNumbers = [
    { current: ' 2.', updated: ' 1.' },
    { current: ' 3.', updated: ' 2.' },
    { current: ' 4.', updated: ' 3.' },
    { current: '4a.', updated: '3a.' },
    { current: '5.', updated: '4.' },
    { current: '5a.', updated: '4a.' },
    { current: '5b.', updated: '4b.' },
    { current: '5c.', updated: '4c.' }
  ];

  newQuestionNumbers.forEach(({ current, updated }) => {
    const element = strongElements.find(el => el.textContent === current);
    if (element) {
      element.textContent = updated;
    }
  });
}

function setNewTitle() {
  const title = document.querySelector("#pageTitle");
  title.textContent = `${i18next.t('citizenship.title')}`;
  document.removeEventListener('headerReady', setNewTitle);
}
