import { identifyingContent as certificationContent } from "./claimantInfo/certification.js";
import { identifyingContent as confirmationContent } from "./claimantInfo/confirmation.js";
import { identifyingContent as employerDetailsContent } from "./claimantInfo/employerDetails.js";
import { identifyingContent as employmentContent } from "./claimantInfo/employment.js";
import { identifyingContent as intermittentContent } from "./claimantInfo/intermittent.js";
import { identifyingContent as otherBenefitsContent } from "./claimantInfo/otherBenefits.js";

const identifyingContents = [
  certificationContent,
  confirmationContent,
  employerDetailsContent,
  employmentContent,
  intermittentContent,
  otherBenefitsContent,
];

export function identifyPage() {
  for (const { id, elementId, text } of identifyingContents) {
    const element = document.getElementById(elementId);
    if (element && element.offsetParent !== null && element.textContent.includes(text)) {
      return id;
    }
  }

  return 'other';
}
