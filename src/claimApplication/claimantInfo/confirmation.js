import i18next from 'i18next';
import { ICON_BASE_URL, logEvent } from "../../modules/shared.mjs";
import {
  LOCAL_STORAGE_KEY_PROVIDER_NAME,
  LOCAL_STORAGE_KEY_USER_DOB,
  LOCAL_STORAGE_KEY_USER_NAME,
  LOCAL_STORAGE_KEY_USER_EMAIL,
  LOCAL_STORAGE_KEY_USER_PHONE,
} from "../utils";

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
  setupC01AwardDownloadButton();
  setupW01DownloadButton();
  setupV01DownloadButton();
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
      color: #5C410A;
      font-size: 14px;
      font-weight: bold;
      padding: 3px 5px;
      position: absolute;
      right: 10px;
      top: 10px;
    }
    #m01CopyButton {
      width: 100%;
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
      padding: 10px;
    }

    section {
      background-color: #FBFCFD;
      border: 0.5px solid #C6CACE;
      display: flex;
      flex-direction: column;
      padding: 10px;
      position: relative;
    }

    .dueAction {
      padding: 50px 10px 10px;
    }
    
    #moreInfo {
      margin-top: 20px;
    }

    section h2, #moreInfo h2, #moreInfo h3 {
      color: black;
      font-size: 18px;
      font-variant: normal;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .usa-button {
      min-height: 40px;
    }
    .usa-button .usa-icon {
      margin-right: 5px;
      vertical-align: middle;
    }
    .usa-prose {
      word-wrap: break-word;
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
      ${m01()}
      ${noEmp()}
      ${c01Award()}
      ${w01()}
      ${c01Card()}
      ${v01()}
      ${moreInfo()}
    `;
    oldContainer.parentNode.insertBefore(newMain, oldContainer);
  }
}

function moreInfo() {
  const moreInfoDiv = document.createElement('div');
  moreInfoDiv.id = "moreInfo";
  moreInfoDiv.innerHTML = `
    <h2>${i18next.t('confirmation.moreInfo.title')}</h2>
    <section>
      <h3>${i18next.t('confirmation.moreInfo.mail.title')}</h3>
      <p>${i18next.t('confirmation.moreInfo.mail.current_address')}</p>
      ${"Liz Lemon"}
      <br>
      ${"12345 Main Street"}
      <br>
      ${"Apartment 207"}
      <br>
      ${"Trenton, NJ 08601"}
      <div class="usa-alert usa-alert--warning usa-alert--slim usa-alert--no-icon">
        <div class="usa-alert__body">
          <p class="usa-alert__text">
            ${i18next.t('confirmation.moreInfo.mail.change_address')}
          </p>
        </div>
      </div>
    </section>
    <section>
      <h3>${i18next.t('confirmation.moreInfo.next.title')}</h3>
      <p>${i18next.t('confirmation.moreInfo.next.read_doc')}</p>
      <p>${i18next.t('confirmation.moreInfo.next.check_status')}</p>
    </section>
  `;
  return moreInfoDiv.outerHTML;
}

function m01() {
  const m01Section = document.createElement('section');
  m01Section.id = "m01section";
  m01Section.classList.add("dueAction");
  m01Section.innerHTML = `
    <div class="due-date">
      ${i18next.t(
        'confirmation.dueDate',
        { est_deadline_date: estDeadlineDate() }
      )}
    </div>
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
          ${m01SampleText()}
        </div>
        <button id="m01CopyButton" class="usa-button">
          ${i18next.t('confirmation.m01.sample.copyButton')}
        </button>
      </div>
    </div>
  `;
  return m01Section.outerHTML;
}

function noEmp() {
  const oldNoEmp = document.getElementById('DivNoEmps');
  if (oldNoEmp && oldNoEmp.style.display != 'none') {
    const noEmp = document.createElement('p');
    noEmp.textContent = "There are no employers that you worked for in the 180 days prior to your first day of disability.";
    return noEmp.outerHTML;
  }
  return '';
}

function downloadIcon() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svgElement = document.createElementNS(svgNS, 'svg');
  svgElement.setAttribute('class', 'usa-icon');
  svgElement.setAttribute('aria-hidden', 'true');
  svgElement.setAttribute('focusable', 'false');
  svgElement.setAttribute('role', 'img');
  svgElement.setAttribute('viewBox', '0 0 24 24');

  const path1 = document.createElementNS(svgNS, 'path');
  path1.setAttribute('d', 'M0 0h24v24H0z');
  path1.setAttribute('fill', 'none');

  const path2 = document.createElementNS(svgNS, 'path');
  path2.setAttribute('d', 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z');

  svgElement.appendChild(path1);
  svgElement.appendChild(path2);

  return svgElement.outerHTML;
}

function c01Award() {
  const oldC01Award = document.getElementById('divC01Award');
  if (oldC01Award && oldC01Award.style.display != 'none') {
    const c01Award = document.createElement('section');
    c01Award.id = "c01AwardSection";
    c01Award.classList.add("dueAction");
    c01Award.innerHTML = `
      <div class="due-date">
        ${i18next.t(
          'confirmation.dueDate',
          { est_deadline_date: estDeadlineDate() }
        )}
      </div>
      <h2>${i18next.t('confirmation.c01Award.title')}</h2>
      <button id="downloadC01Award" class="usa-button usa-button--outline">
        ${downloadIcon()}
        ${i18next.t('confirmation.c01Award.download_button')}
      </button>
      <p>${i18next.t('confirmation.form_directions', { claim_id: claimId() })}</p>
    `;
    return c01Award.outerHTML;
  }
  return '';
}

function setupC01AwardDownloadButton() {
  const oldDownloadBtn = document.querySelector('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lnkbtnClickC01Award');
  const newDownloadBtn = document.querySelector('#downloadC01Award');
  if (oldDownloadBtn && newDownloadBtn) {
    newDownloadBtn.addEventListener('click', function (event) {
      event.preventDefault();
      oldDownloadBtn.click();
    });
  }
}

function w01() {
  const oldW01 = document.getElementById('divW01');
  if (oldW01 && oldW01.style.display != 'none') {
    const w01 = document.createElement('section');
    w01.id = "w01Section";
    w01.classList.add("dueAction");
    w01.innerHTML = `
      <div class="due-date">
        ${i18next.t(
          'confirmation.dueDate',
          { est_deadline_date: estDeadlineDate() }
        )}
      </div>
      <h2>${i18next.t('confirmation.w01.title')}</h2>
      <button id="downloadW01" class="usa-button usa-button--outline">
        ${downloadIcon()}
        ${i18next.t('confirmation.w01.download_button')}
      </button>
      <p>${i18next.t('confirmation.form_directions', { claim_id: claimId() })}</p>
    `;
    return w01.outerHTML;
  }
  return '';
}

function setupW01DownloadButton() {
  const oldDownloadBtn = document.querySelector('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lnkbtnClickW01');
  const newDownloadBtn = document.querySelector('#downloadW01');
  if (oldDownloadBtn && newDownloadBtn) {
    newDownloadBtn.addEventListener('click', function (event) {
      event.preventDefault();
      oldDownloadBtn.click();
    });
  }
}

function c01Card() {
  const oldC01Card = document.getElementById('divC01Card');
  if (oldC01Card && oldC01Card.style.display != 'none') {
    const c01Award = document.createElement('p');
    c01Award.textContent = "C01 Card info";
    return c01Award.outerHTML;
  }
  return '';
}

function v01() {
  const oldV01 = document.getElementById('divV01');
  if (oldV01 && oldV01.style.display != 'none') {
    const v01 = document.createElement('section');
    v01.id = "v01Section";
    v01.classList.add("dueAction");
    v01.innerHTML = `
      <div class="due-date">
        ${i18next.t(
          'confirmation.dueDate',
          { est_deadline_date: estDeadlineDate() }
        )}
      </div>
      <h2>${i18next.t('confirmation.v01.title')}</h2>
      <button id="downloadV01" class="usa-button usa-button--outline">
        ${downloadIcon()}
        ${i18next.t('confirmation.v01.download_button')}
      </button>
      <p>${i18next.t('confirmation.form_directions', { claim_id: claimId() })}</p>
    `;
    return v01.outerHTML;
  }
  return '';
}

function setupV01DownloadButton() {
  const oldDownloadBtn = document.querySelector('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lnkbtnClickV01');
  const newDownloadBtn = document.querySelector('#downloadV01');
  if (oldDownloadBtn && newDownloadBtn) {
    newDownloadBtn.addEventListener('click', function (event) {
      event.preventDefault();
      oldDownloadBtn.click();
    });
  }
}

function claimId() {
  const spanElement = document.getElementById('ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lblClaimId');
  if (spanElement) {
    return spanElement.textContent.trim();
  } else {
    console.error('claim id not found.');
  }
}

function estDeadlineDate() {
  const currentDate = new Date();
  const deadlineDate = new Date(currentDate);
  
  deadlineDate.setDate(currentDate.getDate() + 14);

  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return deadlineDate.toLocaleDateString('en-US', options);
}

function m01formId() {
  const spanElement = document.getElementById('ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lblmedicalFormId');
  
  if (spanElement) {
    const textContent = spanElement.textContent;
    const match = textContent.match(/\d+/);
    
    if (match) {
      return match[0];
    } else {
      console.error('No m01 form number found.');
    }
  } else {
    console.error('No m01 form number found.');
  }
}

function m01SampleText() {
  const provider_name = 
    localStorage.getItem(LOCAL_STORAGE_KEY_PROVIDER_NAME) ||
    i18next.t('confirmation.m01.sample.empty.provider_name');

  const user_dob = 
    localStorage.getItem(LOCAL_STORAGE_KEY_USER_DOB) ||
    i18next.t('confirmation.m01.sample.empty.user_dob');

  const user_name = 
    localStorage.getItem(LOCAL_STORAGE_KEY_USER_NAME) ||
    i18next.t('confirmation.m01.sample.empty.user_name');

  const user_email = 
    localStorage.getItem(LOCAL_STORAGE_KEY_USER_EMAIL) ||
    i18next.t('confirmation.m01.sample.empty.user_email');

  const user_phone = 
    localStorage.getItem(LOCAL_STORAGE_KEY_USER_PHONE) ||
    i18next.t('confirmation.m01.sample.empty.user_phone');
  
  return i18next.t('confirmation.m01.sample.body', 
    {
      provider_name,
      claim_id: claimId(),
      online_form_id: m01formId(),
      est_deadline_date: estDeadlineDate(),
      user_dob,
      user_name,
      user_email,
      user_phone
    }
  );
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
