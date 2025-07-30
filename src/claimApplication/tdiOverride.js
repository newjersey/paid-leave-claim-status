import 'uswds/css/uswds.css';

import { setupAnalytics } from "../modules/shared.mjs";

import { accessibilityAltText } from './otherBenefits/confirmation.js'
import { certificationLabels } from './otherBenefits/certification.js';
import { citizenshipLabels } from './claimantProfile/citizenship.js';
import { claimantProfileVerificationLabels } from './claimantProfile/verification.js';
import { disabilityInformationLabels } from './disability/information.js';
import { loginProfileLabels } from './claimantProfile/loginProfile.js';
import { medicalTreatmentLabels } from './medical/treatment.js';
import { otherBenefitsVerificationLabels } from './otherBenefits/verification.js';
import { personalProfileLabels } from './claimantProfile/personalProfile.js';

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

function executeOverride() {
  setupAnalytics();
  makeLinkAccessible();
  accessibilityAltText();
  accessibilityContrast();
  accessibilityLabels();
  applyFont();
}

function makeLinkAccessible() {
  const link = document.getElementById('lnkFake');
  if (link) {
    link.setAttribute('aria-hidden', 'true');
    link.setAttribute('tabindex', '-1');
  }
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

function accessibilityLabels () {
  const labels = [
    ...certificationLabels,
    ...citizenshipLabels,
    ...claimantProfileVerificationLabels,
    ...disabilityInformationLabels,
    ...loginProfileLabels,
    ...medicalTreatmentLabels,
    ...otherBenefitsVerificationLabels,
    ...personalProfileLabels,
  ];

  labels.forEach(({ id, label }) => {
    const element = document.getElementById(id);
    if (element && !element.hasAttribute('aria-label')) {
      element.setAttribute('aria-label', label);
    }
  });
}

function applyFont() {
  document.body.style.fontFamily = '"Public Sans", sans-serif';
  document.querySelectorAll('*').forEach(element => {
    element.style.fontFamily = '"Public Sans", sans-serif';
  });
}
