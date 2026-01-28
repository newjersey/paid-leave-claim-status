import i18next from 'i18next';
import { logEvent } from "../../modules/shared.mjs";
import { removeExtraSpaceBetweenRadioButtons, setNewTitle, styleRadioButton } from '../utils';

export const citizenshipLabels = [
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum', label: 'First 3 digits of Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum2', label: 'Fourth, fifth, and sixth digits of Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum3', label: 'Last 4 digits of Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum4', label: 'Phone Number Extension' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactAltNum', label: 'First 3 digits of Alternate Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactAltNum2', label: 'Fourth, fifth, and sixth digits of Alternate Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactAltNum3', label: 'Last 4 digits of Alternate Phone Number' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactAltNum4', label: 'Alternate Phone Number Extension' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtEmail', label: 'Email Address' },
  { id: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtConEmail', label: 'Email Address Confirmation' },
];

export const id = "citizenship";

export const identifyingContent = {
  id,
  pathname: '/tdi_iam/ClaimantProfile_IANM.aspx',
  elementId: 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_pnlContact',
  text: 'Provide your telephone number',
};

export function changes() {
  addStyles();
  adjustWidths();
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbtnCitizenYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbtnCitizenNo');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepNo');
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbtnCitizenYes',
    'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbtnCitizenNo'
  );
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepYes',
    'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepNo'
  );
  requirePhone();
  adjustQuestions();
  addRepresentativeTitle();
  removeWhitespaceNodes();
  removeLegend();
  trackPhoneFirstThreeDigits();
  setNewTitle(i18next.t('citizenship.title'));
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    #ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_btnSave {
      padding-top: 0;
      padding-bottom: 0;
    }
    #add-representative-title {
        font-family: "Public Sans", sans-serif !important;
        font-size: 1.1em;
        font-weight: bold;
        font-variant: normal;
      }
  `;
  document.head.appendChild(style);
}

function removeLegend() {
  const legend = document.querySelector("#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_pnlContact > fieldset > legend")
  if (legend) {
    legend.style.display = 'none';
  }
}

function adjustWidths () {
  const emailField = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtEmail');
  if (emailField) {
    emailField.style.width = '100%';
  }

  const confirmEmailField = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_TxtConEmail');
  if (confirmEmailField) {
    confirmEmailField.style.width = '100%';
  }

  const repEntry = document.getElementById("ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtRepIns");
  if (repEntry) {
    repEntry.style.width = '100%';
  }
}

function addRepresentativeTitle() {
  const repYes = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_rbnRepYes');
  if (!repYes) return;

  const title = document.createElement('p');
  title.id = 'add-representative-title';
  title.textContent = i18next.t('citizenship.addRepresentativeTitle');
  title.style.marginBottom = '10px';
  title.style.marginLeft = '0px';

  const parentAnchor = repYes.closest('a');
  if (parentAnchor) {
    const strong = parentAnchor.previousElementSibling; // <strong>5.</strong>
    if (strong) {
      const asterisk = strong.previousElementSibling; // <a style="color: Red">* </a>
      if (asterisk) {
        asterisk.parentElement.insertBefore(title, asterisk);
      }
    }
  }
}

const PHONE_ENTRY_ID_1 = 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum';
const PHONE_ENTRY_ID_2 = 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum2';
const PHONE_ENTRY_ID_3 = 'ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum3';

function requirePhone() {
  updatePhoneFieldRequirements();

  const phone1 = document.getElementById(PHONE_ENTRY_ID_1);
  const phone2 = document.getElementById(PHONE_ENTRY_ID_2);
  const phone3 = document.getElementById(PHONE_ENTRY_ID_3);

  phone1.setAttribute('pattern', '\\d{3}');
  phone1.setAttribute('title', i18next.t('citizenship.phoneValidation.digits_three'));

  phone2.setAttribute('pattern', '\\d{3}');
  phone2.setAttribute('title', i18next.t('citizenship.phoneValidation.digits_three'));

  phone3.setAttribute('pattern', '\\d{4}');
  phone3.setAttribute('title', i18next.t('citizenship.phoneValidation.digits_four'));

  const label = phone1.previousElementSibling;
  const asterisk = document.createElement('a');
  asterisk.style.color = 'rgb(139, 0, 0)';
  asterisk.textContent = '* ';
  label.parentNode.insertBefore(asterisk, label);

  const container = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen');
  const observer = new MutationObserver(updatePhoneFieldRequirements);
  observer.observe(container, { attributes: true });
}

function updatePhoneFieldRequirements() {
  const phoneFields = [
    document.getElementById(PHONE_ENTRY_ID_1),
    document.getElementById(PHONE_ENTRY_ID_2),
    document.getElementById(PHONE_ENTRY_ID_3)
  ];

  phoneFields.forEach((field) => {
    if (field && field.offsetParent !== null) {
      field.setAttribute('required', '');
    } else {
      field.removeAttribute('required');
    }
  });
}

function adjustQuestions() {
  const contactInfo = document.querySelector('#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_pnlContact');
  const elements = Array.from(contactInfo.querySelectorAll('a, strong'));

  const contentUpdates = [
    { existing: 'Provide your telephone number.', updated: i18next.t('citizenship.phone') },
    { existing: 'Provide your cell phone', updated: i18next.t('citizenship.altPhone') },
    { existing: 'Provide your e-mail address', updated: i18next.t('citizenship.email') },
    { existing: 'Confirm your e-mail address', updated: i18next.t('citizenship.confirm_email') },
    { existing: 'This e-mail address', updated: '' },
    { existing: 'Would you like to designate', updated: i18next.t('citizenship.representative') },
    { existing: 'This individual', updated: '' },
    { existing: `representative's name`, updated: i18next.t('citizenship.representative_name') },
    { existing: `representative's date of birth`, updated: i18next.t('citizenship.representative_dob') },
    { existing: `your representative's telephone number.`, updated: i18next.t('citizenship.representative_phone') }
  ];

  elements.forEach(element => {
    element.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        contentUpdates.forEach(({ existing, updated }) => {
          const nodeText = removeWhitespace(node.textContent);
          const existingText = removeWhitespace(existing);
          if (nodeText.includes(existingText)) {
            node.textContent = ` ${updated}`;
          }
        });
      }
    });
  });
}

function removeWhitespace(str) {
  return str.replace(/\s+/g, '');
}

function removeWhitespaceNodes() {
  const selectors = [
    "#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_pnlContact > fieldset > a:nth-child(2)",
    "#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_pnlContact > fieldset > a:nth-child(13)",
    "#ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_pnlContact > fieldset > a:nth-child(28)",
    "#divctznRep > a:nth-child(2)",
    "#divctznRep > a:nth-child(8)",
    "#divctznRep > a:nth-child(14)"
  ];

  selectors.forEach(selector => {
    const currentElement = document.querySelector(selector);
    if (currentElement) {
      const previousNode = currentElement.previousSibling;
      if (previousNode && previousNode.nodeType === Node.TEXT_NODE && previousNode.textContent.trim() === '') {
        previousNode.remove();
      }
    }
  });
}

function trackPhoneFirstThreeDigits() {
  const submitBtn = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_btnSave');
  const phoneFirstThreeDigits = document.getElementById('ContentPlaceHolder1_ClaimantProfileTab_tpnlCitizen_txtContactNum');
  if (submitBtn && phoneFirstThreeDigits) {
    submitBtn.addEventListener('click', function () {
      logEvent("Personal Phone Submitted", { first3: phoneFirstThreeDigits.value });
    });
  }
}
