import i18next from 'i18next';
import { clearSessionData, setNewTitle } from "../utils";

export const id = "completeExistingIntro";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_tblContent',
  text: 'COMPLETING YOUR APPLICATION FOR STATE TEMPORARY DISABILITY BENEITS',
};

export function changes() {
  addStyles();
  clearSessionData();
  replaceTableWithNewContent();
  setNewTitle(i18next.t('completeExistingIntro.title'));
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    #getStartedButton {
      display: block;
      max-width: 80%;
      margin: 30px auto 0;
      min-width: 200px;
      padding: 15px;
    }

    #infoReadyItem ul {
      padding-left: 40px;
    }

    #newIntroContent {
      line-height: 1.5;
    }

    #newIntroContent h2, #newIntroContent h3 {
      color: black;
      font-weight: bold;
    }

    #newIntroContent .usa-process-list {
      padding-top: 10px;
    }

    #newIntroContent .usa-process-list__item {
      max-width: 100%;
      width: 100%;
    }

    .usa-alert {
      margin-top: 0;
    }

    .usa-process-list__heading {
      margin-bottom: 10px;
    }

    .usa-process-list__item ul {
      margin-bottom: 20px;
      padding-left: 20px;
    }
  `;
  document.head.appendChild(style);
}

function replaceTableWithNewContent() {
  const oldTable = document.getElementById('ContentPlaceHolder1_tblContent');
  oldTable.style.display = 'none';

  const newIntroContent = document.createElement('div');
  newIntroContent.id = 'newIntroContent';
  newIntroContent.innerHTML = `
    <div class="bordered-set" style="margin-top: 30px;">${i18next.t('completeExistingIntro.continue')}</div>
    <div class="bordered-set">
      <ol class="usa-process-list">
        <li class="usa-process-list__item" id="infoReadyItem">
          <h2 class="usa-process-list__heading">${i18next.t('introduction.infoReady.title')}</h2>
          <h3>${i18next.t('introduction.infoReady.personalInfo')}</h3>
          <ul>
            <li>${i18next.t('shared.ssn')}</li>
            <li>${i18next.t('shared.dob')}</li>
            <li>${i18next.t('introduction.infoReady.contact')}</li>
          </ul>
          <div style="margin-left: 20px;">
            <strong>${i18next.t('introduction.infoReady.representativeTitle')}</strong>
            <p>${i18next.t('introduction.infoReady.representativeDetails')}</p>
          </div>
          <h3>${i18next.t('introduction.infoReady.leaveInfo')}</h3>
          <ul>
            <li>${i18next.t('introduction.infoReady.reasonForLeave')}</li>
            <li>${i18next.t('introduction.infoReady.leaveDates')}</li>
            <li>${i18next.t('introduction.infoReady.recovery')}</li>
            <li>${i18next.t('introduction.infoReady.providerInfo')}</li>
          </ul>
          <h3>${i18next.t('introduction.infoReady.otherBenefits')}</h3>
          <ul>
            <li>${i18next.t('introduction.infoReady.workersComp')}</li>
            <li>${i18next.t('introduction.infoReady.ssdi')}</li>
            <li>${i18next.t('introduction.infoReady.ui')}</li>
            <li>${i18next.t('introduction.infoReady.outOfState')}</li>
          </ul>
          <h3>${i18next.t('introduction.infoReady.employment')}</h3>
          <ul>
            <li>${i18next.t('introduction.infoReady.employerName')}</li>
            <li>${i18next.t('introduction.infoReady.ein')}</li>
            <li>${i18next.t('introduction.infoReady.employmentDates')}</li>
            <li>${i18next.t('introduction.infoReady.currentEmployer')}</li>
          </ul>
        </li>
        <li class="usa-process-list__item">
          <h2 class="usa-process-list__heading">${i18next.t('introduction.fillOut.title')}</h2>
          <ul>
            <li>${i18next.t('introduction.fillOut.time')}</li>
            <li>${i18next.t('introduction.fillOut.saved')}</li>
            <li>${i18next.t('introduction.fillOut.deadline')}</li>
          </ul>
        </li>
        <li class="usa-process-list__item" style="padding-bottom: 0;">
          <h2 class="usa-process-list__heading">${i18next.t('introduction.nextSteps.title')}</h2>
          <ul>
            <li>${i18next.t('introduction.nextSteps.claimNumber')}</li>
            <li>${i18next.t('introduction.nextSteps.m01')}</li>
            <li>${i18next.t('introduction.nextSteps.otherTasks')}</li>
          </ul>
        </li>
      </ol>
    </div>
    <div class="usa-alert usa-alert--info usa-alert--no-icon">
      <div class="usa-alert__body">
        <p class="usa-alert__text">
          ${i18next.t('introduction.privacy')}
        </p>
      </div>
    </div>
    <button class="usa-button" type="button" id="getStartedButton">${i18next.t('completeExistingIntro.button')}</button>
  `;

  oldTable.insertAdjacentElement('beforebegin', newIntroContent);

  const getStartedButton = document.getElementById('getStartedButton');
  const checkbox = document.getElementById('ContentPlaceHolder1_chkAgree');
  getStartedButton.addEventListener('click', function () {
    checkbox.click();
  });
}
