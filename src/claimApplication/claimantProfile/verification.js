import i18next from 'i18next';
import {
  addToSessionData,
  fixPhoneNumberText,
  replaceVerificationRadioButtons,
  setNewTitle,
  STORAGE_KEY_USER_DOB,
  STORAGE_KEY_USER_NAME,
  STORAGE_KEY_USER_EMAIL,
  STORAGE_KEY_USER_PHONE,
  STORAGE_KEY_USER_MAIL_ADDRESS,
} from '../utils';

export const claimantProfileVerificationLabels = [
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerFname', label: 'Name' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerDob', label: 'Date of Birth' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerGender', label: 'Gender' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtRace', label: 'Race' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtEdctn', label: 'Education' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerOccupation', label: 'Occupation' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerHomeUSAddr1Addr2', label: 'Home Address Lines 1 and 2' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerHomeUSCityStZip', label: 'Home Address City, State, and Zipcode' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerMailUSAddr1Addr2', label: 'Mailing Address Lines 1 and 2' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerMailUSCityStZip', label: 'Mailing Address City, State, and Zipcode' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerCitznFlg', label: 'U.S. Citizen' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTel1', label: 'First 3 Digits of Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTel2', label: 'Fourth, fifth, and sixth digits of Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTel3', label: 'Last 4 digits of Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTelExt', label: 'Phone Number Extension' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerAltTel1', label: 'First 3 Digits of Alternate Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerAltTel2', label: 'Fourth, fifth, and sixth digits of Alternate Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerAltTel3', label: 'Last 4 digits of Alternate Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerAltTelExt', label: 'Alternate Phone Number Extension' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerEmail', label: 'Email' },
];

export const id = "claimantProfileVerification";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification',
  text: 'My personal and contact information is correct.',
};

export function changes() {
  replaceVerificationRadioButtons(
    'My personal and contact information is correct',
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_rbtnPersYes',
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btncontinueVer'
  );
  adjustTable();
  fixPhoneNumberText(
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTel1',
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTel2',
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTel3',
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTelExt'
  );
  fixPhoneNumberText(
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerAltTel1',
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerAltTel2',
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerAltTel3',
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerAltTelExt'
  );
  fixPhoneNumberText(
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerRepTel1',
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerRepTel2',
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerRepTel3',
    '#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerRepTelExt'
  );
  saveInfo();
  renamePages();
  setNewTitle(i18next.t('reviewAndSave.title'));
}

function adjustTable() {
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    table.style.width = '100%';
    table.style.tableLayout = 'auto';

    const cells = table.querySelectorAll('td, th');
    cells.forEach(cell => {
      cell.style.width = '100%';
      cell.style.display = 'block';
    });

    const inputsAndTextareas = table.querySelectorAll('input[type="text"], textarea');
    inputsAndTextareas.forEach(element => {
      element.style.width = '100%';
      element.style.maxWidth = '100%';
      element.style.textAlign = 'left';
      element.style.boxSizing = 'border-box';
    });
  });

  const repInputElement = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerRepDOB');
  if (repInputElement) {
    const repElement = repInputElement.parentElement;
    repElement.style.textAlign = 'left';
  }
}

function saveInfo() {
  const submit = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btncontinueVer');
  const fullName = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerFname');
  const dob = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerDob');
  const address1 = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerMailUSAddr1Addr2');
  const address2 = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerMailUSCityStZip');
  const email = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerEmail');
  const phone1 = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTel1');
  const phone2 = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTel2');
  const phone3 = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTel3');
  const phoneExt = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_txtVerTelExt');
  
  const phoneExtString = phoneExt.value.trim().length > 0 ? ` Ext: ${phoneExt.value.trim()}` : '';
  const phone = `(${phone1.value.trim()}) ${phone2.value.trim()}-${phone3.value.trim()}${phoneExtString}`;

  const address = {
    line1: address1.value.trim(),
    line2: address2.value.trim()
  };

  submit.addEventListener('click', function () {
    addToSessionData({
      [STORAGE_KEY_USER_NAME]: fullName.value.trim(),
      [STORAGE_KEY_USER_DOB]: dob.value.trim(),
      [STORAGE_KEY_USER_EMAIL]: email.value.trim(),
      [STORAGE_KEY_USER_PHONE]: phone,
      [STORAGE_KEY_USER_MAIL_ADDRESS]: address
    });
  });
}

function renamePages() {
  const elementsToRename = [
    {
      id: "#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btnEditPersInfo",
      oldName: "Personal Information",
      newNameKey: 'personalProfile.title'
    },
    {
      id: "#ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification_btnEditCitznInfo",
      oldName: "Citizenship and Contact Information",
      newNameKey: 'citizenship.title'
    }
  ];

  elementsToRename.forEach(({ id, oldName, newNameKey }) => {
    const legendElement = document.querySelector(id).parentElement;
    if (legendElement) {
      legendElement.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes(oldName)) {
          node.textContent = node.textContent.replace(oldName, i18next.t(newNameKey));
        }
      });
    }
  });
}
