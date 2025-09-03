export const priorClaimSearchLabels = [
  { id: 'ContentPlaceHolder1_txtFName', label: 'Full Name' },
  { id: 'ContentPlaceHolder1_txtDOB', label: 'Date of Birth' },
  { id: 'ContentPlaceHolder1_txtClmID', label: 'Claim ID' },
];

export const id = "priorClaimSearch";

export const identifyingContent = {
  id,
  elementId: 'dvIANMYes',
  text: 'Do you know your Claim ID Number?',
};

export function changes() {
  adjustTextEntry();
}

function adjustTextEntry() {
  const name = document.querySelector("#ContentPlaceHolder1_txtFName");
  if (name) {
    name.style.width = '100%';
  }
}
