import {
  removeExtraSpaceBetweenRadioButtons,
  styleRadioButton,
  updateCalendarUI,
 } from '../utils';

export const id = "ptoPension";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_TabEmployment_TabPanelPTO',
  text: 'Paid Time Off',
};

export function changes() {
  adjustTable();
  additionalTableAdjustments();
  styleRadioButtons();
  styleCalendars();
}

function adjustTable() {
  const table = document.querySelector("#divYesPTO > table:nth-child(3)");

  if (table) {
    table.classList.add("usa-table", "usa-table--stacked");

    const thead = document.createElement("thead");
    const headerRow = table.querySelector("tr");
    thead.appendChild(headerRow);
    table.insertBefore(thead, table.firstChild);

    const headerCells = headerRow.querySelectorAll("td");
    headerCells.forEach(cell => {
      cell.removeAttribute("width");
      cell.style.width = "";
    });

    const tbody = table.querySelector("tbody");
    const rows = tbody.querySelectorAll("tr");

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      cells.forEach((cell, cellIndex) => {
        cell.style.width = "";
        cell.setAttribute("data-label", headerCells[cellIndex].innerText.trim());

        if (cellIndex === 0) {
          const th = document.createElement("th");
          th.innerHTML = cell.innerHTML;
          th.setAttribute("scope", "row");
          th.setAttribute("data-label", headerCells[cellIndex].innerText.trim());
          row.replaceChild(th, cell);
        }

        const childElements = cell.querySelectorAll('*');
        childElements.forEach(child => {
          child.style.width = "";
          child.removeAttribute("width");
        });
      });
    });
  }
}

function additionalTableAdjustments() {
  applyTableFixes();
    
  let resizeTimeout;
  window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(applyTableFixes, 100); // 100ms to debounce many resize events
  });
}

function isTableStacked() {
  const table = document.querySelector('.usa-table');
  const firstCell = table.querySelector('th, td');
  if (!firstCell) return false;
  
  const style = window.getComputedStyle(firstCell);
  return style.display === 'block'; // USWDS stacked mode sets display: block on cells
}


function applyTableFixes() {
  const table = document.querySelector('.usa-table');

  if (isTableStacked()) {
    const cells = table.querySelectorAll('th, td');
    cells.forEach(cell => {
      cell.style.width = '';
      cell.style.maxWidth = '';
    });
    
    const selects = table.querySelectorAll('select');
    selects.forEach(select => {
      select.style.width = '';
      select.style.maxWidth = '';
      select.style.boxSizing = '';
    });
    
    const inputs = table.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
      input.style.width = '';
      input.style.maxWidth = '';
      input.style.boxSizing = '';
    });
    
    table.style.width = '';
    table.style.minWidth = '';
    table.style.tableLayout = '';
  } else {
    table.style.width = '100%';
    table.style.minWidth = '100%';
    table.style.tableLayout = 'fixed';
    
    const columns = table.querySelectorAll('th, td');
    const colCount = 4;
    const widths = ['20%', '20%', '35%', '25%'];
    
    columns.forEach((cell, index) => {
      const colIndex = index % colCount;
      cell.style.width = widths[colIndex];
      cell.style.maxWidth = widths[colIndex];
    });
    
    const selects = table.querySelectorAll('select');
    selects.forEach(select => {
      select.style.width = '100%';
      select.style.maxWidth = '100%';
      select.style.boxSizing = 'border-box';
    });
    
    const inputs = table.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
      input.style.width = '100%';
      input.style.maxWidth = '100%';
      input.style.boxSizing = 'border-box';
    });
  }
}

function styleRadioButtons() {
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoPTOYes');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoPTONo', true);
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoRecvPenYes');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoRecvPenNo', true);
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoEPenYes');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoEPenNo', true);
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoLPenYes');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoLPenNo', true);
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoPTOYes',
    'ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoPTONo'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoRecvPenYes',
    'ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoRecvPenNo'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoEPenYes',
    'ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoEPenNo'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoLPenYes',
    'ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoLPenNo'
  );
}

function styleCalendars() {
  updateCalendarUI("ImgFromPTODt1");
  updateCalendarUI("ImgToPTODt1");

  updateCalendarUI("ImgFromPTODt2");
  updateCalendarUI("ImgToPTODt2");

  updateCalendarUI("ImgFromPTODt3");
  updateCalendarUI("ImgToPTODt3");

  updateCalendarUI("ImgFromPTODt4");
  updateCalendarUI("ImgToPTODt4");

  updateCalendarUI("ImgFromPTODt5");
  updateCalendarUI("ImgToPTODt5");

  updateCalendarUI("Image1", false); // date of check
}
