import { changes as certificationChanges, id as certificationId } from "./claimantInfo/certification";
import { changes as confirmationChanges, id as confirmationId } from "./claimantInfo/confirmation";
import { changes as employerDetailsChanges, id as employerDetailsId } from "./claimantInfo/employerDetails";
import { changes as employmentChanges, id as employmentId } from "./claimantInfo/employment";
import { changes as employmentDetailsChanges, id as employmentDetailsId } from "./employmentDetails/employmentDetails";
import { changes as medicalTreatmentChanges, id as medicalTreatmentId } from "./medical/treatment";
import { changes as priorClaimSearchChanges, id as priorClaimSearchId } from "./priorClaimSearch/priorClaimSearch";
import { changes as ptoPensionChanges, id as ptoPensionId } from "./claimantInfo/ptoPension";
import { changes as verificationChanges, id as verificationId } from "./claimantInfo/verification";

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
  }
}
