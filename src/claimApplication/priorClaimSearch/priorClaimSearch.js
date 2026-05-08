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
  adjustContainers();
  adjustTextEntry();
  adjustTable();
  adjustNoPendingClaimBox();
  removeTextReferencingFuture();
  autoAnswerNo();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    [type=checkbox] {
      margin-right: 5px;
    }

    .hidden-question {
      display: none !important;
    }

    @media (max-width: 767px) {
      #ContentPlaceHolder1_lblMesgInfo {
        display: block;
        width: 300px;
      }
    }
  `;
  document.head.appendChild(style);
}

function adjustContainers() {
  const table = document.getElementById('ContentPlaceHolder1_tblContent');
  table.style.width = '100%';

  const nameContainer = document.getElementById('dvMain');
  nameContainer.style.margin = '0';

  const errorContainer = document.getElementById('divErrorMessage');
  errorContainer.style.margin = '0';

  const messageContainer = document.getElementById('divMessageInfo');
  messageContainer.style.margin = '0';

  const claimListContainer = document.getElementById('dvClmNo');
  claimListContainer.style.margin = '0';
  claimListContainer.style.width = '100%';

  const claimList = document.getElementById('ContentPlaceHolder1_dvPndClaims');
  if (claimList) {
    claimList.style.width = '100%';
  } 
}

function adjustTextEntry() {
  const name = document.querySelector("#ContentPlaceHolder1_txtFName");
  if (name) {
    name.style.width = '100%';
  }
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

function autoAnswerNo() {
  const questionContainer = document.getElementById('dvIANMYes');
  if (questionContainer.offsetParent !== null) {
    const noButton = document.getElementById('ContentPlaceHolder1_rbtnClmNo');
    noButton.click();
    questionContainer.classList.add('hidden-question');
  }
}
