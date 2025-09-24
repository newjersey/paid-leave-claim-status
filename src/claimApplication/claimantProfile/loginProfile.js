import {
  LOCAL_STORAGE_KEY_USER_DOB,
  LOCAL_STORAGE_KEY_USER_NAME,
  styleRadioButton,
} from '../utils';

export const loginProfileLabels = [
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtClmntSSN1', label: 'First 3 digits of Social Security Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtClmntSSN2', label: 'Fourth and fifth digits of Social Security Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtClmntSSN3', label: 'Last 4 digits of Social Security Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtFName', label: 'First Name' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMInit', label: 'Middle Initial' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtLName', label: 'Last Name' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtDOB', label: 'Date of Birth' }
];

export const id = "loginProfile";

export const identifyingContent = {
  id,
  elementId: 'divSSN',
  text: 'Please confirm your profile information to ensure secure access',
};

export function changes() {
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnPersYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnPersNo', true);
  removeWhitespaceInPrompt();
  saveNameAndDOB();
}

function removeWhitespaceInPrompt() {
  const div = document.getElementById("divPersInfo");
  div.innerHTML = div.innerHTML.replace(/\s*&nbsp;\s*/g, ' ').trim();
}

function saveNameAndDOB() {
  const submit = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btncontinueVer');
  const firstName = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtFName');
  const lastName = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtLName');
  const dob = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtDOB');
  if (submit && firstName && lastName && dob) {
    submit.addEventListener('click', function () {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER_NAME, `${firstName.value.trim()} ${lastName.value.trim()}`);
      localStorage.setItem(LOCAL_STORAGE_KEY_USER_DOB, dob.value.trim());
    });
  }
}
