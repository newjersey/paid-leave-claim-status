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
  setupCopyM01Button();
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
    #sampleLanguageBody {
      background-color: white;
      padding: 10px;
      margin: 10px 0;
    }
    .usa-accordion__button,
    .usa-accordion__button:focus,
    #sampleLanguageContainer {
      background-color: #E8F5FF;
    }
    .usa-accordion__button:hover {
      background-color: #bde3ff;
    }

    #sampleLanguageContainer {
      flex-direction: column;
      padding: 20px;
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
    .usa-button {
      min-height: 40px;
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
        <div class="usa-accordion">
          <h3 class="usa-accordion__heading">
            <button
              type="button"
              class="usa-accordion__button"
              aria-expanded="false"
              aria-controls="sampleLanguageContainer"
            >
              ${i18next.t('confirmation.m01.sample.title')}
            </button>
          </h3>
          <div id="sampleLanguageContainer" class="usa-accordion__content">
            <div id="sampleLanguageBody" class="usa-prose">
              ${i18next.t('confirmation.m01.sample.body', 
                {
                  provider_name: "Dr. Spaceman",
                  claim_id: "12345",
                  online_form_id: "78910",
                  est_deadline_date: "June 1, 2027",
                  user_dob: "January 1, 2000",
                  user_name: "Liz Lemon",
                  user_email: "liz@tgs.com",
                  user_phone: "(555) 555-5555"
                }
              )}
            </div>
            <button id="m01CopyButton" class="usa-button">
              ${i18next.t('confirmation.m01.sample.copyButton')}
            </button>
          </div>
        </div>
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

function setupCopyM01Button() {
  const copyButton = document.getElementById('m01CopyButton');
  const sampleLanguageBody = document.getElementById('sampleLanguageBody');

  if (copyButton && sampleLanguageBody) {
    copyButton.addEventListener('click', function(event) {
      event.preventDefault();
      const textToCopy = sampleLanguageBody.textContent.trim();

      navigator.clipboard.writeText(textToCopy).then(() => {
        copyButton.textContent = i18next.t('confirmation.m01.sample.copied');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }
}
