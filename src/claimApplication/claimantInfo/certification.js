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
  const h4Elements = document.querySelectorAll('h4');

  h4Elements.forEach((h4) => {
    const p = document.createElement('p');
    p.innerHTML = h4.innerHTML;
    Array.from(h4.attributes).forEach(attr => {
      p.setAttribute(attr.name, attr.value);
    });
    h4.parentNode.replaceChild(p, h4);
  });
}
