import { changes as certificationChanges, id as certificationId } from "./claimantInfo/certification";
import { changes as citizenshipChanges, id as citizenshipId } from "./claimantProfile/citizenship";
import { changes as claimantProfileVerificationChanges, id as claimantProfileVerificationId } from "./claimantProfile/verification";
import { changes as confirmationChanges, id as confirmationId } from "./claimantInfo/confirmation";
import { changes as employerDetailsChanges, id as employerDetailsId } from "./claimantInfo/employerDetails";
import { changes as employmentChanges, id as employmentId } from "./claimantInfo/employment";
import { changes as employmentDetailsChanges, id as employmentDetailsId } from "./employmentDetails/employmentDetails";
import { changes as intermittentChanges, id as intermittentId } from "./claimantInfo/intermittent";
import { changes as loginProfileChanges, id as loginProfileId } from "./claimantProfile/loginProfile";
import { changes as medicalTreatmentChanges, id as medicalTreatmentId } from "./medical/treatment";
import { changes as otherBenefitsChanges, id as otherBenefitsId } from "./claimantInfo/otherBenefits";
import { changes as paymentInfoChanges, id as paymentInfoId } from "./claimantInfo/paymentInfo";
import { changes as personalProfileChanges, id as personalProfileId } from "./claimantProfile/personalProfile";
import { changes as priorClaimSearchChanges, id as priorClaimSearchId } from "./priorClaimSearch/priorClaimSearch";
import { changes as ptoPensionChanges, id as ptoPensionId } from "./claimantInfo/ptoPension";
import { changes as verificationChanges, id as verificationId } from "./claimantInfo/verification";
import { changes as verifyEmployerChanges, id as verifyEmployerId } from "./claimantInfo/verifyEmployer";
import { changes as workRelatedChanges, id as workRelatedId } from "./claimantInfo/workRelated";
import { changes as workScheduleChanges, id as workScheduleId } from "./claimantInfo/workSchedule";

const pageChangesMap = {
  [certificationId]: certificationChanges,
  [citizenshipId]: citizenshipChanges,
  [claimantProfileVerificationId]: claimantProfileVerificationChanges,
  [confirmationId]: confirmationChanges,
  [employerDetailsId]: employerDetailsChanges,
  [employmentId]: employmentChanges,
  [employmentDetailsId]: employmentDetailsChanges,
  [intermittentId]: intermittentChanges,
  [loginProfileId]: loginProfileChanges,
  [medicalTreatmentId]: medicalTreatmentChanges,
  [otherBenefitsId]: otherBenefitsChanges,
  [paymentInfoId]: paymentInfoChanges,
  [personalProfileId]: personalProfileChanges,
  [priorClaimSearchId]: priorClaimSearchChanges,
  [ptoPensionId]: ptoPensionChanges,
  [verificationId]: verificationChanges,
  [verifyEmployerId]: verifyEmployerChanges,
  [workRelatedId]: workRelatedChanges,
  [workScheduleId]: workScheduleChanges,
};

export function pageSpecificChanges(pageId) {
  pageChangesMap[pageId]?.();
}
