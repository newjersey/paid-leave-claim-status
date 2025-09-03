export const id = "employment";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_TabEmployment_tbpnlEMP_lblFDD',
  text: 'Your First Day of Disability is',
};

export function changes() {
  adjustWidths();
}

function adjustWidths() {
  const tableDiv = document.querySelector('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvPanel');
  if (tableDiv) {
    tableDiv.style.height = 'auto';
    tableDiv.style.width = 'auto';
  }

  const employersTable = document.querySelector("#ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvEmployers");
  if (employersTable) {
    employersTable.classList.remove('mGrid');
    employersTable.classList.add('usa-table');
    employersTable.classList.add('usa-table--stacked');
    // TODO: make this dynamic!
    employersTable.innerHTML = `
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
        <tr>
          <th scope="row" data-label="Employer Name" style="text-align:left;">
            <input id="ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvEmployers_chkEmployer_0" type="checkbox" name="ctl00$ContentPlaceHolder1$TabEmployment$tbpnlEMP$gvEmployers$ctl02$chkEmployer" onclick="javascript:setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$TabEmployment$tbpnlEMP$gvEmployers$ctl02$chkEmployer\',\'\')', 0)" autocomplete="off">
            <label for="ContentPlaceHolder1_TabEmployment_tbpnlEMP_gvEmployers_chkEmployer_0">Add Employer</label>
          </th>
          <td data-label="FEIN Number" align="center">&nbsp;</td>
          <td data-label="Employer Trading As Name" align="center">&nbsp;</td>
          <td data-label="Employer Status" align="center">&nbsp;</td>
        </tr>
      </tbody>
    `;
  }

  const instructions = document.querySelector('#ContentPlaceHolder1_TabEmployment_tbpnlEMP_tblEmpl');
  if (instructions) {
    instructions.style.lineHeight = 1.6;
    instructions.style.whiteSpace = 'normal';
  }
}
