import i18next from 'i18next';
import { ICON_BASE_URL, logEvent } from "../../modules/shared.mjs";

export const confirmationAltTexts = [
  { id: 'ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_imgbtnM01', alt: 'Submit Query' },
];

export const id = "confirmation";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_lblHeader',
  text: 'CLAIMANT CONFIRMATION',
};

export function trackPrintClaimSummaryButton() {
  const printClaimSummaryButton = document.getElementById('ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_btnContinue');
  if (printClaimSummaryButton) {
    printClaimSummaryButton.addEventListener('click', function() {
      logEvent('Print Claim Summary Button Clicked', {});
    });
  }
}

export function changes() {
  addStyles();
  replaceBody();
  setupApplicationPdfDownloadLink();
  document.addEventListener('headerReady', setNewTitle);
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    .aligned-icon {
      position: relative;
      top: -1px;
      vertical-align: middle;
    }
    section {
      background-color: #FBFCFD;
      border: 0.5px solid #C6CACE;
      padding: 10px;
    }
    section h2 {
      color: black;
      font-size: 18px;
      font-variant: normal;
      font-weight: bold;
      margin-bottom: 5px;
    }
    @media (max-width: 767px) {
      .aligned-icon {
        position: static;
        vertical-align: text-top;
      }
    }
  `;
  document.head.appendChild(style);
}

function replaceBody() {
  const oldContainer = document.querySelector("#ContentPlaceHolder1_ClaimantCertTab");
  if (oldContainer) {
    oldContainer.style.display = 'none';

    const newMain = document.createElement('main');
    newMain.innerHTML = `
      <p>
        <img
          src="${ICON_BASE_URL}/check_circle.svg"
          alt="${i18next.t('confirmation.checkmark')}"
          class="aligned-icon"
        />
        ${i18next.t('confirmation.submitted')}
      </p>
      <section id="m01section">
        <h2>${i18next.t('confirmation.m01.title')}</h2>
        <p>${i18next.t('confirmation.m01.directions')}</p>
      </section>
    `;
    oldContainer.parentNode.insertBefore(newMain, oldContainer);
  }
}

function setNewTitle() {
  const title = document.querySelector("#pageTitle");
  if (title) {
    title.textContent = `${i18next.t('confirmation.title')}`;
    document.removeEventListener('headerReady', setNewTitle);
  }
}

function setupApplicationPdfDownloadLink() {
  const downloadLink = document.getElementById('applicationPdfDownload');
  if (downloadLink) {
    downloadLink.addEventListener('click', function(event) {
      event.preventDefault();
      const pdfDownloadBtn = document.getElementById('ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_btnContinue');
      if (pdfDownloadBtn) {
        pdfDownloadBtn.click();
      }
    });
  }
}
