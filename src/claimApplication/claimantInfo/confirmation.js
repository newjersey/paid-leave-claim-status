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
  setupExpandM01Button();
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
    .due-date {
      background-color: #FEE685;
      color: #936F38;
      font-size: 14px;
      font-weight: bold;
      padding: 3px 5px;
      position: absolute;
      right: 10px;
      top: 10px;
    }
    #expandM01 {
      align-self: flex-end;
      background-color: white;
      border: 0;
      padding: 10px;
    }
    section {
      background-color: #FBFCFD;
      border: 0.5px solid #C6CACE;
      display: flex;
      flex-direction: column;
      padding: 20px;
      position: relative;
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
      section {
        padding: 50px 10px 10px;
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
        <div class="due-date">${i18next.t('confirmation.m01.dueDate')}</div>
        <h2>${i18next.t('confirmation.m01.title')}</h2>
        <p>${i18next.t('confirmation.m01.directions')}</p>
        <button id="expandM01">
          <img
            src="${ICON_BASE_URL}/expand_more.svg"
            alt="Expand more"
          />
        </button>
        <p id="sampleLanguage" style="display: none;">${i18next.t('certification.agreement4')}</p>
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

function setupExpandM01Button() {
  const expandButton = document.getElementById('expandM01');
  const sampleLanguage = document.querySelector('#sampleLanguage');
  const icon = expandButton.querySelector('img');

  expandButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (sampleLanguage.style.display === 'none') {
      sampleLanguage.style.display = 'block';
      icon.src = `${ICON_BASE_URL}/expand_less.svg`;
      icon.alt = 'Expand less';
    } else {
      sampleLanguage.style.display = 'none';
      icon.src = `${ICON_BASE_URL}/expand_more.svg`;
      icon.alt = 'Expand more';
    }
  });
}
