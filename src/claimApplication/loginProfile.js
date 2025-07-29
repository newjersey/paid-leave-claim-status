export function loginProfile() {
  accessibilityLabels();
}

function accessibilityLabels() {
  const ssnInput1 = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtClmntSSN1');
  if (ssnInput1 && !ssnInput1.hasAttribute('aria-label')) {
    ssnInput1.setAttribute('aria-label', 'First 3 digits of Social Security Number');
  }

  const ssnInput2 = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtClmntSSN2');
  if (ssnInput2 && !ssnInput2.hasAttribute('aria-label')) {
    ssnInput2.setAttribute('aria-label', 'Fourth and fifth digits of Social Security Number');
  }

  const ssnInput3 = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtClmntSSN3');
  if (ssnInput3 && !ssnInput3.hasAttribute('aria-label')) {
    ssnInput3.setAttribute('aria-label', 'Last 4 digits of Social Security Number');
  }

  const firstName = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtFName');
  if (firstName && !firstName.hasAttribute('aria-label')) {
    firstName.setAttribute('aria-label', 'First Name');
  }

  const middleInitial = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtMInit');
  if (middleInitial && !middleInitial.hasAttribute('aria-label')) {
    middleInitial.setAttribute('aria-label', 'Middle Initial');
  }

  const lastName = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtLName');
  if (lastName && !lastName.hasAttribute('aria-label')) {
    lastName.setAttribute('aria-label', 'Last Name');
  }

  const dateOfBirth = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_PERSONNEL_txtDOB');
  if (dateOfBirth && !dateOfBirth.hasAttribute('aria-label')) {
    dateOfBirth.setAttribute('aria-label', 'Date of Birth');
  }
}

