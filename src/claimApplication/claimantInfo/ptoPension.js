import { styleRadioButton } from '../utils';

export const id = "ptoPension";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_TabEmployment_TabPanelPTO',
  text: 'Paid Time Off',
};

export function changes() {
  adjustTable();
  styleRadioButtons();
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

function styleRadioButtons() {
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoPTOYes');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoPTONo', true);
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoRecvPenYes');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoRecvPenNo', true);
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoEPenYes');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoEPenNo', true);
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoLPenYes');
  styleRadioButton('ContentPlaceHolder1_TabEmployment_TabPanelPTO_rdoLPenNo', true);
}
