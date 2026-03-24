import { clearSessionData } from "../utils";
import { styleBody } from "../../modules/shared.mjs";

export const id = "tdiIntroduction";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_tblContent',
  text: 'I have read the above information and wish to file',
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

  if (!content) return;
  
  // rendered text is wonky, so regex with variable whitespace throughout
  const targetRegex = /\s+If\s+your\s+disability\s+date\s+is\s+in\s+the\s+future,\s+you\s+must\s+also\s+return\s+to\s+certify\s+your\s+claim\s+within\s+fourteen\s+\(14\)\s+days\s+after\s+your\s+first\s+date\s+of\s+disability\s+or\s+your\s+data\s+will\s+be\s+removed\.\s+You\s+will\s+then\s+need\s+to\s+restart\s+the\s+application\s+process./gi;
  
  console.log(targetRegex);
  content.querySelectorAll('*').forEach(el => {
    if (targetRegex.test(el.textContent)) {
      el.innerHTML = el.innerHTML.replace(targetRegex, '');
    }
  });
}
