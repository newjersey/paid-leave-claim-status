export const LOCAL_STORAGE_KEY_PROVIDER_NAME = "provider_name";
export const LOCAL_STORAGE_KEY_USER_DOB = "user_dob";
export const LOCAL_STORAGE_KEY_USER_NAME = "user_name";
export const LOCAL_STORAGE_KEY_USER_EMAIL = "user_email";
export const LOCAL_STORAGE_KEY_USER_PHONE = "user_phone";

// TODO: this only styles the buttons.
// When possible also use USWDS suggested HTML fieldset and legend structure
export function styleRadioButton(radioButtonId, marginBottom = false) {
  const radioButton = document.getElementById(radioButtonId);
  const label = document.querySelector(`label[for="${radioButtonId}"]`);

  if (radioButton && label) {
    const radioDiv = document.createElement('div');
    radioDiv.classList.add('usa-radio');

    radioButton.classList.add('usa-radio__input');
    label.classList.add('usa-radio__label');
    label.style.marginBottom = marginBottom ? '20px': '0';
    label.style.textAlign = 'left';

    radioDiv.appendChild(radioButton.cloneNode(true));
    radioDiv.appendChild(label.cloneNode(true));

    radioButton.parentNode.insertBefore(radioDiv, radioButton);

    radioButton.remove();
    label.remove();
  }
}

export function fixPhoneNumberText(
  areaCodeInputId,
  tel2InputId,
  tel3InputId,
  extInputId
) {
  const areaCodeInput = document.querySelector(areaCodeInputId);
  if (areaCodeInput) {
    areaCodeInput.style.maxWidth = '30px';

    const parentTd = areaCodeInput.closest('td');
    const labelLink = Array.from(parentTd.querySelectorAll('a')).find(a => a.textContent.includes("Telephone Number:"));
      if (labelLink) {
        const brElement = document.createElement('br');
        labelLink.parentNode.insertBefore(brElement, labelLink.nextSibling);
      }
  }

  const tel2Input = document.querySelector(tel2InputId);
  if (tel2Input) {
    tel2Input.style.maxWidth = '40px';
  }

  const tel3Input = document.querySelector(tel3InputId);
  if (tel3Input) {
    tel3Input.style.maxWidth = '50px';
  }

  const extInput = document.querySelector(extInputId);
  if (extInput) {
    extInput.style.maxWidth = '50px';
  }
}

export function removeExtraSpaceBetweenRadioButtons(yesId, noId) {
  const radioYes = document.getElementById(yesId).closest('.usa-radio');
  const radioNo = document.getElementById(noId).closest('.usa-radio');

  let currentNode = radioYes.nextSibling;
  while (currentNode && currentNode !== radioNo) {
    const nextNode = currentNode.nextSibling;
    if (currentNode.nodeType === Node.TEXT_NODE || currentNode.nodeType === Node.ELEMENT_NODE && currentNode.tagName === 'BR') {
        currentNode.parentNode.removeChild(currentNode);
    }
    currentNode = nextNode;
  }
}

export function adjustTableWidths(parent) {
  const tables = parent.querySelectorAll('table');
  tables.forEach(table => {
    table.style.width = 'auto';
    table.style.maxWidth = '100%';
    table.style.tableLayout = 'auto';

    const cells = table.querySelectorAll('td');
    cells.forEach(cell => {
      cell.style.width = 'auto';
      cell.style.maxWidth = '100%';
    });

    const inputsAndSelects = table.querySelectorAll('input[type="text"], select, textarea');
    inputsAndSelects.forEach(element => {
      element.style.width = 'auto';
      element.style.maxWidth = '100%';
      element.style.boxSizing = 'border-box';
    });
  });
}
