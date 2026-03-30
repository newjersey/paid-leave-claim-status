import { styleRadioButton } from '../utils';

export const priorClaimSearchLabels = [
  { id: 'ContentPlaceHolder1_txtFName', label: 'Full Name' },
  { id: 'ContentPlaceHolder1_txtDOB', label: 'Date of Birth' },
  { id: 'ContentPlaceHolder1_txtClmID', label: 'Claim ID' },
];

export const id = "priorClaimSearch";

export const identifyingContent = {
  id,
  elementId: 'dvIANMYes',
  text: 'Do you know your Claim ID Number?',
};

export function changes() {
  addStyles();
  adjustTextEntry();
  styleRadioButton('ContentPlaceHolder1_rbtnClmYes');
  styleRadioButton('ContentPlaceHolder1_rbtnClmNo');
  removeWhitespace();
  adjustTable();
  adjustNoPendingClaimBox();
  removeTextReferencingFuture();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    @media (max-width: 767px) {
      #ContentPlaceHolder1_lblMesgInfo {
        display: block;
        width: 300px;
      }
    }
  `;
  document.head.appendChild(style);
}

function adjustTextEntry() {
  const name = document.querySelector("#ContentPlaceHolder1_txtFName");
  if (name) {
    name.style.width = '100%';
  }
}

function removeWhitespace() {
  const radioButtonYes = document.getElementById('ContentPlaceHolder1_rbtnClmYes');
  const tdElement = radioButtonYes.closest('td');
  const childNodes = tdElement.childNodes;

  childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() === '') {
      tdElement.removeChild(node);
    }
  });
}

function adjustTable() {
  const table = document.getElementById('ContentPlaceHolder1_gvPndClaims');
  if (table) {
    table.className = 'usa-table usa-table--stacked';
  
    const thead = document.createElement('thead');
    const headerRow = table.querySelector('tr:first-child');
    thead.appendChild(headerRow);

    table.insertBefore(thead, table.firstChild);

    Array.from(headerRow.children).forEach((cell) => {
      if (cell.classList.contains('hideCol')) {
        cell.style.display = 'none';
      }
    });

    const tbody = table.querySelector('tbody');

    tbody.querySelectorAll('tr').forEach(row => {
      Array.from(row.children).forEach((cell) => {
        if (cell.classList.contains('hideCol')) {
          cell.style.display = 'none';
        }
      });

      row.querySelectorAll('td, th').forEach((cell, index) => {
        const headerText = headerRow.children[index].textContent.trim();
        
        cell.setAttribute('data-label', headerText);
        
        if (index === 0 && cell.tagName !== 'TH') {
          const th = document.createElement('th');
          th.setAttribute('scope', 'row');
          th.setAttribute('data-label', headerText);
          th.innerHTML = cell.innerHTML;
          row.replaceChild(th, cell);
        }
      });
    });
  }
}

function adjustNoPendingClaimBox() {
  const noPendingClaimsDiv = document.getElementById('ContentPlaceHolder1_dvNoData');
  if (noPendingClaimsDiv) {
    noPendingClaimsDiv.style.position = 'static';
  }
}

function removeTextReferencingFuture() {
  const span = document.querySelector("#ContentPlaceHolder1_lblMesgInfo");
  if (!span) return;
  const targetRegex = /\s+Also,\s+claims\s+that\s+were\s+filed\s+for\s+temporary\s+disability\s+dates\s+in\s+the\s+future\s+and\s+have\s+not\s+been\s+certified\s+within\s+14\s+days\s+after\s+the\s+first\s+date\s+of\s+temporary\s+disability\s+have\s+been\s+removed./gi;
  span.textContent = span.textContent.replace(targetRegex, '');
}
