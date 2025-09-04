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
  addStyles();
  adjustWidths();
  adjustAddressTable();
  removeEmptyCells();
  removeOverlappingBorders();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    div, table {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    fieldset {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    td {
      display: block;
      width: 100%;
    }

    input[type="text"],
    select,
    textarea {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
  `;
  document.head.appendChild(style);
}

function adjustWidths() {
  const parentDiv = document.getElementById("ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_btnCitBtn");

  if (parentDiv) {
    const tables = parentDiv.querySelectorAll('table');
    tables.forEach(table => {
      table.style.width = '100%';
      table.style.tableLayout = 'auto';

      const cells = table.querySelectorAll('td');
      cells.forEach(cell => {
        cell.style.width = '';
      });

      const inputsAndSelects = table.querySelectorAll('input[type="text"], select, textarea');
      inputsAndSelects.forEach(element => {
        element.style.width = '100%';
        element.style.maxWidth = '100%';
        element.style.boxSizing = 'border-box';
      });
    });
  }
}

function adjustAddressTable() {
  const div = document.getElementById("HomeAddress");
  if (div) {
    div.style.height = 'fit-content';
  }

  const addressTable = document.getElementById("ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_tblAddresses");

  if (addressTable) {
    addressTable.style.width = '100%';
    addressTable.style.tableLayout = 'auto';

    const cells = addressTable.querySelectorAll('td');
    cells.forEach(cell => {
      cell.style.display = 'block';
      cell.style.width = '100%';
    });

    const inputsAndSelects = addressTable.querySelectorAll('input[type="text"], select, textarea');
    inputsAndSelects.forEach(element => {
      element.style.width = '100%';
      element.style.maxWidth = '100%';
      element.style.boxSizing = 'border-box';
    });

    const fieldsets = addressTable.querySelectorAll('fieldset');
    fieldsets.forEach(fieldset => {
      fieldset.style.width = '100%';
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
