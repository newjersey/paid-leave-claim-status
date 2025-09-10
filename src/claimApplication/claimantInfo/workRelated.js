import { styleRadioButton } from '../globalDesign';

export const workRelatedLabels = [
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpNm', label: 'Employer Name' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpadd1', label: 'Employer Address Line 1' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpadd2', label: 'Employer Address Line 2' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtCity', label: 'Employer City' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_ddlEmpStates', label: 'Employer State' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpZip1', label: 'Employer Zipcode 1' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtEmpZip2', label: 'Employer Zipcode 2' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh', label: 'Employer Phone Number First 3 Digits' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh2', label: 'Employer Phone Number Digits 4, 5, and 6' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh3', label: 'Employer Phone Number Last 4 Digits' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjEmpPh4', label: 'Employer Phone Number Extension' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtInjDt', label: 'Injury Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_txtNoClaim', label: 'Why No Workers Comp Claim' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_text_num_noClaim', label: 'No Claim Characters Left' },
];

export const id = "workRelated";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_TabWC',
  text: 'Work Related Information',
};

export function changes() {
  adjustWidths();
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbtnFWCNo', true);
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCInsYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCInsNo', true);
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCBenYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_rbWCBenNo', true);
}

function adjustWidths() {
  const div = document.querySelector('#ContentPlaceHolder1_ClaimantDisabilityTab_TabWC_Panel3');
  if (div) {
    div.style.width = 'auto';
    div.style.maxWidth = '700px';
  }

  const outerDiv = document.getElementById('divWCNo');
  if (outerDiv) {
    const innerDivs = outerDiv.querySelectorAll('div');
    innerDivs.forEach(div => {
      div.style.width = '100%';
      div.style.marginLeft = '0';
    });

    const textarea = outerDiv.querySelector('textarea');
    if (textarea) {
      textarea.style.width = '100%';
    }
  }
  

  const fieldsets = document.querySelectorAll('fieldset');

  fieldsets.forEach(fieldset => {
    fieldset.style.width = 'auto';
    fieldset.style.maxWidth = '100%';

    const tables = fieldset.querySelectorAll('table');
    tables.forEach(table => {
      table.style.width = '100%';
      table.style.tableLayout = 'auto';

      const cells = table.querySelectorAll('td');
      cells.forEach(cell => {
        cell.style.width = '';
      });

      const inputsAndSelects = table.querySelectorAll('input[type="text"], select, textarea');
      inputsAndSelects.forEach(element => {
        element.style.width = 'auto';
        element.style.maxWidth = '100%';
        element.style.boxSizing = 'border-box';
      });
    });
  });
}
