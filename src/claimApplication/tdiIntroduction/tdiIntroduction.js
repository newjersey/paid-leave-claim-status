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
}
