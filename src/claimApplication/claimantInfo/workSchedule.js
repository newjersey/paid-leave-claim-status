import { styleRadioButton } from '../globalDesign';

export const workScheduleLabels = [
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCMon', label: 'Hours Worked Mondays' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCTue', label: 'Hours Worked Tuesdays' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCWed', label: 'Hours Worked Wednesdays' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCThu', label: 'Hours Worked Thursdays' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCFri', label: 'Hours Worked Fridays' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCSat', label: 'Hours Worked Saturday' },
  { id: 'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCSun', label: 'Hours Worked Sundays' },
];

export const id = "workSchedule";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch',
  text: 'Select the days of the week that you work',
};

export function changes() {
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_rdoWrkSchTyp_0');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_rdoWrkSchTyp_1');
  restructureTable();
}

function restructureTable() {
  const tables = document.querySelectorAll('table');

  tables.forEach(table => {
    const cells = table.querySelectorAll('td');
    cells.forEach(cell => {
      if (cell.textContent.includes('I worked:')) {
        table.style.width = '100%';
        const tbody = table.querySelector('tbody');
        const firstRow = tbody.querySelector('tr');
        const secondCell = firstRow.children[1];
        const radioDivs = secondCell.querySelectorAll('.usa-radio');
        const newRow = document.createElement('tr');
        radioDivs.forEach(radioDiv => {
          newRow.appendChild(radioDiv.cloneNode(true));
          radioDiv.remove();
        });
        tbody.appendChild(newRow);
      }
    });
  });
}
