import { updateCalendarUI } from '../utils';

export const id = "intermittent";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_TabEmployment_TabPanelWrkDte',
  text: 'Working Intermittently',
};

export function changes() {
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
