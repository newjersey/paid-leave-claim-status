import i18next from 'i18next';
import { ICON_BASE_URL } from "../../modules/shared.mjs";

export const certificationLabels = [
  { id: 'ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgYes', label: 'Yes, I agree' },
  { id: 'ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgNo', label: 'I do not agree' },
];

export const id = "certification";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_lblHeader',
  text: 'CLAIMANT CERTIFICATION',
};

export function changes() {
  addStyles();
  replaceBody();
  setupSubmitButton();
}

function setupSubmitButton() {
  const newSubmitButton = document.querySelector('#agreeAndSubmit');
  const agreeButton = document.querySelector('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgYes');
  const originalSubmitButton = document.querySelector('#ContentPlaceHolder1_ClaimantCertTab_TPCertification_btnConfirm');

  if (newSubmitButton && agreeButton && originalSubmitButton) {
    newSubmitButton.addEventListener('click', function (event) {
      event.preventDefault();
      agreeButton.click();
      originalSubmitButton.click();
    });
  }
}

function replaceBody() {
  const oldContainer = document.querySelector("#ContentPlaceHolder1_ClaimantCertTab");
  if (oldContainer) {
    oldContainer.style.display = 'none';

    const newMain = document.createElement('main');
    newMain.innerHTML = `
      <br><br>
      <div class="usa-alert usa-alert--info" id="reminderAlert">
        <div class="usa-alert__body">
          <p class="usa-alert__text">
            ${i18next.t('certification.alertText')}
          </p>
        </div>
      </div>
      <br><br>
      <p>${i18next.t('certification.certifyText')}</p>
      <br>
      <ul>
        <li>${i18next.t('certification.agreement1')}</li>
        <li>${i18next.t('certification.agreement2')}</li>
        <li>${i18next.t('certification.agreement3')}</li>
        <li>${i18next.t('certification.agreement4')}</li>
      </ul>
      <br>
      <button id="agreeAndSubmit" class="usa-button" type="button">${i18next.t('certification.agreeAndSubmit')}</button>
    `;
    oldContainer.parentNode.insertBefore(newMain, oldContainer);
  }
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    #pageTitle {
      display: none;
    }

    .usa-button {
      margin: 20px 20px 20px 0;
      min-height: 40px;
    }
    .usa-button--unstyled {
      padding: 0;
    }
    ul {
      line-height: 1.6em;
      padding: 0 20px;
    }
    #reminderAlert::before {
      content: url('${ICON_BASE_URL}/info.svg');
      background: none !important;
      -webkit-mask: none !important;
      mask: none !important;
      top: auto !important;
    }
  `;
  document.head.appendChild(style);
}
