import { confirmationAltTexts } from './otherBenefits/confirmation.js'
import { certificationLabels } from './otherBenefits/certification.js';
import { citizenshipLabels } from './claimantProfile/citizenship.js';
import { claimantProfileVerificationLabels } from './claimantProfile/verification.js';
import { disabilityInformationLabels } from './disability/information.js';
import { employerDetailsLabels } from './otherBenefits/employerDetails.js';
import { employmentDetailsLabels } from './employmentDetails/employmentDetails.js';
import { loginProfileLabels } from './claimantProfile/loginProfile.js';
import { medicalTreatmentLabels } from './medical/treatment.js';
import { otherBenefitsVerificationLabels } from './otherBenefits/verification.js';
import { personalProfileLabels } from './claimantProfile/personalProfile.js';
import { priorClaimSearchLabels } from './priorClaimSearch/priorClaimSearch.js';
import { verifyEmployerLabels } from './otherBenefits/verifyEmployer.js';
import { workRelatedLabels } from './otherBenefits/workRelated.js';
import { workScheduleLabels } from './otherBenefits/workSchedule.js';

function accessibilityAltText() {
  const altTexts = [
    ...confirmationAltTexts,
  ];

  altTexts.forEach(({ id, alt }) => {
    const element = document.getElementById(id);
    if (element && !element.hasAttribute('alt')) {
      element.setAttribute('alt', alt);
    }
  });
}

function accessibilityContrast() {
  document.querySelectorAll('*').forEach(element => {
    const computedStyle = window.getComputedStyle(element);
    const color = computedStyle.color;

    if (
      color === 'rgb(255, 0, 0)' || color.toLowerCase() === 'red' ||
      color === 'rgb(128, 128, 128)' || color.toLowerCase() === 'gray'
    ) {
      element.style.color = 'black';
    }
  });
}

function accessibilityLabels() {
  const labels = [
    ...certificationLabels,
    ...citizenshipLabels,
    ...claimantProfileVerificationLabels,
    ...disabilityInformationLabels,
    ...employerDetailsLabels,
    ...employmentDetailsLabels,
    ...loginProfileLabels,
    ...medicalTreatmentLabels,
    ...otherBenefitsVerificationLabels,
    ...personalProfileLabels,
    ...priorClaimSearchLabels,
    ...verifyEmployerLabels,
    ...workRelatedLabels,
    ...workScheduleLabels,
  ];

  labels.forEach(({ id, label }) => {
    const element = document.getElementById(id);
    if (element && !element.hasAttribute('aria-label')) {
      element.setAttribute('aria-label', label);
    }
  });
}

function makeLinkAccessible() {
  const link = document.getElementById('lnkFake');
  if (link) {
    link.setAttribute('aria-hidden', 'true');
    link.setAttribute('tabindex', '-1');
  }
}

export function accessibilityChanges() {
  accessibilityAltText();
  accessibilityContrast();
  accessibilityLabels();
  makeLinkAccessible();
}