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
  setupLogoutButton();
  document.addEventListener('headerReady', setNewTitle);
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

function setupLogoutButton() {
  const logoutButton = document.querySelector('#saveAndLogout');
  if (logoutButton) {
    logoutButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (confirmLogout()) {
        __doPostBack('ctl00$header$lbtnLogout', '');
      }
    });
  }
}

function replaceBody() {
  const oldContainer = document.querySelector("#ContentPlaceHolder1_ClaimantCertTab");
  if (oldContainer) {
    oldContainer.style.display = 'none';

    const newMain = document.createElement('main');
    newMain.innerHTML = `
      <p>${i18next.t('certification.certifyText')}</p>
      <ul>
        <li>${i18next.t('certification.agreement1')}</li>
        <li>${i18next.t('certification.agreement2')}</li>
        <li>${i18next.t('certification.agreement3')}</li>
        <li>${i18next.t('certification.agreement4')}</li>
      </ul>
      <div class="usa-alert usa-alert--info" id="reminderAlert">
        <div class="usa-alert__body">
          <p class="usa-alert__heading" style="font-size: 16px;font-weight: bold;">${i18next.t('certification.beforeSubmit')}</p>
          <p class="usa-alert__text">
            ${i18next.t('certification.alertText')}
          </p>
        </div>
      </div>
      <button id="agreeAndSubmit" class="usa-button" type="button">${i18next.t('certification.agreeAndSubmit')}</button>
    `;
    oldContainer.parentNode.insertBefore(newMain, oldContainer);
  }
}

function setNewTitle() {
  const title = document.querySelector("#pageTitle");
  if (title) {
    title.textContent = `${i18next.t('certification.title')}`;
    document.removeEventListener('headerReady', setNewTitle);
  }
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
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
