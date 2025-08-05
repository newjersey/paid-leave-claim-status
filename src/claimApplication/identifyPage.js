import { identifyingContent as certificationContent } from "./claimantInfo/certification.js";
import { identifyingContent as confirmationContent } from "./claimantInfo/confirmation.js";
import { identifyingContent as employerDetailsContent } from "./claimantInfo/employerDetails.js";
import { identifyingContent as employmentContent } from "./claimantInfo/employment.js";
import { identifyingContent as intermittentContent } from "./claimantInfo/intermittent.js";
import { identifyingContent as otherBenefitsContent } from "./claimantInfo/otherBenefits.js";
import { identifyingContent as paymentInfoContent } from "./claimantInfo/paymentInfo.js";
import { identifyingContent as ptoPensionContent } from "./claimantInfo/ptoPension.js";
import { identifyingContent as verificationContent } from "./claimantInfo/verification.js";
import { identifyingContent as verifyEmployerContent } from "./claimantInfo/verifyEmployer.js";
import { identifyingContent as workRelatedContent } from "./claimantInfo/workRelated.js";
import { identifyingContent as workScheduleContent } from "./claimantInfo/workSchedule.js";
import { identifyingContent as citizenshipContent } from "./claimantProfile/citizenship.js";
import { identifyingContent as loginProfileContent } from "./claimantProfile/loginProfile.js";
import { identifyingContent as personalProfileContent } from "./claimantProfile/personalProfile.js";
import { identifyingContent as claimantProfileVerificationContent } from "./claimantProfile/verification.js";
import { identifyingContent as completeExistingIntroContent } from "./completeExistingIntro/completeExistingIntro.js";
import { identifyingContent as disabilityInformationContent } from "./disability/information.js";
import { identifyingContent as employmentDetailsContent } from "./employmentDetails/employmentDetails.js";
import { identifyingContent as medicalTreatmentContent } from "./medical/treatment.js";
import { identifyingContent as priorClaimSearchContent } from "./priorClaimSearch/priorClaimSearch.js";
import { identifyingContent as tdiIntroductionContent } from "./tdiIntroduction/tdiIntroduction.js";

const identifyingContents = [
  certificationContent,
  confirmationContent,
  employerDetailsContent,
  employmentContent,
  intermittentContent,
  otherBenefitsContent,
  paymentInfoContent,
  ptoPensionContent,
  verificationContent,
  verifyEmployerContent,
  workRelatedContent,
  workScheduleContent,
  citizenshipContent,
  loginProfileContent,
  personalProfileContent,
  claimantProfileVerificationContent,
  completeExistingIntroContent,
  employmentDetailsContent,
  disabilityInformationContent,
  medicalTreatmentContent,
  priorClaimSearchContent,
  tdiIntroductionContent,
];

export function identifyPage() {
  for (const { id, elementId, text } of identifyingContents) {
    const element = document.getElementById(elementId);
    const isVisible = element && element.offsetParent !== null;
    if (isVisible && element.textContent.includes(text)) {
      return id;
    }
  }

  return 'other';
}
