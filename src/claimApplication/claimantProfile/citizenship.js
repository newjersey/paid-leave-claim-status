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
}
