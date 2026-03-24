import { clearSessionData } from "../utils";
import { styleBody } from "../../modules/shared.mjs";

export const id = "completeExistingIntro";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_tblContent',
  text: 'COMPLETING YOUR APPLICATION FOR STATE TEMPORARY DISABILITY BENEITS',
};

export function changes() {
  const checkbox = document.getElementById('ContentPlaceHolder1_chkAgree');
  if (checkbox) {
    checkbox.style.margin = '0 5px';
  }
  clearSessionData();
  styleBody();
  removeFutureText();
}

function removeFutureText() {
  const content = document.getElementById("ContentPlaceHolder1_tblContent");

  const targetText = ` 
                     If your disability date is in the future, you must 
also return to certify your claim within fourteen (14) days after your 
first date of disability or your data will be removed. 
                     You will then need to restart the application 
process.`;

  content.querySelectorAll('*').forEach(el => {
    if (el.textContent.includes(targetText)) {
      el.innerHTML = el.innerHTML.replace(targetText, '');
    }
  });
}
