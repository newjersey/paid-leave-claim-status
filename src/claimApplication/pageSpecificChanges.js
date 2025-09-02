import { changes as certificationChanges, id as certificationId } from "./claimantInfo/certification";
import { changes as confirmationChanges, id as confirmationId } from "./claimantInfo/confirmation";
import { changes as employerDetailsChanges, id as employerDetailsId } from "./claimantInfo/employerDetails";

export function pageSpecificChanges(pageId) {
  if (pageId === certificationId) {
    certificationChanges();
  } else if (pageId === confirmationId) {
    confirmationChanges();
  } else if (pageId === employerDetailsId) {
    employerDetailsChanges();
  }
}
