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
  styleRadioButtons();
  adjustTable();
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

function styleRadioButtons() {
  const parentContainer = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlVerification');

  if (parentContainer) {
    const tdElements = parentContainer.querySelectorAll('td');

    tdElements.forEach(tdElement => {
      if (tdElement.textContent.includes('My personal and contact information is correct')) {
        const radioButtons = tdElement.querySelectorAll('input[type="radio"]');
        const labels = tdElement.querySelectorAll('label');

        const fieldset = document.createElement('fieldset');
        fieldset.classList.add('usa-fieldset');
        fieldset.style.marginBottom = '30px';

        const legend = document.createElement('legend');
        legend.classList.add('usa-legend');
        legend.textContent = 'My personal and contact information is correct.';
        fieldset.appendChild(legend);

        radioButtons.forEach((radioButton, index) => {
          const div = document.createElement('div');
          div.classList.add('usa-radio');

          const newRadioButton = radioButton.cloneNode(true);
          newRadioButton.classList.add('usa-radio__input');

          const newLabel = labels[index].cloneNode(true);
          newLabel.classList.add('usa-radio__label');

          div.appendChild(newRadioButton);
          div.appendChild(newLabel);
          fieldset.appendChild(div);
        });

        tdElement.innerHTML = '';
        tdElement.appendChild(fieldset);
      }
    });
  }
}
