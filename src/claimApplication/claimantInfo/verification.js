import i18next from 'i18next';
import {
  addToSessionData,
  fixPhoneNumberText,
  STORAGE_KEY_PROVIDER_NAME,
  removeExtraSpaceBetweenRadioButtons,
  styleRadioButton
} from '../utils';

export const otherBenefitsVerificationLabels = [
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDisabDate', label: 'First Day of Disability' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerReturn', label: 'Returned to Work' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVetDtLast', label: 'Last Day Worked' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerRetWork', label: 'Expected Returned to Work Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDisabDesc', label: 'Disability/Injury Description' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocName', label: 'Doctor/Hospital Name' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocStreet', label: 'Doctor/Hospital Address Line 1' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocAddr2', label: 'Doctor/Hospital Address Line 2' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocCity', label: 'Doctor/Hospital City' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocState', label: 'Doctor/Hospital State' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocZip1', label: 'Doctor/Hospital Zipcode 1' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocZip2', label: 'Doctor/Hospital Zipcode 2' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel', label: 'Doctor/Hospital Phone Number First 3 Digits' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel2', label: 'Doctor/Hospital Phone Number Digits 4, 5, and 6' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel3', label: 'Doctor/Hospital Phone Number Last 4 Digits' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTelExt', label: 'Doctor/Hospital Phone Number Extension' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerEmer', label: 'Emergency Room Treatment' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtHospVer', label: 'Hospitalization' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_TxtVerInjWk', label: 'Disability/Injury Work Related' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerTDBenefits', label: 'Temporary Disability Benefits Received from Another State' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerTDBenfEMP', label: 'Temporary Disability Benefits Received from Employer/Union' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerTDSSBenf', label: 'Social Security Disability Benefits Applied For or Received' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerTDUIbenfRecvd', label: 'Unemployment Insurance Benefits' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_lblFIT', label: 'Federal Income Tax Withholding' },
];

export const id = "verification";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification',
  text: 'My disability information is correct',
};

export function changes() {
  adjustTable();
  fixOverflowingText();
  fixPhoneNumberText(
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel',
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel2',
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTel3',
    '#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocTelExt'
  );
  styleButton();
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_rbtnDisabsYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_rbtnDisabsNo');
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_rbtnDisabsYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_rbtnDisabsNo'
  );
  saveProvider();
  document.addEventListener('headerReady', setNewTitle);
}

function styleButton() {
  const button = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_btncontinueVer');
  if (button) {
    button.classList.add('usa-button');
  }
}

function adjustTable() {
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    table.style.width = '100%';
    table.style.tableLayout = 'auto';

    const cells = table.querySelectorAll('td, th');
    cells.forEach(cell => {
      cell.style.textAlign = 'left';
      cell.style.width = '100%';
      cell.style.display = 'block';
    });

    const inputsAndTextareas = table.querySelectorAll('input[type="text"], textarea');
    inputsAndTextareas.forEach(element => {
      element.style.width = '100%';
      element.style.maxWidth = '100%';
      element.style.boxSizing = 'border-box';
      element.style.textAlign = 'left';
    });
  });
}

function fixOverflowingText() {
  const otherStateInfo = document.querySelector('#divVerTDI');
  if (otherStateInfo) {
    otherStateInfo.style.height = 'fit-content';
  }
}

function saveProvider() {
  const submit = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_btncontinueVer');
  const providerName = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_tabpnlDisabilityVerification_txtVerDocName');
  submit.addEventListener('click', function () {
    addToSessionData({
      [STORAGE_KEY_PROVIDER_NAME]: providerName.value.trim()
    });
  });
}

function setNewTitle() {
  const title = document.querySelector("#pageTitle");
  title.textContent = `${i18next.t('reviewAndSave.title')}`;
  document.removeEventListener('headerReady', setNewTitle);
}
