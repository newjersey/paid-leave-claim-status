import { identifyingContent as certificationContent } from "./claimantInfo/certification.js";
import { identifyingContent as confirmationContent } from "./claimantInfo/confirmation.js";
import { identifyingContent as employerDetailsContent } from "./claimantInfo/employerDetails.js";
import { identifyingContent as employmentContent } from "./claimantInfo/employment.js";

const identifyingContents = [
  certificationContent,
  confirmationContent,
  employerDetailsContent,
  employmentContent,
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
