export const id = "employment";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_TabEmployment_tbpnlEMP_lblFDD',
  text: 'Your First Day of Disability is',
};

export function changes() {
  adjustWidths();
  redoTable();
}

function redoTable() {
  const employersTable = document.querySelector("#ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvEmployers");
  
  if (employersTable) {
    const rows = employersTable.querySelectorAll('tbody tr');
    let newTableContent = `
      <caption>
        Employer Information
      </caption>
      <thead>
        <tr>
          <th scope="col" style="width:37%;">Employer Name</th>
          <th scope="col" style="width:10%;">FEIN Number</th>
          <th scope="col" style="width:28%;">Employer Trading As Name</th>
          <th scope="col" style="width:10%;">Employer Status</th>
        </tr>
      </thead>
      <tbody>
    `;

    rows.forEach((row, index) => {
      const cells = row.querySelectorAll('td');
      if (cells.length > 0) {
        const employerName = cells[0].querySelector('label').textContent.trim();
        const feinNumber = cells[1].textContent.trim() || '&nbsp;';
        const tradingName = cells[2].textContent.trim() || '&nbsp;';
        const status = cells[3].textContent.trim() || '&nbsp;';

        const isAddEmployerRow = employerName === 'Add Employer';
        const checkboxAttributes = isAddEmployerRow ? '' : 'checked="checked" disabled="disabled"';

        newTableContent += `
          <tr>
            <th scope="row" data-label="Employer Name" style="text-align:left;">
              <input id="ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvEmployers_chkEmployer_${index-1}" type="checkbox" name="ctl00$ContentPlaceHolder1$TabEmployment$tbpnlEMP$gvEmployers$ctl0${index + 1}$chkEmployer" ${checkboxAttributes} onclick="setTimeout('__doPostBack(\\'ctl00$ContentPlaceHolder1$TabEmployment$tbpnlEMP$gvEmployers$ctl0${index + 1}$chkEmployer\\', \\'\\')', 0)" autocomplete="off">
              <label for="ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvEmployers_chkEmployer_${index-1}">${employerName}</label>
            </th>
            <td data-label="FEIN Number" align="center">${feinNumber}</td>
            <td data-label="Employer Trading As Name" align="center">${tradingName}</td>
            <td data-label="Employer Status" align="center">${status}</td>
          </tr>
        `;
      }
    });

    newTableContent += '</tbody>';
    employersTable.innerHTML = newTableContent;

    employersTable.classList.remove('mGrid');
    employersTable.classList.add('usa-table');
    employersTable.classList.add('usa-table--stacked');
  }
}

function adjustWidths() {
  const tableDiv = document.querySelector('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvPanel');
  if (tableDiv) {
    tableDiv.style.height = 'auto';
    tableDiv.style.width = 'auto';
  }

  const instructions = document.querySelector('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_tblEmpl');
  if (instructions) {
    instructions.style.lineHeight = 1.6;
    instructions.style.whiteSpace = 'normal';
  }
}
