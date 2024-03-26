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
  const allClaims = getMetadata();
  updateIcon();
  setupAnalytics();
  logView(allClaims);
  addFeedbackLink();
}

function getMetadata() {
  return Array.from(
    document.getElementsByTagName("table")[2]?.children[0]?.children
  )
    .slice(1)
    .map((row, i) => ({
      claimType: row.children[1].innerText.trim(),
      claimDate: row.children[2].innerText.trim(),
      claimStatus: row.children[3].innerText.trim(),
    }));
}

function logView(allClaims) {
  const recentClaims = allClaims
    .map((claim) => claim.claimDate)
    .filter((date) => {
      const claimDateObj = new Date(date);
      const now = new Date();
      const sixMonthsAgo = new Date().setMonth(now.getMonth() - 6);
      return claimDateObj > sixMonthsAgo;
    });

  logEvent("[DOL_DABI] Viewed Claim List page", {
    object_status: allClaims
      .map((claim) => claim.claimStatus?.charAt(0))
      .join(";"),
    object_type: allClaims.map((claim) => claim.claimType?.charAt(0)).join(";"),
    object_details: recentClaims.length,
    event_label: allClaims.length,
  });
}
