import { changes as certificationChanges, id as certificationId } from "./claimantInfo/certification";
import { changes as confirmationChanges, id as confirmationId } from "./claimantInfo/confirmation";
import { changes as employerDetailsChanges, id as employerDetailsId } from "./claimantInfo/employerDetails";
import { changes as employmentChanges, id as employmentId } from "./claimantInfo/employment";
import { changes as employmentDetailsChanges, id as employmentDetailsId } from "./employmentDetails/employmentDetails";
import { changes as medicalTreatmentChanges, id as medicalTreatmentId } from "./medical/treatment";
import { changes as priorClaimSearchChanges, id as priorClaimSearchId } from "./priorClaimSearch/priorClaimSearch";
import { changes as ptoPensionChanges, id as ptoPensionId } from "./claimantInfo/ptoPension";
import { changes as verificationChanges, id as verificationId } from "./claimantInfo/verification";
import { changes as verifyEmployerChanges, id as verifyEmployerId } from "./claimantInfo/verifyEmployer";
import { changes as workRelatedChanges, id as workRelatedId } from "./claimantInfo/workRelated";
import { changes as personalProfileChanges, id as personalProfileId } from "./claimantProfile/personalProfile";
import { changes as citizenshipChanges, id as citizenshipId } from "./claimantProfile/citizenship";
import { changes as claimantProfileVerificationChanges, id as claimantProfileVerificationId } from "./claimantProfile/verification";

export function pageSpecificChanges(pageId) {
  if (pageId === certificationId) {
    certificationChanges();
  } else if (pageId === confirmationId) {
    confirmationChanges();
  } else if (pageId === employerDetailsId) {
    employerDetailsChanges();
  } else if (pageId === employmentId) {
    employmentChanges();
  } else if (pageId === employmentDetailsId) {
    employmentDetailsChanges();
  } else if (pageId === medicalTreatmentId) {
    medicalTreatmentChanges();
  } else if (pageId === priorClaimSearchId) {
    priorClaimSearchChanges();
  } else if (pageId === ptoPensionId) {
    ptoPensionChanges();
  } else if (pageId === verificationId) {
    verificationChanges();
  } else if (pageId === verifyEmployerId) {
    verifyEmployerChanges();
  } else if (pageId === workRelatedId) {
    workRelatedChanges();
  } else if (pageId === personalProfileId) {
    personalProfileChanges();
  } else if (pageId === citizenshipId) {
    citizenshipChanges();
  } else if (pageId === claimantProfileVerificationId) {
    claimantProfileVerificationChanges();
  }
}
