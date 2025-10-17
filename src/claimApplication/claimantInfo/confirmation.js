import i18next from 'i18next';
import { logEvent } from "../../modules/shared.mjs";
import {
  getSessionData,
  STORAGE_KEY_PROVIDER_NAME,
  STORAGE_KEY_USER_DOB,
  STORAGE_KEY_USER_NAME,
  STORAGE_KEY_USER_EMAIL,
  STORAGE_KEY_USER_PHONE,
  STORAGE_KEY_USER_MAIL_ADDRESS,
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
  setupCopyM01Button();
  setupM01InstructionsButton();
  setupC01AwardDownloadButton();
  setupC01CardDownloadButton();
  setupW01DownloadButton();
  setupV01DownloadButton();
  document.addEventListener('headerReady', setNewTitleAndAlert);
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
      margin-bottom: 15px;
      padding: 3px 5px;
      width: fit-content;
    }

    #m01CopyButton {
      background-color: white;
      width: 100%;
    }

    #m01CopyButton svg {
      margin-bottom: 1px;
    }

    #sampleLanguageBody {
      background-color: white;
      padding: 10px;
      margin: 10px 0;
    }

    #sampleLanguageContainer {
      background-color: #f0f0f0;
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
    }

    .confirmationInfo {
      margin: 50px 0;
    }

    .icon {
      margin-right: 10px;
    }

    .iconGroup {
      display: flex;
      align-items: flex-start;
    }

    .moreInfoDiv {
      margin: 10px 0 50px;
    }
    
    #moreInfo {
      margin-top: 50px;
    }

    section h2, #moreInfo h2 {
      color: black;
      font-variant: normal;
      font-weight: bold;
      margin-bottom: 5px;
    }

    section h2 {
      font-size: 18px;
    }

    #moreInfo h2 {
      font-size: 24px;
    }

    .usa-button {
      margin: 5px 0;
      max-width: 400px;
      min-height: 40px;
      padding: 10px;
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

let requiredActionsIndex = 0;

function replaceBody() {
  const oldContainer = document.querySelector("#ContentPlaceHolder1_ClaimantCertTab");
  if (oldContainer) {
    oldContainer.style.display = 'none';
    const newMain = document.createElement('main');
    newMain.innerHTML = `
      ${m01()}
      ${noEmp()}
      ${c01Award()}
      ${c01Card()}
      ${w01()}
      ${v01()}
      ${moreInfo()}
    `;

    const tasksParagraph = document.createElement('p');
    tasksParagraph.textContent = i18next.t('confirmation.tasks', { count: requiredActionsIndex });
    newMain.insertBefore(tasksParagraph, newMain.firstChild);

    oldContainer.parentNode.insertBefore(newMain, oldContainer);
  }
}

function addressBox() {
  const sessionData = getSessionData();
  const claimantName = sessionData[STORAGE_KEY_USER_NAME];
  const claimantAddress = sessionData[STORAGE_KEY_USER_MAIL_ADDRESS];

  if (!claimantName || !claimantAddress) {
    return '';
  }

  const claimantAddressLine1 = claimantAddress['line1'];
  const claimantAddressLine2 = claimantAddress['line2'];

  const addressDiv = document.createElement('div');
  addressDiv.classList.add("moreInfoDiv");
  addressDiv.innerHTML = `
    <br>
    <div class="iconGroup">
      ${mailIcon()}
      <div>
        <p>${i18next.t('confirmation.moreInfo.mail.title')}</p>
        <br>
        <strong>${claimantName}</strong>
        <br>
        <strong>${claimantAddressLine1}</strong>
        <br>
        <strong>${claimantAddressLine2}</strong>
      </div>
    </div>
    <br><br>
    <div class="iconGroup">
      ${editIcon()}
      <div>
        ${i18next.t('confirmation.moreInfo.mail.change_address')}
      </div>
    </div>
  `;

  return addressDiv.outerHTML;
}

function moreInfo() {
  const moreInfoDiv = document.createElement('div');
  moreInfoDiv.id = "moreInfo";
  moreInfoDiv.innerHTML = `
    <h2>${i18next.t('confirmation.moreInfo.title')}</h2>
    ${addressBox()}
    <div class="moreInfoDiv">
      <strong>${i18next.t('confirmation.moreInfo.next.title')}</strong>
      <br><br>
      <ul>
        <li>${i18next.t('confirmation.moreInfo.next.read_doc')}</li>
        <br>
        <li>${i18next.t('confirmation.moreInfo.next.check_status')}</li>
      </ul>
    </div>
  `;
  return moreInfoDiv.outerHTML;
}

function m01() {
  requiredActionsIndex += 1;
  const m01Section = document.createElement('section');
  m01Section.id = "m01section";
  m01Section.classList.add("confirmationInfo");
  m01Section.innerHTML = `
    <div class="due-date">
      ${i18next.t(
        'confirmation.dueDate',
        { est_deadline_date: estDeadlineDate() }
      )}
    </div>
    <h2>${i18next.t('confirmation.m01.title', { requiredActionsIndex })}</h2>
    <br>
    <p>${i18next.t('confirmation.m01.directions')}</p>
    <br>
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
        <button id="m01CopyButton" class="usa-button usa-button--outline">
          ${contentCopyIcon()}
          ${i18next.t('confirmation.m01.sample.copyButton')}
        </button>
      </div>
      <br>
      <p>${i18next.t('confirmation.m01.alternative.instructions')}</p>
      <button id="downloadm01InstructionsButton" class="usa-button usa-button--outline">
        ${downloadIcon()}
        ${i18next.t('confirmation.m01.alternative.buttonText')}
      </button>
    </div>
  `;
  return m01Section.outerHTML;
}

function setupM01InstructionsButton() {
  const downloadLink = document.getElementById('downloadM01InstructionsButton');
  if (downloadLink) {
    downloadLink.addEventListener('click', function(event) {
      event.preventDefault();
      logEvent('TDI Confirmation - Download M01 Instructions Clicked', {});
      const pdfDownloadBtn = document.getElementById('ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lnkbtnClickM01');
      if (pdfDownloadBtn) {
        pdfDownloadBtn.click();
      }
    });
  }
}

function noEmp() {
  const oldNoEmp = document.getElementById('DivNoEmps');
  if (oldNoEmp && oldNoEmp.style.display != 'none') {
    logEvent('TDI Confirmation - No Emp Shown', {});
    const noEmp = document.createElement('p');
    noEmp.textContent = "There are no employers that you worked for in the 180 days prior to your first day of disability.";
    return noEmp.outerHTML;
  }
  return '';
}

function contentCopyIcon() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svgElement = document.createElementNS(svgNS, 'svg');
  svgElement.setAttribute('class', 'usa-icon');
  svgElement.setAttribute('aria-hidden', 'true');
  svgElement.setAttribute('width', '24');
  svgElement.setAttribute('height', '24');
  svgElement.setAttribute('viewBox', '0 0 24 24');

  const path1 = document.createElementNS(svgNS, 'path');
  path1.setAttribute('d', 'M0 0h24v24H0z');
  path1.setAttribute('fill', 'none');

  const path2 = document.createElementNS(svgNS, 'path');
  path2.setAttribute('d', 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z');

  svgElement.appendChild(path1);
  svgElement.appendChild(path2);

  return svgElement.outerHTML;
}

function editIcon() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svgElement = document.createElementNS(svgNS, 'svg');
  svgElement.classList.add("edit-icon", "icon");
  svgElement.setAttribute('aria-hidden', 'true');
  svgElement.setAttribute('width', '24');
  svgElement.setAttribute('height', '24');
  svgElement.setAttribute('viewBox', '0 0 24 24');

  const path1 = document.createElementNS(svgNS, 'path');
  path1.setAttribute('d', 'M0 0h24v24H0z');
  path1.setAttribute('fill', 'none');

  const path2 = document.createElementNS(svgNS, 'path');
  path2.setAttribute('d', 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z');

  svgElement.appendChild(path1);
  svgElement.appendChild(path2);

  return svgElement.outerHTML;
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

function mailIcon() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svgElement = document.createElementNS(svgNS, 'svg');
  svgElement.classList.add("mail-icon", "icon");
  svgElement.setAttribute('aria-hidden', 'true');
  svgElement.setAttribute('width', '24');
  svgElement.setAttribute('height', '24');
  svgElement.setAttribute('viewBox', '0 0 24 24');

  const path1 = document.createElementNS(svgNS, 'path');
  path1.setAttribute('d', 'M0 0h24v24H0z');
  path1.setAttribute('fill', 'none');

  const path2 = document.createElementNS(svgNS, 'path');
  path2.setAttribute('d', 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z');

  svgElement.appendChild(path1);
  svgElement.appendChild(path2);

  return svgElement.outerHTML;
}

function c01Award() {
  const oldC01Award = document.getElementById('divC01Award');
  if (oldC01Award && oldC01Award.style.display != 'none') {
    logEvent('TDI Confirmation - C01 Award Shown', {});
    requiredActionsIndex += 1;
    const c01Award = document.createElement('section');
    c01Award.id = "c01AwardSection";
    c01Award.classList.add("confirmationInfo");
    c01Award.innerHTML = `
      <div class="due-date">
        ${i18next.t(
          'confirmation.dueDate',
          { est_deadline_date: estDeadlineDate() }
        )}
      </div>
      <h2>${i18next.t('confirmation.c01Award.title', { requiredActionsIndex })}</h2>
      <br>
      <button id="downloadC01Award" class="usa-button usa-button--outline">
        ${downloadIcon()}
        ${i18next.t('confirmation.c01Award.download_button')}
      </button>
      ${formDirections(true)}
    `;
    return c01Award.outerHTML;
  }
  return '';
}

function c01Card() {
  const oldC01Card = document.getElementById('divC01Card');  
  if (oldC01Card && oldC01Card.style.display != 'none') {
    logEvent('TDI Confirmation - C01 Card Shown', {});
    requiredActionsIndex += 1;
    const c01Card = document.createElement('section');
    c01Card.id = "c01CardSection";
    c01Card.classList.add("confirmationInfo");
    c01Card.innerHTML = `
      <div class="due-date">
        ${i18next.t(
          'confirmation.dueDate',
          { est_deadline_date: estDeadlineDate() }
        )}
      </div>
      <h2>${i18next.t('confirmation.c01.title', { requiredActionsIndex })}</h2>
      <br>
      <button id="downloadC01Card" class="usa-button usa-button--outline">
        ${downloadIcon()}
        ${i18next.t('confirmation.c01.download_button')}
      </button>
      ${formDirections()}
    `;
    return c01Card.outerHTML;
  }
  return '';
}

function formDirections(includeSocSecLetter = false) {
  const directions = document.createElement('ul');
  directions.classList.add("usa-list");
  let listItems = `<li>${i18next.t('confirmation.form_directions.complete')}</li>`;

  if (includeSocSecLetter) {
    listItems += `<li>${i18next.t('confirmation.form_directions.copySocSecLetter')}</li>`;
  }

  listItems += `
    <li>${i18next.t('confirmation.form_directions.claim_number', { claim_id: claimId() })}</li>
    <li>${i18next.t('confirmation.form_directions.submit')}</li>
  `;

  directions.innerHTML = listItems;
  return directions.outerHTML;
}

function setupC01AwardDownloadButton() {
  const oldDownloadBtn = document.querySelector('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lnkbtnClickC01Award');
  const newDownloadBtn = document.querySelector('#downloadC01Award');
  if (oldDownloadBtn && newDownloadBtn) {
    newDownloadBtn.addEventListener('click', function (event) {
      event.preventDefault();
      logEvent('TDI Confirmation - Download C01 Award Clicked', {});
      oldDownloadBtn.click();
    });
  }
}

function setupC01CardDownloadButton() {
  const oldDownloadBtn = document.querySelector('#ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_lnkbtnClickC01Card');
  const newDownloadBtn = document.querySelector('#downloadC01Card');
  if (oldDownloadBtn && newDownloadBtn) {
    newDownloadBtn.addEventListener('click', function (event) {
      event.preventDefault();
      logEvent('TDI Confirmation - Download C01 Card Clicked', {});
      oldDownloadBtn.click();
    });
  }
}

function w01() {
  const oldW01 = document.getElementById('divW01');
  if (oldW01 && oldW01.style.display != 'none') {
    logEvent('TDI Confirmation - W01 Shown', {});
    requiredActionsIndex += 1;
    const w01 = document.createElement('section');
    w01.id = "w01Section";
    w01.classList.add("confirmationInfo");
    w01.innerHTML = `
      <div class="due-date">
        ${i18next.t(
          'confirmation.dueDate',
          { est_deadline_date: estDeadlineDate() }
        )}
      </div>
      <h2>${i18next.t('confirmation.w01.title', { requiredActionsIndex })}</h2>
      <br>
      <button id="downloadW01" class="usa-button usa-button--outline">
        ${downloadIcon()}
        ${i18next.t('confirmation.w01.download_button')}
      </button>
      ${formDirections()}
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
      logEvent('TDI Confirmation - Download W01 Clicked', {});
      oldDownloadBtn.click();
    });
  }
}

function v01() {
  const oldV01 = document.getElementById('divV01');
  if (oldV01 && oldV01.style.display != 'none') {
    logEvent('TDI Confirmation - V01 Shown', {});
    requiredActionsIndex += 1;
    const v01 = document.createElement('section');
    v01.id = "v01Section";
    v01.classList.add("confirmationInfo");
    v01.innerHTML = `
      <div class="due-date">
        ${i18next.t(
          'confirmation.dueDate',
          { est_deadline_date: estDeadlineDate() }
        )}
      </div>
      <h2>${i18next.t('confirmation.v01.title', { requiredActionsIndex })}</h2>
      <br>
      <button id="downloadV01" class="usa-button usa-button--outline">
        ${downloadIcon()}
        ${i18next.t('confirmation.v01.download_button')}
      </button>
      ${formDirections()}
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
      logEvent('TDI Confirmation - Download V01 Clicked', {});
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
  const sessionData = getSessionData();

  const provider_name = sessionData[STORAGE_KEY_PROVIDER_NAME] ||
    i18next.t('confirmation.m01.sample.empty.provider_name');

  const user_dob = sessionData[STORAGE_KEY_USER_DOB] ||
    i18next.t('confirmation.m01.sample.empty.user_dob');

  const user_name = sessionData[STORAGE_KEY_USER_NAME] ||
    i18next.t('confirmation.m01.sample.empty.user_name');

  const user_email = sessionData[STORAGE_KEY_USER_EMAIL] || '';

  const user_phone = sessionData[STORAGE_KEY_USER_PHONE] || '';
  
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

function setNewTitleAndAlert() {
  const title = document.querySelector("#pageTitle");
  title.textContent = `${i18next.t('confirmation.title')}`;
  document.removeEventListener('headerReady', setNewTitleAndAlert);

  const alert = document.createElement('div');
  alert.classList.add("usa-alert", "usa-alert--info", "usa-alert--slim");
  alert.id = "submittedAlert";
  alert.innerHTML = `
    <div class="usa-alert__body">
      <p class="usa-alert__text">
        ${i18next.t('confirmation.submitted')}
      </p>
    </div>
  `;
  title.parentNode.insertBefore(alert, title);

  setupApplicationPdfDownloadLink()
}

function setupApplicationPdfDownloadLink() {
  const downloadLink = document.getElementById('applicationPdfDownload');
  if (downloadLink) {
    downloadLink.addEventListener('click', function(event) {
      event.preventDefault();
      logEvent('TDI Confirmation - PDF Download Clicked', {});
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
      logEvent('TDI Confirmation - Copy M01 Sample Clicked', {});
      const textToCopy = sampleLanguageBody.textContent.trim();

      navigator.clipboard.writeText(textToCopy).then(() => {
        copyButton.textContent = i18next.t('confirmation.m01.sample.copied');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }
}
