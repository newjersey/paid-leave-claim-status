import { styleRadioButton } from '../utils';

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
  pathname: '/tdi_iam/IAM_Login_Profile.aspx',
  elementId: 'divSSN',
  text: 'Please confirm your profile information to ensure secure access',
};

export function changes() {
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnPersYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnPersNo', true);
  removeWhitespaceInPrompt();
}

function removeWhitespaceInPrompt() {
  const div = document.getElementById("divPersInfo");
  div.innerHTML = div.innerHTML.replace(/\s*&nbsp;\s*/g, ' ').trim();
}
