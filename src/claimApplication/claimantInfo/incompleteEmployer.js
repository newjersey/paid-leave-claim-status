import i18next from 'i18next';
import { updateCalendarUI } from '../utils';

export const id = "incompleteEmployer";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_lblWrkEmployerName',
  text: 'Did you work for',
};

export function changes() {
  addStyles();
  rearrangeDidYouWorkQuestion();
  rearrangeAddressFieldset();
  updateCalendars();
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    #ContentPlaceHolder1_TabEmployment, #ContentPlaceHolder1_TabEmployment_body {
      background-color: #FBFCFD !important;
      padding: 0 !important;
    }
  `;
  document.head.appendChild(style);
}

function rearrangeDidYouWorkQuestion() {
  const divWorkedEmployer = document.getElementById('divWorkedEmployer');
  divWorkedEmployer.classList.add('bordered-set');
  const existingQuestion = document.querySelector('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_lblWrkEmployerName');
  const yesRadio = document.querySelector('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes');
  const yesLabel = document.querySelector('label[for="ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerYes"]');
  const noRadio = document.querySelector('#ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerNo');
  const noLabel = document.querySelector('label[for="ContentPlaceHolder1_TabEmployment_TabEmpDetails_rdBtnWorkedEmployerNo"]');

  const fieldset = document.createElement('fieldset');
  fieldset.className = 'usa-fieldset';

  const legend = document.createElement('legend');
  legend.className = 'usa-legend';
  legend.textContent = existingQuestion.textContent;

  fieldset.appendChild(legend);

  const yesContainer = document.createElement('div');
  yesContainer.className = 'usa-radio';
  yesRadio.classList.add('usa-radio__input');
  yesLabel.classList.add('usa-radio__label');
  yesContainer.appendChild(yesRadio);
  yesContainer.appendChild(yesLabel);

  const noContainer = document.createElement('div');
  noContainer.className = 'usa-radio';
  noRadio.classList.add('usa-radio__input');
  noLabel.classList.add('usa-radio__label');
  noLabel.style.marginBottom = '20px';
  noContainer.appendChild(noRadio);
  noContainer.appendChild(noLabel);

  fieldset.appendChild(yesContainer);
  fieldset.appendChild(noContainer);

  divWorkedEmployer.innerHTML = '';
  divWorkedEmployer.appendChild(fieldset);
}

function updateCalendars() {
  updateCalendarUI("Image2");
  updateCalendarUI("Image4");
}

function rearrangeAddressFieldset() {
  const addressFieldset = document.querySelector("#divEmp > fieldset");
  addressFieldset.id = 'address-fieldset';
  addressFieldset.classList.add('usa-fieldset', 'bordered-set');

  const addressLegend = document.querySelector("#divEmp > fieldset > legend");
  addressLegend.remove();
}
