import { confirmationAltTexts } from './claimantInfo/confirmation.js'
import { certificationLabels } from './claimantInfo/certification.js';
import { citizenshipLabels } from './claimantProfile/citizenship.js';
import { claimantProfileVerificationLabels } from './claimantProfile/verification.js';
import { disabilityInformationLabels } from './disability/information.js';
import { employerDetailsLabels } from './claimantInfo/employerDetails.js';
import { employmentDetailsLabels } from './employmentDetails/employmentDetails.js';
import { loginProfileLabels } from './claimantProfile/loginProfile.js';
import { medicalTreatmentLabels } from './medical/treatment.js';
import { otherBenefitsVerificationLabels } from './claimantInfo/verification.js';
import { personalProfileLabels } from './claimantProfile/personalProfile.js';
import { priorClaimSearchLabels } from './priorClaimSearch/priorClaimSearch.js';
import { verifyEmployerLabels } from './claimantInfo/verifyEmployer.js';
import { workRelatedLabels } from './claimantInfo/workRelated.js';
import { workScheduleLabels } from './claimantInfo/workSchedule.js';

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

    if (color === 'rgb(255, 0, 0)') {
      element.style.color = 'rgb(139, 0, 0)';
    } else if (color === 'rgb(128, 128, 128)') {
      element.style.color = 'rgb(64, 64, 64)';
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