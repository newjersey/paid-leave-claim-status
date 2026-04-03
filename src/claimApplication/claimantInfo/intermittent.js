import { updateCalendarUI } from '../utils';

export const id = "intermittent";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_TabEmployment_TabPanelWrkDte',
  text: 'Working Intermittently',
};

export function changes() {
  addStyles();
  adjustTable();
  const fieldset1 = document.querySelector('#div1').closest('fieldset');
  transformFieldset(
    fieldset1,
    'Since your disability began have you worked intermittently for this employer?'
  );

  const fieldset2 = document.querySelector('#divLaborDispute').closest('fieldset');
  transformFieldset(
    fieldset2,
    'Since your disability began, have you been involved in a labor dispute with this employer?'
  );
  updateAllCalendars();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    #divYesWorkInter table:last-child td:nth-child(1),
    #divYesWorkInter table:last-child td:nth-child(2) {
      white-space: nowrap;
    }

    input[type="image"][alt="calendar"] {
      margin-right: 15px;
    }

    @media (max-width: 531px) {
      #divYesWorkInter table:first-child td {
        white-space: normal !important;
      }

      #divYesWorkInter table:last-child,
      #divYesWorkInter table:last-child tbody,
      #divYesWorkInter table:last-child tr,
      #divYesWorkInter table:last-child td {
        display: block !important;
        width: 100% !important;
      }

      /* Add spacing between form rows */
      #divYesWorkInter table:last-child tr {
        margin-bottom: 20px;
        border-bottom: 2px solid #ddd;
        padding-bottom: 20px;
      }

      #divYesWorkInter table:last-child tr:first-child {
        background-color: #f5f5f5;
        padding: 10px;
        margin-bottom: 10px;
      }
            
      #divYesWorkInter input[type="text"] {
        font-size: 16px !important;
        padding: 8px !important;
        margin: 8px !important;
        width: 80% !important;
        max-width: 250px;
      }
            
      #divYesWorkInter input[type="image"] {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
  `;
  document.head.appendChild(style);
}

function adjustTable() {
  const formTable = document.querySelector('#divYesWorkInter table:last-child');
  if (formTable) {
    formTable.querySelectorAll('td[width="20%"], td[width="20px"]').forEach(td => {
      td.remove();
    });

    const dateInputs = formTable.querySelectorAll('input[type="text"][id*="WrkIntDt"]');
    dateInputs.forEach(input => {
      input.style.width = '120px';
      
      // Remove spaces between input and calendar icon
      let nextNode = input.nextSibling;
      while (nextNode && nextNode.nodeType === Node.TEXT_NODE) {
        const textContent = nextNode.textContent;
        if (textContent.trim() === '') {
          const nodeToRemove = nextNode;
          nextNode = nextNode.nextSibling;
          nodeToRemove.remove();
        } else {
          break;
        }
      }
    });

    const dollarInputs = formTable.querySelectorAll('input[type="text"][id*="GrossAmt"]');
    dollarInputs.forEach(input => {
      input.style.width = '80px';
    });
  }
}

function transformFieldset(fieldsetElement, questionText) {
  const oldDiv = fieldsetElement.querySelector('div');
  if (oldDiv) {
    const newFieldset = document.createElement('fieldset');
    newFieldset.classList.add('usa-fieldset');
    newFieldset.style.marginBottom = '20px';

    const newLegend = document.createElement('legend');
    newLegend.classList.add('usa-legend');
    newLegend.textContent = questionText;
    newFieldset.appendChild(newLegend);

    const radioButtons = oldDiv.querySelectorAll('input[type="radio"]');
    const labels = oldDiv.querySelectorAll('label');

    radioButtons.forEach((radioButton, index) => {
      const div = document.createElement('div');
      div.classList.add('usa-radio');

      const newRadioButton = radioButton.cloneNode(true);
      newRadioButton.classList.add('usa-radio__input');

      const newLabel = labels[index].cloneNode(true);
      newLabel.classList.add('usa-radio__label');

      div.appendChild(newRadioButton);
      div.appendChild(newLabel);
      newFieldset.appendChild(div);
    });

    oldDiv.innerHTML = '';
    oldDiv.appendChild(newFieldset);
  }
}

function updateAllCalendars() {
  updateCalendarUI("Image7");
  updateCalendarUI("Image8");
  updateCalendarUI("Image6");
  updateCalendarUI("Image9");
  updateCalendarUI("Image10");
  updateCalendarUI("Image11");
  updateCalendarUI("Image12");
  updateCalendarUI("Image13");
  updateCalendarUI("Image14");
  updateCalendarUI("Image15");
  updateCalendarUI("Image16");
  updateCalendarUI("Image17");
  updateCalendarUI("Image18");
  updateCalendarUI("Image19");
  updateCalendarUI("Image20");
  updateCalendarUI("Image21");
  updateCalendarUI("Image22");
  updateCalendarUI("Image23");
  updateCalendarUI("Image24");
  updateCalendarUI("Image25");
}
