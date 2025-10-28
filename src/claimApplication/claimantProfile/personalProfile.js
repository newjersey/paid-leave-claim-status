import i18next from 'i18next';
import { checkMailingAddress } from '../addressCheck';
import {
  adjustTableWidths,
  removeExtraSpaceBetweenRadioButtons,
  styleRadioButton,
} from '../utils';

export const personalProfileLabels = [
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtoccupation', label: 'Occupation' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlRace', label: 'Race' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlEdctn', label: 'Education' },
];

export const id = "personalProfile";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btnCitBtn',
  text: 'The information listed below was obtained from your user logon profile',
};

export function changes() {
  adjustWidths();
  adjustAddressTable();
  removeEmptyCells();
  removeOverlappingBorders();

  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMale');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnFemale');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbnResUSAYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbnResUSANo');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMailingYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMailingNo', true);
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbnMUSAYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbnMUSANo');
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMale',
    'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnFemale'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbnResUSAYes',
    'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbnResUSANo'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMailingYes',
    'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbtnMailingNo'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbnMUSAYes',
    'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_rbnMUSANo'
  );
  validateMailingAddressBeforeSubmit();
  document.addEventListener('headerReady', setNewTitle);
}

function adjustWidths() {
  const parentDiv = document.getElementById("ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btnCitBtn");
  if (parentDiv) {
    adjustTableWidths(parentDiv);
  }
}

function adjustAddressTable() {
  const div = document.getElementById("HomeAddress");
  if (div) {
    div.style.height = 'fit-content';
  }

  const addressTable = document.getElementById("ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_tblAddresses");

  if (addressTable) {
    addressTable.style.width = 'auto';
    addressTable.style.maxWidth = '100%';
    addressTable.style.tableLayout = 'auto';

    const cells = addressTable.querySelectorAll('td');
    cells.forEach(cell => {
      cell.style.display = 'block';
      cell.style.width = 'auto';
      cell.style.maxWidth = '100%';
    });

    const inputsAndSelects = addressTable.querySelectorAll('input[type="text"], select, textarea');
    inputsAndSelects.forEach(element => {
      element.style.width = 'auto';
      element.style.maxWidth = '100%';
      element.style.boxSizing = 'border-box';
    });

    const fieldsets = addressTable.querySelectorAll('fieldset');
    fieldsets.forEach(fieldset => {
      fieldset.style.width = 'auto';
      fieldset.style.maxWidth = '100%';
      fieldset.style.boxSizing = 'border-box';
    });

    const divs = addressTable.querySelectorAll('div');
    divs.forEach(div => {
      div.style.width = 'auto';
      div.style.maxWidth = '100%';
      div.style.boxSizing = 'border-box';
    });
  }
}

function removeEmptyCells() {
  const cells = document.querySelectorAll('td');
  cells.forEach(cell => {
    if (cell.children.length === 1 && cell.firstElementChild.tagName === 'BR') {
      cell.remove();
    }
  });
}

function removeOverlappingBorders() {
  const homeAddress = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_pnlTest');
  if (homeAddress) {
    homeAddress.style.borderStyle = 'none';
  }

  const mailingAddress = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_pnlMailing');
  if (mailingAddress) {
    mailingAddress.style.borderStyle = 'none';
  }
}

function setNewTitle() {
  const title = document.querySelector("#pageTitle");
  title.textContent = `${i18next.t('personalProfile.title')}`;
  document.removeEventListener('headerReady', setNewTitle);
}

function validateMailingAddressBeforeSubmit() {
  const continueDiv = document.getElementById('divContinue');
  
  const originalSubmitBtn = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btnCitiZen');
  originalSubmitBtn.style.display = 'none';
  
  var submitButton = document.createElement('button');
  submitButton.id = 'submitButton';
  submitButton.classList.add('usa-button');
  submitButton.textContent = i18next.t('continue');
  submitButton.style.display = 'block';
  submitButton.style.margin = 'auto';
  submitButton.style.padding = '10px';
  continueDiv.appendChild(submitButton);
  submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    checkMailingAddress(
      document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMAddress1').value,
      document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMAddress2').value,
      document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMCity').value,
      document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlMStates').value,
      document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMZipCode1').value,
      document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMZipCode2').value,
      (address) => {
        console.log(`proceed with address: ${address}`);
      },
      (address) => {
        console.log(`suggest address: ${address}`);
      },
      (address) => {
        console.log(`verify address: ${address}`);
      },
    );
  });
}
