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
  addStyles();
  adjustTable();
  styleButtons();
}

function styleButtons() {
  const buttons = document.querySelectorAll('.btnEdit, .btnContinue');
  buttons.forEach(button => {
      button.classList.add('usa-button');
  });
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    div {
      max-width: 100%;
    }

    table {
      width: 100%;
      table-layout: auto;
    }

    input[type="text"], select {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
  `;
  document.head.appendChild(style);
}

function adjustTable() {
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
      table.style.width = '100%';
      table.style.tableLayout = 'auto';

      const cells = table.querySelectorAll('td, th');
      cells.forEach(cell => {
          cell.style.width = '';
      });

      const inputsAndTextareas = table.querySelectorAll('input[type="text"], textarea');
      inputsAndTextareas.forEach(element => {
          element.style.width = '100%';
          element.style.maxWidth = '100%';
          element.style.boxSizing = 'border-box';
      });
  });
}

