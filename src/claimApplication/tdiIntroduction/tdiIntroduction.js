import i18next from 'i18next';
import { clearSessionData, removeIntroTextReferencingFuture } from "../utils";
import { styleBody } from "../../modules/shared.mjs";

export const id = "tdiIntroduction";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_tblContent',
  text: 'I have read the above information and wish to file',
};

export function changes() {
 clearSessionData();
 styleBody();
 removeIntroTextReferencingFuture();
 replaceCheckboxWithButton();
}

function replaceCheckboxWithButton() {
  const checkboxId = 'ContentPlaceHolder1_chkAgree';
  const checkbox = document.getElementById(checkboxId);
  if (!checkbox) return;

  checkbox.style.display = 'none';
  
  const label = document.querySelector(`label[for="${checkboxId}"]`);
  if (label) {
    label.removeAttribute('for');
  }

  const button = document.createElement('button');
  button.id = 'btnAgreeContinue';
  button.classList.add('usa-button');
  button.textContent = i18next.t('shared.agreeAndContinue');
  button.style.display = 'block';
  button.style.maxWidth = "80%";
  button.style.margin = '10px';
  button.style.padding = '10px';
  
  checkbox.parentNode.appendChild(button);

  button.addEventListener('click', function () {
    checkbox?.click();
  });
}
