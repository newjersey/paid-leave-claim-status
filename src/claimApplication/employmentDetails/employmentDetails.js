import { removeExtraSpaceBetweenRadioButtons, styleRadioButton } from '../utils';

export const employmentDetailsLabels = [
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelSpan_ddlStopWorkReason', label: 'Reason work stopped' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtStreetAddrSOE', label: 'Physical work address line 1' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtStreetAddrSOE2', label: 'Physical work address line 2' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtCitySOE', label: 'Physical work city' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelSpan_ddlStateSOE', label: 'Physical work location state' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtZipSOE1', label: 'Physical work zipcode 1' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtZipSOE2', label: 'Physical work zipcode 2' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtDeptUnitSOE', label: 'Unit worked for' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelSpan_textDeptUnitSOECount', label: 'Unit worked for characters left' },
];

export const id = "employmentDetails";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_TabEmployment_TabPanelSpan',
  text: 'My physical work location is',
};

export function changes() {
  adjustTextEntries();
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelSpan_rdoLstSeperation_0');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelSpan_rdoLstSeperation_1');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelSpan_rdoUnionYes');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelSpan_rdoUnionNo');
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_TabEmployment_TabPanelSpan_rdoUnionYes',
    'ContentPlaceHolder1_TabEmployment_TabPanelSpan_rdoUnionNo'
  );
  addStyles();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    #ContentPlaceHolder1_TabEmployment_TabPanelSpan {
      background-color: #FBFCFD;
    }
  `;
  document.head.appendChild(style);
}

function adjustTextEntries() {
  const address1Entry = document.querySelector("#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtStreetAddrSOE");
  if (address1Entry) {
    address1Entry.style.width = '100%';
  }

  const address2Entry = document.querySelector("#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtStreetAddrSOE2");
  if (address2Entry) {
    address2Entry.style.width = '100%';
  }

  const cityEntry = document.querySelector("#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtCitySOE");
  if (cityEntry) {
    cityEntry.style.width = '100%';
  }

  const unitEntry = document.querySelector("#ContentPlaceHolder1_TabEmployment_TabPanelSpan_txtDeptUnitSOE");
  if (unitEntry) {
    unitEntry.style.width = '100%';
  }
}
