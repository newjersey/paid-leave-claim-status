import i18next from 'i18next';
import {
  clearTextNodes,
  formattedDateFromField,
  setNewTitle,
  styleRadioButton,
} from '../utils';
import { ICON_BASE_URL } from "../../modules/shared.mjs";

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
  moveAmountQuestion();
  moveReasonQuestion();
  moveSubmitButton();
  setNewTitle(i18next.t('paymentInfo.title'));
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    .usa-legend {
      max-width: fit-content;
    }

    .usa-alert__body {
      padding-top: 0;
    }

    .usa-label {
      margin-top: 0;
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

  const withholdHint = document.createElement('div');
  withholdHint.classList.add('usa-hint');
  withholdHint.textContent = i18next.t('paymentInfo.withholdTaxesHint');
  withholdFieldset.append(withholdHint);

  const radioButtonYes = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_rbtnDisYes');
  withholdFieldset.append(radioButtonYes);
  styleRadioButton(radioButtonYes.id);

  const radioButtonNo = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_rbtnDisNo');
  withholdFieldset.append(radioButtonNo);
  styleRadioButton(radioButtonNo.id);

  const withholdInfo = document.createElement('div');
  withholdInfo.id = 'withholdInfo';
  withholdInfo.classList.add("usa-alert", "usa-alert--info", "usa-alert--slim");
  withholdInfo.innerHTML = `
    <div class="usa-alert__body">
      <p class="usa-alert__text">
        ${i18next.t('paymentInfo.socSecAndMedicareWithheld')}
      </p>
    </div>
  `;
  withholdFieldset.append(withholdInfo);
}

function moveAmountQuestion() {
  const container = document.getElementById(CONTAINER_ID);

  const divTax = document.getElementById('divTax');
  divTax.classList.add('bordered-set');
  container.append(divTax);

  clearTextNodes(divTax);

  const amountLabel = document.createElement('label');
  amountLabel.classList.add('usa-label');
  amountLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_txtWeeklyAmt';
  amountLabel.textContent = i18next.t('paymentInfo.withholdAmount')
  divTax.append(amountLabel);

  const amountHint = document.createElement('div');
  amountHint.textContent = i18next.t('paymentInfo.withholdAmountHint');
  amountHint.classList.add('usa-hint');
  amountHint.style.whiteSpace = 'pre-line';
  divTax.append(amountHint);

  const amountInputContainer = document.createElement('div');
  amountInputContainer.style.display = 'flex';
  amountInputContainer.style.alignItems = 'center';
  amountInputContainer.style.marginTop = '0.5rem';
  divTax.append(amountInputContainer);

  const amountInput = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_txtWeeklyAmt');
  amountInput.classList.add('usa-input');
  amountInput.style.width = '100px';
  amountInput.style.marginTop = '0';
  amountInputContainer.append(amountInput);

  const currencyIcon = document.createElement('img');
  currencyIcon.src = `${ICON_BASE_URL}/attach_money.svg`;
  amountInputContainer.append(currencyIcon);
}

function moveReasonQuestion() {
  const container = document.getElementById(CONTAINER_ID);

  const divReason = document.getElementById('divReason');
  divReason.classList.add('bordered-set');
  container.append(divReason);

  clearTextNodes(divReason);
  const characterCounter = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_text_num_lpayreason');
  characterCounter.style.display = 'none';

  const reasonLabel = document.createElement('label');
  reasonLabel.classList.add('usa-label');
  reasonLabel.textContent = i18next.t('paymentInfo.lateReason', {
    firstDayOfDisability: formattedDateFromField('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt')
  });
  reasonLabel.htmlFor = 'ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_lpayReason';
  divReason.append(reasonLabel);

  const reasonTextarea = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_lpayReason');
  reasonTextarea.classList.add('usa-textarea');
  reasonTextarea.style.width = '100%';
  divReason.append(reasonTextarea);

  const reasonHint = document.createElement('div');
  reasonHint.classList.add('usa-hint');
  reasonHint.textContent = i18next.t('paymentInfo.reasonHint');
  divReason.append(reasonHint);
}

function moveSubmitButton() {
  const container = document.getElementById(CONTAINER_ID);

  const submitButton = document.getElementById('ContentPlaceHolder1_ClaimantDisabilityTab_tbpnlLatePayment_btnNextVer');
  submitButton.style.display = 'block';
  submitButton.style.marginTop = '20px';
  submitButton.style.marginLeft = 'auto';
  submitButton.style.marginRight = 'auto';
  container.append(submitButton);
}
