import i18next from 'i18next';
import { removeExtraSpaceBetweenRadioButtons, styleRadioButton } from '../utils';

export const disabilityInformationLabels = [
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDisStartDt', label: 'Disability Start Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtDtLastWorkd', label: 'Last Worked Date' },
  { id: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_txtExpectedReturnedDtToWrk', label: 'Expected Return to Work Date' },
];

export const id = "disabilityInformation";

// this page renders differently than all others, so we need two options for identifying the page
export const identifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_ClientState',
  value: '"TabState":[true,false,false,false,false,false]',
};

export const alternateIdentifyingContent = {
  id,
  elementId: 'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_dvShowFDD',
  text: 'Select the date your disability',
};

export function changes() {
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes');
  styleRadioButton('ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo', true);
  removeExtraSpaceBetweenRadioButtons(
    'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecYes',
    'ContentPlaceHolder1_ClaimantDisabilityTab_Dis1_rbtnRecNo'
  );
  document.addEventListener('headerReady', setNewTitle);
}

function setNewTitle() {
  const title = document.querySelector("#pageTitle");
  title.textContent = `${i18next.t('leaveSchedule.title')}`;
  document.removeEventListener('headerReady', setNewTitle);
}
