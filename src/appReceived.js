import {
  logEvent,
  setupAnalytics,
  updateIcon,
  makeMobileFriendly,
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
  const { status, receiptDate } = getMetadata();
  updateIcon();
  setupAnalytics();
  logView(status, receiptDate);
  makeMobileFriendly();
  addFeedbackLink();
}

function getMetadata() {
  const statusText =
    document
      .getElementsByName("extapp")[0]
      ?.children[0]?.children[0]?.children[2]?.innerText.trim() ?? "";

  const status = statusText.includes("Please allow 14 days")
    ? "REC <14"
    : statusText.includes("Please contact our")
    ? "REC >14"
    : "N/A";

  const receiptDate =
    statusText.split("was received on ")[1]?.split(".")[0] || "N/A";

  return {
    status,
    receiptDate,
  };
}

function logView(status, receiptDate) {
  logEvent("[DOL_DABI] Viewed Application Received page", {
    object_status: status,
    object_details: receiptDate,
  });
}
