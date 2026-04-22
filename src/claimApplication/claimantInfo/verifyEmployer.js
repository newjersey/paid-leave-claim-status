import i18next from 'i18next';
import { replaceVerificationRadioButtons, setNewTitle } from '../utils';

export const verifyEmployerLabels = [
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtVerEmpName', label: 'Employer Name' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerAdd', label: 'Employer Address' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtVerEmpPh', label: 'Employer Phone Number' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtVerEmpPhEx', label: 'Employer Phone Extension' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerEmpSt', label: 'Employment Start Date' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerEmpEnd', label: 'Employment End Date' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerSep', label: 'Work Stop Reason' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtVerSepPerm', label: 'Permanent Separation' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerWrkAdd', label: 'Work Location' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtVerEDept', label: 'Department or Work Unit' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerUnion', label: 'Union Information' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerWSType', label: 'Full or Part Time Work' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtVerESchedule', label: 'Work Schedule' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerPTO', label: 'Paid Time Off' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerPen', label: 'Pension' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerInt', label: 'Intermittent' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtVerELD', label: 'Labor Dispute' },
];

export const id = "verifyEmployer";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_TabEmployment_TabPanelVerify',
  text: 'The information for this employer is correct',
};

export function changes() {
  adjustTables();
  adjustEmploymentInfo();
  styleButtons();
  convertScheduleInputToTextarea();
  replaceVerificationRadioButtons(
    'The information for this employer is correct',
    '#ContentPlaceHolder1_TabEmployment_TabPanelVerify_rbtnTDICorrectYes',
    '#ContentPlaceHolder1_TabEmployment_TabPanelVerify_btnVer_Continue'
  );
  setNewTitle(i18next.t('reviewAndSubmit.title'));
}

function styleButtons() {
  const buttons = document.querySelectorAll('.btnEdit, .btnContinue');
  buttons.forEach(button => {
    button.classList.add('usa-button');
  });
}

function adjustTables() {
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    table.style.width = '100%';
    table.style.tableLayout = 'auto';

    const cells = table.querySelectorAll('td, th');
    cells.forEach(cell => {
      cell.style.width = '100%';
      if (window.getComputedStyle(cell).display === 'table-cell') {
        cell.style.display = 'block';
      }
    });

    const inputsAndTextareas = table.querySelectorAll('input[type="text"], textarea');
    inputsAndTextareas.forEach(element => {
      element.style.width = '100%';
      element.style.maxWidth = '100%';
      element.style.boxSizing = 'border-box';
    });
  });
}

function adjustEmploymentInfo() {
  const elementsToAdjust = [
    'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerWrkAdd',
    'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtVerEDept',
    'ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtEVerUnion'
  ];

  elementsToAdjust.forEach(id => {
    const textarea = document.getElementById(id);
    if (textarea) {
      const parentTd = textarea.closest('td');
      const titleTd = parentTd.previousElementSibling;
      
      if (titleTd) {
        const newTr = document.createElement('tr');
        const newTd = document.createElement('td');
        newTd.colSpan = 2;
        newTd.style.width = "auto";
        newTd.style.maxWidth = "100%";

        newTd.appendChild(textarea);
        newTr.appendChild(newTd);

        const currentTr = titleTd.closest('tr');
        currentTr.parentNode.insertBefore(newTr, currentTr.nextSibling);
        parentTd.remove();
      }
    }
  });
}

function convertScheduleInputToTextarea() {
  const inputElement = document.getElementById("ContentPlaceHolder1_TabEmployment_TabPanelVerify_txtVerESchedule");
  if (inputElement) {
    const textareaElement = document.createElement('textarea');

    textareaElement.name = inputElement.name;
    textareaElement.id = inputElement.id;
    textareaElement.value = inputElement.value;
    textareaElement.readOnly = inputElement.readOnly;
    textareaElement.style.borderStyle = inputElement.style.borderStyle;
    textareaElement.style.fontWeight = inputElement.style.fontWeight;
    textareaElement.style.width = inputElement.style.width;
    textareaElement.style.maxWidth = inputElement.style.maxWidth;
    textareaElement.style.boxSizing = inputElement.style.boxSizing;
    textareaElement.style.height = '140px';
    textareaElement.setAttribute('autocomplete', inputElement.getAttribute('autocomplete'));
    textareaElement.setAttribute('aria-label', inputElement.getAttribute('aria-label'));

    inputElement.parentNode.replaceChild(textareaElement, inputElement);
  }
}
