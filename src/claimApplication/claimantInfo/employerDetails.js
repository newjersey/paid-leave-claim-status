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
  adjustInputs();
  updateAllCalendars();
}

function adjustInputs() {
  const nameInput = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpNm");
  nameInput.classList.add('usa-input');

  const address1Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd1");
  address1Input.classList.add('usa-input');

  const address2Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpAdd2");
  address2Input.classList.add('usa-input');

  const cityInput = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpCity");
  cityInput.classList.add('usa-input');

  const stateSelect = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_ddlEmpStates");
  stateSelect.classList.add('usa-select');
  stateSelect.style.height = 'auto';
  stateSelect.style.width = '160px';

  const zipContainer = document.getElementById('divAddEmpZip');
  zipContainer.style.display = 'flex';
  zipContainer.style.alignItems = 'center';
  zipContainer.style.marginTop = '0.5rem';

  const zip1Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip1");
  zip1Input.classList.add('usa-input');
  zip1Input.style.width = '80px';
  zip1Input.style.marginTop = '0';
  zip1Input.style.marginRight = '5px';

  const zip2Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZip2");
  zip2Input.classList.add('usa-input');
  zip2Input.style.width = '60px';
  zip2Input.style.marginTop = '0';
  zip2Input.style.marginLeft = '5px';

  const intlZipInput = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtCEmpZipOOC');
  intlZipInput.classList.add('usa-input');
  intlZipInput.style.width = '140px';

  const countrySelect = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_ddlAddEmpCtry');
  countrySelect.classList.add('usa-select');
  countrySelect.style.height = 'auto';
  countrySelect.style.width = '400px';

  const phone1Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA");
  phone1Input.classList.add('usa-input');
  phone1Input.style.marginRight = '2px';
  phone1Input.style.marginTop = '0';
  phone1Input.style.width = '50px';

  const phone2Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo1");
  phone2Input.classList.add('usa-input');
  phone2Input.style.marginLeft = '2px';
  phone2Input.style.marginRight = '2px';
  phone2Input.style.marginTop = '0';
  phone2Input.style.width = '50px';

  const phone3Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo2");
  phone3Input.classList.add('usa-input');
  phone3Input.style.marginLeft = '2px';
  phone3Input.style.marginRight = '10px';
  phone3Input.style.marginTop = '0';
  phone3Input.style.width = '60px';

  const phone4Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoX");
  phone4Input.classList.add('usa-input');
  phone4Input.style.marginLeft = '2px';
  phone4Input.style.marginTop = '0';
  phone4Input.style.width = '70px';

  const phoneContainer = document.createElement('div');
  phoneContainer.style.display = 'flex';
  phoneContainer.style.alignItems = 'center';
  phone1Input.insertAdjacentElement('beforebegin', phoneContainer);
  phoneContainer.append(phone1Input);
  phone1Input.insertAdjacentHTML('afterend', '-');
  phoneContainer.append(phone2Input);
  phone2Input.insertAdjacentHTML('afterend', '-');
  phoneContainer.append(phone3Input);
  phone3Input.insertAdjacentHTML('afterend', 'Ext.');
  phoneContainer.append(phone4Input);
  phoneContainer.nextSibling.remove();
  phoneContainer.nextSibling.remove();
  phoneContainer.nextSibling.remove();

  const startDateInput = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentStartDt");
  startDateInput.classList.add('usa-input');

  const endDateInput = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmploymentEndDt");
  endDateInput.classList.add('usa-input');

  stateSelect.addEventListener('change', function () {
    if (stateSelect.value != 0) {
      zipContainer.style.display = 'flex';
    }
  });
}

function updateAllCalendars() {
  const employedFromId = 'Image2';
  const employedToId = 'Image4';

  updateCalendarUI(employedFromId);
  updateCalendarUI(employedToId);
}
