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
  addStyles();
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_rdoWrkSchTyp_0');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_rdoWrkSchTyp_1');
  restructureRadioButtonTable();
  restructureDayOfWeekTable();
  editMargin();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    .decimalsonly, #ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_chkWCSch {
      margin: 10px 0;
    }
  `;
  document.head.appendChild(style);
}

function restructureRadioButtonTable() {
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

function restructureDayOfWeekTable() {
   const mondayInput = document.getElementById('ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCMon');
    const tbody = mondayInput.closest('tbody');

    const inputIds = [
        'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCSun',
        'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCSat',
        'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCFri',
        'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCThu',
        'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCWed',
        'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCTue',
        'ContentPlaceHolder1_TabEmployment_TabPanelWrkSch_txtWCMon'
    ];

    const newRows = [];

    inputIds.forEach(id => {
        const input = document.getElementById(id);
        const td = input.closest('td');
        const newRow = document.createElement('tr');

        const dayText = td.childNodes[0].nodeValue;
        const hrsText = td.childNodes[td.childNodes.length - 1].nodeValue;
        
        newRow.innerHTML = `${dayText.trim()}&nbsp;${hrsText.trim()}&nbsp;`;
        newRow.appendChild(input.cloneNode(true));

        newRows.push(newRow);
    });

    for (let i = 0; i < 2; i++) {
        tbody.removeChild(tbody.firstElementChild);
    }

    newRows.forEach(row => tbody.insertBefore(row, tbody.firstChild));
}

function editMargin() {
  const marginTd = document.querySelector('#ContentPlaceHolder1_TabEmployment_TabPanelWrkSch > div > table:nth-child(3) > tbody > tr:nth-child(9) > td:nth-child(1)');
  if (marginTd) {
    marginTd.style.display = 'none';
  }
}
