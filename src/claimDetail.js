import {
  logEvent,
  setupAnalytics,
  updateIcon,
  addFeedbackLink,
} from "./modules/shared.mjs";

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

function executeOverride() {
  updateIcon();
  setupAnalytics();
  logView();
  addFeedbackLink();
}

function logView() {
  const baseChildren =
    document.getElementById("AutoNumber2")?.children[0]?.children ?? [];

  const claimType =
    baseChildren[4]?.children[0]?.innerText.split(":")[1]?.trim() || "N/A";
  const claimStatus =
    baseChildren[10]?.children[0]?.innerText.split(":")[1]?.trim() || "N/A";

  const claimNotes =
    baseChildren[11]?.children[0]?.children[0]?.children[0]?.children[0]?.children[2]?.innerText
      .trim()
      .split("\n")
      .filter(
        (line) =>
          line.length > 0 &&
          !line.startsWith("As soon as this information is received your claim")
      )
      .map((note) => {
        if (note.includes("Error while processing")) {
          return "ERR";
        } else if (note.includes("Private Plan Operations")) {
          return "PRIV";
        } else if (note.includes("Disability During Unemployment")) {
          return "DDU";
        } else if (note.includes("invalid because you did not meet the wage")) {
          return "INVAL_WAGE";
        } else if (
          note.includes("ineligible because you failed") &&
          note.includes("Form C10")
        ) {
          return "INEL_C10";
        } else if (
          note.includes("ineligible because you failed") &&
          note.includes("Form M10")
        ) {
          return "INEL_M10";
        } else if (
          note.includes("ineligible because you failed") &&
          note.includes("additional information and medical certification")
        ) {
          return "INEL_5107";
        } else if (note.includes("A request for information has been mailed")) {
          return "SENT_REQ";
        } else if (note.includes("No decision has been made")) {
          return "14_DAY";
        } else if (
          note.includes("Request to Claimant for Information was sent to")
        ) {
          return "SENT_C10";
        } else if (
          note.includes("Request for Medical Information was sent to")
        ) {
          return "SENT_Mxx";
        } else if (note.includes("Request for Wage information was sent to")) {
          return "SENT_Exx";
        } else if (
          note.includes(
            "Notice of Required Pursuit of Workers' Compensation Claim was sent to"
          )
        ) {
          return "SENT_W10";
        } else if (
          note.includes("Request to Claimant for Information was generated")
        ) {
          return "GEN_C01";
        } else if (note.includes("Form W01")) {
          return "GEN_W01";
        } else if (note.includes("Form M-01")) {
          return "GEN_M01";
        } else if (note.includes("An Employer Statement")) {
          return "GEN_E01";
        } else {
          return note;
        }
      })
      .join(";") || "N/A";

  logEvent("[DOL_DABI] Viewed Claim Detail page", {
    object_type: claimType,
    object_status: claimStatus,
    object_details: claimNotes,
  });
}
