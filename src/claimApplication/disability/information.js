import { removeExtraSpaceBetweenRadioButtons, styleRadioButton } from '../utils';

export const disabilityInformationLabels = [
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt', label: 'Disability Start Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd', label: 'Last Worked Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk', label: 'Expected Return to Work Date' },
];

export const id = "disabilityInformation";

export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_ClientState',
  value: '"TabState":[true,false,false,false,false,false]',
};

export function changes() {
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo');
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo'
  );
}
