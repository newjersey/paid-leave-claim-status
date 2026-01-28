import i18next from 'i18next';
import { logEvent } from "../../modules/shared.mjs";
import {
  adjustTableWidths,
  removeExtraSpaceBetweenRadioButtons,
  setNewTitle,
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
  pathname: '/tdi_iam/ClaimantProfile_IANM.aspx',
  elementId: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btnCitBtn',
  text: 'The information listed below was obtained from your user logon profile',
};

export function changes() {
  adjustWidths();
  adjustAddressTable();
  removeEmptyCells();
  removeOverlappingBorders();
  trackLongAddress();

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
  setNewTitle(i18next.t('personalProfile.title'));
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

function trackLongAddress() {
  const submit = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btnCitiZen');
  const address1 = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtAddress1');
  const address2 = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtAddress2');
  const city = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtCity');
  
  submit.addEventListener('click', function () {
    const addressLength = address1.value.trim().length + address2.value.trim().length + city.value.trim().length;
    if (addressLength > 40) {
      logEvent("Long Personal Address Submitted", { addressLength });
    }
  });
}
