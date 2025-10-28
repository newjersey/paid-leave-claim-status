import i18next from 'i18next';
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
  const originalSubmitBtn = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btnCitiZen');
  const customSubmitBtn = document.getElementById('customSubmitBtn');

  const submitBtn = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btnCitiZen');
  
  const address1 = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMAddress1').value;
  const address2 = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMAddress2').value;
  const city = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMCity').value;
  const state = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_ddlMStates').value;
  const zipcode1 = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMZipCode1').value;
  const zipcode2 = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMZipCode2').value;


  customSubmitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    if (state.value === 'NJ') {
      const address = encodeURIComponent(address1.value);
      const address2Encoded = encodeURIComponent(address2.value);
      const cityEncoded = encodeURIComponent(city.value);
      const zipcode = encodeURIComponent(zipcode1.value);
      const zipcodeExt = encodeURIComponent(zipcode2.value);

      const url = `https://geo.nj.gov/arcgis/rest/services/Tasks/NJ_Geocode/GeocodeServer/findAddressCandidates?` +
        `Address=${address}&` +
        `Address2=${address2Encoded}&` +
        `City=${cityEncoded}&` +
        `Postal=${zipcode}&` +
        `PostalExt=${zipcodeExt}&` +
        `f=pjson`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);

          // if response matches entry, proceed
          originalSubmitBtn.click();

          // if there's a different address with highest score above 90, prompt user with suggestion


          // if nothing with a good score, prompt generic "are you sure?"
        })
        .catch(error => {
          console.error('Error fetching address data:', error);
        });
    } else {
      originalSubmitBtn.click();
    }
  });

  // check that the state is "NJ"

  // if so, insert strings into template like this: https://geo.nj.gov/arcgis/rest/services/Tasks/NJ_Geocode/GeocodeServer/findAddressCandidates?Address=123+Main+St.&Address2=Apt+200&City=Newark&Postal=08111&PostalExt=1234&f=pjson

  // get JSON from URL (in format like this)
  // {
  // "spatialReference": {
  //   "wkid": 102711,
  //   "latestWkid": 3424
  // },
  // "candidates": [
  //   {
  //   "address": "123 Main Street, Newark, New Jersey, 07105",
  //   "location": {
  //     "x": 590375.503736172454,
  //     "y": 689362.209437993588
  //   },
  //   "score": 97,
  //   "attributes": {
      
  //   },
  //   "extent": {
  //     "xmin": 590099.821288942127,
  //     "ymin": 688996.795748931472,
  //     "xmax": 590651.17786089913,
  //     "ymax": 689727.626358074602
  //   }
  //   }
  // ]
  // }

  // for now just print that to console
}
