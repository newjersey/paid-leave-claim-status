import i18next from 'i18next';
import { setNewTitle } from '../utils';

export const id = "paymentInfo";

export const identifyingContent = {
  id,
  pathname: '/tdi_iam/ClaimantDisabililty.aspx',
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment',
  text: 'Do you want to have federal income',
};

export function changes() {
  addStyles();
  rearrangeTable();
  updateRadioButtons();
  setNewTitle(i18next.t('paymentInfo.title'));
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    .usa-legend {
      max-width: fit-content;
    }
  `;
  document.head.appendChild(style);
}

function rearrangeTable() {
  const divReason = document.getElementById("divReason");

  if (divReason) {
    const table = divReason.querySelector("table");
    const rows = table.querySelectorAll("tr");

    const cells = rows[0].querySelectorAll("td");

    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = cells[0].innerHTML;

    const textAreaDiv = document.createElement("div");
    textAreaDiv.innerHTML = cells[1].innerHTML;
    textAreaDiv.style.marginTop = '20px';

    divReason.innerHTML = "";
    divReason.appendChild(questionDiv);
    divReason.appendChild(textAreaDiv);
  }
}

function updateRadioButtons() {
  const radioButton = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_rbtnDisYes');
  const container = radioButton ? radioButton.closest('div') : null;

  if (container) {
    const questionText = "Do you want to have federal income tax withheld from your temporary disability benefits?";

    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('usa-fieldset');

    const legend = document.createElement('legend');
    legend.classList.add('usa-legend');
    legend.textContent = questionText;
    fieldset.appendChild(legend);

    const radioButtonIds = [
      'ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_rbtnDisYes',
      'ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_rbtnDisNo'
    ];

    radioButtonIds.forEach(id => {
      const radioButton = document.getElementById(id);
      const label = document.querySelector(`label[for="${id}"]`);

      if (radioButton && label) {
        const radioDiv = document.createElement('div');
        radioDiv.classList.add('usa-radio');

        radioButton.classList.add('usa-radio__input');
        label.classList.add('usa-radio__label');
        label.style.textAlign = 'left';

        radioDiv.appendChild(radioButton.cloneNode(true));
        radioDiv.appendChild(label.cloneNode(true));

        fieldset.appendChild(radioDiv);

        radioButton.remove();
        label.remove();
      }
    });

    container.innerHTML = '';
    container.appendChild(fieldset);
  }
}
