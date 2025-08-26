import { changes as certificationChanges, id as certificationId } from "./claimantInfo/certification";

export function pageSpecificChanges(pageId) {
  if (pageId === certificationId) {
    certificationChanges();
  }
}
