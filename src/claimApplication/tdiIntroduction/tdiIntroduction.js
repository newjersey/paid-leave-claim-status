import i18next from 'i18next';
import { clearSessionData, setNewTitle } from "../utils";

export const id = "tdiIntroduction";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_tblContent',
  text: 'I have read the above information and wish to file',
};

export function changes() {
  addStyles();
  clearSessionData();
  replaceTableWithNewContent();
  setNewTitle(i18next.t('introduction.title'));
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    .usa-process-list__item h3 {
      color: black;
      font-weight: bold;
      margin-top: 30px;
    }

    .usa-process-list__item ul {
      margin-bottom: 20px;
      padding-left: 50px;
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
    <p style="margin-top: 30px;">${i18next.t('introduction.contact')}</p>
    <ol class="usa-process-list">
      <li class="usa-process-list__item">
        <h2 class="usa-process-list__heading">${i18next.t('introduction.infoReady.title')}</h2>
          <h3>${i18next.t('introduction.infoReady.personalInfo')}</h3>
          <ul>
            <li>${i18next.t('shared.ssn')}</li>
            <li>${i18next.t('shared.dob')}</li>
            <li>${i18next.t('introduction.infoReady.contact')}</li>
          </ul>
        <strong>${i18next.t('introduction.infoReady.representativeTitle')}</strong>
        <p>${i18next.t('introduction.infoReady.representativeDetails')}</p>
      </li>
      <li class="usa-process-list__item">
        <h4 class="usa-process-list__heading">Proceed to the second step</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo,
          ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio
          lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula
          volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla
          facilisi. Nulla libero. Vivamus pharetra posuere sapien.
        </p>
      </li>
      <li class="usa-process-list__item">
        <h4 class="usa-process-list__heading">Complete the step-by-step process</h4>
        <p>
          Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat
          condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla
          libero. Vivamus pharetra posuere sapien.
        </p>
      </li>
    </ol>
  `;

  oldTable.insertAdjacentElement('beforebegin', newIntroContent);
}
