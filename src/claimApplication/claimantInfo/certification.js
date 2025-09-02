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
    #divPdd input[type="radio"] {
      margin-left: 20px;
      margin-right: 2px;
    }
  `;
  document.head.appendChild(style);
}
