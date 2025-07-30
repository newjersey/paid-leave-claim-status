export function accessibilityAltText() {
  const imageButton = document.getElementById('ContentPlaceHolder1_ClaimantCertTab_TPConfirmation_imgbtnM01');
  if (imageButton) {
    imageButton.setAttribute('alt', 'Submit Query');
  }
}
