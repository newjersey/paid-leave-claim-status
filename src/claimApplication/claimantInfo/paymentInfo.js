import i18next from 'i18next';
import {
  setNewTitle,
  styleRadioButton,
} from '../utils';

export const id = "paymentInfo";

const CONTAINER_ID = 'ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment';

export const identifyingContent = {
  id,
  elementId: CONTAINER_ID,
  text: 'Do you want to have federal income',
};

export function changes() {
  addStyles();
  hideExistingDiv();
  moveErrorMessage();
  moveWithholdQuestion();
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

function hideExistingDiv() {
  const radioButton = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_rbtnDisYes');
  const container = radioButton.closest('div').parentElement;
  container.style.display = 'none';
}

// does error appearance track in analytics??
function moveErrorMessage() {
  const container = document.getElementById(CONTAINER_ID);
  const errorMessage = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_lblLatePayerr');
  container.append(errorMessage);
}

function moveWithholdQuestion() {
  const container = document.getElementById(CONTAINER_ID);

  const withholdContainer = document.createElement('div');
  withholdContainer.classList.add('bordered-set');
  container.append(withholdContainer);

  const withholdFieldset = document.createElement('fieldset');
  withholdFieldset.classList.add('usa-fieldset');
  withholdContainer.append(withholdFieldset);

  const withholdLabel = document.createElement('legend');
  withholdLabel.classList.add('usa-legend');
  withholdLabel.textContent = i18next.t('paymentInfo.withholdTaxes');
  withholdFieldset.append(withholdLabel);

  const radioButtonYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_rbtnDisYes');
  withholdFieldset.append(radioButtonYes);
  styleRadioButton(radioButtonYes.id);

  const radioButtonNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_rbtnDisNo');
  withholdFieldset.append(radioButtonNo);
  styleRadioButton(radioButtonNo.id);
}
