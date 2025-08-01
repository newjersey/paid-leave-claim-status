import { identifyingContent as certificationContent } from "./claimantInfo/certification.js";
import { identifyingContent as confirmationContent } from "./claimantInfo/confirmation.js";
import { identifyingContent as employerDetailsContent } from "./claimantInfo/employerDetails.js";

const identifyingContents = [
  certificationContent,
  confirmationContent,
  employerDetailsContent,
];

export function identifyPage() {
  for (const { id, elementId, text } of identifyingContents) {
    const element = document.getElementById(elementId);
    if (element && element.textContent.includes(text)) {
      return id;
    }
  }

  return 'other';
}
