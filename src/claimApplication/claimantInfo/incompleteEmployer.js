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

  const addressDetails = document.getElementById('ContentPlaceHolder1_TabEmployment_TabEmpDetails_lblEmpDet');

  const phoneLabel = document.createElement('label');
  phoneLabel.classList.add('usa-label');
  phoneLabel.textContent = i18next.t('contact.phone');
  phoneLabel.htmlFor = 'ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA';
  addressDetails.insertAdjacentElement('afterend', phoneLabel);
  phoneLabel.insertAdjacentHTML('afterbegin', `<span class="required-asterisk required-asterisk-inline">*</span>`);

  const phone1Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoA");
  phone1Input.classList.add('usa-input');
  phone1Input.style.marginRight = '2px';
  phone1Input.style.marginTop = '0';
  phone1Input.style.width = '50px';

  const phone2Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo1");
  phone2Input.classList.add('usa-input');
  phone2Input.style.marginLeft = '2px';
  phone2Input.style.marginRight = '2px';
  phone2Input.style.marginTop = '0';
  phone2Input.style.width = '50px';

  const phone3Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNo2");
  phone3Input.classList.add('usa-input');
  phone3Input.style.marginLeft = '2px';
  phone3Input.style.marginRight = '10px';
  phone3Input.style.marginTop = '0';
  phone3Input.style.width = '60px';

  const phone4Input = document.getElementById("ContentPlaceHolder1_TabEmployment_TabEmpDetails_txtEmpPhNoX");
  phone4Input.classList.add('usa-input');
  phone4Input.style.marginLeft = '2px';
  phone4Input.style.marginTop = '0';
  phone4Input.style.width = '70px';

  const phoneContainer = document.createElement('div');
  phoneContainer.style.display = 'flex';
  phoneContainer.style.alignItems = 'center';
  phoneContainer.style.marginTop = '0.5rem';
  phone1Input.insertAdjacentElement('beforebegin', phoneContainer);
  phoneContainer.append(phone1Input);
  phone1Input.insertAdjacentHTML('afterend', '-');
  phoneContainer.append(phone2Input);
  phone2Input.insertAdjacentHTML('afterend', '-');
  phoneContainer.append(phone3Input);
  phone3Input.insertAdjacentHTML('afterend', 'Ext.');
  phoneContainer.append(phone4Input);
  phoneContainer.nextSibling.remove();
  phoneContainer.nextSibling.remove();
  phoneContainer.nextSibling.remove();
  phoneLabel.insertAdjacentElement('afterend', phoneContainer);

  phoneContainer.nextElementSibling.remove();
}
