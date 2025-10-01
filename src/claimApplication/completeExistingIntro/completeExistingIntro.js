import { STORAGE_KEY_SESSION_DATA } from "../utils";

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
  clearSessionStorage();
}

function clearSessionStorage() {
  sessionStorage.removeItem(STORAGE_KEY_SESSION_DATA);
}
