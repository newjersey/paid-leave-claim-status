import { updateCalendarUI } from '../utils';

export const employerDetailsLabels = [
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpNm', label: 'Employer Name' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd1', label: 'Employer Address Line 1' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd2', label: 'Employer Address Line 2' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpCity', label: 'Employer City' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_ddlEmpStates', label: 'Employer State' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip1', label: 'Employer Zipcode 1' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip2', label: 'Employer Zipcode 2' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA', label: 'Employer Phone First 3 Digits' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo1', label: 'Employer Phone Digits 4, 5, and 6' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo2', label: 'Employer Phone Last 4 Digits' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoX', label: 'Employer Phone Extension' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt', label: 'Employment Start Date' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt', label: 'Employment End Date' },
];

export const id = "employerDetails";

export const identifyingContent = {
  id,
  elementId: 'divEmp',
  text: 'Employers Details',
};

export function changes() {
  adjustTextEntries();
  updateAllCalendars();
}

function adjustTextEntries() {
  const employerNameEntry = document.querySelector("#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpNm");
  if (employerNameEntry) {
    employerNameEntry.style.width = '100%';
  }

  const employerAddress1Entry = document.querySelector("#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd1");
  if (employerAddress1Entry) {
    employerAddress1Entry.style.width = '100%';
  }

  const employerAddress2Entry = document.querySelector("#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd2");
  if (employerAddress2Entry) {
    employerAddress2Entry.style.width = '100%';
  }

  const employerCityEntry = document.querySelector("#ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpCity");
  if (employerCityEntry) {
    employerCityEntry.style.width = '100%';
  }
}

function updateAllCalendars() {
  const employedFromId = 'Image2';
  const employedToId = 'Image4';

  updateCalendarUI(employedFromId);
  updateCalendarUI(employedToId);
}
