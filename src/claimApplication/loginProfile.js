export function loginProfile() {
  accessibilityLabels();
}

function accessibilityLabels() {
  const elements = [
    { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtClmntSSN1', label: 'First 3 digits of Social Security Number' },
    { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtClmntSSN2', label: 'Fourth and fifth digits of Social Security Number' },
    { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtClmntSSN3', label: 'Last 4 digits of Social Security Number' },
    { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtFName', label: 'First Name' },
    { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMInit', label: 'Middle Initial' },
    { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtLName', label: 'Last Name' },
    { id: 'ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtDOB', label: 'Date of Birth' }
  ];

  elements.forEach(({ id, label }) => {
    const element = document.getElementById(id);
    if (element && !element.hasAttribute('aria-label')) {
      element.setAttribute('aria-label', label);
    }
  });
}
