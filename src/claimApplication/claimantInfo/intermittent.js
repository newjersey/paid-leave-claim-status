import { updateCalendarUI } from '../utils';

export const id = "intermittent";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_TabEmployment_TabPanelWrkDte',
  text: 'Working Intermittently',
};

export function changes() {
  addStyles();
  removeTableSpaces();
  adjustTable();
  makeDateEntriesThinner();
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

function makeDateEntriesThinner() {
  //   const dateInputs = document.querySelectorAll('#divYesWorkInter input[type="text"][id*="WrkIntDt"]');
  // dateInputs.forEach(input => {
  //     input.style.width = '120px';
  // });

      const dateInputs = document.querySelectorAll('#divYesWorkInter input[type="text"][id*="WrkIntDt"]');
    dateInputs.forEach(input => {
        input.style.width = '120px';
        
        // Remove the spaces between input and calendar icon
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
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `

        /* Only apply nowrap to cells containing date inputs (not all cells) */
        // #divYesWorkInter table:last-child td:nth-child(1),
        // #divYesWorkInter table:last-child td:nth-child(3),
        // #divYesWorkInter table:last-child td:nth-child(5) {
        //     width: 1% !important;
        // }

        // #divYesWorkInter table:last-child td:nth-child(2),
        // #divYesWorkInter table:last-child td:nth-child(4),
        // #divYesWorkInter table:last-child td:nth-child(6) {
        //   width: 10% !important;
        // }

        #divYesWorkInter table:last-child td {
          // width: 30% !important;
          white-space: nowrap;
        }

        input[type="image"][alt="calendar"] {
          margin-right: 15px;
        }
        
        /* Mobile responsive fixes */
        @media (max-width: 768px) {
            /* Let the first table (instructions) wrap normally */
            #divYesWorkInter table:first-child td {
                white-space: normal !important;
            }
            
            /* Make only the form table responsive */
            #divYesWorkInter table:last-child,
            #divYesWorkInter table:last-child tbody,
            #divYesWorkInter table:last-child tr,
            #divYesWorkInter table:last-child td {
                display: block !important;
                width: 100% !important;
            }
            
            /* Hide the spacer columns in form table only */
            #divYesWorkInter table:last-child td[width="20%"],
            #divYesWorkInter table:last-child td[width="20px"] {
                display: none !important;
            }
            
            /* Make field columns full width and stack */
            #divYesWorkInter table:last-child td[width="230px"] {
                width: 100% !important;
                margin-bottom: 15px;
                padding: 5px 10px !important;
            }
            
            /* Add spacing between form rows */
            #divYesWorkInter table:last-child tr {
                margin-bottom: 20px;
                border-bottom: 2px solid #ddd;
                padding-bottom: 20px;
            }
            
            /* Header row styling */
            #divYesWorkInter table:last-child tr:first-child {
                background-color: #f5f5f5;
                padding: 10px;
                margin-bottom: 10px;
            }
            
            /* Make inputs more touch-friendly */
            #divYesWorkInter input[type="text"] {
                font-size: 16px !important;
                padding: 8px !important;
                width: calc(100% - 45px) !important;
                max-width: 250px;
            }
            
            /* Ensure calendar icons stay inline */
            #divYesWorkInter input[type="image"] {
                width: 30px;
                height: 30px;
                vertical-align: middle;
            }
        }



    //       #divYesWorkInter {
    //         max-width: 100%;
    //         overflow-x: auto;
    //     }
        
    //     /* Prevent tables from forcing fieldset to expand */
    //     #divYesWorkInter table {
    //         max-width: 100%;
    //     }


    //      #divYesWorkInter table:last-child td[width="20%"] {
    //         width: 5% !important;
    //     }
        
    //     #divYesWorkInter table:last-child td[width="230px"] {
    //         width: 30% !important;
    //     }
        
    //     #divYesWorkInter table:last-child td[width="20px"] {
    //         width: 2% !important;
    //     }

    // #divYesWorkInter table:last-child tbody td {
    //         white-space: nowrap;
    //     }
    
    // /* Mobile responsive fixes */
    // @media (max-width: 768px) {
    //     /* Make table and rows block-level */
    //     #divYesWorkInter table,
    //     #divYesWorkInter tbody,
    //     #divYesWorkInter tr,
    //     #divYesWorkInter td {
    //         display: block !important;
    //         width: 100% !important;
    //     }
        
    //     /* Hide the first empty column (20% spacer) */
    //     td[width="20%"] {
    //         display: none !important;
    //     }
        
    //     /* Hide the 20px spacer columns */
    //     td[width="20px"] {
    //         display: none !important;
    //     }
        
    //     /* Make field columns full width and stack */
    //     td[width="230px"] {
    //         width: 100% !important;
    //         margin-bottom: 15px;
    //         padding: 5px 10px !important;
    //     }
        
    //     /* Add spacing between form rows */
    //     tr {
    //         margin-bottom: 20px;
    //         border-bottom: 2px solid #ddd;
    //         padding-bottom: 20px;
    //     }
        
    //     /* Make inputs more touch-friendly */
    //     input[type="text"] {
    //         font-size: 16px !important; /* Prevents iOS zoom */
    //         padding: 8px !important;
    //         width: calc(100% - 45px) !important; /* Leave room for calendar icon */
    //         max-width: 250px;
    //     }
        
    //     /* Ensure calendar icons stay inline */
    //     input[type="image"] {
    //         width: 30px;
    //         height: 30px;
    //         vertical-align: middle;
    //     }
    // }
  `;
  document.head.appendChild(style);
}

function adjustTable() {
  const formTable = document.querySelector('#divYesWorkInter table:last-child');
    if (formTable) {
        formTable.querySelectorAll('td[width]').forEach(td => {
          // if width is "20%", change to "5%"
          // if width is "20px", change to "5%"
          // if width is "230px", change to "28%"
            td.removeAttribute('width');
        });
    }
}

function removeTableSpaces() {
  const formTable = document.querySelector('#divYesWorkInter table:last-child');
    if (formTable) {
        // Remove all td elements with width="20%" or width="20px"
        formTable.querySelectorAll('td[width="20%"], td[width="20px"]').forEach(td => {
            td.remove();
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
