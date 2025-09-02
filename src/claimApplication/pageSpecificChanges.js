import { changes as certificationChanges, id as certificationId } from "./claimantInfo/certification";
import { changes as confirmationChanges, id as confirmationId } from "./claimantInfo/confirmation";

export function pageSpecificChanges(pageId) {
  if (pageId === certificationId) {
    certificationChanges();
  }
  if (pageId === confirmationId) {
    confirmationChanges();
  }
}
