import i18next from 'i18next';
import { clearSessionData, setNewTitle } from "../utils";

export const id = "tdiIntroduction";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_tblContent',
  text: 'I have read the above information and wish to file',
};

export function changes() {
clearSessionData();
replaceTableWithNewContent();
setNewTitle(i18next.t('introduction.title'));
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
        <h4 class="usa-process-list__heading">Start a process</h4>
        <p class="margin-top-05">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo,
          ipsum sed pharetra gravida, orci magna rhoncus neque.
        </p>
        <ul>
          <li>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo,
            ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio
            lorem non turpis.
          </li>
          <li>
            Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat
            condimentum.
          </li>
          <li>Aliquam erat volutpat. Sed quis velit.</li>
        </ul>
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
