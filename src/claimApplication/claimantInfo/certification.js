export const certificationLabels = [
  { id: 'ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgYes', label: 'Yes, I agree' },
  { id: 'ContentPlaceHolder1_ClaimantCertTab_TPCertification_rbtnAgNo', label: 'I do not agree' },
];

export const id = "certification";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_lblHeader',
  text: 'CLAIMANT CERTIFICATION',
};

export function changes() {
  addStyles();
  convertBodyTextFromH4();
  trimText();
  styleAgreeRadioButtons();
  styleQuitRadioButtons();
}

function trimText() {
  const fieldset = document.querySelector("#divPdd fieldset");
  fieldset.childNodes.forEach(function(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.nodeValue = node.nodeValue.trim();
    }
  });
}

function convertBodyTextFromH4() {
  const h4Elements = document.querySelectorAll('h4');

  const newParagraph = document.createElement('p');
  newParagraph.style.margin = '0';
  newParagraph.innerHTML = `
    By agreeing:<br><br>
    I declare that the foregoing information is to the best of my knowledge and belief true, correct, and complete.<br><br>
    I understand that I must contact the Division of Temporary Disability Insurance to report any circumstance that may change my entitlement to benefits.<br><br>
    I hereby authorize the Division of Temporary Disability Insurance to verify my Social Security Number, and obtain any medical, employment, and Social Security benefit entitlement information that is necessary to determine my eligibility for benefits.
  `;

  h4Elements[0].parentNode.replaceChild(newParagraph, h4Elements[0]);
  h4Elements[1].parentNode.removeChild(h4Elements[1]);
}

function addStyles() {
  const style = document.createElement('style');  
  style.innerHTML = `
    #divPdd, #divCertNo {
      line-height: 1.6em;
    }
    #divPdd legend {
      display: none;
    }
    #divPdd .usa-legend {
      display: block;
    }
  `;
  document.head.appendChild(style);
}

function styleAgreeRadioButtons() {
    const divPdd = document.getElementById('divPdd');

  if (divPdd) {
    const oldFieldset = divPdd.querySelector('fieldset');

    if (oldFieldset) {
      const textContent = oldFieldset.innerHTML.split('<p>')[0];

      const textDiv = document.createElement('div');
      textDiv.innerHTML = textContent;

      const newFieldset = document.createElement('fieldset');
      newFieldset.classList.add('usa-fieldset');
      newFieldset.style.marginTop = '25px';
      newFieldset.style.marginBottom = '25px';

      const newLegend = document.createElement('legend');
      newLegend.classList.add('usa-legend');
      newLegend.textContent = 'I Agree';
      newFieldset.appendChild(newLegend);

      const radioButtons = oldFieldset.querySelectorAll('input[type="radio"]');
      const radioLabels = ['Yes', 'No'];

      radioButtons.forEach((radioButton, index) => {
        const div = document.createElement('div');
        div.classList.add('usa-radio');

        const newRadioButton = radioButton.cloneNode(true);
        newRadioButton.classList.add('usa-radio__input');

        const newLabel = document.createElement('label');
        newLabel.classList.add('usa-radio__label');
        newLabel.setAttribute('for', newRadioButton.id);
        newLabel.textContent = radioLabels[index];

        div.appendChild(newRadioButton);
        div.appendChild(newLabel);
        newFieldset.appendChild(div);
      });

      oldFieldset.replaceWith(textDiv, newFieldset);
    }
  }
}

function styleQuitRadioButtons() {
  const divCertNo = document.getElementById('divCertNo');

  if (divCertNo) {
    const oldFieldset = divCertNo.querySelector('fieldset');

    if (oldFieldset) {
      const legendText = 'Do you still wish to leave this application and complete your application at a later time?';
      const textContent = oldFieldset.innerHTML.split(legendText)[0].trim();

      const textDiv = document.createElement('div');
      textDiv.innerHTML = textContent;

      const newFieldset = document.createElement('fieldset');
      newFieldset.classList.add('usa-fieldset');
      newFieldset.style.marginBottom = '25px';

      const newLegend = document.createElement('legend');
      newLegend.classList.add('usa-legend');
      newLegend.textContent = legendText;
      newFieldset.appendChild(newLegend);

      const radioButtons = oldFieldset.querySelectorAll('input[type="radio"]');
      const radioLabels = ['Yes', 'No'];

      radioButtons.forEach((radioButton, index) => {
        const div = document.createElement('div');
        div.classList.add('usa-radio');

        const newRadioButton = radioButton.cloneNode(true);
        newRadioButton.classList.add('usa-radio__input');

        const newLabel = document.createElement('label');
        newLabel.classList.add('usa-radio__label');
        newLabel.setAttribute('for', newRadioButton.id);
        newLabel.textContent = radioLabels[index];

        div.appendChild(newRadioButton);
        div.appendChild(newLabel);
        newFieldset.appendChild(div);
      });

      oldFieldset.replaceWith(textDiv, newFieldset);
    }
  }
}
